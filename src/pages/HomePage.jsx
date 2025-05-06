import React from 'react';
import LocationHeader from '../components/dashboard/LocationHeader';
import StatGrid from '../components/dashboard/StatGrid';
import OfferManagement from '../components/offers/OfferManagement';
import BookingStatusContainer from '../components/bookings/BookingStatusContainer';
import RedemptionTracker from '../components/redemptions/RedemptionTracker';

const HomePage = () => {
  return (
    <div className="pb-4">
      <LocationHeader />
      <StatGrid />
      <OfferManagement />
      <BookingStatusContainer />
      <RedemptionTracker />
    </div>
  );
};

export default HomePage;