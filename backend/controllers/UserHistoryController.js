const UserHistory = require('../models/UserHistory');

// Get user history
exports.getUserHistory = async (req, res) => {
    try {
        // Fetch history for the logged-in user, sorted by most recent first
        const history = await UserHistory.find({ userId: req.user.id }).sort({ timestamp: -1 });
        if (!history.length) {
            return res.status(404).json({ message: 'No history found for this user.' });
        }
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ message: 'An error occurred while fetching history.' });
    }
};

// Add a manual entry to user history (for admin or testing purposes)
exports.addUserHistory = async (req, res) => {
    const { userId, action, metadata } = req.body;

    try {
        if (!userId || !action) {
            return res.status(400).json({ message: 'User ID and action are required.' });
        }

        const historyEntry = new UserHistory({
            userId,
            action,
            metadata,
        });

        await historyEntry.save();
        res.status(201).json({ message: 'User history entry added successfully!', historyEntry });
    } catch (error) {
        console.error('Error adding user history:', error);
        res.status(500).json({ message: 'An error occurred while adding history.' });
    }
};

// Delete a specific history entry (admin use)
exports.deleteUserHistory = async (req, res) => {
    const { historyId } = req.params;

    try {
        const deletedHistory = await UserHistory.findByIdAndDelete(historyId);
        if (!deletedHistory) {
            return res.status(404).json({ message: 'History entry not found.' });
        }
        res.status(200).json({ message: 'User history entry deleted successfully.', deletedHistory });
    } catch (error) {
        console.error('Error deleting user history:', error);
        res.status(500).json({ message: 'An error occurred while deleting history.' });
    }
};

// Clear all history for a user (admin or user reset)
exports.clearUserHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedHistory = await UserHistory.deleteMany({ userId });
        res.status(200).json({ message: 'All user history cleared successfully.', deletedCount: deletedHistory.deletedCount });
    } catch (error) {
        console.error('Error clearing user history:', error);
        res.status(500).json({ message: 'An error occurred while clearing history.' });
    }
};
