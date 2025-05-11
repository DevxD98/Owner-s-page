/**
 * Phone number validation utility
 */

// Common country codes with their validation patterns
const countryPatterns = {
  '+1': { // USA & Canada
    pattern: /^\+1[2-9]\d{9}$/,
    example: '+1XXXXXXXXXX'
  },
  '+91': { // India
    pattern: /^\+91[6-9]\d{9}$/,
    example: '+91XXXXXXXXXX'
  },
  '+44': { // UK
    pattern: /^\+44[1-9]\d{9,10}$/,
    example: '+44XXXXXXXXXX'
  },
  '+61': { // Australia
    pattern: /^\+61[4-5]\d{8}$/,
    example: '+61XXXXXXXXX'
  },
  '+86': { // China
    pattern: /^\+86[1]\d{10}$/,
    example: '+86XXXXXXXXXXX'
  },
  // Add more country codes as needed
};

/**
 * Validates a phone number based on country code
 * @param {string} phoneNumber - The phone number to validate
 * @returns {Object} - Validation result with isValid and message properties
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // Ensure the phone number starts with a '+'
  if (!phoneNumber.startsWith('+')) {
    return { isValid: false, message: 'Phone number must start with country code (e.g., +1, +91)' };
  }
  
  // Extract the country code
  const countryCode = Object.keys(countryPatterns).find(code => phoneNumber.startsWith(code));
  
  if (!countryCode) {
    return { isValid: false, message: 'Invalid or unsupported country code' };
  }
  
  // Validate against the pattern for this country code
  const { pattern, example } = countryPatterns[countryCode];
  
  if (!pattern.test(phoneNumber)) {
    return { 
      isValid: false, 
      message: `Invalid phone number format for ${countryCode}. Example: ${example}` 
    };
  }
  
  return { isValid: true, message: 'Valid phone number' };
};

/**
 * Returns a list of supported country codes
 * @returns {Array} - Array of country codes
 */
export const getSupportedCountryCodes = () => {
  return Object.keys(countryPatterns);
};

/**
 * Formats a phone number with proper spacing based on country code
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Basic formatting for common country codes
  if (phoneNumber.startsWith('+1') && phoneNumber.length >= 12) {
    // Format: +1 XXX XXX XXXX (US/Canada)
    return `${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 5)} ${phoneNumber.substring(5, 8)} ${phoneNumber.substring(8)}`;
  }
  
  if (phoneNumber.startsWith('+91') && phoneNumber.length >= 13) {
    // Format: +91 XXXXX XXXXX (India)
    return `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 8)} ${phoneNumber.substring(8)}`;
  }
  
  // Default formatting with spaces after country code
  const countryCode = Object.keys(countryPatterns).find(code => phoneNumber.startsWith(code));
  if (countryCode) {
    return `${countryCode} ${phoneNumber.substring(countryCode.length)}`;
  }
  
  return phoneNumber;
};