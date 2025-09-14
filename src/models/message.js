const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


MessageSchema.post("save", async function (doc, next) {
  try {
    const Ticket = mongoose.model("Ticket");
    await Ticket.findByIdAndUpdate(doc.ticket, { updatedAt: new Date() });
  } catch (err) {
    console.error("خطا در بروزرسانی updatedAt تیکت:", err.message);
  }
  next();
});

module.exports = mongoose.model("Message", MessageSchema);
