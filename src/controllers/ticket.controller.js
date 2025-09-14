const Ticket = require("../models/ticket");
const generateTicketNumber = require("../utils/ticketNumber");

// ---------------- ایجاد تیکت ----------------
exports.createTicket = async (req, res) => {
  try {
    const { title, category, assignedDepartment, description, priority } = req.body;

    const ticket = new Ticket({
      creator: req.user.id,
      category,
      title,
      assignedDepartment,
      description,
      priority,
    });

    await ticket.save();

    res.status(201).json({ message: "تیکت ایجاد شد", ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت همه تیکت‌ها (ادمین) ----------------
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("creator", "fname lname email")
      .populate("category", "name");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت تیکت‌های کاربر جاری ----------------
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ creator: req.user.id })
      .populate("category", "name");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت یک تیکت ----------------
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("creator", "fname lname email")
      .populate("category", "name");

    if (!ticket) return res.status(404).json({ message: "تیکت یافت نشد" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- بروزرسانی تیکت ----------------
exports.updateTicket = async (req, res) => {
  try {
    const updates = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!ticket) return res.status(404).json({ message: "تیکت یافت نشد" });
    res.json({ message: "تیکت بروزرسانی شد", ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- حذف تیکت ----------------
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "تیکت یافت نشد" });

    res.json({ message: "تیکت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
