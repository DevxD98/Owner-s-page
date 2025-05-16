// filepath: /Users/devmondal/Downloads/project 10/src/components/redemptions/RedemptionItem.jsx
import React, { useState } from 'react';
import { Edit, Check, X, Calendar, Award, Clock } from 'lucide-react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomerName, setEditedCustomerName] = useState(customerName);
  const [editedStatus, setEditedStatus] = useState(status);

  const handleSave = () => {
    updateRedemption(id, {
      customerName: editedCustomerName,
      status: editedStatus,
    });
    setIsEditing(false);
  };
  
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
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={editedCustomerName}
              onChange={(e) => setEditedCustomerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Check size={16} className="mr-1" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                {getStatusBadge()}
              </div>
              <h3 className="font-medium text-gray-800 text-lg">{customerName}</h3>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit size={16} />
            </button>
          </div>
          
          <div className="mt-3 space-y-2">
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
      )}
    </div>
  );
};

export default RedemptionItem;
