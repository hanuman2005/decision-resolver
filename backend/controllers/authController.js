const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/tokenUtils');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

/**
 * Auth Controller
 * Handles user authentication (register, login, profile)
 */

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  
  if (existingUser) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: ERROR_MESSAGES.EMAIL_EXISTS
    });
  }
  
  // Hash password
  const hashedPassword = await hashPassword(password);
  
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
  
  // Generate JWT token
  const token = generateToken({ userId: user._id });
  
  logger.info(`New user registered: ${email}`);
  
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: user.getSafeProfile(),
      token
    }
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Find user and include password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    });
  }
  
  // Check if account is active
  if (!user.isActive) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Account is deactivated'
    });
  }
  
  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    });
  }
  
  // Update last login
  user.lastLogin = new Date();
  await user.save();
  
  // Generate JWT token
  const token = generateToken({ userId: user._id });
  
  logger.info(`User logged in: ${email}`);
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.getSafeProfile(),
      token
    }
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  // User is already attached to req by auth middleware
  const user = await User.findById(req.user._id)
    .populate('groups', 'name memberCount');
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      user: user.getSafeProfile()
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar, preferences } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.USER_NOT_FOUND
    });
  }
  
  // Update fields if provided
  if (name) user.name = name;
  if (avatar) user.avatar = avatar;
  if (preferences) {
    user.preferences = {
      ...user.preferences,
      ...preferences
    };
  }
  
  await user.save();
  
  logger.info(`User profile updated: ${user.email}`);
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: user.getSafeProfile()
    }
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  // Get user with password
  const user = await User.findById(req.user._id).select('+password');
  
  // Verify current password
  const isPasswordValid = await comparePassword(currentPassword, user.password);
  
  if (!isPasswordValid) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }
  
  // Hash new password
  user.password = await hashPassword(newPassword);
  await user.save();
  
  logger.info(`Password changed for user: ${user.email}`);
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Password changed successfully'
  });
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/auth/account
 * @access  Private
 */
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  // Soft delete - just deactivate
  user.isActive = false;
  await user.save();
  
  logger.info(`User account deactivated: ${user.email}`);
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Account deactivated successfully'
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
};