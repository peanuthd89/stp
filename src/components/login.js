import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BASE_URL = 'https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    navigate('/home');

    const handleSumbit = async (event) => {
        event.preventDefault();

        const response = await fetch(`$BASE_URL}/users/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                },
            }),
        });

        if (response) {
            const data = await response.json();
            const token = data.data.token;
            setTok;
            localStorage.setItem('token', token);
            setUsername("");
            setPassword("");
        }

        setUsername('');
        setPassword('');
        history.push('/profile');
    };
    return (
        <div id='login'>
            <form onSubmit={handleSumbit}>
                <label>Username</label>
                <input
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={(event) => setUsername(event.target.value)}
                ></input>

                <label>Password</label>
                <input
                type="text"
                value={password}
                placeholder="Enter Password"
                onAbort={(event) => setPassword(event.target.value)}
                ></input>
            </form>
        </div>
    );
};

export default Login;
