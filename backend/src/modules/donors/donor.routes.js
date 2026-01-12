const express = require('express');
const router = express.Router();
const {
  getDonorProfile,
  updateDonorProfile,
  updateAvailability,
  getDonorStats,
  updateTrustScore
} = require('./donor.controller');
const { authenticate, authorize } = require('../../middlewares/auth');

// All donor routes require authentication
router.use(authenticate);

// Get donor profile
router.get('/profile', getDonorProfile);

// Update donor profile
router.put('/profile', updateDonorProfile);

// Update availability status
router.put('/availability', updateAvailability);

// Get donor statistics
router.get('/stats', getDonorStats);

// Admin routes
router.put('/trust-score', authorize('admin'), updateTrustScore);

module.exports = router;