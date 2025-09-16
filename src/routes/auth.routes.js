const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: مدیریت احراز هویت کاربران
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: ثبت‌نام کاربر جدید
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fname, lname, email, username, password]
 *             properties:
 *               fname: { type: string }
 *               lname: { type: string }
 *               email: { type: string }
 *               username: { type: string }
 *               department: { type: string }
 *               phone: { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: ثبت‌نام موفقیت‌آمیز }
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: ورود کاربر و دریافت توکن
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: ورود موفقیت‌آمیز }
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: دریافت Access Token جدید با Refresh Token
 *     tags: [Auth]
 *     responses:
 *       200: { description: توکن جدید صادر شد }
 *       401: { description: رفرش توکن یافت نشد }
 *       403: { description: رفرش توکن نامعتبر است }
 */
router.post("/refresh", authController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: خروج کاربر و پاک کردن رفرش توکن
 *     tags: [Auth]
 *     responses:
 *       200: { description: خروج موفقیت‌آمیز }
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: دریافت پروفایل کاربر جاری
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: پروفایل کاربر }
 */
router.get("/profile", authMiddleware, authController.profile);

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: بروزرسانی پروفایل کاربر جاری
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname: { type: string }
 *               lname: { type: string }
 *               phone: { type: string }
 *               department: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: بروزرسانی موفقیت‌آمیز }
 */
router.put("/profile", authMiddleware, authController.updateUser);

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: تغییر پسورد کاربر جاری
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string }
 *     responses:
 *       200: { description: پسورد با موفقیت تغییر کرد }
 *       400: { description: پسورد قبلی اشتباه است }
 */
router.put("/change-password", authMiddleware, (req, res) =>
  authController.changePassword(req, res, "self")
);

/**
 * @swagger
 * /api/auth/profile:
 *   delete:
 *     summary: حذف اکانت کاربر جاری
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: اکانت حذف شد }
 */
router.delete("/profile", authMiddleware, authController.deleteUser);

module.exports = router;
