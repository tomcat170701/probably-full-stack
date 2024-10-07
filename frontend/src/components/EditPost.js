import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const EditPost = () => {
    const { id } = useParams();  // Get the post ID from the URL
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State for handling the image
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific post using the ID and populate the form
        axios.get(`/posts/${id}/`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
                setImage(response.data.image);  // Set the image if available
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();  // Create FormData to handle file upload
        formData.append('title', title);
        formData.append('content', content);
        if (image instanceof File) {
            formData.append('image', image); // Append the new image if it's a File object
        }

        try {
            await axios.put(`/posts/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Set correct headers
                },
            });
            navigate(`/posts/${id}`);  // Redirect back to the PostDetail page
        } catch (error) {
            console.error('There was an error updating the post!', error);
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
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
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}  // Set the image state on file select
                    />
                    {image && typeof image === 'string' && (
                        <div>
                            <img
                                src={image}  // Show the current image
                                alt="Current post"
                                style={{ width: '200px', marginTop: '10px' }}
                            />
                        </div>
                    )}
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;


