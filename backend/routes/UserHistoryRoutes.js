const express = require('express');
const UserHistoryController = require('../controllers/UserHistoryController');
const authMiddleware = require('../middleware/Auth');

const router = express.Router();

router.get('/', authMiddleware.authenticate, UserHistoryController.getUserHistory);
router.post('/', authMiddleware.authenticate, UserHistoryController.addUserHistory);
router.delete('/:historyId', authMiddleware.authenticate, UserHistoryController.deleteUserHistory);
router.delete('/clear/:userId', authMiddleware.authenticate, UserHistoryController.clearUserHistory);

module.exports = router;
