const mongoose = require("mongoose");
const {
  DECISION_CATEGORIES,
  DECISION_STATUS,
  DIETARY_RESTRICTIONS,
} = require("../config/constants");

/**
 * Decision Session Model
 * Represents a single decision-making session within a group
 */
const decisionSessionSchema = new mongoose.Schema(
  {
    // Reference to the group making the decision
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Decision title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    category: {
      type: String,
      enum: DECISION_CATEGORIES,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(DECISION_STATUS),
      default: DECISION_STATUS.COLLECTING,
    },

    // Phase 1: Constraints collected from each member
    constraints: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        budget: {
          min: { type: Number, default: 0 },
          max: { type: Number, required: true },
          weight: { type: Number, default: 0.8, min: 0, max: 1 },
        },

        location: {
          latitude: { type: Number },
          longitude: { type: Number },
          maxDistance: { type: Number }, // in kilometers
          weight: { type: Number, default: 0.6, min: 0, max: 1 },
        },

        timeAvailability: [
          {
            date: { type: Date },
            startTime: { type: String }, // Format: "HH:MM"
            endTime: { type: String },
          },
        ],

        dietaryRequirements: [
          {
            type: String,
            enum: DIETARY_RESTRICTIONS,
          },
        ],

        preferences: [{ type: String }], // Tags like "italian", "outdoor", etc.

        mustHaves: [{ type: String }], // Non-negotiable requirements

        dealBreakers: [{ type: String }], // Absolute exclusions

        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Phase 2: Options to evaluate
    options: [
      {
        name: {
          type: String,
          required: true,
        },
        category: String,
        price: Number,
        location: {
          address: String,
          latitude: Number,
          longitude: Number,
        },
        tags: [String],
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        imageUrl: String,
        externalLink: String,
      },
    ],

    // Phase 3: Final decision results
    finalDecision: {
      selectedOption: {
        type: mongoose.Schema.Types.Mixed, // Store the complete option object
      },
      algorithmScore: {
        type: Number,
        min: 0,
        max: 1,
      },
      satisfactionRate: {
        type: Number,
        min: 0,
        max: 1,
      }, // Percentage of constraints satisfied
      reasoning: [String], // Human-readable explanation
      timestamp: Date,
    },

    // Detailed scoring for transparency
    scoringDetails: [
      {
        optionId: String,
        totalScore: Number,
        perUserScores: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            score: Number,
            breakdown: {
              budgetScore: Number,
              locationScore: Number,
              preferenceScore: Number,
              timeScore: Number,
            },
          },
        ],
      },
    ],

    // Session expiry
    expiresAt: {
      type: Date,
      default: function () {
        // Default expiry: 24 hours from creation
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 24);
        return expiry;
      },
    },

    completedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound indexes for better query performance
decisionSessionSchema.index({ groupId: 1, status: 1 });
decisionSessionSchema.index({ groupId: 1, createdAt: -1 });
decisionSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for auto-cleanup

// Virtual for constraint submission progress
decisionSessionSchema.virtual("submissionProgress").get(function () {
  if (!this.populated("groupId")) {
    return null;
  }

  const totalMembers = this.groupId.members.length;
  const submittedCount = this.constraints.length;

  return {
    submitted: submittedCount,
    total: totalMembers,
    percentage: (submittedCount / totalMembers) * 100,
    isComplete: submittedCount === totalMembers,
  };
});

// Method to check if user has submitted constraints
decisionSessionSchema.methods.hasUserSubmitted = function (userId) {
  return this.constraints.some(
    (c) => c.userId.toString() === userId.toString()
  );
};

// Method to check if all members have submitted
decisionSessionSchema.methods.isReadyForProcessing = async function () {
  // Populate group if not already populated
  if (!this.populated("groupId")) {
    await this.populate("groupId");
  }

  const memberCount = this.groupId.members.length;
  const submittedCount = this.constraints.length;

  return submittedCount === memberCount && submittedCount > 0;
};

// Method to add constraints for a user
decisionSessionSchema.methods.addConstraints = function (
  userId,
  constraintData
) {
  // Check if user already submitted
  if (this.hasUserSubmitted(userId)) {
    throw new Error("User has already submitted constraints for this decision");
  }

  // Check if session is still accepting submissions
  if (this.status !== DECISION_STATUS.COLLECTING) {
    throw new Error("Decision session is no longer accepting constraints");
  }

  // Check if session has expired
  if (this.expiresAt < new Date()) {
    throw new Error("Decision session has expired");
  }

  this.constraints.push({
    userId,
    ...constraintData,
    submittedAt: new Date(),
  });

  return this.save();
};

// Method to mark session as processing
decisionSessionSchema.methods.startProcessing = function () {
  if (this.status !== DECISION_STATUS.COLLECTING) {
    throw new Error(
      "Cannot start processing - session is not in collecting state"
    );
  }

  this.status = DECISION_STATUS.PROCESSING;
  return this.save();
};

// Method to complete decision with results
decisionSessionSchema.methods.completeDecision = function (decisionData) {
  if (this.status !== DECISION_STATUS.PROCESSING) {
    throw new Error("Cannot complete - session is not being processed");
  }

  this.status = DECISION_STATUS.COMPLETED;
  this.finalDecision = {
    ...decisionData,
    timestamp: new Date(),
  };
  this.completedAt = new Date();

  return this.save();
};

// Method to cancel decision session
decisionSessionSchema.methods.cancel = function () {
  this.status = DECISION_STATUS.CANCELLED;
  return this.save();
};

// Static method to find active sessions for a group
decisionSessionSchema.statics.findActiveByGroup = function (groupId) {
  return this.find({
    groupId,
    status: { $in: [DECISION_STATUS.COLLECTING, DECISION_STATUS.PROCESSING] },
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });
};

// Static method to find completed decisions for a group
decisionSessionSchema.statics.findCompletedByGroup = function (
  groupId,
  limit = 10
) {
  return this.find({
    groupId,
    status: DECISION_STATUS.COMPLETED,
  })
    .sort({ completedAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model("DecisionSession", decisionSessionSchema);
