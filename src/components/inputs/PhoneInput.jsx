import React, { useState, useEffect } from 'react';
import { validatePhoneNumber, formatPhoneNumber, getSupportedCountryCodes } from '../../utils/phoneValidation.js';

/**
 * A reusable phone input component with country code selection and validation
 */
const PhoneInput = ({ 
  value, 
  onChange, 
  placeholder = 'Phone number',
  required = false,
  className = '',
  showError = true
 }) => {
  // Initialize with +91 as default
  const [phoneNumber, setPhoneNumber] = useState(value || '+91');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  
  // Update internal state when external value changes
  useEffect(() => {
    if (value !== phoneNumber) {
      setPhoneNumber(value || '+91');
    }
  }, [value]);

  // Get supported country codes
  const countryCodes = getSupportedCountryCodes();
  
  // Extract current country code from phone number
  const getCurrentCountryCode = () => {
    const code = countryCodes.find(code => phoneNumber.startsWith(code));
    return code || '+91'; // Default to +91 if none found
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    onChange && onChange(newValue);
    
    if (touched) {
      validateInput(newValue);
    }
  };

  // Handle country code selection
  const selectCountryCode = (code) => {
    // If phone number already has a country code, replace it
    const currentCode = getCurrentCountryCode();
    let newNumber;
    
    if (phoneNumber.startsWith(currentCode)) {
      // Replace existing country code
      newNumber = code + phoneNumber.substring(currentCode.length);
    } else {
      // Add country code to the beginning
      newNumber = code + (phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber);
    }
    
    setPhoneNumber(newNumber);
    onChange && onChange(newNumber);
    setShowDropdown(false);
    
    if (touched) {
      validateInput(newNumber);
    }
  };

  // Validate phone number
  const validateInput = (number) => {
    if (!number && required) {
      setError('Phone number is required');
      return false;
    }
    
    if (number) {
      const validation = validatePhoneNumber(number);
      setError(validation.isValid ? '' : validation.message);
      return validation.isValid;
    }
    
    setError('');
    return true;
  };

  // Handle blur event
  const handleBlur = () => {
    setTouched(true);
    validateInput(phoneNumber);
    // Close dropdown with a small delay to allow for selection
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center relative">
        {/* Country code selector - Fixed width of 64px */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            className="flex items-center justify-center h-[52px] px-2 bg-gray-50 rounded-l-xl border-r border-gray-200 w-[64px] hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-gray-700 font-medium">{getCurrentCountryCode()}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="ml-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {/* Country code dropdown */}
          {showDropdown && (
            <div className="absolute z-10 mt-1 w-[120px] bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
              {countryCodes.map((code) => (
                <div 
                  key={code} 
                  className="p-2 hover:bg-blue-50 cursor-pointer text-center transition-colors duration-200"
                  onClick={() => selectCountryCode(code)}
                >
                  {code}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Phone number input */}
        <input
          type="tel"
          value={phoneNumber.startsWith(getCurrentCountryCode()) 
            ? phoneNumber.substring(getCurrentCountryCode().length) 
            : phoneNumber}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          onFocus={() => setTouched(true)}
          placeholder={placeholder}
          className="flex-1 w-full p-4 bg-gray-50 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-300 border-0"
          required={required}
        />
      </div>
      
      {/* Error message - Only show after user interaction */}
      {showError && touched && error && (
        <p className="text-red-500 text-sm mt-1 px-1">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;