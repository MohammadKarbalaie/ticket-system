const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // مثلا: "فناوری اطلاعات"
  description: { type: String }
});

module.exports = mongoose.model("Department", DepartmentSchema);
