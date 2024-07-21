const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register Route
router.post('/signup', authController.register);

// Login Route
router.post('/signin', authController.signIn);

// Refresh Token Route
router.post('/refresh-token', authController.refreshToken);

// Dashboard Route
router.get('/dashboard', authController.dashboard);

module.exports = router;
