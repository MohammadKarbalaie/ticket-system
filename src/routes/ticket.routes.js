const express = require("express");
const {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: مدیریت تیکت‌ها
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: دریافت همه تیکت‌ها (فقط ادمین)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست همه تیکت‌ها
 *       401:
 *         description: احراز هویت ناموفق
 *       403:
 *         description: دسترسی غیرمجاز
 */
router.get("/", authMiddleware, adminOnly, getAllTickets);

/**
 * @swagger
 * /api/tickets/my:
 *   get:
 *     summary: دریافت تیکت‌های کاربر جاری
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست تیکت‌های کاربر
 */
router.get("/my", authMiddleware, getMyTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: دریافت یک تیکت با آیدی
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی تیکت
 *     responses:
 *       200:
 *         description: تیکت پیدا شد
 *       404:
 *         description: تیکت یافت نشد
 */
router.get("/:id", authMiddleware, getTicketById);

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: ایجاد یک تیکت جدید
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               assignedDepartment:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *     responses:
 *       201:
 *         description: تیکت ایجاد شد
 *       400:
 *         description: خطای ورودی
 */
router.post("/", authMiddleware, createTicket);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: بروزرسانی یک تیکت
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی تیکت
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [open, in_progress, resolved, closed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *               assignedDepartment:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: تیکت بروزرسانی شد
 *       404:
 *         description: تیکت یافت نشد
 */
router.put("/:id", authMiddleware, updateTicket);

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: حذف یک تیکت
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی تیکت
 *     responses:
 *       200:
 *         description: تیکت حذف شد
 *       404:
 *         description: تیکت یافت نشد
 */
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;
