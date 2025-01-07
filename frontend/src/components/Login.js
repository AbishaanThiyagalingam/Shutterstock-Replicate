import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
        // Redirect the user to the Google Login endpoint on your backend
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
