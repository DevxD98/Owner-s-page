import React from 'react';
import { ArrowLeft, Video, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdTypeSelectionPage = () => {
  const navigate = useNavigate();

  const handleSelection = (adType) => {
    navigate('/sponsored-ads', { state: { adType } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate('/')} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Create Sponsored Ad</h1>
      </div>
      
      {/* Main content */}
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Choose Ad Type</h2>
          <p className="text-gray-600 mt-2">Select the type of sponsored ad you want to create</p>
        </div>
        
        <div className="space-y-6 max-w-md mx-auto">
          {/* Image Ad Option */}
          <div 
            onClick={() => handleSelection('image')}
            className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                <ImageIcon size={24} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Image Ad</h3>
                <p className="text-gray-600 text-sm">Static image banner with text</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Best for showcasing products</span>
              <span className="text-indigo-600 font-bold">Select</span>
            </div>
          </div>
          
          {/* Video Ad Option */}
          <div 
            onClick={() => handleSelection('video')}
            className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                <Video size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Video Ad</h3>
                <p className="text-gray-600 text-sm">Engaging short-form video content</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Higher engagement rate</span>
              <span className="text-purple-600 font-bold">Select</span>
            </div>
          </div>
        </div>
        
        {/* Estimated Performance Comparison Card */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-8 max-w-md mx-auto">
          <h3 className="font-semibold text-blue-800 mb-3">Performance Comparison</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-700"><strong>Image Ads:</strong></span>
              <span className="text-blue-700">~12% click rate</span>
            </div>
            <div className="h-px bg-blue-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700"><strong>Video Ads:</strong></span>
              <span className="text-blue-700">~18% engagement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdTypeSelectionPage;
