import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const EditPost = () => {
    const { id } = useParams();  // Get the post ID from the URL
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific post using the ID and populate the form
        axios.get(`/posts/${id}/`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedPost = { title, content };

        axios.put(`/posts/${id}/`, updatedPost)
            .then(response => {
                console.log('Post updated:', response.data);
                navigate(`/posts/${id}`);  // Redirect back to the PostDetail page
            })
            .catch(error => {
                console.error('There was an error updating the post!', error);
            });
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate}>
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
                    />
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;

