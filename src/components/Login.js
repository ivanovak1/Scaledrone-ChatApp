function Login({onUsernameChange, onLogin}) {
    return (
        <div className="login-container">
            <div className="login">
                <h1>ChatApp Login</h1>
                <form>
                    <label htmlFor="polje">ChatApp username:</label><br />
                    <input type="text" id="polje" placeholder="Username" onChange={onUsernameChange}/><br />
                    <button type="submit" onClick={onLogin}>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;