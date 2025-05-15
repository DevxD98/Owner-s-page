import React, { useState, useEffect } from 'react';
import LocationHeader from '../components/dashboard/LocationHeader';
import StatGrid from '../components/dashboard/StatGrid';
import OfferManagement from '../components/offers/OfferManagement';
import BookingStatusContainer from '../components/bookings/BookingStatusContainer';
import RedemptionTracker from '../components/redemptions/RedemptionTracker';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`pb-4 bg-gradient-to-b from-gray-50 to-white transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed'
      }}
    >
      <LocationHeader />
      <div className="max-w-screen-md mx-auto px-4">
        <StatGrid />
        <div className="mt-6 space-y-6">
          <OfferManagement />
          <BookingStatusContainer />
          <RedemptionTracker />
        </div>
        
        {/* Footer section */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Merchant Dashboard</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Help</a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Privacy</a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;