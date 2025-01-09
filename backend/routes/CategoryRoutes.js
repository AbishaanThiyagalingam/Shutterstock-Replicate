const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { adminAuthMiddleware } = require('../middleware/AdminAuthMiddleware');
const Roles = require('../utils/AdminRoles');

router.post("/", categoryController.upload.single("thumbnail"), categoryController.createCategory);
router.get("/",  categoryController.getAllCategories);
router.put("/:id",  categoryController.upload.single("thumbnail"), categoryController.updateCategory);
router.delete("/:id",  categoryController.deleteCategory);
router.get("/:filename",  categoryController.getImage);

module.exports = router;
