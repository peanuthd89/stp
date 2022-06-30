import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from "../api";


const AccountStuff = ({ action, setToken, setUserData }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isLogin = action === "login";
    const title = isLogin ? "Login" : "Register";
    const oppositeTitle = isLogin ? "Register" : "Login";
    const oppositeAction = isLogin ? "register" : "login";
    const actionURL = isLogin ? API_LOGIN : API_REGISTER;
    const history = useHistory();
     //navigate('/home');

    const handleSumbit = async (event) => {
        event.preventDefault();
        const data = await callApi({
            url: `users/`+ action,
            body: { user: { username, password}},
            method: "POST",
        });
        const token = data?.data?.token;
        if (token) {
            localStorage.setItem('token', token);
            setUsername("");
            setPassword("");
            setToken(token);
            history.push("/");
        }
    }
    return (
        <div id="register-fields">
            <h4 className='page-title'>{title}</h4>
            <form onSubmit={handleSumbit}>
                <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                ></input>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};


export default AccountStuff;
