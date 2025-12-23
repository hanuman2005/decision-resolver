const { verifyToken } = require('../utils/tokenUtils');
const User = require('../models/User');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens
 */

/**
 * Verify JWT token and attach user to request
 */
const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }
    
    // If no token found, return unauthorized
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }
    
    try {
      // Verify token
      const decoded = verifyToken(token);
      
      // Get user from database (exclude password)
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND
        });
      }
      
      if (!user.isActive) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: 'Account is deactivated'
        });
      }
      
      // Attach user to request object
      req.user = user;
      next();
      
    } catch (error) {
      logger.warn('Token verification failed:', error.message);
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_TOKEN
      });
    }
    
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

/**
 * Optional authentication - attaches user if token exists but doesn't fail if not
 */
const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Silently fail - user remains undefined
        logger.debug('Optional auth failed, continuing without user');
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  optionalAuth
};