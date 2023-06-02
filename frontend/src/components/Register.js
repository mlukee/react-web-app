import {useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
    const siteKey = "6LfwKPolAAAAAHWe8In2lbFu8_OfQuZcu2CWTM_E";
    const [capchaIsDone, setCapchaIsDone] = useState(false);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/";
        } else {
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return (
        <div className="container mt-3">
            <h1>Register</h1>
            <form onSubmit={Register}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" name="email" placeholder="Email" value={email}
                                   onChange={(e) => (setEmail(e.target.value))} className="form-control" id="email"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" name="username" placeholder="Username" value={username}
                                   onChange={(e) => (setUsername(e.target.value))} className="form-control"/>
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="password" name="password" placeholder="Password" value={password}
                                   onChange={(e) => (setPassword(e.target.value))} className="form-control"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                </div>
                <ReCAPTCHA
                    className="mb-3"
                    sitekey="6LdQO_olAAAAABo6i7BH37NzoHCBovu74uFXI0AX"
                    onChange={() => setCapchaIsDone(true)}
                />
                {capchaIsDone ? <input className="btn btn-primary" type="submit" name="submit" value="Register"/> : null}
                <label>{error}</label>
            </form>
        </div>
    );
}

export default Register;