import React, { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanQRPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const startScanning = () => {
    setScanning(true);
    // In a real app, this would initialize camera access
  };

  return (
    <div className="p-4 h-full">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Scan QR Code</h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        {scanning ? (
          <div className="relative w-64 h-64 border-2 border-blue-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white opacity-60 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="p-6 bg-gray-100 rounded-full">
              <Camera size={48} className="text-blue-800" />
            </div>
            <p className="text-center text-gray-600">
              Scan merchant QR codes to verify offers or process customer redemptions
            </p>
            <button
              onClick={startScanning}
              className="py-3 px-6 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
            >
              Start Scanning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQRPage;