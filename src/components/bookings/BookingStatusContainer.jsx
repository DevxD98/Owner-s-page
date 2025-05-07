import React from 'react';
import BookingStatus from './BookingStatus';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BookingStatusContainer = () => {
  const { bookings } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => navigate('/booking-status')}
      >
        <h2 className="text-xl font-semibold text-gray-800">Booking Status</h2>
        <ChevronRight size={20} className="text-gray-500" />
      </div>
      <div className="space-y-3">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingStatus
              key={booking.id}
              customerName={booking.customerName}
              offerType={booking.offerType}
              date={booking.date}
              time={booking.time}
              validTill={booking.validTill}
              status={booking.status}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No bookings available</p>
        )}
      </div>
    </div>
  );
};

export default BookingStatusContainer;