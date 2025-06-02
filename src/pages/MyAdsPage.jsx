import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import OfferItem from '../components/offers/OfferItem';

const MyAdsPage = () => {
  const navigate = useNavigate();
  const { sponsoredAds } = useApp();
  
  // Filter out draft sponsored ads
  const activeAds = sponsoredAds.filter(ad => !ad.isDraft);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Ads</h1>
      </div>

      <div className="space-y-4 mt-6">
        {activeAds.length > 0 ? (
          activeAds.map((ad) => (
            <OfferItem
              key={ad.id}
              id={ad.id}
              title={ad.title}
              validTill={ad.validTill}
              isActive={ad.isActive}
              isSponsored={true}
            />
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 14v1" />
                <path d="M9 19v2" />
                <path d="M15 14v1" />
                <path d="M15 19v2" />
                <path d="M9 3V1" />
                <path d="M15 3V1" />
                <path d="M21 9H3" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No ads created yet</p>
            <p className="text-gray-500 text-sm mt-1">Create sponsored ads to boost your visibility</p>
            <button 
              onClick={() => navigate('/ad-type-selection')} 
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create Ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdsPage;