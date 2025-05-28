// Test data for offers with consistent 3-image grid configuration
export const testOffers = [
  {
    id: 'offer-spotlight-1',
    title: 'Weekend Special: 25% Off All Items',
    description: 'Enjoy a special discount on all menu items this weekend!',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1544025162-d76694265947',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
    ],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    views: 68
  },
  {
    id: 'offer-happyhours-1',
    title: 'Happy Hour: Half-Price Drinks',
    description: 'Enjoy half-price drinks every day from 5-7pm',
    type: 'happyhours',
    isDraft: false,
    isActive: true,
    startTime: '17:00',
    endTime: '19:00',
    images: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
    ],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
    views: 124
  },
  {
    id: 'offer-spintowin-1',
    title: 'Spin & Win: Free Dessert',
    description: 'Spin the wheel for a chance to win a free dessert with your meal',
    type: 'spintowin',
    isDraft: false,
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1563396983906-b3795482a59a',
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176'
    ],
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a',
    views: 95
  },
  {
    id: 'offer-spotlight-2',
    title: 'New Menu Items Available',
    description: 'Try our new collection of seasonal specialties!',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1555982105-d25af4182e4e',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    ],
    image: 'https://images.unsplash.com/photo-1555982105-d25af4182e4e',
    views: 47
  },
  {
    id: 'offer-sponsored-1',
    title: 'Premium Dining Experience',
    description: 'Book our exclusive chef\'s table experience for a memorable evening',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    isSponsored: true,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    views: 156
  }
];

// Function to add test offers to the existing offers array
export const addTestOffers = (existingOffers) => {
  // Create a new array with test offers at the beginning
  return [...testOffers, ...existingOffers];
};
