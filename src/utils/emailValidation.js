/**
 * Email validation utility
 */

/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {Object} - Validation result with isValid and message properties
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email address is required' };
  }
  
  // Basic email validation regex
  // This checks for a standard email format with @ and domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { 
      isValid: false, 
      message: 'Please enter a valid email address' 
    };
  }
  
  return { isValid: true, message: 'Valid email address' };
};

/**
 * Checks if the email domain appears to be valid
 * @param {string} email - The email address to check
 * @returns {boolean} - Whether the domain appears valid
 */
export const hasValidDomain = (email) => {
  if (!email || !email.includes('@')) return false;
  
  const domain = email.split('@')[1];
  
  // Check for common top-level domains
  const commonTLDs = [
    '.com', '.org', '.net', '.edu', '.gov', '.co', 
    '.io', '.info', '.biz', '.me', '.app', '.dev'
  ];
  
  return commonTLDs.some(tld => domain.endsWith(tld));
};