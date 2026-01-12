const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateSignup = [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
  body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),
  handleValidationErrors
];

const validateBloodRequest = [
  body('patientName').trim().isLength({ min: 2 }).withMessage('Patient name is required'),
  body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
  body('urgencyLevel').isIn(['critical', 'medium', 'normal']).withMessage('Invalid urgency level'),
  body('hospitalName').trim().isLength({ min: 2 }).withMessage('Hospital name is required'),
  body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
  body('unitsRequired').isInt({ min: 1, max: 10 }).withMessage('Units required must be 1-10'),
  body('contactPerson').trim().isLength({ min: 2 }).withMessage('Contact person is required'),
  body('contactPhone').isMobilePhone().withMessage('Valid contact phone is required'),
  handleValidationErrors
];

const validateProfileUpdate = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
  body('location').optional().trim().isLength({ min: 2 }).withMessage('Location must be at least 2 characters'),
  handleValidationErrors
];

module.exports = {
  validateSignup,
  validateLogin,
  validateBloodRequest,
  validateProfileUpdate
};