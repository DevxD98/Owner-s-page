import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  location: '',
  storeName: '',
  stats: {
    offersClaimed: 0,
    totalSpins: 0,
    adViewsToday: 0,
    topViewedAd: 0,
  },
  offers: [],
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
  const [stats, setStats] = useState(defaultContext.stats);
  const [offers, setOffers] = useState(defaultContext.offers);
  const [bookings, setBookings] = useState(defaultContext.bookings);
  const [redemptions, setRedemptions] = useState(defaultContext.redemptions);

  const toggleOffer = (id) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };

  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: String(offers.length + 1),
    };
    setOffers([...offers, newOffer]);
  };

  const updateOffer = (id, updatedOffer) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, ...updatedOffer } : offer
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