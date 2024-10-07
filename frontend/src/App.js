import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import Login from './components/Login';
import './App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the access token exists in localStorage
        const accessToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);  // Update authentication state based on token existence
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> {/* Pass props */}
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/posts/:id/edit" element={<EditPost />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
