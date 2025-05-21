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
  const [showAllItems, setShowAllItems] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add a key to force refresh

  // Log the offers when component mounts or offers change
  useEffect(() => {
    console.log('RecentLiveOffers - Current Offers:', offers);
    
    // Reset loadedItems when offers change to ensure animations work correctly
    setLoadedItems([]);
    
    // Check happy hours offers for date issues
    if (offers && offers.length > 0) {
      const happyHoursOffers = offers.filter(offer => offer.type === 'happyhours');
      if (happyHoursOffers.length > 0) {
        console.log('Happy Hours Offers with dates:', happyHoursOffers.map(o => ({
          id: o.id,
          title: o.title,
          startDate: o.startDate,
          validityDate: o.validityDate,
          startTime: o.startTime,
          endTime: o.endTime
        })));
      }
      
      // Log all offers IDs for debugging sorting issues
      console.log('All offers IDs:', offers.map(o => o.id));
      console.log('Filtered offers:', getFilteredOffers().map(o => o.id));
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
      // Reset loadedItems first
      setLoadedItems([]);
      
      const timers = [];
      const displayOffers = getFilteredOffers().slice(0, showAllItems ? 10 : 2); // Display up to 10 items when showing all
      
      // Log the offers that will be displayed
      console.log('Displaying offers:', displayOffers.map(o => ({id: o.id, title: o.title})));
      
      // Use a shorter timeout to make items appear quickly
      displayOffers.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 50 + 100); // Faster animations
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, offers, filter, searchTerm, showAllItems, refreshKey]); // Add refreshKey dependency

  // Filter out draft offers and apply search/filters
  const getFilteredOffers = () => {
    // Debug the offers array first
    console.log('Original offers in getFilteredOffers:', offers);
    
    if (!offers || !Array.isArray(offers)) {
      console.error('Offers is not a valid array:', offers);
      return [];
    }
    
    // Make sure to check if offers is defined and handle each offer having required properties
    let filtered = offers.filter(offer => {
      const isDraftValid = offer && offer.isDraft !== undefined;
      // Debug any problematic offers
      if (!isDraftValid) {
        console.warn('Offer with incomplete data:', offer);
      }
      
      // Ensure offer has a type property - set spotlight as default if missing
      if (offer && !offer.type) {
        console.warn('Offer missing type, setting default:', offer.id);
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
        console.warn('Offer missing ID for sorting:', !a.id ? a : b);
        return 0;
      }
      // Convert string IDs to numbers for proper sorting
      return parseInt(b.id) - parseInt(a.id);
    });
    
    console.log('Filtered and sorted offers:', sorted);
    return sorted;
  };
  
  const publishedOffers = getFilteredOffers();
  
  // Debug log when component renders
  console.log('RecentLiveOffers - rendering with', publishedOffers.length, 'offers and loadedItems =', loadedItems);

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
          publishedOffers.slice(0, showAllItems ? 10 : 2).map((offer, index) => (
            <div 
              key={offer.id || index} 
              className={`transition-all duration-300 transform ${
                loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Debug info - remove in production */}
              {/* <div className="text-xs text-gray-400 mb-1">ID: {offer.id}, Has Image: {offer.image ? 'Yes' : 'No'}</div> */}
              
              <OfferItem
                id={offer.id}
                title={offer.title}
                validTill={offer.validTill}
                isActive={offer.isActive}
                description={offer.description}
                image={offer.image}
                imagePreview={offer.imagePreview}
                views={offer.views || 230}
                showBoostButton={false}
                type={offer.type}
                startTime={offer.startTime}
                endTime={offer.endTime}
                validityDate={offer.validityDate}
                startDate={offer.startDate}
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
        
        {publishedOffers.length > 2 && (
          <button 
            onClick={() => {
              if (!showAllItems) {
                setShowAllItems(true);
              } else {
                navigate('/offer-management');
              }
            }}
            className="w-full py-2 mt-4 text-amber-600 bg-amber-50 rounded-lg text-center font-medium transition-colors hover:bg-amber-100"
          >
            {showAllItems ? `View all (${publishedOffers.length}) offers in management` : `View all (${publishedOffers.length}) offers`}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentLiveOffers;
