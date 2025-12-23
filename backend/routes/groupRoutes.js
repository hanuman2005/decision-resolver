const express = require("express");
const router = express.Router();
const {
  createGroup,
  getMyGroups,
  getGroupById,
  updateGroup,
  joinGroup,
  leaveGroup,
  removeMember,
  promoteMember,
  deleteGroup,
} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");
const { validateBody } = require("../middleware/validateMiddleware");
const { groupSchemas } = require("../utils/validationSchemas");

/**
 * Group Routes
 * @prefix /api/groups
 */

// Group CRUD
router.post("/", protect, validateBody(groupSchemas.create), createGroup);
router.get("/", protect, getMyGroups);

// Group membership (must come before /:id routes to avoid route conflicts)
router.post("/join", protect, validateBody(groupSchemas.join), joinGroup);

// ID-specific routes
router.get("/:id", protect, getGroupById);
router.put("/:id", protect, validateBody(groupSchemas.update), updateGroup);
router.delete("/:id", protect, deleteGroup);
router.post("/:id/leave", protect, leaveGroup);

// Member management (admin only)
router.delete("/:id/members/:memberId", protect, removeMember);
router.put("/:id/members/:memberId/promote", protect, promoteMember);

module.exports = router;
