/**
 * Input validation utilities
 */

/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required fields
 * @param {Object} data - Object containing data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - { isValid: Boolean, missingFields: Array }
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missingFields.push(field);
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Sanitize string input
 * @param {String} input - String to sanitize
 * @returns {String}
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate array of skills
 * @param {Array} skills - Array of skills to validate
 * @returns {Boolean}
 */
const validateSkillsArray = (skills) => {
  if (!Array.isArray(skills)) return false;
  if (skills.length === 0) return false;
  return skills.every(skill => typeof skill === 'string' && skill.trim().length > 0);
};

module.exports = {
  isValidEmail,
  validateRequiredFields,
  sanitizeString,
  validateSkillsArray
};
