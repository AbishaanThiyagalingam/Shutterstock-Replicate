const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle Google login route
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Handle Google callback
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' }, async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:3000?token=${token}`); // Send token to frontend
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
});

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
};

// Submit seller details and switch role
exports.becomeSeller = async (req, res) => {
    const { bankName, accountNumber, ifscCode } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'seller') {
            return res.status(400).json({ message: 'You are already a seller.' });
        }

        user.sellerDetails = { bankName, accountNumber, ifscCode };
        user.role = 'seller';
        await user.save();

        res.status(200).json({ message: 'Your details have been submitted. You are now a seller!' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
