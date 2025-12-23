const { HTTP_STATUS } = require('../config/constants');

/**
 * Validation Middleware
 * Validates request data against Joi schemas
 */

/**
 * Validate request body against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true // Remove unknown fields
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

/**
 * Validate request params against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid parameters',
        errors
      });
    }
    
    req.params = value;
    next();
  };
};

/**
 * Validate request query against a Joi schema
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid query parameters',
        errors
      });
    }
    
    req.query = value;
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
  validateQuery
};