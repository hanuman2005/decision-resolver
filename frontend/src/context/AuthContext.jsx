import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

/**
 * Auth Context
 * Manages authentication state across the application
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Register new user
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      toast.success('Registration successful!');
      return response;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  /**
   * Login user
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      toast.success('Welcome back!');
      return response;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  /**
   * Update user profile
   */
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response.data.user);
      toast.success('Profile updated successfully');
      return response;
    } catch (error) {
      toast.error(error.message || 'Update failed');
      throw error;
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};