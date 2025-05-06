import React from 'react';
import { useApp } from '../../contexts/AppContext';

const LocationHeader = () => {
  // Get store information from context
  const { storeName } = useApp();
  
  return (
    <div className="flex items-center p-4 border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">MS</div>
        <div>
          {/* Styling according to screenshot specifications */}
          <h2 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 1000,
              fontSize: '26px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#252525',
              width: '150px',
              height: '29px',
              marginTop: '25px',
              marginLeft: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            {storeName}
          </h2>
          <p
          style={{
            marginTop: '10px',
            marginLeft: '-49px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 1000,
            fontSize: '10px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }} className="text-gray-500 text-sm">My Store</p>
        </div>
      </div>
    </div>
  );
};

export default LocationHeader;