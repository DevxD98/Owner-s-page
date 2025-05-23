import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, TrendingUp, Zap, Users, Eye, BarChart3 } from 'lucide-react';

const BoostOfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { offers } = useApp();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Boost parameters
  const [views, setViews] = useState(0);
  const [cost, setCost] = useState(0);
  const minViews = 0;
  const maxViews = 10000;
  const viewsPerRupee = 3; // 3 views per rupee
  
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

  // Handle views/cost calculation
  const handleViewsChange = (e) => {
    const value = e.target.value;
    const newViews = value === "" ? 0 : parseInt(value);
    
    if (!isNaN(newViews) && newViews >= 0 && newViews <= maxViews) {
      setViews(newViews);
      setCost(Math.round(newViews / viewsPerRupee));
    }
  };
  
  const handleCostChange = (e) => {
    const value = e.target.value;
    const newCost = value === "" ? 0 : parseInt(value);
    
    if (!isNaN(newCost) && newCost >= 0 && newCost <= maxViews / viewsPerRupee) {
      setCost(newCost);
      setViews(newCost * viewsPerRupee);
    }
  };

  const handleBoost = () => {
    setLoading(true);
    
    // Simulate API call to boost the offer
    setTimeout(() => {
      setLoading(false);
      // Show success message and redirect back
      alert(`Offer "${offer?.title}" has been successfully boosted to reach approximately ${viewsFormatted} views!`);
      navigate('/offer-management');
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
      className="min-h-screen pb-24 relative bg-gray-50"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(248, 250, 255, 0.97), rgba(248, 250, 255, 0.99)),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23667eea' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-4 shadow-md flex items-center sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-3 rounded-full p-2 hover:bg-white/20 text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold flex items-center text-white">
          <span className="bg-white/20 text-white p-1.5 rounded-md mr-2 shadow-inner backdrop-blur-sm">
            <Zap size={20} className="inline" />
          </span>
          Boost Your Offer
          <span className="ml-2 bg-yellow-300 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">Premium</span>
        </h1>
      </div>
      
      {/* Removed Exclusive Offer banner */}

      {/* Offer Information - Similar to Recent Live Offers */}
      <div className="px-4 pt-6 pb-2">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Left vertical accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
          
          {/* Status Indicator */}
          <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            Active
          </div>
          
          <div className="pl-4">
            <h2 className="text-lg font-bold text-gray-800">{offer.title}</h2>
            
            <div className="mt-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                {offer.description}
              </p>
            </div>
            
            <div className="mt-4 border-t border-gray-100 pt-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {offer.type === 'spintowin' ? 'Spin to win!' : 
                     offer.type === 'happyhours' ? 'Happy hours offer' : 
                     'Special offer'}
                  </div>
                  <div className="font-medium">Flat 30% OFF on ₹499+</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye size={16} className="mr-1.5 text-indigo-500" />
                      <span>{offer.views || 230} views</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-1.5 text-indigo-500" />
                      <span>{offer.claimed || 0} claimed</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created {offer.createdAt || '2 weeks ago'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boost with Slider Controls */}
      <div className="px-4 pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold flex items-center">
            <span className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-1.5 rounded-lg mr-3 shadow-md">
              <TrendingUp size={18} />
            </span>
            Boost Your Reach
          </h2>
          <div className="text-sm bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 rounded-full text-indigo-700 font-medium">
            <Eye size={14} className="inline mr-1" /> +{viewsFormatted} views
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {/* Cost Display - Now Editable */}
          <div className="text-center mb-6 relative">
            <div className="inline-flex items-center">
              <span className="text-3xl font-bold text-gray-800">₹</span>
              <input 
                type="number" 
                value={cost === 0 ? "" : cost}
                min={0}
                max={maxViews / viewsPerRupee}
                placeholder="0"
                onChange={(e) => {
                  // Handle empty input as 0
                  const inputVal = e.target.value === "" ? 0 : parseInt(e.target.value);
                  
                  // Make sure we have a valid number
                  if (!isNaN(inputVal) && inputVal >= 0 && inputVal <= maxViews / viewsPerRupee) {
                    setCost(inputVal);
                    setViews(inputVal * viewsPerRupee);
                  }
                }}
                className="text-3xl font-bold text-gray-800 mb-1 w-28 bg-transparent border-b-2 border-indigo-300 focus:border-indigo-600 outline-none text-center hover:bg-gray-50 transition-all"
              />
            </div>
            <p className="text-gray-500 text-sm">Estimated reach: {totalReachFormatted} views</p>
          </div>
          
          {/* Views Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="views-slider" className="text-sm font-medium text-gray-700">
                <Eye size={16} className="inline mr-1" /> Views
              </label>
              <div className="text-sm font-medium text-indigo-600">
                {views === 0 ? "0" : viewsFormatted}
              </div>
            </div>
            <input
              id="views-slider"
              type="range"
              min={0}
              max={maxViews}
              step="100"
              value={views}
              onChange={handleViewsChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>{maxViews.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Cost Slider */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="cost-slider" className="text-sm font-medium text-gray-700">
                <span className="inline-block">₹</span> Budget
              </label>
              <span className="text-sm font-medium text-indigo-600">{costFormatted}</span>
            </div>
            <input
              id="cost-slider"
              type="range"
              min={0}
              max={maxViews / viewsPerRupee}
              step="10"
              value={cost}
              onChange={handleCostChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹{(maxViews / viewsPerRupee).toLocaleString()}</span>
            </div>
          </div>
          
          {/* Boost Features */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Boost includes:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-xs">
                  ✓
                </span>
                <span>Increased visibility in search results</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-xs">
                  ✓
                </span>
                <span>Featured in "Popular Offers" section</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-xs">
                  ✓
                </span>
                <span>Detailed performance analytics</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-xs">
                  ✓
                </span>
                <span>Boost active for 7 days</span>
              </li>
            </ul>
          </div>
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
            disabled={loading}
            className={`flex-1 ml-4 py-3.5 rounded-xl text-white font-medium flex items-center justify-center ${
              loading 
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
  );
};

export default BoostOfferPage;
