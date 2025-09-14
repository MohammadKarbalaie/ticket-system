// چک کردن نقش کاربر
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "شما اجازه دسترسی ندارید" });
    }
    next();
  };
};

// فقط ادمین
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "دسترسی فقط برای ادمین مجاز است" });
  }
  next();
};
