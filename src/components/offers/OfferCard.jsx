// filepath: /Users/devmondal/Owner-s-page-4/src/components/offers/OfferCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Clock, Edit, Eye, Zap, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import MultiImageDisplay from './MultiImageDisplay';
import { useSwipeable } from 'react-swipeable';

const OfferCard = ({
  id,
  title,
  description,
  validTill,
  type,
  views = 0,
  isActive,
  onEdit,
  onView,
  onBoost,
  image,
  startDate,
  endDate,
  startTime,
  endTime,
  timerValue,
  isSponsored = false
}) => {
  const { toggleOffer, deleteOffer } = useApp();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const deleteThreshold = -100; // Threshold to trigger delete
  
  // Clean up any animations when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Spring animation function
  const animateSpringBack = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let start = null;
    const startOffset = swipeOffset;
    const duration = 300;
    
    // Spring back animation with bounce effect
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Elastic easing function
      const elasticOut = (x) => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0
          ? 0
          : x === 1
          ? 1
          : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
      };
      
      const newOffset = startOffset * (1 - elasticOut(progress));
      setSwipeOffset(newOffset);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setSwipeOffset(0);
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  };

  // Delete animation function
  const animateDelete = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Continue the swipe out animation
    setIsDeleting(true);
    let start = null;
    const startOffset = swipeOffset;
    const duration = 250;
    const targetOffset = -300; // Swipe further off screen
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 3);
      };
      
      const newOffset = startOffset + (targetOffset - startOffset) * easeOutCubic(progress);
      setSwipeOffset(newOffset);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        // Animation complete, now actually delete the offer
        setTimeout(() => {
          deleteOffer(id);
        }, 100);
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  };

  // Enhanced swipe handlers for better mobile responsiveness
  const handlers = useSwipeable({
    onSwiping: (data) => {
      // Cancel any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (data.dir === 'Left') {
        // Only allow swiping left up to -150px
        const newOffset = Math.max(-150, data.deltaX);
        setSwipeOffset(newOffset);
      }
    },
    onSwipedLeft: (data) => {
      if (data.deltaX < deleteThreshold) { // Threshold to trigger delete
        // If swipe is more than threshold, trigger delete animation
        animateDelete();
      } else {
        // Add spring-back animation for partial swipes
        animateSpringBack();
      }
    },
    onSwipedRight: () => {
      // Spring back to original position
      animateSpringBack();
    },
    // This handler catches all swipe endings regardless of direction
    onSwiped: (data) => {
      // If swipe was not far enough to delete, spring back
      if (data.dir === 'Left' && data.deltaX >= deleteThreshold) {
        animateSpringBack();
      }
    },
    trackMouse: true,
    trackTouch: true, // Ensure touch events are tracked
    preventScrollOnSwipe: true,
    delta: 10, // Lower threshold for detecting swipe
    swipeDuration: 500 // Allow more time for swipe
  });

  // Helper function to get the type label
  const getTypeLabel = () => {
    switch(type) {
      case 'happyhours':
        return 'Happy hours';
      case 'spintowin':
        return 'Spin to win';
      case 'spotlight':
      default:
        return 'Spotlight';
    }
  };

  // Helper function to get background color for the offer type
  const getTypeBackground = () => {
    // Using a consistent black glass-like background for all types
    return 'bg-black/50 backdrop-blur-sm';
  };
  
  // Helper function to get text color for the offer type
  const getTypeTextColor = () => {
    switch(type) {
      case 'happyhours':
        return 'text-purple-400';
      case 'spintowin':
        return 'text-teal-400';
      case 'spotlight':
      default:
        return 'text-orange-400';
    }
  };
  
  // Helper function to get active badge color
  const getActiveBadgeColor = () => {
    if (isActive) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="relative">
      {/* Delete action background - visible when swiped */}
      <div 
        className="absolute right-0 top-0 bottom-0 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ 
          backgroundColor: '#f44336',
          width: `${Math.min(80, Math.abs(swipeOffset) * 0.65)}px`,
          opacity: Math.min(1, Math.abs(swipeOffset) / 80),
          transition: isDeleting ? 'all 0.3s ease-out' : 'none',
        }}
      >
        <Trash2 
          className="text-white" 
          size={24} 
          style={{
            transform: `scale(${Math.min(1, Math.abs(swipeOffset) / 100)})`,
            transition: isDeleting ? 'transform 0.3s ease-out' : 'none',
          }}
        />
      </div>

      {/* Card content with swipe animation */}
      <div 
        ref={cardRef}
        {...handlers}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-4 max-w-full"
        style={{ 
          transform: `translateX(${swipeOffset}px)`,
          opacity: isDeleting ? 0 : 1,
          height: isDeleting ? '0' : 'auto',
          marginBottom: isDeleting ? '0' : '1rem',
          transition: isDeleting 
            ? 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, height 0.3s ease-in-out, margin 0.3s ease-in-out' 
            : 'none',
          willChange: 'transform',
          touchAction: 'pan-y'
        }}
      >
        <div className="flex flex-row h-[180px]">
          {/* Left side - Image */}
          <div className="w-1/3 relative h-full flex-shrink-0 overflow-hidden">
            <div className="h-full">
              <MultiImageDisplay 
                offerType={type}
                title={title}
                id={id}
                image={image}
                isSponsored={isSponsored}
              />
            </div>
            {/* Type label at the bottom */}
            <div className={`absolute bottom-0 left-0 right-0 text-center py-1.5 ${getTypeBackground()} text-xs font-semibold ${getTypeTextColor()}`}>
              {getTypeLabel()}
            </div>
            {/* Status tag on top of the image */}
            <div className="absolute top-2 left-2">
              <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${getActiveBadgeColor()} whitespace-nowrap shadow-sm`}>
                {isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-2/3 flex flex-col">
            <div className="p-3 pb-1 flex-grow flex flex-col justify-between">
              {/* Header with title and edit button */}
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base pr-1">{title}</h3>
                {window.location.pathname === '/offer-management' && (
                  <button 
                    onClick={onEdit}
                    className="p-0.5 rounded-full text-gray-500 hover:bg-gray-100 flex-shrink-0"
                  >
                    <Edit size={14} />
                  </button>
                )}
              </div>
              
              {/* Timer for happy hours */}
              {type === 'happyhours' && timerValue && (
                <div className="py-0.5 mb-1.5 text-blue-600 text-xs sm:text-sm font-medium flex items-center">
                  <Clock size={14} className="mr-1.5" />
                  {timerValue}
                </div>
              )}
              
              {/* Description only for non-happy hours */}
              {type !== 'happyhours' && description && (
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1 mb-auto">{description}</p>
              )}
            </div>

            {/* Action buttons row - alongside the image */}
            <div className="px-2 py-2 mt-auto border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {/* Views button - left aligned */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={onView}
                    className="flex items-center justify-center rounded-lg px-1.5 py-1 text-gray-700 text-xs font-medium"
                  >
                    <Eye size={14} className="mr-1" />
                    <span>{views}</span>
                  </button>
                </div>
                
                {/* Boost button - centered */}
                {window.location.pathname === '/offer-management' && (
                  <div className="flex-1 text-center">
                    <button 
                      onClick={onBoost}
                      className="inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-gray-700 text-xs font-medium mx-auto"
                    >
                      <Zap size={14} className="mr-1" />
                      <span>Boost</span>
                    </button>
                  </div>
                )}
                
                {/* Toggle - right aligned */}
                <div className="flex-shrink-0 ml-auto">
                  <label 
                    htmlFor={`toggle-${id}`}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      id={`toggle-${id}`}
                      checked={isActive}
                      onChange={() => toggleOffer(id)}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-md"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
