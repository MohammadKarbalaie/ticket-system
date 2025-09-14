const express = require("express");
const {
  createMessage,
  getMessagesByTicket,
  updateMessage,
  deleteMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: مدیریت پیام‌های تیکت
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: ارسال پیام جدید برای یک تیکت
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketId
 *               - body
 *             properties:
 *               ticketId:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: پیام ارسال شد
 *       400:
 *         description: خطای ورودی
 */
router.post("/", authMiddleware, createMessage);

/**
 * @swagger
 * /api/messages/{ticketId}:
 *   get:
 *     summary: دریافت همه پیام‌های یک تیکت
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         description: آیدی تیکت
 *     responses:
 *       200:
 *         description: لیست پیام‌ها
 *       404:
 *         description: پیام یافت نشد
 */
router.get("/:ticketId", authMiddleware, getMessagesByTicket);

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: بروزرسانی یک پیام
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی پیام
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: پیام بروزرسانی شد
 *       404:
 *         description: پیام یافت نشد یا دسترسی ندارید
 */
router.put("/:id", authMiddleware, updateMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: حذف یک پیام
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی پیام
 *     responses:
 *       200:
 *         description: پیام حذف شد
 *       404:
 *         description: پیام یافت نشد یا دسترسی ندارید
 */
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;
