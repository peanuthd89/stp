import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ token }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <div id='nav-bar'>
            <div id='nav-links'>
                <span>
                    <link to="/posts">View Posts from Strangers!!</link>
                </span>
                <div>
                    {isLoggedIn ? (
                        <div>
                            <span>
                                <Link to="/profile">Profile</Link>
                            </span>
                            <span>
                                <Link 
                                to="/"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    setIsLoggedIn(false);
                                }
                                }
                                >Logout</Link>
                            </span>
                            </div>
                    ) : ( 
                        <div>
                            <div>
                                <span>
                                    <Link to='/login'>Login</Link>
                                </span>
                                <span>
                                    <Link to="/register">Register</Link>
                                </span>
                                </div>
                                </div>
                    
                    )};
                </div>
            </div>
        </div>
    );
    console.log(isLoggedIn);
};


export default Nav;

