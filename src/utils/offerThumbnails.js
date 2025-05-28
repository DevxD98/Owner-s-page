/**
 * Utility function to get thumbnails for different offer types
 */

// Helper function to get thumbnail images based on offer type
export const getOfferThumbnails = (type) => {
  const defaultThumbnails = [
    "https://via.placeholder.com/56x56?text=Item+1",
    "https://via.placeholder.com/56x56?text=Item+2",
    "https://via.placeholder.com/56x56?text=Item+3",
  ];

  switch (type) {
    case 'happyhours':
      // Happy Hours thumbnails - drinks, food, etc.
      return [
        "https://images.unsplash.com/photo-1596563271760-5fa2a0a0b6bc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56"
      ];
    
    case 'spintowin':
      // Spin to win thumbnails - prizes, wheel, confetti
      return [
        "https://images.unsplash.com/photo-1563396983906-b3795482a59a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1561037404-61cd46aa615b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56"
      ];
    
    case 'spotlight':
      // Spotlight offer thumbnails - products, services
      return [
        "https://images.unsplash.com/photo-1555982105-d25af4182e4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=56&ixlib=rb-4.0.3&q=80&w=56"
      ];
    
    default:
      return defaultThumbnails;
  }
};

// Helper function to handle multiple offer images
export const getOfferImages = (offer) => {
  // Return array of images if they exist
  if (offer.images && Array.isArray(offer.images) && offer.images.length > 0) {
    return offer.images;
  }
  
  // If there's only a single image, return it as an array
  if (offer.image) {
    return [offer.image];
  }
  
  // Fallback to default thumbnails based on offer type
  return getOfferThumbnails(offer.type || 'spotlight');
};

// Get appropriate fallback thumbnail based on offer type
export const getFallbackThumbnail = (type, index = 0) => {
  const fallbacks = {
    happyhours: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23dbeafe'/%3E%3Ccircle cx='28' cy='25' r='10' fill='%233b82f6' opacity='0.7'/%3E%3Cpath d='M22 30 L34 30 L36 44 L20 44 Z' fill='%2360a5fa' opacity='0.7'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23dbeafe'/%3E%3Ccircle cx='28' cy='28' r='14' fill='%2393c5fd' opacity='0.7'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23dbeafe'/%3E%3Cpath d='M20 15 L36 15 L32 44 L24 44 Z' fill='%233b82f6' opacity='0.7'/%3E%3C/svg%3E"
    ],
    
    spintowin: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f3e8ff'/%3E%3Ccircle cx='28' cy='28' r='20' fill='%23ddd6fe' stroke='%238b5cf6' stroke-width='2'/%3E%3Ccircle cx='28' cy='28' r='2' fill='%238b5cf6'/%3E%3Cpath d='M28 28 L28 15' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f3e8ff'/%3E%3Cpath d='M28 10 L32 20 L42 22 L35 30 L37 40 L28 35 L19 40 L21 30 L14 22 L24 20 Z' fill='%238b5cf6' opacity='0.7'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f3e8ff'/%3E%3Crect x='18' y='18' width='20' height='20' rx='2' fill='%238b5cf6' opacity='0.7'/%3E%3C/svg%3E"
    ],
    
    spotlight: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23fef3c7'/%3E%3Cpath d='M28 15 L32 25 L42 27 L35 35 L37 45 L28 40 L19 45 L21 35 L14 27 L24 25 Z' fill='%23f59e0b' opacity='0.7'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23fef3c7'/%3E%3Ccircle cx='28' cy='28' r='15' fill='%23fbbf24' opacity='0.7'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23fef3c7'/%3E%3Cpath d='M20 20 L36 20 L40 35 L16 35 Z' fill='%23f59e0b' opacity='0.7'/%3E%3C/svg%3E"
    ]
  };

  // Use the specified type or default to generic
  const typeFallbacks = fallbacks[type] || [
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23f3f4f6'/%3E%3C/svg%3E"
  ];
  
  // Use the specified index or get the first one
  return typeFallbacks[index % typeFallbacks.length];
};
