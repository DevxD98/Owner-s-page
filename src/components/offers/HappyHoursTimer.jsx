import React, { useState, useEffect } from 'react';
import { calculateHappyHoursTimeRemaining } from '../../utils/timeUtils';

const HappyHoursTimer = ({ startTime, endTime, validityDate, startDate, className }) => {
  const [timeInfo, setTimeInfo] = useState(() => 
    calculateHappyHoursTimeRemaining(startTime, endTime, validityDate, startDate)
  );
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(calculateHappyHoursTimeRemaining(startTime, endTime, validityDate, startDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [startTime, endTime, validityDate, startDate]);
  
  if (timeInfo.status === 'invalid') {
    return null;
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
    </div>
  );
};

export default HappyHoursTimer;
