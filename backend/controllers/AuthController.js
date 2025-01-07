const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle Google login route
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, profile) => {
        if (err || !profile) {
            console.error('Authentication error:', err);
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const { id: googleId, displayName: name, emails } = profile;
        const email = emails[0]?.value;

        try {
            // Check if the user already exists
            let user = await User.findOne({ googleId });

            if (!user) {
                // If user doesn't exist, create a new user with timestamps
                user = new User({
                    googleId,
                    name,
                    email,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
                await user.save();
            } else {
                // Update the `updatedAt` field when the user logs in again
                user.updatedAt = Date.now();
                await user.save();
            }

            // Generate JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Redirect with token
            res.redirect(`http://localhost:3000?token=${token}`);
        } catch (error) {
            console.error('Error during Google login callback:', error);
            res.status(500).json({ message: 'An error occurred during login.' });
        }
    })(req, res, next);
};

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
