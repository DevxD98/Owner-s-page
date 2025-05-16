import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

/**
 * FeatureDemo - An enhanced component to demonstrate app features with animations
 * Used in help pages to showcase interactive demos of app functionality
 */
const FeatureDemo = ({ 
  title, 
  description, 
  icon,
  imageUrl,
  steps = [],
  primaryActionText = 'Try it out',
  onPrimaryAction,
  onClose,
  autoProgress = false,
  autoProgressDelay = 3000,
  theme = 'blue' // blue, purple, green, amber, pink
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const themes = {
    blue: {
      gradient: 'from-blue-500 to-indigo-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      progressBar: 'bg-blue-600'
    },
    purple: {
      gradient: 'from-purple-500 to-indigo-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      progressBar: 'bg-purple-600'
    },
    green: {
      gradient: 'from-green-500 to-teal-600',
      button: 'bg-green-600 hover:bg-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      progressBar: 'bg-green-600'
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      button: 'bg-amber-600 hover:bg-amber-700',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      progressBar: 'bg-amber-600'
    },
    pink: {
      gradient: 'from-pink-500 to-rose-600',
      button: 'bg-pink-600 hover:bg-pink-700',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      progressBar: 'bg-pink-600'
    }
  };
  
  const selectedTheme = themes[theme] || themes.blue;
  
  // Handle auto progression through steps
  useEffect(() => {
    if (!autoProgress || currentStep >= steps.length || isCompleted) return;
    
    const timer = setTimeout(() => {
      handleNextStep();
    }, autoProgressDelay);
    
    return () => clearTimeout(timer);
  }, [currentStep, autoProgress, steps.length, isCompleted, autoProgressDelay]);
  
  // Handle going to next step
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      
      // Delay step change to allow for animation
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // We've reached the end of the steps
      setIsCompleted(true);
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = steps.length > 0 
    ? ((currentStep + 1) / steps.length) * 100
    : 0;
    
  // Get current step content
  const currentStepData = steps[currentStep] || {};
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Header */}
      <div className={`p-5 bg-gradient-to-br ${selectedTheme.gradient} text-white relative`}>
        {/* Close button */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        )}
        
        {/* Icon */}
        {icon && (
          <div className="mb-3 inline-flex p-2 rounded-lg bg-white/20">
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        {description && <p className="text-white/80">{description}</p>}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Step content - only shown if we have steps */}
        {steps.length > 0 && (
          <>
            {/* Progress indicator */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Step {currentStep + 1} of {steps.length}</span>
                {isCompleted && <span className="text-green-600 font-medium flex items-center"><Check size={14} className="mr-1" /> Complete</span>}
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${selectedTheme.progressBar} transition-all duration-500 ease-out`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step content */}
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {steps.length > 0 && (
                <>
                  <h4 className="font-medium text-lg mb-2">{currentStepData.title}</h4>
                  <p className="text-gray-600 mb-4">{currentStepData.content}</p>
                  
                  {/* Step image */}
                  {currentStepData.image && (
                    <div className="mt-3 mb-5 bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={currentStepData.image} 
                        alt={currentStepData.title}
                        className="w-full object-contain max-h-64"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Step navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg ${
                  currentStep === 0 
                    ? 'text-gray-400 bg-gray-100' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                Back
              </button>
              
              <button
                onClick={currentStep < steps.length - 1 ? handleNextStep : onPrimaryAction}
                className={`px-4 py-2 rounded-lg text-white ${selectedTheme.button} transition-colors flex items-center`}
              >
                {currentStep < steps.length - 1 ? (
                  <>Next <ArrowRight size={16} className="ml-1" /></>
                ) : (
                  primaryActionText
                )}
              </button>
            </div>
          </>
        )}
        
        {/* Single demo content - shown when no steps are provided */}
        {steps.length === 0 && (
          <>
            {/* Demo image */}
            {imageUrl && (
              <div className="my-4 bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full object-contain"
                />
              </div>
            )}
            
            {/* Action button */}
            {onPrimaryAction && (
              <button
                onClick={onPrimaryAction}
                className={`w-full mt-4 py-2.5 rounded-lg text-white ${selectedTheme.button} transition-colors flex items-center justify-center`}
              >
                {primaryActionText} <ArrowRight size={16} className="ml-1" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeatureDemo;
