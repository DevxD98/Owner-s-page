// filepath: /Users/devmondal/Downloads/project 10/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle, Clock, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import HappyHoursTimer from './HappyHoursTimer';
import ViewsIcon from '../icons/ViewsIcon';

const OfferItem = ({ 
  id, 
  title, 
  validTill, 
  isActive, 
  description, 
  image, 
  imagePreview,
  isDraft, 
  isSponsored, 
  views = 0, 
  showBoostButton = false, 
  type,
  startTime,
  endTime,
  validityDate,
  startDate,
  showDetailedInfo = true // Add new prop with default true to maintain backward compatibility
}) => {
  // Add a state to handle animation for views counter
  const [showViewsAnimation, setShowViewsAnimation] = React.useState(true);
  
  // After component mount, turn off the animation effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowViewsAnimation(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  // Log props received for debugging purposes
  console.log(`OfferItem props for "${title}":`, { 
    id, 
    title, 
    validTill, 
    isActive, 
    type, 
    startTime, 
    endTime, 
    validityDate, 
    startDate,
    hasImage: !!image,
    hasImagePreview: !!imagePreview
  });
  
  // Make sure type is always defined, fallback to 'spotlight' if undefined
  const offerType = type || 'spotlight';
  const { toggleOffer } = useApp();
  const navigate = useNavigate();
  
  // Use image or imagePreview or null (in that order)
  const displayImage = image || imagePreview || null;
  
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
  
  // Format date to more readable format without showing the year
  const formatDate = (dateStr) => {
    if (!dateStr) {
      return 'Undefined';
    }
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 pt-5 md:p-5 md:pt-6 border ${isSponsored ? 'border-purple-200' : 'border-gray-100'} shadow-sm transition-all duration-300 hover:shadow-md group relative`}>
      {/* Status Badge - Positioned at top right corner */}
      {!isDraft && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive 
                ? isSponsored ? 'bg-purple-100 text-purple-800' : 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      )}
      {isDraft && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
            Draft
          </span>
        </div>
      )}
      <div className="flex items-start gap-3 md:gap-4">
        {/* Image and Views section */}
        <div className="flex flex-col items-center">
          {/* Image or placeholder - Keep square aspect ratio only on mobile, use rectangular on desktop */}
          <div className="w-16 h-16 md:w-20 md:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-inner">
            {displayImage ? (
              <img 
                src={displayImage} 
                alt={title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  console.log(`Error loading image for offer ${id}`, e);
                  e.target.onerror = null; // Prevent infinite fallback loop
                  
                  // Create different fallback SVGs based on offer type
                  let fallbackSvg;
                  if (offerType === 'happyhours') {
                    fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23dbeafe'/%3E%3Ccircle cx='50' cy='45' r='25' fill='%2393c5fd'/%3E%3Cpath d='M40 55 L60 55 L65 70 L35 70 Z' fill='%233b82f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' fill='%23ffffff'%3EHAPPY%3C/text%3E%3Ctext x='50' y='64' font-family='Arial' font-size='10' text-anchor='middle' fill='%23ffffff'%3EHOURS%3C/text%3E%3C/svg%3E";
                  } else if (offerType === 'spintowin') {
                    fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3e8ff'/%3E%3Ccircle cx='50' cy='50' r='30' fill='%23ddd6fe' stroke='%238b5cf6' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%238b5cf6'/%3E%3Cpath d='M50 50 L50 20' stroke='%238b5cf6' stroke-width='2'/%3E%3Ctext x='50' y='86' font-family='Arial' font-size='10' text-anchor='middle' fill='%238b5cf6'%3ESPIN TO WIN%3C/text%3E%3C/svg%3E";
                  } else {
                    // Default spotlight fallback
                    fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23fef3c7'/%3E%3Cpath d='M50 20 L60 40 L80 45 L60 60 L65 80 L50 70 L35 80 L40 60 L20 45 L40 40 Z' fill='%23fbbf24'/%3E%3C/svg%3E";
                  }
                  
                  e.target.src = fallbackSvg;
                }}
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isSponsored 
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100' 
                  : offerType === 'happyhours' 
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100'
                    : offerType === 'spintowin'
                      ? 'bg-gradient-to-br from-purple-50 to-purple-100'
                      : 'bg-gradient-to-br from-amber-50 to-amber-100'
              }`}>
                <span className={`text-sm font-bold ${
                  isSponsored 
                    ? 'text-purple-500' 
                    : offerType === 'happyhours'
                      ? 'text-blue-500'
                      : offerType === 'spintowin'
                        ? 'text-purple-500'
                        : 'text-amber-500'
                }`}>{title.substring(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>
          
          {/* Views counter positioned below image - styled similar to boost page */}
          <div className={`mt-1 px-2.5 py-0.5 rounded-full text-2xs md:text-xs font-medium flex items-center w-max ${
            views > 0 
              ? 'bg-indigo-100 text-indigo-600 shadow-sm' 
              : 'bg-gray-50 text-gray-500'
          } ${showViewsAnimation ? 'animate-pulse' : ''}`}
          style={views > 0 ? { boxShadow: '0 0 0 1px rgba(79, 70, 229, 0.1)' } : {}}>
            <ViewsIcon size={10} className="mr-1.5 flex-shrink-0 text-indigo-500" />
            <span>{views > 0 ? `+${views.toLocaleString()} views` : '0 views'}</span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1 mb-1.5">
            {offerType && (
              <div className="text-xs text-gray-600 font-medium flex items-center">
                <span className={`inline-flex items-center justify-center w-2 h-2 mr-1.5 rounded-full ${
                  offerType === 'happyhours' 
                    ? 'bg-blue-500' 
                    : offerType === 'spintowin'
                      ? 'bg-purple-500'
                      : 'bg-amber-500'
                }`}></span>
                {offerType === 'happyhours' ? 'Happy hours' : offerType === 'spintowin' ? 'Spin to win!' : 'Spotlight'}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-1 w-full">
            <h3 className={`font-semibold text-base md:text-lg break-words w-full ${isSponsored ? 'text-purple-800 group-hover:text-purple-600' : 'text-gray-800 group-hover:text-amber-600'} transition-colors`}>
              {title}
              {isSponsored && (
                <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Ad
                </span>
              )}
            </h3>
          </div>
          
          {description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
          )}
          
          {/* Display Happy Hours Timer for happy hours offers - only when showDetailedInfo is true */}
          {offerType === 'happyhours' && showDetailedInfo && (
            <div className="mt-2 mb-1">
              <HappyHoursTimer
                startTime={startTime}
                endTime={endTime}
                validityDate={validityDate || validTill}
                startDate={startDate}
              />
              {(!startTime || !endTime || !validityDate || !startDate) && (
                <div className="mt-1 text-xs text-amber-600">
                  <p>⚠️ Missing timer data. Some fields are undefined.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-col mt-2">
            {type === 'happyhours' ? (
              <>
                {showDetailedInfo ? (
                  // Show detailed happy hours info only when showDetailedInfo is true
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">Hours: {startTime || "Undefined"} - {endTime || "Undefined"}</span>
                  </div>
                ) : (
                  // Show simplified info - just indicate it's a happy hours offer when on home page
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">Happy Hours Offer</span>
                  </div>
                )}
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar size={12} className="mr-1 flex-shrink-0" />
                  {(startDate && (validityDate || validTill)) ? (
                    <span className="truncate">Valid: {formatDate(startDate)} - {formatDate(validityDate || validTill)}</span>
                  ) : (
                    <span className="truncate text-amber-600">Period: Undefined</span>
                  )}
                </div>
              </>
            ) : type === 'spintowin' ? (
              <>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1 flex-shrink-0" />
                  <span className="truncate">Spin to Win Offer</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar size={12} className="mr-1 flex-shrink-0" />
                  <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1 flex-shrink-0" />
                  <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                </div>
              </>
            )}
          </div>
          
          {/* Views display is now shown under status tag */}
          
          {/* Action buttons - optimized for mobile */}
          <div className="mt-4 md:mt-5 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 justify-between">
            {/* Left bottom: Edit and Preview */}
            <div className="flex gap-2">
              <button 
                className={`flex items-center justify-center p-2 md:p-2.5 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-md hover:shadow-lg border border-gray-200`}
                title="Edit offer"
                onClick={handleEdit}
                style={{ width: 36, height: 36 }}
              >
                <Edit size={16} />
              </button>
              <button 
                className={`flex items-center justify-center p-2 md:p-2.5 text-gray-500 ${isSponsored ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-indigo-600 hover:bg-indigo-50'} rounded-md transition-colors shadow-md hover:shadow-lg border border-gray-200`}
                title="Preview offer"
                onClick={handlePreview}
                style={{ width: 36, height: 36 }}
              >
                <ExternalLink size={16} />
              </button>
            </div>
            
            {/* Center: Boost Offer button */}
            {showBoostButton && (
              <button 
                className="flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md transition-all text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
                style={{ height: 36, minWidth: 90 }}
                onClick={handleBoost}
                title="Increase visibility for this offer"
              >
                <Zap size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">Boost</span>
              </button>
            )}
            
            {/* Right: Toggle switch */}
            {!isDraft && (
              <label 
                className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-auto"
                title={isActive ? "Active: Offer is live" : "Inactive: Offer is paused"}
              >
                <input 
                  type="checkbox" 
                  checked={isActive}
                  onChange={() => toggleOffer(id)}
                  className="sr-only peer" 
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-md"></div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
