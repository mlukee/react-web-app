import {useContext, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <div className="container mt-3">
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <form onSubmit={Login}>
                    <h1>Log in</h1>
                    {userContext.user ? <Navigate replace to="/"/> : ""}
                    <div className="form-floating mb-3">
                        <input type="text" name="username" placeholder="Username"
                               value={username} onChange={(e) => (setUsername(e.target.value))}
                               className="form-control"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" name="password" placeholder="Password"
                               value={password} onChange={(e) => (setPassword(e.target.value))}
                               className="form-control"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="submit" name="submit" value="Log in" className="btn btn-primary w-100"/>
                    <label>{error}</label>
                </form>
            </div>
        </div>

    );
}

export default Login;