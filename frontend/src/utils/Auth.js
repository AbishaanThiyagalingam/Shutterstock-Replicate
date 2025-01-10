// src/utils/auth.js
export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
    return user && user.token;
};

export const hasRole = (role) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === role;
};
