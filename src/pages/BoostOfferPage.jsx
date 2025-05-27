import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, TrendingUp, Zap, Users, Eye, BarChart3, Calendar, ChevronDown, Info } from 'lucide-react';

const BoostOfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { offers, updateOffer } = useApp();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [duration, setDuration] = useState(0);
  const [durationText, setDurationText] = useState("0 Days");
  const [inputError, setInputError] = useState("");
  
  // Boost parameters
  const [views, setViews] = useState(0); // Start with 0 views
  const [cost, setCost] = useState(0); // Start with 0 cost
  const minViews = 0;
  const maxViews = 15000;
  const viewsPerRupee = 3; // 100 rupees = 300 views, so 3 views per rupee
  const maxCost = 5000; // Maximum budget of ₹5000
  
  // UI States
  const [isDragging, setIsDragging] = useState(false);
  
  // For slider input value display
  const viewsFormatted = new Intl.NumberFormat('en-IN').format(views);
  const costFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(cost);

  // Get the offer ID from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const offerId = searchParams.get('id');

  useEffect(() => {
    // Find the offer based on the ID
    if (offerId && offers) {
      const foundOffer = offers.find(o => o.id === offerId);
      if (foundOffer) {
        setOffer(foundOffer);
      } else {
        // Redirect if offer not found
        navigate('/offer-management');
      }
    }
  }, [offerId, offers, navigate]);

  // Format duration text based on number of days
  const formatDurationText = (days) => {
    if (days === 0) return "0 Days";
    return days === 1 ? "1 Day" : `${days} Days`;
  };

  useEffect(() => {
    setDurationText(formatDurationText(duration));
  }, [duration]);

  // Calculate estimated stats
  const estimatedClicks = Math.round(views * 0.05); // Assuming 5% click rate
  const estimatedConversions = Math.round(estimatedClicks * 0.15); // Assuming 15% conversion rate from clicks
  
  // Handle views/cost calculation
  const handleViewsChange = (e) => {
    const value = e.target.value;
    setInputError("");
    const newViews = value === "" ? 0 : parseInt(value);
    
    if (!isNaN(newViews)) {
      if (newViews >= minViews && newViews <= maxViews) {
        setViews(newViews);
        setCost(Math.round(newViews / viewsPerRupee));
      } else {
        setInputError(`Views must be between ${minViews} and ${maxViews.toLocaleString()}`);
      }
    }
  };
  
  const handleCostChange = (e) => {
    const value = e.target.value;
    setInputError("");
    const newCost = value === "" ? 0 : parseInt(value);
    
    if (!isNaN(newCost)) {
      if (newCost >= 0 && newCost <= maxCost) {
        setCost(newCost);
        setViews(newCost * viewsPerRupee);
      } else {
        setInputError(`Budget must be between ₹0 and ₹${maxCost.toLocaleString()}`);
      }
    }
  };
  
  const handleDurationChange = (e) => {
    const value = e.target.value;
    const days = value === "" ? 0 : parseInt(value);
    
    if (!isNaN(days) && days >= 0 && days <= 30) {
      setDuration(days);
    }
  };
  
  const handleSliderChange = (e) => {
    const value = e.target.value;
    const newCost = parseInt(value);
    setInputError("");
    
    if (!isNaN(newCost)) {
      setCost(newCost);
      setViews(newCost * viewsPerRupee);
    }
  };

  const handleBoost = () => {
    if (!agreeToTerms) {
      alert("Please agree to the Sponsored Ads Terms before proceeding.");
      return;
    }
    
    if (cost === 0) {
      alert("Please select a budget for your promotion.");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to boost the offer
    setTimeout(() => {
      if (offer) {
        // Update the offer with boosted flag and additional views
        updateOffer(offer.id, { 
          isBoosted: true, 
          views: (offer.views || 0) + views, 
          boostedViews: views,
          boostDuration: duration,
          boostCost: cost
        });
        
        setLoading(false);
        // Show success message and redirect back
        alert(`Offer "${offer?.title}" has been successfully boosted to reach approximately ${viewsFormatted} additional views!`);
        navigate('/offer-management');
      }
    }, 1500);
  };

  // Calculate the estimated reach based on base views + boosted views
  const totalReach = (offer?.views || 0) + views;
  const totalReachFormatted = new Intl.NumberFormat('en-IN').format(totalReach);

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap size={24} className="text-white" />
          </div>
          <div className="text-gray-500 font-medium">Loading offer details...</div>
          <div className="text-xs text-gray-400 mt-2">Please wait while we fetch your offer</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pb-32 relative bg-gray-50"
    >
      {/* Header - Enhanced mobile responsive design */}
      <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-20 border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-3 rounded-full p-2 hover:bg-gray-100 active:bg-gray-200 text-gray-700 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              Boost Your Offer
            </h1>
            <p className="text-xs text-gray-500 hidden xs:block">Increase visibility and reach</p>
          </div>
        </div>
        
        {/* Header action indicator */}
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-xs font-medium text-purple-700 hidden xs:block">Campaign Builder</span>
        </div>
      </div>

      {/* Offer Preview Card - Enhanced mobile layout */}
      <div className="p-4 pt-6 mt-1 z-10 relative">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
          
          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <Zap size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-lg leading-tight mb-1">{offer.title}</h3>
              <div className="flex items-center mb-3">
                <Eye size={14} className="text-gray-500 mr-1" />
                <p className="text-sm text-gray-600">Currently reaching {offer.views || 0} users</p>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  offer.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${offer.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  {offer.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="text-xs text-gray-500">
                  Type: <span className="font-medium text-gray-700">{offer.offerType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with responsive padding */}
      <div className="px-4 pb-2 max-w-lg mx-auto">

      {/* Duration selector - Enhanced mobile UX */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <Calendar size={16} className="text-purple-600" />
          </div>
          Campaign Duration
        </h2>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              min="0"
              max="30"
              value={duration}
              onChange={handleDurationChange}
              className="w-full p-4 pr-20 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all text-lg font-medium bg-gray-50 focus:bg-white"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              {duration === 1 ? 'Day' : 'Days'}
            </div>
          </div>
          
          {/* Quick duration presets */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 3, 7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setDuration(days)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  duration === days
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {days} {days === 1 ? 'Day' : 'Days'}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Starts immediately</span>
            </div>
            <span className="font-medium text-purple-700">
              {duration > 0 ? `${duration} day campaign` : 'Set duration above'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Set Budget section - Mobile optimized */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <div className="w-6 h-6 rounded-full bg-purple-700 mr-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          Set Your Budget
        </h2>
        
        <p className="text-gray-600 text-sm mb-4">Adjust your spend to reach more users in your area</p>
        
        {/* Slider Section - Enhanced for mobile */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">₹0</span>
            <span className="text-lg font-bold text-purple-700">₹{cost.toLocaleString()}</span>
            <span className="text-sm font-medium text-gray-600">₹{maxCost.toLocaleString()}</span>
          </div>            <div className="relative h-10 flex items-center mb-4">
            <input
              type="range"
              min="0"
              max={maxCost}
              step="100"
              value={cost}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute w-full h-10 opacity-0 cursor-pointer z-10"
            />
            <div className="absolute w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-200" 
                style={{ width: `${(cost / maxCost) * 100}%` }}
              ></div>
            </div>
            
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-3 border-purple-600 rounded-full -ml-3 shadow-md flex items-center justify-center transition-transform ${isDragging ? 'scale-110 shadow-xl' : ''}`}
              style={{ left: `${cost === 0 ? '0%' : `${(cost / maxCost) * 100}%`}` }}
            >
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Manual Input Fields - Enhanced responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <div className="w-4 h-4 rounded bg-purple-100 mr-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              Budget (₹)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 1800"
              value={cost || ""}
              onChange={handleCostChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all text-lg font-medium bg-gray-50 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <div className="w-4 h-4 rounded bg-blue-100 mr-2 flex items-center justify-center">
                <Users size={10} className="text-blue-600" />
              </div>
              Reach (Users)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 5400"
              value={views || ""}
              onChange={handleViewsChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all text-lg font-medium bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
        
        {inputError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-600 mr-2 flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-red-700 text-sm font-medium">{inputError}</span>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-purple-700">Est. Reach: <span className="text-gray-800">{viewsFormatted}</span></h3>
              <p className="text-gray-600 text-sm">users in your area</p>
            </div>
            <div className="flex items-center bg-white/50 px-2 py-1 rounded-lg">
              <Eye size={16} className="text-gray-600 mr-1" />
              <span className="text-gray-600 text-xs">Visible to all nearby</span>
            </div>
          </div>
          
          {/* Performance indicators with icons */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center">
              <BarChart3 size={14} className="mr-1 text-purple-600" />
              <span>High visibility campaign</span>
            </div>
            <div className="flex items-center">
              <TrendingUp size={14} className="mr-1 text-green-600" />
              <span>Peak hours boost</span>
            </div>
          </div>
        </div>

        {cost > 0 && (
          <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-3">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Est. Clicks</span>
              </div>
              <p className="text-xl font-bold text-blue-700">{estimatedClicks.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">From your campaign</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Users size={16} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Est. Conversions</span>
              </div>
              <p className="text-xl font-bold text-green-700">{estimatedConversions.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Potential customers</p>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Campaign Budget</h3>
              <p className="text-xs text-gray-500 mt-1">For {duration > 0 ? `${duration} day${duration > 1 ? 's' : ''}` : 'immediate boost'}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-700">₹{cost.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{views > 0 ? `≈ ${viewsFormatted} reach` : ''}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="termsAgreement" 
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
              className="w-5 h-5 rounded-md text-purple-600 focus:ring-purple-500 focus:ring-2 mr-3 mt-0.5 flex-shrink-0"
            />
            <div className="flex-1">
              <label htmlFor="termsAgreement" className="text-gray-700 text-sm leading-relaxed cursor-pointer">
                I agree to the <span className="text-purple-700 font-medium underline">Sponsored Ads Terms</span> and understand that charges will apply to my account.
              </label>
              <div className="flex items-center mt-2">
                <Info size={14} className="text-amber-600 mr-1" />
                <span className="text-xs text-amber-700">Your campaign will start immediately after payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Enhanced mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-20">
        {/* Campaign Summary Bar */}
        <div className="border-b border-gray-100 py-3 px-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80">
          <div className="flex justify-between items-center max-w-lg mx-auto">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <div className="text-sm font-medium text-gray-800">
                {cost > 0 ? 'Campaign Ready' : 'Set Budget'}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">{views > 0 ? `${viewsFormatted} reach` : 'No reach'}</span>
              <div className="text-indigo-700 font-bold text-lg">{costFormatted}</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-4 max-w-lg mx-auto">
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-all border border-gray-200 shadow-sm active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={handleBoost}
              disabled={loading || !agreeToTerms || cost === 0}
              className={`flex-1 py-3.5 rounded-xl text-white font-medium flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                loading || !agreeToTerms || cost === 0
                  ? 'bg-gray-400 opacity-70 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Zap size={20} className="mr-2 animate-pulse" /> 
                  {cost > 0 ? `Boost for ${costFormatted}` : 'Set Budget First'}
                </span>
              )}
            </button>
          </div>
          
          {/* Quick help text for mobile */}
          {!agreeToTerms && cost > 0 && (
            <div className="mt-3 flex items-center justify-center">
              <Info size={14} className="text-amber-600 mr-1" />
              <span className="text-xs text-amber-700">Please agree to terms to continue</span>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BoostOfferPage;
