import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, TrendingUp, Zap, BarChart3, Users, Eye, Award } from 'lucide-react';

const BoostOfferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { offers } = useApp();
  const [offer, setOffer] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleBoost = (plan) => {
    setSelectedPlan(plan);
    setLoading(true);
    
    // Simulate API call to boost the offer
    setTimeout(() => {
      setLoading(false);
      // Show success message and redirect back
      alert(`Offer "${offer?.title}" has been successfully boosted with the ${plan.name} plan!`);
      navigate('/offer-management');
    }, 1500);
  };

  const boostPlans = [
    {
      id: 'basic',
      name: 'Basic Boost',
      price: '₹499',
      duration: '7 days',
      features: [
        'Increased visibility in search results',
        'Featured in "Popular Offers" section',
        'Basic analytics reports'
      ],
      icon: <TrendingUp size={24} className="text-blue-500" />
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      price: '₹999',
      duration: '14 days',
      features: [
        'Top position in search results',
        'Featured in "Top Picks" section',
        'Detailed performance analytics',
        'Social media promotion'
      ],
      icon: <Zap size={24} className="text-amber-500" />
    },
    {
      id: 'ultimate',
      name: 'Ultimate Boost',
      price: '₹1,999',
      duration: '30 days',
      features: [
        'Priority placement across all platforms',
        'Featured in email newsletters',
        'Advanced performance analytics',
        'Push notification to nearby users',
        'Personalized marketing strategy'
      ],
      icon: <BarChart3 size={24} className="text-purple-500" />
    }
  ];

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
                  <div className="text-sm text-gray-500">Spin to win!</div>
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

      {/* Premium Boost Plans */}
      <div className="px-4 pt-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold flex items-center">
            <span className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-1.5 rounded-lg mr-3 shadow-md">
              <Zap size={18} />
            </span>
            Select Boost Plan
          </h2>
          <div className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-500">
            {selectedPlan ? '1 plan selected' : 'Choose a plan'}
          </div>
        </div>
        
        <div className="space-y-5">
          {boostPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white p-5 rounded-2xl transition-all cursor-pointer relative ${
                selectedPlan?.id === plan.id 
                  ? 'border-2 border-indigo-500 shadow-lg transform scale-[1.02]' 
                  : 'border border-gray-100 hover:border-indigo-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              {/* Removed Popular and Best Value tags */}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-14 h-14 rounded-xl ${
                    selectedPlan?.id === plan.id 
                      ? 'bg-gradient-to-br from-indigo-100 to-purple-100' 
                      : 'bg-gray-100'
                  } flex items-center justify-center mr-4 transition-all shadow-sm`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{plan.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{plan.duration}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-right text-xl">{plan.price}</div>
                  <div className="text-xs text-gray-500">one-time payment</div>
                  
                  {selectedPlan?.id === plan.id && (
                    <div className="bg-indigo-100 text-indigo-600 text-xs px-2.5 py-1 rounded-full mt-2 flex items-center">
                      <span className="mr-1.5 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span> Selected
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-5 ml-3 border-t border-gray-100 pt-3">
                <ul className="text-sm text-gray-600 space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full ${
                        selectedPlan?.id === plan.id 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-gray-100 text-gray-500'
                      } flex items-center justify-center mr-3 transition-colors text-xs`}>
                        ✓
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Selection indicator */}
              {selectedPlan?.id === plan.id && (
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl border-2 border-indigo-500 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Premium Action Buttons - Mobile style fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-20 backdrop-blur-md">
        {selectedPlan && (
          <div className="border-b border-gray-100 py-2.5 px-4 flex justify-between items-center bg-indigo-50/80">
            <div className="text-sm font-medium text-gray-800">
              Selected: <span className="text-indigo-600">{selectedPlan.name}</span>
            </div>
            <div className="text-indigo-700 font-bold">{selectedPlan.price}</div>
          </div>
        )}
        
        <div className="flex justify-between items-center p-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="w-[120px] py-3.5 bg-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-all border border-gray-200 shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={() => selectedPlan && handleBoost(selectedPlan)}
            disabled={!selectedPlan || loading}
            className={`flex-1 ml-4 py-3.5 rounded-xl text-white font-medium flex items-center justify-center ${
              !selectedPlan || loading 
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
                <Zap size={20} className="mr-2 animate-pulse-slow" /> Boost Now
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostOfferPage;
