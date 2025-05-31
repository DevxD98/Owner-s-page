import React from 'react';
import { Clock, Eye, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import HomeMultiImageDisplay from './HomeMultiImageDisplay';

const HomeOfferCard = ({
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
  const { toggleOffer } = useApp();

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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-3">
      <div className="flex flex-row h-[130px]">
        {/* Left side - Image */}
        <div className="w-1/3 relative h-full">
          <div className="h-full">
            <HomeMultiImageDisplay 
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
          <div className="absolute top-1.5 left-1.5">
            <div className={`px-1 py-0.25 text-[9px] font-medium rounded-md ${
              isActive 
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-500 border border-emerald-100' 
                : 'bg-slate-50 text-slate-500 border border-slate-200'
              } whitespace-nowrap shadow-sm`} style={{ lineHeight: '1.2' }}>
              {isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>          {/* Right side - Content */}
        <div className="w-2/3 flex flex-col">
          <div className="p-2.5 flex-grow h-full flex flex-col justify-between">
            {/* Header with title and status tag on right */}
            <div className="flex justify-between items-start">
              <h3 className={`font-bold text-gray-900 text-base line-clamp-1 ${type === 'happyhours' ? 'mb-0.5' : ''}`}>{title}</h3>
            </div>
            
            {/* Description for non-happyhours offer types with ellipsis truncation */}
            {description && type !== 'happyhours' && (
              <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap mt-0.5">{description}</p>
            )}
            
            {/* Timer for happy hours - enhanced styling */}
            {type === 'happyhours' && timerValue && (
              <div className="py-1.5 text-blue-700 text-sm font-medium flex items-center justify-center bg-blue-50 rounded px-2.5 mt-1 shadow-sm w-full">
                <Clock size={16} className="mr-1.5 text-blue-600" strokeWidth={2.5} />
                <span className="font-semibold">{timerValue}</span>
              </div>
            )}
            
            {/* Add spacer to push views to bottom */}
            <div className="flex-grow min-h-[4px]"></div>
          </div>

          {/* Action buttons row - alongside the image */}
          <div className="px-2.5 py-1.5 mt-auto border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              {/* Views button - left aligned */}
              <div className="flex-shrink-0">
                <button 
                  onClick={onView}
                  className="flex items-center justify-center text-gray-700 text-sm font-medium whitespace-nowrap"
                >
                  <Eye size={14} className="mr-1" />
                  <span>{views}</span>
                </button>
              </div>
              
              {/* Boost button - centered */}
              <div className="flex-1 text-center">
                <button
                  onClick={onBoost}
                  className="inline-flex items-center justify-center text-gray-700 text-sm font-medium whitespace-nowrap md:block hidden"
                >
                  <Zap size={14} className="mr-1" />
                  <span>Boost</span>
                </button>
                <button
                  onClick={onBoost}
                  className="inline-flex items-center justify-center text-gray-700 text-sm font-medium whitespace-nowrap md:hidden"
                >
                  <Zap size={14} className="mr-1" />
                  <span>Boost</span>
                </button>
              </div>
              
              {/* Toggle - right aligned */}
              <div className="flex-shrink-0 ml-auto">
                <label 
                  htmlFor={`toggle-home-${id}`}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    id={`toggle-home-${id}`}
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
  );
};

export default HomeOfferCard;
