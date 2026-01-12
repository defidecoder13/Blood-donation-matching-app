const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  urgencyLevel: {
    type: String,
    enum: ['critical', 'medium', 'normal'],
    required: true
  },
  unitsRequired: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  unitsFulfilled: {
    type: Number,
    default: 0,
    min: 0
  },
  hospitalName: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  additionalNotes: {
    type: String,
    maxlength: 500,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'cancelled', 'expired'],
    default: 'active'
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  matches: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor'
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'completed'],
      default: 'pending'
    },
    notifiedAt: {
      type: Date,
      default: null
    },
    respondedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    }
  }],
  notificationsSent: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationNotes: {
    type: String,
    default: ''
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Default expiry based on urgency
      const hours = this.urgencyLevel === 'critical' ? 24 :
                   this.urgencyLevel === 'medium' ? 72 : 168; // 1 day, 3 days, 7 days
      return new Date(Date.now() + hours * 60 * 60 * 1000);
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
requestSchema.index({ location: '2dsphere' });
requestSchema.index({ bloodGroup: 1, status: 1 });
requestSchema.index({ urgencyLevel: 1 });
requestSchema.index({ expiresAt: 1 });
requestSchema.index({ requester: 1 });

// Virtual for remaining units
requestSchema.virtual('unitsRemaining').get(function() {
  return this.unitsRequired - this.unitsFulfilled;
});

// Virtual for is fulfilled
requestSchema.virtual('isFulfilled').get(function() {
  return this.unitsFulfilled >= this.unitsRequired;
});

// Method to check if request is expired
requestSchema.methods.isExpired = function() {
  return this.expiresAt < new Date() && this.status === 'active';
};

// Method to add match
requestSchema.methods.addMatch = function(donorId, matchScore) {
  if (!this.matches.some(match => match.donor.toString() === donorId.toString())) {
    this.matches.push({
      donor: donorId,
      matchScore: matchScore,
      status: 'pending'
    });
  }
};

// Method to update match status
requestSchema.methods.updateMatchStatus = function(donorId, status) {
  const match = this.matches.find(m => m.donor.toString() === donorId.toString());
  if (match) {
    match.status = status;
    match.respondedAt = new Date();
    if (status === 'completed') {
      match.completedAt = new Date();
      this.unitsFulfilled += 1;
      if (this.isFulfilled) {
        this.status = 'fulfilled';
      }
    }
  }
};

// Update updatedAt on save
requestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Request', requestSchema);