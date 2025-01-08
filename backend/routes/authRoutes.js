const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/Auth');
const pendingUserController = require('../controllers/PendingUserController');
const router = express.Router();

// google Login
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

// Facebook Login
router.get('/facebook', authController.facebookLogin);
router.get('/facebook/callback', authController.facebookCallback);

router.get('/profile', authMiddleware.authenticate, authController.getUserProfile);
router.post('/become-seller', authMiddleware.authenticate, authController.becomeSeller);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', pendingUserController.verifyEmail);

module.exports = router;
