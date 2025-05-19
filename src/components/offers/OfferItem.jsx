// filepath: /Users/devmondal/Downloads/project 10/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const OfferItem = ({ id, title, validTill, isActive, description, image, isDraft, isSponsored, views = 0, showBoostButton = false, type }) => {
  const { toggleOffer } = useApp();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    // Navigate to create-offer page with the offer ID for editing
    navigate(`/create-offer?id=${id}`);
  };
  
  const handlePreview = () => {
    navigate(`/preview-offer?id=${id}`);
  };
  
  const handleBoost = () => {
    // Navigate to boost offer page
    navigate(`/boost-offer?id=${id}`);
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
    <div className={`bg-white rounded-lg p-4 border ${isSponsored ? 'border-purple-200' : 'border-gray-100'} shadow-sm transition-all duration-300 hover:shadow-md group`}>
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
          {type && (
            <div className="mb-1 text-xs text-gray-500 font-medium">
              {type === 'happyhours' ? 'Happy hours' : type === 'spintowin' ? 'Spin to win!' : ''}
            </div>
          )}
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
              <span 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isActive 
                    ? isSponsored ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
                title={isActive ? "Active offer" : "Inactive offer"}
              >
                {isActive ? 'Active' : 'Inactive'}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
          )}
          
          <div className="flex items-center mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>Valid till: {formatDate(validTill)}</span>
            </div>
          </div>
          
          {/* Views display (moved below the image) */}
          {views > 0 && (
            <div className="flex items-center text-xs text-gray-600 font-medium mt-1.5">
              <span>Views: {views}</span>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-sm hover:shadow border border-gray-100`}
                title="Edit offer"
                onClick={handleEdit}
              >
                <Edit size={18} />
              </button>
              <button 
                className={`p-2 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-sm hover:shadow border border-gray-100`}
                title="Preview offer"
                onClick={handlePreview}
              >
                <ExternalLink size={18} />
              </button>
              {showBoostButton && (
                <button 
                  className="px-4 py-2.5 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg"
                  onClick={handleBoost}
                >
                  Boost Offer
                </button>
              )}
            </div>
            
            {!isDraft && (
              <button
                onClick={() => toggleOffer(id)}
                title={isActive ? "Active (click to deactivate)" : "Inactive (click to activate)"}
                className={`flex items-center justify-center rounded-md p-2.5 transition-all duration-200 shadow-sm hover:shadow border min-w-[44px] min-h-[44px] ${
                  isActive 
                    ? isSponsored ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200' : 'text-green-700 bg-green-50 hover:bg-green-100 border-green-200'
                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {isActive ? (
                  <ToggleRight size={24} />
                ) : (
                  <ToggleLeft size={24} />
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
