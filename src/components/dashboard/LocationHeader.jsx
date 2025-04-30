import React from 'react';
import { MapPin, QrCode } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const LocationHeader = () => {
  const { location } = useApp();

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-100">
      <div className="flex items-start space-x-2">
        <MapPin className="text-gray-700 mt-1" size={20} />
        <div>
          <h2 className="font-bold text-lg">Current Location</h2>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
      <div className="border border-gray-300 rounded p-1">
        <QrCode size={24} />
      </div>
    </div>
  );
};

export default LocationHeader;