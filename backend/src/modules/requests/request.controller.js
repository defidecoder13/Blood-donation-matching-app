const Request = require('./request.model');
const Donor = require('../donors/donor.model');
const { getCompatibleDonors } = require('../../utils/bloodCompatibility');

// Create new blood request
const createRequest = async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      urgencyLevel,
      unitsRequired,
      hospitalName,
      location,
      contactPerson,
      contactPhone,
      additionalNotes
    } = req.body;
    const locationData = location;

    // Calculate priority based on urgency
    const priorityMap = { critical: 100, medium: 75, normal: 50 };
    const priority = priorityMap[urgencyLevel] || 50;

    // Create location object
    const locationObj = {
      type: 'Point',
      coordinates: locationData.coordinates || [0, 0],
      address: locationData.address,
      city: locationData.city,
      state: locationData.state,
      pincode: locationData.pincode
    };

    const request = new Request({
      requester: req.user._id,
      patientName,
      bloodGroup,
      urgencyLevel,
      unitsRequired,
      hospitalName,
      location: locationObj,
      contactPerson,
      contactPhone,
      additionalNotes,
      priority
    });

    await request.save();

    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blood request'
    });
  }
};

// Get user's requests
const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { requests }
    });
  } catch (error) {
    console.error('Get user requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get requests'
    });
  }
};

// Get request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('requester', 'firstName lastName email phone')
      .populate('matches.donor', 'user bloodGroup location availability trustScore');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user owns this request or is admin
    if (request.requester._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { request }
    });
  } catch (error) {
    console.error('Get request by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get request'
    });
  }
};

// Update request
const updateRequest = async (req, res) => {
  try {
    const request = await Request.findOne({
      _id: req.params.id,
      requester: req.user._id
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Only allow updates if request is still active
    if (request.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update completed or expired request'
      });
    }

    const allowedFields = [
      'patientName', 'urgencyLevel', 'unitsRequired',
      'hospitalName', 'contactPerson', 'contactPhone', 'additionalNotes'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        request[field] = req.body[field];
      }
    });

    // Recalculate priority if urgency changed
    if (req.body.urgencyLevel) {
      const priorityMap = { critical: 100, medium: 75, normal: 50 };
      request.priority = priorityMap[req.body.urgencyLevel] || 50;
    }

    await request.save();

    res.json({
      success: true,
      message: 'Request updated successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update request'
    });
  }
};

// Cancel request
const cancelRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params.id, requester: req.user._id, status: 'active' },
      { status: 'cancelled' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Active request not found'
      });
    }

    res.json({
      success: true,
      message: 'Request cancelled successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Cancel request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel request'
    });
  }
};

// Get nearby donors for a request (admin/moderator function)
const getNearbyDonors = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Find compatible donors within reasonable distance
    const compatibleBloodTypes = getCompatibleDonors(request.bloodGroup);

    const donors = await Donor.find({
      bloodGroup: { $in: compatibleBloodTypes },
      availability: 'available',
      verificationStatus: 'verified',
      location: {
        $near: {
          $geometry: request.location,
          $maxDistance: 50000 // 50km radius
        }
      }
    })
    .populate('user', 'firstName lastName email phone')
    .limit(50);

    res.json({
      success: true,
      data: { donors, count: donors.length }
    });
  } catch (error) {
    console.error('Get nearby donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get nearby donors'
    });
  }
};

// Verify request (admin function)
const verifyRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { isVerified, verificationNotes } = req.body;

    const request = await Request.findByIdAndUpdate(
      requestId,
      { isVerified, verificationNotes },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.json({
      success: true,
      message: 'Request verification updated',
      data: { request }
    });
  } catch (error) {
    console.error('Verify request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify request'
    });
  }
};

module.exports = {
  createRequest,
  getUserRequests,
  getRequestById,
  updateRequest,
  cancelRequest,
  getNearbyDonors,
  verifyRequest
};