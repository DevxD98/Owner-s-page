import React, { useState } from 'react';
import { Edit, Check, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

type RedemptionItemProps = {
  id: string;
  customerName: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  offerId: string;
  offerTitle: string;
};

const RedemptionItem = ({
  id,
  customerName,
  date,
  status,
  offerId,
  offerTitle,
}: RedemptionItemProps) => {
  const { updateRedemption } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomerName, setEditedCustomerName] = useState(customerName);
  const [editedStatus, setEditedStatus] = useState(status);

  const handleSave = () => {
    updateRedemption(id, {
      customerName: editedCustomerName,
      status: editedStatus as 'completed' | 'pending' | 'cancelled',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 transition-all duration-300 hover:shadow-md">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedCustomerName}
            onChange={(e) => setEditedCustomerName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-green-500 hover:text-green-700"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800">{customerName}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-right font-medium">{offerTitle}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Edit size={18} />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <span>Date: {date}</span>
            <span className="mx-2">|</span>
            <span>Status: {status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedemptionItem;