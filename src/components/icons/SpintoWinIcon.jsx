import React from 'react';

const SpintoWinIcon = ({ size = 50, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="25"
        cy="18.2891"
        r="12.7109"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="14.8358"
        y1="10.8837"
        x2="35.7003"
        y2="25.2147"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="25.4038"
        y1="5.17383"
        x2="25.4038"
        y2="31.4034"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="14.318"
        y1="25.2025"
        x2="35.2534"
        y2="11.4916"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SpintoWinIcon;