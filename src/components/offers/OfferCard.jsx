import React from 'react';
import { Calendar, Clock, Edit, User, Trash2 } from 'lucide-react';
import ViewsIcon from '../icons/ViewsIcon';
import { useApp } from '../../contexts/AppContext';
import { getOfferThumbnails, getFallbackThumbnail } from '../../utils/offerThumbnails';

const OfferCard = ({
  id,
  title,
  description,
  validTill,
  type,
  views = 0,
  bookings = 0,
  spins = 0,
  isActive,
  onEdit,
  onView,
  onBoost,
  image,
  startDate,
  endDate,
  startTime,
  endTime,
  timerValue
}) => {
  const { toggleOffer } = useApp();

  // Helper functions for colors and styles based on offer type
  const getTypeLabel = () => {
    switch(type) {
      case 'happyhours':
        return 'Happy Hours';
      case 'spintowin':
        return 'Spin To Win';
      case 'spotlight':
      default:
        return 'Spotlight Offer';
    }
  };

  const getTagColor = () => {
    switch(type) {
      case 'happyhours':
        return 'bg-blue-50 text-blue-600';
      case 'spintowin':
        return 'bg-purple-50 text-purple-600';
      case 'spotlight':
      default:
        return 'bg-amber-50 text-amber-600';
    }
  };

  // Function to generate small thumbnail images
  const getThumbnails = () => {
    // Get thumbnails based on the offer type
    const thumbnails = getOfferThumbnails(type);
    
    return thumbnails.map((thumbnailUrl, i) => (
      <div key={i} className="w-14 h-14 rounded-md overflow-hidden bg-gray-100">
        <img 
          src={thumbnailUrl} 
          alt={`${title} thumbnail ${i+1}`} 
          className="w-full h-full object-cover"
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getFallbackThumbnail(type, i);
          }}
        />
      </div>
    ));
  };

  // Format description to be more concise
  const formatDescription = (text) => {
    return text && text.length > 70 ? `${text.substring(0, 70)}...` : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100">
      {/* Card header with title */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden mr-3">
              {image ? (
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">{title.substring(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center ${getTagColor()}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1"></span>
                {getTypeLabel()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Timer for happy hours */}
        {type === 'happyhours' && timerValue && (
          <div className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
            {timerValue}
          </div>
        )}
      </div>
      
      {/* Card description */}
      <div className="px-4 pb-2">
        <p className="text-sm text-gray-600">{formatDescription(description)}</p>
      </div>
      
      {/* Thumbnails */}
      <div className="px-4 pb-3">
        <div className="flex space-x-2">
          {getThumbnails()}
        </div>
      </div>
      
      {/* Card actions */}
      <div className="flex items-center border-t border-gray-100">
        <button 
          onClick={onView}
          className="flex-1 py-3 text-blue-600 text-sm font-medium flex items-center justify-center hover:bg-blue-50"
        >
          <ViewsIcon size={16} className="mr-1.5" /> View
        </button>
        
        <button 
          onClick={onBoost}
          className="flex-1 py-3 text-green-600 text-sm font-medium flex items-center justify-center hover:bg-green-50 border-l border-r border-gray-100"
        >
          <span className="mr-1">⚡</span> Boost
        </button>
        
        {/* Toggle switch for active/inactive status */}
        <div className="flex-1 py-3 flex items-center justify-center">
          <label 
            htmlFor={`toggle-${id}`}
            className="relative inline-flex items-center cursor-pointer"
          >
            <input 
              type="checkbox" 
              value="" 
              id={`toggle-${id}`}
              checked={isActive}
              onChange={() => toggleOffer(id)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Action buttons */}
        <div className="flex">
          <button 
            onClick={onEdit}
            className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            aria-label="Edit"
          >
            <Edit size={18} />
          </button>
          <button 
            className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;