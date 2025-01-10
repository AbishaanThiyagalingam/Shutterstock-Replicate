// controllers/AdminController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Add a new admin
exports.addAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists.' });
        }

        const admin = new Admin({ name, email, password, role });
        await admin.save();

        res.status(201).json({ message: 'Admin added successfully!', admin });
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).json({ message: 'An error occurred while adding the admin.' });
    }
};

// Admin login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, admin: { id: admin._id, email: admin.email, role: admin.role } });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password'); // Exclude password
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'An error occurred while fetching admins.' });
    }
};
