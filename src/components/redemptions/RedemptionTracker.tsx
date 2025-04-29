import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import RedemptionItem from './RedemptionItem';

const RedemptionTracker = () => {
  const { redemptions, offers } = useApp();
  const navigate = useNavigate();

  const getOfferTitle = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    return offer?.title || '';
  };

  return (
    <div className="px-4 pb-6">
      <div 
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={() => navigate('/redemption-tracker')}
      >
        <h2 className="text-xl font-bold">Redemption Tracker</h2>
        <ChevronRight size={20} className="text-gray-500" />
      </div>

      <div className="space-y-4">
        {redemptions.slice(0, 3).map((redemption) => (
          <RedemptionItem
            key={redemption.id}
            id={redemption.id}
            customerName={redemption.customerName}
            date={redemption.date}
            status={redemption.status}
            offerId={redemption.offerId}
            offerTitle={getOfferTitle(redemption.offerId)}
          />
        ))}
      </div>
    </div>
  );
};

export default RedemptionTracker;