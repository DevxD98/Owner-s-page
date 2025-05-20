import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingStatusContainer from '../components/bookings/BookingStatusContainer';

const BookingStatusPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Offer Bookings</h1>
      </div>
      
      <BookingStatusContainer showSearch={true} showAllItems={true} />
    </div>
  );
};

export default BookingStatusPage;