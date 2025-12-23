const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { GROUP_ROLES, LIMITS } = require("../config/constants");

/**
 * Group Model
 * Represents a group of users who make decisions together
 */
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      minlength: [3, "Group name must be at least 3 characters"],
      maxlength: [50, "Group name cannot exceed 50 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: "",
    },

    // User who created the group
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Group members with their roles
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: Object.values(GROUP_ROLES),
          default: GROUP_ROLES.MEMBER,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Unique invite code for joining the group
    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
      length: LIMITS.INVITE_CODE_LENGTH,
    },

    // Group status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
groupSchema.index({ "members.userId": 1 });
groupSchema.index({ creator: 1 });
groupSchema.index({ createdAt: -1 });
// Removed index for inviteCode to resolve duplicate index warnings

// Virtual for member count
groupSchema.virtual("memberCount").get(function () {
  return this.members ? this.members.length : 0;
});

// Virtual for decisions (populated from DecisionSession model)
groupSchema.virtual("decisions", {
  ref: "DecisionSession",
  localField: "_id",
  foreignField: "groupId",
});

// Pre-save middleware to generate invite code
groupSchema.pre("save", function (next) {
  if (!this.inviteCode) {
    // Generate a random 8-character alphanumeric code
    this.inviteCode = generateInviteCode();
  }
  next();
});

// Pre-save middleware to ensure creator is in members list
groupSchema.pre("save", function (next) {
  if (this.isNew) {
    // Add creator as admin member if not already in members
    const creatorExists = this.members.some(
      (member) => member.userId.toString() === this.creator.toString()
    );

    if (!creatorExists) {
      this.members.push({
        userId: this.creator,
        role: GROUP_ROLES.ADMIN,
        joinedAt: new Date(),
      });
    }
  }
  next();
});

// Method to check if user is a member
groupSchema.methods.isMember = function (userId) {
  return this.members.some((member) => {
    const memberId = member.userId._id ? member.userId._id : member.userId;
    return memberId.toString() === userId.toString();
  });
};

// Method to check if user is admin
groupSchema.methods.isAdmin = function (userId) {
  const member = this.members.find((m) => {
    const memberId = m.userId._id ? m.userId._id : m.userId;
    return memberId.toString() === userId.toString();
  });
  return member && member.role === GROUP_ROLES.ADMIN;
};

// Method to add a member
groupSchema.methods.addMember = function (userId, role = GROUP_ROLES.MEMBER) {
  if (this.isMember(userId)) {
    throw new Error("User is already a member of this group");
  }

  if (this.members.length >= LIMITS.MAX_GROUP_SIZE) {
    throw new Error(
      `Group has reached maximum size of ${LIMITS.MAX_GROUP_SIZE} members`
    );
  }

  this.members.push({
    userId,
    role,
    joinedAt: new Date(),
  });

  return this.save();
};

// Method to remove a member
groupSchema.methods.removeMember = function (userId) {
  const memberIndex = this.members.findIndex(
    (m) => m.userId.toString() === userId.toString()
  );

  if (memberIndex === -1) {
    throw new Error("User is not a member of this group");
  }

  // Prevent removing the last admin
  const member = this.members[memberIndex];
  if (member.role === GROUP_ROLES.ADMIN) {
    const adminCount = this.members.filter(
      (m) => m.role === GROUP_ROLES.ADMIN
    ).length;
    if (adminCount === 1) {
      throw new Error("Cannot remove the last admin from the group");
    }
  }

  this.members.splice(memberIndex, 1);
  return this.save();
};

// Method to promote member to admin
groupSchema.methods.promoteToAdmin = function (userId) {
  const member = this.members.find(
    (m) => m.userId.toString() === userId.toString()
  );

  if (!member) {
    throw new Error("User is not a member of this group");
  }

  member.role = GROUP_ROLES.ADMIN;
  return this.save();
};

// Static method to find group by invite code
groupSchema.statics.findByInviteCode = function (code) {
  return this.findOne({ inviteCode: code, isActive: true });
};

// Helper function to generate invite code
function generateInviteCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < LIMITS.INVITE_CODE_LENGTH; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

module.exports = mongoose.model("Group", groupSchema);
