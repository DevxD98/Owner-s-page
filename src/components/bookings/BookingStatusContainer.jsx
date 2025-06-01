import React, { useState, useEffect } from 'react';
import BookingStatus from './BookingStatus';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Ticket, Search, Filter } from 'lucide-react';

const BookingStatusContainer = ({ showSearch = false, showAllItems = false }) => {
  const { bookings } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (showSearch) {
      let result = [...bookings];
      
      if (filter !== 'all') {
        result = result.filter(booking => 
          booking.status && booking.status.toLowerCase() === filter.toLowerCase()
        );
      }
      
      if (searchTerm.trim() !== '') {
        const searchTermLower = searchTerm.toLowerCase();
        result = result.filter(booking => 
          (booking.customerName && booking.customerName.toLowerCase().includes(searchTermLower)) ||
          (booking.offerTitle && booking.offerTitle.toLowerCase().includes(searchTermLower))
        );
      }
      
      setFilteredBookings(result);
    } else {
      setFilteredBookings(bookings);
    }
  }, [bookings, filter, searchTerm, showSearch]);
  
  useEffect(() => {
    if (isVisible && filteredBookings && filteredBookings.length > 0) {
      const timers = [];
      const itemsToShow = showAllItems ? filteredBookings.length : 3;
      
      filteredBookings.slice(0, itemsToShow).forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, filteredBookings, showAllItems]);

  return (
    <div className={`mt-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex items-center mb-4 cursor-pointer group"
        onClick={() => navigate('/booking-status')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Ticket size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Booking History</h2>
        </div>
        <ChevronRight size={20} className="ml-auto text-gray-500 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
      </div>

      {showSearch && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 w-full p-2.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 shadow-sm"
            >
              <Filter size={18} className={showFilters ? "text-indigo-600" : "text-gray-500"} />
            </button>
          </div>
          
          {showFilters && (
            <div className="flex space-x-2 overflow-x-auto pb-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'all' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'confirmed' 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm rounded-lg ${filter === 'pending' 
                  ? 'bg-yellow-500 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
              >
                Pending
              </button>
              {showAllItems && (
                <>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-4 py-2 text-sm rounded-lg ${filter === 'active' 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('cancelled')}
                    className={`px-4 py-2 text-sm rounded-lg ${filter === 'cancelled' 
                      ? 'bg-red-500 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} whitespace-nowrap`}
                  >
                    Cancelled
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {filteredBookings && filteredBookings.length > 0 ? (
          filteredBookings.slice(0, showAllItems ? filteredBookings.length : 3).map((booking, index) => (
            <div 
              key={booking.id} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <BookingStatus
                customerName={booking.customerName}
                offerTitle={booking.offerTitle}
                offerType={booking.offerType}
                date={booking.date}
                time={booking.time}
                validTill={booking.validTill}
                status={booking.status}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
              <Ticket size={24} className="text-indigo-400" />
            </div>
            <p className="text-gray-500 font-medium">
              {searchTerm || filter !== 'all' ? 'No matching bookings found' : 'No booking history yet'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Your booking history will appear here'}
            </p>
          </div>
        )}
        
        {bookings && bookings.length > 3 && !showAllItems && (
          <button 
            onClick={() => navigate('/booking-status')}
            className="w-full py-2 mt-2 text-indigo-600 bg-indigo-50 rounded-lg text-center font-medium shadow-md transition-colors hover:bg-indigo-100"
          >
            View all ({bookings.length}) booking history
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingStatusContainer;