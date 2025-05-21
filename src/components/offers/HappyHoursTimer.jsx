import React, { useState, useEffect } from 'react';
import { calculateHappyHoursTimeRemaining } from '../../utils/timeUtils.js';

const HappyHoursTimer = ({ startTime, endTime, validityDate, startDate, className }) => {
  // Log props when component mounts or props change to help with debugging
  useEffect(() => {
    console.log('HappyHoursTimer props received:', { startTime, endTime, validityDate, startDate });
    
    // Check for missing props and log warnings in development
    if (process.env.NODE_ENV !== 'production') {
      const missingProps = [];
      if (!startTime) missingProps.push('startTime');
      if (!endTime) missingProps.push('endTime');
      if (!validityDate) missingProps.push('validityDate');
      if (!startDate) missingProps.push('startDate');
      
      if (missingProps.length > 0) {
        console.warn(`Timer missing required props: ${missingProps.join(', ')}`);
      }
    }
  }, [startTime, endTime, validityDate, startDate]);
  
  // Get current date in YYYY-MM-DD format for fallbacks
  const getCurrentDateString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  
  // Get date one week from now in YYYY-MM-DD format
  const getOneWeekLaterString = () => {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
  };
  
  // Use the provided values directly without fallbacks - will be handled in the calculation function
  const effectiveStartTime = startTime;
  const effectiveEndTime = endTime;
  const effectiveValidityDate = validityDate;
  const effectiveStartDate = startDate;
  
  const [timeInfo, setTimeInfo] = useState(() => 
    calculateHappyHoursTimeRemaining(
      effectiveStartTime, 
      effectiveEndTime, 
      effectiveValidityDate, 
      effectiveStartDate
    )
  );
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(calculateHappyHoursTimeRemaining(
        effectiveStartTime, 
        effectiveEndTime, 
        effectiveValidityDate, 
        effectiveStartDate
      ));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [effectiveStartTime, effectiveEndTime, effectiveValidityDate, effectiveStartDate]);
  
  // Always render the component, but show a message when data is missing
  if (timeInfo.status === 'invalid') {
    return (
      <div className={`rounded-md px-3 py-2 bg-yellow-50 text-yellow-800 text-xs ${className || ''}`}>
        <div className="font-medium mb-1">Incomplete time information</div>
        <div className="text-yellow-600">
          {!startTime && <div>• Start time: Undefined</div>}
          {!endTime && <div>• End time: Undefined</div>}
          {!validityDate && <div>• End date: Undefined</div>}
          {!startDate && <div>• Start date: Undefined</div>}
        </div>
      </div>
    );
  }

  // Determine colors based on status
  let timerColor = 'text-gray-600';
  let bgColor = 'bg-gray-100';
  let progressColor = 'bg-gray-300';
  
  if (timeInfo.status === 'active') {
    timerColor = 'text-green-600';
    bgColor = 'bg-green-50';
    progressColor = 'bg-green-500';
  } else if (timeInfo.status === 'upcoming') {
    timerColor = 'text-blue-600';
    bgColor = 'bg-blue-50';
    progressColor = 'bg-blue-500';
  } else if (timeInfo.status === 'expired') {
    timerColor = 'text-red-600';
    bgColor = 'bg-red-50';
    progressColor = 'bg-red-500';
  } else if (timeInfo.status === 'inactive') {
    timerColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    progressColor = 'bg-yellow-500';
  }
  
  // Format the date range for display
  const formatDateRange = () => {
    try {
      const start = effectiveStartDate ? new Date(effectiveStartDate) : null;
      const end = effectiveValidityDate ? new Date(effectiveValidityDate) : null;
      
      if (start && end) {
        // Log the dates for debugging
        console.log('Formatting date range:', { 
          rawStartDate: effectiveStartDate, 
          rawEndDate: effectiveValidityDate,
          parsedStart: start, 
          parsedEnd: end 
        });
        
        // Check if dates are valid
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.error('Invalid date detected in formatDateRange');
          return 'Invalid date range';
        }
        
        const startFmt = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const endFmt = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${startFmt} - ${endFmt}`;
      }
      return 'No defined date range';
    } catch(e) {
      console.error('Error formatting date range:', e);
      return 'Error formatting dates';
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${bgColor} ${className || ''}`}>
      <div className="px-3 py-2 text-xs flex items-center justify-between">
        <div className="font-medium">
          {timeInfo.message}
        </div>
        <div className={`font-semibold ${timerColor}`}>
          {timeInfo.formattedTimeRemaining}
        </div>
      </div>
      <div className="w-full h-1 bg-gray-200 relative">
        <div 
          className={`h-full ${progressColor} transition-all duration-1000 ease-linear`}
          style={{ width: `${timeInfo.percentage}%` }}
        ></div>
      </div>
      
      {/* Always display validity period, showing error message if dates are invalid */}
      <div className="bg-white/50 px-3 py-1 text-xs text-gray-600 text-center border-t border-gray-100">
        Valid: {formatDateRange() || 'Invalid date range, please edit the offer'}
      </div>
    </div>
  );
};

export default HappyHoursTimer;
