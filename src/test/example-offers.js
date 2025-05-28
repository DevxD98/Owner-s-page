// Example offers with 3 images each for the offer management page
export const exampleOffers = [
  // Spotlight Offers
  {
    id: 'example-spotlight-1',
    title: 'Weekend Special: 30% Off All Menu Items',
    description: 'Enjoy a special 30% discount on our entire menu this weekend. Valid for dine-in and takeaway orders. Come and treat yourself to our delicious offerings!',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-24',
    validTill: '2025-06-10',
    views: 168,
    isBoosted: true,
    boostedViews: 35,
    category: 'Food & Dining',
    minPurchase: '200',
    redemptionsAllowed: '1',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'example-spotlight-2',
    title: 'Buy One Get One Free Desserts',
    description: 'Purchase any dessert from our menu and get a second dessert of equal or lesser value absolutely free! Perfect for sharing with friends and family.',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-20',
    validTill: '2025-06-20',
    views: 94,
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80'
  },
  
  // Happy Hours Offers
  {
    id: 'example-happyhours-1',
    title: 'Cocktail Happy Hours: 50% Off',
    description: 'Enjoy half-price cocktails every day between 5pm and 8pm. Try our signature martinis, mojitos, and more at amazing prices!',
    type: 'happyhours',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-15',
    validTill: '2025-08-15',
    startTime: '17:00',
    endTime: '20:00',
    views: 212,
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'example-happyhours-2',
    title: 'Early Bird Special: 25% Off Breakfast',
    description: 'Start your day right with our breakfast special. Get 25% off on all breakfast items when you visit between 7am and 9am.',
    type: 'happyhours',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-01',
    validTill: '2025-07-31',
    startTime: '07:00',
    endTime: '09:00',
    views: 87,
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1496042399014-dc73c4f2813e?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80'
  },
  
  // Spin to Win Offers
  {
    id: 'example-spintowin-1',
    title: 'Spin & Win Up to 50% Off',
    description: 'Spin the wheel for a chance to win discounts ranging from 10% to 50% on your entire order!',
    type: 'spintowin',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-10',
    validTill: '2025-06-30',
    views: 142,
    spinnerOffers: ['10% Off', '20% Off', '30% Off', '40% Off', '50% Off', 'Better luck next time'],
    spinnerProbabilities: ['30', '25', '20', '15', '5', '5'],
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1662980142447-5fbd3ae15885?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'example-spintowin-2',
    title: 'Mystery Dessert Spin',
    description: 'Spin the wheel to win a free mystery dessert with your meal! Every spin wins something delicious.',
    type: 'spintowin',
    isDraft: false,
    isActive: true,
    startDate: '2025-05-15',
    validTill: '2025-07-15',
    views: 76,
    spinnerOffers: ['Chocolate Cake', 'Apple Pie', 'Ice Cream', 'Brownie', 'Cheesecake'],
    spinnerProbabilities: ['20', '20', '20', '20', '20'],
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80'
  },
  
  // Draft Offer
  {
    id: 'example-draft-1',
    title: 'Upcoming Summer Special',
    description: 'Draft offer for our upcoming summer promotion with exclusive seasonal menu items.',
    type: 'spotlight',
    isDraft: true,
    isActive: false,
    startDate: '2025-06-01',
    validTill: '2025-08-31',
    views: 0,
    category: 'Food & Dining',
    images: [
      'https://images.unsplash.com/photo-1560717844-1cef0aa49ac8?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1560717844-1cef0aa49ac8?auto=format&fit=crop&w=500&q=80'
  },
  
  // Sponsored Offer
  {
    id: 'example-sponsored-1',
    title: 'Premium Chef\'s Table Experience',
    description: 'Exclusive 5-course tasting menu prepared by our executive chef right at your table. Limited seats available.',
    type: 'spotlight',
    isDraft: false,
    isActive: true,
    isSponsored: true,
    startDate: '2025-05-25',
    validTill: '2025-07-25',
    views: 254,
    isBoosted: true,
    boostedViews: 75,
    category: 'Food & Dining',
    minPurchase: '1000',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?auto=format&fit=crop&w=500&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80'
  }
];

export const addExampleOffers = (existingOffers) => {
  return [...exampleOffers, ...existingOffers];
};
