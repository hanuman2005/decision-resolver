const User = require('../models/User');
const Group = require('../models/Group');
const { HTTP_STATUS } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

/**
 * User Controller
 * Handles user-related operations beyond authentication
 */

/**
 * @desc    Get all users (admin only - for future use)
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  const users = await User.find(query)
    .select('-password')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await User.countDocuments(query);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    }
  });
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { user }
  });
});

/**
 * @desc    Get user statistics
 * @route   GET /api/users/:id/stats
 * @access  Private
 */
const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Verify user is requesting their own stats or is admin
  if (userId !== req.user._id.toString()) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: 'Not authorized to view these statistics'
    });
  }

  // Get group count
  const groupCount = await Group.countDocuments({
    'members.userId': userId,
    isActive: true
  });

  // Get decisions count (would need DecisionSession model)
  // const decisionsCount = await DecisionSession.countDocuments({...});

  const stats = {
    totalGroups: groupCount,
    totalDecisions: 0, // Implement when needed
    completedDecisions: 0 // Implement when needed
  };

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { stats }
  });
});

/**
 * @desc    Search users by name or email
 * @route   GET /api/users/search
 * @access  Private
 */
const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Search query must be at least 2 characters'
    });
  }

  const users = await User.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } }
    ],
    isActive: true
  })
    .select('name email avatar')
    .limit(10);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { users }
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  getUserStats,
  searchUsers
};