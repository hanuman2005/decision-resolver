const mongoose = require("mongoose");
const {
  DIETARY_RESTRICTIONS,
  DECISION_CATEGORIES,
} = require("../config/constants");

/**
 * User Model
 * Stores user account information and preferences
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password in queries by default
    },

    avatar: {
      type: String,
      default: function () {
        // Generate default avatar using UI Avatars or similar service
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },

    // User's default preferences (used to pre-fill constraint forms)
    preferences: {
      defaultBudget: {
        min: {
          type: Number,
          default: 0,
        },
        max: {
          type: Number,
          default: 100,
        },
      },

      dietaryRestrictions: [
        {
          type: String,
          enum: DIETARY_RESTRICTIONS,
        },
      ],

      favoriteCategories: [
        {
          type: String,
          enum: DECISION_CATEGORIES,
        },
      ],
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Last login tracking
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove sensitive data when converting to JSON
        delete ret.password;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ createdAt: -1 });
// Removed index for email to resolve duplicate index warnings

// Virtual for user's groups (populated from Group model)
userSchema.virtual("groups", {
  ref: "Group",
  localField: "_id",
  foreignField: "members.userId",
});

// Method to check if user has dietary restrictions
userSchema.methods.hasDietaryRestrictions = function () {
  return (
    this.preferences.dietaryRestrictions &&
    this.preferences.dietaryRestrictions.length > 0
  );
};

// Method to get user's safe profile (without sensitive data)
userSchema.methods.getSafeProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    preferences: this.preferences,
    createdAt: this.createdAt,
  };
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model("User", userSchema);
