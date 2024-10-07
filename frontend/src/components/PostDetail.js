import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false); // Track if the logged-in user is the author
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}/`);
                setPost(response.data);

                // Get the logged-in user's username from localStorage
                const loggedInUsername = localStorage.getItem('username');

                // Check if the logged-in user is the author of the post
                if (response.data.author.username === loggedInUsername) {
                    setIsAuthor(true);
                } else {
                    setIsAuthor(false);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${id}/`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <div className="post-meta">
                        <span>Author: {post.author.username}</span> | 
                        <span> Created: {new Date(post.created_at).toLocaleDateString()}</span> | 
                        <span> Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                    </div>
                    <p>{post.content}</p>
                    
                    
                    {isAuthor && (
                        <div className='post-buttons'>
                            <button onClick={() => navigate(`/posts/${id}/edit`)} className='edit-btn'>Edit Post</button>
                            <button onClick={handleDelete} className='delete-btn'>Delete Post</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostDetail;




