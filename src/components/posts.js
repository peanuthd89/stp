import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import { Singlepost } from ".singlepost";
import { callApi } from "../api";


const method = "DELETE";

const postMatches = (post , searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
    const {
        description, 
        location, 
        title,
        author: { username },
    } = post;

    const toMatch = [description, location, title, username]

    for (let i = 0; i < toMatch.length; i++) {
        const field = toMatch[i];
        if (field.toLowerCase().includes(searchTermLower)) {
            return true;
        }
    }
};

const Posts = ({ posts, token, setPosts, userData }) => {
    const history = useHistory();
    // navigate('/home');
    const [searchTerm, setSearchTerm] = useState("");

    const postsToDisplay = posts.filter(post => postMatches(post, searchTerm));

    const handleSumbit = async (postId) => {
        const API_URL = `/posts/${postId}`;
        event.preventDefault();
        try {
            await callApi({
                url: API_URL,
                method: method,
                token: token,
            });
            const remainingPosts = posts.filter(post => post._id !== postId);
            setPosts(remainingPosts);
        }   catch (error) {
            console.error(error);
        }
    };
    return (
        <>
        <div id="posts-nav">
            <h2 className='page-title'>Posts</h2>
            <input
            type="text"
            placeholder='Search Posts'
            value={searchTerm}
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            ></input>
        </div>
        {postsToDisplay.length ? (
            postsToDisplay.map((posts) => (
                <div 
                className='post-info'
                key={post._id}
                style={{ border: "2px solid black"}}
                >
                    <div id='title-button'>
                        <span className='post-title'>{post.title}</span>
                        <button onClick={() => history.push(`/posts/${post._id}`)}>
                            Tell Me MORE !
                        </button>
                    </div>
                    <div id='seller'> Seller: {posts.author.username}</div>
                    <div className='location'>Location: ${posts.location}</div>
                    <div className='description'>Description: {posts.description}</div>

                    {posts.author.username === userData.username ? (
                        <button onClick={() => handleSumbit(post._id)}>
                            Delete Post
                        </button>
                    ) : null}
                </div>
            ))
    ) : ( 
        <div>
            <h1>There are no matching posts...</h1>
        </div>
        )}
        </>
    );
};


export default Posts;
