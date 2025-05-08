import React from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ value, onChange, placeholder = 'Select date' }) => {
  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (date) => {
    if (date) {
      // Send ISO string to backend
      onChange(date.toISOString().split('T')[0]);
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
      />
    </div>
  );
};

export default CustomDatePicker;