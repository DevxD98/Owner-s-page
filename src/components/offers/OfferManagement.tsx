import React from 'react';
import { ChevronRight } from 'lucide-react';
import OfferItem from './OfferItem';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const OfferManagement = () => {
  const { offers } = useApp();
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-6">
      <div 
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={() => navigate('/offer-management')}
      >
        <h2 className="text-xl font-bold">Offer Management</h2>
        <ChevronRight size={20} className="text-gray-500" />
      </div>

      <div className="space-y-4">
        {offers.slice(0, 3).map((offer) => (
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

export default OfferManagement;