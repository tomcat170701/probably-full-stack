import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove tokens from localStorage on logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <nav>
            <ul>
                <li className='title'>
                    Blog App
                </li>
                <div className="nav-actions">
                    {/* Always show All Posts */}
                    <li>
                        <Link to="/">All Posts</Link>
                    </li>

                    {/* Only show Create Post and Logout if authenticated */}
                    {isAuthenticated && (
                        <>
                            <li>
                                <Link to="/create">Create Post</Link>
                            </li>
                            <li>
                                <Link to='/login' onClick={handleLogout}>Logout</Link>
                            </li>
                        </>
                    )}

                    {/* Show Login if not authenticated */}
                    {!isAuthenticated && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;






