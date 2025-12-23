import { useState, useEffect } from 'react';
import groupService from '../services/groupService';
import toast from 'react-hot-toast';

/**
 * useGroups Hook
 * Custom hook for group operations
 */

export const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all groups
   */
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await groupService.getMyGroups();
      setGroups(response.data.groups || []);
      return response.data.groups;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load groups');
      throw err;
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
    } catch (err) {
      toast.error(err.message || 'Failed to create group');
      throw err;
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
    } catch (err) {
      toast.error(err.message || 'Failed to join group');
      throw err;
    }
  };

  /**
   * Leave group
   */
  const leaveGroup = async (groupId) => {
    try {
      await groupService.leaveGroup(groupId);
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      toast.success('Left group successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to leave group');
      throw err;
    }
  };

  /**
   * Get single group by ID
   */
  const getGroup = async (groupId) => {
    try {
      const response = await groupService.getGroupById(groupId);
      return response.data.group;
    } catch (err) {
      toast.error('Failed to load group details');
      throw err;
    }
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    loading,
    error,
    fetchGroups,
    createGroup,
    joinGroup,
    leaveGroup,
    getGroup,
  };
};

export default useGroups;