import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OfferManagement from '../components/offers/OfferManagement';

const OfferManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Recent Live Offers</h1>
      </div>

      <OfferManagement showSearch={true} showAllItems={true} showBoostButtons={true} />
    </div>
  );
};

export default OfferManagementPage;