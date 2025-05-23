import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecentLiveOffers from '../components/offers/RecentLiveOffers';

const OfferManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-20 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Recent Live Offers</h1>
      </div>

      <RecentLiveOffers 
        showSearch={true} 
        showDetailedView={true} 
        maxItems={50} // Show a large number of offers by default
      />
    </div>
  );
};

export default OfferManagementPage;