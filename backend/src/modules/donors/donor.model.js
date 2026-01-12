const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
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
      default: ''
    },
    pincode: {
      type: String,
      default: ''
    }
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable', 'busy'],
    default: 'available'
  },
  availabilitySchedule: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: true }
  },
  trustScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  successfulDonations: {
    type: Number,
    default: 0
  },
  lastDonationDate: {
    type: Date,
    default: null
  },
  nextEligibleDate: {
    type: Date,
    default: null
  },
  medicalHistory: {
    weight: { type: Number, min: 45 },
    height: { type: Number },
    hasDisease: { type: Boolean, default: false },
    diseaseDetails: { type: String, default: '' },
    medications: { type: String, default: '' },
    allergies: { type: String, default: '' }
  },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relation: { type: String, required: true }
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: { type: String, enum: ['id_proof', 'medical_certificate', 'blood_test'] },
    url: { type: String },
    uploadedAt: { type: Date, default: Date.now }
  }],
  responseHistory: [{
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
    response: { type: String, enum: ['accepted', 'declined', 'no_response'] },
    respondedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
  }],
  notificationsEnabled: {
    type: Boolean,
    default: true
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

// Geospatial index for location-based queries
donorSchema.index({ location: '2dsphere' });
donorSchema.index({ bloodGroup: 1, availability: 1 });
donorSchema.index({ trustScore: -1 });
donorSchema.index({ user: 1 });

// Virtual for full name
donorSchema.virtual('fullName').get(function() {
  return `${this.user.firstName} ${this.user.lastName}`;
});

// Method to check if donor is eligible to donate
donorSchema.methods.isEligibleToDonate = function() {
  if (this.nextEligibleDate && this.nextEligibleDate > new Date()) {
    return false;
  }
  return this.availability === 'available' && this.verificationStatus === 'verified';
};

// Method to calculate response rate
donorSchema.methods.getResponseRate = function() {
  if (this.responseHistory.length === 0) return 0;
  const responses = this.responseHistory.filter(r => r.response !== 'no_response').length;
  return (responses / this.responseHistory.length) * 100;
};

// Update updatedAt on save
donorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donor', donorSchema);