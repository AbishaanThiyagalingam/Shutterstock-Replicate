import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in the URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (token) {
            // Store the token in localStorage
            localStorage.setItem('token', token);
            // Redirect to the profile page
            navigate('/profile');
        }
    }, [navigate]);

    const handleGoogleLogin = () => {
        // Redirect to backend Google login endpoint
        window.location.href = 'http://localhost:8080/auth/google';
    };

    const handleFacebookLogin = () => {
        // Redirect to backend Facebook login endpoint
        window.location.href = 'http://localhost:8080/auth/facebook';
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={handleFacebookLogin}>Login with Facebook</button>
        </div>
    );
};

export default Login;
