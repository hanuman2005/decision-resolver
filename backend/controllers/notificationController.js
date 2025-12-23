const notificationService = require("../services/notificationService");
const Notification = require("../models/Notification");
const { HTTP_STATUS } = require("../config/constants");
const { asyncHandler } = require("../middleware/errorMiddleware");
const logger = require("../utils/logger");

/**
 * Notification Controller
 * Handles notification API endpoints
 */

/**
 * @desc    Get user notifications
 * @route   GET /api/notifications
 * @access  Private
 */
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { limit = 20, skip = 0 } = req.query;

  const result = await notificationService.getUserNotifications(
    userId,
    parseInt(limit),
    parseInt(skip)
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Verify ownership
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Check if user owns this notification
    const recipientId = notification.recipient._id
      ? notification.recipient._id.toString()
      : notification.recipient.toString();

    if (recipientId !== userId.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updated = await notificationService.markAsRead(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { notification: updated },
    });
  } catch (error) {
    logger.error("Error in markAsRead:", error);
    throw error;
  }
});

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const result = await notificationService.markAllAsRead(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "All notifications marked as read",
    data: { result },
  });
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Verify ownership
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Check if user owns this notification
    const recipientId = notification.recipient._id
      ? notification.recipient._id.toString()
      : notification.recipient.toString();

    if (recipientId !== userId.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Not authorized",
      });
    }

    await notificationService.deleteNotification(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    logger.error("Error in deleteNotification:", error);
    throw error;
  }
});

/**
 * @desc    Get unread count
 * @route   GET /api/notifications/unread-count
 * @access  Private
 */
const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const result = await notificationService.getUserNotifications(userId, 1, 0);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { unreadCount: result.unread },
  });
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
