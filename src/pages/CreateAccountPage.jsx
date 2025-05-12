import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PhoneInput from '../components/inputs/PhoneInput';
import { validateEmail } from '../utils/emailValidation';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { setStoreName, setStoreCategory, setStoreAddress, setStoreLogo, setStoreImage, setStorePhone, setStoreHours, setStoreEmail } = useApp();
  
  const [formData, setFormData] = useState({
    storeName: '',
    category: '',
    address: '',
    storeImage: null,
    storeLogo: null,
    phoneNumber: '',
    openingHours: '',
    email: '',
    agreeToTerms: false
  });
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
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

    // Update context with store information
    setStoreName(formData.storeName);
    setStoreCategory && setStoreCategory(formData.category);
    setStoreAddress && setStoreAddress(formData.address);
    setStorePhone && setStorePhone(formData.phoneNumber);
    setStoreHours && setStoreHours(formData.openingHours);
    setStoreEmail && setStoreEmail(formData.email);
    
    // Handle image files if needed
    if (formData.storeImage && setStoreImage) {
      // In a real app, you would upload the image to a server
      // and then set the URL in the context
      setStoreImage(storeImagePreview);
    }
    
    if (formData.storeLogo && setStoreLogo) {
      // In a real app, you would upload the logo to a server
      // and then set the URL in the context
      setStoreLogo(storeLogoPreview);
    }

    // Navigate to home page after successful account creation
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Get Started</h1>
          <p className="text-gray-600">by creating a free account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Store Name */}
          <div className="relative">
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Store Name"
              className="w-full p-4 bg-gray-100 rounded-lg pl-4 pr-10"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <div 
              className="w-full p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className={formData.category ? 'text-black' : 'text-gray-400'}>
                {formData.category || 'Select store category'}
              </span>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </div>
            </div>
            
            {/* Category Dropdown Menu */}
            {showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {categories.map((category) => (
                  <div 
                    key={category} 
                    className="p-3 hover:bg-gray-100 cursor-pointer"
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
            )}
          </div>

          {/* Address & Location */}
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address & Location Pin"
              className="w-full p-4 bg-gray-100 rounded-lg pl-4 pr-10"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>

          {/* Upload Store Image */}
          <div className="relative">
            <input
              type="file"
              id="storeImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'storeImage')}
            />
            <label
              htmlFor="storeImage"
              className="w-full p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
            >
              <span className="text-gray-500">{formData.storeImage ? formData.storeImage.name : 'Upload Store Image'}</span>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </label>
          </div>

          {/* Upload Store Logo */}
          <div className="relative">
            <input
              type="file"
              id="storeLogo"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'storeLogo')}
            />
            <label
              htmlFor="storeLogo"
              className="w-full p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
            >
              <span className="text-gray-500">{formData.storeLogo ? formData.storeLogo.name : 'Upload Store Logo'}</span>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
            </label>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <PhoneInput
              value={formData.phoneNumber}
              onChange={(value) => setFormData({...formData, phoneNumber: value})}
              placeholder="Phone number"
              required
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={`w-full p-4 bg-gray-100 rounded-lg pl-4 pr-10 ${emailError ? 'border border-red-500' : ''}`}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          
          {/* Opening Hours */}
          <div className="relative">
            <input
              type="time"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleInputChange}
              placeholder="Opening Hours"
              className="w-full p-4 bg-gray-100 rounded-lg"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm">
              By checking the box you agree to our{' '}
              <span className="text-red-500">Terms</span> and{' '}
              <span className="text-red-500">Conditions</span>.
            </label>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p>
            Already a member?{' '}
            <span className="font-bold cursor-pointer" onClick={() => navigate('/login')}>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;