import React from 'react';
import { Calendar, Clock, Check, AlertCircle, Hourglass, Award, Sparkles } from 'lucide-react';

const BookingStatus = ({ 
  customerName, 
  offerTitle,
  offerType, 
  date, 
  time, 
  validTill, 
  status = 'Booked' 
}) => {
  // Get status color and icon
  const getStatusInfo = () => {
    switch(status.toLowerCase()) {
      case 'confirmed':
      case 'active':
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
      case 'expired':
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <AlertCircle size={14} className="mr-1" /> 
        };
      default:
        return { 
          color: 'bg-indigo-100 text-indigo-800', 
          icon: <Check size={14} className="mr-1" /> 
        };
    }
  };

  // Get offer type icon
  const getOfferTypeIcon = () => {
    const icon = offerType === 'happyhours' ? 
      <Clock size={16} className="mr-2 text-amber-500" /> : 
      offerType === 'spintowin' ? 
      <Sparkles size={16} className="mr-2 text-amber-500" /> : 
      <Award size={16} className="mr-2 text-amber-500" />;
      
    return (
      <div className="flex items-center gap-1 mb-1">
        {icon}
        <span className="text-xs text-amber-700 font-medium">
          {offerType === 'happyhours' ? 'Happy Hours' : offerType === 'spintowin' ? 'Spin to Win!' : 'Special Offer'}
        </span>
      </div>
    );
  };
  
  const statusInfo = getStatusInfo();
  
  // Format date to more readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div>
            {getOfferTypeIcon()}
            <h3 className="font-semibold text-gray-800 text-lg">{customerName}</h3>
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="capitalize">{status}</span>
          </div>
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-700">
            <Award size={16} className="mr-2 text-amber-500" />
            <span className="font-medium">{offerTitle || "50% off on smoothies"}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={14} className="mr-2 text-gray-400" />
            <span>{formatDate(date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Clock size={14} className="mr-2 text-gray-400" />
            <span>Time: {time} • Valid till: {validTill}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;