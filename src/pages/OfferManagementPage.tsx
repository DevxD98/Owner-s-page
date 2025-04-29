import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OfferItem from '../components/offers/OfferItem';
import { useApp } from '../contexts/AppContext';

const OfferManagementPage = () => {
  const navigate = useNavigate();
  const { offers } = useApp();

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Offer Management</h1>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <OfferItem
            key={offer.id}
            id={offer.id}
            title={offer.title}
            validTill={offer.validTill}
            isActive={offer.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferManagementPage;