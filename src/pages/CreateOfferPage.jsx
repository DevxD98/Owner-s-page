import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, X } from 'lucide-react';
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
  const [selectedOfferType, setSelectedOfferType] = useState('happyhours');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [offerData, setOfferData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    minPurchase: '',
    redemptionsAllowed: '',
    validityPeriod: '',
    isVisible: true,
    offerImage: null,
    imagePreview: null,
    spinnerOffers: ['', ''],
    spinnerProbabilities: ['50', '50'],
    selectedDay: 'Monday',
    slotCapacity: ''
  });
  
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

  const handleToggleChange = (e) => {
    setOfferData({
      ...offerData,
      isVisible: e.target.checked
    });
  };

  // Check for offer ID in URL params for editing
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const offerId = params.get('id');
    
    if (offerId) {
      const offerToEdit = offers.find(offer => offer.id === offerId);
      if (offerToEdit) {
        setEditMode(true);
        setEditId(offerId);
        setSelectedOfferType(offerToEdit.type || 'happyhours');
        
        // Parse validTill if it contains time range
        let startTime = '';
        let endTime = '';
        if (offerToEdit.validTill && offerToEdit.validTill.includes(' - ')) {
          const [start, end] = offerToEdit.validTill.split(' - ');
          startTime = start;
          endTime = end;
        }
        
        setOfferData({
          title: offerToEdit.title || '',
          description: offerToEdit.description || '',
          startTime: startTime,
          endTime: endTime,
          minPurchase: offerToEdit.minPurchase || '',
          redemptionsAllowed: offerToEdit.redemptionsAllowed || '',
          validityPeriod: offerToEdit.validTill || '',
          isVisible: offerToEdit.isActive !== undefined ? offerToEdit.isActive : true,
          offerImage: offerToEdit.offerImage || null,
          imagePreview: offerToEdit.offerImage ? URL.createObjectURL(offerToEdit.offerImage) : null,
          spinnerOffers: offerToEdit.spinnerOffers || ['', ''],
          spinnerProbabilities: offerToEdit.spinnerProbabilities || ['50', '50'],
          selectedDay: offerToEdit.selectedDay || 'Monday',
          slotCapacity: offerToEdit.slotCapacity || ''
        });
      }
    }
  }, [location.search, offers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare offer payload
    const offerPayload = {
      title: offerData.title,
      description: offerData.description,
      isActive: offerData.isVisible,
      type: selectedOfferType,
      offerImage: offerData.offerImage
    };

    if (selectedOfferType === 'spotlight') {
      offerPayload.validTill = offerData.validityPeriod;
      offerPayload.minPurchase = offerData.minPurchase;
    } else {
      offerPayload.validTill = `${offerData.startTime} - ${offerData.endTime}`;
    }

    if (editMode && editId) {
      updateOffer(editId, offerPayload);
    } else {
      addOffer(offerPayload);
    }
    
    navigate('/my-ads');
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
        <form className="flex flex-col px-4 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Description</label>
            <input 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Validity Period</label>
            <DatePicker
              value={offerData.validityPeriod}
              onChange={(date) => setOfferData({ ...offerData, validityPeriod: date })}
              placeholder="Date"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Min Purchase (optional)</label>
            <input 
              name="minPurchase"
              value={offerData.minPurchase}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="₹ 199" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="offerImageUpload" className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <img src={offerData.imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <CameraIcon size={36} className="text-gray-500" />
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
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Offer Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.isVisible}
                onChange={handleToggleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-8 flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Spin to Win Form */}
      {selectedOfferType === 'spintowin' && (
        <form className="flex flex-col px-4 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Enter Spinner Offers</label>
            {offerData.spinnerOffers.map((offer, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  value={offer}
                  onChange={(e) => {
                    const newOffers = [...offerData.spinnerOffers];
                    newOffers[index] = e.target.value;
                    setOfferData({ ...offerData, spinnerOffers: newOffers });
                  }}
                  className="flex-1 rounded-lg border bg-gray-100 px-3 py-2"
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
            <label className="block font-medium mb-1">Probability</label>
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
                  className="w-full rounded-lg border bg-gray-100 px-3 py-2"
                  placeholder={`% chance to land on entry ${index + 1}`}
                  min="0"
                  max="100"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium mb-1">Validity Period</label>
            <DatePicker
              value={offerData.validityPeriod}
              onChange={(date) => setOfferData({ ...offerData, validityPeriod: date })}
              placeholder="Date"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="otherOfferImageUpload" className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <img src={offerData.imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <CameraIcon size={36} className="text-gray-500" />
              )}
              <input 
                id="otherOfferImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Offer Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.isVisible}
                onChange={handleToggleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="mt-4 mb-8 flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Sponsored Ads Form */}
      {selectedOfferType === 'sponsored' && (
        <form className="flex flex-col px-4 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Ad Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Ad Description</label>
            <input 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Select Offer Type</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="offerType"
                value={offerData.offerType}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="XXXX" 
              />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Ad Placement</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="adPlacement"
                value={offerData.adPlacement}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="XXXX" 
              />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Discount Details</label>
            <input 
              name="discountDetails"
              value={offerData.discountDetails}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Validity Period</label>
            <DatePicker
              value={offerData.validityPeriod}
              onChange={(date) => setOfferData({ ...offerData, validityPeriod: date })}
              placeholder="Date"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="otherOfferImageUpload" className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <img src={offerData.imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <CameraIcon size={36} className="text-gray-500" />
              )}
              <input 
                id="otherOfferImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Ad Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.isVisible}
                onChange={handleToggleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-8 flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Happy Hours Offer Form */}
      {selectedOfferType === 'happyhours' && (
        <form className="flex flex-col px-4 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Description</label>
            <input 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Select Days</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <select
                name="selectedDay"
                value={offerData.selectedDay || "Monday"}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none appearance-none w-full"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Start Time</label>
              <label className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center cursor-pointer">
                <input 
                  type="time"
                  name="startTime"
                  value={offerData.startTime}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none appearance-none w-full cursor-pointer" 
                />
                <ChevronDown size={16} className="text-gray-500 pointer-events-none" />
              </label>
            </div>
            
            <div className="flex-1">
              <label className="block font-medium mb-1">End Time</label>
              <label className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center cursor-pointer">
                <input 
                  type="time"
                  name="endTime"
                  value={offerData.endTime}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none appearance-none w-full cursor-pointer" 
                />
                <ChevronDown size={16} className="text-gray-500 pointer-events-none" />
              </label>
            </div>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Min Purchase (optional)</label>
            <input 
              name="minPurchase"
              value={offerData.minPurchase}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="₹119" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Slot Capacity</label>
            <input 
              name="slotCapacity"
              value={offerData.slotCapacity || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="10" 
              type="number"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Number of redemptions allowed</label>
            <input 
              name="redemptionsAllowed"
              value={offerData.redemptionsAllowed}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="1" 
              type="number"
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="happyHoursImageUpload" className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <img src={offerData.imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <CameraIcon size={36} className="text-gray-500" />
              )}
              <input 
                id="happyHoursImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Offer Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.isVisible}
                onChange={handleToggleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-8 flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Other Offer Types Form */}
      {selectedOfferType !== 'spotlight' && selectedOfferType !== 'spintowin' && selectedOfferType !== 'happyhours' && selectedOfferType !== 'sponsored' && (
        <form className="flex flex-col px-4 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Description</label>
            <input 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Start Time & End Time</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="startTime"
                value={offerData.startTime}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="Full name" 
              />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Min Purchase (optional)</label>
            <input 
              name="minPurchase"
              value={offerData.minPurchase}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Number of redemptions allowed</label>
            <input 
              name="redemptionsAllowed"
              value={offerData.redemptionsAllowed}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Full name" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="otherOfferImageUpload" className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              {offerData.imagePreview ? (
                <img src={offerData.imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <CameraIcon size={36} className="text-gray-500" />
              )}
              <input 
                id="otherOfferImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">Offer Visibility</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={offerData.isVisible}
                onChange={handleToggleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="mt-4 mb-8 flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}
        
    </div>
  );
};

export default CreateOfferPage;