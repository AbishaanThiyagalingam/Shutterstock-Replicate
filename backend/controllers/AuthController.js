const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserHistory = require('../models/UserHistory');
const UserActivities = require('../utils/UserActivities');
const UserRoles = require('../utils/UserRoles');

// Handle Google login route
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err || !user) {
            console.error('Authentication error:', err);
            return res.status(401).json({ message: 'Authentication failed' });
        }

        try {
            // Generate JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Record history
            await UserHistory.create({
                userId: user._id,
                action: `${UserActivities.GOOGLE_LOGIN}}`,
                metadata: { googleId: user.googleId },
            });

            // Redirect with token
            res.redirect(`http://localhost:3000?token=${token}`);
        } catch (error) {
            console.error('Error generating token:', error);
            res.status(500).json({ message: 'An error occurred while logging in.' });
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

        if (user.role === UserRoles.SELLER) {
            return res.status(400).json({ message: 'You are already a seller.' });
        }

        user.sellerDetails = { bankName, accountNumber, ifscCode };
        user.role = UserRoles.SELLER;
        await user.save();

        // Record history
        await UserHistory.create({
            userId: user._id,
            action: UserActivities.BECOME_SELLER,
            metadata: { bankName, accountNumber },
        });

        res.status(200).json({ message: 'Your details have been submitted. You are now a seller!' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};

// Register user
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.googleId) {
                // If the email is linked to a Google account
                return res.status(400).json({ 
                    message: 'An account with this email is already linked to Google login. Please use Google to log in.' 
                });
            } else {
                // If the email is linked to a regular account
                return res.status(400).json({ 
                    message: 'An account with this email already exists. Please log in instead.' 
                });
            }
        }

        // Create a new user
        const user = new User({ email, password, name });
        await user.save();

         // Record history
         await UserHistory.create({
            userId: user._id,
            action: UserActivities.REGISTER,
            metadata: { email },
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering.' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Record history
        await UserHistory.create({
            userId: user._id,
            action: UserActivities.LOGIN,
        });

        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};
