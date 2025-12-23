const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    message: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Index for efficient querying
inviteSchema.index({ to: 1, status: 1 });
inviteSchema.index({ group: 1, to: 1 });
inviteSchema.index({ from: 1, group: 1 });

// Static method to check if invite already exists
inviteSchema.statics.inviteExists = async function (from, to, group) {
  const invite = await this.findOne({
    to,
    group,
    status: { $ne: "declined" },
  });
  console.log(
    `[Invite.inviteExists] Checking for invite to ${to} in group ${group}:`,
    !!invite
  );
  if (invite) {
    console.log(`[Invite.inviteExists] Found existing invite:`, {
      from: invite.from,
      to: invite.to,
      group: invite.group,
      status: invite.status,
    });
  }
  return !!invite;
};

// Static method to get pending invites for a user
inviteSchema.statics.getPendingInvites = async function (userId) {
  return await this.find({ to: userId, status: "pending" })
    .populate("from", "name email avatar")
    .populate("group", "name description")
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model("Invite", inviteSchema);
