const Notification = require("../models/Notification");
const User = require("../models/User");
const { sendNotificationEmail } = require("../utils/emailService");
const logger = require("../utils/logger");

/**
 * Notification Service
 * Handles creating and managing notifications
 */

const notificationService = {
  /**
   * Create and send notification
   */
  async createNotification(recipientId, type, data) {
    try {
      // Get recipient user
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        logger.warn(`Recipient user not found: ${recipientId}`);
        return null;
      }

      // Create notification document
      const notification = await Notification.create({
        recipient: recipientId,
        type,
        title: data.title,
        message: data.message,
        data: {
          groupId: data.groupId,
          decisionId: data.decisionId,
          userId: data.userId,
          groupName: data.groupName,
          decisionTitle: data.decisionTitle,
          userName: data.userName,
        },
      });

      // Send email notification
      const emailSent = await sendNotificationEmail(recipient, notification);
      if (emailSent) {
        await Notification.findByIdAndUpdate(notification._id, {
          emailSent: true,
          emailSentAt: new Date(),
          deliveryStatus: "sent",
        });
      } else {
        await Notification.findByIdAndUpdate(notification._id, {
          deliveryStatus: "failed",
        });
      }

      logger.info(
        `Notification created: ${notification._id} for user ${recipientId}`
      );
      return notification;
    } catch (error) {
      logger.error(`Failed to create notification: ${error.message}`);
      return null;
    }
  },

  /**
   * Create notifications for multiple users
   */
  async createBulkNotifications(recipientIds, type, data) {
    const notifications = [];
    for (const recipientId of recipientIds) {
      const notification = await this.createNotification(
        recipientId,
        type,
        data
      );
      if (notification) {
        notifications.push(notification);
      }
    }
    return notifications;
  },

  /**
   * Get user notifications
   */
  async getUserNotifications(userId, limit = 20, skip = 0) {
    try {
      const notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean();

      const total = await Notification.countDocuments({ recipient: userId });
      const unread = await Notification.countDocuments({
        recipient: userId,
        read: false,
      });

      return {
        notifications,
        total,
        unread,
      };
    } catch (error) {
      logger.error(`Failed to get notifications: ${error.message}`);
      return { notifications: [], total: 0, unread: 0 };
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    try {
      return await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
      );
    } catch (error) {
      logger.error(`Failed to mark notification as read: ${error.message}`);
      return null;
    }
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId) {
    try {
      return await Notification.updateMany(
        { recipient: userId, read: false },
        { read: true }
      );
    } catch (error) {
      logger.error(
        `Failed to mark all notifications as read: ${error.message}`
      );
      return null;
    }
  },

  /**
   * Delete notification
   */
  async deleteNotification(notificationId) {
    try {
      return await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
      logger.error(`Failed to delete notification: ${error.message}`);
      return null;
    }
  },

  /**
   * Clear old notifications
   */
  async clearOldNotifications(daysOld = 30) {
    try {
      const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
      const result = await Notification.deleteMany({
        createdAt: { $lt: cutoffDate },
      });
      logger.info(`Cleared ${result.deletedCount} old notifications`);
      return result;
    } catch (error) {
      logger.error(`Failed to clear old notifications: ${error.message}`);
      return null;
    }
  },
};

module.exports = notificationService;
