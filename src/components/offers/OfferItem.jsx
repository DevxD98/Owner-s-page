// filepath: /Users/devmondal/Downloads/project 10/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const OfferItem = ({ id, title, validTill, isActive, description, image, isDraft, isSponsored }) => {
  const { toggleOffer } = useApp();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    // Navigate to create-offer page with the offer ID for editing
    navigate(`/create-offer?id=${id}`);
  };
  
  const handlePreview = () => {
    navigate(`/preview-offer?id=${id}`);
  };
  
  // Format date to more readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date';
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
    <div className={`bg-white rounded-lg p-4 border ${isSponsored ? 'border-purple-200' : 'border-gray-200'} shadow-sm transition-all duration-300 hover:shadow-md group`}>
      <div className="flex items-start gap-3">
        {/* Image or placeholder */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isSponsored ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
              <span className={`text-xs font-medium ${isSponsored ? 'text-purple-500' : 'text-gray-400'}`}>{title.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className={`font-semibold ${isSponsored ? 'text-purple-800 group-hover:text-purple-600' : 'text-gray-800 group-hover:text-amber-600'} transition-colors`}>
              {title}
              {isSponsored && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Ad
                </span>
              )}
            </h3>
            
            {/* Status Badge */}
            {isDraft ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Draft
              </span>
            ) : (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
          )}
          
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>Valid till: {formatDate(validTill)}</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button 
                className={`p-1.5 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-full transition-colors`}
                title="Edit offer"
                onClick={handleEdit}
              >
                <Edit size={16} />
              </button>
              <button 
                className={`p-1.5 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-full transition-colors`}
                title="Preview offer"
                onClick={handlePreview}
              >
                <ExternalLink size={16} />
              </button>
            </div>
            
            {!isDraft && (
              <button
                onClick={() => toggleOffer(id)}
                className={`flex items-center text-sm font-medium rounded-full px-3 py-1 transition-colors ${
                  isActive 
                    ? isSponsored ? 'text-purple-700 bg-purple-50 hover:bg-purple-100' : 'text-green-700 bg-green-50 hover:bg-green-100'
                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {isActive ? (
                  <>
                    <ToggleRight size={16} className="mr-1" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft size={16} className="mr-1" />
                    <span>Inactive</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
