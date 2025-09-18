async function generateTicketNumber() {
  const Ticket = require("../models/ticket");

  const last = await Ticket.findOne({}).sort({ createdAt: -1 }).exec();
  if (!last) return "TKT0001";

  const match = (last.ticketNumber || "TKT0000").match(/TKT(\d+)/);
  const num = match ? parseInt(match[1], 10) + 1 : 1;

  return "TKT" + String(num).padStart(4, "0");
}

module.exports = generateTicketNumber;
