import React from 'react';
import StatCard from './StatCard';
import { useApp } from '../../contexts/AppContext';

const StatGrid = () => {
  const { stats } = useApp();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <StatCard title="Offers claimed" value={stats.offersClaimed} />
      <StatCard title="Total Spins" value={stats.totalSpins} />
      <StatCard title="Ad Views Today" value={stats.adViewsToday} />
      <StatCard title="Top Viewed Ad" value={stats.topViewedAd} />
    </div>
  );
};

export default StatGrid;