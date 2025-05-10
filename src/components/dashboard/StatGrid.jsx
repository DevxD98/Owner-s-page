import React from 'react';
import StatCard from './StatCard';
import { useApp } from '../../contexts/AppContext';

const StatGrid = () => {
  const { offers, bookings, redemptions } = useApp();
  
  // Calculate dynamic stats based on actual data
  const activeOffers = offers.filter(offer => offer.isActive).length;
  const totalOfferViews = 0; // This would be tracked separately in a real app
  const estimatedStoreVisits = 0; // This would be tracked separately in a real app
  const todayRedemptions = 0; // This would need date filtering in a real app

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <StatCard title="Active offer" value={activeOffers} />
      <StatCard title="Total offer view today" value={totalOfferViews} />
      <StatCard title="Estimated Store Visits" value={estimatedStoreVisits} />
      <StatCard title="Today redemption" value={todayRedemptions} />
    </div>
  );
};

export default StatGrid;