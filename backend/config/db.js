const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connect to MongoDB database
 * Implements retry logic for production reliability
 */
const connectDB = async () => {
  try {
    // MongoDB connection options
    const options = {
      // useNewUrlParser and useUnifiedTopology are now default in Mongoose 6+
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Log database name for confirmation
    logger.info(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('✅ MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error.message);
    
    // In production, you might want to retry or use a different strategy
    if (process.env.NODE_ENV === 'production') {
      // Retry after 5 seconds
      logger.info('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      // In development, exit immediately for faster debugging
      process.exit(1);
    }
  }
};

/**
 * Gracefully close database connection
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectDB, closeDB };