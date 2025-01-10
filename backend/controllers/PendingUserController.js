const PendingUser = require('../models/PendingUser');
const User = require('../models/User');
const UserHistory = require('../models/UserHistory');
const UserActivities = require('../utils/UserActivities');

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const pendingUser = await PendingUser.findOne({ verificationToken: token });
        if (!pendingUser) {
            return res.status(400).json({ message: 'Invalid or expired verification token.' });
        }

        // Move user to the User collection
        const { email, password, name } = pendingUser;
        const newUser = new User({ email, password, name });
        await newUser.save();

        // Record history for email verification
        await UserHistory.create({
            userId: newUser._id,
            action: UserActivities.REGISTER,
            metadata: { email, name },
        });

        // Delete from PendingUser collection
        await PendingUser.deleteOne({ _id: pendingUser._id });

        res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
    } catch (error) {
        logger.error('Error during email verification:', error);
        res.status(500).json({ message: 'An error occurred during email verification.' });
    }
};
