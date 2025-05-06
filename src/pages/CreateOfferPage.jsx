import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import SpotlightOfferIcon from '../components/icons/SpotlightOfferIcon';
import HappyhoursOfferIcon from '../components/icons/HappyhoursOfferIcon';
import SpintoWinIcon from '../components/icons/SpintoWinIcon';
import SponsoredAdsIcon from '../components/icons/SponsoredAdsIcon';
import AddCatalogIcon from '../components/icons/AddCatalogIcon';
import CameraIcon from '../components/icons/CameraIcon';
import { useApp } from '../contexts/AppContext';

const offerTypes = [
  { id: 'spotlight', icon: <SpotlightOfferIcon size={36} className="mx-auto" />, label: 'Spotlight Offer' },
  { id: 'happyhours', icon: <HappyhoursOfferIcon size={36} className="mx-auto" />, label: 'Happy hours Offer' },
  { id: 'spintowin', icon: <SpintoWinIcon size={36} className="mx-auto" />, label: 'Spin to Win' },
  { id: 'sponsored', icon: <SponsoredAdsIcon size={36} className="mx-auto" />, label: 'Sponsored Ads' },
  { id: 'catalog', icon: <AddCatalogIcon size={36} className="mx-auto" />, label: 'Add Catalog' },
];

const CreateOfferPage = () => {
  const navigate = useNavigate();
  const { addOffer } = useApp();
  const [selectedOfferType, setSelectedOfferType] = useState('happyhours');
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
    spinnerOffers: ['', ''],
    spinnerProbabilities: ['50', '50']
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add offer logic here
    const offerPayload = {
      title: offerData.title,
      description: offerData.description,
      isActive: offerData.isVisible,
      type: selectedOfferType
    };

    if (selectedOfferType === 'spotlight') {
      offerPayload.validTill = offerData.validityPeriod;
    } else {
      offerPayload.validTill = `${offerData.startTime} - ${offerData.endTime}`;
    }

    addOffer(offerPayload);
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
      <div className="flex flex-row justify-between px-4 mt-2 mb-6">
        {offerTypes.map((type) => (
          <button 
            key={type.id} 
            className={`flex flex-col items-center w-16 ${selectedOfferType === type.id ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setSelectedOfferType(type.id)}
          >
            <div className={`p-2 rounded-full flex items-center justify-center ${selectedOfferType === type.id ? 'bg-gray-200' : ''}`}>
              {type.icon}
            </div>
            <span className="text-xs text-center mt-1 leading-tight">{type.label}</span>
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
              placeholder="Enter offer title" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Description</label>
            <input 
              name="description"
              value={offerData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-gray-100 px-3 py-2" 
              placeholder="Enter offer description" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Validity Period</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="validityPeriod"
                value={offerData.validityPeriod}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="Select validity period" 
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
              placeholder="Enter minimum purchase amount" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <CameraIcon size={36} className="text-gray-500" />
            </div>
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
              Create
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
              placeholder="Enter offer title" 
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
                <input
                  type="number"
                  value={offerData.spinnerProbabilities[index]}
                  onChange={(e) => {
                    const newProbs = [...offerData.spinnerProbabilities];
                    newProbs[index] = e.target.value;
                    setOfferData({ ...offerData, spinnerProbabilities: newProbs });
                  }}
                  className="w-20 rounded-lg border bg-gray-100 px-3 py-2"
                  placeholder="%"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium mb-1">Validity Period</label>
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="validityPeriod"
                value={offerData.validityPeriod}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="Select validity period" 
              />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <CameraIcon size={36} className="text-gray-500" />
            </div>
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
              Create
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
            <div className="relative w-full rounded-lg border bg-gray-100 px-3 py-2 flex items-center">
              <input 
                name="validityPeriod"
                value={offerData.validityPeriod}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none" 
                placeholder="Full name" 
              />
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Offer Image <span className="text-xs text-gray-400 ml-1">Keep it under 15 MB</span></label>
            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <CameraIcon size={36} className="text-gray-500" />
            </div>
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
              Create
            </button>
          </div>
        </form>
      )}

      {/* Other Offer Types Form */}
      {selectedOfferType !== 'spotlight' && selectedOfferType !== 'spintowin' && selectedOfferType !== 'sponsored' && (
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
            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <CameraIcon size={36} className="text-gray-500" />
            </div>
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
              Create
            </button>
          </div>
        </form>
      )}
        
    </div>
  );
};

export default CreateOfferPage;