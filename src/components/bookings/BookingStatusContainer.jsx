import React from 'react';
import BookingStatus from './BookingStatus';
import { useApp } from '../../contexts/AppContext';

const BookingStatusContainer = () => {
  const { bookings } = useApp();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Booking Status</h2>
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