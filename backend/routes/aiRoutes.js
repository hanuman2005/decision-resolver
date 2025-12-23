const express = require("express");
const router = express.Router();
const { generateSuggestions } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

/**
 * AI Routes
 * @prefix /api/ai
 */

// Generate AI suggestions for a decision
router.post("/suggestions", protect, generateSuggestions);

module.exports = router;
