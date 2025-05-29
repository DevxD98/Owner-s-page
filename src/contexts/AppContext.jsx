import React, { createContext, useContext, useState, useEffect } from 'react';
// Import our temporary local storage helper
import { loadAccountInfo, saveAccountInfo, loadStoreInfo, saveStoreInfo } from '../utils/localStorageHelper.js';
// Import image utility functions
import { blobUrlToDataUrl, isValidImageUrl, getImageWithFallback } from '../utils/imageUtils.js';
// Import fallback images
import { getFallbackImageByType } from '../utils/fallbackImages.js';
// Import test and example offers
import { testOffers } from '../test/test-offers.js';
import { exampleOffers } from '../test/example-offers.js';

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
  deleteOffer: () => {},
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
  
  // Initialize offers array with sample data and always include test offers
  const [offers, setOffers] = useState(() => {
    // No sample offers - we'll only use the filtered test offers
    const sampleOffers = [];
    
    // Try to load existing offers from local storage
    const storedOffers = localStorage.getItem('offers');
    let existingOffers = [];
    
    if (storedOffers) {
      try {
        existingOffers = JSON.parse(storedOffers);
        
        // Filter out test offers, sample offers, and example offers to avoid duplicates
        existingOffers = existingOffers.filter(offer => 
          !offer.id.startsWith('test-') && 
          !offer.id.startsWith('sample-') &&
          !offer.id.startsWith('offer-') &&
          !offer.id.startsWith('example-')
        );
      } catch (e) {
        console.error('Error parsing stored offers:', e);
        existingOffers = [];
      }
    }
    
    // Create a map of used IDs to prevent duplicates
    const usedIds = new Map();
    
    // Function to ensure unique IDs
    const ensureUniqueId = (offer) => {
      if (usedIds.has(offer.id)) {
        // Create a new unique ID if a duplicate is found
        const newId = `${offer.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        return { ...offer, id: newId };
      }
      
      // Mark this ID as used
      usedIds.set(offer.id, true);
      return offer;
    };
    
    // Process sample offers to ensure unique IDs
    const uniqueSampleOffers = sampleOffers.map(ensureUniqueId);
    
    // Process existing offers to ensure unique IDs
    const uniqueExistingOffers = existingOffers.map(ensureUniqueId);
    
    // We only want 3 sample offers, one of each type (spotlight, happyhours, spintowin)
    // Filter test and example offers to only get what we need
    const filteredTestOffers = [
      testOffers.find(offer => offer.type === 'spotlight' && offer.id === 'offer-spotlight-1'),
      testOffers.find(offer => offer.type === 'happyhours' && offer.id === 'offer-happyhours-1'),
      testOffers.find(offer => offer.type === 'spintowin' && offer.id === 'offer-spintowin-1')
    ].filter(Boolean);
    
    const uniqueTestOffers = filteredTestOffers.map(ensureUniqueId);
    
    // We're not including example offers as we only want 3 total offers
    
    // Combine only the filtered offers with unique IDs
    return [...uniqueSampleOffers, ...uniqueTestOffers, ...uniqueExistingOffers];
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
    
    // Handle multiple images if they exist
    if (offer.imagePreviewArray && offer.imagePreviewArray.length > 0) {
      try {
        console.log('Processing multiple images for persistence');
        const images = [];
        const imagePreviews = [];
        
        // Process each image in the array
        for (let i = 0; i < offer.imagePreviewArray.length; i++) {
          const preview = offer.imagePreviewArray[i];
          if (preview && preview.startsWith('blob:')) {
            const dataUrl = await blobUrlToDataUrl(preview);
            if (dataUrl) {
              images.push(dataUrl);
              imagePreviews.push(dataUrl);
            }
          } else if (preview) {
            // Non-blob URLs are already persistent
            images.push(preview);
            imagePreviews.push(preview);
          }
        }
        
        // Store the converted arrays
        if (images.length > 0) {
          newOffer.images = images;
          newOffer.imagePreviews = imagePreviews;
          
          // Keep backward compatibility with single image properties
          newOffer.image = images[0];
          newOffer.imagePreview = imagePreviews[0];
        }
      } catch (error) {
        console.error('Error handling multiple images:', error);
        newOffer.images = [];
        newOffer.imagePreviews = [];
        newOffer.image = null;
        newOffer.imagePreview = null;
      }
    }
    // Handle single image for backward compatibility
    else if (newOffer.imagePreview && newOffer.imagePreview.startsWith('blob:')) {
      try {
        console.log('Converting blob URL to data URL for persistence');
        // Convert blob URL to data URL for persistence
        const dataUrl = await blobUrlToDataUrl(newOffer.imagePreview);
        if (dataUrl) {
          newOffer.image = dataUrl;
          newOffer.imagePreview = dataUrl; // Update both properties
          // Also store in arrays for consistency
          newOffer.images = [dataUrl];
          newOffer.imagePreviews = [dataUrl];
        } else {
          console.warn('Failed to convert blob URL, using fallback');
          newOffer.image = null;
          newOffer.imagePreview = null;
          newOffer.images = [];
          newOffer.imagePreviews = [];
        }
      } catch (error) {
        console.error('Error handling image:', error);
        newOffer.image = null;
        newOffer.imagePreview = null;
        newOffer.images = [];
        newOffer.imagePreviews = [];
      }
    } else if (newOffer.imagePreview) {
      // Non-blob image URL (like http://) is already persistent
      newOffer.image = newOffer.imagePreview;
      newOffer.images = [newOffer.imagePreview];
      newOffer.imagePreviews = [newOffer.imagePreview];
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
    
    // Handle multiple images if they exist
    if (updatedOffer.imagePreviewArray && updatedOffer.imagePreviewArray.length > 0) {
      try {
        console.log('Processing multiple images for persistence in update');
        const images = [];
        const imagePreviews = [];
        
        // Process each image in the array
        for (let i = 0; i < updatedOffer.imagePreviewArray.length; i++) {
          const preview = updatedOffer.imagePreviewArray[i];
          if (preview && preview.startsWith('blob:')) {
            const dataUrl = await blobUrlToDataUrl(preview);
            if (dataUrl) {
              images.push(dataUrl);
              imagePreviews.push(dataUrl);
            }
          } else if (preview) {
            // Non-blob URLs are already persistent
            images.push(preview);
            imagePreviews.push(preview);
          }
        }
        
        // Store the converted arrays
        if (images.length > 0) {
          updatedOffer.images = images;
          updatedOffer.imagePreviews = imagePreviews;
          
          // Keep backward compatibility with single image properties
          updatedOffer.image = images[0];
          updatedOffer.imagePreview = imagePreviews[0];
        }
      } catch (error) {
        console.error('Error handling multiple images in update:', error);
        // Don't update the images if there was an error
        delete updatedOffer.imagePreviewArray;
        delete updatedOffer.offerImages;
      }
    }
    // Handle single image for backward compatibility
    else if (updatedOffer.imagePreview && updatedOffer.imagePreview.startsWith('blob:')) {
      try {
        console.log('Converting blob URL to data URL for persistence in update');
        // Convert blob URL to data URL for persistence
        const dataUrl = await blobUrlToDataUrl(updatedOffer.imagePreview);
        if (dataUrl) {
          updatedOffer.image = dataUrl;
          updatedOffer.imagePreview = dataUrl; // Update both properties
          // Also store in arrays for consistency
          updatedOffer.images = [dataUrl];
          updatedOffer.imagePreviews = [dataUrl];
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
      // Also store in arrays for consistency
      updatedOffer.images = [updatedOffer.imagePreview];
      updatedOffer.imagePreviews = [updatedOffer.imagePreview];
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

  // Delete an offer by ID
  const deleteOffer = (id) => {
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
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
    deleteOffer,
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