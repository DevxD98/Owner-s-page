import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Interactive demo component for the Help pages
 * Shows quick animated demos of app features
 */
const DemoCard = ({ 
  title, 
  children,
  theme = 'blue' // blue, purple, green, amber, pink
}) => {
  const [isShown, setIsShown] = useState(true);
  
  const themes = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-800',
      button: 'text-blue-600 hover:bg-blue-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      text: 'text-purple-800',
      button: 'text-purple-600 hover:bg-purple-100'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      button: 'text-green-600 hover:bg-green-100'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-800',
      button: 'text-amber-600 hover:bg-amber-100'
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      text: 'text-pink-800',
      button: 'text-pink-600 hover:bg-pink-100'
    }
  };
  
  const selectedTheme = themes[theme] || themes.blue;
  
  if (!isShown) return null;
  
  return (
    <div className={`${selectedTheme.bg} p-4 rounded-xl border ${selectedTheme.border} mb-4 relative animate-fadeIn`}>
      <button 
        className="absolute top-2 right-2 p-1.5 rounded-full transition-colors" 
        onClick={() => setIsShown(false)}
      >
        <X size={16} className={selectedTheme.button} />
      </button>
      
      <h3 className={`font-semibold ${selectedTheme.text} mb-2`}>{title}</h3>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};

export default DemoCard;
