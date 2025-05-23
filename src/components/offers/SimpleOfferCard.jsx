import React from 'react';
import { Calendar, Clock, Edit, User, ToggleLeft, ToggleRight } from 'lucide-react';
import ViewsIcon from '../icons/ViewsIcon';
import { useApp } from '../../contexts/AppContext';

const SimpleOfferCard = ({ 
  id, 
  title, 
  validTill, 
  type,
  views = 0,
  bookings = 0,
  spins = 0,
  isActive,
  onClick,
  startDate,
  endDate,
  startTime,
  endTime,
  onEdit // Add proper onEdit prop to handle edit actions
}) => {
  const { toggleOffer } = useApp();

  // Format date to more readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Valid until';
    try {
      const date = new Date(dateStr);
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } catch {
      return 'Valid until';
    }
  };

  // Get background color based on offer type
  const getBackgroundColorClass = () => {
    switch(type) {
      case 'happyhours':
        return 'bg-blue-50 border-blue-200';
      case 'spintowin':
        return 'bg-purple-50 border-purple-200';
      case 'spotlight':
      default:
        return 'bg-amber-50 border-amber-200';
    }
  };

  // Get tag color based on offer type
  const getTagColorClass = () => {
    switch(type) {
      case 'happyhours':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'spintowin':
        return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'spotlight':
      default:
        return 'text-amber-700 bg-amber-100 border-amber-200';
    }
  };

  // Get icon color based on offer type
  const getIconColorClass = () => {
    switch(type) {
      case 'happyhours':
        return 'text-blue-600';
      case 'spintowin':
        return 'text-purple-600';
      case 'spotlight':
      default:
        return 'text-amber-600';
    }
  };

  // Get the appropriate stats for the card based on type - simplified version
  const renderStats = () => {
    switch(type) {
      case 'happyhours':
        return (
          <div className="flex items-center text-sm text-gray-600">
            <User size={13} className="mr-1.5" />
            <span>{bookings > 0 ? `${bookings} bookings` : 'No bookings'}</span>
          </div>
        );
      case 'spintowin':
        return (
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-3.5 h-3.5 flex items-center justify-center mr-1.5">🎮</span>
            <span>{spins > 0 ? `${spins} spins` : 'No spins'}</span>
          </div>
        );
      case 'spotlight':
      default:
        return (
          <div className="flex items-center text-sm text-gray-600">
            <ViewsIcon size={13} className="mr-1.5" />
            <span>{views > 0 ? `${views} views` : 'No views'}</span>
          </div>
        );
    }
  };

  // Get the type label
  const getTypeLabel = () => {
    switch(type) {
      case 'happyhours':
        return 'Happy Hour';
      case 'spintowin':
        return 'Spin to Win';
      case 'spotlight':
      default:
        return 'Spotlight';
    }
  };

  return (
    <div 
      className={`rounded-xl border relative shadow-sm ${getBackgroundColorClass()} transition-all hover:shadow-md`}
    >
      {/* Edit button positioned at top right */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="bg-white p-1.5 rounded-full shadow-sm hover:shadow hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) {
              onEdit(id);
            }
          }}
        >
          <Edit size={14} className="text-gray-500" />
        </button>
      </div>
      
      {/* Card content - clickable area */}
      <div className="p-3.5 cursor-pointer" onClick={onClick}>
        <div className="flex flex-col">
          {/* Content section */}
          <div className="w-full">
            {/* Type tag with colored dot */}
            <div className="flex items-start justify-between mb-1">
              <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTagColorClass()} flex items-center`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                  type === 'happyhours' ? 'bg-blue-600' : 
                  type === 'spintowin' ? 'bg-purple-600' : 
                  'bg-amber-600'
                }`}></span>
                {getTypeLabel()}
              </div>
              {isActive && 
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 mr-8">
                  Active
                </span>
              }
            </div>
            
            {/* Title */}
            <h3 className="font-semibold mb-1 line-clamp-2 text-gray-800">{title}</h3>
          
            {/* Only validity period information */}
            <div className="text-xs text-gray-500 mb-2">
              <div className="flex items-center">
                <Calendar size={12} className={`mr-1.5 ${getIconColorClass()}`} />
                <span>Valid: {formatDate(startDate || validTill)} - {formatDate(endDate || validTill)}</span>
              </div>
            </div>
            
            {/* Stats only - no boost button */}
            <div className="flex justify-between items-center">
              {renderStats()}
              
              {/* Toggle switch - styled like in OfferItem */}
              <label 
                className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-auto"
                title={isActive ? "Active: Offer is live" : "Inactive: Offer is paused"}
                onClick={(e) => e.stopPropagation()}
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
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-md"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleOfferCard;