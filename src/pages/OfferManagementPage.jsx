import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecentLiveOffers from '../components/offers/RecentLiveOffers';

const OfferManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Header with fixed padding - improved for mobile */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md mr-3">
            <Sparkles size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Offer Management</h1>
        </div>
      </div>

      {/* Full-width content with improved mobile support */}
      <div className="px-2 sm:px-4 mt-2">
        <RecentLiveOffers 
          showSearch={true} 
          showDetailedView={true} 
          showBoostButton={true} 
          maxItems={50} 
          showHeader={false} // Hide the header since we have it in the page
        />
      </div>
    </div>
  );
};

export default OfferManagementPage;