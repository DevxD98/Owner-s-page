import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, TrendingUp, Zap, BarChart3, Users, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-3 rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Boost Your Offer</h1>
      </div>

      {/* Offer Information */}
      <div className="px-4 py-5">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">{offer.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{offer.description}</p>
          
          <div className="flex items-center mt-4 text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Eye size={16} className="mr-1" />
              <span>{offer.views || 0} views</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>0 claimed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Boost Plans */}
      <div className="px-4 pt-2 pb-5">
        <h2 className="text-lg font-bold mb-3">Select Boost Plan</h2>
        <div className="space-y-4">
          {boostPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white p-4 rounded-xl border-2 transition-all ${
                selectedPlan?.id === plan.id 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.duration}</p>
                  </div>
                </div>
                <div className="font-bold text-right">{plan.price}</div>
              </div>
              
              <div className="mt-3 pl-13">
                <ul className="text-xs text-gray-600 space-y-1.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={() => selectedPlan && handleBoost(selectedPlan)}
            disabled={!selectedPlan || loading}
            className={`px-6 py-3 bg-blue-600 rounded-lg text-white font-medium ${
              !selectedPlan || loading ? 'opacity-50' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Boost Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostOfferPage;
