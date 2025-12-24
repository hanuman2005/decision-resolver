const Group = require("../models/Group");
const DecisionSession = require("../models/DecisionSession");

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
    const groups = await Group.find({ "members.userId": userId });
    const totalGroups = groups.length;
    const groupIds = groups.map((g) => g._id);

    // Get all decisions for user's groups
    const decisions = await DecisionSession.find({
      groupId: { $in: groupIds },
    });

    // Count active and completed decisions
    const activeDecisions = decisions.filter(
      (d) => d.status === "collecting" || d.status === "processing"
    ).length;
    const completedDecisions = decisions.filter(
      (d) => d.status === "completed"
    ).length;

    // Calculate average satisfaction from completed decisions
    const completedWithResults = decisions.filter(
      (d) => d.status === "completed" && d.finalDecision?.satisfactionRate
    );
    const avgSatisfaction =
      completedWithResults.length > 0
        ? (completedWithResults.reduce(
            (sum, d) => sum + d.finalDecision.satisfactionRate,
            0
          ) /
            completedWithResults.length) *
          100
        : 0;

    // Calculate success rate (completed / total)
    const successRate =
      decisions.length > 0 ? (completedDecisions / decisions.length) * 100 : 0;

    // Return actual stats
    res.json({
      success: true,
      data: {
        totalGroups,
        activeDecisions,
        completedDecisions,
        avgSatisfaction: Math.round(avgSatisfaction),
        successRate: Math.round(successRate),
      },
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
    const groups = await Group.find({ "members.userId": userId });
    const groupIds = groups.map((g) => g._id);

    // Get recent chat messages from user's groups
    const ChatMessage = require("../models/ChatMessage");
    const recentMessages = await ChatMessage.find({
      groupId: { $in: groupIds },
    })
      .populate("userId", "name")
      .populate("groupId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent decisions created
    const recentDecisions = await DecisionSession.find({
      groupId: { $in: groupIds },
    })
      .populate("groupId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Combine and format activity
    const activity = [
      ...recentMessages.map((msg) => ({
        id: msg._id,
        action: `${msg.userId.name} sent a message`,
        group: msg.groupId.name,
        timestamp: msg.createdAt, // Keep original timestamp for sorting
        time: formatTime(msg.createdAt),
        icon: "MessageCircle",
      })),
      ...recentDecisions.map((dec) => ({
        id: dec._id,
        action: `New decision: ${dec.title}`,
        group: dec.groupId.name,
        timestamp: dec.createdAt, // Keep original timestamp for sorting
        time: formatTime(dec.createdAt),
        icon: "CheckCircle",
      })),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by actual timestamp
      .slice(0, 5)
      .map(({ timestamp, ...rest }) => rest); // Remove timestamp from response

    res.json({
      success: true,
      data: {
        activity: activity.length > 0 ? activity : [],
      },
    });
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
    const groups = await Group.find({ "members.userId": userId });
    const groupIds = groups.map((g) => g._id);

    // Get upcoming/active decisions (not completed)
    const upcomingDecisions = await DecisionSession.find({
      groupId: { $in: groupIds },
      status: { $in: ["collecting", "processing"] },
    })
      .populate("groupId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const decisions = upcomingDecisions.map((dec) => ({
      id: dec._id,
      title: dec.title,
      group: dec.groupId.name,
      deadline: calculateDeadline(dec.createdAt),
      pending: dec.constraints ? dec.constraints.length : 0,
      status: dec.status,
    }));

    res.json({
      success: true,
      data: {
        decisions: decisions.length > 0 ? decisions : [],
      },
    });
  } catch (error) {
    console.error("Decisions error:", error);
    res.status(500).json({
      message: "Error fetching upcoming decisions",
      error: error.message,
    });
  }
};

/**
 * Helper function to format time
 */
function formatTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

/**
 * Helper function to calculate deadline
 */
function calculateDeadline(createdAt) {
  const now = new Date();
  const diff = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const deadline = new Date(createdAt).getTime() + diff;
  const remaining = deadline - now.getTime();
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return "Soon";
}
