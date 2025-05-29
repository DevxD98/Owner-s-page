// filepath: /Users/devmondal/Owner-s-page-4/src/components/offers/RecentLiveOffers.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Plus, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import OfferItem from './OfferItem';
import OfferCard from './OfferCard';
import HomeOfferCard from './HomeOfferCard';

// Format time remaining for happy hours offers
const formatTimeRemaining = (startTime, endTime) => {
  if (!startTime || !endTime) return null;
  
  try {
    const now = new Date();
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const today = new Date();
    const start = new Date(today);
    start.setHours(startHours, startMinutes, 0);
    const end = new Date(today);
    end.setHours(endHours, endMinutes, 0);
    
    if (now < start) {
      // Hasn't started yet
      return "Starts soon";
    } else if (now > end) {
      // Already ended
      return "Ended";
    } else {
      // Currently active, calculate remaining time
      const diff = end - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }
  } catch (e) {
    return null;
  }
};

// Add props with default values
const RecentLiveOffers = ({ 
  showSearch = false,
  showDetailedView = false, 
  maxItems = 3,
  showBoostButton = false,
  showHeader = true // New prop to control header visibility
}) => {
  const { offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAllItems, setShowAllItems] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Log the offers when component mounts or offers change
  useEffect(() => {
    console.log('RecentLiveOffers - Current Offers:', offers);
    
    // Combine state updates to prevent excessive renders
    if (offers && offers.length > 0) {
      setLoadedItems([]); // Reset loadedItems when offers change
      setRefreshKey(Date.now()); // Use timestamp for refresh key
    }
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
      // Different display limits based on context
      let displayLimit;
      if (showDetailedView) {
        displayLimit = showAllItems ? getFilteredOffers().length : maxItems;
      } else {
        displayLimit = Math.min(maxItems, 3);
      }
      
      const displayOffers = getFilteredOffers().slice(0, displayLimit); 
      
      // Use a shorter timeout to make items appear quickly
      displayOffers.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 50 + 100); // Faster animations
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, offers, filter, searchTerm, showAllItems, refreshKey, maxItems, showDetailedView]);

  // Filter out draft offers and apply search/filters
  const getFilteredOffers = () => {
    if (!offers || !Array.isArray(offers)) {
      console.log('RecentLiveOffers: No offers available');
      return [];
    }
    
    // First, get one of each offer type to match offer management page
    let filtered = [
      offers.find(offer => offer.type === 'spotlight' && offer.id === 'offer-spotlight-1'),
      offers.find(offer => offer.type === 'happyhours' && offer.id === 'offer-happyhours-1'),
      offers.find(offer => offer.type === 'spintowin' && offer.id === 'offer-spintowin-1')
    ].filter(Boolean);
    
    console.log('RecentLiveOffers: Filtered offers count:', filtered.length);
    
    // Ensure offers have all required properties
    filtered = filtered.filter(offer => {
      const isOfferValid = offer && typeof offer === 'object';
      
      // Set default values if missing
      if (isOfferValid && !offer.type) {
        offer.type = 'spotlight';
      }
      
      // Set default values for isDraft and isBoosted if they're undefined
      if (isOfferValid) {
        offer.isDraft = offer.isDraft !== undefined ? offer.isDraft : false;
        offer.isBoosted = offer.isBoosted !== undefined ? offer.isBoosted : false;
      }
      
      // Only return valid offers
      return isOfferValid;
    });
    
    // Apply filters based on the selected filter
    if (filter === 'all') {
      // For "All Offers" filter, exclude drafts
      filtered = filtered.filter(offer => !offer.isDraft);
    } else {
      filtered = filtered.filter(offer => {
        switch (filter) {
          case 'active':
            return offer.isActive && !offer.isDraft;
          case 'inactive':
            return !offer.isActive && !offer.isDraft;
          case 'draft':
            return offer.isDraft === true;
          case 'boosted':
            return offer.isBoosted === true && !offer.isDraft;
          default:
            return true;
        }
      });
    }
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(term)) ||
        (offer.description && offer.description.toLowerCase().includes(term))
      );
    }
    
    const sorted = filtered.sort((a, b) => {
      if (!a.id || !b.id) {
        return 0;
      }
      return parseInt(b.id) - parseInt(a.id);
    });
    
    return sorted;
  };
  
  const publishedOffers = getFilteredOffers();
  
  console.log('RecentLiveOffers: publishedOffers count:', publishedOffers.length);
  
  return (
    <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100' : 'opacity-0'} ${showHeader ? 'mt-6 p-3 bg-white rounded-xl shadow-md border border-gray-100' : ''} w-full max-w-full ${!showDetailedView ? 'min-h-[190px]' : ''}`}>
      {showHeader && (
        <div 
          className="flex justify-between items-center mb-2"
        >
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/offer-management')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Offer Management</h2>
          </div>
          <ChevronRight size={20} className="text-gray-500 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-transform cursor-pointer" onClick={() => navigate('/offer-management')} />
        </div>
      )}
      
      {/* Only show search and filters if showSearch prop is true */}
      {showSearch && (
        <div className="my-4">
          <div className="flex items-center mb-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search offers..."
                className="pl-10 w-full p-2.5 text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filter tabs - improved for mobile scrolling */}
          <div className="flex overflow-x-auto pb-2 gap-1.5 mb-4 scrollbar-hide">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'all' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}
            >
              All Offers
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'active' 
                ? 'bg-green-500 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'inactive' 
                ? 'bg-gray-500 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}
            >
              Inactive
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'draft' 
                ? 'bg-amber-400 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}
            >
              Draft
            </button>
            <button
              onClick={() => setFilter('boosted')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'boosted' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} whitespace-nowrap flex-shrink-0`}
            >
              Boosted
            </button>
          </div>
        </div>
      )}

      <div className="space-y-0 mt-0">
        {publishedOffers.length > 0 ? (
          <div className="flex flex-col">
            {/* Offers list */}
            {publishedOffers.slice(0, showDetailedView ? (showAllItems ? publishedOffers.length : maxItems) : maxItems).map((offer, index) => (
              <div 
                key={offer.id || index} 
                className={`transition-all duration-300 transform mb-2 ${
                  loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {showDetailedView ? (
                  <OfferItem
                    id={offer.id}
                    title={offer.title}
                    validTill={offer.validTill}
                    isActive={offer.isActive}
                    description={offer.description}
                    image={offer.image}
                    imagePreview={offer.imagePreview}
                    isDraft={offer.isDraft}
                    isBoosted={offer.isBoosted}
                    boostedViews={offer.boostedViews || 0}
                    views={offer.views || 0}
                    showBoostButton={showBoostButton}
                    type={offer.type}
                    startTime={offer.startTime}
                    endTime={offer.endTime}
                    validityDate={offer.validityDate}
                    startDate={offer.startDate}
                    showDetailedInfo={true}
                    initialShowTimer={offer.type === 'happyhours'}
                  />
                ) : (
                  // Use HomeOfferCard for HomePage, OfferCard for other pages
                  window.location.pathname === '/' ? (
                    <HomeOfferCard
                      id={offer.id}
                      title={offer.title}
                      description={offer.description}
                      validTill={offer.validTill}
                      type={offer.type || 'spotlight'}
                      views={offer.views || 0}
                      isActive={offer.isActive}
                      image={offer.image}
                      startDate={offer.startDate}
                      endDate={offer.validityDate || offer.validTill}
                      startTime={offer.startTime}
                      endTime={offer.endTime}
                      timerValue={offer.type === 'happyhours' ? formatTimeRemaining(offer.startTime, offer.endTime) : null}
                      onEdit={() => navigate(`/create-offer?id=${offer.id}`)}
                      onView={() => navigate(`/preview-offer?id=${offer.id}`)}
                      isSponsored={false}
                    />
                  ) : (
                    <OfferCard
                      id={offer.id}
                      title={offer.title}
                      description={offer.description}
                      validTill={offer.validTill}
                      type={offer.type || 'spotlight'}
                      views={offer.views || 0}
                      isActive={offer.isActive}
                      image={offer.image}
                      images={offer.images}
                      startDate={offer.startDate}
                      endDate={offer.validityDate || offer.validTill}
                      startTime={offer.startTime}
                      endTime={offer.endTime}
                      timerValue={offer.type === 'happyhours' ? formatTimeRemaining(offer.startTime, offer.endTime) : null}
                      onEdit={() => navigate(`/create-offer?id=${offer.id}`)}
                      onView={() => navigate(`/preview-offer?id=${offer.id}`)}
                      onBoost={() => navigate(`/boost-offer?id=${offer.id}`)}
                      isSponsored={false}
                    />
                  )
                )}
              </div>
            ))}
            
            {/* Directly after offers, no extra space */}
            {!showDetailedView && (
              <button 
                onClick={() => navigate('/offer-management')}
                className="w-full py-3 mt-1 text-amber-600 bg-amber-50 rounded-xl text-center font-medium transition-colors hover:bg-amber-100 shadow-sm border border-amber-100"
              >
                {publishedOffers.length > 0 
                  ? `View all (${publishedOffers.length}) offers in management` 
                  : "Manage your offers"}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-5 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">
              {searchTerm || filter !== 'all' ? 'No matching offers found' : 'No active offers yet'}
            </p>
            <p className="text-gray-500 text-sm mt-1 mb-2">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first offer to engage customers'}
            </p>
            {!searchTerm && filter === 'all' && (
              <button 
                onClick={() => navigate('/create-offer')} 
                className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center mx-auto"
              >
                <Plus size={16} className="mr-1" />
                Create Offer
              </button>
            )}
          </div>
        )}
        
        {/* Show "View all offers" button on detailed view page when there are more offers */}
        {showDetailedView && publishedOffers.length > maxItems && !showAllItems && (
          <button 
            onClick={() => setShowAllItems(true)}
            className="w-full py-3 mt-4 text-amber-600 bg-amber-50 rounded-xl text-center font-medium transition-colors hover:bg-amber-100 shadow-sm border border-amber-100"
          >
            View all ({publishedOffers.length}) offers
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentLiveOffers;
