// filepath: /Users/devmondal/Downloads/project 10/src/components/redemptions/RedemptionTracker.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import RedemptionItem from './RedemptionItem';

const RedemptionTracker = () => {
  const { redemptions, offers } = useApp();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible && redemptions && redemptions.length > 0) {
      const timers = [];
      const displayRedemptions = redemptions.slice(0, 3);
      
      displayRedemptions.forEach((_, index) => {
        const timer = setTimeout(() => {
          setLoadedItems(prev => [...prev, index]);
        }, index * 100 + 200);
        timers.push(timer);
      });
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible, redemptions]);

  const getOfferTitle = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    return offer?.title || '';
  };

  return (
    <div className={`mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div 
        className="flex justify-between items-center py-3 cursor-pointer group"
        onClick={() => navigate('/redemption-tracker')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
            <BarChart2 size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Redemption Tracker</h2>
        </div>
        <ChevronRight size={20} className="text-gray-500 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
      </div>

      <div className="space-y-4 mt-2">
        {redemptions && redemptions.length > 0 ? (
          redemptions.slice(0, 3).map((redemption, index) => (
            <div 
              key={redemption.id} 
              className={`transition-all duration-500 transform ${loadedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <RedemptionItem
                id={redemption.id}
                customerName={redemption.customerName}
                date={redemption.redeemedOn}
                time={redemption.time}
                status={redemption.status}
                offerTitle={redemption.offerTitle}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <BarChart2 size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No redemptions yet</p>
            <p className="text-gray-400 text-sm mt-1">Completed redemptions will appear here</p>
          </div>
        )}
        
        {redemptions.length > 3 && (
          <button 
            onClick={() => navigate('/redemption-tracker')}
            className="w-full py-2 mt-2 text-blue-600 bg-blue-50 rounded-lg text-center font-medium transition-colors hover:bg-blue-100"
          >
            View all ({redemptions.length}) redemptions
          </button>
        )}
      </div>
    </div>
  );
};

export default RedemptionTracker;
