import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, X } from 'lucide-react';
import SpotlightOfferIcon from '../components/icons/SpotlightOfferIcon';
import HappyhoursOfferIcon from '../components/icons/HappyhoursOfferIcon';
import SpintoWinIcon from '../components/icons/SpintoWinIcon';
import CameraIcon from '../components/icons/CameraIcon';
import DatePicker from '../components/DatePicker';
import { useApp } from '../contexts/AppContext';

const offerTypes = [
  { id: 'spotlight', icon: <SpotlightOfferIcon size={60} className="mx-auto" />, label: 'Spotlight Offer' },
  { id: 'happyhours', icon: <HappyhoursOfferIcon size={60} className="mx-auto" />, label: 'Happy hours Offer' },
  { id: 'spintowin', icon: <SpintoWinIcon size={60} className="mx-auto" />, label: 'Spin to Win' },
];

const CreateOfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOffer, offers, updateOffer } = useApp();
  const [selectedOfferType, setSelectedOfferType] = useState('spotlight');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [offerData, setOfferData] = useState({
    title: '',
    description: '',
    category: '',
    validityDate: '',
    minPurchase: '',
    startTime: '',
    endTime: '',
    redemptionsAllowed: '',
    offerImage: null,
    imagePreview: null,
    notifyFollowers: false,
    spinnerOffers: ['', ''],
    spinnerProbabilities: ['50', '50'],
    selectedDay: 'Monday',
    slotCapacity: '',
    validityPeriod: '',
    isDraft: false
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOfferData({
        ...offerData,
        offerImage: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value
    });
  };

  const addSpinnerOffer = () => {
    setOfferData({
      ...offerData,
      spinnerOffers: [...offerData.spinnerOffers, ''],
      spinnerProbabilities: [...offerData.spinnerProbabilities, '0']
    });
  };

  const removeSpinnerOffer = (index) => {
    const newOffers = [...offerData.spinnerOffers];
    const newProbs = [...offerData.spinnerProbabilities];
    
    newOffers.splice(index, 1);
    newProbs.splice(index, 1);
    
    setOfferData({
      ...offerData,
      spinnerOffers: newOffers,
      spinnerProbabilities: newProbs
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const previewPayload = {
      ...offerData,
      type: selectedOfferType,
      editMode: editMode,
      editId: editId,
      isPreview: true
    };

    sessionStorage.setItem('offerPreview', JSON.stringify(previewPayload));
    navigate('/preview-offer');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">What are you offering</h1>
      </div>
      
      {/* Offer Type Selection */}
      <div className="flex flex-row justify-around px-4 mt-2 mb-6">
        {offerTypes.map((type) => (
          <button 
            key={type.id} 
            className={`flex flex-col items-center w-20`}
            onClick={() => setSelectedOfferType(type.id)}
          >
            <div className="p-2 flex items-center justify-center">
              {React.cloneElement(type.icon, {
                className: `mx-auto ${selectedOfferType === type.id ? 'text-gray-800' : 'text-gray-400 opacity-60'}`
              })}
            </div>
            <span className={`text-xs text-center mt-1 leading-tight ${selectedOfferType === type.id ? 'font-medium' : ''}`}>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Spotlight Offer Form */}
      {selectedOfferType === 'spotlight' && (
        <form className="flex flex-col px-4 gap-6" onSubmit={handleSubmit}>
          {/* Offer Name */}
          <div>
            <label className="block text-base mb-2">Offer Name</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="20% Off on All Haircuts" 
            />
          </div>
          
          {/* Offer Description */}
          <div>
            <label className="block text-base mb-2">Offer Description</label>
            <textarea 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="Pamper yourself with a luxury haircut and styling"
              rows={2}
            />
          </div>
          
          {/* Select Offer Category */}
          <div>
            <label className="block text-base mb-2">Select Offer Category</label>
            <input 
              name="category"
              value={offerData.category}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="Beauty" 
            />
          </div>
          
          {/* Set Offer Validity Date */}
          <div>
            <label className="block text-base mb-2">Set Offer Validity Date</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-4 py-3 flex items-center">
              <input 
                name="validityDate"
                value={offerData.validityDate}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="Date" 
              />
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          </div>
          
          {/* Min Purchase (optional) */}
          <div>
            <label className="block text-base mb-2">Min Purchase (optional)</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-4 py-3 flex items-center">
              <span className="text-gray-500 mr-2">₹</span>
              <input 
                name="minPurchase"
                value={offerData.minPurchase}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="199" 
                type="number"
              />
            </div>
          </div>
          
          {/* Upload Offer Image */}
          <div>
            <label className="block text-base mb-2">Upload Offer Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="offerImageUpload" className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
              <input 
                id="offerImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Notify Followers */}
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Notify Followers</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.notifyFollowers}
                onChange={(e) => setOfferData({...offerData, notifyFollowers: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 mb-4 flex space-x-4">
            <button 
              type="button" 
              onClick={() => {
                const draftPayload = {
                  ...offerData,
                  type: selectedOfferType,
                  isDraft: true
                };
                if (editMode && editId) {
                  updateOffer(editId, draftPayload);
                } else {
                  addOffer(draftPayload);
                }
                navigate('/draft-offers');
              }}
              className="flex-1 py-3 border border-gray-300 text-black font-medium rounded-lg"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-3 cursor-pointer border-t border-gray-200"
            onClick={() => navigate('/draft-offers')}
          >
            <span className="text-base font-medium">View Your Saved Draft Offers</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </form>
      )}

      {/* Happy Hours Offer Form */}
      {selectedOfferType === 'happyhours' && (
        <form className="flex flex-col px-4 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-2">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="Happy Hour Special - Buy 1 Get 1 Free" 
            />
          </div>
          
          <div>
            <label className="block text-base mb-2">Offer Description</label>
            <textarea
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="Enjoy our special happy hour offer"
              rows={2} 
            />
          </div>
          
          <div>
            <label className="block text-base mb-2">Start Time & End Time</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-4 py-3 flex items-center">
              <input 
                name="startTime"
                value={offerData.startTime}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="2 - 4 pm" 
              />
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-base mb-2">Min Purchase (optional)</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-4 py-3 flex items-center">
              <span className="text-gray-500 mr-2">₹</span>
              <input 
                name="minPurchase"
                value={offerData.minPurchase}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="199" 
                type="number"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-base mb-2">Number of redemptions allowed</label>
            <input 
              name="redemptionsAllowed"
              value={offerData.redemptionsAllowed}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-4 py-3" 
              placeholder="Unlimited" 
            />
          </div>
          
          <div>
            <label className="block text-base mb-2">Upload Offer Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="happyHourImageUpload" className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <input 
                id="happyHourImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Notify Followers */}
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Notify Followers</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.notifyFollowers}
                onChange={(e) => setOfferData({...offerData, notifyFollowers: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-4 flex space-x-4">
            <button 
              type="button" 
              onClick={() => {
                // Save as draft functionality
                const draftPayload = {
                  ...offerData,
                  type: selectedOfferType,
                  isDraft: true
                };
                if (editMode && editId) {
                  updateOffer(editId, draftPayload);
                } else {
                  addOffer(draftPayload);
                }
                navigate('/draft-offers');
              }}
              className="flex-1 py-3 border border-gray-300 text-black font-medium rounded-lg"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-3 cursor-pointer border-t border-gray-200"
            onClick={() => navigate('/draft-offers')}
          >
            <span className="text-base font-medium">View Your Saved Draft Offers</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </form>
      )}

      {/* Spin to Win Form */}
      {selectedOfferType === 'spintowin' && (
        <form className="flex flex-col px-4 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base mb-2">Enter Spinner Offers</label>
            {offerData.spinnerOffers.map((offer, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  value={offer}
                  onChange={(e) => {
                    const newOffers = [...offerData.spinnerOffers];
                    newOffers[index] = e.target.value;
                    setOfferData({ ...offerData, spinnerOffers: newOffers });
                  }}
                  className="flex-1 rounded-lg border bg-gray-100 px-4 py-3"
                  placeholder={`Offer ${index + 1}`}
                />
                <button 
                  type="button" 
                  className="p-1 text-gray-400 hover:text-gray-600"
                  onClick={() => removeSpinnerOffer(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addSpinnerOffer}
              className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors mt-2"
            >
              Add Spinner Offer
            </button>
          </div>
          
          <div>
            <label className="block text-base mb-2">Probability</label>
            {offerData.spinnerOffers.map((_, index) => (
              <div key={`prob-${index}`} className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  value={offerData.spinnerProbabilities[index]}
                  onChange={(e) => {
                    const newProbs = [...offerData.spinnerProbabilities];
                    newProbs[index] = e.target.value;
                    setOfferData({ ...offerData, spinnerProbabilities: newProbs });
                  }}
                  className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                  placeholder={`% chance to land on entry ${index + 1}`}
                  min="0"
                  max="100"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-base mb-2">Validity Period</label>
            <DatePicker
              value={offerData.validityPeriod}
              onChange={(date) => setOfferData({ ...offerData, validityPeriod: date })}
              placeholder="Date"
            />
          </div>

          <div>
            <label className="block text-base mb-2">Upload Offer Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="spinToWinImageUpload" className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <input 
                id="spinToWinImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Notify Followers</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.notifyFollowers}
                onChange={(e) => setOfferData({...offerData, notifyFollowers: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-4 flex space-x-4">
            <button 
              type="button" 
              onClick={() => {
                const draftPayload = {
                  ...offerData,
                  type: selectedOfferType,
                  isDraft: true
                };
                if (editMode && editId) {
                  updateOffer(editId, draftPayload);
                } else {
                  addOffer(draftPayload);
                }
                navigate('/draft-offers');
              }}
              className="flex-1 py-3 border border-gray-300 text-black font-medium rounded-lg"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-3 cursor-pointer border-t border-gray-200"
            onClick={() => navigate('/draft-offers')}
          >
            <span className="text-base font-medium">View Your Saved Draft Offers</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOfferPage;