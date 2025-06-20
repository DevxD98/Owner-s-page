import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PhoneInput from '../components/inputs/PhoneInput';
import { validateEmail } from '../utils/emailValidation.js';
import { Clock, Calendar, User, MapPin, Image, Upload, ChevronDown } from 'lucide-react';
// Import our local storage helper - this file is ignored by git
import { saveAccountInfo, loadAccountInfo } from '../utils/localStorageHelper.js';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const appContext = useApp();
  
  const [formData, setFormData] = useState({
    storeName: '',
    category: '',
    address: '',
    storeImage: null,
    storeLogo: null,
    phoneNumber: '+91',
    openingHours: '',
    closingHours: '',
    email: '',
    agreeToTerms: false
  });
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);
  
  // Available store categories
  const categories = [
    'Restaurant',
    'Salon',
    'Retail',
    'Cafe',
    'Gym',
    'Spa',
    'Electronics',
    'Fashion',
    'Grocery',
    'Bakery',
    'Pharmacy',
    'Other'
  ];
  
  const [emailError, setEmailError] = useState('');
  const [storeImagePreview, setStoreImagePreview] = useState(null);
  const [storeLogoPreview, setStoreLogoPreview] = useState(null);

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
    if (!formData.openingHours) return 'Business Hours';
    
    const opening = formatTimeDisplay(formData.openingHours);
    const closing = formData.closingHours ? formatTimeDisplay(formData.closingHours) : '';
    
    if (closing) {
      return `${opening} - ${closing}`;
    }
    return opening;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (type === 'storeImage') {
        setFormData({
          ...formData,
          storeImage: file
        });
        setStoreImagePreview(URL.createObjectURL(file));
      } else if (type === 'storeLogo') {
        setFormData({
          ...formData,
          storeLogo: file
        });
        setStoreLogoPreview(URL.createObjectURL(file));
      }
    }
  };

  // Validate email when it changes
  useEffect(() => {
    if (formData.email) {
      const validation = validateEmail(formData.email);
      setEmailError(validation.isValid ? '' : validation.message);
    } else {
      setEmailError('');
    }
  }, [formData.email]);

  // Check if account already exists when component mounts
  useEffect(() => {
    const accountInfo = loadAccountInfo();
    if (accountInfo && accountInfo.hasAccount) {
      // If account exists, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    
    // Validate email before submitting
    if (formData.email) {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        setEmailError(emailValidation.message);
        return;
      }
    }

    // Update context with store information safely
    if (appContext) {
      if (appContext.setStoreName) appContext.setStoreName(formData.storeName);
      if (appContext.setStoreCategory) appContext.setStoreCategory(formData.category);
      if (appContext.setStoreAddress) appContext.setStoreAddress(formData.address);
      if (appContext.setStorePhone) appContext.setStorePhone(formData.phoneNumber);
      
      // Combine opening and closing hours
      const businessHours = formData.closingHours 
        ? `${formatTimeDisplay(formData.openingHours)} - ${formatTimeDisplay(formData.closingHours)}`
        : formatTimeDisplay(formData.openingHours);
      
      if (appContext.setStoreHours) appContext.setStoreHours(businessHours);
      if (appContext.setStoreEmail) appContext.setStoreEmail(formData.email);
      
      // Handle image files if needed
      if (formData.storeImage && appContext.setStoreImage) {
        appContext.setStoreImage(storeImagePreview);
      }
      
      if (formData.storeLogo && appContext.setStoreLogo) {
        appContext.setStoreLogo(storeLogoPreview);
      }
    }
    
    // Save account creation status to local storage
    saveAccountInfo({ 
      hasAccount: true,
      isVerified: false, // Account is created but not verified
      createdAt: new Date().toISOString(),
      storeName: formData.storeName // Add store name directly to local storage
    });

    // Save account information to local storage
    saveAccountInfo(formData);

    // Use setTimeout to ensure state updates have completed before navigation
    setTimeout(() => {
      // Navigate to verification page instead of home page
      navigate('/verification');
    }, 100);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b from-blue-50 to-white min-h-screen p-4">
      <div className="w-full max-w-md mx-auto my-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 text-gray-800 tracking-tight">Get Started</h1>
          <p className="text-gray-600 text-lg">by creating a free account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Store Name */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Store Name"
              className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <User size={20} strokeWidth={1.5} />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <div 
              className="w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className={formData.category ? 'text-gray-800' : 'text-gray-400'}>
                {formData.category || 'Category'}
              </span>
              <div className="text-gray-400">
                <ChevronDown size={20} strokeWidth={1.5} />
              </div>
            </div>

            {/* Category Dropdown Menu - Positioned directly below the input field */}
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
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: category
                        });
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Address & Location */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address & Location Pin"
              className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <MapPin size={20} strokeWidth={1.5} />
            </div>
          </div>

          {/* Upload Store Image */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="file"
              id="storeImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'storeImage')}
            />
            <label
              htmlFor="storeImage"
              className="w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100"
            >
              <span className="text-gray-500">{formData.storeImage ? formData.storeImage.name : 'Upload Store Image'}</span>
              <div className="text-gray-400">
                <Image size={20} strokeWidth={1.5} />
              </div>
            </label>
            {storeImagePreview && (
              <div className="mt-2 p-2">
                <img src={storeImagePreview} alt="Store Preview" className="h-20 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Upload Store Logo */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="file"
              id="storeLogo"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'storeLogo')}
            />
            <label
              htmlFor="storeLogo"
              className="w-full p-4 bg-transparent rounded-xl flex justify-between items-center cursor-pointer border border-gray-100"
            >
              <span className="text-gray-500">{formData.storeLogo ? formData.storeLogo.name : 'Upload Store Logo'}</span>
              <div className="text-gray-400">
                <Upload size={20} strokeWidth={1.5} />
              </div>
            </label>
            {storeLogoPreview && (
              <div className="mt-2 p-2">
                <img src={storeLogoPreview} alt="Logo Preview" className="h-16 w-16 object-cover rounded-full mx-auto border-2 border-gray-200" />
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <PhoneInput
              value={formData.phoneNumber}
              onChange={(value) => setFormData({...formData, phoneNumber: value})}
              placeholder="Phone number"
              required
              className="border border-gray-100"
            />
          </div>

          {/* Business Hours */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {showTimeInput ? (
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-600 text-sm">Opening:</label>
                    <input
                      type="time"
                      name="openingHours"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                      className="flex-1 p-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-600 text-sm">Closing:</label>
                    <input
                      type="time"
                      name="closingHours"
                      value={formData.closingHours}
                      onChange={handleInputChange}
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
                <span className={formData.openingHours ? 'text-gray-800' : 'text-gray-400'}>
                  {formData.openingHours ? formatBusinessHours() : 'Business Hours'}
                </span>
                <div className="text-gray-400">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
              </div>
            )}
          </div>

          {/* Email Address */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-300 border-red-200' : 'focus:ring-blue-300 border border-gray-100'}`}
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1 px-2">{emailError}</p>}
          </div>
          
          {/* Terms and Conditions */}
          <div className="flex items-center py-2">
            <input
              type="checkbox"
              id="terms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 mr-3"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              By checking the box you agree to our{' '}
              <a href="#" className="text-red-500 font-medium">Terms</a> and{' '}
              <a href="#" className="text-red-500 font-medium">Conditions</a>.
            </label>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg mt-4"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-600">
            Already a member?{' '}
            <span className="font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;