const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserStats,
  searchUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

/**
 * User Routes
 * @prefix /api/users
 */

// Search users
router.get('/search', protect, searchUsers);

// Get all users (admin only in future)
router.get('/', protect, getAllUsers);

// Get user by ID
router.get('/:id', protect, getUserById);

// Get user statistics
router.get('/:id/stats', protect, getUserStats);

module.exports = router;