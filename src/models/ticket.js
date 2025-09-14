const mongoose = require("mongoose");
const generateTicketNumber = require("../utils/ticketNumber");

const TicketSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  title: { type: String, required: true },
  ticketNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  assignedDepartment: { type: String, required: true }, // کاربر باید انتخاب کند
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TicketSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});


TicketSchema.pre("validate", async function (next) {
  if (!this.ticketNumber) {
    this.ticketNumber = await generateTicketNumber();
  }
  next();
});

module.exports = mongoose.model("Ticket", TicketSchema);
