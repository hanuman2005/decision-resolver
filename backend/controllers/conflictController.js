const DecisionSession = require("../models/DecisionSession");
const Group = require("../models/Group");
const User = require("../models/User");

/**
 * Get conflicts for a decision
 * @desc Analyze decision constraints and find conflicts
 * @route GET /api/conflicts
 * @access Private
 */
exports.getConflicts = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's groups - query for members.userId
    const groups = await Group.find({
      "members.userId": userId,
    }).lean();

    console.log(`[CONFLICTS] User ${userId} is in ${groups.length} groups`);

    if (!groups || groups.length === 0) {
      return res.json({
        success: true,
        conflicts: [],
        compromises: [],
        message: "No groups found",
      });
    }

    // Get collecting/processing decisions for user's groups
    const groupIds = groups.map((g) => g._id);
    const decisions = await DecisionSession.find({
      groupId: { $in: groupIds },
      $or: [{ status: "collecting" }, { status: "processing" }],
    })
      .populate("constraints.userId", "name email")
      .lean();

    console.log("[CONFLICTS] Found decisions:", decisions.length);
    decisions.forEach((d) => {
      console.log(
        `[CONFLICTS] Decision "${d.title}" has ${
          d.constraints?.length || 0
        } constraints`
      );
    });

    if (!decisions || decisions.length === 0) {
      return res.json({
        success: true,
        conflicts: [],
        compromises: [],
        message: "No decisions with conflicts found",
      });
    }

    // Analyze conflicts from constraints
    const conflicts = [];
    const compromises = [];

    for (const decision of decisions) {
      if (!decision.constraints || decision.constraints.length < 2) {
        console.log(
          `[CONFLICTS] Skipping "${decision.title}" - only ${
            decision.constraints?.length || 0
          } constraints`
        );
        continue;
      }

      console.log(`[CONFLICTS] Analyzing "${decision.title}"...`);

      // Check for budget conflicts
      const budgets = decision.constraints
        .filter((c) => c.budget && c.budget.max)
        .map((c) => ({
          userId: c.userId?._id || c.userId,
          username: c.userId?.name || "Unknown",
          min: c.budget.min,
          max: c.budget.max,
        }));

      console.log(`[CONFLICTS] Budget constraints found: ${budgets.length}`);

      if (budgets.length > 1) {
        const budgetValues = budgets.map((b) => b.max);
        const maxBudget = Math.max(...budgetValues);
        const minBudget = Math.min(...budgetValues);

        console.log(`[CONFLICTS] Budget range: $${minBudget} to $${maxBudget}`);

        // If there's difference in budgets
        if (maxBudget > minBudget * 1.3) {
          const highBudgetUsers = budgets.filter(
            (b) => b.max >= maxBudget * 0.7
          );
          const lowBudgetUsers = budgets.filter(
            (b) => b.max <= minBudget * 1.3
          );

          if (highBudgetUsers.length > 0 && lowBudgetUsers.length > 0) {
            console.log(
              `[CONFLICTS] Found budget conflict: ${highBudgetUsers.length} high, ${lowBudgetUsers.length} low`
            );
            conflicts.push({
              id: `${decision._id}-budget`,
              decisionId: decision._id,
              decisionTitle: decision.title,
              type: "Budget Conflict",
              severity:
                highBudgetUsers.length + lowBudgetUsers.length > 3
                  ? "high"
                  : "medium",
              participants: [
                ...highBudgetUsers.map((u) => ({
                  userId: u.userId,
                  username: u.username,
                  preference: `$${u.max} max`,
                })),
                ...lowBudgetUsers.map((u) => ({
                  userId: u.userId,
                  username: u.username,
                  preference: `$${u.max} max`,
                })),
              ],
              description: `Budget range differs significantly: $${minBudget} to $${maxBudget}`,
            });

            compromises.push({
              id: `${decision._id}-budget-compromise`,
              decisionId: decision._id,
              type: "Budget",
              suggestion: `Consider middle ground at $${Math.round(
                (maxBudget + minBudget) / 2
              )} per person`,
              supportCount: budgets.length,
              difficulty: "medium",
            });
          }
        }
      }

      // Check for preference conflicts
      const allPreferences = decision.constraints
        .filter((c) => c.preferences && c.preferences.length > 0)
        .flatMap((c) =>
          c.preferences.map((pref) => ({
            userId: c.userId?._id || c.userId,
            username: c.userId?.name || "Unknown",
            preference: pref,
          }))
        );

      if (allPreferences.length > 0) {
        const preferenceGroups = {};
        allPreferences.forEach((p) => {
          const key = p.preference.toLowerCase();
          if (!preferenceGroups[key]) {
            preferenceGroups[key] = [];
          }
          preferenceGroups[key].push(p);
        });

        // Find preferences with conflicting interests
        Object.entries(preferenceGroups).forEach(([pref, users]) => {
          if (users.length > 1) {
            const totalMembers = decision.constraints.length;
            const supportRate = users.length / totalMembers;

            if (supportRate < 1 && supportRate > 0.3) {
              conflicts.push({
                id: `${decision._id}-${pref}`,
                decisionId: decision._id,
                decisionTitle: decision.title,
                type: `Preference Conflict: ${pref}`,
                severity: supportRate < 0.5 ? "high" : "medium",
                participants: users,
                description: `${users.length} of ${totalMembers} members prefer "${pref}". Others have different preferences.`,
              });
            }
          }
        });
      }

      // Check for dietary restriction conflicts
      const dietaryConflicts = decision.constraints.filter(
        (c) => c.dietaryRequirements && c.dietaryRequirements.length > 0
      );
      if (dietaryConflicts.length > 1) {
        const allDietary = [];
        dietaryConflicts.forEach((c) => {
          c.dietaryRequirements.forEach((d) => {
            allDietary.push({
              userId: c.userId?._id || c.userId,
              username: c.userId?.name || "Unknown",
              requirement: d,
            });
          });
        });

        if (allDietary.length > 0) {
          const dietaryGroups = {};
          allDietary.forEach((d) => {
            const key = d.requirement;
            if (!dietaryGroups[key]) {
              dietaryGroups[key] = [];
            }
            dietaryGroups[key].push(d);
          });

          Object.entries(dietaryGroups).forEach(([dietary, users]) => {
            if (users.length < decision.constraints.length) {
              conflicts.push({
                id: `${decision._id}-dietary-${dietary}`,
                decisionId: decision._id,
                decisionTitle: decision.title,
                type: `Dietary Requirement: ${dietary}`,
                severity: "medium",
                participants: users,
                description: `${users.length} member(s) require ${dietary} options`,
              });
            }
          });
        }
      }

      // Generate compromise suggestions for decision options
      if (decision.options && decision.options.length > 0) {
        decision.options.forEach((option) => {
          compromises.push({
            id: `${decision._id}-option-${option.name}`,
            decisionId: decision._id,
            type: "Option",
            suggestion: `Consider "${option.name}" as a balanced choice`,
            supportCount:
              Math.floor(Math.random() * decision.constraints.length) + 1,
            difficulty: "easy",
          });
        });
      }
    }

    res.json({
      success: true,
      conflicts,
      compromises,
      totalConflicts: conflicts.length,
      totalCompromises: compromises.length,
      message: `Found ${conflicts.length} conflicts and ${compromises.length} compromise suggestions`,
    });
  } catch (error) {
    console.error("Get conflicts error:", error);
    res.status(500).json({
      message: "Error fetching conflicts",
      error: error.message,
    });
  }
};

/**
 * Resolve a conflict
 * @desc Mark a conflict as resolved
 * @route POST /api/conflicts/resolve
 * @access Private
 */
exports.resolveConflict = async (req, res) => {
  try {
    const { conflictId, resolution } = req.body;

    if (!conflictId || !resolution) {
      return res.status(400).json({
        message: "Conflict ID and resolution are required",
      });
    }

    // In a real application, you would update the decision with the resolution
    res.json({
      success: true,
      message: "Conflict resolved successfully",
      resolution,
    });
  } catch (error) {
    console.error("Resolve conflict error:", error);
    res.status(500).json({
      message: "Error resolving conflict",
      error: error.message,
    });
  }
};
