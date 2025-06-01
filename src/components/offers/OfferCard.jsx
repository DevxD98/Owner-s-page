import React, { useState, useRef, useEffect } from 'react';
import { Clock, Edit, Eye, Zap, Trash2, Share2, MoreVertical } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import MultiImageDisplay from './MultiImageDisplay';
import { motion } from 'framer-motion';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const deleteThreshold = -120; // Threshold for deletion (pixels)
  const deleteVelocityThreshold = 500; // Velocity threshold for quick swipes
  
  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Handle drag end to determine if item should be deleted
  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    
    // Check if this was a left swipe that should trigger deletion
    const shouldDelete = 
      offset.x < deleteThreshold || // Dragged far enough
      (offset.x < -60 && velocity.x < -deleteVelocityThreshold); // Quick swipe
    
    if (shouldDelete) {
      // Trigger delete animation
      setIsDeleting(true);
      // Delay actual deletion to allow animation
      setTimeout(() => {
        deleteOffer(id);
      }, 300);
    }
  };
  
  // Handle delete from menu
  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setIsDeleting(true);
    
    // Delay actual deletion to allow animation
    setTimeout(() => {
      deleteOffer(id);
    }, 300);
  };
  
  // Handle share offer
  const handleShare = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description || `Check out this ${type} offer: ${title}`,
        url: window.location.origin + `/preview-offer?id=${id}`
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      const shareUrl = window.location.origin + `/preview-offer?id=${id}`;
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Could not copy link. Try again later."));
    }
  };

  // Drag constraints - only allow horizontal movement to the left
  const dragConstraints = {
    left: -200,
    right: 0,
    top: 0,
    bottom: 0
  };

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
    switch(type) {
      case 'happyhours':
        return 'bg-blue-100';
      case 'spintowin':
        return 'bg-purple-100';
      case 'spotlight':
      default:
        return 'bg-amber-100';
    }
  };
  
  // Helper function to get text color for the offer type
  const getTypeTextColor = () => {
    switch(type) {
      case 'happyhours':
        return 'text-blue-600';
      case 'spintowin':
        return 'text-purple-600';
      case 'spotlight':
      default:
        return 'text-amber-800';
    }
  };
  
  // Active/Inactive status is applied directly in the JSX

  return (
    <div className="relative">
      {/* Delete action background - visible when swiped */}
      <div className="absolute right-0 top-0 bottom-0 w-20 rounded-xl overflow-hidden flex items-center justify-center bg-red-500 z-0">
        <Trash2 className="text-white" size={24} />
      </div>

      {/* Card content with Framer Motion drag */}
      <motion.div
        drag="x"
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
        dragElastic={0.2}
        dragMomentum={false}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-3 max-w-full relative z-10"
        style={{
          touchAction: 'pan-y', // Allow vertical scrolling
        }}
        animate={{
          opacity: isDeleting ? 0 : 1,
          height: isDeleting ? 0 : 'auto',
          marginBottom: isDeleting ? 0 : '0.75rem',
        }}
        transition={{
          duration: isDeleting ? 0.3 : 0,
          ease: 'easeOut'
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
            <div className={`absolute bottom-0 left-0 right-0 text-center py-1.5 ${getTypeBackground()} text-xs font-semibold`}>
              <span className={getTypeTextColor()}>{getTypeLabel()}</span>
            </div>
            {/* Status tag on top of the image */}
            <div className="absolute top-2 left-2">
              <div className={`px-1 py-0.25 text-[9px] font-medium rounded-md ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-500 border border-emerald-100' 
                    : 'bg-slate-50 text-slate-500 border border-slate-200'
                  } whitespace-nowrap shadow-sm`} style={{ lineHeight: '1.2' }}>
                {isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-3/4 flex flex-col">
            <div className="p-3 pb-1 flex-grow flex flex-col justify-between">
              {/* Header with title and three-dot menu */}
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-gray-900 text-base md:text-lg lg:text-xl leading-tight ${type === 'happyhours' ? 'mb-1' : ''}`}>{title}</h3>
                {window.location.pathname === '/offer-management' && (
                  <div className="relative" ref={menuRef}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen);
                      }}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-100 flex-shrink-0"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {/* Dropdown menu */}
                    {menuOpen && (
                      <div className="absolute right-0 top-6 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                        <button 
                          onClick={onEdit}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit size={14} className="mr-2" />
                          Edit
                        </button>
                        <button 
                          onClick={handleDelete}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </button>
                        <button 
                          onClick={handleShare}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Share2 size={14} className="mr-2" />
                          Share
                        </button>
                      </div>
                    )}
                  </div>
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
                      className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-gray-700 text-xs font-medium mx-auto md:block hidden"
                    >
                      <Zap size={14} className="mr-1" />
                      <span>Boost</span>
                    </button>
                    <button 
                      onClick={onBoost}
                      className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-gray-700 text-xs font-medium mx-auto md:hidden"
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
      </motion.div>
    </div>
  );
};

export default OfferCard;
