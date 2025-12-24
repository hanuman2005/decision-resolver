const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getConflicts,
  resolveConflict,
} = require("../controllers/conflictController");

/**
 * @route   GET /api/conflicts
 * @desc    Get conflicts for user's decisions
 * @access  Private
 */
router.get("/", protect, getConflicts);

/**
 * @route   POST /api/conflicts/resolve
 * @desc    Resolve a conflict
 * @access  Private
 */
router.post("/resolve", protect, resolveConflict);

module.exports = router;
