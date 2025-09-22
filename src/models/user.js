const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    phone: { type: String },
    role: {
      type: String,
      enum: ["ادمین", "مدیر ", "کارمند", "کاربر"],
      default: "کاربر",
    },
    status: {
      type: String,
      enum: ["فعال", "غیر فعال", "بن شده"],
      default: "فعال",
    },
    joinedAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
