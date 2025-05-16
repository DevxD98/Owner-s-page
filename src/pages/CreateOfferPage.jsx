import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, X, FileText, Info, FilePenLine, Sparkles, Clock, Gift } from 'lucide-react';
import SpotlightOfferIcon from '../components/icons/SpotlightOfferIcon';
import HappyhoursOfferIcon from '../components/icons/HappyhoursOfferIcon';
import SpintoWinIcon from '../components/icons/SpintoWinIcon';
import CameraIcon from '../components/icons/CameraIcon';
import DatePicker from '../components/DatePicker';
import { useApp } from '../contexts/AppContext';

const offerTypes = [
  { id: 'spotlight', icon: <Sparkles size={24} className="mx-auto" />, label: 'Spotlight' },
  { id: 'happyhours', icon: <Clock size={24} className="mx-auto" />, label: 'Happy Hours' },
  { id: 'spintowin', icon: <Gift size={24} className="mx-auto" />, label: 'Spin to Win' },
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

  // Create refs for each offer type section
  const spotlightSectionRef = React.useRef(null);
  const happyhoursSectionRef = React.useRef(null);
  const spintowinSectionRef = React.useRef(null);

  // Handle scrolling to specific section when returning from preview
  useEffect(() => {
    if (location.state?.fromPreview && location.state?.scrollToSection) {
      const section = location.state.scrollToSection;
      setSelectedOfferType(section); // Set the active tab
      
      // Scroll to the appropriate section with a slight delay to ensure rendering
      setTimeout(() => {
        let targetRef;
        switch (section) {
          case 'spotlight':
            targetRef = spotlightSectionRef;
            break;
          case 'happyhours':
            targetRef = happyhoursSectionRef;
            break;
          case 'spintowin':
            targetRef = spintowinSectionRef;
            break;
          default:
            targetRef = null;
        }
        
        if (targetRef?.current) {
          targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state]);

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
  
  // Format time string for display (converts 24-hour time to 12-hour format)
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return '';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const minute = minutes;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minute} ${period}`;
    } catch (e) {
      return timeString;
    }
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
    <div className="min-h-screen bg-white flex flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced gradient overlay with longer fade effect */}
      <div style={{
        background: "linear-gradient(180deg, rgba(129,140,248,0.2) 0%, rgba(196,181,253,0.15) 30%, rgba(224,231,255,0.05) 70%, rgba(255,255,255,0) 100%)"
      }} className="absolute top-0 left-0 w-full h-36 z-0 pointer-events-none"></div>
      
      {/* Subtle animated light effect */}
      <div className="absolute top-0 left-0 w-full opacity-10 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-5 left-[10%] w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-10 right-[15%] w-24 h-24 bg-gradient-to-br from-purple-100/20 to-transparent rounded-full blur-xl animate-float-slow-reverse"></div>
      </div>
      
      {/* Header */}
      <div className="flex items-center p-4 relative z-10 shadow-sm bg-white bg-opacity-90">
        <button onClick={() => navigate(-1)} className="mr-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Create New Offer</h1>
      </div>
      
      {/* Offer Type Selection */}
      <div className="relative z-10 bg-white bg-opacity-90 shadow-sm rounded-b-xl">
        <div className="flex justify-between px-4 py-5 mb-6 max-w-sm mx-auto">
          {offerTypes.map((type) => (
            <button 
              key={type.id} 
              className={`flex flex-col items-center w-24 transition-all`}
              onClick={() => setSelectedOfferType(type.id)}
            >
              <div className={`p-3 flex items-center justify-center rounded-full mb-2 transition-all
                ${selectedOfferType === type.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-300'
                  : 'bg-gray-100 text-gray-500'}`
              }>
                {type.icon}
              </div>
              <span className={`text-sm text-center font-medium transition-colors
                ${selectedOfferType === type.id ? 'text-blue-600' : 'text-gray-500'}`
              }>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spotlight Offer Form */}
      {selectedOfferType === 'spotlight' && (
        <form ref={spotlightSectionRef} className="flex flex-col px-4 py-5 gap-6 bg-white mx-auto max-w-md rounded-xl relative z-10" onSubmit={handleSubmit}>
          <div className="mb-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Sparkles size={18} className="text-blue-600 mr-2" /> 
              Spotlight Details
            </h2>
            <p className="text-sm text-gray-500">Create a special promotional offer to highlight your products or services</p>
          </div>
          
          {/* Offer Name */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Name</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="20% Off on All Haircuts" 
            />
            <p className="text-xs text-gray-500 mt-1">Create a clear, attractive title for your offer</p>
          </div>
          
          {/* Offer Description */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Description</label>
            <textarea 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="Pamper yourself with a luxury haircut and styling"
              rows={2}
            />
            <p className="text-xs text-gray-500 mt-1">Briefly describe what customers will get with this offer</p>
          </div>
          
          {/* Select Offer Category */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Select Category</label>
            <input 
              name="category"
              value={offerData.category}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="Beauty" 
            />
            <p className="text-xs text-gray-500 mt-1">Choose a category that best fits your offer (e.g. Food, Beauty, Services)</p>
          </div>
          
          {/* Set Offer Validity Date */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Set Validity Date</label>
            <div className="w-full rounded-xl border bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
              <DatePicker
                value={offerData.validityDate}
                onChange={(date) => setOfferData({ ...offerData, validityDate: date })}
                placeholder="Date"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Choose the date until which this offer will be valid</p>
          </div>
          
          {/* Min Purchase (optional) */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Min Purchase (optional)</label>
            <div className="relative w-full rounded-xl border bg-gray-50 px-4 py-3.5 flex items-center focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
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
            <p className="text-xs text-gray-500 mt-1">Set a minimum purchase amount required to use this offer</p>
          </div>
          
          {/* Number of redemptions allowed */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Number of Redemptions</label>
            <input 
              name="redemptionsAllowed"
              value={offerData.redemptionsAllowed}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="100" 
              type="number"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Enter the maximum number of redemptions (leave empty for unlimited)</p>
          </div>
          
          {/* Upload Offer Image */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Upload Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="offerImageUpload" className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Click to upload an image</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG or GIF files accepted</span>
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
            <p className="text-xs text-gray-500 mt-1">Upload an attractive image to showcase your offer</p>
          </div>
          
          {/* Notify Followers */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mt-2">
            <div>
              <span className="font-medium text-gray-700">Notify Followers</span>
              <p className="text-xs text-gray-500">Send a notification when this offer goes live</p>
            </div>
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
          <div className="mt-6 mb-4 flex space-x-4">
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
              className="flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FilePenLine size={18} className="mr-2" />
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center"
            >
              <svg 
                className="mr-2" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4C7.9 4 4.1 6.91 2.08 11.6C2.03 11.72 2 11.86 2 12C2 12.14 2.03 12.28 2.08 12.4C4.1 17.09 7.9 20 12 20C16.1 20 19.9 17.09 21.92 12.4C21.97 12.28 22 12.14 22 12C22 11.86 21.97 11.72 21.92 11.6ZM12 18C8.83 18 5.83 15.71 4.05 12C5.83 8.29 8.83 6 12 6C15.17 6 18.17 8.29 19.95 12C18.17 15.71 15.17 18 12 18Z" fill="currentColor"/>
                <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
              </svg>
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-4 cursor-pointer border-t border-gray-200 rounded-xl transition-colors hover:bg-gray-50"
            onClick={() => navigate('/draft-offers')}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-800">Saved Drafts</span>
                <p className="text-xs text-gray-500">View and edit your saved offer drafts</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </form>
      )}

      {/* Happy Hours Offer Form */}
      {selectedOfferType === 'happyhours' && (
        <form ref={happyhoursSectionRef} className="flex flex-col px-4 py-5 gap-6 bg-white mx-auto max-w-md rounded-xl relative z-10" onSubmit={handleSubmit}>
          <div className="mb-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Clock size={18} className="text-blue-600 mr-2" /> 
              Happy Hours Details
            </h2>
            <p className="text-sm text-gray-500">Set up a time-limited special offer for your customers</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Title</label>
            <input 
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="Happy Hour Special - Buy 1 Get 1 Free" 
            />
            <p className="text-xs text-gray-500 mt-1">Create an engaging title for your happy hour offer</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Description</label>
            <textarea
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="Enjoy our special happy hour offer"
              rows={2} 
            />
            <p className="text-xs text-gray-500 mt-1">Provide details about what's included in your happy hour special</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Start Time & End Time</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative w-full rounded-xl border bg-gray-50 px-4 py-3.5 flex items-center focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
                <input 
                  name="startTime"
                  value={offerData.startTime}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none" 
                  placeholder="2:00 PM"
                  type="time"
                />
              </div>
              <div className="relative w-full rounded-xl border bg-gray-50 px-4 py-3.5 flex items-center focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
                <input 
                  name="endTime"
                  value={offerData.endTime}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none" 
                  placeholder="4:00 PM"
                  type="time" 
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Set the time window when this happy hour offer is available</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Validity Date</label>
            <div className="w-full rounded-xl border bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
              <DatePicker
                value={offerData.validityDate}
                onChange={(date) => setOfferData({ ...offerData, validityDate: date })}
                placeholder="Select date"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Select the date until which this happy hour offer will be valid</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Min Purchase (optional)</label>
            <div className="relative w-full rounded-xl border bg-gray-50 px-4 py-3.5 flex items-center focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
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
            <p className="text-xs text-gray-500 mt-1">Specify a minimum purchase amount (if applicable)</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Number of Redemptions</label>
            <input 
              name="redemptionsAllowed"
              value={offerData.redemptionsAllowed}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="100" 
              type="number"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Enter the maximum number of redemptions (leave empty for unlimited)</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Upload Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="happyHourImageUpload" className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Click to upload an image</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG or GIF files accepted</span>
                </div>
              )}
              <input 
                id="happyHourImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Upload an image that highlights your happy hour offer</p>
          </div>
          
          {/* Notify Followers */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <span className="font-medium text-gray-700">Notify Followers</span>
              <p className="text-xs text-gray-500">Send a notification when this offer goes live</p>
            </div>
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
          
          <div className="mt-6 mb-4 flex space-x-4">
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
              className="flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FilePenLine size={18} className="mr-2" />
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center"
            >
              <svg 
                className="mr-2" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4C7.9 4 4.1 6.91 2.08 11.6C2.03 11.72 2 11.86 2 12C2 12.14 2.03 12.28 2.08 12.4C4.1 17.09 7.9 20 12 20C16.1 20 19.9 17.09 21.92 12.4C21.97 12.28 22 12.14 22 12C22 11.86 21.97 11.72 21.92 11.6ZM12 18C8.83 18 5.83 15.71 4.05 12C5.83 8.29 8.83 6 12 6C15.17 6 18.17 8.29 19.95 12C18.17 15.71 15.17 18 12 18Z" fill="currentColor"/>
                <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
              </svg>
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-4 cursor-pointer border-t border-gray-200 rounded-xl transition-colors hover:bg-gray-50"
            onClick={() => navigate('/draft-offers')}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-800">Saved Drafts</span>
                <p className="text-xs text-gray-500">View and edit your saved offer drafts</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </form>
      )}

      {/* Spin to Win Form */}
      {selectedOfferType === 'spintowin' && (
        <form ref={spintowinSectionRef} className="flex flex-col px-4 py-5 gap-6 bg-white mx-auto max-w-md rounded-xl relative z-10" onSubmit={handleSubmit}>
          <div className="mb-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Gift size={18} className="text-blue-600 mr-2" /> 
              Spin to Win Details
            </h2>
            <p className="text-sm text-gray-500">Create an interactive wheel of fortune for your customers</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Name</label>
            <input
              name="title"
              value={offerData.title}
              onChange={handleInputChange}
              className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none" 
              placeholder="Spin to Win - Get up to 50% OFF" 
            />
            <p className="text-xs text-gray-500 mt-1">Enter a catchy name for your spin wheel offer</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Enter Spinner Offers</label>
            {offerData.spinnerOffers.map((offer, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  value={offer}
                  onChange={(e) => {
                    const newOffers = [...offerData.spinnerOffers];
                    newOffers[index] = e.target.value;
                    setOfferData({ ...offerData, spinnerOffers: newOffers });
                  }}
                  className="flex-1 rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                  placeholder={`Prize ${index + 1} (e.g. "Free Coffee")`}
                />
                <button 
                  type="button" 
                  className="p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => removeSpinnerOffer(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-1">Add prizes that customers can win by spinning the wheel</p>
            <button 
              type="button" 
              onClick={addSpinnerOffer}
              className="w-full py-2.5 mt-2 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
            >
              <span className="text-blue-600 mr-1">+</span> Add Spinner Offer
            </button>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Set Winning Chances</label>
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
                  className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                  placeholder={`Prize ${index + 1}: % chance (e.g. 50%)`}
                  min="0"
                  max="100"
                />
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-1">Define the probability percentage for each prize (total should add up to 100%)</p>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Offer Valid From</label>
            <div className="w-full rounded-xl border bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
              <DatePicker
                value={offerData.validityPeriod}
                onChange={(date) => setOfferData({ ...offerData, validityPeriod: date })}
                placeholder="Date"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Select the date when this offer becomes active</p>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Upload Image <span className="text-xs text-gray-500 ml-1">Keep it under 15 MB</span></label>
            <label htmlFor="spinToWinImageUpload" className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
              {offerData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={offerData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOfferData({...offerData, imagePreview: null, offerImage: null});
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Click to upload an image</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG or GIF files accepted</span>
                </div>
              )}
              <input 
                id="spinToWinImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">Upload an attractive image for your spin wheel offer</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <span className="font-medium text-gray-700">Notify Followers</span>
              <p className="text-xs text-gray-500">Send a notification when this offer goes live</p>
            </div>
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
          
          <div className="mt-6 mb-4 flex space-x-4">
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
              className="flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FilePenLine size={18} className="mr-2" />
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center"
            >
              <svg 
                className="mr-2" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4C7.9 4 4.1 6.91 2.08 11.6C2.03 11.72 2 11.86 2 12C2 12.14 2.03 12.28 2.08 12.4C4.1 17.09 7.9 20 12 20C16.1 20 19.9 17.09 21.92 12.4C21.97 12.28 22 12.14 22 12C22 11.86 21.97 11.72 21.92 11.6ZM12 18C8.83 18 5.83 15.71 4.05 12C5.83 8.29 8.83 6 12 6C15.17 6 18.17 8.29 19.95 12C18.17 15.71 15.17 18 12 18Z" fill="currentColor"/>
                <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="currentColor"/>
              </svg>
              Preview Offer
            </button>
          </div>

          <div 
            className="flex justify-between items-center py-4 cursor-pointer border-t border-gray-200 rounded-xl transition-colors hover:bg-gray-50"
            onClick={() => navigate('/draft-offers')}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-800">Saved Drafts</span>
                <p className="text-xs text-gray-500">View and edit your saved offer drafts</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOfferPage;