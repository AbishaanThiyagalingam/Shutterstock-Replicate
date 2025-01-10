const express = require('express');
const UserHistoryController = require('../controllers/UserHistoryController');
const authMiddleware = require('../middleware/Auth');
const { adminAuthMiddleware } = require('../middleware/AdminAuthMiddleware');
const Roles = require('../utils/AdminRoles');

const router = express.Router();

router.get('/', adminAuthMiddleware([Roles.SUPER_ADMIN]), UserHistoryController.getUserHistory);
router.post('/',  adminAuthMiddleware([Roles.SUPER_ADMIN]), UserHistoryController.addUserHistory);
router.delete('/:historyId', adminAuthMiddleware([Roles.SUPER_ADMIN]), UserHistoryController.deleteUserHistory);
router.delete('/clear/:userId', adminAuthMiddleware([Roles.SUPER_ADMIN]), UserHistoryController.clearUserHistory);

module.exports = router;
