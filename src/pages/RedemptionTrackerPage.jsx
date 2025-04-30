import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import RedemptionItem from '../components/redemptions/RedemptionItem';

const RedemptionTrackerPage = () => {
  const navigate = useNavigate();
  const { redemptions, offers } = useApp();

  const getOfferTitle = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    return offer?.title || '';
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Redemption Tracker</h1>
      </div>

      <div className="space-y-4">
        {redemptions.map((redemption) => (
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

export default RedemptionTrackerPage;