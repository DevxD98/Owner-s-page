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
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading offer details...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pb-24 relative bg-white"
    >
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-3 rounded-full p-2 hover:bg-gray-100 text-gray-700 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Boost Your Offer
        </h1>
      </div>
      
      {/* Main content with padding */}
      <div className="px-5 pt-6 pb-2 max-w-md mx-auto">

      {/* Duration selector */}
      <div className="mb-7">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Duration</h2>
        <div className="flex items-center">
          <div className="relative w-full">
            <input
              type="number"
              min="0"
              max="30"
              value={duration}
              onChange={handleDurationChange}
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg text-left bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
              placeholder="Enter days"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              {durationText.split(" ")[1]}
            </div>
          </div>
          
          <div className="flex items-center ml-4">
            <button className="p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all">
              <Calendar size={20} className="text-gray-500" />
            </button>
            <span className="ml-3 text-gray-600 text-sm">Starts today</span>
          </div>
        </div>
      </div>
      
      {/* Set Budget section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Set Your Budget</h2>
        
        <div className="mb-6 flex items-center">
          <div className="w-6 h-6 rounded-full bg-purple-700 mr-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <p className="text-gray-600">Adjust your spend to reach more users</p>
        </div>
        
        <div className="relative mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-lg font-semibold text-gray-700">₹{cost}</span>
            <span className="text-lg font-semibold text-gray-700">₹{maxCost.toLocaleString()}</span>
          </div>
          
          <div className="relative h-9 flex items-center">
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
              className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
            />
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full">
              <div 
                className="h-1.5 bg-purple-600 rounded-full" 
                style={{ width: `${(cost / maxCost) * 100}%` }}
              ></div>
            </div>
            
            <div 
              className={`absolute top-0 left-0 w-6 h-6 bg-purple-600 rounded-full -mt-2 -ml-3 shadow-md flex items-center justify-center transition-transform ${isDragging ? 'scale-125 shadow-lg' : ''}`}
              style={{ left: `${cost === 0 ? '0%' : `${(cost / maxCost) * 100}%`}` }}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm font-medium text-gray-600">Min</span>
            <span className="text-sm font-medium text-gray-600">Max</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1.5">Or manually enter budget</p>
            <input 
              type="number" 
              placeholder="e.g. 1800"
              value={cost || ""}
              onChange={handleCostChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1.5">Or manually enter reach</p>
            <input 
              type="number" 
              placeholder="e.g. 9000"
              value={views || ""}
              onChange={handleViewsChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
        
        {inputError && (
          <div className="mt-2 text-red-500 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {inputError}
          </div>
        )}
        
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-purple-700">Est. Reach: <span className="text-gray-800">{viewsFormatted}</span></h3>
              <p className="text-gray-600">users</p>
            </div>
            <div className="flex items-center">
              <Eye size={18} className="text-gray-600 mr-2" />
              <span className="text-gray-600 text-sm">Visible to all app users nearby</span>
            </div>
          </div>
        </div>

        {cost > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp size={16} className="text-indigo-600 mr-1.5" />
                <span className="text-sm font-medium text-gray-700">Est. Clicks</span>
              </div>
              <p className="text-lg font-bold text-indigo-700 mt-1">{estimatedClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center">
                <Users size={16} className="text-indigo-600 mr-1.5" />
                <span className="text-sm font-medium text-gray-700">Est. Conversions</span>
              </div>
              <p className="text-lg font-bold text-indigo-700 mt-1">{estimatedConversions.toLocaleString()}</p>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Budget</h3>
          <p className="text-2xl font-bold text-purple-700">₹{cost.toLocaleString()}</p>
        </div>
        
        <div className="mt-4 flex items-center">
          <input 
            type="checkbox" 
            id="termsAgreement" 
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
            className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 mr-2"
          />
          <label htmlFor="termsAgreement" className="text-gray-700">
            I agree to the <span className="text-purple-700">Sponsored Ads Terms</span>.
          </label>
        </div>
      </div>

      {/* Action Buttons - Mobile style fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-20 backdrop-blur-md">
        <div className="border-b border-gray-100 py-2.5 px-4 flex justify-between items-center bg-indigo-50/80">
          <div className="text-sm font-medium text-gray-800">
            Selected: <span className="text-indigo-600">Custom Boost</span>
          </div>
          <div className="text-indigo-700 font-bold">{costFormatted}</div>
        </div>
        
        <div className="flex justify-between items-center p-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="w-[120px] py-3.5 bg-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-all border border-gray-200 shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleBoost}
            disabled={loading || !agreeToTerms || cost === 0}
            className={`flex-1 ml-4 py-3.5 rounded-xl text-white font-medium flex items-center justify-center ${
              loading || !agreeToTerms || cost === 0
                ? 'bg-gray-400 opacity-70 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            } transition-all shadow-md`}
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
                <Zap size={20} className="mr-2 animate-pulse" /> Boost for {costFormatted}
              </span>
            )}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BoostOfferPage;
