// src/components/Login.js
import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
        // Redirect to backend Google login endpoint
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
