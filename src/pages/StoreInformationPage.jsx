import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
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
    setStoreName, 
    setStoreCategory,
    setStorePhone,
    setStoreEmail,
    setStoreAddress,
  } = useApp();

  const [storeName, setStoreNameLocal] = useState(contextStoreName || '');
  const [storeCategory, setStoreCategoryLocal] = useState(contextStoreCategory || '');
  const [mobileNumber, setMobileNumber] = useState(contextStorePhone || '');
  const [email, setEmail] = useState(contextStoreEmail || '');
  const [address, setAddress] = useState(contextStoreAddress || '');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [emailError, setEmailError] = useState('');

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
      <div className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Store Information</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Store Name */}
        <div className="space-y-2">
          <label className="text-base font-medium">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreNameLocal(e.target.value)}
            placeholder="Enter your store name"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Store Category */}
        <div className="space-y-2 relative">
          <label className="text-base font-medium">Store Category</label>
          <div 
            className="w-full p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <span className={storeCategory ? 'text-black' : 'text-gray-400'}>
              {storeCategory || 'Select store category'}
            </span>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
          
          {/* Dropdown */}
          {showCategoryDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {categories.map((category) => (
                <div 
                  key={category} 
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label className="text-base font-medium">Mobile Number</label>
          <PhoneInput
            value={mobileNumber}
            onChange={setMobileNumber}
            placeholder="Phone number"
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-base font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={`w-full p-4 bg-gray-100 rounded-lg ${emailError ? 'border border-red-500' : ''}`}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        
        {/* Address */}
        <div className="space-y-2">
          <label className="text-base font-medium">Store Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your store address"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="mt-auto p-4">
        <button 
          onClick={handleSave}
          className="w-full bg-blue-700 text-white py-4 rounded-lg font-medium text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StoreInformationPage;