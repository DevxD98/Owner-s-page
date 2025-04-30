import React from 'react';
import LocationHeader from '../components/dashboard/LocationHeader';
import StatGrid from '../components/dashboard/StatGrid';
import OfferManagement from '../components/offers/OfferManagement';
import RedemptionTracker from '../components/redemptions/RedemptionTracker';

const HomePage = () => {
  return (
    <div className="pb-4">
      <LocationHeader />
      <StatGrid />
      <OfferManagement />
      <RedemptionTracker />
    </div>
  );
};

export default HomePage;