const UserHistory = require('../models/UserHistory');
const logger = require('../utils/logger');

/**
 * Fairness Tracking System
 * Ensures no user is consistently ignored in group decisions
 */

/**
 * Get fairness data for all users in a group
 * @param {String} groupId - Group ID
 * @param {Array} userIds - Array of user IDs to get fairness for
 * @returns {Object} Map of userId -> influence multiplier
 */
async function getFairnessData(groupId, userIds) {
  try {
    const fairnessMap = {};
    
    for (const userId of userIds) {
      const history = await UserHistory.findOrCreate(userId, groupId);
      fairnessMap[userId.toString()] = history.fairnessMetrics.influenceMultiplier;
    }
    
    logger.info(`Retrieved fairness data for ${userIds.length} users in group ${groupId}`);
    return fairnessMap;
    
  } catch (error) {
    logger.error('Error getting fairness data:', error);
    // Return default multipliers if error occurs
    const defaultMap = {};
    userIds.forEach(id => {
      defaultMap[id.toString()] = 1.0;
    });
    return defaultMap;
  }
}

/**
 * Update user histories after a decision is made
 * @param {String} groupId - Group ID
 * @param {Object} decisionResult - Result from constraint solver
 * @param {String} decisionId - Decision session ID
 * @returns {Promise} Promise that resolves when all updates complete
 */
async function updateHistoriesAfterDecision(groupId, decisionResult, decisionId) {
  try {
    logger.info(`Updating user histories for decision ${decisionId}`);
    
    const updatePromises = decisionResult.scoringDetails[0].perUserScores.map(async (userScore) => {
      const userId = userScore.userId;
      const satisfactionScore = userScore.score;
      
      // Get or create user history
      const history = await UserHistory.findOrCreate(userId, groupId);
      
      // Add this decision outcome
      await history.addDecisionOutcome(decisionId, satisfactionScore);
      
      logger.debug(`Updated history for user ${userId}: satisfaction ${satisfactionScore.toFixed(2)}`);
    });
    
    await Promise.all(updatePromises);
    logger.info('All user histories updated successfully');
    
  } catch (error) {
    logger.error('Error updating user histories:', error);
    throw error;
  }
}

/**
 * Get fairness statistics for a group
 * @param {String} groupId - Group ID
 * @returns {Array} Array of user fairness stats
 */
async function getGroupFairnessStats(groupId) {
  try {
    const histories = await UserHistory.findByGroup(groupId);
    
    return histories.map(history => ({
      userId: history.userId._id,
      userName: history.userId.name,
      totalDecisions: history.fairnessMetrics.totalDecisions,
      timesPreferencesMet: history.fairnessMetrics.timesPreferencesMet,
      timesSacrificed: history.fairnessMetrics.timesSacrificed,
      fairnessScore: history.fairnessMetrics.currentFairnessScore,
      influenceMultiplier: history.fairnessMetrics.influenceMultiplier,
      status: history.getFairnessStatus(),
      recentPerformance: history.recentPerformance
    }));
    
  } catch (error) {
    logger.error('Error getting group fairness stats:', error);
    throw error;
  }
}

/**
 * Calculate fairness balance for entire group
 * @param {String} groupId - Group ID
 * @returns {Object} Group-level fairness metrics
 */
async function calculateGroupBalance(groupId) {
  try {
    const histories = await UserHistory.findByGroup(groupId);
    
    if (histories.length === 0) {
      return {
        isBalanced: true,
        averageFairness: 0.5,
        standardDeviation: 0,
        mostFavoredUser: null,
        leastFavoredUser: null
      };
    }
    
    // Calculate statistics
    const fairnessScores = histories.map(h => h.fairnessMetrics.currentFairnessScore);
    const average = fairnessScores.reduce((sum, score) => sum + score, 0) / fairnessScores.length;
    
    const variance = fairnessScores.reduce((sum, score) => 
      sum + Math.pow(score - average, 2), 0
    ) / fairnessScores.length;
    const stdDev = Math.sqrt(variance);
    
    // Find extremes
    const sorted = [...histories].sort((a, b) => 
      b.fairnessMetrics.currentFairnessScore - a.fairnessMetrics.currentFairnessScore
    );
    
    return {
      isBalanced: stdDev < 0.2, // Consider balanced if std dev is low
      averageFairness: average,
      standardDeviation: stdDev,
      mostFavoredUser: {
        userId: sorted[0].userId._id,
        name: sorted[0].userId.name,
        score: sorted[0].fairnessMetrics.currentFairnessScore
      },
      leastFavoredUser: {
        userId: sorted[sorted.length - 1].userId._id,
        name: sorted[sorted.length - 1].userId.name,
        score: sorted[sorted.length - 1].fairnessMetrics.currentFairnessScore
      },
      totalUsers: histories.length
    };
    
  } catch (error) {
    logger.error('Error calculating group balance:', error);
    throw error;
  }
}

/**
 * Reset fairness for a user (admin action)
 * @param {String} userId - User ID
 * @param {String} groupId - Group ID
 * @returns {Promise} Updated history
 */
async function resetUserFairness(userId, groupId) {
  try {
    const history = await UserHistory.findOne({ userId, groupId });
    
    if (!history) {
      throw new Error('User history not found');
    }
    
    // Reset to neutral values
    history.fairnessMetrics.currentFairnessScore = 0.5;
    history.fairnessMetrics.influenceMultiplier = 1.0;
    
    await history.save();
    
    logger.info(`Reset fairness for user ${userId} in group ${groupId}`);
    return history;
    
  } catch (error) {
    logger.error('Error resetting user fairness:', error);
    throw error;
  }
}

/**
 * Get personalized fairness insight for a user
 * @param {String} userId - User ID
 * @param {String} groupId - Group ID
 * @returns {Object} Fairness insight with recommendations
 */
async function getUserFairnessInsight(userId, groupId) {
  try {
    const history = await UserHistory.findOrCreate(userId, groupId);
    const status = history.getFairnessStatus();
    const recent = history.recentPerformance;
    
    let recommendation = '';
    
    if (status.status === 'needs_boost') {
      recommendation = "Your preferences haven't been prioritized recently. The next decision will give more weight to your constraints.";
    } else if (status.status === 'needs_balance') {
      recommendation = "You've been getting your preferences often. To keep things fair, your influence will be slightly reduced in the next decision.";
    } else {
      recommendation = "Your fairness score is balanced. The algorithm treats your input equally with others.";
    }
    
    return {
      totalDecisions: history.fairnessMetrics.totalDecisions,
      fairnessScore: history.fairnessMetrics.currentFairnessScore,
      status: status.status,
      message: status.message,
      recommendation,
      recentTrend: recent.trend,
      recentAverageScore: recent.averageScore,
      nextDecisionInfluence: status.multiplier
    };
    
  } catch (error) {
    logger.error('Error getting user fairness insight:', error);
    throw error;
  }
}

module.exports = {
  getFairnessData,
  updateHistoriesAfterDecision,
  getGroupFairnessStats,
  calculateGroupBalance,
  resetUserFairness,
  getUserFairnessInsight
};