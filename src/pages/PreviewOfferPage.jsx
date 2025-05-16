import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, Clock, Info, Tag, MapPin, Award, ChevronRight, AlertCircle, Edit, Share2, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PreviewOfferPage = () => {
  const navigate = useNavigate();
  const { addOffer, updateOffer, storeName } = useApp();
  const [previewData, setPreviewData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showHint, setShowHint] = useState(true);
  
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
    
    // Auto-hide hint after 5 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handlePublish = () => {
    if (previewData) {
      // Remove preview flag and set as published (not draft)
      const publishPayload = {
        ...previewData,
        isPreview: false,
        isDraft: false,
        // Check if this is a sponsored ad based on the offer type or settings
        // This is a simplified check - you can expand based on your business logic
        isSponsored: previewData.isSponsored || previewData.type === 'spotlight'
      };
      
      if (editMode && editId) {
        updateOffer(editId, publishPayload);
      } else {
        addOffer(publishPayload);
      }
      
      // Clear preview data
      sessionStorage.removeItem('offerPreview');
      
      // Redirect to home page to show in Recent Live Offers
      navigate('/');
    }
  };
  
  const handleEdit = () => {
    // Navigate back to create offer page
    navigate(-1);
  };
  
  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
          <div className="animate-spin mr-3 h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    );
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
  
  // Get background color based on offer type
  const getOfferTypeStyles = () => {
    switch (previewData.type) {
      case 'spotlight':
        return {
          badge: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
          icon: <Award className="text-blue-500 mr-1" size={16} />,
          label: 'Spotlight Offer'
        };
      case 'happyhours':
        return {
          badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
          icon: <Clock className="text-amber-500 mr-1" size={16} />,
          label: 'Happy Hours'
        };
      case 'spintowin':
        return {
          badge: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
          icon: <Award className="text-purple-500 mr-1" size={16} />,
          label: 'Spin to Win'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
          icon: <Tag className="text-green-500 mr-1" size={16} />,
          label: 'Special Offer'
        };
    }
  };
  
  const offerTypeStyles = getOfferTypeStyles();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            onClick={() => {
              // Go back but with state to indicate which section to scroll to
              navigate('/create-offer', { 
                state: { 
                  scrollToSection: previewData.type,
                  fromPreview: true
                } 
              });
            }} 
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Preview Offer</h1>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={handleEdit} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            aria-label="Edit offer"
          >
            <Edit size={22} className="text-gray-700" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Share offer"
          >
            <Share2 size={22} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Preview Hint */}
      {showHint && (
        <div className="mx-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center animate-fadeIn">
          <Info size={20} className="text-blue-600 mr-2 flex-shrink-0" />
          <p className="text-blue-800 text-sm">This is a preview of how your offer will appear to customers. Make sure everything looks good before publishing!</p>
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-4">
        {/* Offer Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 transition-all hover:shadow-xl relative">
          {/* Offer Image */}
          <div className="w-full h-72 relative">
            {previewData.imagePreview ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
                <img 
                  src={previewData.imagePreview} 
                  alt="Offer" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-5 z-[2] w-full">
                  <h2 className="text-3xl font-bold text-white drop-shadow-md">
                    {previewData.title || "Your Amazing Offer"}
                  </h2>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Info size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No image provided</p>
                  <p className="text-gray-400 text-sm">Upload an image for a better preview</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Store Info and Like Button */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                {storeName ? storeName.charAt(0).toUpperCase() : "S"}
              </div>
              <div>
                <span className="text-lg font-bold block">{storeName || "Your Store"}</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} className="mr-1" />
                  <span>2km away</span>
                </div>
              </div>
            </div>
            <button 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                liked ? 'bg-red-50 text-red-500' : 'text-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => setLiked(!liked)}
            >
              <Heart 
                size={22} 
                className={`${liked ? 'fill-red-500 text-red-500' : ''} transition-colors`} 
              />
            </button>
          </div>
          
          {/* Offer Details */}
          <div className="px-5 py-4">
            {/* Description common to all offer types */}
            <p className="text-lg text-gray-700 mb-4">
              {previewData.description || "Your offer description will appear here. Make sure to add a compelling description!"}
            </p>
            
            {previewData.type === 'spotlight' && (
              <div className="bg-blue-50 p-4 rounded-xl space-y-3 mb-4 border border-blue-100">
                <div className="flex items-center text-blue-800">
                  <Award className="mr-2" size={20} />
                  <h3 className="font-semibold">Spotlight Offer</h3>
                </div>
                <p className="text-blue-700">This offer will be highlighted across the app for maximum visibility.</p>
              </div>
            )}
            
            {previewData.type === 'happyhours' && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-4">
                <div className="flex items-center text-amber-800 mb-2">
                  <Clock className="mr-2" size={20} />
                  <h3 className="font-semibold">Happy Hours</h3>
                </div>
                <div className="bg-white/70 rounded-lg p-3 text-center">
                  <p className="text-amber-900 text-lg font-medium">{getFormattedTime()}</p>
                  <p className="text-amber-600 text-sm">Available every {previewData.selectedDay || 'Monday'}</p>
                </div>
              </div>
            )}
            
            {previewData.type === 'spintowin' && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
                <div className="flex items-center text-purple-800 mb-2">
                  <Award className="mr-2" size={20} />
                  <h3 className="font-semibold">Spin to Win Prizes</h3>
                </div>
                <ul className="space-y-2">
                  {previewData.spinnerOffers && previewData.spinnerOffers.map((offer, index) => (
                    <li key={index} className="flex items-center bg-white/80 p-2 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold mr-2">
                        {index + 1}
                      </div>
                      <span className="text-purple-900">{offer || `Prize ${index + 1}`}</span>
                      {previewData.spinnerProbabilities && (
                        <span className="ml-auto text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">
                          {previewData.spinnerProbabilities[index] || '50'}%
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Additional Info Section (for all offer types) */}
            <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  Valid till: <span className="font-medium">{previewData.validityPeriod || 'Not specified'}</span>
                </span>
              </div>
              
              {previewData.minPurchase && (
                <div className="flex items-center">
                  <Tag size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    Min. purchase: <span className="font-medium">${previewData.minPurchase}</span>
                  </span>
                </div>
              )}
              
              {previewData.redemptionsAllowed && (
                <div className="flex items-center">
                  <AlertCircle size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    Limited to <span className="font-medium">{previewData.redemptionsAllowed}</span> redemptions
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Customer Actions (simulated) */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">22 people redeemed</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-sm hover:shadow-md transition-all">
              <CheckCircle className="mr-1.5" size={18} />
              Redeem Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-4 pb-8 flex space-x-4 bg-white shadow-inner border-t border-gray-200">
        <button 
          onClick={handleEdit}
          className="flex-1 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg text-lg hover:bg-blue-50 transition-all flex items-center justify-center"
        >
          <Edit size={20} className="mr-2" />
          Edit Offer
        </button>
        <button 
          onClick={handlePublish}
          className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg text-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center shadow-md"
        >
          <CheckCircle size={20} className="mr-2" />
          Publish Offer
        </button>
      </div>
    </div>
  );
};

export default PreviewOfferPage;
