import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PostDetail = () => {
    const { id } = useParams();  // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const navigate = useNavigate();  // Use navigate for programmatic navigation

    useEffect(() => {
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

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <div className="post-buttons">
                {/* Styled Edit Button */}
                <button onClick={handleEdit} className="edit-btn">Edit Post</button>

                {/* Styled Delete Button */}
                <button onClick={handleDelete} className="delete-btn">Delete Post</button>
            </div>
        </div>
    );
};

export default PostDetail;
