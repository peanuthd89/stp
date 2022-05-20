import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from "../api";


const API_ROOT = "https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt/users/";
const API_REGISTER = `${API_ROOT}register`;
const API_LOGIN = `${API_ROOT}login`;
const API_USER = `${API_ROOT}me`;

const accountStuff = ({ action, setToken, setUserData }) => {
    const [usernanme, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isLogin = action === "login";
    const title = isLogin ? "Login" : "Register";
    const oppositeTitle = isLogin ? "Register" : "Login";
    const oppositeAction = isLogin ? "register" : "login";
    const actionURL = isLogin ? API_LOGIN : API_REGISTER;
    const history = useHistory();
    // navigate('/home');

    const handleSumbit = async (event) => {
        event.preventDefault();
        const data = await callApi({
            url: `/users/${action}`,
            body: { user: { usernanme, password}},
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


export default accountStuff;
