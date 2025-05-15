import React from 'react';
import { Calendar, Clock, Tag, Check, AlertCircle, Hourglass } from 'lucide-react';

const BookingStatus = ({ customerName, offerType, date, time, validTill, status = 'Booked' }) => {
  // Get status color and icon
  const getStatusInfo = () => {
    switch(status.toLowerCase()) {
      case 'booked':
        return { 
          color: 'bg-green-100 text-green-800', 
          icon: <Check size={14} className="mr-1" /> 
        };
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800', 
          icon: <Hourglass size={14} className="mr-1" /> 
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800', 
          icon: <AlertCircle size={14} className="mr-1" /> 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <Check size={14} className="mr-1" /> 
        };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">{customerName}</h3>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
          {statusInfo.icon}
          <span>{status}</span>
        </div>
      </div>
      
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-gray-700">
          <Tag size={16} className="mr-2 text-indigo-500" />
          <span className="font-medium">{offerType}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={14} className="mr-2 text-gray-400" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={14} className="mr-2 text-gray-400" />
          <span>Time: {time} • Valid till: {validTill}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;