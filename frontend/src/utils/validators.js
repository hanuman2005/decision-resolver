/**
 * Validation Utilities
 * Form validation helpers for styled-components forms
 */

/**
 * Email validation
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Password validation with strength check
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Password confirmation validation
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Name validation
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || !name.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }
  
  if (name.length > 50) {
    return { isValid: false, error: `${fieldName} cannot exceed 50 characters` };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Group name validation
 */
export const validateGroupName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Group name is required' };
  }
  
  if (name.length < 3) {
    return { isValid: false, error: 'Group name must be at least 3 characters long' };
  }
  
  if (name.length > 50) {
    return { isValid: false, error: 'Group name cannot exceed 50 characters' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Description validation
 */
export const validateDescription = (description, maxLength = 200) => {
  if (description && description.length > maxLength) {
    return { isValid: false, error: `Description cannot exceed ${maxLength} characters` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Invite code validation
 */
export const validateInviteCode = (code) => {
  if (!code || !code.trim()) {
    return { isValid: false, error: 'Invite code is required' };
  }
  
  const cleanCode = code.trim().toUpperCase();
  
  if (cleanCode.length !== 8) {
    return { isValid: false, error: 'Invite code must be 8 characters long' };
  }
  
  if (!/^[A-Z0-9]+$/.test(cleanCode)) {
    return { isValid: false, error: 'Invite code can only contain letters and numbers' };
  }
  
  return { isValid: true, error: null, value: cleanCode };
};

/**
 * Budget validation
 */
export const validateBudget = (min, max) => {
  const minNum = parseFloat(min);
  const maxNum = parseFloat(max);
  
  if (isNaN(minNum) || isNaN(maxNum)) {
    return { isValid: false, error: 'Budget values must be numbers' };
  }
  
  if (minNum < 0 || maxNum < 0) {
    return { isValid: false, error: 'Budget values must be positive' };
  }
  
  if (minNum > maxNum) {
    return { isValid: false, error: 'Minimum budget cannot be greater than maximum budget' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Decision title validation
 */
export const validateDecisionTitle = (title) => {
  if (!title || !title.trim()) {
    return { isValid: false, error: 'Decision title is required' };
  }
  
  if (title.length < 3) {
    return { isValid: false, error: 'Decision title must be at least 3 characters long' };
  }
  
  if (title.length > 100) {
    return { isValid: false, error: 'Decision title cannot exceed 100 characters' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Option name validation
 */
export const validateOptionName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Option name is required' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'Option name cannot exceed 100 characters' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Required field validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true, error: null };
};

/**
 * URL validation
 */
export const validateUrl = (url) => {
  if (!url) {
    return { isValid: true, error: null }; // URL is optional
  }
  
  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Phone number validation (basic)
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true, error: null }; // Phone is optional
  }
  
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Number range validation
 */
export const validateNumberRange = (value, min, max, fieldName = 'Value') => {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }
  
  if (num < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }
  
  if (num > max) {
    return { isValid: false, error: `${fieldName} cannot exceed ${max}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Array validation (for preferences, tags, etc.)
 */
export const validateArray = (arr, minLength = 0, maxLength = 100, fieldName = 'Items') => {
  if (!Array.isArray(arr)) {
    return { isValid: false, error: `${fieldName} must be an array` };
  }
  
  if (arr.length < minLength) {
    return { isValid: false, error: `Please add at least ${minLength} ${fieldName.toLowerCase()}` };
  }
  
  if (arr.length > maxLength) {
    return { isValid: false, error: `Cannot exceed ${maxLength} ${fieldName.toLowerCase()}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Generic form validation
 * Validates multiple fields at once
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && !value) {
      errors[field] = `${rule.label || field} is required`;
      isValid = false;
      return;
    }
    
    if (rule.email && value) {
      const result = validateEmail(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      isValid = false;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} cannot exceed ${rule.maxLength} characters`;
      isValid = false;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `Invalid ${rule.label || field} format`;
      isValid = false;
    }
    
    if (rule.custom && value) {
      const result = rule.custom(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  });
  
  return { isValid, errors };
};

export default {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validateGroupName,
  validateDescription,
  validateInviteCode,
  validateBudget,
  validateDecisionTitle,
  validateOptionName,
  validateRequired,
  validateUrl,
  validatePhone,
  validateNumberRange,
  validateArray,
  validateForm,
};