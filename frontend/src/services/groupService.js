import api from './api';

/**
 * Group Service
 * Handles all group-related API calls
 */

const groupService = {
  /**
   * Create a new group
   */
  createGroup: async (groupData) => {
    try {
      return await api.post('/groups', groupData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all groups for current user
   */
  getMyGroups: async () => {
    try {
      return await api.get('/groups');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get group by ID
   */
  getGroupById: async (groupId) => {
    try {
      return await api.get(`/groups/${groupId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update group
   */
  updateGroup: async (groupId, groupData) => {
    try {
      return await api.put(`/groups/${groupId}`, groupData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete group
   */
  deleteGroup: async (groupId) => {
    try {
      return await api.delete(`/groups/${groupId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Join group with invite code
   */
  joinGroup: async (inviteCode) => {
    try {
      return await api.post('/groups/join', { inviteCode });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Leave group
   */
  leaveGroup: async (groupId) => {
    try {
      return await api.post(`/groups/${groupId}/leave`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Remove member from group
   */
  removeMember: async (groupId, memberId) => {
    try {
      return await api.delete(`/groups/${groupId}/members/${memberId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Promote member to admin
   */
  promoteMember: async (groupId, memberId) => {
    try {
      return await api.put(`/groups/${groupId}/members/${memberId}/promote`);
    } catch (error) {
      throw error;
    }
  },
};

export default groupService;