import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Plus } from 'lucide-react';
import OfferItem from './OfferItem';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const OfferManagement = () => {
  const { offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  // Log the offers when component mounts or offers change
  useEffect(() => {
    console.log('OfferManagement - Current Offers:', offers);
  }, [offers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && offers && offers.length > 0) {
      // Reset loaded items when offers change
      setLoadedItems([]);
      
      const timers = [];
      // Get the latest offers (sorted by ID in descending order)
      const sortedOffers = [...offers]
        .filter(offer => !offer.isDraft)
        .sort((a, b) => b.id - a.id);
      const displayOffers = sortedOffers.slice(0, 2);
      
      displayOffers.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, offers]);

  // Filter out draft offers and sort by newest first (latest created first)
  const publishedOffers = offers
    .filter(offer => !offer.isDraft)
    .sort((a, b) => b.id - a.id); // Sort by id in descending order to show newest first

  return (
    <div className={`mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer group"
        onClick={() => navigate('/offer-management')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Recent Live Offers</h2>
        </div>
        <div className="flex items-center text-gray-500 group-hover:text-amber-600 transition-colors">
          <span className="text-sm mr-1">View All</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="space-y-4">
        {publishedOffers.length > 0 ? (
          // Always show the most recent 2 offers
          publishedOffers.slice(0, 2).map((offer, index) => (
            <div 
              key={offer.id || index} // Add index as fallback for key
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Hide boost button on homepage */}
              <OfferItem
                id={offer.id}
                title={offer.title}
                validTill={offer.validTill}
                isActive={offer.isActive}
                description={offer.description}
                image={offer.imagePreview || offer.image}
                views={offer.views || 230}
                showBoostButton={false}
                type={offer.type}
                startTime={offer.startTime}
                endTime={offer.endTime}
                validityDate={offer.validityDate}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No active offers yet</p>
            <p className="text-gray-500 text-sm mt-1">Create your first offer to engage customers</p>
            <button 
              onClick={() => navigate('/create-offer')} 
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center mx-auto"
            >
              <Plus size={16} className="mr-1" />
              Create Offer
            </button>
          </div>
        )}
        
        {publishedOffers.length > 3 && (
          <button 
            onClick={() => navigate('/offer-management')}
            className="w-full py-2 mt-4 text-amber-600 bg-amber-50 rounded-lg text-center font-medium transition-colors hover:bg-amber-100"
          >
            View all ({publishedOffers.length}) offers
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferManagement;