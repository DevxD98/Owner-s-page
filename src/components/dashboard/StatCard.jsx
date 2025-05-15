import React from 'react';
import { Eye, ShoppingBag, Users, Award } from 'lucide-react';

const StatCard = ({ title, value }) => {
  // Choose icon based on stat title
  const getIcon = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('offer view')) return <Eye size={20} />;
    if (titleLower.includes('redemption')) return <ShoppingBag size={20} />;
    if (titleLower.includes('visits')) return <Users size={20} />;
    return <Award size={20} />;
  };
  
  // Choose gradient based on stat title
  const getGradientClass = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('offer view')) return 'from-blue-500 to-cyan-400';
    if (titleLower.includes('redemption')) return 'from-green-500 to-emerald-400';
    if (titleLower.includes('visits')) return 'from-purple-500 to-violet-400';
    return 'from-amber-500 to-orange-400';
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group h-full flex flex-col justify-between min-h-[120px]">
      <div className="flex items-start">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getGradientClass()} flex items-center justify-center text-white mr-2 group-hover:shadow-lg transition-all flex-shrink-0`}>
          {getIcon()}
        </div>
        <h3 className="text-gray-700 font-medium text-sm leading-tight break-words">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-800 mt-2 group-hover:scale-105 transition-transform animate-pulse-subtle">{value}</p>
    </div>
  );
};

export default StatCard;