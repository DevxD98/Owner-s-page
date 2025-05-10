import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const LocationBranchPage = () => {
  const navigate = useNavigate();
  const { 
    storeAddress: contextStoreAddress,
    setStoreAddress,
    cityState: contextCityState,
    setCityState,
    pincode: contextPincode,
    setPincode,
    googleMapLocation: contextGoogleMapLocation,
    setGoogleMapLocation
  } = useApp();

  const [storeAddress, setStoreAddressLocal] = useState(contextStoreAddress || '');
  const [cityState, setCityStateLocal] = useState(contextCityState || '');
  const [pincode, setPincodeLocal] = useState(contextPincode || '');
  const [googleMapLocation, setGoogleMapLocationLocal] = useState(contextGoogleMapLocation || '');

  const handleSave = () => {
    // Update context with location information
    setStoreAddress(storeAddress);
    setCityState(cityState);
    setPincode(pincode);
    setGoogleMapLocation(googleMapLocation);
    
    // Navigate back
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Location & Branch</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Store Address */}
        <div className="space-y-2">
          <label className="text-base font-medium">Store Address:</label>
          <input
            type="text"
            value={storeAddress}
            onChange={(e) => setStoreAddressLocal(e.target.value)}
            placeholder="Full name"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>

        {/* City / State */}
        <div className="space-y-2">
          <label className="text-base font-medium">City / State:</label>
          <input
            type="text"
            value={cityState}
            onChange={(e) => setCityStateLocal(e.target.value)}
            placeholder="Full name"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Pincode */}
        <div className="space-y-2">
          <label className="text-base font-medium">Pincode:</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincodeLocal(e.target.value)}
            placeholder="XXXXX"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Google Map Location */}
        <div className="space-y-2">
          <label className="text-base font-medium">Google Map Location</label>
          <input
            type="text"
            value={googleMapLocation}
            onChange={(e) => setGoogleMapLocationLocal(e.target.value)}
            placeholder="Full name"
            className="w-full p-4 bg-gray-100 rounded-lg"
          />
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="mt-auto p-4">
        <button 
          onClick={handleSave}
          className="w-full bg-blue-700 text-white py-4 rounded-lg font-medium text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LocationBranchPage;