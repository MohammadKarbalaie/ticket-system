const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: مدیریت کاربران (ویژه ادمین)
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: ایجاد کاربر جدید توسط ادمین
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fname, lname, email, username, department, password]
 *             properties:
 *               fname: { type: string }
 *               lname: { type: string }
 *               email: { type: string }
 *               username: { type: string }
 *               department: { type: string }
 *               phone: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [admin, manager, staff, user] }
 *               status: { type: string, enum: [active, inactive, banned] }
 *     responses:
 *       201: { description: کاربر ایجاد شد }
 *       400: { description: ایمیل یا نام کاربری تکراری است }
 */
router.post("/", authMiddleware, adminOnly, authController.createUserByAdmin || ((req,res)=>res.status(501).json({message:"createUserByAdmin not implemented"})));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: دریافت لیست همه کاربران
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: لیست کاربران }
 */
router.get("/", authController.getAllUsers || ((req,res)=>res.status(501).json({message:"getAllUsers not implemented"})));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: دریافت اطلاعات یک کاربر بر اساس ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: اطلاعات کاربر }
 *       404: { description: کاربر یافت نشد }
 */
router.get("/:id", authMiddleware, adminOnly, authController.getUserById || ((req,res)=>res.status(501).json({message:"getUserById not implemented"})));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: بروزرسانی کاربر توسط ادمین
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname: { type: string }
 *               lname: { type: string }
 *               phone: { type: string }
 *               department: { type: string }
 *               role: { type: string, enum: [admin, manager, staff, user] }
 *               status: { type: string, enum: [active, inactive, banned] }
 *               password: { type: string }
 *     responses:
 *       200: { description: بروزرسانی موفقیت‌آمیز }
 *       404: { description: کاربر یافت نشد }
 */
router.put("/:id", authMiddleware, adminOnly, authController.updateUserByAdmin || ((req,res)=>res.status(501).json({message:"updateUserByAdmin not implemented"})));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: حذف کاربر توسط ادمین
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: کاربر حذف شد }
 *       404: { description: کاربر یافت نشد }
 */
router.delete("/:id", authMiddleware, adminOnly, authController.deleteUserByAdmin || ((req,res)=>res.status(501).json({message:"deleteUserByAdmin not implemented"})));

/**
 * @swagger
 * /api/users/{id}/reset-password:
 *   put:
 *     summary: تغییر پسورد یک کاربر توسط ادمین
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newPassword]
 *             properties:
 *               newPassword: { type: string }
 *     responses:
 *       200: { description: پسورد کاربر ریست شد }
 */
router.put("/:id/reset-password", authMiddleware, adminOnly, (req, res) =>
  authController.changePassword(req, res, "admin")
);


module.exports = router;
