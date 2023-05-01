import {useState} from "react";
import {ShowMessages, Login} from "../components";
import randomAvatar from "../services/randomAvatar";


function ChatApp() {
    const [username, setUsername] = useState(""); 
    const [login, setLogin] = useState(false);

    const [currentMember, setCurrentMember] = useState({});
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]); 
    const [scaledrone, setScaledrone] = useState(null);

    const [input, setInput] = useState(""); 

    // EVENT HANDLERS
    // Handling username input (onChange)
    const handleUsername = (event) => { 
        const value = event.target.value;
        if (value.trim()) {
            setUsername(value.trim());
        }
    }

    // Handling logging in (onClick)
    const handleLogin = (event) => {
        event.preventDefault(); 
        // validacija
        if (username) {
            const member = {
                username: username,
                avatar: randomAvatar()
            };

            setCurrentMember(member);

            // Connecting to a channel
            const drone = new window.Scaledrone("2hDySgJgegnCk8GG", {data: member}); // Passing Scaledrone the custom data for the currently logged in member

            // Opening a connection
            drone.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                console.log("Successfully connected to Scaledrone");

                // Finding yourself (current member)
                setCurrentMember({...currentMember, id: drone.clientId});
            });

            // Subscribing to a room and listening to messages
            const room = drone.subscribe("observable-room");
            room.on("open", error => {
                if (error) {
                return console.error(error);
                }
                console.log("Successfully joined room");
            });

            // Array of currently online members, emitted once, right after the user has successfully connected to the observable room
            room.on("members", (membersArr) => {
                setMembers([...membersArr]);
            });

            // Member join event is emitted when a new member joins the room
            room.on("member_join", (member) => {
                setMembers(prevState => {
                    return [...prevState, member]; 
                });
                
                console.log(`${member.clientData.username} joined the room`);
            });

            // Member leave event is emitted when a member leaves the room
            room.on("member_leave", (member) => {
                setMembers((prevState) => {
                    return prevState.filter((m) => m.id !== member.id);
                });

                console.log(`${member.clientData.username} left the room`);
            });

            // Receiving messages
            room.on("message", (message) => {
                setMessages((prevState) => {
                    return [...prevState, message]
                });
            });

            setLogin(true);
            setScaledrone(drone);

        } else {
            alert("Enter your username.")
        }
    }

    // Sending messages (publishing to a room)
    const sendMessage = (message) => {
        scaledrone.publish({
            room: "observable-room",
            message: message
        });
    }

    // Handling text/message input (onChange)
    const handleInput = (event) => {
        setInput(event.target.value);
    }

    // Handling text/message submission (onClick)
    const handleSubmit = (event) => {
        event.preventDefault();
        // validacija
        if (input.trim() !== "") {
            sendMessage(input);
            setInput(""); 
        } else {
            alert("Type in a message.");
            setInput("");
        } 
    }

    return (
        <div>
            {!login || !username ? <Login onUsernameChange={handleUsername} onLogin={handleLogin} /> : <ShowMessages onMessageInput={handleInput} onMessageSubmit={handleSubmit} messages={messages} currentMember={currentMember} members={members} input={input} />}
        </div>
    );
}

export default ChatApp;