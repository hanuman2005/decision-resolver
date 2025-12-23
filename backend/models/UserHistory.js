const mongoose = require('mongoose');
const { FAIRNESS_BOUNDS, FAIRNESS_THRESHOLDS } = require('../config/constants');

/**
 * User History Model
 * Tracks user's decision history within groups for fairness calculations
 */
const userHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    },
    
    // Historical record of decisions
    decisionHistory: [{
      decisionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DecisionSession'
      },
      
      // Did the final decision meet this user's preferences?
      wasPreferencesMet: {
        type: Boolean,
        required: true
      },
      
      // How well were their constraints satisfied (0-1)
      satisfactionScore: {
        type: Number,
        min: 0,
        max: 1,
        required: true
      },
      
      date: {
        type: Date,
        default: Date.now
      }
    }],
    
    // Aggregated fairness metrics
    fairnessMetrics: {
      // Total number of decisions this user participated in
      totalDecisions: {
        type: Number,
        default: 0,
        min: 0
      },
      
      // Number of times user's preferences were met
      timesPreferencesMet: {
        type: Number,
        default: 0,
        min: 0
      },
      
      // Number of times user had to compromise/sacrifice
      timesSacrificed: {
        type: Number,
        default: 0,
        min: 0
      },
      
      // Current fairness score (0-1, where 0.5 is perfectly fair)
      currentFairnessScore: {
        type: Number,
        default: 0.5,
        min: 0,
        max: 1
      },
      
      // Influence multiplier for next decision (based on fairness)
      influenceMultiplier: {
        type: Number,
        default: FAIRNESS_BOUNDS.NEUTRAL,
        min: FAIRNESS_BOUNDS.MIN,
        max: FAIRNESS_BOUNDS.MAX
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound index for quick lookups
userHistorySchema.index({ userId: 1, groupId: 1 }, { unique: true });
userHistorySchema.index({ groupId: 1 });

// Virtual for recent performance (last 5 decisions)
userHistorySchema.virtual('recentPerformance').get(function() {
  if (this.decisionHistory.length === 0) {
    return { averageScore: 0.5, trend: 'neutral' };
  }
  
  const recentCount = Math.min(5, this.decisionHistory.length);
  const recent = this.decisionHistory.slice(-recentCount);
  
  const avgScore = recent.reduce((sum, d) => sum + d.satisfactionScore, 0) / recentCount;
  
  // Determine trend
  let trend = 'neutral';
  if (recentCount >= 3) {
    const firstHalf = recent.slice(0, Math.floor(recentCount / 2));
    const secondHalf = recent.slice(Math.floor(recentCount / 2));
    
    const firstAvg = firstHalf.reduce((sum, d) => sum + d.satisfactionScore, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, d) => sum + d.satisfactionScore, 0) / secondHalf.length;
    
    if (secondAvg > firstAvg + 0.1) trend = 'improving';
    else if (secondAvg < firstAvg - 0.1) trend = 'declining';
  }
  
  return { averageScore: avgScore, trend };
});

// Method to add a decision outcome
userHistorySchema.methods.addDecisionOutcome = function(decisionId, satisfactionScore) {
  // Add to history
  this.decisionHistory.push({
    decisionId,
    wasPreferencesMet: satisfactionScore >= 0.7, // Consider 70%+ as "preferences met"
    satisfactionScore,
    date: new Date()
  });
  
  // Update metrics
  this.fairnessMetrics.totalDecisions++;
  
  if (satisfactionScore >= 0.7) {
    this.fairnessMetrics.timesPreferencesMet++;
  } else {
    this.fairnessMetrics.timesSacrificed++;
  }
  
  // Recalculate fairness score and influence
  this.calculateFairness();
  
  return this.save();
};

// Method to calculate fairness score and influence multiplier
userHistorySchema.methods.calculateFairness = function() {
  const metrics = this.fairnessMetrics;
  
  if (metrics.totalDecisions === 0) {
    metrics.currentFairnessScore = 0.5; // Neutral
    metrics.influenceMultiplier = FAIRNESS_BOUNDS.NEUTRAL;
    return;
  }
  
  // Calculate fairness score
  // 1.0 = always gets preferences, 0.0 = never gets preferences
  metrics.currentFairnessScore = metrics.timesPreferencesMet / metrics.totalDecisions;
  
  // Calculate influence multiplier based on fairness score
  if (metrics.currentFairnessScore < FAIRNESS_THRESHOLDS.LOW) {
    // User rarely gets their way - boost their influence
    metrics.influenceMultiplier = FAIRNESS_BOUNDS.MAX;
  } else if (metrics.currentFairnessScore > FAIRNESS_THRESHOLDS.HIGH) {
    // User often gets their way - reduce their influence
    metrics.influenceMultiplier = FAIRNESS_BOUNDS.MIN;
  } else {
    // User is in the fair range - neutral influence
    // Linear interpolation between bounds
    const range = FAIRNESS_THRESHOLDS.HIGH - FAIRNESS_THRESHOLDS.LOW;
    const position = (metrics.currentFairnessScore - FAIRNESS_THRESHOLDS.LOW) / range;
    metrics.influenceMultiplier = FAIRNESS_BOUNDS.MAX - (position * (FAIRNESS_BOUNDS.MAX - FAIRNESS_BOUNDS.MIN));
  }
  
  // Ensure multiplier stays within bounds
  metrics.influenceMultiplier = Math.max(
    FAIRNESS_BOUNDS.MIN,
    Math.min(FAIRNESS_BOUNDS.MAX, metrics.influenceMultiplier)
  );
};

// Method to get fairness status (human-readable)
userHistorySchema.methods.getFairnessStatus = function() {
  const score = this.fairnessMetrics.currentFairnessScore;
  const multiplier = this.fairnessMetrics.influenceMultiplier;
  
  if (score < FAIRNESS_THRESHOLDS.LOW) {
    return {
      status: 'needs_boost',
      message: 'This user rarely gets their preferences - their voice will be amplified',
      multiplier
    };
  } else if (score > FAIRNESS_THRESHOLDS.HIGH) {
    return {
      status: 'needs_balance',
      message: 'This user often gets their preferences - their influence will be slightly reduced',
      multiplier
    };
  } else {
    return {
      status: 'balanced',
      message: 'This user has a balanced fairness score',
      multiplier
    };
  }
};

// Static method to find or create user history
userHistorySchema.statics.findOrCreate = async function(userId, groupId) {
  let history = await this.findOne({ userId, groupId });
  
  if (!history) {
    history = await this.create({
      userId,
      groupId,
      decisionHistory: [],
      fairnessMetrics: {
        totalDecisions: 0,
        timesPreferencesMet: 0,
        timesSacrificed: 0,
        currentFairnessScore: 0.5,
        influenceMultiplier: FAIRNESS_BOUNDS.NEUTRAL
      }
    });
  }
  
  return history;
};

// Static method to get all histories for a group
userHistorySchema.statics.findByGroup = function(groupId) {
  return this.find({ groupId }).populate('userId', 'name email avatar');
};

module.exports = mongoose.model('UserHistory', userHistorySchema);