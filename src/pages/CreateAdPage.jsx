import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Clock, Info, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const CreateAdPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOffer, sponsoredAds, updateOffer } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validTill, setValidTill] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  useEffect(() => {
    // Check if we're editing an existing ad
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    
    if (id) {
      const adToEdit = sponsoredAds.find(ad => ad.id === id);
      if (adToEdit) {
        setTitle(adToEdit.title || '');
        setDescription(adToEdit.description || '');
        setValidTill(adToEdit.validTill || '');
        setImagePreview(adToEdit.imagePreview || adToEdit.image || '');
        setEditMode(true);
        setEditId(id);
      }
    }
  }, [location.search, sponsoredAds]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
  };
  
  const handlePreview = () => {
    if (!title || !validTill) {
      setError('Please fill in all required fields');
      return;
    }
    
    const previewData = {
      title,
      description,
      validTill,
      imagePreview,
      isSponsored: true,
      isPreview: true,
      editMode,
      editId
    };
    
    // Save preview data in session storage
    sessionStorage.setItem('offerPreview', JSON.stringify(previewData));
    
    // Navigate to preview page
    navigate('/preview-offer');
  };
  
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/my-ads', { replace: true })} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">{editMode ? 'Edit Sponsored Ad' : 'Create Sponsored Ad'}</h1>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {/* Ad Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        {/* Ad Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your ad in a few sentences"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        {/* Valid Till */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valid Till <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Image
          </label>
          
          {!imagePreview ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById('ad-image-input').click()}
            >
              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Click to upload image</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPG or JPEG up to 5MB</p>
              
              <input
                id="ad-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
        
        {/* Info Box */}
        <div className="bg-purple-50 p-4 rounded-lg flex items-start">
          <Info size={20} className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-purple-800 font-medium">Sponsored Ad Information</p>
            <p className="text-xs text-purple-700 mt-1">Sponsored ads appear prominently in customer feeds and search results. They help increase visibility and drive more engagement with your business.</p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            type="button"
            onClick={handlePreview}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Preview Ad
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/my-ads', { replace: true })}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdPage;