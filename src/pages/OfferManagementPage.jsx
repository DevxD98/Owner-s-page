import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Search, Filter, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import OfferCard from '../components/offers/OfferCard';

const OfferManagementPage = () => {
  const navigate = useNavigate();
  const { offers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Function to filter offers based on search and filter criteria
  const getFilteredOffers = () => {
    if (!offers || !Array.isArray(offers)) {
      return [];
    }
    
    // First, limit to only 3 example offers, one of each type
    let filtered = [
      offers.find(offer => offer.type === 'spotlight' && offer.id === 'offer-spotlight-1'),
      offers.find(offer => offer.type === 'happyhours' && offer.id === 'offer-happyhours-1'),
      offers.find(offer => offer.type === 'spintowin' && offer.id === 'offer-spintowin-1')
    ].filter(Boolean);
    
    // Filter by status (all, active, drafts)
    if (filter === 'active') {
      filtered = filtered.filter(offer => offer.isActive && !offer.isDraft);
    } else if (filter === 'inactive') {
      filtered = filtered.filter(offer => !offer.isActive && !offer.isDraft);
    } else if (filter === 'drafts') {
      filtered = filtered.filter(offer => offer.isDraft);
    } else {
      // All offers except drafts
      filtered = filtered.filter(offer => !offer.isDraft);
    }
    
    // Filter by type if not "all"
    if (typeFilter !== 'all') {
      filtered = filtered.filter(offer => offer.type === typeFilter);
    }
    
    // Filter by search term if present
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(term)) || 
        (offer.description && offer.description.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  };

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

  // Handle navigation to different pages
  const handleEdit = (id) => {
    navigate(`/create-offer?id=${id}`);
  };

  const handleView = (id) => {
    navigate(`/preview-offer?id=${id}`);
  };

  const handleBoost = (id) => {
    navigate(`/boost-offer?id=${id}`);
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header with fixed padding - improved for mobile */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md mr-3">
            <Sparkles size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Offer Management</h1>
        </div>
      </div>

      {/* Search bar and filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter bar */}
        <div className="px-4 py-2 flex justify-between items-center border-t border-gray-100">
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${filter === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${filter === 'inactive' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setFilter('inactive')}
            >
              Inactive
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${filter === 'drafts' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setFilter('drafts')}
            >
              Drafts
            </button>
          </div>
          
          <button
            className="p-1.5 bg-gray-100 rounded-md text-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </button>
        </div>
        
        {/* Extended filter options */}
        {showFilters && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">Filter by type:</p>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 text-xs rounded-full ${typeFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 border border-gray-200'}`}
                onClick={() => setTypeFilter('all')}
              >
                All Types
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full ${typeFilter === 'spotlight' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-700 border border-gray-200'}`}
                onClick={() => setTypeFilter('spotlight')}
              >
                Spotlight
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full ${typeFilter === 'happyhours' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 border border-gray-200'}`}
                onClick={() => setTypeFilter('happyhours')}
              >
                Happy Hours
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full ${typeFilter === 'spintowin' ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-700 border border-gray-200'}`}
                onClick={() => setTypeFilter('spintowin')}
              >
                Spin to Win
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Offers list using the new card design */}
      <div className="px-3 py-4">
        {getFilteredOffers().length > 0 ? (
          <div className="space-y-4">
            {getFilteredOffers().map(offer => (
              <OfferCard
                key={offer.id}
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
                endDate={offer.validTill}
                startTime={offer.startTime}
                endTime={offer.endTime}
                timerValue={offer.type === 'happyhours' ? formatTimeRemaining(offer.startTime, offer.endTime) : null}
                onEdit={() => handleEdit(offer.id)}
                onView={() => handleView(offer.id)}
                onBoost={() => handleBoost(offer.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Sparkles size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No offers found</h3>
            <p className="text-gray-500 mt-1">Create new offers to see them here</p>
          </div>
        )}
      </div>

      {/* Plus button has been removed as requested */}
    </div>
  );
};

export default OfferManagementPage;