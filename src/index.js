import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { 
    AccountStuff,
    Posts,
    Singleposts,
    Newpoststhings,
    Nav,
    Login,
    Profile,
} from "./components/Index";
import { callApi } from "./api";
import "../src/style.css";


const App = () => {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);
    
    const fetchUserData = async (token) => {
        const { data } = await callApi({
            url: "/users/me",
            token,
        });
        return data;
    };

    const fetchPosts = async () => {
        const {
            data: { posts },
        } = await callApi({
            url: "/posts",
        })
        return posts;
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetchUserData(token);
        }
        fetchData();

    }, [token]);

    // useEffect(async () => {
    //     if (!token) {
    //         setToken(localStorage.getItem("token"));
    //         return;
    //     }
    //     const data = await fetchUserData(token);
    //     if (data && data.username) {
    //         setUserData(data);
    //     }
    // }, [token]);

    // useEffect(async () => {
    //     const posts = await fetchPosts();
    //     setPosts(posts);
    //},[]);
    return (
        <>
        <div id="header">
            {userData.username && (
                <p> Welcome back to Stranger's Things {userData.username}</p>
            )}
            {!userData.username && <p> Welcome to Stranger's Things</p>}
        </div>
        <Nav token={token} />

        { <Switch>
            <Route exact path="/"></Route>

            <Route exact path="/posts">
                <Posts
                posts={posts}
                token={token}
                setPosts={setPosts}
                userData={userData}
                />
            </Route>
            <Route path="/profile">
                <Profile userData={userData} token={token} />
            </Route>
            <Route path="/posts/new">
                <Newpoststhings
                token={token}
                setPosts={setPosts}
                posts={posts}
                action="add"
                />
            </Route>
            <Route path="/posts/:postId/edit">
                <Newpoststhings
                token={token}
                setPosts={setPosts}
                posts={posts}
                action="edit"
                />
            </Route>
            <Route path="/posts/:postId">
                <Singleposts posts={posts} token={token} />
            </Route>
            <Route path="/register">
            <AccountStuff
                action="register"
                setToken={setToken}
                setUserData={setUserData}
                />
            </Route>
            <Route path="/login">
                <AccountStuff
                    action="login" 
                    setToken={setToken}
                    setUserData={setUserData}
                    />
            </Route>
        </Switch> }
        </>
    );
}; 

ReactDOM.render(
    <Router>
        <App/>,
    </Router>,
    document.getElementById("app")
);