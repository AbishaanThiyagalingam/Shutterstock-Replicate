const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRoles = require('../utils/UserRoles');

// Common authentication middleware
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user info to the request
        next();
    } catch (error) {
        logger.error(error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Middleware to authenticate buyers
const authenticateBuyer = async (req, res, next) => {
    await authenticate(req, res, async () => {
        if (req.user.role !== UserRoles.BUYER) {
            return res.status(403).json({ message: 'Forbidden: Not authorized as a buyer' });
        }
        next();
    });
};

// Middleware to authenticate sellers
const authenticateSeller = async (req, res, next) => {
    await authenticate(req, res, async () => {
        if (req.user.role !== UserRoles.SELLER) {
            return res.status(403).json({ message: 'Forbidden: Not authorized as a seller' });
        }
        next();
    });
};

module.exports = {
    authenticate,
    authenticateBuyer,
    authenticateSeller,
};
