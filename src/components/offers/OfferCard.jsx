import React, { useState } from 'react';
import { Calendar, Clock, Edit, User, Trash2, ChevronLeft, ChevronRight, Sparkles, Gift } from 'lucide-react';
import ViewsIcon from '../icons/ViewsIcon';
import { useApp } from '../../contexts/AppContext';
import { getOfferImages } from '../../utils/offerThumbnails';
import MultiImageDisplay from './MultiImageDisplay';

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
  images,
  startDate,
  endDate,
  startTime,
  endTime,
  timerValue,
  isSponsored = false
}) => {
  const { toggleOffer } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border border-blue-200';
      case 'spintowin':
        return 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 border border-purple-200';
      case 'spotlight':
      default:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-600 border border-amber-200';
    }
  };

  // Function to render the 3-image grid using MultiImageDisplay component
  const getImageGallery = () => {
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-xl">
        <MultiImageDisplay 
          offerType={type}
          title={title}
          id={id}
          image={image}
          images={images}
          isSponsored={isSponsored}
        />
      </div>
    );
  };

  // Format description to be more concise
  const formatDescription = (text) => {
    return text && text.length > 70 ? `${text.substring(0, 70)}...` : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-md mb-4 overflow-hidden border border-gray-100 transition-shadow hover:shadow-lg">
      {/* Card header with title */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-3">
              {/* Modern gradient icon with animated hover effect */}
              <div className={`w-full h-full flex items-center justify-center shadow-sm transition-all ${
                type === 'happyhours' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700' : 
                type === 'spintowin' 
                  ? 'bg-gradient-to-br from-purple-400 to-purple-700 text-white hover:from-purple-500 hover:to-purple-800' : 
                  'bg-gradient-to-br from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700'
              }`}>
                {type === 'happyhours' ? (
                  <Clock size={24} className="drop-shadow" />
                ) : type === 'spintowin' ? (
                  <Gift size={24} className="drop-shadow" />
                ) : (
                  <Sparkles size={24} className="drop-shadow" />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <div className={`text-xs px-2.5 py-1 rounded-full inline-flex items-center shadow-sm ${getTagColor()}`}>
                {type === 'happyhours' ? (
                  <Clock size={12} className="mr-1.5" />
                ) : type === 'spintowin' ? (
                  <Gift size={12} className="mr-1.5" />
                ) : (
                  <Sparkles size={12} className="mr-1.5" />
                )}
                {getTypeLabel()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Timer for happy hours - enhanced styling */}
        {type === 'happyhours' && timerValue && (
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-orange-50 text-red-600 text-xs font-medium border border-red-100 shadow-sm flex items-center">
            <svg className="mr-1.5 animate-pulse" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {timerValue}
          </div>
        )}
      </div>
      
      {/* Card description with improved styling */}
      <div className="px-4 pb-2">
        <p className="text-sm text-gray-600 leading-relaxed">{formatDescription(description)}</p>
      </div>
      
      {/* Offer Image Gallery */}
      <div className="px-4 pb-3">
        {getImageGallery()}
      </div>
      
      {/* Card actions - modern UI */}
      <div className="flex items-center border-t border-gray-100">
        <button 
          onClick={onView}
          className="flex-1 py-3 text-blue-600 text-sm font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
        >
          <svg 
            className="mr-1.5" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4C7.9 4 4.1 6.91 2.08 11.6C2.03 11.72 2 11.86 2 12C2 12.14 2.03 12.28 2.08 12.4C4.1 17.09 7.9 20 12 20C16.1 20 19.9 17.09 21.92 12.4C21.97 12.28 22 12.14 22 12C22 11.86 21.97 11.72 21.92 11.6ZM12 18C8.83 18 5.83 15.71 4.05 12C5.83 8.29 8.83 6 12 6C15.17 6 18.17 8.29 19.95 12C18.17 15.71 15.17 18 12 18Z" fill="currentColor"/>
            <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
          </svg>
          View
        </button>
        
        <button 
          onClick={onBoost}
          className="flex-1 py-3 text-green-600 text-sm font-medium flex items-center justify-center hover:bg-green-50 transition-colors border-l border-r border-gray-100"
        >
          <svg 
            className="mr-1.5" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
          </svg>
          Boost
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600 shadow-sm"></div>
          </label>
        </div>
        
        {/* Action buttons with improved styling */}
        <div className="flex">
          <button 
            onClick={onEdit}
            className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-full mx-0.5"
            aria-label="Edit"
          >
            <Edit size={18} strokeWidth={2} />
          </button>
          <button 
            className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all rounded-full mx-0.5"
            aria-label="Delete"
          >
            <Trash2 size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;