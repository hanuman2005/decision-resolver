const DecisionSession = require("../models/DecisionSession");
const Group = require("../models/Group");
const { solveDecision } = require("../algorithms/constraintSolver");
const {
  getFairnessData,
  updateHistoriesAfterDecision,
  getUserFairnessInsight,
} = require("../algorithms/fairnessTracker");
const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  DECISION_STATUS,
} = require("../config/constants");
const { asyncHandler } = require("../middleware/errorMiddleware");
const notificationService = require("../services/notificationService");
const logger = require("../utils/logger");

/**
 * Decision Controller
 * Handles decision session creation, constraint submission, and algorithm execution
 */

/**
 * @desc    Create a new decision session
 * @route   POST /api/decisions
 * @access  Private (Group members only)
 */
const createDecision = asyncHandler(async (req, res) => {
  const { groupId, title, category, options } = req.body;
  const userId = req.user._id;

  // Verify group exists and user is member
  const group = await Group.findById(groupId)
    .populate("members.userId", "_id name email")
    .populate("creator");

  if (!group) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.GROUP_NOT_FOUND,
    });
  }

  if (!group.isMember(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  // Check if user is admin (only admin can create decisions)
  if (!group.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admin can create decisions",
    });
  }

  // Create decision session
  const decision = await DecisionSession.create({
    groupId,
    title,
    category,
    options: options || [],
    status: DECISION_STATUS.COLLECTING,
  });

  await decision.populate("groupId");

  logger.info(`Decision session created: ${title} in group ${groupId}`);

  // Send notifications to all group members except the creator
  const otherMemberIds = group.members
    .filter((member) => member.userId._id.toString() !== userId.toString())
    .map((member) => member.userId._id);

  if (otherMemberIds.length > 0) {
    await notificationService.createBulkNotifications(
      otherMemberIds,
      "decision_created",
      {
        title: "New Decision Created",
        message: `A new decision "${title}" has been created in ${group.name}. Please submit your constraints.`,
        groupId: group._id,
        decisionId: decision._id,
        groupName: group.name,
        decisionTitle: title,
      }
    );
  }

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Decision session created successfully",
    data: { decision },
  });
});

/**
 * @desc    Get all decisions for a group
 * @route   GET /api/decisions/group/:groupId
 * @access  Private (Group members only)
 */
const getGroupDecisions = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;
  const { status, limit = 10 } = req.query;

  // Verify user is group member
  const group = await Group.findById(groupId);

  if (!group || !group.isMember(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  // Build query
  const query = { groupId };
  if (status) {
    query.status = status;
  }

  const decisions = await DecisionSession.find(query)
    .populate("constraints.userId", "name avatar")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      decisions,
      count: decisions.length,
    },
  });
});

/**
 * @desc    Get single decision by ID
 * @route   GET /api/decisions/:id
 * @access  Private (Group members only)
 */
const getDecisionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const decision = await DecisionSession.findById(id)
    .populate("groupId")
    .populate("constraints.userId", "name email avatar");

  if (!decision) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.DECISION_NOT_FOUND,
    });
  }

  // Check if user is group member
  if (!decision.groupId.isMember(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { decision },
  });
});

/**
 * @desc    Submit constraints for a decision
 * @route   POST /api/decisions/:id/constraints
 * @access  Private (Group members only)
 */
const submitConstraints = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const constraintData = req.body;

  const decision = await DecisionSession.findById(id).populate("groupId");

  if (!decision) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.DECISION_NOT_FOUND,
    });
  }

  // Check if user is group member
  if (!decision.groupId.isMember(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  try {
    // Add constraints
    await decision.addConstraints(userId, constraintData);

    // Refresh the decision to get updated constraints
    const updatedDecision = await DecisionSession.findById(id)
      .populate("groupId")
      .populate("constraints.userId", "name email avatar");

    // Check if all members have submitted
    const isReady = await updatedDecision.isReadyForProcessing();

    logger.info(`Constraints submitted by user ${userId} for decision ${id}`);

    // If all submitted, automatically trigger processing
    if (isReady) {
      logger.info(
        `All constraints collected for decision ${id}, triggering algorithm`
      );

      // Process in background (don't wait)
      processDecision(id).catch((err) => {
        logger.error(`Error processing decision ${id}:`, err);
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message:
          "Constraints submitted. All members have submitted - processing decision now!",
        data: {
          decision: updatedDecision,
          autoProcessing: true,
        },
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Constraints submitted successfully",
      data: { decision: updatedDecision },
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    Manually trigger decision processing
 * @route   POST /api/decisions/:id/process
 * @access  Private (Group admins only)
 */
const triggerProcessing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const decision = await DecisionSession.findById(id).populate("groupId");

  if (!decision) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.DECISION_NOT_FOUND,
    });
  }

  // Check if user is group admin
  if (!decision.groupId.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can manually trigger processing",
    });
  }

  // Check if ready
  const isReady = await decision.isReadyForProcessing();

  if (!isReady) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.CONSTRAINTS_INCOMPLETE,
    });
  }

  try {
    // Process decision
    const result = await processDecision(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Decision processed successfully",
      data: { decision: result },
    });
  } catch (error) {
    logger.error(`Error processing decision ${id}:`, error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * Helper function to process a decision
 * Runs the constraint solver algorithm
 */
async function processDecision(decisionId) {
  const decision = await DecisionSession.findById(decisionId).populate(
    "groupId"
  );

  if (!decision) {
    throw new Error("Decision not found");
  }

  // Update status to processing
  await decision.startProcessing();

  try {
    // Get fairness data for all members
    const memberIds = decision.groupId.members.map((m) => m.userId);
    const fairnessData = await getFairnessData(decision.groupId._id, memberIds);

    logger.info(
      `Processing decision ${decisionId} with ${decision.constraints.length} constraints`
    );

    // Run the algorithm
    const result = await solveDecision(
      decision.constraints,
      decision.options,
      fairnessData
    );

    // Save results
    await decision.completeDecision(result);
    decision.scoringDetails = result.scoringDetails;
    await decision.save();

    // Update user histories for fairness tracking
    await updateHistoriesAfterDecision(
      decision.groupId._id,
      result,
      decision._id
    );

    logger.info(`Decision ${decisionId} processed successfully`);

    return decision;
  } catch (error) {
    // Mark as failed
    decision.status = DECISION_STATUS.CANCELLED;
    await decision.save();

    logger.error(`Failed to process decision ${decisionId}:`, error);
    throw error;
  }
}

/**
 * @desc    Cancel a decision session
 * @route   DELETE /api/decisions/:id
 * @access  Private (Group admins only)
 */
const cancelDecision = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const decision = await DecisionSession.findById(id).populate("groupId");

  if (!decision) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.DECISION_NOT_FOUND,
    });
  }

  // Check if user is group admin
  if (!decision.groupId.isAdmin(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Only group admins can cancel decisions",
    });
  }

  await decision.cancel();

  logger.info(`Decision ${id} cancelled by user ${userId}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Decision session cancelled",
  });
});

/**
 * @desc    Get user's fairness insight for a group
 * @route   GET /api/decisions/fairness/:groupId
 * @access  Private
 */
const getFairnessInsight = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  // Verify user is group member
  const group = await Group.findById(groupId);

  if (!group || !group.isMember(userId)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }

  const insight = await getUserFairnessInsight(userId, groupId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { insight },
  });
});

module.exports = {
  createDecision,
  getGroupDecisions,
  getDecisionById,
  submitConstraints,
  triggerProcessing,
  cancelDecision,
  getFairnessInsight,
};
