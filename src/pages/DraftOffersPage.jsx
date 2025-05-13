import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import OfferItem from '../components/offers/OfferItem';

const DraftOffersPage = () => {
  const navigate = useNavigate();
  const { offers } = useApp();
  
  // Filter only draft offers
  const draftOffers = offers.filter(offer => offer.isDraft);

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Saved Draft Offers</h1>
      </div>

      <div className="space-y-4">
        {draftOffers.length > 0 ? (
          draftOffers.map((offer) => (
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
            <p>No draft offers saved yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftOffersPage;