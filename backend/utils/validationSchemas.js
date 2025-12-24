const Joi = require("joi");
const {
  DECISION_CATEGORIES,
  DIETARY_RESTRICTIONS,
  LIMITS,
} = require("../config/constants");

/**
 * Joi validation schemas for request validation
 * Centralized validation logic for all endpoints
 */

// User validation schemas
const userSchemas = {
  // Register user
  register: Joi.object({
    name: Joi.string().min(2).max(50).required().trim().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),

    email: Joi.string().email().required().lowercase().trim().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),

    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
    }),
  }),

  // Login user
  login: Joi.object({
    email: Joi.string().email().required().lowercase().trim(),

    password: Joi.string().required(),
  }),

  // Update user profile
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50).trim(),
    avatar: Joi.string().uri(),
    preferences: Joi.object({
      defaultBudget: Joi.object({
        min: Joi.number().min(0),
        max: Joi.number().min(0),
      }),
      dietaryRestrictions: Joi.array().items(
        Joi.string().valid(...DIETARY_RESTRICTIONS)
      ),
      favoriteCategories: Joi.array().items(
        Joi.string().valid(...DECISION_CATEGORIES)
      ),
    }),
  }),
};

// Group validation schemas
const groupSchemas = {
  // Create group
  create: Joi.object({
    name: Joi.string().min(3).max(50).required().trim().messages({
      "string.empty": "Group name is required",
      "string.min": "Group name must be at least 3 characters",
    }),

    description: Joi.string().max(200).trim().allow(""),
  }),

  // Update group
  update: Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    description: Joi.string().max(200).trim().allow(""),
  }),

  // Join group with invite code
  join: Joi.object({
    inviteCode: Joi.string()
      .length(LIMITS.INVITE_CODE_LENGTH)
      .required()
      .messages({
        "string.empty": "Invite code is required",
        "string.length": `Invite code must be ${LIMITS.INVITE_CODE_LENGTH} characters`,
      }),
  }),
};

// Decision session validation schemas
const decisionSchemas = {
  // Create decision session
  create: Joi.object({
    groupId: Joi.string().required().messages({
      "string.empty": "Group ID is required",
    }),

    title: Joi.string().min(3).max(100).required().trim().messages({
      "string.empty": "Decision title is required",
    }),

    category: Joi.string()
      .valid(...DECISION_CATEGORIES)
      .required()
      .messages({
        "any.only": `Category must be one of: ${DECISION_CATEGORIES.join(
          ", "
        )}`,
      }),

    options: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          category: Joi.string(),
          price: Joi.number().min(0).optional(),
          location: Joi.object({
            address: Joi.string(),
            latitude: Joi.number().min(-90).max(90),
            longitude: Joi.number().min(-180).max(180),
          }).optional(),
          tags: Joi.alternatives()
            .try(Joi.array().items(Joi.string()), Joi.string())
            .optional(),
          rating: Joi.number().min(0).max(5).optional(),
          imageUrl: Joi.string().uri().optional(),
          externalLink: Joi.string().uri().optional(),
        })
      )
      .max(LIMITS.MAX_OPTIONS)
      .required(),
  }),

  // Submit constraints
  submitConstraints: Joi.object({
    budget: Joi.object({
      min: Joi.number().min(0).required(),
      max: Joi.number().min(0).required(),
      weight: Joi.number().min(0).max(1).default(0.8),
    }),

    location: Joi.object({
      latitude: Joi.number().min(-90).max(90),
      longitude: Joi.number().min(-180).max(180),
      maxDistance: Joi.number().min(0),
      weight: Joi.number().min(0).max(1).default(0.6),
    }).allow(null),

    timeAvailability: Joi.array()
      .items(
        Joi.object({
          date: Joi.date().required(),
          startTime: Joi.string()
            .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .required(),
          endTime: Joi.string()
            .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
            .required(),
        })
      )
      .allow(null),

    dietaryRequirements: Joi.array().items(
      Joi.string().valid(...DIETARY_RESTRICTIONS)
    ),

    preferences: Joi.array().items(Joi.string()).max(LIMITS.MAX_PREFERENCES),

    mustHaves: Joi.array().items(Joi.string()),
    dealBreakers: Joi.array().items(Joi.string()),
  }),
};

module.exports = {
  userSchemas,
  groupSchemas,
  decisionSchemas,
};
