import { createContext, useContext, useState, useEffect } from 'react';
import groupService from '../services/groupService';
import toast from 'react-hot-toast';

/**
 * Group Context
 * Manages group state across the application
 */

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Load all user groups
   */
  const loadGroups = async () => {
    setLoading(true);
    try {
      const response = await groupService.getMyGroups();
      setGroups(response.data.groups || []);
    } catch (error) {
      toast.error('Failed to load groups');
      console.error('Error loading groups:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new group
   */
  const createGroup = async (groupData) => {
    try {
      const response = await groupService.createGroup(groupData);
      setGroups((prev) => [response.data.group, ...prev]);
      toast.success('Group created successfully!');
      return response.data.group;
    } catch (error) {
      toast.error(error.message || 'Failed to create group');
      throw error;
    }
  };

  /**
   * Join group with invite code
   */
  const joinGroup = async (inviteCode) => {
    try {
      const response = await groupService.joinGroup(inviteCode);
      setGroups((prev) => [response.data.group, ...prev]);
      toast.success(`Joined ${response.data.group.name}!`);
      return response.data.group;
    } catch (error) {
      toast.error(error.message || 'Failed to join group');
      throw error;
    }
  };

  /**
   * Leave group
   */
  const leaveGroup = async (groupId) => {
    try {
      await groupService.leaveGroup(groupId);
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      if (currentGroup?._id === groupId) {
        setCurrentGroup(null);
      }
      toast.success('Left group successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to leave group');
      throw error;
    }
  };

  /**
   * Select current group
   */
  const selectGroup = (group) => {
    setCurrentGroup(group);
  };

  const value = {
    groups,
    currentGroup,
    loading,
    loadGroups,
    createGroup,
    joinGroup,
    leaveGroup,
    selectGroup,
  };

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

// Custom hook to use group context
export const useGroups = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroups must be used within GroupProvider');
  }
  return context;
};