const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getRequestById,
  updateRequest,
  cancelRequest,
  getNearbyDonors,
  verifyRequest
} = require('./request.controller');
const { authenticate, authorize } = require('../../middlewares/auth');
const { validateBloodRequest } = require('../../middlewares/validation');

// All routes require authentication
router.use(authenticate);

// Create new blood request
router.post('/', validateBloodRequest, createRequest);

// Get user's requests
router.get('/', getUserRequests);

// Get specific request
router.get('/:id', getRequestById);

// Update request
router.put('/:id', updateRequest);

// Cancel request
router.delete('/:id', cancelRequest);

// Get nearby donors for a request (admin/moderator)
router.get('/:requestId/nearby-donors', authorize('admin'), getNearbyDonors);

// Verify request (admin)
router.put('/:requestId/verify', authorize('admin'), verifyRequest);

module.exports = router;