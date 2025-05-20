// filepath: /Users/devmondal/Downloads/project 10/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle, Clock, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import HappyHoursTimer from './HappyHoursTimer';

const OfferItem = ({ 
  id, 
  title, 
  validTill, 
  isActive, 
  description, 
  image, 
  isDraft, 
  isSponsored, 
  views = 0, 
  showBoostButton = false, 
  type,
  startTime,
  endTime,
  validityDate,
  startDate
}) => {
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
    <div className={`bg-white rounded-lg p-3 md:p-4 border ${isSponsored ? 'border-purple-200' : 'border-gray-100'} shadow-sm transition-all duration-300 hover:shadow-md group`}>
      <div className="flex items-start gap-2 md:gap-3">
        {/* Image or placeholder */}
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isSponsored ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
              <span className={`text-xs font-medium ${isSponsored ? 'text-purple-500' : 'text-gray-400'}`}>{title.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {type && (
            <div className="mb-1 text-xs text-gray-500 font-medium">
              {type === 'happyhours' ? 'Happy hours' : type === 'spintowin' ? 'Spin to win!' : ''}
            </div>
          )}
          <div className="flex flex-wrap justify-between items-center gap-1">
            <h3 className={`font-semibold text-sm md:text-base truncate ${isSponsored ? 'text-purple-800 group-hover:text-purple-600' : 'text-gray-800 group-hover:text-amber-600'} transition-colors`}>
              {title}
              {isSponsored && (
                <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Ad
                </span>
              )}
            </h3>
            
            {/* Status Badge */}
            {isDraft ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Draft
              </span>
            ) : (
              <span 
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
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
          
          {/* Display Happy Hours Timer for happy hours offers */}
          {type === 'happyhours' && startTime && endTime && validityDate && (
            <div className="mt-2 mb-1">
              <HappyHoursTimer
                startTime={startTime}
                endTime={endTime}
                validityDate={validityDate}
                startDate={startDate}
              />
            </div>
          )}
          
          <div className="flex items-center mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1 flex-shrink-0" />
              <span className="truncate">Valid till: {formatDate(validTill)}</span>
            </div>
          </div>
          
          {/* Views display (moved below the image) */}
          {views > 0 && (
            <div className="flex items-center text-xs text-gray-600 font-medium mt-1.5">
              <span>Views: {views}</span>
            </div>
          )}
          
          {/* Action buttons - optimized for mobile */}
          <div className="mt-4 md:mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
            {/* Left bottom: Edit and Preview */}
            <div className="flex gap-2">
              <button 
                className={`flex items-center justify-center p-1.5 md:p-2 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-sm hover:shadow border border-gray-100`}
                title="Edit offer"
                onClick={handleEdit}
                style={{ width: 32, height: 32 }}
              >
                <Edit size={14} />
              </button>
              <button 
                className={`flex items-center justify-center p-1.5 md:p-2 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-sm hover:shadow border border-gray-100`}
                title="Preview offer"
                onClick={handlePreview}
                style={{ width: 32, height: 32 }}
              >
                <ExternalLink size={14} />
              </button>
            </div>
            
            {/* Center: Boost Offer button */}
            {showBoostButton && (
              <button 
                className="flex items-center justify-center px-2 sm:px-3 py-1.5 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md transition-all text-xs font-medium shadow-sm hover:shadow"
                style={{ height: 32 }}
                onClick={handleBoost}
              >
                <Zap size={14} className="mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Boost Offer</span>
              </button>
            )}
            
            {/* Right: Toggle switch */}
            {!isDraft && (
              <label 
                className="relative inline-flex items-center cursor-pointer ml-auto sm:ml-0"
                title={isActive ? "Active: Offer is live" : "Inactive: Offer is paused"}
              >
                <input 
                  type="checkbox" 
                  checked={isActive}
                  onChange={() => toggleOffer(id)}
                  className="sr-only peer" 
                />
                <div className="w-10 sm:w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
