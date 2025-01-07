const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to start Google OAuth login
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }) // Prompt user to select account
);

// Callback route for Google to redirect to
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to profile or desired page
        res.redirect('/auth/profile');
    }
);

// Profile route to fetch user data
router.get('/profile', (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    res.status(200).json(req.user); // Send user data to frontend
});

module.exports = router;
