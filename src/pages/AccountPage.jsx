import React from 'react';
import { Pencil, ChevronRight, User, Clock, HelpCircle, Info, Bell, Settings, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/layout/BottomNavigation';
import { useApp } from '../contexts/AppContext';
import { clearAllStoredData } from '../utils/localStorageHelper.js';

const AccountPage = () => {
  const navigate = useNavigate();
  const { storeName, storeLogo, setStoreName } = useApp();
  
  // Handle logout - clear local storage and reset app state
  const handleLogout = () => {
    // Clear all stored data
    clearAllStoredData();
    
    // Reset the store name in context (which will redirect to create-account page)
    setStoreName('');
    
    // Navigate to create account page
    navigate('/create-account');
  };
  
  // Get initials for the fallback logo
  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen pb-20">
      <div className="w-full max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-100 w-full p-4 pb-0">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          
          <div className="bg-blue-700 w-full rounded-xl p-4 flex items-center justify-between relative">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden mr-3">
                {storeLogo ? (
                  <img src={storeLogo} alt="Store Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(storeName)}
                  </div>
                )}
              </div>
              <div className="text-white">
                <h2 className="font-medium text-lg">{storeName || 'Your Store'}</h2>
                <p className="text-sm text-white opacity-80">{storeName ? `@${storeName.toLowerCase().replace(/\s+/g, '')}` : 'Add store information'}</p>
              </div>
            </div>
            <button 
              className="text-white" 
              onClick={() => navigate('/store-information')}
            >
              <Pencil size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="w-full bg-white mt-4">
          {/* Store Information */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/store-information')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Store Information</h3>
                <p className="text-sm text-gray-400">Make changes to your account</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Location & Branch */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/location-branch')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Location & Branch</h3>
                <p className="text-sm text-gray-400">Manage store location details</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Switch To User Account */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/switch-account')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Switch To User Account</h3>
                <p className="text-sm text-gray-400">Create Business Account</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Timing & Availability */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/timing-availability')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Timing & Availability</h3>
                <p className="text-sm text-gray-400">Further secure your account for safety</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Settings */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/settings')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Settings size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-400">Manage app settings</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Help & Support */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('/help-support')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <HelpCircle size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Help & Support</h3>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* About App */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => navigate('/about-app')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Info size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">About App</h3>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Create Account Button */}
        <div className="w-full p-4 mt-4">
          <button 
            onClick={() => navigate('/create-account')} 
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium text-lg flex items-center justify-center"
          >
            <UserPlus size={20} className="mr-2" />
            Create New Account
          </button>
        </div>
        
        {/* Logout Button */}
        <div className="w-full px-4">
          <button 
            onClick={handleLogout} 
            className="w-full border border-red-500 text-red-600 py-3 rounded-lg font-medium text-lg flex items-center justify-center mt-2 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
        
        {/* Footer Links */}
        <div className="w-full p-4">
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-600 font-medium">FAQs</a>
            <a href="#" className="text-gray-600 font-medium">ABOUT US</a>
            <a href="#" className="text-gray-600 font-medium">TERMS OF USE</a>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AccountPage;