const Group = require("../models/Group");
const User = require("../models/User");
const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  GROUP_ROLES,
} = require("../config/constants");
const { asyncHandler } = require("../middleware/errorMiddleware");
const logger = require("../utils/logger");
const notificationService = require("../services/notificationService");

/**
 * Group Controller
 * Handles group creation, management, and membership
 */

/**
 * @desc    Create a new group
 * @route   POST /api/groups
 * @access  Private
 */
const createGroup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  // Create group
  const group = await Group.create({
    name,
    description,
    creator: userId,
    members: [
      {
        userId: userId,
        role: GROUP_ROLES.ADMIN,
      },
    ],
  });

  // Populate creator info
  await group.populate("creator", "name email avatar");
  await group.populate("members.userId", "name email avatar");

  logger.info(`Group created: ${name} by user ${userId}`);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Group created successfully",
    data: { group },
  });
});

/**
 * @desc    Get all groups for current user
 * @route   GET /api/groups
 * @access  Private
 */
const getMyGroups = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find all groups where user is a member
  const groups = await Group.find({
    "members.userId": userId,
    isActive: true,
  })
    .populate("creator", "name email avatar")
    .populate("members.userId", "name email avatar")
    .sort({ createdAt: -1 });

  // Add isAdmin property to each group
  const groupsWithAdmin = groups.map((group) => {
    const groupObj = group.toObject ? group.toObject() : group;
    groupObj.isAdmin = group.isAdmin(userId);
    return groupObj;
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      groups: groupsWithAdmin,
      count: groupsWithAdmin.length,
    },
  });
});

/**
 * @desc    Get single group by ID
 * @route   GET /api/groups/:id
 * @access  Private
 */
const getGroupById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(id)
    .populate("creator", "name email avatar")
    .populate("members.userId", "name email avatar");

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if user is a member or the creator
  const isMember = group.isMember(userId);
  const isCreator = group.creator._id.toString() === userId.toString();

  if (!isMember && !isCreator) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  // Add isAdmin property to group response
  const groupResponse = group.toObject ? group.toObject() : group;
  groupResponse.isAdmin = group.isAdmin(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { group: groupResponse },
  });
});

/**
 * @desc    Update group details
 * @route   PUT /api/groups/:id
 * @access  Private (Admin only)
 */
const updateGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user._id;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if user is admin
  if (!group.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can update group details",
    });
  }

  // Update fields
  if (name) group.name = name;
  if (description !== undefined) group.description = description;

  await group.save();
  await group.populate("creator", "name email avatar");
  await group.populate("members.userId", "name email avatar");

  logger.info(`Group updated: ${id} by user ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Group updated successfully",
    data: { group },
  });
});

/**
 * @desc    Join group using invite code
 * @route   POST /api/groups/join
 * @access  Private
 */
const joinGroup = asyncHandler(async (req, res) => {
  const { inviteCode } = req.body;
  const userId = req.user._id;

  // Find group by invite code
  const group = await Group.findByInviteCode(inviteCode);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_INVITE_CODE,
    });
  }

  // Check if already a member
  if (group.isMember(userId)) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: ERROR_MESSAGES.ALREADY_MEMBER,
    });
  }

  // Get joining user info
  const joiningUser = await User.findById(userId);

  // Add member
  await group.addMember(userId);
  await group.populate("creator", "name email avatar");
  await group.populate("members.userId", "name email avatar");

  // Get other admin/creator IDs to notify (exclude the joining user)
  const adminIds = group.members
    .filter(
      (m) =>
        (m.role === GROUP_ROLES.ADMIN || m.role === GROUP_ROLES.CREATOR) &&
        m.userId._id.toString() !== userId.toString()
    )
    .map((m) => m.userId._id);

  // Create notifications for admins and group members
  if (adminIds.length > 0) {
    await notificationService.createBulkNotifications(
      adminIds,
      "member_joined",
      {
        title: `New member joined your group`,
        message: `${joiningUser.name} has joined the group "${group.name}"`,
        groupId: group._id,
        groupName: group.name,
        memberName: joiningUser.name,
        memberId: userId,
      }
    );
  }

  logger.info(`User ${userId} joined group ${group._id}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Successfully joined group",
    data: { group },
  });
});

/**
 * @desc    Leave group
 * @route   POST /api/groups/:id/leave
 * @access  Private
 */
const leaveGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if user is a member
  if (!group.isMember(userId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "You are not a member of this group",
    });
  }

  // Remove member
  try {
    await group.removeMember(userId);

    logger.info(`User ${userId} left group ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Successfully left group",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    Remove member from group
 * @route   DELETE /api/groups/:id/members/:memberId
 * @access  Private (Admin only)
 */
const removeMember = asyncHandler(async (req, res) => {
  const { id, memberId } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if user is admin
  if (!group.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can remove members",
    });
  }

  // Can't remove yourself using this endpoint
  if (userId.toString() === memberId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Use leave endpoint to remove yourself",
    });
  }

  try {
    await group.removeMember(memberId);
    await group.populate("members.userId", "name email avatar");

    logger.info(
      `Member ${memberId} removed from group ${id} by admin ${userId}`
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Member removed successfully",
      data: { group },
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    Promote member to admin
 * @route   PUT /api/groups/:id/members/:memberId/promote
 * @access  Private (Admin only)
 */
const promoteMember = asyncHandler(async (req, res) => {
  const { id, memberId } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if user is admin
  if (!group.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can promote members",
    });
  }

  try {
    await group.promoteToAdmin(memberId);
    await group.populate("members.userId", "name email avatar");

    logger.info(`Member ${memberId} promoted to admin in group ${id}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Member promoted to admin",
      data: { group },
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    Delete group
 * @route   DELETE /api/groups/:id
 * @access  Private (Creator only)
 */
const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const group = await Group.findById(id);

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Only creator can delete group
  if (group.creator.toString() !== userId.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only the group creator can delete the group",
    });
  }

  // Soft delete
  group.isActive = false;
  await group.save();

  logger.info(`Group deleted: ${id} by creator ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Group deleted successfully",
  });
});

module.exports = {
  createGroup,
  getMyGroups,
  getGroupById,
  updateGroup,
  joinGroup,
  leaveGroup,
  removeMember,
  promoteMember,
  deleteGroup,
};
