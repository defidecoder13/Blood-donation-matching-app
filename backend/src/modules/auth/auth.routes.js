const express = require('express');
const router = express.Router();
const {
  sendOTP,
  verifyOTP,
  register,
  login,
  getProfile,
  updateProfile
} = require('./auth.controller');
const { authenticate } = require('../../middlewares/auth');
const { validateSignup, validateLogin, validateProfileUpdate } = require('../../middlewares/validation');

// Public routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register', register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);

module.exports = router;