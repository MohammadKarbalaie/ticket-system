const express = require("express");
const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: مدیریت دپارتمان‌ها
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: دریافت لیست دپارتمان‌ها
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: لیست دپارتمان‌ها
 */
router.get("/", getDepartments);

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: دریافت دپارتمان با آیدی
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دپارتمان
 *     responses:
 *       200:
 *         description: دپارتمان پیدا شد
 *       404:
 *         description: دپارتمان یافت نشد
 */
router.get("/:id", getDepartmentById);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: ایجاد دپارتمان جدید (فقط ادمین)
 *     tags: [Departments]
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
 *         description: دپارتمان ایجاد شد
 *       400:
 *         description: خطا در ورودی
 */
router.post("/", authMiddleware, adminOnly, createDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: بروزرسانی دپارتمان (فقط ادمین)
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دپارتمان
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
 *         description: دپارتمان بروزرسانی شد
 *       404:
 *         description: دپارتمان یافت نشد
 */
router.put("/:id", authMiddleware, adminOnly, updateDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: حذف دپارتمان (فقط ادمین)
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی دپارتمان
 *     responses:
 *       200:
 *         description: دپارتمان حذف شد
 *       404:
 *         description: دپارتمان یافت نشد
 */
router.delete("/:id", authMiddleware, adminOnly, deleteDepartment);

module.exports = router;
