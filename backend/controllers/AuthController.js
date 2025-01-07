const passport = require('passport');
const User = require('../models/User');

// Handle Google login route
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Handle Google callback
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' });

// Handle redirection after successful login
exports.redirectToProfile = (req, res) => {
    res.redirect('/auth/profile');
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json(req.user);
};

// Submit seller details and switch role
exports.becomeSeller = async (req, res) => {
    const { bankName, accountNumber, ifscCode } = req.body;

    try {
        // Find the authenticated user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already a seller
        if (user.role === 'seller') {
            return res.status(400).json({ message: 'You are already a seller.' });
        }

        // Update the user's details and switch their role to seller
        user.sellerDetails = { bankName, accountNumber, ifscCode };
        user.role = 'seller';
        await user.save();

        res.status(200).json({ message: 'Your details have been submitted. You are now a seller!' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
