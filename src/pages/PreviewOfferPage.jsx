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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Preview Your Offer Before Publishing</h1>
      </div>
      
      <div className="flex-1 flex flex-col">
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
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <span className="text-xl font-bold mr-1">Name of store</span>
            <span className="text-gray-500">(2km)</span>
          </div>
          <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <Heart size={24} className="text-gray-400" />
          </button>
        </div>
        
        {/* Offer Details */}
        <div className="px-4">
          {previewData.type === 'spotlight' && (
            <>
              <h2 className="text-3xl font-bold text-gray-900">
                Get {previewData.title || "20% OFF"}
              </h2>
              <p className="text-lg text-gray-700 mt-1">
                {previewData.description || "your total bill on your next visit!"}
              </p>
            </>
          )}
          
          {previewData.type === 'happyhours' && (
            <>
              <h2 className="text-3xl font-bold text-gray-900">
                {previewData.title || "Get 20% OFF"}
              </h2>
              <p className="text-lg text-gray-700 mt-1">
                {previewData.description || "your total bill on your next visit!"}
              </p>
              <div className="mt-4">
                <div className="flex items-center mt-2">
                  <span className="text-3xl">😀</span>
                  <span className="bg-gray-200 px-5 py-2 rounded-full ml-2">Category</span>
                </div>
                <p className="text-xl font-medium mt-4">Happy Hours {getFormattedTime()}</p>
              </div>
            </>
          )}
          
          {previewData.type === 'spintowin' && (
            <>
              <h2 className="text-3xl font-bold text-gray-900">
                {previewData.title || "Spin to Win"}
              </h2>
              <p className="text-lg text-gray-700 mt-1">
                Spin for a chance to win:
              </p>
              <ul className="list-disc pl-5 mt-2">
                {previewData.spinnerOffers && previewData.spinnerOffers.map((offer, index) => (
                  <li key={index} className="text-gray-700">{offer || `Prize ${index + 1}`}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 pb-8 flex space-x-4">
        <button 
          onClick={handleEdit}
          className="flex-1 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg text-lg"
        >
          Edit Offer
        </button>
        <button 
          onClick={handlePublish}
          className="flex-1 py-4 bg-blue-600 text-white font-medium rounded-lg text-lg"
        >
          Publish Offer
        </button>
      </div>
    </div>
  );
};

export default PreviewOfferPage;
