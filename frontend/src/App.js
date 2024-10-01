import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';  // Create Post form
import Navbar from './components/Navbar';      // The Navbar component
import PostDetail from './components/PostDetail';  // Import PostDetail component
import EditPost from './components/EditPost';  // Import EditPost component

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />  {/* Include the Navbar at the top */}
                <Routes>
                    <Route path="/" element={<PostList />} />   {/* All Posts page */}
                    <Route path="/create" element={<PostForm />} /> {/* Create Post page */}
                    <Route path="/posts/:id" element={<PostDetail />} />  {/* Post Detail page */}
                    <Route path="/posts/:id/edit" element={<EditPost />} />  {/* Edit Post page */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
