const mongoose = require("mongoose");
const { DECISION_CATEGORIES } = require("../config/constants");

/**
 * Option Template Model
 * Pre-loaded options that users can select from (e.g., popular restaurants)
 */
const optionTemplateSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: DECISION_CATEGORIES,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    priceRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    location: {
      city: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    popularity: {
      type: Number,
      default: 0,
      min: 0,
    },

    source: {
      type: String,
      enum: ["manual", "api", "user_generated"],
      default: "manual",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
optionTemplateSchema.index({ category: 1, isActive: 1 });
optionTemplateSchema.index({ tags: 1 });
optionTemplateSchema.index({ "location.city": 1 });

// Static method to find by category
optionTemplateSchema.statics.findByCategory = function (
  category,
  filters = {}
) {
  return this.find({
    category,
    isActive: true,
    ...filters,
  }).sort({ popularity: -1, rating: -1 });
};

// Static method to search by tags
optionTemplateSchema.statics.searchByTags = function (tags, category = null) {
  const query = {
    tags: { $in: tags },
    isActive: true,
  };

  if (category) {
    query.category = category;
  }

  return this.find(query).sort({ popularity: -1 });
};

module.exports = mongoose.model("OptionTemplate", optionTemplateSchema);
