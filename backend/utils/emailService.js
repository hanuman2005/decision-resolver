const nodemailer = require("nodemailer");
const logger = require("./logger");

/**
 * Email Service
 * Handles sending emails for notifications
 */

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send notification email
 */
const sendNotificationEmail = async (recipient, notification) => {
  try {
    if (!recipient.email) {
      logger.warn(`No email for user ${recipient._id}`);
      return false;
    }

    const emailTemplates = {
      member_joined: {
        subject: `✨ New member joined "${notification.data.groupName}"`,
        template: "member_joined",
      },
      constraint_submitted: {
        subject: `📋 Constraint submitted for "${notification.data.decisionTitle}"`,
        template: "constraint_submitted",
      },
      decision_ready: {
        subject: `🎉 Decision ready: "${notification.data.decisionTitle}"`,
        template: "decision_ready",
      },
      group_invite: {
        subject: `👋 You're invited to join "${notification.data.groupName}"`,
        template: "group_invite",
      },
      decision_created: {
        subject: `📍 New decision: "${notification.data.decisionTitle}"`,
        template: "decision_created",
      },
      member_left: {
        subject: `👋 ${notification.data.userName} left "${notification.data.groupName}"`,
        template: "member_left",
      },
    };

    const template = emailTemplates[notification.type];
    if (!template) {
      logger.error(`No email template for type: ${notification.type}`);
      return false;
    }

    const htmlContent = generateEmailHTML(notification, template.template);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipient.email,
      subject: template.subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    logger.info(
      `Email sent to ${recipient.email} for notification ${notification._id}`
    );
    return true;
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
    return false;
  }
};

/**
 * Generate HTML email content
 */
const generateEmailHTML = (notification, template) => {
  const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";
  const actionButtons = {
    member_joined: `<a href="${baseURL}/groups/${notification.data.groupId}" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View Group</a>`,
    constraint_submitted: `<a href="${baseURL}/groups/${notification.data.groupId}/decisions/${notification.data.decisionId}" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View Decision</a>`,
    decision_ready: `<a href="${baseURL}/groups/${notification.data.groupId}/decisions/${notification.data.decisionId}" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">See Results</a>`,
    group_invite: `<a href="${baseURL}/join-group" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">Join Group</a>`,
    decision_created: `<a href="${baseURL}/groups/${notification.data.groupId}" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View Decision</a>`,
    member_left: `<a href="${baseURL}/groups/${notification.data.groupId}" style="background-color: #0066cc; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">View Group</a>`,
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { border-bottom: 2px solid #0066cc; padding-bottom: 20px; margin-bottom: 20px; }
          .header h1 { color: #333; margin: 0; font-size: 24px; }
          .content { color: #666; line-height: 1.6; }
          .content p { margin: 10px 0; }
          .action-button { margin: 30px 0; text-align: center; }
          .footer { color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${notification.title}</h1>
          </div>
          <div class="content">
            <p>${notification.message}</p>
            <p style="margin-top: 20px;">
              <strong>Date:</strong> ${new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>
          </div>
          <div class="action-button">
            ${actionButtons[notification.type] || ""}
          </div>
          <div class="footer">
            <p>You received this email because you're part of a group in Group Decision Resolver.</p>
            <p>
              <a href="${baseURL}/settings" style="color: #0066cc; text-decoration: none;">Manage Notifications</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = {
  sendNotificationEmail,
  transporter,
};
