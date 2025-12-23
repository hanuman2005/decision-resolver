const { SCORING } = require('../config/constants');

/**
 * Scoring Engine
 * Modular scoring functions for different constraint types
 */

/**
 * Score budget satisfaction
 * @param {Number} price - Option price
 * @param {Object} budget - User's budget constraints
 * @returns {Number} Score between 0 and 1
 */
function scoreBudget(price, budget) {
  if (price >= budget.min && price <= budget.max) {
    // Perfect match - within budget
    return 1.0;
  }
  
  // Partial credit for near-misses using exponential decay
  const deviation = Math.min(
    Math.abs(price - budget.min),
    Math.abs(price - budget.max)
  );
  
  return Math.exp(-deviation / SCORING.PARTIAL_CREDIT_DECAY);
}

/**
 * Score location/distance satisfaction
 * @param {Number} distance - Distance in km
 * @param {Number} maxDistance - User's max acceptable distance
 * @returns {Number} Score between 0 and 1
 */
function scoreLocation(distance, maxDistance) {
  if (distance <= maxDistance) {
    // Linear decay: closer is better
    return 1.0 - (distance / maxDistance);
  }
  
  // Partial credit for slightly over max distance
  const overDistance = distance - maxDistance;
  return Math.exp(-overDistance / 5); // Decay factor of 5km
}

/**
 * Score preference matching
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} userPreferences - User's preferred tags
 * @returns {Number} Score between 0 and 1
 */
function scorePreferences(optionTags, userPreferences) {
  if (!userPreferences || userPreferences.length === 0) {
    return 0.5; // Neutral if no preferences
  }
  
  const matches = userPreferences.filter(pref =>
    optionTags.some(tag => tag.toLowerCase().includes(pref.toLowerCase()))
  ).length;
  
  return matches / userPreferences.length;
}

/**
 * Score must-have satisfaction
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} mustHaves - User's must-have requirements
 * @param {String} optionName - Name of the option (for fallback matching)
 * @returns {Number} Score between 0 and 1
 */
function scoreMustHaves(optionTags, mustHaves, optionName = '') {
  if (!mustHaves || mustHaves.length === 0) {
    return 1.0; // No must-haves means full score
  }
  
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
 * Check if option violates dietary restrictions
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} dietaryRequirements - User's dietary requirements
 * @returns {Boolean} True if violates, false otherwise
 */
function checkDietaryViolations(optionTags, dietaryRequirements) {
  if (!dietaryRequirements || dietaryRequirements.length === 0) {
    return false;
  }
  
  const violations = {
    'vegetarian': ['meat', 'chicken', 'beef', 'pork', 'fish'],
    'vegan': ['meat', 'dairy', 'eggs', 'cheese', 'milk'],
    'gluten-free': ['bread', 'pasta', 'wheat'],
    'dairy-free': ['cheese', 'milk', 'cream', 'butter'],
    'nut-free': ['nuts', 'peanuts', 'almonds'],
    'halal': ['pork', 'alcohol'],
    'kosher': ['pork', 'shellfish']
  };
  
  for (const requirement of dietaryRequirements) {
    const violatingTags = violations[requirement] || [];
    const hasViolation = violatingTags.some(tag =>
      optionTags.some(optionTag => optionTag.toLowerCase().includes(tag))
    );
    
    if (hasViolation) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if option has any deal-breakers
 * @param {Array} optionTags - Tags associated with the option
 * @param {Array} dealBreakers - User's deal-breaker tags
 * @param {String} optionName - Name of the option
 * @returns {Boolean} True if has deal-breaker, false otherwise
 */
function checkDealBreakers(optionTags, dealBreakers, optionName = '') {
  if (!dealBreakers || dealBreakers.length === 0) {
    return false;
  }
  
  return dealBreakers.some(db => {
    const matchInTags = optionTags.some(tag =>
      tag.toLowerCase().includes(db.toLowerCase())
    );
    const matchInName = optionName.toLowerCase().includes(db.toLowerCase());
    return matchInTags || matchInName;
  });
}

/**
 * Score rating/quality
 * @param {Number} rating - Option rating (0-5)
 * @returns {Number} Score between 0 and 1
 */
function scoreRating(rating) {
  if (!rating || rating === 0) {
    return 0.5; // Neutral if no rating
  }
  
  return rating / 5.0;
}

/**
 * Calculate weighted aggregate score
 * @param {Object} scores - Individual scores
 * @param {Object} weights - Weights for each score
 * @returns {Number} Weighted aggregate score
 */
function calculateAggregateScore(scores, weights) {
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const [key, score] of Object.entries(scores)) {
    const weight = weights[key] || 0;
    totalScore += score * weight;
    totalWeight += weight;
  }
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

module.exports = {
  scoreBudget,
  scoreLocation,
  scorePreferences,
  scoreMustHaves,
  checkDietaryViolations,
  checkDealBreakers,
  scoreRating,
  calculateAggregateScore
};