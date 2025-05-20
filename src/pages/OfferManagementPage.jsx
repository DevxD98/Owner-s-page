import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OfferManagement from '../components/offers/OfferManagement';

const OfferManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-3 sm:p-4 pb-20 max-w-4xl mx-auto">
      <div className="flex items-center mb-4 md:mb-6">
        <button onClick={() => navigate(-1)} className="mr-2 p-1 rounded-full hover:bg-gray-100">
          <ArrowLeft size={18} className="sm:size-20" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold">Recent Live Offers</h1>
      </div>

      <OfferManagement showSearch={true} showAllItems={true} showBoostButtons={true} />
    </div>
  );
};

export default OfferManagementPage;