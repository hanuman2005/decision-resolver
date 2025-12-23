const mongoose = require("mongoose");

/**
 * Chat Message Schema
 * Stores real-time group messages
 */

const chatMessageSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    userAvatar: {
      type: String,
      default: null,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    readBy: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        readAt: Date,
      },
    ],

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: Date,

    deletedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      { groupId: 1, createdAt: -1 },
      { groupId: 1, userId: 1 },
    ],
  }
);

// Virtual for formatted timestamp
chatMessageSchema.virtual("formattedTime").get(function () {
  const now = new Date();
  const diffMs = now - this.createdAt;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return this.createdAt.toLocaleDateString();
});

// Mark message as read by user
chatMessageSchema.methods.markAsRead = function (userId) {
  const alreadyRead = this.readBy.find(
    (r) => r.userId.toString() === userId.toString()
  );
  if (!alreadyRead) {
    this.readBy.push({
      userId,
      readAt: new Date(),
    });
  }
  return this.save();
};

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
