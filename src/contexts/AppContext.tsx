import React, { createContext, useContext, useState, ReactNode } from 'react';

type Offer = {
  id: string;
  title: string;
  isActive: boolean;
  validTill: string;
};

type Redemption = {
  id: string;
  customerName: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  offerId: string;
};

type AppContextType = {
  location: string;
  stats: {
    offersClaimed: number;
    totalSpins: number;
    adViewsToday: number;
    topViewedAd: number;
  };
  offers: Offer[];
  redemptions: Redemption[];
  toggleOffer: (id: string) => void;
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  updateRedemption: (id: string, redemption: Partial<Redemption>) => void;
};

const defaultContext: AppContextType = {
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

const AppContext = createContext<AppContextType>(defaultContext);

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState(defaultContext.location);
  const [stats, setStats] = useState(defaultContext.stats);
  const [offers, setOffers] = useState(defaultContext.offers);
  const [redemptions, setRedemptions] = useState(defaultContext.redemptions);

  const toggleOffer = (id: string) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
    );
  };

  const addOffer = (offer: Omit<Offer, 'id'>) => {
    const newOffer = {
      ...offer,
      id: Date.now().toString(),
    };
    setOffers((prevOffers) => [...prevOffers, newOffer]);
  };

  const updateOffer = (id: string, updatedOffer: Partial<Offer>) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === id ? { ...offer, ...updatedOffer } : offer
      )
    );
  };

  const updateRedemption = (id: string, updatedRedemption: Partial<Redemption>) => {
    setRedemptions((prevRedemptions) =>
      prevRedemptions.map((redemption) =>
        redemption.id === id ? { ...redemption, ...updatedRedemption } : redemption
      )
    );
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