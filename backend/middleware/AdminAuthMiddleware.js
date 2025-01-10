// middleware/AdminMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Roles = require('../utils/AdminRoles');

// Middleware to restrict access to specific roles or allow all
exports.adminAuthMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id);

            // Check if the admin exists
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found.' });
            }

            // Allow all roles if `Roles.ALLACCESS` is included
            if (allowedRoles.includes(Roles.ALL_ACCESS)) {
                req.admin = admin;
                return next();
            }

            // Check if the admin's role is in the allowedRoles list
            if (!allowedRoles.includes(admin.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
            }

            req.admin = admin;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
};
