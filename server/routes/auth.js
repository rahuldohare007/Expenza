const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};

// Register Route
router.post('/signup', async (req, res) => {
  try {
    const { email, username, password, passwordConfirmation } = req.body;

    if (!email || !username || !password || !passwordConfirmation) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
router.post('/signin', async (req, res) => {
  try {
    const { credential, password } = req.body;

    if (!credential || !password) {
      return res.status(400).json({ error: 'Email/Username and password are required' });
    }

    const user = await User.findOne({ email: credential }) || await User.findOne({ username: credential });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Refresh Token Route
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken({ _id: decoded.id });
    res.json({ accessToken });
  });
});

module.exports = router;
