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
  const deleteThreshold = -160; // More substantial threshold - about half the card width
  
  // Clean up any animations when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Safety mechanism: If the swipeOffset is non-zero and the user isn't actively swiping,
  // make sure to reset it after a short delay (e.g., if a touch event was missed)
  useEffect(() => {
    if (swipeOffset !== 0 && !isDeleting) {
      const resetTimer = setTimeout(() => {
        animateSpringBack();
      }, 500); // Wait 500ms before forcing reset
      
      return () => clearTimeout(resetTimer);
    }
  }, [swipeOffset, isDeleting]);

  // Improved spring animation function with faster initial movement
  const animateSpringBack = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // If there's no offset, no animation needed
    if (swipeOffset === 0) return;

    // If we're past the delete threshold, trigger delete instead of spring back
    if (swipeOffset < deleteThreshold && !isDeleting) {
      animateDelete();
      return;
    }

    let start = null;
    const startOffset = swipeOffset;
    const duration = 200; // Even faster animation for more responsive feel
    
    // Spring back animation with bounce effect
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use a faster initial movement with slight bounce
      const fastSpringBack = (x) => {
        // Faster initial movement (first 70% of the animation)
        if (x < 0.7) {
          return 1 - Math.pow(1 - x/0.7, 2); // Quadratic easing
        } 
        // Small bounce at the end
        const bounceProgress = (x - 0.7) / 0.3;
        return 1 + Math.sin(bounceProgress * Math.PI) * 0.03 * (1 - bounceProgress);
      };
      
      // Calculate new position
      const animationProgress = fastSpringBack(progress);
      const newOffset = startOffset * (1 - animationProgress);
      
      // Apply the new position
      setSwipeOffset(Math.abs(newOffset) < 0.5 ? 0 : newOffset);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        // Ensure we end exactly at 0
        setSwipeOffset(0);
        animationRef.current = null;
      }
    };
    
    // Start animation on next frame
    animationRef.current = requestAnimationFrame(step);
  };

  // Improved delete animation function
  const animateDelete = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Set deleting state immediately
    setIsDeleting(true);
    
    // Start animation values
    let start = null;
    const startOffset = swipeOffset;
    const duration = 200; // Faster animation for better feel
    const targetOffset = -350; // Swipe further off screen for more dramatic effect
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Faster easing function for deletion
      const easeOutQuart = (x) => {
        return 1 - Math.pow(1 - x, 4);
      };
      
      const newOffset = startOffset + (targetOffset - startOffset) * easeOutQuart(progress);
      setSwipeOffset(newOffset);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        // Animation complete, now actually delete the offer
        // Do it immediately for better responsiveness
        deleteOffer(id);
        animationRef.current = null;
      }
    };
    
    // Start animation immediately
    animationRef.current = requestAnimationFrame(step);
  };

  // Enhanced swipe handlers with improved scrolling and deletion
  const handlers = useSwipeable({
    delta: 10, // Minimum swipe distance before triggering
    preventDefaultTouchmoveEvent: false, // Don't prevent default touchmove, which allows scrolling
    trackMouse: false, // Only track touch events
    trackTouch: true, // Track touch events
    rotationAngle: 0, // Don't rotate the directions
    onSwiping: (data) => {
      // Detect if this is primarily a vertical scroll gesture
      const isVerticalScroll = Math.abs(data.deltaY) > Math.abs(data.deltaX) * 1.2;
      
      // If it's a vertical scroll, don't interfere with scrolling at all
      if (isVerticalScroll) {
        return;
      }
      
      // Only process horizontal swipes with a minimum threshold
      if (Math.abs(data.deltaX) < 10) {
        return;
      }
      
      // Once we've started swiping horizontally, continue tracking that movement
      // Cancel any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (data.dir === 'Left') {
        // Only allow swiping left up to -180px
        const newOffset = Math.max(-180, data.deltaX);
        setSwipeOffset(newOffset);
        
        // Only auto-delete on very fast, intentional swipes past halfway
        if (newOffset < deleteThreshold && Math.abs(data.velocity) > 0.8) {
          // If swiping very fast past halfway, trigger delete without waiting for release
          animateDelete();
          return;
        }
      } else if (data.dir === 'Right' && swipeOffset < 0) {
        // Allow swiping back to original position
        const newOffset = Math.min(0, swipeOffset + Math.abs(data.deltaX));
        setSwipeOffset(newOffset);
      }
    },
    onSwipedLeft: (data) => {
      // If we're already deleting, don't do anything else
      if (isDeleting) return;
      
      // Check for significant horizontal movement
      const isSignificantHorizontalSwipe = Math.abs(data.deltaX) > 20;
      
      // Detect if this was primarily a vertical scroll gesture
      const isVerticalScroll = Math.abs(data.deltaY) > Math.abs(data.deltaX) * 1.2;
      
      // If it was mostly a vertical scroll or a very small horizontal swipe, reset card position
      if (isVerticalScroll || !isSignificantHorizontalSwipe) {
        setSwipeOffset(0);
        return;
      }
      
      // Only delete on very deliberate swipes - must be significant and past or near threshold
      if (isSignificantHorizontalSwipe && data.velocity > 0.7 && data.deltaX < -120) {
        animateDelete();
        return;
      }
      
      // Check against threshold for deletion
      if (data.deltaX < deleteThreshold) {
        animateDelete();
      } else {
        // Spring back for partial swipes
        animateSpringBack();
      }
    },
    onSwipedRight: () => {
      // Always spring back to original position
      if (!isDeleting) {
        animateSpringBack();
      }
    },
    // This handler catches all swipe endings
    onSwiped: (data) => {
      // If already deleting, don't interfere
      if (isDeleting) return;
      
      // If this was a tap rather than a swipe (minimal movement), reset immediately
      if (Math.abs(data.deltaX) < 5 && Math.abs(data.deltaY) < 5) {
        setSwipeOffset(0);
        return;
      }
      
      // Always animate back to original position when finger is released
      // unless we've already triggered the delete animation
      animateSpringBack();
    },
    trackMouse: true,
    trackTouch: true, // Ensure touch events are tracked
    preventScrollOnSwipe: false, // IMPORTANT: Allow vertical scrolling
    delta: 8, // Lower threshold for better responsiveness
    swipeDuration: 300, // Allow more time to detect swipes
    touchEventOptions: { passive: true } // Improve touch performance
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
    <div className="relative touch-none">
      {/* Delete action background - visible when swiped */}
      <div 
        className="absolute right-0 top-0 bottom-0 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ 
          backgroundColor: '#f44336',
          width: `${Math.min(80, Math.abs(swipeOffset) * 0.65)}px`,
          opacity: Math.min(1, Math.abs(swipeOffset) / 80),
          transition: 'none', // No transition here for instant feedback
          visibility: swipeOffset < -5 ? 'visible' : 'hidden', // Hide completely when not swiping
          zIndex: 0, // Keep below the card
        }}
      >
        <Trash2 
          className="text-white" 
          size={24} 
          style={{
            transform: `scale(${Math.min(1, Math.abs(swipeOffset) / 100)})`,
            transition: 'none', // No transition for instant feedback
          }}
        />
      </div>

      {/* Card content with swipe animation */}
      <div 
        ref={cardRef}
        {...handlers}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-3 max-w-full"
        style={{ 
          transform: `translateX(${swipeOffset}px)`,
          opacity: isDeleting ? 0 : 1,
          height: isDeleting ? '0' : 'auto',
          marginBottom: isDeleting ? '0' : '0.75rem',
          transition: isDeleting 
            ? 'transform 0.25s ease-out, opacity 0.25s ease-out, height 0.25s ease-out, margin 0.25s ease-out' 
            : 'none', // No transition when not deleting for responsive feel
          willChange: 'transform',
          touchAction: 'pan-y', // Allow vertical scrolling but restrict horizontal to our swipe handler
          userSelect: 'none', // Prevent text selection during swipe
          WebkitOverflowScrolling: 'touch', // Better scroll momentum on iOS
          position: 'relative', // Ensure proper positioning
          zIndex: isDeleting ? 0 : 1, // Keep active cards above deleted ones
        }}
      >
        <div className="flex flex-row h-[160px]">
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
            <div className={`absolute bottom-0 left-0 right-0 text-center py-1 ${getTypeBackground()} text-xs font-semibold ${getTypeTextColor()}`}>
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
          <div className="w-3/4 flex flex-col">
            <div className="p-3 pb-1 flex-grow flex flex-col justify-between">
              {/* Header with title and edit button */}
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-gray-900 text-base md:text-lg lg:text-xl leading-tight ${type === 'happyhours' ? 'mb-1' : ''}`}>{title}</h3>
                {window.location.pathname === '/offer-management' && (
                  <button 
                    onClick={onEdit}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100 flex-shrink-0"
                  >
                    <Edit size={16} />
                  </button>
                )}
              </div>
              
              {/* Description for non-happyhours offer types */}
              {description && type !== 'happyhours' && (
                <p className="text-sm md:text-base text-gray-600 line-clamp-2 mt-1 mb-2">{description}</p>
              )}
              
              {/* Timer for happy hours - enhanced styling */}
              {type === 'happyhours' && timerValue && (
                <div className="py-1.5 text-blue-700 text-sm sm:text-base font-medium flex items-center bg-blue-50 rounded-md px-3 mt-1 shadow-sm">
                  <Clock size={18} className="mr-2 text-blue-600" strokeWidth={2} />
                  <span className="font-semibold tracking-wide">{timerValue}</span>
                </div>
              )}
              
              {/* Empty space to push buttons to bottom */}
              <div className="flex-grow"></div>
            </div>

            {/* Action buttons row - alongside the image */}
            <div className="px-3 py-2 mt-auto border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                {/* Views button - left aligned */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={onView}
                    className="flex items-center justify-center rounded-lg px-2 py-1 text-gray-700 text-xs font-medium"
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
                      className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-gray-700 text-xs font-medium mx-auto"
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
