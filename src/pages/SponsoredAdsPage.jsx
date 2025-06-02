import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, HelpCircle, Check, Video, Image as ImageIcon, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const SponsoredAdsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOffer, updateOffer } = useApp();
  
  // Get the ad type from location state
  const adType = location.state?.adType || 'image';
  
  // Reset scroll position to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Redirect to selection page if coming directly to this page
  useEffect(() => {
    if (!location.state?.adType) {
      navigate('/ad-type-selection');
    }
  }, [location.state, navigate]);
  
  // Ad details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  
  // Duration and targeting
  const [duration, setDuration] = useState(1);
  const [durationOptions] = useState([1, 3, 7, 14, 30]);
  const [targetOptions] = useState(['location', 'age', 'gender', 'interests']);
  const [selectedTargets, setSelectedTargets] = useState({
    location: null,
    age: null,
    gender: null,
    interests: null
  });
  
  // Budget
  const [budget, setBudget] = useState(500);
  const [minBudget] = useState(500);
  const [maxBudget] = useState(5000);
  const [reach, setReach] = useState(8500);
  const [reachPerRupee] = useState(17); // 17 users per rupee
  
  // UI states
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  
  // Format values
  const formattedBudget = '₹' + budget.toLocaleString();
  const formattedTotalBudget = '₹' + (budget * duration).toLocaleString();
  const formattedReach = reach.toLocaleString() + ' users';
  
  // Calculate reach based on budget
  useEffect(() => {
    setReach(Math.floor(budget * reachPerRupee));
  }, [budget, reachPerRupee]);
  
  // Handle file upload (image or video depending on adType)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (adType === 'image') {
          setImagePreview(reader.result);
        } else if (adType === 'video') {
          setVideoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle budget input
  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value) || minBudget;
    if (value >= minBudget && value <= maxBudget) {
      setBudget(value);
    }
  };
  
  // Handle budget slider
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minBudget && value <= maxBudget) {
      setBudget(value);
    }
  };
  
  // Handle reach input
  const handleReachChange = (e) => {
    const value = parseInt(e.target.value);
    if (value && value > 0) {
      const newBudget = Math.floor(value / reachPerRupee);
      if (newBudget >= minBudget && newBudget <= maxBudget) {
        setBudget(newBudget);
      }
    }
  };
  
  // Handle duration select
  const handleDurationSelect = (days) => {
    setDuration(days);
  };
  
  // Start promotion
  const handleStartPromotion = () => {
    if (!agreeToTerms) {
      alert('Please agree to the Sponsored Ads Terms');
      return;
    }
    
    if (!title.trim()) {
      alert('Please enter an ad title');
      return;
    }
    
    // Create the sponsored ad
    const newAd = {
      title,
      description,
      image: imagePreview,
      imagePreview,
      isSponsored: true,
      isActive: true,
      isDraft: false,
      duration,
      budget: budget * duration,
      targetingOptions: selectedTargets,
      estimatedReach: reach * duration,
      validTill: getValidTillDate(duration),
      type: 'sponsored'
    };
    
    addOffer(newAd);
    alert('Your sponsored ad has been created successfully!');
    navigate('/my-ads');
  };
  
  // Get valid till date based on duration
  const getValidTillDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };
  
  // Format today's date for display
  const formatTodayDate = () => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="min-h-screen bg-white pb-36">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate('/ad-type-selection')} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">
          {adType === 'video' ? 'Create Video Ad' : 'Create Image Ad'}
        </h1>
      </div>
      
      <div className="p-4 space-y-5">
        {/* Ad Type Indicator */}
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full ${adType === 'video' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center mr-3`}>
            {adType === 'video' ? (
              <Video size={20} className="text-blue-600" />
            ) : (
              <ImageIcon size={20} className="text-green-600" />
            )}
          </div>
          <div>
            <h2 className="font-semibold">{adType === 'video' ? 'Video Ad' : 'Image Ad'}</h2>
            <p className="text-sm text-gray-600">
              {adType === 'video' ? 'Short video content' : 'Static image with text'}
            </p>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ad Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder={adType === 'video' ? 'Enter video title' : 'Enter image title'}
          />
        </div>
        
        {/* Description Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ad Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder={adType === 'video' ? 'Describe your video ad' : 'Describe your image ad'}
          />
        </div>

        {/* Media Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {adType === 'video' ? 'Upload Video' : 'Upload Image'}
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <div className={`${adType === 'video' ? (videoPreview ? 'hidden' : 'block') : (imagePreview ? 'hidden' : 'block')}`}>
              <div className={`w-16 h-16 mx-auto rounded-full ${adType === 'video' ? 'bg-blue-50' : 'bg-green-50'} flex items-center justify-center mb-2`}>
                {adType === 'video' ? (
                  <Video size={32} className="text-blue-400" />
                ) : (
                  <ImageIcon size={32} className="text-green-400" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {adType === 'video' ? 'MP4, WebM or MOV up to 60 seconds' : 'JPG, PNG or GIF up to 5MB'}
              </p>
              <label className="cursor-pointer">
                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  {adType === 'video' ? 'Select Video' : 'Select Image'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept={adType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            {adType === 'image' && imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="rounded-lg max-h-64 mx-auto" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            {adType === 'video' && videoPreview && (
              <div className="relative">
                <video
                  src={videoPreview}
                  controls
                  className="rounded-lg max-h-64 mx-auto"
                />
                <button
                  onClick={() => setVideoPreview(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Duration */}
        <div>
          <h2 className="text-base font-medium mb-2">Duration</h2>
          <div className="relative">
            <div className="flex items-center">
              <div className="flex-grow bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full p-4 bg-transparent appearance-none focus:outline-none font-medium text-gray-700"
                >
                  {durationOptions.map((day) => (
                    <option key={day} value={day}>{day} {day === 1 ? 'Day' : 'Days'}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 flex items-center bg-gray-100 p-4 rounded-lg border border-gray-200">
                <Calendar size={18} className="mr-2 text-[#5931fd]" />
                <span className="text-sm">Starts today</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Target Audience */}
        <div>
          <h2 className="text-base font-medium mb-2">Target Audience</h2>
          <div className="flex space-x-2">
            <div className="bg-gray-100 rounded-lg p-4 flex-grow border border-gray-200 flex justify-between items-center">
              <span className="text-gray-700">Location</span>
              <span className="text-gray-500">⌄</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex-grow border border-gray-200 flex justify-between items-center">
              <span className="text-gray-700">Gender</span>
              <span className="text-gray-500">⌄</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex-grow border border-gray-200 flex justify-between items-center">
              <span className="text-gray-700">Age</span>
              <span className="text-gray-500">⌄</span>
            </div>
          </div>
        </div>
        
        {/* Budget Section */}
        <div>
          <h2 className="text-base font-medium mb-2">Set Your Budget</h2>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">₹{minBudget}</span>
            <span className="text-sm">₹{maxBudget}</span>
          </div>
          <div className="relative mb-6 pt-2 pb-4">
            <div className="relative w-full h-8">
              {/* Track line */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full"
              ></div>
              {/* Active track */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 h-2 rounded-full"
                style={{ 
                  width: `${(budget - minBudget) / (maxBudget - minBudget) * 100}%`,
                  background: 'linear-gradient(to right, #4338ca, #6366f1)'
                }}
              ></div>
              {/* Handle */}
              <input 
                type="range"
                min={minBudget}
                max={maxBudget}
                step={100}
                value={budget}
                onChange={handleSliderChange}
                onMouseDown={() => setIsSliderDragging(true)}
                onMouseUp={() => setIsSliderDragging(false)}
                onTouchStart={() => setIsSliderDragging(true)}
                onTouchEnd={() => setIsSliderDragging(false)}
                className="absolute top-0 left-0 w-full h-8 opacity-0 cursor-pointer m-0 p-0 z-10"
              />
              <div 
                className={`absolute top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full transition-all duration-200 shadow-lg ${isSliderDragging ? 'shadow-indigo-200' : ''}`}
                style={{ 
                  left: `${(budget - minBudget) / (maxBudget - minBudget) * 100}%`,
                  background: isSliderDragging ? 
                    'linear-gradient(145deg, #5046e5, #4338ca)' : 
                    'linear-gradient(145deg, #6366f1, #4f46e5)',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: isSliderDragging ? 
                    '0 0 0 6px rgba(99, 102, 241, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)' : 
                    '0 0 0 4px rgba(99, 102, 241, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Inner circle for better visual effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Or manually enter budget</p>
              <input
                type="number"
                value={budget}
                onChange={handleBudgetChange}
                placeholder="e.g. 500"
                className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 font-medium text-gray-700"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Or manually enter reach</p>
              <input
                type="number"
                value={reach}
                onChange={handleReachChange}
                placeholder="e.g. 5000"
                className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 font-medium text-gray-700"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#f5f0ff] rounded-xl border border-[#e9e3fa]">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Est. Reach</h3>
                <p className="text-sm text-gray-500 mt-1">Potential customers</p>
              </div>
              <div className="text-right flex items-baseline">
                <p className="text-[2rem] font-bold text-[#5931fd]">{reach.toLocaleString()}</p>
                <p className="text-sm text-gray-500 ml-1">users</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[#f5f0ff] rounded-xl border border-[#e9e3fa]">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Budget</h3>
                <p className="text-sm text-gray-500 mt-1">For {duration > 1 ? `${duration} days` : '1 day'}</p>
              </div>
              <div className="text-right">
                <p className="text-[2rem] font-bold text-[#5931fd]">₹{(budget * duration).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terms Agreement */}
        <div className="mt-5 p-4 bg-[#fffbea] border border-[#ffeeba] rounded-xl">
          <div className="flex items-start" onClick={() => setAgreeToTerms(!agreeToTerms)}>
            <div className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded mr-3 cursor-pointer mt-0.5 ${agreeToTerms ? 'bg-[#5931fd]' : 'border-2 border-gray-300'}`}>
              {agreeToTerms && <Check size={16} className="text-white" />}
            </div>
            <div className="flex-1">
              <label htmlFor="terms" className="text-gray-700 text-sm leading-relaxed cursor-pointer block">
                I agree to the <span className="text-[#5931fd] font-medium">Sponsored Ads Terms</span> and understand that charges will apply to my account.
              </label>
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Button - Enhanced mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-20">
        {/* Campaign Summary Bar */}
        <div className="border-b border-gray-100 py-3 px-4 bg-gray-50">
          <div className="flex justify-between items-center max-w-lg mx-auto">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <div className="text-base font-medium text-gray-800">
                Campaign Ready
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-3">{reach.toLocaleString()} users</span>
              <div className="text-[#5931fd] font-bold text-xl">₹{(budget * duration).toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 max-w-lg mx-auto">
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-all border border-gray-200 shadow-sm flex-1"
            >
              Cancel
            </button>
            <button 
              onClick={handleStartPromotion}
              disabled={!agreeToTerms || budget <= minBudget}
              className={`flex-1 py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center transition-all ${
                !agreeToTerms || budget <= minBudget
                  ? 'bg-gray-400 opacity-70 cursor-not-allowed' 
                  : 'bg-[#5931fd]'
              }`}
            >
              <span className="flex items-center justify-center">
                Start Promotion
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsoredAdsPage;
