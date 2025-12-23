const express = require('express');
const router = express.Router();
const {
  createDecision,
  getGroupDecisions,
  getDecisionById,
  submitConstraints,
  triggerProcessing,
  cancelDecision,
  getFairnessInsight
} = require('../controllers/decisionController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateMiddleware');
const { decisionSchemas } = require('../utils/validationSchemas');

/**
 * Decision Routes
 * @prefix /api/decisions
 */

// Decision CRUD
router.post('/', protect, validateBody(decisionSchemas.create), createDecision);
router.get('/group/:groupId', protect, getGroupDecisions);
router.get('/:id', protect, getDecisionById);
router.delete('/:id', protect, cancelDecision);

// Constraint submission
router.post('/:id/constraints', protect, validateBody(decisionSchemas.submitConstraints), submitConstraints);

// Processing
router.post('/:id/process', protect, triggerProcessing);

// Fairness
router.get('/fairness/:groupId', protect, getFairnessInsight);

module.exports = router;