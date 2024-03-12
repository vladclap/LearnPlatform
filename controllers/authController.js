// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, "your-secret-key", { expiresIn: "1h" });
};

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      specialty,
      role,
      username,
      password,
    } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      specialty,
      role,
      username,
      password,
    });

    const token = signToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
