/**
 * Formatters Utility File
 * Provides formatting functions for dates, numbers, currency, percentages, etc.
 * Used across the Group Decision Resolver application
 */

// ============================================
// DATE & TIME FORMATTERS
// ============================================

/**
 * Format date to readable string (e.g., "Dec 20, 2025")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date with time (e.g., "Dec 20, 2025 at 3:45 PM")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return `${dateStr} at ${timeStr}`;
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago`;
  if (diffMonth < 12) return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
  return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
};

/**
 * Format time only (e.g., "3:45 PM")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Time';
  
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// ============================================
// NUMBER FORMATTERS
// ============================================

/**
 * Format number with commas (e.g., 1000 -> "1,000")
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  
  return num.toLocaleString('en-US');
};

/**
 * Format currency (e.g., 1250.5 -> "$1,250.50")
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format percentage (e.g., 0.856 -> "85.6%")
 * @param {number} value - Decimal value (0-1)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format score out of total (e.g., "8.5/10")
 * @param {number} score - Current score
 * @param {number} total - Total possible score
 * @returns {string} Formatted score string
 */
export const formatScore = (score, total = 10) => {
  if (score === null || score === undefined) return `0/${total}`;
  
  return `${score.toFixed(1)}/${total}`;
};

// ============================================
// STRING FORMATTERS
// ============================================

/**
 * Truncate text with ellipsis (e.g., "This is a long..." )
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str) return '';
  
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to title case (e.g., "hello world" -> "Hello World")
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format username/display name (remove spaces, lowercase)
 * @param {string} name - Name to format
 * @returns {string} Formatted username
 */
export const formatUsername = (name) => {
  if (!name) return '';
  
  return name.toLowerCase().replace(/\s+/g, '');
};

/**
 * Format initials from name (e.g., "John Doe" -> "JD")
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '??';
  
  const parts = name.trim().split(' ');
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// ============================================
// ARRAY & LIST FORMATTERS
// ============================================

/**
 * Format array as comma-separated list (e.g., ["a", "b", "c"] -> "a, b, c")
 * @param {Array} arr - Array to format
 * @param {string} separator - Separator string (default: ', ')
 * @returns {string} Formatted list string
 */
export const formatList = (arr, separator = ', ') => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return 'None';
  
  return arr.join(separator);
};

/**
 * Format array as natural language list (e.g., ["a", "b", "c"] -> "a, b, and c")
 * @param {Array} arr - Array to format
 * @returns {string} Formatted natural language list
 */
export const formatNaturalList = (arr) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return 'None';
  
  if (arr.length === 1) return arr[0];
  
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  
  const allButLast = arr.slice(0, -1).join(', ');
  const last = arr[arr.length - 1];
  
  return `${allButLast}, and ${last}`;
};

// ============================================
// GROUP DECISION SPECIFIC FORMATTERS
// ============================================

/**
 * Format constraint type display name
 * @param {string} type - Constraint type code
 * @returns {string} Display name
 */
export const formatConstraintType = (type) => {
  const typeMap = {
    budget: 'Budget',
    location: 'Location',
    dietary: 'Dietary Restrictions',
    preference: 'Preferences',
    time: 'Time Availability',
    must_have: 'Must-Haves',
    deal_breaker: 'Deal Breakers',
  };
  
  return typeMap[type] || toTitleCase(type);
};

/**
 * Format decision status badge text
 * @param {string} status - Status code
 * @returns {string} Display status
 */
export const formatDecisionStatus = (status) => {
  const statusMap = {
    pending: 'Pending',
    collecting: 'Collecting Constraints',
    processing: 'Processing',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  
  return statusMap[status] || toTitleCase(status);
};

/**
 * Format group role display name
 * @param {string} role - Role code
 * @returns {string} Display role
 */
export const formatGroupRole = (role) => {
  const roleMap = {
    admin: 'Admin',
    member: 'Member',
    moderator: 'Moderator',
  };
  
  return roleMap[role] || toTitleCase(role);
};

/**
 * Format satisfaction level with emoji
 * @param {number} score - Satisfaction score (0-1)
 * @returns {string} Display string with emoji
 */
export const formatSatisfactionLevel = (score) => {
  if (score >= 0.9) return '😊 Very Satisfied';
  if (score >= 0.7) return '🙂 Satisfied';
  if (score >= 0.5) return '😐 Neutral';
  if (score >= 0.3) return '😕 Dissatisfied';
  return '😞 Very Dissatisfied';
};

/**
 * Format fairness multiplier for display
 * @param {number} multiplier - Fairness multiplier
 * @returns {string} Display string
 */
export const formatFairnessMultiplier = (multiplier) => {
  if (multiplier > 1) return `+${((multiplier - 1) * 100).toFixed(0)}% bonus`;
  if (multiplier < 1) return `-${((1 - multiplier) * 100).toFixed(0)}% penalty`;
  return 'Neutral';
};

/**
 * Format member count (e.g., "5 members")
 * @param {number} count - Number of members
 * @returns {string} Formatted count
 */
export const formatMemberCount = (count) => {
  if (!count || count === 0) return 'No members';
  if (count === 1) return '1 member';
  return `${count} members`;
};

/**
 * Format decision count (e.g., "3 decisions")
 * @param {number} count - Number of decisions
 * @returns {string} Formatted count
 */
export const formatDecisionCount = (count) => {
  if (!count || count === 0) return 'No decisions';
  if (count === 1) return '1 decision';
  return `${count} decisions`;
};

// ============================================
// VALIDATION & ERROR FORMATTERS
// ============================================

/**
 * Format error message for display
 * @param {Error|string} error - Error object or message
 * @returns {string} User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  if (typeof error === 'string') return error;
  
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  if (error.message) return error.message;
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Format file size (e.g., 1536 -> "1.5 KB")
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Export all formatters as default object
export default {
  // Date & Time
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatTime,
  
  // Numbers
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatScore,
  
  // Strings
  truncateText,
  capitalizeFirst,
  toTitleCase,
  formatUsername,
  getInitials,
  
  // Arrays & Lists
  formatList,
  formatNaturalList,
  
  // Group Decision Specific
  formatConstraintType,
  formatDecisionStatus,
  formatGroupRole,
  formatSatisfactionLevel,
  formatFairnessMultiplier,
  formatMemberCount,
  formatDecisionCount,
  
  // Validation & Errors
  formatErrorMessage,
  formatFileSize,
};