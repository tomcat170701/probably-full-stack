import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from '../axiosConfig';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch all posts
        axios
            .get('/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching posts!', error);
            });
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
            <ul>
                {posts.map(post => (
                    // Wrap the entire post item with Link, remove underline and clickable color on title
                    <Link to={`/posts/${post.id}`} key={post.id} className="post-item">
                        <li>
                            <h3>{post.title}</h3>
                            <p>{post.content.slice(0, 100)}...</p> {/* Show only a preview of the content */}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default PostList;

