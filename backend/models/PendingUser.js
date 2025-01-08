const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Automatically delete after 1 hour
    },
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
