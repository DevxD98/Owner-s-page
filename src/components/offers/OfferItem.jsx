// filepath: /Users/devmondal/Owner-s-page-3/src/components/offers/OfferItem.jsx
import React from 'react';
import { Edit, ExternalLink, Calendar, ToggleLeft, ToggleRight, AlertCircle, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import HappyHoursTimer from './HappyHoursTimer';
import ViewsIcon from '../icons/ViewsIcon';
import MultiImageDisplay from './MultiImageDisplay';

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
      className={`bg-white rounded-lg border ${isSponsored ? 'border-purple-200' : offerType === 'happyhours' ? 'border-blue-200 hover:border-blue-300' : 'border-gray-100'} ${offerType === 'happyhours' ? 'bg-gradient-to-b from-white to-blue-50/30' : ''} shadow-sm transition-all duration-500 hover:shadow-md group relative ${offerType === 'happyhours' ? 'cursor-pointer' : ''} w-full`}
      onClick={handleOfferClick}
      onMouseEnter={offerType === 'happyhours' ? () => setIsHovered(true) : undefined}
      onMouseLeave={offerType === 'happyhours' ? () => setIsHovered(false) : undefined}
      style={{
        height: (offerType === 'happyhours' && showTimer) || showFullDescription ? 'auto' : 'auto',
        transition: 'height 0.3s ease-in-out',
        minHeight: offerType === 'happyhours' ? '180px' : 'auto',
      }}
    >
      {/* Status Badge - Positioned at top right corner */}
      {!isDraft && (
        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10">
          <span 
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs md:text-xs font-medium ${
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
        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs md:text-xs font-medium bg-amber-50 text-amber-700">
            Draft
          </span>
        </div>
      )}
      
      {/* Improved Mobile-First Layout - Full width cards */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Image section - full width on mobile, left side on desktop */}
        <div className="w-full md:w-24 md:min-w-[6rem] lg:w-32 lg:min-w-[8rem]">
          {/* Multi-image grid layout - matches the screenshot */}
          <div className="relative w-full h-14 md:h-16 rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            {/* Display single image for offer */}
            <MultiImageDisplay 
              offerType={offerType} 
              title={title} 
              id={id}
              image={image}
              isSponsored={isSponsored}
            />
            
            {/* Type Badge - Black glass-like background styling */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-0.5 px-1.5 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 rounded-full mr-1 bg-white animate-pulse"></span>
                <span className="text-2xs font-semibold text-white">
                  {offerType === 'happyhours' ? 'Happy hours' : offerType === 'spintowin' ? 'Spin to win' : 'Spotlight'}
                </span>
              </div>
            </div>
            
            {/* Views indicator with "Views" label */}
            <div className={`absolute top-0 left-0 px-1.5 py-0.5 text-xs font-medium flex items-center ${
              views > 0 
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-gray-50 text-gray-500'
            } ${showViewsAnimation ? 'animate-pulse' : ''} rounded-br-md shadow-sm`}>
              <ViewsIcon size={8} className="mr-1 flex-shrink-0 text-indigo-500" />
              <span>
                {views > 0 ? views.toLocaleString() : '0'} Views
                {isBoosted && boostedViews > 0 && (" (+" + boostedViews + ")")}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content section - full width with proper spacing and padding */}
        <div className={`flex-1 p-3 flex flex-col justify-between ${offerType === 'happyhours' ? 'min-h-[160px]' : 'min-h-[100px] md:min-h-[130px]'}`}>
          {/* Title area with proper spacing */}          
          <div className="flex flex-wrap items-center gap-1 w-full">
            <h3 className={`font-medium ${offerType === 'happyhours' ? 'text-lg md:text-xl mb-2' : 'text-sm md:text-base'} break-words w-full ${isSponsored ? 'text-purple-800' : offerType === 'happyhours' ? 'text-blue-700' : 'text-gray-800'} transition-colors`}>
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
            <div className={`mb-auto mt-1 relative ${offerType === 'happyhours' ? 'max-h-12 overflow-hidden' : ''}`}>
              <p
                ref={descriptionRef}
                className={`text-gray-600 text-xs md:text-sm transition-all duration-300 ease-in-out ${
                  (showFullDescription || type === 'spintowin') && offerType !== 'happyhours'
                    ? type === 'spintowin' ? 'line-clamp-2 md:line-clamp-3' : '' 
                    : offerType === 'happyhours' ? 'line-clamp-1' : 'line-clamp-2'
                }`}
              >
                {description}
              </p>
              
              {/* Read more/less button - hide for happy hours */}
              {descriptionOverflows && type !== 'spintowin' && offerType !== 'happyhours' && (
                <button 
                  onClick={handleToggleDescription}
                  className="text-blue-500 hover:text-blue-700 text-xs mt-1 font-medium focus:outline-none transition-colors duration-200 flex items-center"
                >
                  {showFullDescription ? (
                    <>
                      Show Less
                      <ChevronUp size={10} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown size={10} className="ml-1" />
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
              className={`transition-all duration-500 ease-in-out mt-1 ${
                showTimer ? 'block opacity-100' : 'hidden opacity-0 h-0'
              }`}
              style={{ 
                height: showTimer ? 'auto' : '0',
                minHeight: showTimer ? '40px' : '0'
              }}
            >
              <HappyHoursTimer
                startTime={startTime}
                endTime={endTime}
                validityDate={validityDate || validTill}
                startDate={startDate}
                className="mx-1"
              />
              {(!startTime || !endTime || !validityDate || !startDate) && (
                <div className="text-xs text-amber-600">
                  <p>⚠️ Missing timer data</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex-grow"></div>
          
          {/* Offer details area with better mobile spacing */}
          <div className={`pt-1 border-t border-gray-100 ${offerType === 'happyhours' ? 'mt-auto' : 'mt-2'}`}>
            {type === 'happyhours' ? (
              <>
                {showDetailedInfo ? (
                  <div className="flex items-center justify-between text-2xs md:text-xs text-gray-600 flex-wrap gap-y-1">
                    <div className="flex items-center mr-2">
                      <Clock size={10} className="mr-1 flex-shrink-0 text-blue-500" />
                      <span className="truncate">Hours: {startTime || "Undefined"} - {endTime || "Undefined"}</span>
                    </div>
                    <button 
                      className={`flex items-center text-blue-500 text-2xs md:text-xs font-medium bg-blue-50 px-1.5 py-0.5 rounded-full transition-colors hover:bg-blue-100 border border-blue-200 shadow-sm ${isHovered && !showTimer ? 'animate-pulse' : ''}`}
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
                        <ChevronUp size={12} className="text-blue-500" /> : 
                        <ChevronDown size={12} className="text-blue-500" />
                      }
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-2xs md:text-xs flex-wrap gap-y-1">
                    <div className="flex items-center mr-2 text-gray-600">
                      <Clock size={10} className="mr-1 flex-shrink-0 text-blue-500" />
                      <span className="truncate font-medium">Happy Hours Offer</span>
                    </div>
                    <button 
                      className={`flex items-center text-blue-500 text-2xs md:text-xs font-medium bg-blue-50 px-1.5 py-0.5 rounded-full transition-colors hover:bg-blue-100 border border-blue-200 shadow-sm ${isHovered ? 'animate-pulse' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Timer button clicked (simple view)");
                        setShowTimer(true);
                      }}
                      type="button"
                    >
                      <span className="mr-1">Show Timer</span>
                      <ChevronDown size={12} className="text-blue-500" />
                    </button>
                  </div>
                )}
                <div className="flex items-center text-2xs md:text-xs text-gray-600 mt-1">
                  <Calendar size={10} className="mr-1 flex-shrink-0 text-blue-500" />
                  {(startDate && (validityDate || validTill)) ? (
                    <span className="truncate">Valid: {formatDate(startDate)} - {formatDate(validityDate || validTill)}</span>
                  ) : (
                    <span className="truncate text-amber-600">Period: Undefined</span>
                  )}
                </div>
              </>
            ) : type === 'spintowin' ? (
              <>
                <div className="flex items-center justify-between text-2xs md:text-xs text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={10} className="mr-1 flex-shrink-0 text-purple-500" />
                    <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between text-2xs md:text-xs text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={10} className="mr-1 flex-shrink-0 text-amber-500" />
                    <span className="truncate">Valid: {startDate ? formatDate(startDate) : "Undefined"} - {(validTill || validityDate) ? formatDate(validTill || validityDate) : "Undefined"}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Action buttons with better layout on mobile */}
          <div className={`${offerType === 'happyhours' ? 'mt-2' : 'mt-2'} pt-1 flex items-center justify-between flex-wrap gap-y-1`}>
            <div className="flex gap-1.5">
              <button 
                className="flex items-center justify-center p-1 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all shadow-sm"
                title="Edit offer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                <Edit size={12} />
              </button>
              <button 
                className="flex items-center justify-center p-1 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all shadow-sm"
                title="Preview offer"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview();
                }}
              >
                <ExternalLink size={12} />
              </button>
            </div>
            
            <div className="flex items-center">
              {/* Boost button with enhanced design */}
              {showBoostButton && (
                <button 
                  className="flex items-center justify-center px-2 py-1 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md transition-all text-2xs md:text-xs font-medium shadow-sm mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBoost();
                  }}
                  title="Increase visibility for this offer"
                >
                  <Zap size={10} className="mr-0.5 flex-shrink-0" />
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
                  <div className={`w-8 h-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all bg-gray-200 peer-checked:bg-blue-500 shadow-inner`}></div>
                  <span className="ml-1 text-2xs md:text-xs font-medium text-gray-600">
                    {isActive ? 'On' : 'Off'}
                  </span>
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
