import api from './api';

/**
 * Decision Service
 * Handles all decision-related API calls
 */

const decisionService = {
  /**
   * Create a new decision session
   */
  createDecision: async (decisionData) => {
    try {
      return await api.post('/decisions', decisionData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all decisions for a group
   */
  getGroupDecisions: async (groupId, params = {}) => {
    try {
      return await api.get(`/decisions/group/${groupId}`, { params });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get decision by ID
   */
  getDecisionById: async (decisionId) => {
    try {
      return await api.get(`/decisions/${decisionId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Submit constraints for a decision
   */
  submitConstraints: async (decisionId, constraints) => {
    try {
      return await api.post(`/decisions/${decisionId}/constraints`, constraints);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Trigger decision processing (admin only)
   */
  processDecision: async (decisionId) => {
    try {
      return await api.post(`/decisions/${decisionId}/process`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel decision session
   */
  cancelDecision: async (decisionId) => {
    try {
      return await api.delete(`/decisions/${decisionId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get fairness insight for user in group
   */
  getFairnessInsight: async (groupId) => {
    try {
      return await api.get(`/decisions/fairness/${groupId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default decisionService;