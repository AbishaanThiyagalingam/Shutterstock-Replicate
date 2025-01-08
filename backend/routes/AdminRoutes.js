const express = require('express');
const adminController = require('../controllers/AdminController');
const { adminAuthMiddleware } = require('../middleware/adminAuthMiddleware');
const Roles = require('../utils/AdminRoles');

const router = express.Router();

router.post('/', adminAuthMiddleware([Roles.SUPER_ADMIN]), adminController.addAdmin);
router.post('/login', adminController.adminLogin);
router.get('/', adminAuthMiddleware([Roles.ALL_ACCESS]), adminController.getAllAdmins);

module.exports = router;
