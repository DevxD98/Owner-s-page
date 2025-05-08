import React from 'react';
import { Pencil, ChevronRight, User, Clock, HelpCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      <div className="w-full">
        {/* Profile Header */}
        <div className="bg-blue-700 w-full p-6 pb-8">
          <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
          
          <div className="bg-blue-700 w-full rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mr-3">
                <img src="https://via.placeholder.com/56" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-white">
                <h2 className="font-medium text-lg">xyx</h2>
                <p className="text-sm text-gray-200">@xyz</p>
              </div>
            </div>
            <button className="text-white">
              <Pencil size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="w-full bg-white mt-2">
          {/* Store Information */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Location & Branch</h3>
                <p className="text-sm text-gray-400">View all previous coupons</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Switch To User Account */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-400">Manage app settings</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Help & Support */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="flex items-center justify-between p-4">
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

        {/* Footer Links */}
        <div className="w-full p-4 mt-2 mb-20">
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-gray-600 font-medium">FAQs</a>
            <a href="#" className="text-gray-600 font-medium">ABOUT US</a>
            <a href="#" className="text-gray-600 font-medium">TERMS OF USE</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;