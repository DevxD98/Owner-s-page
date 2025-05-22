import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Plus, Search, Filter } from 'lucide-react';
import OfferItem from './OfferItem';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

// Add props with default values
const OfferManagement = ({ 
  showSearch = false, 
  showAllItems = false, 
  showBoostButtons = false,
  showDetailedInfo = showAllItems // By default, only show detailed info on the full page view
}) => {
  const { offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add a key to force refresh

  // Log the offers when component mounts or offers change
  useEffect(() => {
    console.log('OfferManagement - Current Offers:', offers);
    
    // Reset the loadedItems state to trigger re-animation
    setLoadedItems([]);
    
    // Log offers IDs to verify correct sorting
    if (offers && offers.length > 0) {
      console.log('OfferManagement - Offer IDs:', offers.map(o => o.id));
      console.log('OfferManagement - Non-draft offers:', offers.filter(o => !o.isDraft).length);
    }
    
    // Force a refresh whenever offers change
    setRefreshKey(prev => prev + 1);
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
      const displayOffers = getFilteredOffers();
      const limitedOffers = showAllItems ? displayOffers : displayOffers.slice(0, 2);
      
      console.log(`OfferManagement - Displaying ${limitedOffers.length} offers out of ${displayOffers.length} total`);
      
      limitedOffers.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 50 + 100); // Faster animation
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, offers, filter, typeFilter, searchTerm, showAllItems, refreshKey]);

  // Filter and sort offers
  const getFilteredOffers = () => {
    // Debug the offers array first
    console.log('OfferManagement - Original offers in getFilteredOffers:', offers);
    
    if (!offers || !Array.isArray(offers)) {
      console.error('OfferManagement - Offers is not a valid array:', offers);
      return [];
    }
    
    // Make sure to check if offers is defined and handle each offer having required properties
    let filtered = offers.filter(offer => {
      const isDraftValid = offer && typeof offer.isDraft !== 'undefined';
      // Debug any problematic offers
      if (!isDraftValid) {
        console.warn('OfferManagement - Offer with incomplete data:', offer);
      }
      
      // Ensure offer has a type property - set spotlight as default if missing
      if (offer && !offer.type) {
        console.warn('OfferManagement - Offer missing type, setting default:', offer.id);
        offer.type = 'spotlight';
      }
      
      // Filter out drafts
      return isDraftValid && !offer.isDraft;
    });
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(offer => 
        filter === 'active' ? offer.isActive : !offer.isActive
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(offer => offer.type === typeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(term)) ||
        (offer.description && offer.description.toLowerCase().includes(term))
      );
    }
    
    // Sort by newest first - using numeric parsing for string IDs
    // This ensures newest offers (with highest IDs) appear first
    const sorted = filtered.sort((a, b) => {
      // Make sure both have IDs
      if (!a.id || !b.id) {
        console.warn('OfferManagement - Offer missing ID for sorting:', !a.id ? a : b);
        return 0;
      }
      
      // Convert string IDs to numbers for proper sorting
      const aId = parseInt(a.id);
      const bId = parseInt(b.id);
      
      if (isNaN(aId) || isNaN(bId)) {
        console.warn('OfferManagement - Invalid offer ID detected:', {aId: a.id, bId: b.id});
        return 0;
      }
      
      return bId - aId; // Newest first (higher ID = newer)
    });
    
    console.log('OfferManagement - Filtered and sorted offers:', sorted.map(o => ({id: o.id, title: o.title})));
    return sorted;
  };

  // Filter out draft offers and sort by newest first (latest created first)
  const publishedOffers = getFilteredOffers();

  return (
    <div className={`mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`flex justify-between items-center mb-3 sm:mb-4 ${!showAllItems ? 'cursor-pointer group' : ''}`}
        onClick={() => !showAllItems && navigate('/offer-management')}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Recent Live Offers</h2>
        </div>
        {!showAllItems && (
          <ChevronRight size={20} className="text-gray-500 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-transform" />
        )}
      </div>

      {/* Only show search and filters if showSearch prop is true */}
      {showSearch && (
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search offers..."
                className="pl-9 sm:pl-10 w-full p-2 sm:p-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 sm:p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 shadow-sm"
            >
              <Filter size={18} className={showFilters ? "text-amber-600" : "text-gray-500"} />
            </button>
          </div>
          
          {showFilters && (
            <div className="space-y-2">
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">              <button
                onClick={() => {
                  setFilter('all');
                  setTypeFilter('all'); // Clear type filter when showing all offers
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg ${filter === 'all' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                All Offers
              </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg ${filter === 'active' 
                    ? 'bg-green-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('inactive')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg ${filter === 'inactive' 
                    ? 'bg-gray-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  Inactive
                </button>
              </div>
              
              {/* Offer type filter - this is the new section we're adding */}
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-xs font-medium text-gray-500 self-center mr-1">Types:</span>
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-3 py-1 text-xs rounded-lg ${typeFilter === 'all' 
                    ? 'bg-amber-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  All
                </button>
                <button
                  onClick={() => setTypeFilter('spotlight')}
                  className={`px-3 py-1 text-xs rounded-lg ${typeFilter === 'spotlight' 
                    ? 'bg-amber-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  Spotlight
                </button>
                <button
                  onClick={() => setTypeFilter('happyhours')}
                  className={`px-3 py-1 text-xs rounded-lg ${typeFilter === 'happyhours' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  Happy Hours
                </button>
                <button
                  onClick={() => setTypeFilter('spintowin')}
                  className={`px-3 py-1 text-xs rounded-lg ${typeFilter === 'spintowin' 
                    ? 'bg-purple-500 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                >
                  Spin to Win
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        {publishedOffers && publishedOffers.length > 0 ? (
          publishedOffers.slice(0, showAllItems ? undefined : 2).map((offer, index) => (
            <div 
              key={offer.id} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <OfferItem 
                id={offer.id}
                title={offer.title}
                validTill={offer.validTill}
                isActive={offer.isActive}
                description={offer.description}
                image={offer.image}
                imagePreview={offer.imagePreview}
                views={offer.views || 0}
                showBoostButton={showBoostButtons}
                type={offer.type}
                startTime={offer.startTime}
                endTime={offer.endTime}
                validityDate={offer.validityDate}
                startDate={offer.startDate}
                showDetailedInfo={showDetailedInfo}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles size={20} className="sm:size-24 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              {searchTerm || filter !== 'all' ? 'No matching offers found' : 'No active offers yet'}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first offer to engage customers'}
            </p>
            {!searchTerm && filter === 'all' && (
              <button 
                onClick={() => navigate('/create-offer')} 
                className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center mx-auto text-xs sm:text-sm"
              >
                <Plus size={14} className="sm:size-16 mr-1 sm:mr-2" />
                Create Offer
              </button>
            )}
          </div>
        )}
        
        {offers && offers.filter(o => !o.isDraft).length > 2 && !showAllItems && (
          <button 
            onClick={() => navigate('/offer-management')}
            className="w-full py-1.5 sm:py-2 mt-2 text-amber-600 bg-amber-50 rounded-lg text-center text-xs sm:text-sm font-medium transition-colors hover:bg-amber-100"
          >
            View all ({offers.filter(o => !o.isDraft).length}) offers
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferManagement;