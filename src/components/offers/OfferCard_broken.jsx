// filepath: /Users/devmondal/Owner-s-page-4/src/components/offers/OfferCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Clock, Edit, Eye, Zap, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import MultiImageDisplay from './MultiImageDisplay';
import { useSwipeable } from 'react-swipeable';

// Function to detect mobile browser
const isMobileBrowser = () => {
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80    // Enhanced mobile detection regex including tablets
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent.toLowerCase()) ||
           // Additional check for touch devices
           ('ontouchstart' in window) ||
           // Check for small screen sizes (mobile-like)
           (window.innerWidth <= 768);
  }
  return false;
};

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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  
  const deleteThreshold = -160; // More substantial threshold - about half the card width
  
  // Detect mobile browser on component mount and handle screen size changes
  useEffect(() => {
    const checkMobileStatus = () => {
      const isMobileDevice = isMobileBrowser();
      setIsMobile(isMobileDevice);
    };

    // Check on mount
    checkMobileStatus();
    
    // Add resize listener to handle orientation changes and window resizing
    window.addEventListener('resize', checkMobileStatus);
    window.addEventListener('orientationchange', checkMobileStatus);
    
    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', checkMobileStatus);
      window.removeEventListener('orientationchange', checkMobileStatus);
    };
  }, []);
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

  // Enhanced swipe handlers with improved mobile scrolling compatibility
  // Use custom touch handling on mobile for better scroll compatibility
  
  // Custom touch handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setTouchEnd(null);
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Determine if this is vertical scrolling or horizontal swiping
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // If vertical movement is dominant, allow natural scrolling
    if (absDeltaY > absDeltaX || absDeltaY > 20) {
      // Reset any existing swipe state and allow scrolling
      if (swipeOffset !== 0) {
        setSwipeOffset(0);
      }
      setIsDragging(false);
      return;
    }
    
    // Only start horizontal swipe if movement is clearly horizontal
    if (absDeltaX > 30 && absDeltaY < 15) {
      setIsDragging(true);
      
      // Prevent scrolling only when we're sure it's a horizontal swipe
      e.preventDefault();
      
      // Update swipe offset for left swipe only
      if (deltaX < 0) {
        const newOffset = Math.max(-180, deltaX);
        setSwipeOffset(newOffset);
        
        setTouchEnd({
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now()
        });
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart) return;
    
    if (!isDragging || !touchEnd) {
      // No significant horizontal movement, reset
      setSwipeOffset(0);
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
      return;
    }
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const deltaTime = touchEnd.time - touchStart.time;
    const velocity = Math.abs(deltaX) / deltaTime;
    
    // Check if this was a delete gesture
    const isLeftSwipe = deltaX < -80;
    const hasGoodVelocity = velocity > 0.5;
    const hasMinimalVerticalMovement = Math.abs(deltaY) < 20;
    
    if (isLeftSwipe && hasMinimalVerticalMovement && (deltaX < deleteThreshold || hasGoodVelocity)) {
      animateDelete();
    } else {
      animateSpringBack();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  // Desktop swipe handlers (using react-swipeable)
  // Use the handlers only on desktop (isMobile check is done inside the handlers)
  const handlers = !isMobile ? swipeableHandlers : {};

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
        {...handlers} // Apply desktop swipe handlers
        onTouchStart={handleTouchStart} // Mobile touch handlers
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
          touchAction: 'pan-y', // Always allow vertical panning (scrolling) for better mobile experience
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
