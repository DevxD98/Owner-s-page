import React from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RedemptionTracker from '../components/redemptions/RedemptionTracker';

const RedemptionTrackerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Redemption Tracker</h1>
      </div>
      
      <RedemptionTracker showSearch={true} showAllItems={true} />
    </div>
  );
};

export default RedemptionTrackerPage;
