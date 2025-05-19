import React, { createContext, useContext, useState, useEffect } from 'react';
// Import our temporary local storage helper
import { loadAccountInfo, saveAccountInfo, loadStoreInfo, saveStoreInfo } from '../utils/localStorageHelper.js';

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
  
  // Sample offers data
  const [offers, setOffers] = useState([
    {
      id: "1",
      title: "Happy hours",
      description: "Flat 30% OFF on ₹499+",
      validTill: "2025-07-20",
      isActive: true,
      isDraft: false,
      imagePreview: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=400&auto=format&fit=crop",
      type: "happyhours",
      category: "Food",
      views: 230
    },
    {
      id: "2",
      title: "Spin to win !",
      description: "Flat 30% OFF on ₹499+",
      validTill: "2025-06-25",
      isActive: true,
      isDraft: false,
      imagePreview: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
      type: "spintowin",
      category: "Food",
      views: 230
    }
  ]);
  
  // Sample sponsored ads data
  const [sponsoredAds, setSponsoredAds] = useState([]);
  
  // Sample bookings data
  const [bookings, setBookings] = useState([
    {
      id: "b1",
      customerName: "Rahul Sharma",
      service: "Table Reservation",
      date: "2025-05-18",
      time: "7:30 PM",
      status: "confirmed",
      phoneNumber: "+91 97654 32109"
    },
    {
      id: "b2",
      customerName: "Ananya Mehta",
      service: "Birthday Party Booking",
      date: "2025-05-22",
      time: "6:00 PM",
      status: "confirmed",
      phoneNumber: "+91 89765 43210"
    }
  ]);
  
  // Sample redemptions data
  const [redemptions, setRedemptions] = useState([
    {
      id: "r1",
      customerName: "Vikram Patel",
      offerTitle: "Happy hours",
      redeemedOn: "2025-05-16",
      time: "7:45 PM",
      status: "completed"
    },
    {
      id: "r2",
      customerName: "Priya Joshi",
      offerTitle: "Spin to win !",
      redeemedOn: "2025-05-16",
      time: "8:15 PM",
      status: "completed"
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

  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: String(offers.length + sponsoredAds.length + 1),
    };
    
    // Check if this is a sponsored ad
    if (offer.isSponsored) {
      setSponsoredAds([...sponsoredAds, newOffer]);
    } else {
      setOffers([...offers, newOffer]);
    }
  };

  const updateOffer = (id, updatedOffer) => {
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
    
    // Regular update without conversion
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, ...updatedOffer } : offer
    ));
    setSponsoredAds(sponsoredAds.map(ad => 
      ad.id === id ? { ...ad, ...updatedOffer } : ad
    ));
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

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};