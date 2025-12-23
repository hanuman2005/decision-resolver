const { solveDecision } = require('../algorithms/constraintSolver');
const { getFairnessData } = require('../algorithms/fairnessTracker');
const { HTTP_STATUS } = require('../config/constants');
const { asyncHandler } = require('../middleware/errorMiddleware');
const logger = require('../utils/logger');

/**
 * Algorithm Controller
 * Exposes algorithm functionality as API endpoints for testing/debugging
 */

/**
 * @desc    Test constraint solver with sample data
 * @route   POST /api/algorithm/test
 * @access  Private
 */
const testAlgorithm = asyncHandler(async (req, res) => {
  const { constraints, options } = req.body;

  if (!constraints || !options) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Constraints and options are required'
    });
  }

  try {
    // Mock fairness data for testing
    const fairnessData = {};
    constraints.forEach(c => {
      fairnessData[c.userId] = 1.0; // Neutral fairness
    });

    const result = await solveDecision(constraints, options, fairnessData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Algorithm test completed',
      data: { result }
    });
  } catch (error) {
    logger.error('Algorithm test failed:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @desc    Get algorithm explanation
 * @route   GET /api/algorithm/explain
 * @access  Public
 */
const explainAlgorithm = asyncHandler(async (req, res) => {
  const explanation = {
    name: 'Weighted Constraint Satisfaction with Fairness Tracking',
    description: 'Multi-criteria decision making algorithm that considers budget, location, preferences, and dietary requirements while ensuring long-term fairness',
    
    steps: [
      {
        step: 1,
        name: 'Constraint Collection',
        description: 'Gather constraints from all group members including budgets, preferences, and requirements'
      },
      {
        step: 2,
        name: 'Feasibility Filtering',
        description: 'Filter out options that violate hard constraints (deal-breakers, dietary restrictions)'
      },
      {
        step: 3,
        name: 'Multi-Criteria Scoring',
        description: 'Score each option based on how well it satisfies budget, location, preferences, and requirements'
      },
      {
        step: 4,
        name: 'Fairness Adjustment',
        description: 'Apply historical fairness multipliers (0.7x - 1.5x) to ensure everyone gets their preferences over time'
      },
      {
        step: 5,
        name: 'Final Selection',
        description: 'Choose the highest-scoring option and generate transparent reasoning'
      }
    ],
    
    scoringFormula: 'FinalScore(option) = Σ [UserScore(user, option) × FairnessMultiplier(user)] / MaxPossible',
    
    features: [
      'Budget satisfaction with partial credit for near-misses',
      'Haversine distance calculation for location scoring',
      'Preference tag matching',
      'Must-have requirement checking',
      'Deal-breaker filtering',
      'Historical fairness tracking'
    ],
    
    fairnessSystem: {
      description: 'Tracks each user\'s satisfaction across decisions and adjusts their influence',
      multiplierRange: '0.7x (often satisfied) to 1.5x (rarely satisfied)',
      goal: 'Ensure no user is consistently ignored in group decisions'
    }
  };

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { explanation }
  });
});

/**
 * @desc    Get algorithm metrics
 * @route   GET /api/algorithm/metrics
 * @access  Private
 */
const getMetrics = asyncHandler(async (req, res) => {
  // This would track algorithm performance metrics
  const metrics = {
    totalDecisionsProcessed: 0, // Implement with analytics
    averageProcessingTime: 0,
    averageSatisfactionRate: 0,
    fairnessImprovement: 0
  };

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { metrics }
  });
});

module.exports = {
  testAlgorithm,
  explainAlgorithm,
  getMetrics
};