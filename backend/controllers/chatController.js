const ChatMessage = require("../models/ChatMessage");
const Group = require("../models/Group");
const logger = require("../utils/logger");

/**
 * Chat Message Controller
 * Handles all chat-related operations
 */

// Get group messages
exports.getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    let { limit = 50, offset = 0 } = req.query;
    const userId = req.user.id;

    // Validate pagination parameters
    limit = Math.min(Math.max(parseInt(limit) || 50, 1), 100); // Min 1, Max 100
    offset = Math.max(parseInt(offset) || 0, 0); // Min 0

    // Verify user is group member
    const group = await Group.findById(groupId);
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === userId.toString()
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ success: false, message: "Not a group member" });
    }

    // Fetch messages
    const messages = await ChatMessage.find({ groupId, isDeleted: false })
      .populate("userId", "name avatar email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .lean();

    // Reverse to show chronologically
    messages.reverse();

    res.status(200).json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (error) {
    logger.error("Error fetching group messages:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const userName = req.user.name;
    const userAvatar =
      req.user.avatar || `https://i.pravatar.cc/150?img=${userId.slice(0, 8)}`;

    // Validate input
    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Message cannot be empty" });
    }

    // Verify user is group member
    const group = await Group.findById(groupId).populate(
      "members.userId",
      "name"
    );
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const isMember = group.members.some(
      (m) => m.userId._id.toString() === userId.toString()
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ success: false, message: "Not a group member" });
    }

    // Create message
    const chatMessage = new ChatMessage({
      groupId,
      userId,
      userName,
      userAvatar,
      message: message.trim(),
      readBy: [{ userId, readAt: new Date() }],
    });

    await chatMessage.save();
    await chatMessage.populate("userId", "name avatar email");

    res.status(201).json({
      success: true,
      message: chatMessage,
      _id: chatMessage._id,
    });
  } catch (error) {
    logger.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await ChatMessage.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    await message.markAsRead(userId);

    res.status(200).json({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    logger.error("Error marking message as read:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to mark message as read" });
  }
};

// Mark all messages in group as read
exports.markGroupAsRead = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    await ChatMessage.updateMany(
      { groupId, isDeleted: false },
      {
        $addToSet: {
          readBy: {
            userId,
            readAt: new Date(),
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "All messages marked as read",
    });
  } catch (error) {
    logger.error("Error marking group as read:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to mark messages as read" });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await ChatMessage.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Only message owner can delete
    if (message.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete other users messages",
      });
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    await message.save();

    res.status(200).json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    logger.error("Error deleting message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete message" });
  }
};

// Edit message
exports.editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Message cannot be empty" });
    }

    const chatMessage = await ChatMessage.findById(messageId);
    if (!chatMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    // Only message owner can edit
    if (chatMessage.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Cannot edit other users messages" });
    }

    chatMessage.message = message.trim();
    chatMessage.isEdited = true;
    chatMessage.editedAt = new Date();
    await chatMessage.save();

    res.status(200).json({
      success: true,
      message: chatMessage,
    });
  } catch (error) {
    logger.error("Error editing message:", error);
    res.status(500).json({ success: false, message: "Failed to edit message" });
  }
};
