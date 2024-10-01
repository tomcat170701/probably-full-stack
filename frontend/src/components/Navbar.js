import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">All Posts</Link>
                </li>
                <li className='title'>
                    Blog App
                </li>
                <li>
                    <Link to="/create">Create Post</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
