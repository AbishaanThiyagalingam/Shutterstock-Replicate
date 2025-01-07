// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import BecomeSeller from './components/BecomeSeller';
import ImageUpload from './components/ImageUpload';
import CategoryForm from './components/CategoryForm';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="/ImageUpload" element={<ImageUpload />} />\
                <Route path="/category" element={<CategoryForm />} />\

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
