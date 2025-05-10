import React from 'react';
import { Edit } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const OfferItem = ({ id, title, validTill, isActive }) => {
  const { toggleOffer } = useApp();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    // Navigate to create-offer page with the offer ID for editing
    navigate(`/create-offer?id=${id}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 transition-all duration-300 hover:shadow-md">
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
            onClick={handleEdit}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Edit size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;