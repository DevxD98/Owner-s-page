import React from 'react';

/**
 * MultiImageDisplay component - Shows a single image for each offer
 */
const MultiImageDisplay = ({ offerType, title, id, image, isSponsored }) => {
  // Get default offer image based on type
  const getDefaultImageForType = () => {
    // Use consistent dimensions for all image types
    switch (offerType) {
      case 'happyhours':
        // Happy hours image
        return "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&h=180&q=80";
      case 'spintowin':
        // Spin to win image
        return "https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&w=300&h=180&q=80";
      // Spotlight offers (default)
      default:
        return "https://images.unsplash.com/photo-1555982105-d25af4182e4e?auto=format&fit=crop&w=300&h=180&q=80";
    }
  };
  
  // Use provided image or fallback to default
  let offerImage = image || getDefaultImageForType();
  // Make sure image URL includes sizing parameters for better performance
  if (typeof offerImage === 'string' && offerImage.includes('unsplash.com')) {
    // Use better sized image for proper display - shorter height for more compact layout
    offerImage = offerImage.includes('auto=format') ? offerImage : `${offerImage}?auto=format&fit=crop&w=300&h=180&q=80`;
  }
  
  return (
    <div className="w-full h-full flex items-center bg-white relative">
      {/* Sponsored badge if applicable */}
      {isSponsored && (
        <div className="absolute top-0 left-0 bg-purple-100 text-purple-800 text-xs font-medium py-0.5 px-2 rounded-br-md z-10">
          Ad
        </div>
      )}
      
      {/* Single image display */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={offerImage}
          alt={`${title || "Offer"} image`}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center', maxHeight: '180px' }}
          onError={(e) => {
            // Use a simple colored background as fallback
            const color = offerType === 'happyhours' ? '#e6f7ff' : offerType === 'spintowin' ? '#f0e6ff' : '#fff2e6';
            e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[${color}]"></div>`;
          }}
        />
      </div>
    </div>
  );
};

export default MultiImageDisplay;
