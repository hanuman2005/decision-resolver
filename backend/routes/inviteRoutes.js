const express = require("express");
const router = express.Router();
const {
  searchUsers,
  sendInvite,
  getPendingInvites,
  acceptInvite,
  declineInvite,
  deleteInvite,
} = require("../controllers/inviteController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// @route   GET /api/invites/search?q=query
// @desc    Search users by name or email
// @access  Private
router.get("/search", searchUsers);

// @route   GET /api/invites/pending
// @desc    Get all pending invites for current user
// @access  Private
router.get("/pending", getPendingInvites);

// @route   POST /api/invites
// @desc    Send invite to user for a group
// @access  Private (Group Admin)
router.post("/", sendInvite);

// @route   PUT /api/invites/:id/accept
// @desc    Accept an invite
// @access  Private
router.put("/:id/accept", acceptInvite);

// @route   PUT /api/invites/:id/decline
// @desc    Decline an invite
// @access  Private
router.put("/:id/decline", declineInvite);

// @route   DELETE /api/invites/:id
// @desc    Delete an invite
// @access  Private
router.delete("/:id", deleteInvite);

module.exports = router;
