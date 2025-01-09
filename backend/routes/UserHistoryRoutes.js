const express = require('express');
const UserHistoryController = require('../controllers/UserHistoryController');
const authMiddleware = require('../middleware/Auth');

const router = express.Router();

router.get('/',  UserHistoryController.getUserHistory);
router.post('/',  UserHistoryController.addUserHistory);
router.delete('/:historyId',UserHistoryController.deleteUserHistory);
router.delete('/clear/:userId', UserHistoryController.clearUserHistory);

module.exports = router;
