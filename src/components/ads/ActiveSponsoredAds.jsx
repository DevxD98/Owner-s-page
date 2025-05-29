import React, { useState, useEffect } from 'react';
import { ChevronRight, Megaphone } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import OfferItem from '../offers/OfferItem';

const ActiveSponsoredAds = () => {
  const { sponsoredAds } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  // Filter active sponsored ads
  const activeAds = sponsoredAds 
    ? sponsoredAds.filter(ad => ad.isActive && !ad.isDraft).slice(0, 2)
    : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Slightly delayed animation after other components
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && activeAds.length > 0) {
      const timers = [];
      
      activeAds.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, activeAds]);

  return (
    <div className={`mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center py-3 cursor-pointer group"
        onClick={() => navigate('/my-ads')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <Megaphone size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Active Sponsored Ads</h2>
        </div>
        <ChevronRight size={20} className="text-gray-500 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all" />
      </div>

      <div className="space-y-4 mt-2">
        {activeAds.length > 0 ? (
          activeAds.map((ad, index) => (
            <div 
              key={ad.id || index} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="relative">
                <OfferItem
                  id={ad.id}
                  title={ad.title}
                  validTill={ad.validTill}
                  isActive={ad.isActive}
                  description={ad.description}
                  image={ad.imagePreview || ad.image}
                />
                <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                  Sponsored
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Megaphone size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No sponsored ads active</p>
            <p className="text-gray-400 text-sm mt-1">Sponsored ads will appear here</p>          <button 
            onClick={() => navigate('/sponsored-ads')} 
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center mx-auto"
          >
            Create Sponsored Ad
          </button>
          </div>
        )}
        
        {activeAds.length > 0 && (
          <button 
            onClick={() => navigate('/my-ads')}
            className="w-full py-2 mt-2 text-purple-600 bg-purple-50 rounded-lg text-center font-medium transition-colors hover:bg-purple-100"
          >
            Manage sponsored ads
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveSponsoredAds;