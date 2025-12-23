import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

/**
 * Notification Context
 * Manages in-app notifications and UI state
 */
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Only fetch if token exists
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/notifications?limit=20');
      
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unread);
      }
    } catch (error) {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        console.warn('Notification auth failed - user may need to re-login');
        setNotifications([]);
        setUnreadCount(0);
      } else {
        console.error('Failed to fetch notifications:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.put(`/notifications/${notificationId}/read`);
      if (response.status === 200) {
        setNotifications(prev =>
          prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.put('/notifications/read-all');
      if (response.status === 200) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.delete(`/notifications/${notificationId}`);
      if (response.status === 200) {
        const notification = notifications.find(n => n._id === notificationId);
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        if (notification && !notification.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
