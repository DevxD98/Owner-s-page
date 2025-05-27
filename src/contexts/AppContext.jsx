import React, { createContext, useContext, useState, useEffect } from 'react';
// Import our temporary local storage helper
import { loadAccountInfo, saveAccountInfo, loadStoreInfo, saveStoreInfo } from '../utils/localStorageHelper.js';
// Import image utility functions
import { blobUrlToDataUrl, isValidImageUrl, getImageWithFallback } from '../utils/imageUtils.js';
// Import fallback images
import { getFallbackImageByType } from '../utils/fallbackImages.js';

const defaultContext = {
  location: '',
  storeName: '',
  stats: {
    offersClaimed: 0,
    totalSpins: 0,
    adViewsToday: 0,
    topViewedAd: 0,
    storeVisits: 0,
  },
  offers: [],
  sponsoredAds: [],
  bookings: [],
  redemptions: [],
  toggleOffer: () => {},
  addOffer: () => {},
  updateOffer: () => {},
  updateRedemption: () => {},
  updateBooking: () => {},
};

const AppContext = createContext(defaultContext);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Try to load store info from local storage first
  const storedStoreInfo = loadStoreInfo() || {};
  
  // Initialize store-related state with values from local storage if available
  const [location, setLocation] = useState(storedStoreInfo.location || '');
  const [storeName, setStoreName] = useState(storedStoreInfo.storeName || '');
  const [storeCategory, setStoreCategory] = useState(storedStoreInfo.storeCategory || '');
  const [storeAddress, setStoreAddress] = useState(storedStoreInfo.storeAddress || '');
  const [storeLogo, setStoreLogo] = useState(storedStoreInfo.storeLogo || '');
  const [storeImage, setStoreImage] = useState(storedStoreInfo.storeImage || '');
  const [storePhone, setStorePhone] = useState(storedStoreInfo.storePhone || '');
  const [storeHours, setStoreHours] = useState(storedStoreInfo.storeHours || '');
  const [storeEmail, setStoreEmail] = useState(storedStoreInfo.storeEmail || '');
  const [cityState, setCityState] = useState(storedStoreInfo.cityState || '');
  const [pincode, setPincode] = useState(storedStoreInfo.pincode || '');
  const [googleMapLocation, setGoogleMapLocation] = useState(storedStoreInfo.googleMapLocation || '');
  
  // Sample stats data
  const [stats, setStats] = useState({
    offersClaimed: 0,
    totalSpins: 0,
    adViewsToday: 0,
    topViewedAd: 0,
    storeVisits: 0
  });
  
  // Get current date in YYYY-MM-DD format
  const getCurrentDateString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  
  // Get date one week from now in YYYY-MM-DD format
  const getOneWeekLaterString = () => {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
  };
  
  // Initialize offers array with sample data if not available in local storage
  const [offers, setOffers] = useState(() => {
    // Try to load from local storage first
    const storedOffers = localStorage.getItem('offers');
    if (storedOffers) {
      try {
        const parsedOffers = JSON.parse(storedOffers);
        console.log('Loaded offers from local storage:', parsedOffers);
        return parsedOffers;
      } catch (e) {
        console.error('Error parsing stored offers:', e);
      }
    }
    
    // If no stored offers or parsing error, return sample offers with fallback data URL images that don't rely on external services
    return [
      {
        id: '1001',
        title: 'Weekend Special: 20% Off',
        description: 'Get 20% off on all items this weekend only!',
        validTill: getOneWeekLaterString(),
        startDate: getCurrentDateString(),
        isActive: true,
        isDraft: false,
        type: 'spotlight',
        views: 45,
        isBoosted: true,
        boostedViews: 20,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        imagePreview: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: '1002',
        title: 'Happy Hour: Buy 1 Get 1 Free',
        description: 'Buy one, get one free between 2-4pm daily',
        validTill: getOneWeekLaterString(),
        startDate: getCurrentDateString(),
        startTime: '14:00',
        endTime: '16:00',
        isActive: true,
        isDraft: false,
        type: 'happyhours',
        views: 78,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        imagePreview: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: '1003',
        title: 'Spin to Win a Free Dessert!',
        description: 'Win a free dessert!',
        validTill: getOneWeekLaterString(),
        startDate: getCurrentDateString(),
        isActive: true,
        isDraft: false,
        type: 'spintowin',
        views: 122,
        image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        imagePreview: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: '1004',
        title: 'Limited Offer: Free Appetizer',
        description: 'Get a free appetizer with any main course order. Perfect for sharing!',
        validTill: getOneWeekLaterString(),
        startDate: getCurrentDateString(),
        isActive: true,
        isDraft: false,
        type: 'spotlight',
        views: 87,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        imagePreview: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: '1005',
        title: 'Summer Special: Cocktail Night',
        description: 'Draft offer for our upcoming summer cocktail night with live music',
        validTill: getOneWeekLaterString(),
        startDate: getCurrentDateString(),
        startTime: '19:00',
        endTime: '23:00',
        isActive: false,
        isDraft: true,
        type: 'happyhours',
        views: 0,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        imagePreview: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      }
    ];
  });
  
  // Save offers to localStorage whenever they change
  useEffect(() => {
    // Ensure spin to win description is always kept short
    const processedOffers = offers.map(offer => {
      if (offer.type === 'spintowin') {
        return {
          ...offer,
          description: 'Win a free dessert!' // Always enforce short description
        };
      }
      return offer;
    });
    
    localStorage.setItem('offers', JSON.stringify(processedOffers));
    console.log('Saved offers to localStorage:', processedOffers);
  }, [offers]);
  
  // Initialize sponsored ads array
  const [sponsoredAds, setSponsoredAds] = useState([]);
  
  // Initialize bookings array with demo data
  const [bookings, setBookings] = useState([
    {
      id: 'B123456',
      customerName: 'Sarah Johnson',
      offerTitle: 'Weekend Special: 20% Off',
      offerType: 'spotlight',
      date: '2025-05-20',
      time: '15:30',
      validTill: '07:30 PM',
      status: 'Confirmed'
    },
    {
      id: 'B789012',
      customerName: 'Mike Roberts',
      offerTitle: 'Happy Hour: Buy 1 Get 1 Free',
      offerType: 'happyhours',
      date: '2025-05-22',
      time: '14:45',
      validTill: '04:45 PM',
      status: 'Pending'
    }
  ]);
  
  // Initialize redemptions array with demo data
  const [redemptions, setRedemptions] = useState([
    {
      id: 'R567890',
      customerName: 'Emma Wilson',
      offerTitle: 'Weekend Special: 20% Off',
      redeemedOn: '2025-05-19',
      time: '13:45',
      status: 'Completed'
    },
    {
      id: 'R123489',
      customerName: 'James Taylor',
      offerTitle: 'Spin to Win a Free Dessert!',
      redeemedOn: '2025-05-22',
      time: '18:20',
      status: 'Pending'
    }
  ]);

  const toggleOffer = (id) => {
    // Check in regular offers
    const offerExists = offers.some(offer => offer.id === id);
    if (offerExists) {
      setOffers(offers.map(offer => 
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      ));
    } else {
      // Check in sponsored ads
      setSponsoredAds(sponsoredAds.map(ad => 
        ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
      ));
    }
  };

  const addOffer = async (offer) => {
    // Generate a timestamp-based ID to ensure newer offers have higher IDs
    const timestamp = new Date().getTime();
    
    // Create a new offer with the ID
    const newOffer = {
      ...offer,
      id: String(timestamp), // Use timestamp for guaranteed unique and sortable IDs
      isActive: true, // All newly created offers are active by default
      isDraft: false, // All newly created offers are not drafts by default
      views: 0, // Initialize view count
      type: offer.type || 'spotlight' // Ensure a default type if none provided
    };
    
    // Log the offer type for debugging
    console.log('Creating new offer with type:', newOffer.type);
    
    // Handle image to prevent blob URL errors
    if (newOffer.imagePreview && newOffer.imagePreview.startsWith('blob:')) {
      try {
        console.log('Converting blob URL to data URL for persistence');
        // Convert blob URL to data URL for persistence
        const dataUrl = await blobUrlToDataUrl(newOffer.imagePreview);
        if (dataUrl) {
          newOffer.image = dataUrl;
          newOffer.imagePreview = dataUrl; // Update both properties
        } else {
          console.warn('Failed to convert blob URL, using fallback');
          newOffer.image = null;
          newOffer.imagePreview = null;
        }
      } catch (error) {
        console.error('Error handling image:', error);
        newOffer.image = null;
        newOffer.imagePreview = null;
      }
    } else if (newOffer.imagePreview) {
      // Non-blob image URL (like http://) is already persistent
      newOffer.image = newOffer.imagePreview;
    }
    
    // Get current date and future date helper functions
    const getCurrentDateString = () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };
    
    const getOneWeekLaterString = () => {
      const oneWeekLater = new Date();
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
    };
    
    // Ensure common fields are set regardless of type
    newOffer.validTill = newOffer.validTill || getOneWeekLaterString();
    
    // Special handling for Happy Hours offers
    if (offer.type === 'happyhours') {
      // Make sure these properties are explicitly set with appropriate defaults
      // Use dynamic dates instead of hardcoded ones
      newOffer.startTime = offer.startTime || "14:00"; // Default: 2:00 PM
      newOffer.endTime = offer.endTime || "16:00"; // Default: 4:00 PM
      newOffer.validityDate = offer.validityDate || getOneWeekLaterString();
      newOffer.startDate = offer.startDate || getCurrentDateString();
      
      console.log('Adding Happy Hours offer with timer data:', {
        startTime: newOffer.startTime,
        endTime: newOffer.endTime,
        validityDate: newOffer.validityDate,
        startDate: newOffer.startDate
      });
    } 
    // Handle Spotlight offers
    else if (offer.type === 'spotlight') {
      // For spotlight offers, set both validTill and validityDate to match consistently
      // Use provided dates or set defaults if not provided
      newOffer.startDate = offer.startDate || getCurrentDateString();
      newOffer.validityDate = offer.validityDate || offer.validTill || getOneWeekLaterString();
      newOffer.validTill = newOffer.validityDate; // Ensure both are consistent
      
      console.log('Adding Spotlight offer with dates:', {
        startDate: newOffer.startDate,
        endDate: newOffer.validityDate
      });
    }
    // Handle Spin to Win offers
    else if (offer.type === 'spintowin') {
      // For spin to win offers, set both validTill and validityDate to match consistently
      // Use provided dates or set defaults if not provided
      newOffer.startDate = offer.startDate || getCurrentDateString();
      newOffer.validityDate = offer.validityDate || offer.validTill || getOneWeekLaterString();
      newOffer.validTill = newOffer.validityDate; // Ensure both are consistent
      
      // Ensure spinnerOffers is always an array
      newOffer.spinnerOffers = newOffer.spinnerOffers || [];
      newOffer.spinnerProbabilities = newOffer.spinnerProbabilities || [];
      
      console.log('Adding Spin to Win offer with dates:', {
        startDate: newOffer.startDate,
        endDate: newOffer.validityDate
      });
    }
    
    console.log('Adding new offer:', newOffer);
    
    // Check if this is a sponsored ad
    if (offer.isSponsored) {
      setSponsoredAds([...sponsoredAds, newOffer]);
    } else {
      // Add the new offer to the beginning of the array to ensure it shows up first
      setOffers([newOffer, ...offers]);
      console.log('New offers array:', [newOffer, ...offers]);
      
      // Debug log to check IDs
      console.log('Offers IDs for sorting check:', [newOffer, ...offers].map(o => o.id));
    }
  };

  const updateOffer = async (id, updatedOffer) => {
    // Ensure the offer has a type
    if (!updatedOffer.type) {
      console.warn('Updating offer with missing type, setting default type:', id);
      updatedOffer.type = 'spotlight';
    }
    // Check if this offer is being converted to/from a sponsored ad
    if (updatedOffer.isSponsored !== undefined) {
      // If converting a regular offer to a sponsored ad
      if (updatedOffer.isSponsored) {
        const offerToMove = offers.find(offer => offer.id === id);
        if (offerToMove) {
          // Remove from regular offers
          setOffers(offers.filter(offer => offer.id !== id));
          // Add to sponsored ads with updates
          setSponsoredAds([...sponsoredAds, { ...offerToMove, ...updatedOffer }]);
          return;
        }
      } 
      // If converting a sponsored ad to a regular offer
      else {
        const adToMove = sponsoredAds.find(ad => ad.id === id);
        if (adToMove) {
          // Remove from sponsored ads
          setSponsoredAds(sponsoredAds.filter(ad => ad.id !== id));
          // Add to regular offers with updates
          setOffers([...offers, { ...adToMove, ...updatedOffer, isSponsored: false }]);
          return;
        }
      }
    }
    
    // Handle image to prevent blob URL errors
    if (updatedOffer.imagePreview && updatedOffer.imagePreview.startsWith('blob:')) {
      try {
        console.log('Converting blob URL to data URL for persistence in update');
        // Convert blob URL to data URL for persistence
        const dataUrl = await blobUrlToDataUrl(updatedOffer.imagePreview);
        if (dataUrl) {
          updatedOffer.image = dataUrl;
          updatedOffer.imagePreview = dataUrl; // Update both properties
        } else {
          console.warn('Failed to convert blob URL in update, using previous image');
          // Don't update the image, remove imagePreview from update to keep original
          delete updatedOffer.imagePreview;
        }
      } catch (error) {
        console.error('Error handling image in update:', error);
        delete updatedOffer.imagePreview;
      }
    } else if (updatedOffer.imagePreview) {
      // Non-blob image URL is already persistent
      updatedOffer.image = updatedOffer.imagePreview;
    }
    
    // Special handling for Happy Hours offers
    if (updatedOffer.type === 'happyhours') {
      // Get current date for dynamic defaults
      const getCurrentDateString = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      };
      
      // Get date one week from now
      const getOneWeekLaterString = () => {
        const oneWeekLater = new Date();
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
      };
      
      // Ensure timer properties have defaults for Happy Hours offers
      updatedOffer.startTime = updatedOffer.startTime || "14:00";
      updatedOffer.endTime = updatedOffer.endTime || "16:00";
      updatedOffer.validityDate = updatedOffer.validityDate || getOneWeekLaterString();
      updatedOffer.startDate = updatedOffer.startDate || getCurrentDateString();
      
      console.log('Updating Happy Hours offer with timer data:', {
        id,
        startTime: updatedOffer.startTime,
        endTime: updatedOffer.endTime,
        validityDate: updatedOffer.validityDate,
        startDate: updatedOffer.startDate
      });
    }
    // Handle Spotlight offers
    else if (updatedOffer.type === 'spotlight') {
      // Get current date for dynamic defaults
      const getCurrentDateString = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      };
      
      // Get date one week from now
      const getOneWeekLaterString = () => {
        const oneWeekLater = new Date();
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
      };
      
      // Get the existing offer
      const existingOffer = offers.find(offer => offer.id === id);
      
      // Ensure spotlight-specific fields have defaults if they're being updated
      if (updatedOffer.validityDate === undefined) {
        updatedOffer.validityDate = existingOffer?.validityDate || getOneWeekLaterString();
      }
      if (updatedOffer.startDate === undefined) {
        updatedOffer.startDate = existingOffer?.startDate || getCurrentDateString();
      }
      
      // Always ensure validTill matches validityDate for consistent behavior
      updatedOffer.validTill = updatedOffer.validityDate;
      
      console.log('Updating Spotlight offer with dates:', {
        id,
        startDate: updatedOffer.startDate,
        endDate: updatedOffer.validityDate
      });
    }
    // Handle Spin to Win offers
    else if (updatedOffer.type === 'spintowin') {
      // Get current date for dynamic defaults
      const getCurrentDateString = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      };
      
      // Get date one week from now
      const getOneWeekLaterString = () => {
        const oneWeekLater = new Date();
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        return `${oneWeekLater.getFullYear()}-${String(oneWeekLater.getMonth() + 1).padStart(2, '0')}-${String(oneWeekLater.getDate()).padStart(2, '0')}`;
      };
      
      // Get the existing offer
      const existingOffer = offers.find(offer => offer.id === id);
      
      // Ensure spin-to-win-specific fields have defaults if they're being updated
      if (updatedOffer.validityDate === undefined) {
        updatedOffer.validityDate = existingOffer?.validityDate || getOneWeekLaterString();
      }
      if (updatedOffer.startDate === undefined) {
        updatedOffer.startDate = existingOffer?.startDate || getCurrentDateString();
      }
      
      // Always ensure validTill matches validityDate for consistent behavior
      updatedOffer.validTill = updatedOffer.validityDate;
      
      console.log('Updating Spin to Win offer with dates:', {
        id,
        startDate: updatedOffer.startDate,
        endDate: updatedOffer.validityDate
      });
    }
    
    // Regular update without conversion
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, ...updatedOffer } : offer
    ));
    setSponsoredAds(sponsoredAds.map(ad => 
      ad.id === id ? { ...ad, ...updatedOffer } : ad
    ));

    // Debug log to check IDs
    console.log('Updated offers IDs for sorting check:', 
      offers.map(offer => offer.id === id ? { ...offer, ...updatedOffer } : offer).map(o => o.id)
    );
  };

  const updateRedemption = (id, updatedRedemption) => {
    setRedemptions(redemptions.map(redemption => 
      redemption.id === id ? { ...redemption, ...updatedRedemption } : redemption
    ));
  };

  const updateBooking = (id, updatedBooking) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    ));
  };

  // Save store info to local storage whenever relevant values change
  useEffect(() => {
    // Create a store info object with all relevant fields
    const storeInfo = {
      location,
      storeName,
      storeCategory,
      storeAddress,
      storeLogo,
      storeImage,
      storePhone,
      storeHours,
      storeEmail,
      cityState,
      pincode,
      googleMapLocation
    };
    
    // Save to local storage
    saveStoreInfo(storeInfo);
    
    // Also save account info if we have a store name (indicating account creation)
    if (storeName) {
      saveAccountInfo({ hasAccount: true });
    }
  }, [
    location, 
    storeName, 
    storeCategory, 
    storeAddress, 
    storeLogo, 
    storeImage, 
    storePhone, 
    storeHours, 
    storeEmail, 
    cityState, 
    pincode, 
    googleMapLocation
  ]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    location,
    setLocation,
    storeName,
    storeCategory,
    storeAddress,
    storeLogo,
    storeImage,
    storePhone,
    storeHours,
    storeEmail,
    setStoreEmail,
    cityState,
    setCityState,
    pincode,
    setPincode,
    googleMapLocation,
    setGoogleMapLocation,
    stats,
    offers,
    sponsoredAds,
    bookings,
    redemptions,
    toggleOffer,
    addOffer,
    updateOffer,
    updateRedemption,
    updateBooking,
    setStoreName,
    setStoreCategory,
    setStoreAddress,
    setStoreLogo,
    setStoreImage,
    setStorePhone,
    setStoreHours,
  }), [
    location, storeName, storeCategory, storeAddress, 
    storeLogo, storeImage, storePhone, storeHours, storeEmail,
    cityState, pincode, googleMapLocation, stats, 
    offers, sponsoredAds, bookings, redemptions
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};