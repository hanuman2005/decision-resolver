const { SCORING } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Core Constraint Satisfaction Algorithm
 * Implements weighted multi-criteria decision making with fairness
 */

/**
 * Main function to solve the decision problem
 * @param {Array} constraints - User constraints from all group members
 * @param {Array} options - Available options to choose from
 * @param {Object} fairnessData - Map of userId -> influence multiplier
 * @returns {Object} Decision result with selected option and reasoning
 */
async function solveDecision(constraints, options, fairnessData = {}) {
  try {
    logger.info(`Starting decision algorithm with ${constraints.length} constraints and ${options.length} options`);
    
    // Step 1: Filter options based on hard constraints (must-haves, deal-breakers)
    const feasibleOptions = filterFeasibleOptions(options, constraints);
    
    if (feasibleOptions.length === 0) {
      throw new Error('No feasible options found that satisfy the hard constraints');
    }
    
    logger.info(`${feasibleOptions.length} feasible options after filtering`);
    
    // Step 2: Score each feasible option
    const scoredOptions = scoreAllOptions(feasibleOptions, constraints, fairnessData);
    
    // Step 3: Sort by score (highest first)
    scoredOptions.sort((a, b) => b.totalScore - a.totalScore);
    
    // Step 4: Select winner and alternatives
    const winner = scoredOptions[0];
    const alternatives = scoredOptions.slice(1, SCORING.TOP_ALTERNATIVES + 1);
    
    // Step 5: Generate human-readable reasoning
    const reasoning = generateReasoning(winner, constraints, fairnessData);
    
    // Step 6: Calculate satisfaction rate
    const satisfactionRate = calculateSatisfactionRate(winner, constraints);
    
    logger.info(`Decision made: ${winner.option.name} with score ${winner.totalScore.toFixed(3)}`);
    
    return {
      selectedOption: winner.option,
      algorithmScore: winner.totalScore,
      satisfactionRate,
      reasoning,
      alternatives: alternatives.map(alt => ({
        option: alt.option,
        score: alt.totalScore,
        why: `Alternative with score ${alt.totalScore.toFixed(2)}`
      })),
      scoringDetails: scoredOptions.map(s => ({
        optionId: s.option._id || s.option.name,
        totalScore: s.totalScore,
        perUserScores: s.userScores
      }))
    };
    
  } catch (error) {
    logger.error('Error in constraint solver:', error);
    throw error;
  }
}

/**
 * Filter options that violate hard constraints
 * @param {Array} options - All available options
 * @param {Array} constraints - User constraints
 * @returns {Array} Feasible options
 */
function filterFeasibleOptions(options, constraints) {
  return options.filter(option => {
    // Check each user's hard constraints
    for (const constraint of constraints) {
      // Check deal-breakers
      if (constraint.dealBreakers && constraint.dealBreakers.length > 0) {
        const hasDealBreaker = constraint.dealBreakers.some(db => 
          option.tags?.includes(db.toLowerCase()) || 
          option.name.toLowerCase().includes(db.toLowerCase())
        );
        if (hasDealBreaker) {
          return false; // Reject this option
        }
      }
      
      // Check dietary requirements (if option has tags)
      if (constraint.dietaryRequirements && constraint.dietaryRequirements.length > 0 && option.tags) {
        const violatesDietary = constraint.dietaryRequirements.some(req => {
          // Check if option explicitly violates dietary requirement
          const violations = {
            'vegetarian': ['meat', 'chicken', 'beef', 'pork', 'fish'],
            'vegan': ['meat', 'dairy', 'eggs', 'cheese', 'milk'],
            'gluten-free': ['bread', 'pasta', 'wheat'],
            'dairy-free': ['cheese', 'milk', 'cream', 'butter']
          };
          
          const violatingTags = violations[req] || [];
          return violatingTags.some(tag => option.tags.includes(tag));
        });
        
        if (violatesDietary) {
          return false;
        }
      }
    }
    
    return true; // Option passes all hard constraints
  });
}

/**
 * Score all options based on constraints
 * @param {Array} options - Feasible options
 * @param {Array} constraints - User constraints
 * @param {Object} fairnessData - Influence multipliers per user
 * @returns {Array} Scored options with details
 */
