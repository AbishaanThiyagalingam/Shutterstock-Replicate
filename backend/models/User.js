const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, default: 'buyer' },
        sellerDetails: {
            bankName: { type: String },
            accountNumber: { type: String },
            ifscCode: { type: String },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Ensures createdAt and updatedAt are automatically managed
    }
);

module.exports = mongoose.model('User', userSchema);
