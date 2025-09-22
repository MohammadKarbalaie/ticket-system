const Department = require("../models/department");

// ایجاد دپارتمان جدید
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: "این دپارتمان قبلاً ثبت شده است" });

    const department = new Department({ name, description });
    await department.save();

    res.status(201).json({ message: "دپارتمان ایجاد شد", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// دریافت همه دپارتمان‌ها
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// دریافت دپارتمان با آیدی
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "دپارتمان یافت نشد" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// بروزرسانی دپارتمان
exports.updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!department) return res.status(404).json({ message: "دپارتمان یافت نشد" });

    res.json({ message: "دپارتمان بروزرسانی شد", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// حذف دپارتمان
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: "دپارتمان یافت نشد" });

    res.json({ message: "دپارتمان حذف شد" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
