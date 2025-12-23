const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getRecentActivity,
  getUpcomingDecisions,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

/**
 * Dashboard Routes
 * @prefix /api/dashboard
 */

// Get dashboard statistics
router.get("/stats", protect, getDashboardStats);

// Get recent activity
router.get("/activity", protect, getRecentActivity);

// Get upcoming decisions
router.get("/decisions", protect, getUpcomingDecisions);

module.exports = router;
