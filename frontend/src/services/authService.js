import api from './api';

/**
 * Authentication Service
 * Handles all auth-related API calls
 */

const authService = {
  /**
   * Register new user
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Save token and user to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Save token and user to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      
      // Update user in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      // Update user in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Change password
   */
  changePassword: async (passwordData) => {
    try {
      return await api.put('/auth/change-password', passwordData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get current token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;