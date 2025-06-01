// filepath: /Users/devmondal/Downloads/project 10/src/components/redemptions/RedemptionTracker.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart2, Search, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import RedemptionItem from './RedemptionItem';

// Add showSearch and showAllItems props with default values
const RedemptionTracker = ({ showSearch = false, showAllItems = false }) => {
  const { redemptions, offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && redemptions && redemptions.length > 0) {
      // Reset loaded items when filters or search changes
      setLoadedItems([]);
      
      const timers = [];
      const filteredItems = getFilteredRedemptions();
      const itemCount = showAllItems ? filteredItems.length : Math.min(filteredItems.length, 3);
      const displayRedemptions = filteredItems.slice(0, itemCount);
      
      displayRedemptions.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, redemptions, searchTerm, filter, showAllItems]);

  const getOfferTitle = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    return offer?.title || '';
  };
  
  const getFilteredRedemptions = () => {
    let filtered = [...redemptions];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(redemption => 
        redemption.status && redemption.status.toLowerCase() === filter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(redemption => 
        (redemption.customerName && redemption.customerName.toLowerCase().includes(term)) ||
        (redemption.offerTitle && redemption.offerTitle.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  };

  return (
    <div className={`mt-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex items-center py-3 mb-1 cursor-pointer group"
        onClick={() => navigate('/redemption-tracker')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
            <BarChart2 size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Redemption Tracker</h2>
        </div>
        <ChevronRight size={20} className="ml-auto text-gray-500 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
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
                placeholder="Search redemptions..."
                className="pl-10 w-full p-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 shadow-sm"
            >
              <Filter size={18} className={showFilters ? "text-blue-600" : "text-gray-500"} />
            </button>
          </div>
          
          {showFilters && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'all' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'completed' 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'pending' 
                  ? 'bg-yellow-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Pending
              </button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {getFilteredRedemptions().length > 0 ? (
          // Show all items or just the first 3 based on the prop
          getFilteredRedemptions().slice(0, showAllItems ? undefined : 3).map((redemption, index) => (
            <div 
              key={redemption.id} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <RedemptionItem
                id={redemption.id}
                customerName={redemption.customerName}
                date={redemption.redeemedOn}
                time={redemption.time}
                status={redemption.status}
                offerTitle={redemption.offerTitle}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <BarChart2 size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">
              {searchTerm || filter !== 'all' ? 'No matching redemptions' : 'No redemptions yet'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Completed redemptions will appear here'}
            </p>
          </div>
        )}
        
        {redemptions.length > 3 && !showAllItems && (
          <button 
            onClick={() => navigate('/redemption-tracker')}
            className="w-full py-2 mt-2 text-blue-600 bg-blue-50 rounded-lg text-center font-medium shadow-md transition-colors hover:bg-blue-100"
          >
            View all ({redemptions.length}) redemptions
          </button>
        )}
      </div>
    </div>
  );
};

export default RedemptionTracker;
