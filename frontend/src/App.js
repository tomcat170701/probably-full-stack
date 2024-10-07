import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
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
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/" element={<PostList />} />
                    
                    {/* Protect CreatePost, PostDetail, and EditPost with PrivateRoute */}
                    <Route 
                        path="/create" 
                        element={
                            <PrivateRoute>
                                <PostForm />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/posts/:id" 
                        element={
                            <PrivateRoute>
                                <PostDetail />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/posts/:id/edit" 
                        element={
                            <PrivateRoute>
                                <EditPost />
                            </PrivateRoute>
                        } 
                    />
                    
                    {/* Public routes for Login and Register */}
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

