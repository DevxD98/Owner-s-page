import React, { useState, useEffect } from 'react';
import BookingStatus from './BookingStatus';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';

const BookingHistory = () => {
  const { bookings } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && bookings && bookings.length > 0) {
      const timers = [];
      bookings.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, bookings]);

  return (
    <div className={`mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer group"
        onClick={() => navigate('/booking-status')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <Calendar size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Booking History</h2>
        </div>
        <ChevronRight size={20} className="text-gray-500 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
      </div>
      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div 
              key={booking.id || index} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <BookingStatus
                customerName={booking.customerName}
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
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No bookings available</p>
            <p className="text-gray-400 text-sm mt-1">Future bookings will appear here</p>
          </div>
        )}
        
        {bookings && bookings.length > 3 && (
          <button 
            onClick={() => navigate('/booking-status')}
            className="w-full py-2 mt-2 text-indigo-600 bg-indigo-50 rounded-lg text-center font-medium transition-colors hover:bg-indigo-100"
          >
            View all ({bookings.length}) bookings
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;