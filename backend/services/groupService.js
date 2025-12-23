const Group = require('../models/Group');
const { GROUP_ROLES } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Group Service
 * Business logic for group operations
 */

class GroupService {
  /**
   * Create new group
   */
  async createGroup(userId, groupData) {
    const group = await Group.create({
      ...groupData,
      creator: userId
    });
    
    await group.populate('creator', 'name email avatar');
    await group.populate('members.userId', 'name email avatar');
    
    logger.info(`Group created: ${group._id} by user ${userId}`);
    
    return group;
  }
  
  /**
   * Get user's groups
   */
  async getUserGroups(userId) {
    const groups = await Group.find({
      'members.userId': userId,
      isActive: true
    })
      .populate('creator', 'name email avatar')
      .populate('members.userId', 'name email avatar')
      .sort({ createdAt: -1 });
    
    return groups;
  }
  
  /**
   * Get group by ID
   */
  async getGroupById(groupId, userId) {
    const group = await Group.findById(groupId)
      .populate('creator', 'name email avatar')
      .populate('members.userId', 'name email avatar');
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    if (!group.isMember(userId)) {
      throw new Error('Not authorized to view this group');
    }
    
    return group;
  }
  
  /**
   * Update group
   */
  async updateGroup(groupId, userId, updateData) {
    const group = await Group.findById(groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    if (!group.isAdmin(userId)) {
      throw new Error('Only admins can update group details');
    }
    
    Object.assign(group, updateData);
    await group.save();
    
    await group.populate('creator', 'name email avatar');
    await group.populate('members.userId', 'name email avatar');
    
    logger.info(`Group updated: ${groupId} by user ${userId}`);
    
    return group;
  }
  
  /**
   * Join group with invite code
   */
  async joinGroup(userId, inviteCode) {
    const group = await Group.findByInviteCode(inviteCode);
    
    if (!group) {
      throw new Error('Invalid invite code');
    }
    
    if (group.isMember(userId)) {
      throw new Error('Already a member of this group');
    }
    
    await group.addMember(userId);
    await group.populate('creator', 'name email avatar');
    await group.populate('members.userId', 'name email avatar');
    
    logger.info(`User ${userId} joined group ${group._id}`);
    
    return group;
  }
  
  /**
   * Leave group
   */
  async leaveGroup(groupId, userId) {
    const group = await Group.findById(groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    if (!group.isMember(userId)) {
      throw new Error('Not a member of this group');
    }
    
    await group.removeMember(userId);
    
    logger.info(`User ${userId} left group ${groupId}`);
    
    return true;
  }
  
  /**
   * Delete group (soft delete)
   */
  async deleteGroup(groupId, userId) {
    const group = await Group.findById(groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    if (group.creator.toString() !== userId.toString()) {
      throw new Error('Only the creator can delete the group');
    }
    
    group.isActive = false;
    await group.save();
    
    logger.info(`Group deleted: ${groupId} by creator ${userId}`);
    
    return true;
  }
}

module.exports = new GroupService();