const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Roles = require('../utils/AdminRoles');

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: Object.values(Roles), 
        default: Roles.ADMIN,
    },
    createdAt: { 
        type: Date, 
        default: Date.now },
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Admin', adminSchema);
