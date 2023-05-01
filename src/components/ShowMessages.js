import {useEffect, useRef} from "react";
import convertTimestamp from "../services/convertTimestamp";

function ShowMessages({onMessageInput, onMessageSubmit, messages, members, currentMember, input}) {
    // New message (on the bottom of the list) will be visible to the user
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);


    return (
        <div className="chat-app">
            <header>
                <div className="users-online">
                    <h6>Users online ({members.length}):</h6>
                    <ul className="users-list">
                        {members.length > 0 ? members.map(({clientData, id}) => {
                        return (
                            <li key={id}>
                                <span className="avatar-mini" style={{background: `${clientData.avatar}no-repeat center/contain`}}></span>
                                <span>{clientData.username}</span>
                            </li>
                        );
                    }) : ""}
                    </ul>
                </div>
                <h1>Chat App</h1>
            </header>


            <ul className="messages-list">
                {messages.length > 0 ? messages.map(({data, id, member, timestamp}) => {
                    // Setting the color of the message container
                    const myMessage = member?.id === currentMember.id; 
                    const memberColor = myMessage ? "current-member-color" : "other-member-color";
                    const memberPosition = myMessage ? "current-member-position" : "other-member-position";
                    
                    return (
                        <li key={id} className={memberPosition} ref={bottomRef}>
                            <span className="avatar" style={{background: `${member.clientData.avatar}no-repeat center/contain`}}></span>
                            <div className="message-data">
                                <div className="username">{member.clientData.username}</div>
                                <div className={memberColor}>{data}</div>
                                <div className="timestamp">{convertTimestamp(timestamp)}</div>
                            </div>
                        </li>
                    );
                }) : ""}
            </ul>
            
            <form className="text-submit" onSubmit={onMessageSubmit}>
                <input type="text" id="text" value={input} autoFocus={true} placeholder="Type in a message" onChange={onMessageInput}/>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ShowMessages;