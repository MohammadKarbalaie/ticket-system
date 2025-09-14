const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: مدیریت دسته‌بندی‌ها
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: دریافت همه دسته‌بندی‌ها
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: لیست دسته‌بندی‌ها
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: دریافت یک دسته‌بندی با آیدی
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دسته‌بندی
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: دسته‌بندی یافت شد
 *       404:
 *         description: دسته‌بندی یافت نشد
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: ایجاد دسته‌بندی (فقط ادمین)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: دسته‌بندی ایجاد شد
 *       400:
 *         description: خطا در داده‌ها
 */
router.post("/", authMiddleware, adminOnly, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: ویرایش دسته‌بندی (فقط ادمین)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دسته‌بندی
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: دسته‌بندی بروزرسانی شد
 *       404:
 *         description: دسته‌بندی یافت نشد
 */
router.put("/:id", authMiddleware, adminOnly, updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: حذف دسته‌بندی (فقط ادمین)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دسته‌بندی
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: دسته‌بندی حذف شد
 *       404:
 *         description: دسته‌بندی یافت نشد
 */
router.delete("/:id", authMiddleware, adminOnly, deleteCategory);

module.exports = router;
