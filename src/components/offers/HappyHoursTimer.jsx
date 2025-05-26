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
  
  // No need for the formatDateRange function anymore as we've removed the validity display

  return (
    <div className={`rounded-lg overflow-hidden ${bgColor} border-2 border-blue-200 shadow-sm ${className || ''}`}>
      <div className="px-3 py-3 text-xs flex items-center justify-between">
        <div className="font-medium">
          {timeInfo.message}
        </div>
        <div className={`font-semibold ${timerColor}`}>
          {timeInfo.formattedTimeRemaining}
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 relative">
        <div 
          className={`h-full ${progressColor} transition-all duration-1000 ease-linear`}
          style={{ width: `${timeInfo.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HappyHoursTimer;
