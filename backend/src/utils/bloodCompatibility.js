// Blood type compatibility matrix
const compatibilityMatrix = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

// Check if donor blood type is compatible with recipient need
const isCompatible = (donorBloodType, recipientBloodType) => {
  return compatibilityMatrix[donorBloodType]?.includes(recipientBloodType) || false;
};

// Get all compatible donor blood types for a recipient
const getCompatibleDonors = (recipientBloodType) => {
  return Object.keys(compatibilityMatrix).filter(donorType =>
    compatibilityMatrix[donorType].includes(recipientBloodType)
  );
};

// Calculate compatibility score (1.0 for perfect match, 0.5 for compatible, 0 for incompatible)
const getCompatibilityScore = (donorBloodType, recipientBloodType) => {
  if (donorBloodType === recipientBloodType) return 1.0;
  if (isCompatible(donorBloodType, recipientBloodType)) return 0.5;
  return 0;
};

module.exports = {
  isCompatible,
  getCompatibleDonors,
  getCompatibilityScore,
  compatibilityMatrix
};