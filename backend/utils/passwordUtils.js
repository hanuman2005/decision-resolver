const bcrypt = require('bcryptjs');

/**
 * Password hashing and verification utilities
 * Uses bcrypt for secure password handling
 */

/**
 * Hash a plain text password
 * @param {String} password - Plain text password
 * @returns {Promise<String>} Hashed password
 */
const hashPassword = async (password) => {
  try {
    // Generate salt with 10 rounds (good balance of security and performance)
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

/**
 * Compare plain text password with hashed password
 * @param {String} plainPassword - Plain text password from login
 * @param {String} hashedPassword - Hashed password from database
 * @returns {Promise<Boolean>} True if passwords match
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Validate password strength
 * @param {String} password - Password to validate
 * @returns {Object} { isValid: Boolean, message: String }
 */
const validatePasswordStrength = (password) => {
  // Minimum 8 characters
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character'
    };
  }

  return {
    isValid: true,
    message: 'Password is strong'
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  validatePasswordStrength
};