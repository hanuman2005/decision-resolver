const Group = require("../models/Group");

/**
 * Get dashboard stats
 * @desc Retrieve user's dashboard statistics
 * @route GET /api/dashboard/stats
 * @access Private
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's groups
    const groups = await Group.find({ members: userId });
    const totalGroups = groups.length;

    // Return basic stats (Decision tracking can be added when fully implemented)
    res.json({
      totalGroups,
      activeDecisions: 0,
      completedDecisions: 0,
      avgSatisfaction: 0,
      successRate: 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};

/**
 * Get recent activity
 * @desc Retrieve user's recent activity in groups
 * @route GET /api/dashboard/activity
 * @access Private
 */
exports.getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's groups
    const groups = await Group.find({ members: userId }).select("_id name");

    // Return empty activity for now (can be populated when decision tracking fully implemented)
    res.json({ activity: [] });
  } catch (error) {
    console.error("Activity error:", error);
    res.status(500).json({
      message: "Error fetching recent activity",
      error: error.message,
    });
  }
};

/**
 * Get upcoming decisions
 * @desc Retrieve user's upcoming decisions
 * @route GET /api/dashboard/decisions
 * @access Private
 */
exports.getUpcomingDecisions = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's groups
    const groups = await Group.find({ members: userId }).select("_id name");

    // Return empty decisions for now (can be populated when decision tracking fully implemented)
    res.json({ decisions: [] });
  } catch (error) {
    console.error("Decisions error:", error);
    res.status(500).json({
      message: "Error fetching upcoming decisions",
      error: error.message,
    });
  }
};
