import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PreviewOfferPage = () => {
  const navigate = useNavigate();
  const { addOffer, updateOffer } = useApp();
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
  
  const handleSaveAsDraft = () => {
    if (previewData) {
      // Add to offers as draft
      const draftPayload = {
        ...previewData,
        isPreview: false,
        isDraft: true
      };
      
      if (editMode && editId) {
        updateOffer(editId, draftPayload);
      } else {
        addOffer(draftPayload);
      }
      
      // Clear preview data
      sessionStorage.removeItem('offerPreview');
      
      // Redirect to drafts
      navigate('/draft-offers');
    }
  };
  
  const handleEdit = () => {
    // Navigate back to create offer page
    navigate(-1);
  };
  
  if (!previewData) {
    return <div className="p-4">Loading preview...</div>;
  }
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Offer Preview</h1>
      </div>
      
      <div className="p-4 flex-1">
        <div className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-xl font-medium">{previewData.title}</h2>
          <p className="text-gray-600 mt-2">{previewData.description || "No description provided"}</p>
          
          {previewData.imagePreview && (
            <div className="mt-4">
              <img 
                src={previewData.imagePreview} 
                alt="Offer" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="font-medium">Details:</h3>
            <div className="mt-2 space-y-1 text-sm">
              {previewData.validityPeriod && (
                <p>Valid till: {previewData.validityPeriod}</p>
              )}
              {previewData.minPurchase && (
                <p>Min purchase: ₹{previewData.minPurchase}</p>
              )}
              {previewData.type === 'spintowin' && (
                <div className="mt-3">
                  <p className="font-medium">Spinner Offers:</p>
                  <ul className="list-disc pl-5 mt-1">
                    {previewData.spinnerOffers.map((offer, index) => (
                      <li key={index}>
                        {offer} - {previewData.spinnerProbabilities[index]}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {previewData.type === 'happyhours' && (
                <div className="mt-3">
                  <p>Day: {previewData.selectedDay}</p>
                  <p>Hours: {previewData.startTime} - {previewData.endTime}</p>
                  {previewData.slotCapacity && (
                    <p>Slot capacity: {previewData.slotCapacity}</p>
                  )}
                </div>
              )}
              <p>Notify followers: {previewData.notifyFollowers ? 'Yes' : 'No'}</p>
              <p>Visibility: {previewData.isVisible ? 'Visible' : 'Hidden'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 mb-4 flex space-x-4">
          <button 
            onClick={handleEdit}
            className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
          >
            Edit Offer
          </button>
          <button 
            onClick={handlePublish}
            className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
          >
            Publish Offer
          </button>
        </div>
        
        <div 
          onClick={handleSaveAsDraft}
          className="flex justify-center items-center py-3 cursor-pointer"
        >
          <span className="text-blue-600 font-medium">Save as Draft</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewOfferPage;
