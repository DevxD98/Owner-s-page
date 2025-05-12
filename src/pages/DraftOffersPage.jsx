import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const DraftOffersPage = () => {
  const navigate = useNavigate();
  const { draftOffers, addOffer } = useApp();

  const handleEdit = (offerId) => {
    navigate(`/create-offer?id=${offerId}&draft=true`);
  };

  const handlePublish = (offerId) => {
    // Find the draft offer by ID
    const draftToPublish = draftOffers.find(offer => offer.id === offerId);
    
    if (draftToPublish) {
      // Add the draft offer to the published offers
      addOffer(draftToPublish);
      // Navigate to the published offers page
      navigate('/my-ads');
    }
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">View Your Saved Draft Offers</h1>
      </div>

      {/* Draft Offers List */}
      <div className="p-4 space-y-4">
        {draftOffers && draftOffers.length > 0 ? (
          draftOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="font-semibold text-lg">{offer.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Last edited: {offer.lastEdited || 'May 9'}</p>
              
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => handleEdit(offer.id)}
                  className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handlePublish(offer.id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
                >
                  Publish
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No draft offers saved yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftOffersPage;