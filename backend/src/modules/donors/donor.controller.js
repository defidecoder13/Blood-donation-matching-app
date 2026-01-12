const Donor = require('./donor.model');
const User = require('../users/user.model');

// Get donor profile
const getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id })
      .populate('user', '-password');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    res.json({
      success: true,
      data: { donor }
    });
  } catch (error) {
    console.error('Get donor profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donor profile'
    });
  }
};

// Update donor profile
const updateDonorProfile = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = [
      'bloodGroup', 'availability', 'availabilitySchedule',
      'medicalHistory', 'emergencyContact', 'notificationsEnabled'
    ];

    // Handle location updates
    if (req.body.location) {
      updates.location = {
        ...req.body.location,
        coordinates: req.body.location.coordinates || [0, 0]
      };
    }

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const donor = await Donor.findOneAndUpdate(
      { user: req.user._id },
      updates,
      { new: true, runValidators: true }
    ).populate('user', '-password');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Donor profile updated successfully',
      data: { donor }
    });
  } catch (error) {
    console.error('Update donor profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donor profile'
    });
  }
};

// Update availability status
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    if (!['available', 'unavailable', 'busy'].includes(availability)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid availability status'
      });
    }

    const donor = await Donor.findOneAndUpdate(
      { user: req.user._id },
      { availability },
      { new: true }
    ).populate('user', '-password');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Availability updated successfully',
      data: { donor }
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update availability'
    });
  }
};

// Get donor statistics
const getDonorStats = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    const stats = {
      totalDonations: donor.totalDonations,
      successfulDonations: donor.successfulDonations,
      trustScore: donor.trustScore,
      responseRate: donor.getResponseRate(),
      availability: donor.availability,
      isEligible: donor.isEligibleToDonate(),
      lastDonationDate: donor.lastDonationDate,
      nextEligibleDate: donor.nextEligibleDate
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get donor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donor statistics'
    });
  }
};

// Update trust score (admin function)
const updateTrustScore = async (req, res) => {
  try {
    const { donorId, trustScore, reason } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      donorId,
      { trustScore },
      { new: true }
    ).populate('user', '-password');

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    // Log the trust score change
    console.log(`Trust score updated for donor ${donorId}: ${trustScore} - Reason: ${reason}`);

    res.json({
      success: true,
      message: 'Trust score updated successfully',
      data: { donor }
    });
  } catch (error) {
    console.error('Update trust score error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trust score'
    });
  }
};

module.exports = {
  getDonorProfile,
  updateDonorProfile,
  updateAvailability,
  getDonorStats,
  updateTrustScore
};