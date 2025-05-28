import React from 'react';

/**
 * MultiImageDisplay component - Shows a grid of 3 images for each offer
 */
const MultiImageDisplay = ({ offerType, title, id, image, images, isSponsored }) => {
  // Get default offer images based on type
  const getDefaultImagesForType = () => {
    switch (offerType) {
      case 'happyhours':
        // Happy hours images - cocktails/drinks
        return [
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=120&h=120&q=80"
        ];
      case 'spintowin':
        // Spin to win images - prizes, wheel, gifts
        return [
          "https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=120&h=120&q=80"
        ];
      // Spotlight offers (default) - featured products
      default:
        return [
          "https://images.unsplash.com/photo-1555982105-d25af4182e4e?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=120&h=120&q=80",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&h=120&q=80"
        ];
    }
  };
  
  // Determine which images to use (provided images first, fallback to defaults)
  let offerImages = getDefaultImagesForType();
  
  // Use images array if provided
  if (images && Array.isArray(images) && images.length > 0) {
    console.log('MultiImageDisplay: Using images array', images);
    // Make sure we have exactly 3 images
    if (images.length >= 3) {
      offerImages = images.slice(0, 3);
    } else {
      // Fill in missing images with defaults
      offerImages = [
        ...images,
        ...getDefaultImagesForType().slice(images.length)
      ].slice(0, 3);
    }
  } 
  // If no images array but a single image is provided, use it as the first image
  else if (image) {
    console.log('MultiImageDisplay: Using single image as fallback', image);
    offerImages[0] = image;
  }
  
  // Make sure all image URLs include sizing parameters for better performance
  offerImages = offerImages.map(img => {
    if (typeof img === 'string' && img.includes('unsplash.com') && !img.includes('auto=format')) {
      return `${img}?auto=format&fit=crop&w=120&h=120&q=80`;
    }
    return img;
  });
  
  return (
    <div className="w-full h-full flex items-center bg-white p-1 relative">
      {/* Sponsored badge if applicable */}
      {isSponsored && (
        <div className="absolute top-0 left-0 bg-purple-100 text-purple-800 text-xs font-medium py-0.5 px-2 rounded-br-md z-10">
          Ad
        </div>
      )}
      
      {/* Grid of 3 equally sized square images */}
      <div className="grid grid-cols-3 gap-1 w-full h-full">
        {offerImages.map((src, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={src}
              alt={`${title || "Offer"} image ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
              onError={(e) => {
                // Use a simple colored background as fallback
                const colors = ['#f0e6ff', '#e6f7ff', '#fff2e6'];
                e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[${colors[index % 3]}] rounded-md"></div>`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageDisplay;
