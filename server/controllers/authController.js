const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

// Register User
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirmation,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !passwordConfirmation
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Sign In User
const signIn = async (req, res) => {
  try {
    const { credential, password } = req.body;

    if (!credential || !password) {
      return res
        .status(400)
        .json({ error: "Email/Username and password are required" });
    }

    const user =
      (await User.findOne({ email: credential })) ||
      (await User.findOne({ username: credential }));
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

// Refresh Token
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken({ _id: decoded.id });
    res.json({ accessToken });
  });
};

// Dashboard Route
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader; // Directly use the token

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    console.error("Token Verification Error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  register,
  signIn,
  refreshToken,
  dashboard, // Export the new function
};
