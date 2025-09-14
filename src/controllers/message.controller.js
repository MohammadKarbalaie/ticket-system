const Message = require("../models/message");

// ---------------- ارسال پیام ----------------
exports.createMessage = async (req, res) => {
  try {
    const { ticketId, body } = req.body;

    const message = new Message({
      ticket: ticketId,
      sender: req.user.id,
      body,
    });

    await message.save();

    res.status(201).json({ message: "پیام ارسال شد", data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت پیام‌های یک تیکت ----------------
exports.getMessagesByTicket = async (req, res) => {
  try {
    const messages = await Message.find({ ticket: req.params.ticketId })
      .populate("sender", "fname lname email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- بروزرسانی پیام ----------------
exports.updateMessage = async (req, res) => {
  try {
    const updates = req.body;

    const message = await Message.findOneAndUpdate(
      { _id: req.params.id, sender: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!message) return res.status(404).json({ message: "پیام یافت نشد یا مجاز نیستید" });

    res.json({ message: "پیام بروزرسانی شد", data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- حذف پیام ----------------
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      sender: req.user.id,
    });

    if (!message) return res.status(404).json({ message: "پیام یافت نشد یا مجاز نیستید" });

    res.json({ message: "پیام حذف شد" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
