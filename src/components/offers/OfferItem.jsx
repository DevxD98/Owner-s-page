// filepath: /Users/devmondal/Owner-s-page-3/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
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
  isBoosted,  
  boostedViews = 0,
  views = 0, 
  showBoostButton = false, 
  type,
  startTime,
  endTime,
  validityDate,
  startDate,
  showDetailedInfo = true, // Add new prop with default true to maintain backward compatibility
  initialShowTimer = false // Control initial timer visibility - default false to ensure timer is hidden by default
}) => {
  // Add a state to handle animation for views counter
  const [showViewsAnimation, setShowViewsAnimation] = React.useState(true);
  // Add state to toggle timer display for happy hours offers - always initialize as false to ensure timer is hidden by default
  const [showTimer, setShowTimer] = React.useState(false);
  // Add hover state to enhance the visual feedback for happy hours offers
  const [isHovered, setIsHovered] = React.useState(false);
  // Add state to toggle description expansion
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const descriptionRef = React.useRef(null);
  const [descriptionOverflows, setDescriptionOverflows] = React.useState(false);
  
  // After component mount, turn off the animation effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowViewsAnimation(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // After component mount, check if description overflows to know if we need to show the "read more" option
  // Skip this check for spintowin offers as they don't need the read more functionality
  React.useEffect(() => {
    if (descriptionRef.current && type !== 'spintowin') {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setDescriptionOverflows(isOverflowing);
    } else if (type === 'spintowin') {
      setDescriptionOverflows(false); // Ensure we never show read more for spintowin
    }
  }, [description, type]);
  
  // Set max-height based on the content to ensure consistent sizing
  const [timerHeight, setTimerHeight] = React.useState(100); // Default height to ensure visibility
  const timerRef = React.useRef(null);
  
  // Update timer height whenever showTimer changes or component mounts
  React.useEffect(() => {
    if (timerRef.current) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        const height = timerRef.current.scrollHeight;
        console.log("Timer height calculated:", height);
        setTimerHeight(Math.max(height, 100)); // Ensure minimum height
      }, 50); // Slightly longer timeout for better reliability
    }
  }, [showTimer]);
  // Log props received for debugging purposes
  console.log("OfferItem props for " + title + ":", { 
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
  
  // Handler for clicking on the offer item to toggle timer (for happy hours offers)
  const handleOfferClick = (e) => {
    // Only toggle if the click is directly on the offer container, not on buttons or other interactive elements
    if (offerType === 'happyhours' && e.target === e.currentTarget) {
      console.log("Offer clicked directly, toggling timer");
      setShowTimer(prev => !prev);
    }
  };
  
  const handleEdit = () => {
    // Navigate to create-offer page with the offer ID for editing
    navigate("/create-offer?id=" + id);
  };
  
  const handlePreview = () => {
    navigate("/preview-offer?id=" + id);
  };
  
  const handleBoost = () => {
    // Navigate to boost offer page
    navigate("/boost-offer?id=" + id);
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

  // Toggle description expansion
  const handleToggleDescription = (e) => {
    e.stopPropagation();
    setShowFullDescription(prev => !prev);
  };

  return (
    <div 
      className={`bg-white rounded-lg border ${isSponsored ? 'border-purple-200' : offerType === 'happyhours' ? 'border-blue-100 hover:border-blue-300' : 'border-gray-100'} shadow-sm transition-all duration-500 hover:shadow-md group relative ${offerType === 'happyhours' ? 'cursor-pointer' : ''} w-full`}
      onClick={handleOfferClick}
      onMouseEnter={offerType === 'happyhours' ? () => setIsHovered(true) : undefined}
      onMouseLeave={offerType === 'happyhours' ? () => setIsHovered(false) : undefined}
      style={{
        height: (offerType === 'happyhours' && showTimer) || showFullDescription ? 'auto' : 'auto',
        transition: 'height 0.3s ease-in-out'
      }}
    >
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
      
      {/* Improved Mobile-First Layout - Full width cards */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Image section - full width on mobile, left side on desktop */}
        <div className="w-full md:w-28 md:min-w-[7rem] lg:w-36 lg:min-w-[9rem]">
          <div className="relative w-full h-40 md:h-full md:min-h-[140px] rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            {displayImage ? (
              <img 
                src={displayImage} 
                alt={title} 
                className="w-full h-full object-cover"
                loading="lazy"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.log("Error loading image for offer " + id, e);
                  e.target.onerror = null; // Prevent infinite fallback loop
                  
                  // Create different fallback SVGs based on offer type
                  let fallbackSvg;
                  if (offerType === 'happyhours') {
                    fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='%23dbeafe'/%3E%3Ccircle cx='50' cy='45' r='25' fill='%2393c5fd'/%3E%3Cpath d='M40 55 L60 55 L65 70 L35 70 Z' fill='%233b82f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' fill='%23ffffff'%3EHAPPY%3C/text%3E%3Ctext x='50' y='64' font-family='Arial' font-size='10' text-anchor='middle' fill='%23ffffff'%3EHOURS%3C/text%3E%3C/svg%3E";
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
              <div className={`w-full h-full flex items-center justify-center bg-white ${
                isSponsored 
                  ? 'border-purple-200' 
                  : offerType === 'happyhours' 
                    ? 'border-blue-200'
                    : offerType === 'spintowin'
                      ? 'border-purple-200'
                      : 'border-amber-200'
              }`}>
                <span className={`text-2xl font-bold ${
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

            {/* Type Badge - Better highlighted on the image */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 py-1.5 px-2 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <span className={`w-2.5 h-2.5 rounded-full mr-1.5 ${
                  offerType === 'happyhours' 
                    ? 'bg-blue-400' 
                    : offerType === 'spintowin'
                      ? 'bg-purple-400'
                      : 'bg-amber-400'
                } animate-pulse`}></span>
                <span className={`text-2xs font-semibold ${
                  offerType === 'happyhours' 
                    ? 'text-blue-100' 
                    : offerType === 'spintowin'
                      ? 'text-purple-100'
                      : 'text-amber-100'
                }`}>
                  {offerType === 'happyhours' ? 'Happy hours' : offerType === 'spintowin' ? 'Spin to win' : 'Spotlight'}
                </span>
              </div>
            </div>
            
            {/* Views indicator with "Views" label */}
            <div className={`absolute top-0 left-0 px-2 py-1 text-xs font-medium flex items-center ${
              views > 0 
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-gray-50 text-gray-500'
            } ${showViewsAnimation ? 'animate-pulse' : ''} rounded-br-md shadow-sm`}>
              <ViewsIcon size={10} className="mr-1 flex-shrink-0 text-indigo-500" />
              <span>
                {views > 0 ? views.toLocaleString() : '0'} Views
                {isBoosted && boostedViews > 0 && (" (+" + boostedViews + ")")}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content section - full width with proper spacing and padding */}
        <div className="flex-1 p-4 flex flex-col justify-between min-h-[140px]">
          {/* Title area with proper spacing */}          
          <div className="flex flex-wrap items-center gap-1 w-full">
            <h3 className={`font-medium text-base md:text-lg break-words w-full ${isSponsored ? 'text-purple-800' : 'text-gray-800'} transition-colors`}>
              {title}
              {isSponsored && (
                <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Ad
                </span>
              )}
            </h3>
          </div>
          
          {/* Description with better spacing */}
          {description && (
            <div className="mb-auto mt-2 relative">
              <p
                ref={descriptionRef}
                className={`text-gray-600 text-sm mt-1 transition-all duration-300 ease-in-out ${
                  showFullDescription || type === 'spintowin'
                    ? type === 'spintowin' ? 'line-clamp-3 md:line-clamp-4' : '' 
                    : offerType === 'happyhours' ? 'line-clamp-2 md:line-clamp-3' : 'line-clamp-2'
                }`}
              >
                {description}
              </p>
              
              {/* Read more/less button */}
              {descriptionOverflows && type !== 'spintowin' && (
                <button 
                  onClick={handleToggleDescription}
                  className="text-blue-500 hover:text-blue-700 text-xs mt-1.5 font-medium focus:outline-none transition-colors duration-200 flex items-center"
                >
                  {showFullDescription ? (
                    <>
                      Show Less
                      <ChevronUp size={12} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown size={12} className="ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          
          {/* Happy Hours Timer with proper spacing */}
          {offerType === 'happyhours' && showDetailedInfo && (
            <div 
              ref={timerRef}
              className={`transition-all duration-500 ease-in-out my-2 ${
                showTimer ? 'block opacity-100' : 'hidden opacity-0 h-0'
              }`}
              style={{ 
                height: showTimer ? 'auto' : '0',
                minHeight: showTimer ? '70px' : '0'
              }}
            >
              <HappyHoursTimer
                startTime={startTime}
                endTime={endTime}
                validityDate={validityDate || validTill}
                startDate={startDate}
              />
              {(!startTime || !endTime || !validityDate || !startDate) && (
                <div className="mt-1 text-xs text-amber-600">
                  <p>⚠️ Missing timer data</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex-grow"></div>
          
          {/* Offer details area with better mobile spacing */}
          <div className="pt-2 border-t border-gray-100 mt-3">
            {type === 'happyhours' ? (
              <>
                {showDetailedInfo ? (
                  <div className="flex items-center justify-between text-xs text-gray-600 flex-wrap gap-y-2">
                    <div className="flex items-center mr-2">
                      <Clock size={12} className="mr-1.5 flex-shrink-0 text-blue-500" />
                      <span className="truncate">Hours: {startTime || "Undefined"} - {endTime || "Undefined"}</span>
                    </div>
                    <button 
                      className={`flex items-center text-blue-500 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full transition-colors hover:bg-blue-100 border border-blue-200 shadow-sm ${isHovered && !showTimer ? 'animate-pulse' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Timer button clicked, current state:", showTimer);
                        setShowTimer(!showTimer);
                      }}
                      type="button"
                    >
                      <span className="mr-1">{showTimer ? 'Hide Timer' : 'Show Timer'}</span>
                      {showTimer ? 
                        <ChevronUp size={14} className="text-blue-500" /> : 
                        <ChevronDown size={14} className="text-blue-500" />
                      }
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs flex-wrap gap-y-2">
                    <div className="flex items-center mr-2 text-gray-600">
                      <Clock size={12} className="mr-1.5 flex-shrink-0 text-blue-500" />
                      <span className="truncate">Happy Hours Offer</span>
                    </div>
                    <button 
                      className={`flex items-center text-blue-500 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full transition-colors hover:bg-blue-100 border border-blue-200 shadow-sm ${isHovered ? 'animate-pulse' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Timer button clicked (simple view)");
                        setShowTimer(true);
                      }}
                      type="button"
                    >
                      <span className="mr-1">Show Timer</span>
                      <ChevronDown size={14} className="text-blue-500" />
                    </button>
                  </div>
                )}
                <div className="flex items-center text-xs text-gray-600 mt-2">
                  <Calendar size={12} className="mr-1.5 flex-shrink-0 text-blue-500" />
                  {(startDate && (validityDate || validTill)) ? (
                    <span className="truncate">Valid: {formatDate(startDate)} - {formatDate(validityDate || validTill)}</span>
                  ) : (
                    <span className="truncate text-amber-600">Period: Undefined</span>
                  )}
                </div>
              </>
            ) : type === 'spintowin' ? (
              <>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1.5 flex-shrink-0 text-purple-500" />
                    <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1.5 flex-shrink-0 text-amber-500" />
                    <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Action buttons with better layout on mobile */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-y-2">
            <div className="flex gap-2">
              <button 
                className="flex items-center justify-center p-1.5 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all shadow-sm"
                title="Edit offer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                <Edit size={14} />
              </button>
              <button 
                className="flex items-center justify-center p-1.5 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all shadow-sm"
                title="Preview offer"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview();
                }}
              >
                <ExternalLink size={14} />
              </button>
            </div>
            
            <div className="flex items-center">
              {/* Boost button with enhanced design */}
              {showBoostButton && (
                <button 
                  className="flex items-center justify-center px-3 py-1.5 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md transition-all text-xs font-medium shadow-sm mr-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBoost();
                  }}
                  title="Increase visibility for this offer"
                >
                  <Zap size={12} className="mr-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">Boost</span>
                </button>
              )}
              
              {/* Toggle switch with better position */}
              {!isDraft && (
                <label 
                  className="relative inline-flex items-center cursor-pointer flex-shrink-0"
                  title={isActive ? "Active: Offer is live" : "Inactive: Offer is paused"}
                >
                  <input 
                    type="checkbox" 
                    checked={isActive}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleOffer(id);
                    }}
                    className="sr-only peer" 
                  />
                  <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all bg-gray-200 peer-checked:bg-blue-600`}></div>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
