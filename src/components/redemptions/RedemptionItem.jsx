// filepath: /Users/devmondal/Downloads/project 10/src/components/redemptions/RedemptionItem.jsx
import React from 'react';
import { Calendar, Award, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const RedemptionItem = ({
  id,
  customerName,
  date,
  time,
  status,
  offerId,
  offerTitle,
}) => {
  const { updateRedemption } = useApp();
  
  // Get status styling
  const getStatusBadge = () => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Completed</span>;
    } else if (statusLower === 'pending') {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>;
    } else if (statusLower === 'cancelled') {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Cancelled</span>;
    }
    return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">{status}</span>;
  };
  
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
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800 text-lg">{customerName}</h3>
        </div>
        <div>
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <Award size={16} className="mr-2 text-blue-500" />
          <span className="font-medium">{offerTitle}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={14} className="mr-2 text-gray-400" />
          <span>Redeemed on: {formatDate(date)}{time ? ` at ${time}` : ''}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <Clock size={14} className="mr-2 text-gray-400" />
          <span>ID: {id.substring(0, 8)}</span>
        </div>
      </div>
    </div>
  );
};

export default RedemptionItem;
