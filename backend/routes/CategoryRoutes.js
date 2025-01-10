const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { adminAuthMiddleware } = require('../middleware/AdminAuthMiddleware');
const Roles = require('../utils/AdminRoles');

router.post("/", adminAuthMiddleware([Roles.ALL_ACCESS]), categoryController.upload.single("thumbnail"), categoryController.createCategory);
router.get("/", adminAuthMiddleware([Roles.ALL_ACCESS]), categoryController.getAllCategories);
router.put("/:id", adminAuthMiddleware([Roles.ALL_ACCESS]), categoryController.upload.single("thumbnail"), categoryController.updateCategory);
router.delete("/:id", adminAuthMiddleware([Roles.ALL_ACCESS]), categoryController.deleteCategory);
router.get("/:filename", adminAuthMiddleware([Roles.ALL_ACCESS]), categoryController.getImage);

module.exports = router;
