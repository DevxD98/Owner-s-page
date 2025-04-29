import React, { useState } from 'react';
import { Edit, Check, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

type OfferItemProps = {
  id: string;
  title: string;
  validTill: string;
  isActive: boolean;
};

const OfferItem = ({ id, title, validTill, isActive }: OfferItemProps) => {
  const { toggleOffer, updateOffer } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedValidTill, setEditedValidTill] = useState(validTill);

  const handleSave = () => {
    updateOffer(id, {
      title: editedTitle,
      validTill: editedValidTill,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 transition-all duration-300 hover:shadow-md">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={editedValidTill}
            onChange={(e) => setEditedValidTill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
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
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-gray-500 text-sm">Valid Till: {validTill}</p>
          </div>

          <div className="flex items-center space-x-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleOffer(id)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Edit size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferItem;