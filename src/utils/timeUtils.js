/**
 * Utilities for time-related operations
 */

/**
 * Calculate the time remaining for a Happy Hours offer
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @param {string} validityDate - End validity date in ISO format
 * @param {string} startDate - Start validity date in ISO format (optional)
 * @returns {Object} Status, time remaining and other details
 */
export const calculateHappyHoursTimeRemaining = (startTime, endTime, validityDate, startDate) => {
  if (!startTime || !endTime || !validityDate) {
    return { 
      status: 'invalid', 
      message: 'Incomplete time information',
      timeRemaining: null,
      formattedTimeRemaining: '--:--:--',
      percentage: 0
    };
  }

  // Current time
  const now = new Date();
  
  // Parse start date (default to today if not provided)
  const validStartDate = startDate ? new Date(startDate) : new Date();
  validStartDate.setHours(0, 0, 0, 0); // Start of day
  
  // Parse end validity date
  const validDate = new Date(validityDate);
  validDate.setHours(23, 59, 59, 999); // End of day
  
  // Is the offer still valid (not expired)?
  if (now > validDate) {
    return { 
      status: 'expired', 
      message: 'Offer has expired',
      timeRemaining: 0,
      formattedTimeRemaining: '00:00:00',
      percentage: 100
    };
  }

  // Today's date for start and end time
  const today = new Date();
  
  // Parse start and end times
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Create Date objects for start and end times today
  const startTimeToday = new Date(today);
  startTimeToday.setHours(startHour, startMinute, 0, 0);

  const endTimeToday = new Date(today);
  endTimeToday.setHours(endHour, endMinute, 0, 0);

  // Check if end time is before start time (crosses midnight)
  if (endTimeToday < startTimeToday) {
    endTimeToday.setDate(endTimeToday.getDate() + 1);
  }

  // Calculate time until the offer starts or ends
  if (now < startTimeToday) {
    // Offer hasn't started yet
    const timeRemaining = startTimeToday - now;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    const formattedTimeRemaining = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return { 
      status: 'upcoming', 
      message: 'Starting in',
      timeRemaining,
      formattedTimeRemaining,
      percentage: 0
    };
  } else if (now >= startTimeToday && now <= endTimeToday) {
    // Offer is active
    const timeRemaining = endTimeToday - now;
    const totalDuration = endTimeToday - startTimeToday;
    const elapsed = now - startTimeToday;
    const percentage = Math.floor((elapsed / totalDuration) * 100);
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    const formattedTimeRemaining = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return { 
      status: 'active', 
      message: 'Ending in',
      timeRemaining,
      formattedTimeRemaining,
      percentage
    };
  } else {
    // Offer has ended for today, but is still within validity period
    // Calculate time until it starts tomorrow
    const tomorrowStart = new Date(startTimeToday);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    
    const timeRemaining = tomorrowStart - now;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    const formattedTimeRemaining = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return { 
      status: 'inactive', 
      message: 'Starts tomorrow in',
      timeRemaining,
      formattedTimeRemaining,
      percentage: 0
    };
  }
};

/**
 * Format time for display (24-hour format to 12-hour AM/PM)
 * @param {string} timeString - Time in HH:MM format
 * @returns {string} Formatted time (e.g. "2:00 PM")
 */
export const formatTimeDisplay = (timeString) => {
  if (!timeString) return '';
  
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = minutes;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${period}`;
  } catch (e) {
    return timeString;
  }
};
