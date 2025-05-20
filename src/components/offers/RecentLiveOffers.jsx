import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Plus, Search, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import OfferItem from './OfferItem';

// Add showSearch prop with default value of false
const RecentLiveOffers = ({ showSearch = false }) => {
  const { offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Log the offers when component mounts or offers change
  useEffect(() => {
    console.log('RecentLiveOffers - Current Offers:', offers);
  }, [offers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && offers && offers.length > 0) {
      const timers = [];
      const displayOffers = getFilteredOffers().slice(0, 2); // Display only 2 items
      
      displayOffers.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, offers, filter, searchTerm]);

  // Filter out draft offers and apply search/filters
  const getFilteredOffers = () => {
    let filtered = offers ? offers.filter(offer => !offer.isDraft) : [];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(offer => 
        filter === 'active' ? offer.isActive : !offer.isActive
      );
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(term)) ||
        (offer.description && offer.description.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  };
  
  const publishedOffers = getFilteredOffers();

  return (
    <div className={`mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center mb-4"
      >
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/offer-management')}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Recent Live Offers</h2>
          <ChevronRight size={20} className="ml-2 text-gray-500 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Only show search and filters if showSearch prop is true */}
      {showSearch && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search offers..."
                className="pl-10 w-full p-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 shadow-sm"
            >
              <Filter size={18} className={showFilters ? "text-amber-600" : "text-gray-500"} />
            </button>
          </div>
          
          {showFilters && (
            <div className="flex space-x-2 overflow-x-auto pb-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'all' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                All Offers
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'active' 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'inactive' 
                  ? 'bg-gray-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Inactive
              </button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {publishedOffers.length > 0 ? (
          publishedOffers.slice(0, 2).map((offer, index) => (
            <div 
              key={offer.id || index} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Use actual views data if available, or default to 230 as shown in the mockup */}
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
            <p className="text-gray-600 font-medium">
              {searchTerm || filter !== 'all' ? 'No matching offers found' : 'No active offers yet'}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first offer to engage customers'}
            </p>
            {!searchTerm && filter === 'all' && (
              <button 
                onClick={() => navigate('/create-offer')} 
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center mx-auto"
              >
                <Plus size={16} className="mr-1" />
                Create Offer
              </button>
            )}
          </div>
        )}
        
        {publishedOffers.length > 3 && !showAllItems && (
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

export default RecentLiveOffers;
