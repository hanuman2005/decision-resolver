const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword,
  deleteAccount 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { userSchemas } = require('../utils/validationSchemas');

/**
 * Auth Routes
 * @prefix /api/auth
 */

// Public routes
router.post('/register', validateBody(userSchemas.register), register);
router.post('/login', validateBody(userSchemas.login), login);

// Protected routes
router.get('/me', protect, getProfile);
router.put('/profile', protect, validateBody(userSchemas.updateProfile), updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/account', protect, deleteAccount);

module.exports = router;