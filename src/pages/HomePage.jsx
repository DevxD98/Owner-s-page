import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationHeader from '../components/dashboard/LocationHeader';
import StatGrid from '../components/dashboard/StatGrid';
import RecentLiveOffers from '../components/offers/RecentLiveOffers';
import BookingStatusContainer from '../components/bookings/BookingStatusContainer';
import RedemptionTracker from '../components/redemptions/RedemptionTracker';
import ActiveSponsoredAds from '../components/ads/ActiveSponsoredAds';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [offerRefreshKey, setOfferRefreshKey] = useState(0);
  const location = useLocation();
  
  // Check if coming from publishing an offer
  useEffect(() => {
    if (location.state?.fromPublish) {
      console.log('Coming from offer publish, refreshing offers with timestamp:', location.state.timestamp);
      // Force refresh of the offers component with a new key
      setOfferRefreshKey(prev => prev + 1);
    }
  }, [location.state]);
  
  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-white relative`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced gradient overlay with longer fade effect */}
      <div style={{
        background: "linear-gradient(180deg, rgba(129,140,248,0.2) 0%, rgba(196,181,253,0.15) 30%, rgba(224,231,255,0.05) 70%, rgba(255,255,255,0) 100%)"
      }} className="absolute top-0 left-0 w-full h-36 z-0 pointer-events-none"></div>
      
      {/* Subtle animated light effect */}
      <div className="absolute top-0 left-0 w-full opacity-10 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-5 left-[10%] w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-10 right-[15%] w-24 h-24 bg-gradient-to-br from-purple-100/20 to-transparent rounded-full blur-xl animate-float-slow-reverse"></div>
      </div>
      
      <LocationHeader />
      <div className="max-w-screen-md mx-auto px-4 relative z-10">
        <StatGrid />
        <div className="mt-6 space-y-6 pb-16">
          {/* Use key to force re-render when offers change */}
          <div className="min-h-[250px]">
            <RecentLiveOffers 
              key={`recent-offers-${offerRefreshKey}`} 
              showSearch={false}
              showDetailedView={false}
              maxItems={2} /* Show 2 offers on home page instead of 3 */
              showHeader={true}
            />
          </div>
          <BookingStatusContainer showSearch={false} />
          <RedemptionTracker showSearch={false} />
          <ActiveSponsoredAds />
        </div>
      </div>
    </div>
  );
};

export default HomePage;