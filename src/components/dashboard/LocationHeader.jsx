// filepath: /Users/devmondal/Downloads/project 10/src/components/dashboard/LocationHeader.jsx
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, HelpCircle } from 'lucide-react';

const LocationHeader = () => {
  // Get store information from context
  const { storeName, storeLogo } = useApp();
  const navigate = useNavigate();
  
  // Get initials for the fallback logo
  const getInitials = (name) => {
    if (!name) return 'MS';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div style={{
      background: "linear-gradient(180deg, rgba(129,140,248,0.7) 0%, rgba(167,139,250,0.45) 50%, rgba(191,219,254,0.25) 100%)"
    }} className="py-4 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-[-20px] left-[-30px] w-80 h-40 rounded-full bg-indigo-300 animate-pulse-slow"></div>
        <div className="absolute bottom-[-80px] right-[-40px] w-60 h-60 rounded-full bg-blue-300 animate-pulse-slow"></div>
        <div className="absolute top-[40%] right-[20%] w-10 h-10 rounded-full bg-purple-300 opacity-30 animate-float"></div>
      </div>
      {/* Enhanced gradient fadeout at bottom - taller for more fade effect */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
      
      <div className="max-w-screen-md mx-auto flex items-center justify-between relative z-10">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => navigate('/store')}
        >
          {storeLogo ? (
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-white transition-all transform group-hover:scale-105 group-hover:shadow-lg">
              <img src={storeLogo} alt="Store Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white transition-all transform group-hover:scale-105 group-hover:shadow-lg">
              {getInitials(storeName)}
            </div>
          )}
          <div className="ml-3">
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight group-hover:text-indigo-800 transition-colors">
              {storeName || 'My Store'}
            </h2>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">Merchant Dashboard</span>
            </div>
          </div>
        </div>
        
        <button 
          className="relative p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md"
          onClick={() => navigate('/account')}
        >
          <HelpCircle size={20} className="text-gray-600" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </div>
  );
};

export default LocationHeader;
