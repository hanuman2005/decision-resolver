const User = require('../models/User');
const { hashPassword } = require('../utils/passwordUtils');
const logger = require('../utils/logger');

/**
 * User Service
 * Business logic for user operations
 */

class UserService {
  /**
   * Create new user
   */
  async createUser(userData) {
    const { name, email, password } = userData;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    logger.info(`User created: ${user._id} - ${email}`);
    
    return user;
  }
  
  /**
   * Get user by ID
   */
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
  
  /**
   * Update user profile
   */
  async updateUser(userId, updateData) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update allowed fields
    if (updateData.name) user.name = updateData.name;
    if (updateData.avatar) user.avatar = updateData.avatar;
    if (updateData.preferences) {
      user.preferences = {
        ...user.preferences,
        ...updateData.preferences
      };
    }
    
    await user.save();
    
    logger.info(`User updated: ${userId}`);
    
    return user;
  }
  
  /**
   * Search users
   */
  async searchUsers(query, limit = 10) {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      isActive: true
    })
      .select('name email avatar')
      .limit(limit);
    
    return users;
  }
  
  /**
   * Deactivate user account
   */
  async deactivateUser(userId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    user.isActive = false;
    await user.save();
    
    logger.info(`User deactivated: ${userId}`);
    
    return true;
  }
}

module.exports = new UserService();