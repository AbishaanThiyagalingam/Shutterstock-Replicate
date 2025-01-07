const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/Auth'); // Authentication middleware

const router = express.Router();

// Google login route
router.get('/google', authController.googleLogin);

// Google callback route
router.get('/google/callback', authController.googleCallback);

// Get user profile
router.get('/profile', authMiddleware, authController.getUserProfile);

// Submit seller details and switch role
router.post('/become-seller', authMiddleware, authController.becomeSeller);

module.exports = router;
