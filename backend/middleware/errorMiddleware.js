const { HTTP_STATUS } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(HTTP_STATUS.NOT_FOUND);
  next(error);
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  // Log error details
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });
  
  // Determine status code
  let statusCode = res.statusCode === 200 ? HTTP_STATUS.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = err.message;
  
  // Handle specific error types
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    
    return res.status(statusCode).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
    
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
  
  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
    
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }
  
  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }
  
  // Default error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  notFound,
  errorHandler,
  asyncHandler
};