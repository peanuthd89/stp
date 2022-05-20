import React, { useState } from 'react';
import { callApi } from "../api"
import { useHistory, useParams } from "react-router-dom";

const Newpoststhings = ({ token, setPosts, posts, action }) => {
    const history = useHistory();
    // navigate('/home');
    const { postId } = useParams();
    const [newPosts, setNewPosts] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        willDeliver: false,
    });
    const isEdit = action === "edit";
    const title = isEdit ? "Edit This Post" : "Add a New Post";
    const method = isEdit ? "PATCH" : "POST";
    const API_URL = isEdit ? `/posts/${postId}` : `/posts`;

    const handleSumbit = async () => {
        event.preventDefault();
        try {
            const {
                data: { posts },
            } = await callApi({
                url: API_URL,
                method: method,
                body: {
                    post: {
                        title: newPosts.title,
                        description: newPosts.description,
                        price: newPosts.price,
                        location: newPosts.location,
                        willDeliver: newPosts.willDeliver,
                    },
                },
                token,
            });

            if (isEdit) {
                const filteredPosts = posts.filter((posts) => posts._id !== postId);
                setPosts([...filteredPosts, posts]);
            } else {
                setPosts([...posts, posts]);
            }
            navigate.push("/posts");
        } catch (error) {
            console.error("Error adding your post:", error);
        }
    };

    const handlePostFieldChange = (property) => (event) => {
        if (property === "willDeliver") {
            setNewPosts({ ...newPosts, [property]: event.target.checked });
        } else {
            setNewPosts({ ...newPosts, [property]: event.target.value });
        }
    };

    return (
        <>
        <h2>{title}</h2>
        <form id='new-post-form' onSubmit={handleSumbit}>
            <input 
            type="text"
            placeholder='What are you selling?'
            onChange={handlePostFieldChange("title")}
            value={newPosts.title}
            ></input>
            <input
            type="text"
            placeholder='Describe the item (i.e. condition, model)'
            onChange={handlePostFieldChange("description")}
            value={newPosts.description}
            ></input>
            <input
            type="number"
            placeholder='What is the price?'
            onChange={handlePostFieldChange('price')}
            value={newPosts.price}
            ></input>
            <input
            type="text"
            placeholder='Where is the item located?'
            onChange={handlePostFieldChange("location")}
            value={newPosts.location}
            ></input>
            <label>
                Are you willing to Deliver?
                <input
                type="checkbox"
                onChange={handlePostFieldChange("willDeliver")}
                value={newPosts.willDeliver}
                ></input>
            </label>
            <button>{title}</button>
        </form>
        </>
    );
    };

    export default Newpoststhings; 