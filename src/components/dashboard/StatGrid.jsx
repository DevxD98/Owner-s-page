import React from 'react';
import StatCard from './StatCard';
import { useApp } from '../../contexts/AppContext';

const StatGrid = () => {
  const { stats } = useApp();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <StatCard title="Total Offer running" value={stats.offersClaimed} />
      <StatCard title="Total offer view" value={stats.totalSpins} />
      <StatCard title="Total Store Visit" value={stats.adViewsToday} />
      <StatCard title="Recent Redemption" value={stats.topViewedAd} />
    </div>
  );
};

export default StatGrid;