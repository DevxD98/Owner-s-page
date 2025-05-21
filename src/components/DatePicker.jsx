import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ value, onChange, placeholder = 'Select date', minDate = null }) => {
  // When creating a date from a string like "2025-05-19", it gets interpreted as UTC midnight
  // which may cause timezone issues. We need to preserve the local date exactly.
  const selectedDate = value ? new Date(value + 'T12:00:00') : null;
  
  // Convert minDate string to Date object if provided
  const minimumDate = minDate ? new Date(minDate + 'T12:00:00') : null;

  const handleDateChange = (date) => {
    if (date) {
      // Fix the timezone issue by using the date methods that respect the local timezone
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      
      // Format in YYYY-MM-DD to avoid timezone issues
      const formattedDate = `${year}-${month}-${day}`;
      onChange(formattedDate);
    } else {
      onChange('');
    }
  };

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        dateFormat="dd MMM yyyy" // <- This displays as "01 Apr 2025"
        className="w-full rounded-lg border bg-gray-100 px-4 py-2 text-left focus:outline-none"
        wrapperClassName='w-full'
        minDate={minimumDate}
      />
    </div>
  );
};

export default CustomDatePicker;