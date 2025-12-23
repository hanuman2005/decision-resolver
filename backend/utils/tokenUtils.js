const jwt = require('jsonwebtoken');

/**
 * JWT Token utility functions
 * Handles token generation and verification
 */

/**
 * Generate JWT token for user authentication
 * @param {Object} payload - User data to encode (typically user ID)
 * @param {String} expiresIn - Token expiration time (default from env)
 * @returns {String} JWT token
 */
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRE || '7d') => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
      issuer: 'group-decision-resolver',
      audience: 'gdr-users'
    });
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

/**
 * Verify JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'group-decision-resolver',
      audience: 'gdr-users'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Decode token without verification (useful for debugging)
 * @param {String} token - JWT token to decode
 * @returns {Object} Decoded payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate refresh token (longer expiration)
 * @param {Object} payload - User data to encode
 * @returns {String} Refresh token
 */
const generateRefreshToken = (payload) => {
  return generateToken(payload, '30d');
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  generateRefreshToken
};