import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PostDetail = () => {
    const { id } = useParams();  // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);  // Store the current logged-in user
    const navigate = useNavigate();  // Use navigate for programmatic navigation

    useEffect(() => {
        // Fetch the current logged-in user
        axios.get('/api/current_user/')  // Assuming an API endpoint for the logged-in user
            .then(response => {
                setCurrentUser(response.data);  // Set the logged-in user
            })
            .catch(error => {
                console.error('There was an error fetching the current user!', error);
            });

        // Fetch the specific post using the ID
        axios.get(`/posts/${id}/`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/posts/${id}/`)
            .then(() => {
                navigate('/');  // Redirect back to the post list after deletion
            })
            .catch(error => {
                console.error('There was an error deleting the post!');
            });
    };

    const handleEdit = () => {
        navigate(`/posts/${id}/edit`);  // Navigate to the edit page
    };

    if (!post) {
        return <p>Loading post...</p>;
    }

    // Check if the current logged-in user is the author of the post
    const isAuthor = currentUser && post.author.username === currentUser.username;

    return (
        <div>
            <h1>{post.title}</h1>
            {/* Display Author, Created At, and Updated At below the title */}
            <p className="post-meta">
                <strong>Author: </strong>{post.author.username} &nbsp;|&nbsp;
                <strong>Created: </strong>{new Date(post.created_at).toLocaleDateString()} &nbsp;|&nbsp;
                <strong>Updated: </strong>{new Date(post.updated_at).toLocaleDateString()}
            </p>

            <p>{post.content}</p>

            {/* Conditionally render the buttons only if the current user is the author */}
            {isAuthor && (
                <div className="post-buttons">
                    <button onClick={handleEdit} className="edit-btn">Edit Post</button>
                    <button onClick={handleDelete} className="delete-btn">Delete Post</button>
                </div>
            )}
        </div>
    );
};

export default PostDetail;


