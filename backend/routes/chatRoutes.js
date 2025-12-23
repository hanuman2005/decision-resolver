const express = require("express");
const router = express.Router();
const {
  getGroupMessages,
  sendMessage,
  markAsRead,
  markGroupAsRead,
  deleteMessage,
  editMessage,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

/**
 * Chat Routes
 * @prefix /api/chat
 */

// Get group messages
router.get("/group/:groupId", protect, getGroupMessages);

// Send message
router.post("/group/:groupId", protect, sendMessage);

// Mark message as read
router.put("/:messageId/read", protect, markAsRead);

// Mark all group messages as read
router.put("/group/:groupId/read-all", protect, markGroupAsRead);

// Edit message
router.put("/:messageId", protect, editMessage);

// Delete message
router.delete("/:messageId", protect, deleteMessage);

module.exports = router;
