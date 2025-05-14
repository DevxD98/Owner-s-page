import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PreviewOfferPage = () => {
  const navigate = useNavigate();
  const { addOffer, updateOffer, storeName } = useApp();
  const [previewData, setPreviewData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  useEffect(() => {
    // Get preview data from session storage
    const storedPreview = sessionStorage.getItem('offerPreview');
    if (storedPreview) {
      const data = JSON.parse(storedPreview);
      setPreviewData(data);
      setEditMode(data.editMode || false);
      setEditId(data.editId || null);
    } else {
      // If no preview data, redirect back
      navigate('/create-offer');
    }
  }, [navigate]);
  
  const handlePublish = () => {
    if (previewData) {
      // Remove preview flag and set as published (not draft)
      const publishPayload = {
        ...previewData,
        isPreview: false,
        isDraft: false
      };
      
      if (editMode && editId) {
        updateOffer(editId, publishPayload);
      } else {
        addOffer(publishPayload);
      }
      
      // Clear preview data
      sessionStorage.removeItem('offerPreview');
      
      // Redirect to my ads
      navigate('/my-ads');
    }
  };
  
  const handleEdit = () => {
    // Navigate back to create offer page
    navigate(-1);
  };
  
  if (!previewData) {
    return <div className="p-4">Loading preview...</div>;
  }
  
  // Format time for happy hours display
  const getFormattedTime = () => {
    if (previewData.type === 'happyhours' && previewData.startTime && previewData.endTime) {
      return `${previewData.startTime} - ${previewData.endTime}`;
    } else if (previewData.type === 'happyhours') {
      return "2 - 4 pm"; // Default time if not specified
    }
    return "";
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Preview Your Offer Before Publishing</h1>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        {/* Offer Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Offer Image */}
          <div className="w-full h-72">
            {previewData.imagePreview ? (
              <img 
                src={previewData.imagePreview} 
                alt="Offer" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image provided</p>
              </div>
            )}
          </div>
          
          {/* Store Info and Like Button */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-xl font-bold mr-1">Name of store</span>
              <span className="text-gray-500">(2km)</span>
            </div>
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Heart size={24} className="text-gray-400" />
            </button>
          </div>
          
          {/* Offer Details */}
          <div className="px-5 py-4">
            {previewData.type === 'spotlight' && (
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  Get {previewData.title || "20% OFF"}
                </h2>
                <p className="text-lg text-gray-700">
                  {previewData.description || "your total bill on your next visit!"}
                </p>
              </div>
            )}
            
            {previewData.type === 'happyhours' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {previewData.title || "Get 20% OFF"}
                  </h2>
                  <p className="text-lg text-gray-700 mt-1">
                    {previewData.description || "your total bill on your next visit!"}
                  </p>
                </div>
                
                <div className="flex items-center mt-2">
                  <span className="text-3xl">😀</span>
                  <span className="bg-gray-200 px-5 py-2 rounded-full ml-2">Category</span>
                </div>
                
                <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                  <p className="text-xl font-medium">Happy Hours {getFormattedTime()}</p>
                </div>
              </div>
            )}
            
            {previewData.type === 'spintowin' && (
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  {previewData.title || "Spin to Win"}
                </h2>
                <p className="text-lg text-gray-700">
                  Spin for a chance to win:
                </p>
                <ul className="list-disc pl-6 space-y-1 bg-gray-50 p-3 rounded-lg">
                  {previewData.spinnerOffers && previewData.spinnerOffers.map((offer, index) => (
                    <li key={index} className="text-gray-700 text-lg">{offer || `Prize ${index + 1}`}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {previewData.validityPeriod && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-gray-600">Valid till: <span className="font-medium">{previewData.validityPeriod}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 pb-8 flex space-x-4 bg-white shadow-inner border-t border-gray-200">
        <button 
          onClick={handleEdit}
          className="flex-1 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg text-lg hover:bg-blue-50 transition-colors"
        >
          Edit Offer
        </button>
        <button 
          onClick={handlePublish}
          className="flex-1 py-4 bg-blue-600 text-white font-medium rounded-lg text-lg hover:bg-blue-700 transition-colors"
        >
          Publish Offer
        </button>
      </div>
    </div>
  );
};

export default PreviewOfferPage;
