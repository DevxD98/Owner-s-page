import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingStatus from '../components/bookings/BookingStatus';
import { useApp } from '../contexts/AppContext';

const BookingStatusPage = () => {
  const navigate = useNavigate();
  const { bookings } = useApp();

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Booking Status</h1>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingStatus 
            key={booking.id}
            customerName={booking.customerName}
            offerType={booking.offerType}
            date={booking.date}
            time={booking.time}
            validTill={booking.validTill}
            status={booking.status}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingStatusPage;