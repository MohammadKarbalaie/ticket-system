const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ---------------- تنظیمات JWT ----------------
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("❌ JWT_SECRET یا JWT_REFRESH_SECRET در .env تعریف نشده است");
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = "60m"; // access token کوتاه‌مدت
const JWT_REFRESH_EXPIRES_IN = "7d"; // refresh token بلندمدت

// ---------------- توابع کمکی ----------------
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

// ---------------- ثبت‌نام ----------------
exports.register = async (req, res) => {
  try {
    const { fname, lname, email, username, department, phone, password } =
      req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "ایمیل، نام کاربری و پسورد الزامی است" });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "ایمیل یا نام کاربری قبلاً ثبت شده است" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fname,
      lname,
      email: email.toLowerCase().trim(),
      username,
      department,
      phone,
      password: hashedPassword,
      role: "user",
      status: "active",
    });

    if (req.file) user.avatar = req.file.filename;

    await user.save();

    res.status(201).json({
      message: "ثبت‌نام موفقیت‌آمیز بود",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- ورود ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "ایمیل و پسورد الزامی است" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "کاربر یافت نشد" });

    if (user.status !== "active") {
      return res
        .status(403)
        .json({ message: "اکانت شما فعال نیست، لطفاً با مدیر تماس بگیرید" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "پسورد اشتباه است" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ذخیره refreshToken در کوکی HttpOnly
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "ورود موفقیت‌آمیز بود",
      accessToken,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- گرفتن پروفایل ----------------
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- بروزرسانی پروفایل ----------------
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.role;
    delete updates.status;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    if (req.file) updates.avatar = req.file.filename;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    res.json({ message: "بروزرسانی موفقیت‌آمیز بود", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- حذف پروفایل ----------------
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    res.clearCookie("refreshToken");
    res.json({ message: "اکانت شما حذف شد" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- رفرش توکن ----------------
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "رفرش توکن یافت نشد" });

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "رفرش توکن نامعتبر است" });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- خروج ----------------
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "خروج موفقیت‌آمیز بود" });
};
