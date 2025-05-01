import React from 'react';

const CustomIcon = ({ size = 20, className, children }) => {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {children}
    </div>
  );
};

export default CustomIcon;