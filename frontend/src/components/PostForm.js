import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, content };

        // Make POST request to create a new post
        axios
            .post('/posts/', post)
            .then(response => {
                console.log('Post created:', response.data);
                setTitle('');
                setContent('');
                navigate('/')
            })
            .catch(error => {
                console.error('There was an error creating the post', error);
            });
    };

    // Prevent form submission when Enter is pressed inside the textarea
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent form submission
            setContent(content + '\n'); // Insert a new line instead
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Post</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="content"
                    onKeyDown={handleKeyDown} // Handle Enter key press
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
}

export default PostForm;
