import React, { useState, useEffect } from 'react';
import { ChevronRight, Megaphone, Calendar, Eye } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

// Format date to show "Jun 10" format
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (error) {
    return 'Invalid date';
  }
};

// Example sponsored ads data with updated format for June 2025
const exampleAds = [
  {
    id: 'sponsored-1',
    title: 'Summer Special - 20% Off',
    description: 'Get 20% off on all summer collection. Limited time offer!',
    validTill: '2025-06-10T00:00:00.000Z',
    isActive: true,
    isDraft: false,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 1240,
    isSponsored: true,
    adType: 'image'
  },
  {
    id: 'sponsored-2',
    title: 'Weekend Coffee Deal',
    description: 'Buy one coffee, get one free every weekend. Valid at all our locations.',
    validTill: '2025-06-17T00:00:00.000Z',
    isActive: true, 
    isDraft: false,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 938,
    isSponsored: true,
    adType: 'image'
  }
];

// No badges needed as components - we'll use inline styling

const ActiveSponsoredAds = () => {
  const { sponsoredAds } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  // Use example ads if there are no real sponsored ads
  const activeAds = sponsoredAds && sponsoredAds.filter(ad => ad.isActive && !ad.isDraft).length > 0
    ? sponsoredAds.filter(ad => ad.isActive && !ad.isDraft).slice(0, 2)
    : exampleAds;

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
    <div className={`mt-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center py-3 cursor-pointer group"
        onClick={() => navigate('/my-ads')}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
            <Megaphone size={22} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Active Sponsored Ads</h2>
        </div>
        <ChevronRight size={24} className="text-gray-400 group-hover:text-purple-600 transition-all" />
      </div>

      <div className="space-y-3 mt-3">
        {activeAds.length > 0 ? (
          activeAds.map((ad, index) => (
            <div 
              key={ad.id || index} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              onClick={() => navigate('/my-ads')}
            >
              {/* Redesigned Ad Card */}
              <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                {/* Ad Image */}
                <div className="relative w-full h-28">
                  <img 
                    src={ad.imagePreview || ad.image} 
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Views Badge - Extremely compact like in My Ads page */}
                  <div className="absolute top-2 left-2">
                    <div className="px-1 py-0.25 text-[9px] font-medium rounded-md bg-white border border-gray-100 shadow-sm flex items-center">
                      <Eye size={10} className="mr-1 text-purple-500" />
                      <span className="text-gray-700" style={{ lineHeight: '1.2' }}>
                        {ad.views?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                  
                  {/* Active Status Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="px-1 py-0.25 text-[9px] font-medium rounded-md bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-500 border border-emerald-100 whitespace-nowrap shadow-sm" style={{ lineHeight: '1.2' }}>
                      Active
                    </div>
                  </div>
                </div>
                
                {/* Ad Content */}
                <div className="p-4">
                  {/* Title with Ad Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-800">{ad.title}</h3>
                    <div className="bg-purple-100 text-purple-700 px-2 py-0.5 text-[10px] rounded-md">
                      Ad
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4">{ad.description}</p>
                  
                  {/* Valid Till Date */}
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-orange-400" />
                    <span className="text-gray-700 text-sm">Valid: Undefined - {formatDate(ad.validTill)}</span>
                  </div>
                  
                  {/* Toggle button completely removed */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
              <Megaphone size={24} className="text-purple-500" />
            </div>
            <p className="text-gray-700 font-medium text-lg">No sponsored ads active</p>
            <p className="text-gray-500 text-sm mt-1">Create an ad to increase your visibility</p>
            <button 
              onClick={() => navigate('/ad-type-selection')} 
              className="mt-5 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors flex items-center mx-auto font-medium"
            >
              Create Sponsored Ad
            </button>
          </div>
        )}
        
        {activeAds.length > 0 && (
          <button 
            onClick={() => navigate('/my-ads')}
            className="w-full py-4 mt-4 bg-purple-50 rounded-xl text-center font-medium text-purple-600 flex items-center justify-center"
          >
            <span className="mr-2">View all ads</span>
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveSponsoredAds;