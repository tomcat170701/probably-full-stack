import React, {useState, UseEffect, useEffect} from 'react';
import axios from axios;

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
        .get('/api/posts/')
        .then(response =>{
            setPosts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching posts!', error);
        })

    },[]);

    return(
        <div>
            <h1>All Posts</h1>
            <ul>
                {posts.map(post =>(
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li> 
                    
                ))}
            </ul>
        </div>
    );

}

export default PostList;