import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

/**
 * FeatureTour - An interactive tour component for guiding users through app features
 * Use this to create step-by-step tours explaining how to use various parts of the app
 */
const FeatureTour = ({ steps, onComplete, initialStep = 0, autoStart = true }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isVisible, setIsVisible] = useState(autoStart);
  const [animateDirection, setAnimateDirection] = useState('next'); // 'next' or 'prev'
  
  useEffect(() => {
    if (!autoStart) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [autoStart]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setAnimateDirection('next');
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setAnimateDirection('prev');
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 300); // Wait for exit animation
    }
  };
  
  if (!isVisible || !steps || steps.length === 0) return null;
  
  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={handleComplete}></div>
      
      <div 
        className={`bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 ${
          animateDirection === 'next' ? 'animate-slideFromRight' : 'animate-slideFromLeft'
        }`}
      >
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button 
            onClick={handleComplete}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
              {currentStepData.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{currentStepData.title}</h2>
          </div>
          
          <p className="text-gray-600 mb-6">{currentStepData.description}</p>
          
          {currentStepData.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden border border-gray-200">
              <img 
                src={currentStepData.imageUrl} 
                alt={currentStepData.title} 
                className="w-full object-cover"
              />
            </div>
          )}
          
          {currentStepData.content && (
            <div className="mb-6">
              {currentStepData.content}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentStep === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            {isLastStep ? 'Finish' : 'Next'}
            {!isLastStep && <ArrowRight size={16} className="ml-1.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureTour;
