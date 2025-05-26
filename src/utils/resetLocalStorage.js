/**
 * Utility function to reset localStorage data
 * Can be used to clear out any stored data when making changes to data models
 */
export function resetLocalStorage() {
  // Clear specific localStorage items
  localStorage.removeItem('offers');
  
  // Force a page reload to refresh the app with default data
  window.location.reload();
}

export function resetSpinToWinDescriptions() {
  try {
    // Get current offers
    const storedOffers = localStorage.getItem('offers');
    if (storedOffers) {
      const offers = JSON.parse(storedOffers);
      
      // Update all spin to win offers
      const updatedOffers = offers.map(offer => {
        if (offer.type === 'spintowin') {
          return {
            ...offer,
            description: 'Win a free dessert!'
          };
        }
        return offer;
      });
      
      // Save back to localStorage
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
      console.log('Updated spin to win descriptions');
      
      // Reload page
      window.location.reload();
    }
  } catch (error) {
    console.error('Error updating spin to win descriptions:', error);
  }
}
