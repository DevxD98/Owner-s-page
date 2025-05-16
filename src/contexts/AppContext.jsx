import React, { createContext, useContext, useState } from 'react';

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
  const [location, setLocation] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeHours, setStoreHours] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [pincode, setPincode] = useState('');
  const [googleMapLocation, setGoogleMapLocation] = useState('');
  
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
      title: "50% OFF on First Order",
      description: "Get half off on your first purchase with us",
      validTill: "2025-07-20",
      isActive: true,
      isDraft: false,
      imagePreview: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=400&auto=format&fit=crop",
      type: "spotlight",
      category: "Food"
    },
    {
      id: "2",
      title: "Buy 2 Get 1 Free",
      description: "Special weekend offer - buy two items and get one free",
      validTill: "2025-06-25",
      isActive: true,
      isDraft: false,
      imagePreview: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
      type: "spotlight",
      category: "Food"
    },
    {
      id: "3",
      title: "Happy Hour: 6PM-8PM",
      description: "25% off on all menu items during happy hours",
      validTill: "2025-08-15",
      startTime: "6:00 PM",
      endTime: "8:00 PM",
      isActive: true,
      isDraft: false,
      type: "happyhours",
      imagePreview: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Monday Special: Combo Deal",
      description: "Get our special combo meal at a discounted price every Monday",
      validTill: "2025-06-30",
      isActive: false,
      isDraft: false,
      type: "spotlight",
      imagePreview: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=400&auto=format&fit=crop"
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
    },
    {
      id: "b3",
      customerName: "Arjun Khan",
      service: "Dinner Reservation",
      date: "2025-05-16",
      time: "8:30 PM",
      status: "completed",
      phoneNumber: "+91 76543 21098"
    },
    {
      id: "b4",
      customerName: "Neha Singh",
      service: "Lunch Reservation",
      date: "2025-05-17",
      time: "1:00 PM",
      status: "cancelled",
      phoneNumber: "+91 87654 32109"
    }
  ]);
  
  // Sample redemptions data
  const [redemptions, setRedemptions] = useState([
    {
      id: "r1",
      customerName: "Vikram Patel",
      offerTitle: "50% OFF on First Order",
      redeemedOn: "2025-05-16",
      time: "7:45 PM",
      status: "completed"
    },
    {
      id: "r2",
      customerName: "Priya Joshi",
      offerTitle: "Buy 2 Get 1 Free",
      redeemedOn: "2025-05-16",
      time: "8:15 PM",
      status: "completed"
    },
    {
      id: "r3",
      customerName: "Karan Gupta",
      offerTitle: "Happy Hour: 6PM-8PM",
      redeemedOn: "2025-05-15",
      time: "7:20 PM",
      status: "completed"
    },
    {
      id: "r4",
      customerName: "Deepika Malhotra",
      offerTitle: "Monday Special: Combo Deal",
      redeemedOn: "2025-05-13",
      time: "1:00 PM",
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