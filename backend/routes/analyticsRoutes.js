const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

/**
 * Analytics Routes
 * @prefix /api/analytics
 */

// Get analytics data
router.get("/", protect, getAnalytics);

module.exports = router;
