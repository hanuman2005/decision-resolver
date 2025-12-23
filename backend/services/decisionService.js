const DecisionSession = require('../models/DecisionSession');
const Group = require('../models/Group');
const { solveDecision } = require('../algorithms/constraintSolver');
const { getFairnessData, updateHistoriesAfterDecision } = require('../algorithms/fairnessTracker');
const { DECISION_STATUS } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Decision Service
 * Business logic for decision operations
 */

class DecisionService {
  /**
   * Create new decision session
   */
  async createDecision(userId, decisionData) {
    const { groupId, title, category, options } = decisionData;
    
    // Verify group exists and user is member
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
    
    if (!group.isMember(userId)) {
      throw new Error('User is not a member of this group');
    }
    
    // Create decision
    const decision = await DecisionSession.create({
      groupId,
      title,
      category,
      options: options || [],
      status: DECISION_STATUS.COLLECTING
    });
    
    logger.info(`Decision created: ${decision._id} by user ${userId}`);
    
    return decision;
  }
  
  /**
   * Submit user constraints
   */
  async submitConstraints(userId, decisionId, constraintData) {
    const decision = await DecisionSession.findById(decisionId).populate('groupId');
    
    if (!decision) {
      throw new Error('Decision not found');
    }
    
    // Verify user is group member
    if (!decision.groupId.isMember(userId)) {
      throw new Error('User is not a member of this group');
    }
    
    // Add constraints
    await decision.addConstraints(userId, constraintData);
    
    // Check if all members submitted
    const isReady = await decision.isReadyForProcessing();
    
    if (isReady) {
      // Trigger processing
      logger.info(`All constraints collected for decision ${decisionId}, triggering processing`);
      // Process asynchronously
      this.processDecision(decisionId).catch(err => {
        logger.error(`Error processing decision ${decisionId}:`, err);
      });
    }
    
    return decision;
  }
  
  /**
   * Process decision with algorithm
   */
  async processDecision(decisionId) {
    const decision = await DecisionSession.findById(decisionId).populate('groupId');
    
    if (!decision) {
      throw new Error('Decision not found');
    }
    
    // Update status to processing
    await decision.startProcessing();
    
    try {
      // Get fairness data
      const memberIds = decision.groupId.members.map(m => m.userId);
      const fairnessData = await getFairnessData(decision.groupId._id, memberIds);
      
      logger.info(`Processing decision ${decisionId} with ${decision.constraints.length} constraints`);
      
      // Run algorithm
      const result = await solveDecision(
        decision.constraints,
        decision.options,
        fairnessData
      );
      
      // Save results
      await decision.completeDecision(result);
      decision.scoringDetails = result.scoringDetails;
      await decision.save();
      
      // Update user histories
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
   * Get decision by ID
   */
  async getDecisionById(decisionId, userId) {
    const decision = await DecisionSession.findById(decisionId)
      .populate('groupId')
      .populate('constraints.userId', 'name email avatar');
    
    if (!decision) {
      throw new Error('Decision not found');
    }
    
    // Verify user is group member
    if (!decision.groupId.isMember(userId)) {
      throw new Error('Not authorized to view this decision');
    }
    
    return decision;
  }
  
  /**
   * Get group decisions
   */
  async getGroupDecisions(groupId, userId, filters = {}) {
    const group = await Group.findById(groupId);
    
    if (!group || !group.isMember(userId)) {
      throw new Error('Not authorized to view group decisions');
    }
    
    const query = { groupId };
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    const decisions = await DecisionSession.find(query)
      .populate('constraints.userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(filters.limit || 10);
    
    return decisions;
  }
  
  /**
   * Cancel decision
   */
  async cancelDecision(decisionId, userId) {
    const decision = await DecisionSession.findById(decisionId).populate('groupId');
    
    if (!decision) {
      throw new Error('Decision not found');
    }
    
    // Verify user is admin
    if (!decision.groupId.isAdmin(userId)) {
      throw new Error('Only admins can cancel decisions');
    }
    
    await decision.cancel();
    
    logger.info(`Decision ${decisionId} cancelled by user ${userId}`);
    
    return decision;
  }
}

module.exports = new DecisionService();