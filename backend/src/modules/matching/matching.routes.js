const express = require('express');
const router = express.Router();
const {
  findMatchesForRequest,
  getPotentialDonors,
  updateMatchStatus
} = require('./matching.controller');
const { authenticate, authorize } = require('../../middlewares/auth');

// All routes require authentication
router.use(authenticate);

// Find matches for a specific request
router.get('/request/:requestId', findMatchesForRequest);

// Get potential donors for blood type and location
router.get('/donors', getPotentialDonors);

// Update match status
router.put('/match-status', updateMatchStatus);

module.exports = router;