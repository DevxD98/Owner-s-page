import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PhoneInput from '../components/inputs/PhoneInput';
import { validateEmail } from '../utils/emailValidation';

const StoreInformationPage = () => {
  const navigate = useNavigate();
  const { 
    storeName: contextStoreName, 
    storeCategory: contextStoreCategory,
    storePhone: contextStorePhone,
    storeEmail: contextStoreEmail,
    storeAddress: contextStoreAddress,
    storeHours: contextStoreHours,
    setStoreName, 
    setStoreCategory,
    setStorePhone,
    setStoreEmail,
    setStoreAddress,
    setStoreHours,
  } = useApp();

  const [storeName, setStoreNameLocal] = useState(contextStoreName || '');
  const [storeCategory, setStoreCategoryLocal] = useState(contextStoreCategory || '');
  const [mobileNumber, setMobileNumber] = useState(contextStorePhone || '+91');
  const [email, setEmail] = useState(contextStoreEmail || '');
  const [address, setAddress] = useState(contextStoreAddress || '');
  
  // Parse opening and closing hours from the context store hours if it exists
  const [openingHours, setOpeningHours] = useState('');
  const [closingHours, setClosingHours] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  
  // Parse hours from context on component mount
  useEffect(() => {
    if (contextStoreHours) {
      // Check if hours are in format "9:00 AM - 5:00 PM"
      const hoursParts = contextStoreHours.split(' - ');
      if (hoursParts.length === 2) {
        // Try to convert from 12-hour format back to 24-hour format for the time inputs
        try {
          const openingParts = hoursParts[0].split(' ');
          const closingParts = hoursParts[1].split(' ');
          
          if (openingParts.length === 2 && closingParts.length === 2) {
            const [openingHour, openingMinute] = openingParts[0].split(':');
            const [closingHour, closingMinute] = closingParts[0].split(':');
            
            const openingHour24 = openingParts[1] === 'PM' && openingHour !== '12' 
              ? parseInt(openingHour) + 12 
              : (openingParts[1] === 'AM' && openingHour === '12' ? 0 : openingHour);
              
            const closingHour24 = closingParts[1] === 'PM' && closingHour !== '12'
              ? parseInt(closingHour) + 12
              : (closingParts[1] === 'AM' && closingHour === '12' ? 0 : closingHour);
            
            setOpeningHours(`${openingHour24.toString().padStart(2, '0')}:${openingMinute}`);
            setClosingHours(`${closingHour24.toString().padStart(2, '0')}:${closingMinute}`);
          }
        } catch (e) {
          // If parsing fails, just leave the fields empty
          console.error('Error parsing hours:', e);
        }
      }
    }
  }, [contextStoreHours]);

  const categories = [
    'Restaurant',
    'Salon',
    'Retail',
    'Cafe',
    'Gym',
    'Spa',
    'Electronics',
    'Fashion',
    'Other'
  ];

  // Format time string for display
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return '';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const minute = minutes;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minute} ${period}`;
    } catch (e) {
      return timeString;
    }
  };
  
  // Format business hours (both opening and closing)
  const formatBusinessHours = () => {
    if (!openingHours) return 'Business Hours';
    
    const opening = formatTimeDisplay(openingHours);
    const closing = closingHours ? formatTimeDisplay(closingHours) : '';
    
    if (closing) {
      return `${opening} - ${closing}`;
    }
    return opening;
  };

  // Validate email when it changes
  useEffect(() => {
    if (email) {
      const validation = validateEmail(email);
      setEmailError(validation.isValid ? '' : validation.message);
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleSave = () => {
    // Validate email before saving
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    // Update context with store information
    setStoreName(storeName);
    setStoreCategory(storeCategory);
    setStorePhone(mobileNumber);
    setStoreEmail(email);
    setStoreAddress(address);
    
    // Combine opening and closing hours
    const businessHours = closingHours 
      ? `${formatTimeDisplay(openingHours)} - ${formatTimeDisplay(closingHours)}`
      : formatTimeDisplay(openingHours);
    
    setStoreHours(businessHours);
    
    // Navigate back
    navigate(-1);
  };

  const selectCategory = (category) => {
    setStoreCategoryLocal(category);
    setShowCategoryDropdown(false);
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Store Information</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Store Name */}
        <div className="space-y-2">
          <label className="text-base font-medium text-gray-700">Store Name</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreNameLocal(e.target.value)}
              placeholder="Enter your store name"
              className="w-full p-4 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
            />
          </div>
        </div>

        {/* Store Category */}
        <div className="space-y-2 relative">
          <label className="text-base font-medium text-gray-700">Store Category</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <div 
              className="w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className={storeCategory ? 'text-gray-800' : 'text-gray-400'}>
                {storeCategory || 'Select store category'}
              </span>
              <div className="text-gray-400">
                <ChevronDown size={20} strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Dropdown */}
            {showCategoryDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setShowCategoryDropdown(false)}
                />
                <div 
                  className="absolute z-50 mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {categories.map((category) => (
                    <div 
                      key={category} 
                      className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                      onClick={() => selectCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label className="text-base font-medium text-gray-700">Mobile Number</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <PhoneInput
              value={mobileNumber}
              onChange={setMobileNumber}
              placeholder="Phone number"
              required
              className="border border-gray-100"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-base font-medium text-gray-700">Email Address</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full p-4 bg-transparent rounded-xl focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-300 border-red-200' : 'focus:ring-blue-300 border border-gray-100'}`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1 px-2">{emailError}</p>}
          </div>
        </div>
        
        {/* Business Hours */}
        <div className="space-y-2">
          <label className="text-base font-medium text-gray-700">Business Hours</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {showTimeInput ? (
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-600 text-sm">Opening:</label>
                    <input
                      type="time"
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      className="flex-1 p-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-600 text-sm">Closing:</label>
                    <input
                      type="time"
                      value={closingHours}
                      onChange={(e) => setClosingHours(e.target.value)}
                      className="flex-1 p-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200"
                    />
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => setShowTimeInput(false)}
                    className="self-end px-4 py-1 bg-blue-600 text-white text-sm rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100"
                onClick={() => setShowTimeInput(true)}
              >
                <span className={openingHours ? 'text-gray-800' : 'text-gray-400'}>
                  {openingHours ? formatBusinessHours() : 'Business Hours'}
                </span>
                <Clock size={20} className="text-gray-400" strokeWidth={1.5} />
              </div>
            )}
          </div>
        </div>
        
        {/* Address */}
        <div className="space-y-2">
          <label className="text-base font-medium text-gray-700">Store Address</label>
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your store address"
              className="w-full p-4 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="mt-auto p-4">
        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StoreInformationPage;