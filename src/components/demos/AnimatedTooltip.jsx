import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedTooltip - A reusable, animated tooltip component
 * Used in help pages to highlight features with floating tooltips
 */
const AnimatedTooltip = ({ 
  children,  // The element that triggers the tooltip
  content,   // The tooltip content (text or React elements)
  position = 'top', // top, bottom, left, right
  delay = 200, // delay before showing the tooltip (ms)
  theme = 'dark', // dark, light, primary
  color = 'blue', // blue, green, purple, amber, pink - for backward compatibility
  autoShow = false, // automatically show the tooltip
  autoshow = false, // backward compatibility
  width = 'auto', // width of the tooltip
  duration = 5000, // duration to show tooltip if autoshow is true
  arrow = true // show arrow pointer
}) => {
  // For backward compatibility
  const shouldAutoShow = autoShow || autoshow;
  
  const [isVisible, setIsVisible] = useState(shouldAutoShow);
  const [isReady, setIsReady] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const showTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  
  // Legacy color map for backward compatibility
  const colorToThemeMap = {
    blue: 'primary',
    green: 'success',
    purple: 'secondary',
    amber: 'warning',
    pink: 'danger'
  };
  
  // Set position styles based on the position prop
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)',
          animationName: isVisible ? 'tooltipFadeInTop' : 'tooltipFadeOutTop'
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(8px)',
          animationName: isVisible ? 'tooltipFadeInBottom' : 'tooltipFadeOutBottom'
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-8px)',
          animationName: isVisible ? 'tooltipFadeInLeft' : 'tooltipFadeOutLeft'
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(8px)',
          animationName: isVisible ? 'tooltipFadeInRight' : 'tooltipFadeOutRight'
        };
      default:
        return { 
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)',
          animationName: isVisible ? 'tooltipFadeInTop' : 'tooltipFadeOutTop'
        };
    }
  };
  
  // Get the arrow position styles
  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        };
      case 'bottom':
        return {
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        };
      case 'left':
        return {
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        };
      case 'right':
        return {
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        };
      default:
        return {
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        };
    }
  };
  
  // Get theme styles - combining new theme prop with legacy color prop
  const getThemeStyles = () => {
    // If using legacy color prop, convert to theme
    const effectiveTheme = colorToThemeMap[color] || theme;
    
    switch (effectiveTheme) {
      case 'light':
        return {
          background: 'white',
          color: '#333',
          arrowColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        };
      case 'primary':
      case 'blue':
        return {
          background: '#4f46e5', // Indigo/blue color
          color: 'white',
          arrowColor: '#4f46e5',
          boxShadow: '0 2px 10px rgba(79, 70, 229, 0.3)'
        };
      case 'success':
      case 'green':
        return {
          background: '#10b981', // Green color
          color: 'white',
          arrowColor: '#10b981',
          boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
        };
      case 'warning':
      case 'amber':
        return {
          background: '#f59e0b', // Amber color
          color: 'white',
          arrowColor: '#f59e0b',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
        };
      case 'danger':
      case 'pink':
        return {
          background: '#ec4899', // Pink color
          color: 'white',
          arrowColor: '#ec4899',
          boxShadow: '0 2px 10px rgba(236, 72, 153, 0.3)'
        };
      case 'secondary':
      case 'purple':
        return {
          background: '#8b5cf6', // Purple color
          color: 'white',
          arrowColor: '#8b5cf6',
          boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)'
        };
      case 'dark':
      default:
        return {
          background: '#333',
          color: 'white',
          arrowColor: '#333',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        };
    }
  };
  
  // Handle showing and hiding of tooltip
  const handleMouseEnter = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const handleMouseLeave = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    
    setIsVisible(false);
  };
  
  // Setup auto-show/hide for tooltips
  useEffect(() => {
    if (shouldAutoShow) {
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, delay + duration);
    }
    
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [shouldAutoShow, delay, duration]);
  
  // Set isReady after initial mount to enable animations
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  // Disable tooltip when clicked inside
  const handleTooltipClick = () => {
    setIsVisible(false);
  };
  
  const positionStyles = getPositionStyles();
  const arrowStyles = getArrowStyles();
  const themeStyles = getThemeStyles();
  
  return (
    <div 
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isReady && (
        <div 
          ref={tooltipRef}
          className="absolute z-50 px-3 py-2 text-sm rounded whitespace-nowrap pointer-events-auto"
          onClick={handleTooltipClick}
          style={{
            ...positionStyles,
            backgroundColor: themeStyles.background,
            color: themeStyles.color,
            boxShadow: themeStyles.boxShadow,
            width: width,
            animationDuration: '200ms',
            animationFillMode: 'forwards',
            opacity: 0,
            visibility: isVisible ? 'visible' : 'hidden',
          }}
        >
          {content}
          
          {arrow && (
            <div 
              className="absolute w-2 h-2 rotate-45"
              style={{
                ...arrowStyles,
                backgroundColor: themeStyles.arrowColor,
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedTooltip;