function scoreAllOptions(options, constraints, fairnessData) {
  return options.map(option => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const userScores = [];
    
    // Score this option for each user
    for (const constraint of constraints) {
      const userId = constraint.userId.toString();
      const influenceMultiplier = fairnessData[userId] || 1.0;
      
      // Calculate user's score for this option
      const userScore = scoreOptionForUser(option, constraint);
      
      // Apply fairness multiplier
      const adjustedScore = userScore * influenceMultiplier;
      
      totalScore += adjustedScore;
      maxPossibleScore += influenceMultiplier; // Max possible is 1.0 per user
      
      userScores.push({
        userId: constraint.userId,
        score: userScore,
        adjustedScore: adjustedScore,
        influenceMultiplier,
        breakdown: userScore.breakdown
      });
    }
    
    // Normalize score to 0-1 range
    const normalizedScore = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
    
    return {
      option,
      totalScore: normalizedScore,
      rawScore: totalScore,
      maxPossible: maxPossibleScore,
      userScores
    };
  });
}

/**
 * Score a single option for a single user
 * @param {Object} option - The option to score
 * @param {Object} constraint - User's constraints
 * @returns {Number} Score between 0 and 1
 */
function scoreOptionForUser(option, constraint) {
  let totalScore = 0;
  let totalWeight = 0;
  const breakdown = {};
  
  // 1. Budget score
  if (constraint.budget && option.price !== undefined) {
    const budgetScore = calculateBudgetScore(option.price, constraint.budget);
    totalScore += budgetScore * constraint.budget.weight;
    totalWeight += constraint.budget.weight;
    breakdown.budgetScore = budgetScore;
  }
  
  // 2. Location/distance score
  if (constraint.location && option.location && 
      option.location.latitude && option.location.longitude) {
    const distance = calculateDistance(
      constraint.location.latitude,
      constraint.location.longitude,
      option.location.latitude,
      option.location.longitude
    );
    
    const locationScore = calculateLocationScore(distance, constraint.location.maxDistance);
    totalScore += locationScore * constraint.location.weight;
    totalWeight += constraint.location.weight;
    breakdown.locationScore = locationScore;
  }
  
  // 3. Preference/tags score
  if (constraint.preferences && constraint.preferences.length > 0 && option.tags) {
    const preferenceScore = calculatePreferenceScore(option.tags, constraint.preferences);
    const weight = 0.4; // Default weight for preferences
    totalScore += preferenceScore * weight;
    totalWeight += weight;
    breakdown.preferenceScore = preferenceScore;
  }
  
  // 4. Must-haves bonus
  if (constraint.mustHaves && constraint.mustHaves.length > 0 && option.tags) {
    const mustHaveScore = calculateMustHaveScore(option.tags, constraint.mustHaves, option.name);
    totalScore += mustHaveScore * 0.5; // High weight for must-haves
    totalWeight += 0.5;
    breakdown.mustHaveScore = mustHaveScore;
  }
  
  // 5. Rating bonus (if available)
  if (option.rating !== undefined) {
    const ratingScore = option.rating / 5.0; // Normalize to 0-1
    totalScore += ratingScore * 0.2; // Small weight for rating
    totalWeight += 0.2;
    breakdown.ratingScore = ratingScore;
  }
  
  // Normalize to 0-1
  const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
  
  return {
    score: finalScore,
    breakdown
  };
}

/**
 * Calculate budget satisfaction score
 * @param {Number} price - Option price
 * @param {Object} budget - User's budget constraints
 * @returns {Number} Score between 0 and 1
 */
function calculateBudgetScore(price, budget) {
  if (price >= budget.min && price <= budget.max) {
    // Perfect match - within budget
    return 1.0;
  } else {
    // Partial credit for near-misses using exponential decay
    const deviation = Math.min(
      Math.abs(price - budget.min),
      Math.abs(price - budget.max)
    );
    
    return Math.exp(-deviation / SCORING.PARTIAL_CREDIT_DECAY);
  }
}

/**
 * Calculate location/distance score
 * @param {Number} distance - Distance in km
 * @param {Number} maxDistance - User's max acceptable distance
 * @returns {Number} Score between 0 and 1
 */
function calculateLocationScore(distance, maxDistance) {
  if (distance <= maxDistance) {
    // Linear decay: closer is better
    return 1.0 - (distance / maxDistance);
  } else {
    // Partial credit for slightly over max distance
    const overDistance = distance - maxDistance;
    return Math.exp(-overDistance / 5); // Decay factor of 5km
  }
}

/**
 * Calculate preference matching score
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} userPreferences - User's preferred tags
 * @returns {Number} Score between 0 and 1
 */
function calculatePreferenceScore(optionTags, userPreferences) {
  if (userPreferences.length === 0) return 0.5; // Neutral if no preferences
  
  const matches = userPreferences.filter(pref => 
    optionTags.some(tag => tag.toLowerCase().includes(pref.toLowerCase()))
  ).length;
  
  return matches / userPreferences.length;
}

/**
 * Calculate must-have satisfaction score
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} mustHaves - User's must-have requirements
 * @param {String} optionName - Name of the option (for fallback matching)
 * @returns {Number} Score between 0 and 1
 */
function calculateMustHaveScore(optionTags, mustHaves, optionName = '') {
  if (mustHaves.length === 0) return 1.0; // No must-haves means full score
  
  const matches = mustHaves.filter(mh => {
    const matchInTags = optionTags.some(tag => 
      tag.toLowerCase().includes(mh.toLowerCase())
    );
    const matchInName = optionName.toLowerCase().includes(mh.toLowerCase());
    return matchInTags || matchInName;
  }).length;
  
  return matches / mustHaves.length;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Number} lat1 - Latitude of point 1
 * @param {Number} lon1 - Longitude of point 1
 * @param {Number} lat2 - Latitude of point 2
 * @param {Number} lon2 - Longitude of point 2
 * @returns {Number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Generate human-readable reasoning for the decision
 * @param {Object} winner - The winning option with scores
 * @param {Array} constraints - All user constraints
 * @param {Object} fairnessData - Fairness multipliers
 * @returns {Array} Array of reasoning strings
 */
function generateReasoning(winner, constraints, fairnessData) {
  const reasoning = [];
  
  // Overall satisfaction
  const satisfactionRate = (winner.totalScore * 100).toFixed(0);
  reasoning.push(`This option scores ${satisfactionRate}% overall satisfaction across all members`);
  
  // Budget analysis
  const budgetMatches = winner.userScores.filter(us => 
    us.breakdown?.budgetScore > 0.8
  ).length;
  reasoning.push(`Within budget for ${budgetMatches}/${constraints.length} members`);
  
  // Location analysis
  const locationMatches = winner.userScores.filter(us => 
    us.breakdown?.locationScore > 0.7
  ).length;
  if (locationMatches > 0) {
    reasoning.push(`Convenient location for ${locationMatches} members`);
  }
  
  // Preference analysis
  const preferenceMatches = winner.userScores.filter(us => 
    us.breakdown?.preferenceScore > 0.5
  ).length;
  if (preferenceMatches > 0) {
    reasoning.push(`Matches preferences of ${preferenceMatches} members`);
  }
  
  // Fairness adjustment
  const boostedUsers = winner.userScores.filter(us => 
    us.influenceMultiplier > 1.1
  );
  if (boostedUsers.length > 0) {
    reasoning.push(`Prioritized ${boostedUsers.length} member(s) who rarely get their preferences`);
  }
  
  // Rating mention
  if (winner.option.rating && winner.option.rating >= 4.0) {
    reasoning.push(`Highly rated option (${winner.option.rating}/5.0 stars)`);
  }
  
  return reasoning;
}

/**
 * Calculate overall satisfaction rate
 * @param {Object} winner - The winning option
 * @param {Array} constraints - All constraints
 * @returns {Number} Satisfaction rate between 0 and 1
 */
function calculateSatisfactionRate(winner, constraints) {
  const satisfiedUsers = winner.userScores.filter(us => us.score >= 0.6).length;
  return satisfiedUsers / constraints.length;
}

module.exports = {
  solveDecision,
  calculateDistance,
  scoreOptionForUser,
  filterFeasibleOptions
};