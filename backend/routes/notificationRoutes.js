const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

/**
 * Notification Routes
 * @prefix /api/notifications
 */

// Get notifications
router.get("/", protect, getNotifications);
router.get("/unread-count", protect, getUnreadCount);

// Mark as read
router.put("/read-all", protect, markAllAsRead);
router.put("/:id/read", protect, markAsRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;
