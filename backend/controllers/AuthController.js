const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserHistory = require('../models/UserHistory');
const UserActivities = require('../utils/UserActivities');
const UserRoles = require('../utils/UserRoles');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const PendingUser = require('../models/PendingUser');

// Handle Google login route
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err || !user) {
            logger.error('Authentication error:', err);
            return res.redirect('http://localhost:3000/login?error=Authentication+Failed');
        }

        try {
            // Generate JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Record history
            await UserHistory.create({
                userId: user._id,
                action: UserActivities.GOOGLE_LOGIN,
                metadata: { googleId: user.googleId },
            });

            // Redirect to frontend with token and user ID in the query params
            const redirectUrl = `http://localhost:3000/profile?token=${token}&id=${user._id}`;
            res.redirect(redirectUrl);
        } catch (error) {
            logger.error('Error generating token:', error);
            res.redirect('http://localhost:3000/login?error=Server+Error');
        }
    })(req, res, next);
};

// exports.googleCallback = (req, res, next) => {
//     passport.authenticate('google', async (err, user) => {
//         if (err || !user) {
//             logger.error('Authentication error:', err);
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         try {
//             // Generate JWT
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             // Record history
//             await UserHistory.create({
//                 userId: user._id,
//                 action: UserActivities.GOOGLE_LOGIN,
//                 metadata: { googleId: user.googleId },
//             });

//             res.status(200).json({
//                 message: 'Authentication successful',
//                 token: token,
//             });
//         } catch (error) {
//             logger.error('Error generating token:', error);
//             res.status(500).json({ message: 'An error occurred while logging in.' });
//         }
//     })(req, res, next);
// };

// Handle Facebook login route
exports.facebookLogin = passport.authenticate('facebook', { scope: ['email'] });

exports.facebookCallback = (req, res, next) => {
    passport.authenticate('facebook', async (err, user) => {
        if (err || !user) {
            logger.error('Authentication error:', err);
            return res.status(401).json({ message: 'Authentication failed' });
        }

        try {
            // Generate JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Record history
            await UserHistory.create({
                userId: user._id,
                action: UserActivities.FACEBOOK_LOGIN,
                metadata: { facebookId: user.facebookId },
            });

            res.status(200).json({
                message: 'Authentication successful',
                token: token,
            });
        } catch (error) {
            logger.error('Error generating token:', error);
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
        logger.error('Error fetching profile:', error);
        res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
};

// Check seller status
exports.isSeller = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the user is a seller
        const isSeller = user.role === UserRoles.SELLER;

        res.status(200).json({ 
            user, 
            isSeller 
        })
    } catch (error) {
        logger.error('Error fetching profile:', error);
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
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};


exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if email is already in use (both PendingUser and User collections)
        const existingUser = await User.findOne({ email });
        const pendingUser = await PendingUser.findOne({ email });

        if (existingUser) {
            if (existingUser.googleId) {
                return res.status(400).json({ 
                    message: 'An account with this email is already linked to Google login. Please use Google to log in.' 
                });
            } else {
                return res.status(400).json({ 
                    message: 'An account with this email already exists. Please log in instead.' 
                });
            }
        }

        if (pendingUser) {
            return res.status(400).json({ message: 'An account is pending verification for this email. Please check your email to verify.' });
        }

        // Generate a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Save the user in the PendingUser collection
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPendingUser = await PendingUser.create({
            email,
            password: hashedPassword,
            name,
            verificationToken,
        });

        // Record history for registration
        await UserHistory.create({
            userId: newPendingUser._id,
            action: UserActivities.VERIFY_EMAIL_PENDING,
            metadata: { email, name },
        });

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h1>Email Verification</h1>
                <p>Click the link below to verify your email:</p>
                <a href="${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}">
                    Verify Email
                </a>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
    } catch (error) {
        logger.error('Error during registration:', error);
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
        logger.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};


// Get all admins
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "user not found." });
      }
      res.status(200).json({ message: "user deleted." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters
        const user = await User.findById(userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        logger.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
};
