const mongoose = require("mongoose");
const { NOTIFICATION_TYPES } = require("../config/constants");

/**
 * Notification Model
 * Stores in-app and email notifications
 */
const notificationSchema = new mongoose.Schema(
  {
    // Recipient user
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Notification type
    type: {
      type: String,
      enum: [
        "member_joined",
        "constraint_submitted",
        "decision_ready",
        "group_invite",
        "decision_created",
        "member_left",
      ],
      required: true,
    },

    // Title and message
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    // Related entities
    data: {
      groupId: mongoose.Schema.Types.ObjectId,
      decisionId: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId, // Actor/sender
      groupName: String,
      decisionTitle: String,
      userName: String,
    },

    // Read status
    read: {
      type: Boolean,
      default: false,
    },

    // Email sent status
    emailSent: {
      type: Boolean,
      default: false,
    },

    emailSentAt: Date,
    emailError: String,

    // Delivery status
    deliveryStatus: {
      type: String,
      enum: ["pending", "sent", "failed", "bounced"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Index for query performance
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
