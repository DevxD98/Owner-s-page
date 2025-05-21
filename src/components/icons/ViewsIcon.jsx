import React from 'react';
import CustomIcon from './CustomIcon';
import viewsIconSrc from './viewsIcon.png';

const ViewsIcon = ({ size = 12, className = '' }) => {
  return (
    <CustomIcon size={size} className={className}>
      <img src={viewsIconSrc} alt="Views" className="w-full h-full object-contain" />
    </CustomIcon>
  );
};

export default ViewsIcon;
