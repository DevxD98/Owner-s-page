import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OfferItem from '../components/offers/OfferItem';
import { useApp } from '../contexts/AppContext';

const OfferManagementPage = () => {
  const navigate = useNavigate();
  const { offers } = useApp();

  // Filter out draft offers and sort by newest first
  const publishedOffers = offers
    .filter(offer => !offer.isDraft)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Recent Live Offers</h1>
      </div>

      <div className="space-y-4">
        {publishedOffers.length > 0 ? (
          publishedOffers.map((offer) => (
            <OfferItem
              key={offer.id}
              id={offer.id}
              title={offer.title}
              validTill={offer.validTill}
              isActive={offer.isActive}
            />
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No offers published yet</p>
            <p className="text-gray-500 text-sm mt-1">Create offers to attract customers</p>
            <button 
              onClick={() => navigate('/create-offer')} 
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Create Offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferManagementPage;