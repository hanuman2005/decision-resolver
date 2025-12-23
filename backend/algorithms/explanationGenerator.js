/**
 * Explanation Generator
 * Generates human-readable reasoning for algorithm decisions
 */

/**
 * Generate decision reasoning
 * @param {Object} winner - Winning option with scores
 * @param {Array} constraints - All user constraints
 * @param {Object} fairnessData - Fairness multipliers
 * @returns {Array} Array of reasoning strings
 */
function generateDecisionReasoning(winner, constraints, fairnessData) {
  const reasoning = [];
  
  // Overall satisfaction
  const satisfactionRate = (winner.totalScore * 100).toFixed(0);
  reasoning.push(
    `This option scores ${satisfactionRate}% overall satisfaction across all members`
  );
  
  // Budget analysis
  const budgetMatches = winner.userScores.filter(
    us => us.breakdown?.budgetScore > 0.8
  ).length;
  reasoning.push(
    `Within budget for ${budgetMatches}/${constraints.length} members`
  );
  
  // Location analysis
  const locationMatches = winner.userScores.filter(
    us => us.breakdown?.locationScore > 0.7
  ).length;
  if (locationMatches > 0) {
    reasoning.push(`Convenient location for ${locationMatches} member${locationMatches > 1 ? 's' : ''}`);
  }
  
  // Preference analysis
  const preferenceMatches = winner.userScores.filter(
    us => us.breakdown?.preferenceScore > 0.5
  ).length;
  if (preferenceMatches > 0) {
    reasoning.push(
      `Matches preferences of ${preferenceMatches} member${preferenceMatches > 1 ? 's' : ''}`
    );
  }
  
  // Fairness adjustments
  const boostedUsers = winner.userScores.filter(
    us => us.influenceMultiplier > 1.1
  );
  if (boostedUsers.length > 0) {
    reasoning.push(
      `Prioritized ${boostedUsers.length} member(s) who rarely get their preferences`
    );
  }
  
  // Rating mention
  if (winner.option.rating && winner.option.rating >= 4.0) {
    reasoning.push(
      `Highly rated option (${winner.option.rating.toFixed(1)}/5.0 stars)`
    );
  }
  
  return reasoning;
}

/**
 * Generate fairness explanation
 * @param {Object} userHistory - User's history record
 * @returns {String} Fairness explanation
 */
function generateFairnessExplanation(userHistory) {
  const { fairnessMetrics } = userHistory;
  const { currentFairnessScore, influenceMultiplier } = fairnessMetrics;
  
  if (currentFairnessScore < 0.4) {
    return `You rarely get your preferences (${(currentFairnessScore * 100).toFixed(0)}% satisfaction). Your influence has been increased to ${influenceMultiplier.toFixed(1)}x to ensure fairness.`;
  } else if (currentFairnessScore > 0.7) {
    return `You often get your preferences (${(currentFairnessScore * 100).toFixed(0)}% satisfaction). Your influence has been slightly reduced to ${influenceMultiplier.toFixed(1)}x to keep the group balanced.`;
  } else {
    return `You have a balanced fairness score (${(currentFairnessScore * 100).toFixed(0)}% satisfaction). Your influence is normal at ${influenceMultiplier.toFixed(1)}x.`;
  }
}

/**
 * Generate compromise explanation
 * @param {Object} winner - Winning option
 * @param {Array} constraints - All constraints
 * @returns {Array} Compromise explanations
 */
function generateCompromiseExplanation(winner, constraints) {
  const compromises = [];
  
  // Find users with low scores
  const unsatisfiedUsers = winner.userScores.filter(us => us.score < 0.5);
  
  if (unsatisfiedUsers.length > 0) {
    compromises.push({
      type: 'partial_satisfaction',
      message: `${unsatisfiedUsers.length} member(s) had to compromise on this decision`,
      details: 'Not all constraints could be perfectly satisfied'
    });
  }
  
  // Check budget compromises
  const budgetCompromises = winner.userScores.filter(
    us => us.breakdown?.budgetScore < 0.7 && us.breakdown?.budgetScore > 0
  );
  if (budgetCompromises.length > 0) {
    compromises.push({
      type: 'budget',
      message: 'Some members are slightly outside their ideal budget range',
      count: budgetCompromises.length
    });
  }
  
  // Check location compromises
  const locationCompromises = winner.userScores.filter(
    us => us.breakdown?.locationScore < 0.7 && us.breakdown?.locationScore > 0
  );
  if (locationCompromises.length > 0) {
    compromises.push({
      type: 'location',
      message: 'Some members have a longer travel distance than preferred',
      count: locationCompromises.length
    });
  }
  
  return compromises;
}

/**
 * Generate alternative explanation
 * @param {Object} alternative - Alternative option
 * @param {Object} winner - Winning option
 * @returns {String} Why this alternative wasn't chosen
 */
function generateAlternativeExplanation(alternative, winner) {
  const scoreDiff = ((winner.totalScore - alternative.totalScore) * 100).toFixed(0);
  
  if (scoreDiff < 5) {
    return `Very close second choice (${scoreDiff}% difference). Consider this if plans change.`;
  } else if (scoreDiff < 15) {
    return `Solid alternative with ${scoreDiff}% lower satisfaction. Good backup option.`;
  } else {
    return `Alternative option with ${scoreDiff}% lower overall satisfaction.`;
  }
}

/**
 * Generate decision summary
 * @param {Object} decisionResult - Complete decision result
 * @returns {Object} Formatted summary
 */
function generateDecisionSummary(decisionResult) {
  const { selectedOption, satisfactionRate, reasoning } = decisionResult;
  
  return {
    title: `Decision: ${selectedOption.name}`,
    summary: `This option best satisfies the group with ${(satisfactionRate * 100).toFixed(0)}% overall satisfaction.`,
    reasoning: reasoning,
    confidence: satisfactionRate >= 0.8 ? 'high' : satisfactionRate >= 0.6 ? 'medium' : 'low',
    recommendation: satisfactionRate >= 0.7
      ? 'Strongly recommended for the group'
      : satisfactionRate >= 0.5
      ? 'Acceptable choice with some compromises'
      : 'Consider reviewing constraints - no great match found'
  };
}

module.exports = {
  generateDecisionReasoning,
  generateFairnessExplanation,
  generateCompromiseExplanation,
  generateAlternativeExplanation,
  generateDecisionSummary
};