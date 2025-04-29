import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import OfferItem from '../components/offers/OfferItem';

const MyAdsPage = () => {
  const navigate = useNavigate();
  const { offers } = useApp();

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Ads</h1>
      </div>

      <div className="space-y-4 mt-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <OfferItem
              key={offer.id}
              id={offer.id}
              title={offer.title}
              validTill={offer.validTill}
              isActive={offer.isActive}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No ads created yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdsPage;