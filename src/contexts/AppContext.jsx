import React, { createContext, useContext, useState } from 'react';

const defaultContext = {
  location: 'A-01, Bank street, new delhi-110096',
  stats: {
    offersClaimed: 1,
    totalSpins: 1,
    adViewsToday: 1,
    topViewedAd: 1,
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
};

const AppContext = createContext(defaultContext);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState(defaultContext.location);
  const [stats, setStats] = useState(defaultContext.stats);
  const [offers, setOffers] = useState(defaultContext.offers);
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

  return (
    <AppContext.Provider
      value={{
        location,
        stats,
        offers,
        redemptions,
        toggleOffer,
        addOffer,
        updateOffer,
        updateRedemption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};