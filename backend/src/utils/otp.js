const crypto = require('crypto');

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

const storeOTP = (identifier, otp) => {
  otpStore.set(identifier, {
    otp,
    expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes
  });
};

const verifyOTP = (identifier, otp) => {
  const stored = otpStore.get(identifier);

  if (!stored) {
    return false;
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(identifier);
    return false;
  }

  if (stored.otp === otp) {
    otpStore.delete(identifier);
    return true;
  }

  return false;
};

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP
};