import React from 'react';

const BookingStatus = ({ customerName, offerType, date, time, validTill, status = 'Booked' }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 text-lg">{customerName}</h3>
        <div className="flex items-center">
          <span className="text-green-600 font-medium flex items-center">
            {status === 'Booked' && (
              <>
                {status} <span className="ml-1 text-green-600">✓</span>
              </>
            )}
          </span>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-gray-700 font-medium">Offer: {offerType}</p>
        <div className="text-sm text-gray-500 mt-2">
          <p>Date: {date} at {time}</p>
          <p className="mt-1">Valid Till: {validTill}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;