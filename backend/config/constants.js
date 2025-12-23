/**
 * Application-wide constants
 * Centralized configuration for categories, enums, and limits
 */

module.exports = {
  // Decision categories
  DECISION_CATEGORIES: [
    'food',
    'activity',
    'meeting',
    'movie',
    'travel',
    'shopping',
    'other'
  ],

  // Decision session statuses
  DECISION_STATUS: {
    COLLECTING: 'collecting',    // Waiting for member inputs
    PROCESSING: 'processing',    // Algorithm is running
    COMPLETED: 'completed',      // Decision made
    CANCELLED: 'cancelled'       // Session cancelled
  },

  // Group member roles
  GROUP_ROLES: {
    ADMIN: 'admin',
    MEMBER: 'member'
  },

  // Constraint weights (default values)
  DEFAULT_WEIGHTS: {
    BUDGET: 0.8,
    LOCATION: 0.6,
    PREFERENCES: 0.4,
    TIME: 0.7
  },

  // Fairness multiplier bounds
  FAIRNESS_BOUNDS: {
    MIN: 0.7,  // User who always gets their way
    MAX: 1.5,  // User who rarely gets their way
    NEUTRAL: 1.0
  },

  // Fairness thresholds
  FAIRNESS_THRESHOLDS: {
    LOW: 0.4,   // Trigger high influence boost
    HIGH: 0.7   // Trigger influence reduction
  },

  // Limits
  LIMITS: {
    MAX_GROUP_SIZE: 20,
    MAX_OPTIONS: 50,
    MAX_CONSTRAINTS_PER_USER: 20,
    INVITE_CODE_LENGTH: 8,
    DECISION_EXPIRY_HOURS: 24,
    MAX_PREFERENCES: 10
  },

  // Scoring parameters
  SCORING: {
    MIN_SATISFACTION_RATE: 0.5,  // Minimum 50% constraint satisfaction
    PARTIAL_CREDIT_DECAY: 10,    // Exponential decay for near-misses
    TOP_ALTERNATIVES: 2           // Number of alternative options to show
  },

  // Dietary restrictions (common ones)
  DIETARY_RESTRICTIONS: [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'nut-free',
    'halal',
    'kosher',
    'pescatarian',
    'keto',
    'paleo'
  ],

  // Common preference tags
  PREFERENCE_TAGS: [
    'casual',
    'fine-dining',
    'fast-food',
    'outdoor',
    'indoor',
    'family-friendly',
    'romantic',
    'group-friendly',
    'quiet',
    'lively',
    'traditional',
    'modern'
  ],

  // Distance units
  DISTANCE_UNITS: {
    KILOMETERS: 'km',
    MILES: 'mi'
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },

  // Error messages
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already registered',
    USER_NOT_FOUND: 'User not found',
    GROUP_NOT_FOUND: 'Group not found',
    DECISION_NOT_FOUND: 'Decision session not found',
    UNAUTHORIZED: 'Not authorized to access this resource',
    INVALID_TOKEN: 'Invalid or expired token',
    ALREADY_MEMBER: 'User is already a member of this group',
    INVALID_INVITE_CODE: 'Invalid invite code',
    SESSION_EXPIRED: 'Decision session has expired',
    CONSTRAINTS_INCOMPLETE: 'Not all members have submitted constraints',
    NO_FEASIBLE_SOLUTION: 'No option satisfies the given constraints'
  }
};