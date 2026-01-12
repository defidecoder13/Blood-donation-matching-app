const Request = require('../requests/request.model');
const Donor = require('../donors/donor.model');
const { getCompatibilityScore } = require('../../utils/bloodCompatibility');

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Calculate match score for a donor-request pair
const calculateMatchScore = (donor, request) => {
  let score = 0;
  const weights = {
    compatibility: 40,
    distance: 30,
    availability: 20,
    trustScore: 10
  };

  // Blood compatibility (0-1 scale)
  const compatibility = getCompatibilityScore(donor.bloodGroup, request.bloodGroup);
  if (compatibility === 0) return 0; // Incompatible blood types
  score += compatibility * weights.compatibility;

  // Distance (inverse relationship - closer is better)
  const distance = calculateDistance(donor.location.coordinates, request.location.coordinates);
  const distanceScore = Math.max(0, 1 - (distance / 50)); // Max 50km, score decreases with distance
  score += distanceScore * weights.distance;

  // Availability
  const availabilityScore = donor.availability === 'available' ? 1 :
                           donor.availability === 'busy' ? 0.5 : 0;
  score += availabilityScore * weights.availability;

  // Trust score (normalized to 0-1)
  const trustScore = donor.trustScore / 100;
  score += trustScore * weights.trustScore;

  return Math.round(score);
};

// Find matches for a specific request
const findMatchesForRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Find compatible donors within 100km
    const compatibleBloodTypes = require('../../utils/bloodCompatibility').getCompatibleDonors(request.bloodGroup);

    const donors = await Donor.find({
      bloodGroup: { $in: compatibleBloodTypes },
      verificationStatus: 'verified',
      location: {
        $near: {
          $geometry: request.location,
          $maxDistance: 100000 // 100km
        }
      }
    })
    .populate('user', 'firstName lastName email phone')
    .limit(100); // Limit to prevent performance issues

    // Calculate match scores
    const matches = donors.map(donor => ({
      donor: donor._id,
      donorDetails: {
        id: donor._id,
        name: `${donor.user.firstName} ${donor.user.lastName}`,
        bloodGroup: donor.bloodGroup,
        phone: donor.user.phone,
        location: donor.location,
        availability: donor.availability,
        trustScore: donor.trustScore
      },
      matchScore: calculateMatchScore(donor, request),
      distance: calculateDistance(donor.location.coordinates, request.location.coordinates),
      compatibility: getCompatibilityScore(donor.bloodGroup, request.bloodGroup)
    }));

    // Sort by match score (descending)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Add top matches to request (avoid duplicates)
    const topMatches = matches.slice(0, 20); // Top 20 matches
    for (const match of topMatches) {
      request.addMatch(match.donor, match.matchScore);
    }

    await request.save();

    res.json({
      success: true,
      data: {
        request: request._id,
        matches: topMatches,
        totalFound: donors.length
      }
    });
  } catch (error) {
    console.error('Find matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find matches'
    });
  }
};

// Get potential donors for a blood type and location
const getPotentialDonors = async (req, res) => {
  try {
    const { bloodGroup, latitude, longitude, radius = 50 } = req.query;

    if (!bloodGroup || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Blood group, latitude, and longitude are required'
      });
    }

    const compatibleBloodTypes = require('../../utils/bloodCompatibility').getCompatibleDonors(bloodGroup);

    const donors = await Donor.find({
      bloodGroup: { $in: compatibleBloodTypes },
      availability: 'available',
      verificationStatus: 'verified',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      }
    })
    .populate('user', 'firstName lastName phone')
    .select('bloodGroup location availability trustScore lastDonationDate')
    .limit(50);

    res.json({
      success: true,
      data: {
        donors,
        count: donors.length,
        searchCriteria: {
          bloodGroup,
          location: [parseFloat(longitude), parseFloat(latitude)],
          radius: parseInt(radius)
        }
      }
    });
  } catch (error) {
    console.error('Get potential donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get potential donors'
    });
  }
};

// Update match status (when donor responds)
const updateMatchStatus = async (req, res) => {
  try {
    const { requestId, donorId, status } = req.body;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Check if user is the requester or an admin
    if (request.requester.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    request.updateMatchStatus(donorId, status);
    await request.save();

    // Update donor's response history
    if (status !== 'pending') {
      const donor = await Donor.findById(donorId);
      if (donor) {
        donor.responseHistory.push({
          requestId: requestId,
          response: status === 'accepted' ? 'accepted' :
                   status === 'declined' ? 'declined' : 'no_response'
        });
        await donor.save();
      }
    }

    res.json({
      success: true,
      message: 'Match status updated successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Update match status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update match status'
    });
  }
};

module.exports = {
  findMatchesForRequest,
  getPotentialDonors,
  updateMatchStatus
};