const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.register);

router.post('/signin', authController.signIn);

router.post('/refresh-token', authController.refreshToken);

router.get('/dashboard', authController.dashboard);

module.exports = router;
