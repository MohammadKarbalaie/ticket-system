const Category = require("../models/category");

// ---------------- ایجاد دسته‌بندی (فقط ادمین) ----------------
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "این دسته‌بندی قبلاً ثبت شده است" });
    }

    const category = new Category({
      name: name.trim(),
      description,
    });

    await category.save();

    res.status(201).json({
      message: "دسته‌بندی با موفقیت ایجاد شد",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت همه دسته‌بندی‌ها (برای همه) ----------------
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- دریافت دسته‌بندی با آیدی (برای همه) ----------------
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "دسته‌بندی یافت نشد" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- ویرایش دسته‌بندی (فقط ادمین) ----------------
exports.updateCategory = async (req, res) => {
  try {
    const updates = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!category) return res.status(404).json({ message: "دسته‌بندی یافت نشد" });

    res.json({ message: "دسته‌بندی بروزرسانی شد", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- حذف دسته‌بندی (فقط ادمین) ----------------
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "دسته‌بندی یافت نشد" });

    res.json({ message: "دسته‌بندی با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
