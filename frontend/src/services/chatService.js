import api from "./api";

/**
 * Chat Service
 * Handles all chat-related API calls
 */

const chatService = {
  // Get group messages
  getGroupMessages: async (groupId, limit = 50, offset = 0) => {
    try {
      const response = await api.get(`/chat/group/${groupId}`, {
        params: { limit, offset },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send message
  sendMessage: async (groupId, message) => {
    try {
      const response = await api.post(`/chat/group/${groupId}`, {
        message,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      const response = await api.put(`/chat/${messageId}/read`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark all messages in group as read
  markGroupAsRead: async (groupId) => {
    try {
      const response = await api.put(`/chat/group/${groupId}/read-all`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Edit message
  editMessage: async (messageId, message) => {
    try {
      const response = await api.put(`/chat/${messageId}`, { message });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const response = await api.delete(`/chat/${messageId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default chatService;
