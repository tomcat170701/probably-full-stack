import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State to handle image file
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create FormData to handle file upload
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Append the image if it exists
        }

        // Make POST request to create a new post with image
        axios
            .post('/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct headers
                },
            })
            .then(response => {
                console.log('Post created:', response.data);
                setTitle('');
                setContent('');
                setImage(null); // Reset the image field
                navigate('/');
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])} // Set the image state on file select
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;

