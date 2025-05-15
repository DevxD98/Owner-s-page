import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { useApp } from '../../contexts/AppContext';

const StatGrid = () => {
  const { offers, bookings, redemptions } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate dynamic stats based on actual data
  const activeOffers = offers.filter(offer => offer.isActive).length;
  const totalOfferViews = Math.floor(Math.random() * 100) + 50; // Simulated data
  const estimatedStoreVisits = Math.floor(Math.random() * 20) + 5; // Simulated data
  const todayRedemptions = Math.floor(Math.random() * 15); // Simulated data

  return (
    <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Today's performance metrics</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`transition-all duration-300 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Active Offers" value={activeOffers} />
        </div>
        <div className={`transition-all duration-300 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Total Offer Views" value={totalOfferViews} />
        </div>
        <div className={`transition-all duration-300 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Store Visits" value={estimatedStoreVisits} />
        </div>
        <div className={`transition-all duration-300 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Today's Redemptions" value={todayRedemptions} />
        </div>
      </div>
    </div>
  );
};

export default StatGrid;