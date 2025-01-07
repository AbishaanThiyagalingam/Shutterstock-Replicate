const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/Auth'); // Authentication middleware

const router = express.Router();

router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);
router.get('/profile', authMiddleware.authenticate, authController.getUserProfile);
router.post('/become-seller', authMiddleware.authenticate, authController.becomeSeller);

module.exports = router;
