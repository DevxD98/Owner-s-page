import React from 'react';

const QRCodeIcon = ({ size = 20, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.5 4V3C1.5 2.46957 1.71071 1.96086 2.08579 1.58579C2.46086 1.21071 2.96957 1 3.5 1H5.5M1.5 14V15C1.5 15.5304 1.71071 16.0391 2.08579 16.4142C2.46086 16.7893 2.96957 17 3.5 17H5.5M13.5 1H15.5C16.0304 1 16.5391 1.21071 16.9142 1.58579C17.2893 1.96086 17.5 2.46957 17.5 3V4M13.5 17H15.5C16.0304 17 16.5391 16.7893 16.9142 16.4142C17.2893 16.0391 17.5 15.5304 17.5 15V14M2.5 9H16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default QRCodeIcon;