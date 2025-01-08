const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        action: { 
            type: String, 
            required: true 
        },
        metadata: { 
            type: Object 
        }, 
        timestamp: { 
            type: Date, 
            default: Date.now 

        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('UserHistory', userHistorySchema);
