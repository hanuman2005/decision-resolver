/**
 * Environment Configuration
 * Validates and exports environment variables
 */

require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  
  // Decision Session
  DECISION_SESSION_EXPIRY: parseInt(process.env.DECISION_SESSION_EXPIRY, 10) || 24,
  
  // Flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTesting: process.env.NODE_ENV === 'test',
};

module.exports = env;