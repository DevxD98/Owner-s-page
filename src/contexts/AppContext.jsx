import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  location: 'A-01, Bank street, new delhi-110096',
  storeName: 'Matrix salon',
  stats: {
    offersClaimed: 0,
    totalSpins: 0,
    adViewsToday: 0,
    topViewedAd: 0,
  },
  offers: [
    {
      id: '1',
      title: 'Flat 30% OFF on ₹499+',
      isActive: true,
      validTill: '30 May 2025',
    },
    {
      id: '2',
      title: 'Spin to win offer !',
      isActive: true,
      validTill: '15 Jun 2025',
    },
    {
      id: '3',
      title: 'Spin to win offer !',
      isActive: false,
      validTill: '20 Jun 2025',
    },
  ],
  bookings: [
    {
      id: '1',
      customerName: 'Ravi Shankar',
      offerType: 'Spin to win',
      date: '11 April 2025',
      time: '10:30 AM',
      validTill: 'May 10',
      status: 'Booked',
      offerId: '2'
    }
  ],
  redemptions: [
    {
      id: '1',
      customerName: 'Ravi Shankar',
      date: '11 April 2025',
      status: 'completed',
      offerId: '1'
    },
    {
      id: '2',
      customerName: 'Ravi Shankar',
      date: '11 April 2025',
      status: 'completed',
      offerId: '1'
    },
    {
      id: '3',
      customerName: 'Ravi Shankar',
      date: '11 April 2025',
      status: 'completed',
      offerId: '1'
    }
  ],
  toggleOffer: () => {},
  addOffer: () => {},
  updateOffer: () => {},
  updateRedemption: () => {},
  updateBooking: () => {},
};

const AppContext = createContext(defaultContext);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState(defaultContext.location);
  const [storeName, setStoreName] = useState(defaultContext.storeName);
  const [storeCategory, setStoreCategory] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeHours, setStoreHours] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
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