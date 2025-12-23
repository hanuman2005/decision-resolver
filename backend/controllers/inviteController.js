const Invite = require("../models/Invite");
const User = require("../models/User");
const Group = require("../models/Group");
const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  GROUP_ROLES,
} = require("../config/constants");
const { asyncHandler } = require("../middleware/errorMiddleware");
const logger = require("../utils/logger");
const notificationService = require("../services/notificationService");

/**
 * Invite Controller
 * Handles group invitations and management
 */

/**
 * @desc    Search users by name or email
 * @route   GET /api/invites/search?q=query
 * @access  Private
 */
const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const userId = req.user._id;

  if (!q || q.trim().length === 0) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { users: [] },
    });
  }

  // Search by name or email
  const users = await User.find({
    _id: { $ne: userId }, // Exclude current user
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
  })
    .select("_id name email avatar")
    .limit(10);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { users },
  });
});

/**
 * @desc    Send invite to user for a group
 * @route   POST /api/invites
 * @access  Private (Group Admin)
 */
const sendInvite = asyncHandler(async (req, res) => {
  const { groupId, userId, message } = req.body;
  const invitedBy = req.user._id;

  console.log(`[sendInvite] Request received:`, {
    groupId,
    userId,
    invitedBy,
    message,
    timestamp: new Date().toISOString(),
  });

  // Validate group exists and user is admin
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Check if requester is admin
  if (!group.isAdmin(invitedBy)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can invite members",
    });
  }

  // Check if target user exists
  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if already a member
  console.log(
    `[sendInvite] Group members:`,
    group.members.map((m) => ({
      userId: m.userId._id ? m.userId._id : m.userId,
      role: m.role,
    }))
  );
  console.log(`[sendInvite] Checking if userId ${userId} is in members array`);

  const isMemberResult = group.isMember(userId);
  console.log(
    `[sendInvite] Checking if user ${userId} is member of group ${groupId}: ${isMemberResult}`
  );
  if (isMemberResult) {
    console.log(`[sendInvite] 409: User is already a member`);
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: "User is already a member of this group",
    });
  }

  // Check if invite already exists
  const existingInvite = await Invite.inviteExists(invitedBy, userId, groupId);
  console.log(
    `[sendInvite] Checking if invite exists from ${invitedBy} to ${userId} for group ${groupId}: ${!!existingInvite}`
  );
  if (existingInvite) {
    console.log(`[sendInvite] 409: Invite already sent`);
    console.log(`[sendInvite] Existing invite details:`, {
      from: existingInvite.from,
      to: existingInvite.to,
      group: existingInvite.group,
      status: existingInvite.status,
    });
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: "Invite already sent to this user",
    });
  }

  // Create invite
  const invite = await Invite.create({
    from: invitedBy,
    to: userId,
    group: groupId,
    message: message || "",
  });

  console.log(`[sendInvite] Invite created successfully:`, {
    inviteId: invite._id,
    from: invitedBy,
    to: userId,
    group: groupId,
  });

  // Populate for response
  await invite.populate("from", "name email avatar");
  await invite.populate("group", "name description");

  // Create notification for invited user
  const inviter = await User.findById(invitedBy);
  await notificationService.createNotification(userId, "group_invite", {
    title: `You're invited to join a group`,
    message: `${inviter.name} invited you to join "${group.name}"`,
    groupId: groupId,
    groupName: group.name,
    userId: invitedBy,
    userName: inviter.name,
  });

  logger.info(
    `Invite sent from ${invitedBy} to ${userId} for group ${groupId}`
  );

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Invite sent successfully",
    data: { invite },
  });
});

/**
 * @desc    Get pending invites for current user
 * @route   GET /api/invites/pending
 * @access  Private
 */
const getPendingInvites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const invites = await Invite.getPendingInvites(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      invites,
      count: invites.length,
    },
  });
});

/**
 * @desc    Accept an invite
 * @route   PUT /api/invites/:id/accept
 * @access  Private
 */
const acceptInvite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find invite
  const invite = await Invite.findById(id);
  if (!invite) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Invite not found",
    });
  }

  // Verify invite is for current user
  if (invite.to.toString() !== userId.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Get group and add member
  const group = await Group.findById(invite.group);
  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  // Add member to group
  await group.addMember(userId);
  await group.populate("creator", "name email avatar");
  await group.populate("members.userId", "name email avatar");

  // Update invite status
  invite.status = "accepted";
  await invite.save();

  // Create notification for group admin
  const acceptingUser = await User.findById(userId);
  await notificationService.createNotification(invite.from, "member_joined", {
    title: `New member joined your group`,
    message: `${acceptingUser.name} has accepted your invite and joined "${group.name}"`,
    groupId: group._id,
    groupName: group.name,
    memberName: acceptingUser.name,
    memberId: userId,
  });

  logger.info(`Invite ${id} accepted by user ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Invite accepted",
    data: { group, invite },
  });
});

/**
 * @desc    Decline an invite
 * @route   PUT /api/invites/:id/decline
 * @access  Private
 */
const declineInvite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Find invite
  const invite = await Invite.findById(id);
  if (!invite) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Invite not found",
    });
  }

  // Verify invite is for current user
  if (invite.to.toString() !== userId.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Update status
  invite.status = "declined";
  await invite.save();

  logger.info(`Invite ${id} declined by user ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Invite declined",
    data: { invite },
  });
});

/**
 * @desc    Delete an invite (admin can delete sent invites, users can delete pending invites)
 * @route   DELETE /api/invites/:id
 * @access  Private
 */
const deleteInvite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const invite = await Invite.findById(id);
  if (!invite) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Invite not found",
    });
  }

  // Check if user is sender or receiver
  const isSender = invite.from.toString() === userId.toString();
  const isReceiver = invite.to.toString() === userId.toString();

  if (!isSender && !isReceiver) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await Invite.findByIdAndDelete(id);

  logger.info(`Invite ${id} deleted by user ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Invite deleted",
  });
});

module.exports = {
  searchUsers,
  sendInvite,
  getPendingInvites,
  acceptInvite,
  declineInvite,
  deleteInvite,
};
