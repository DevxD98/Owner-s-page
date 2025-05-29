// Enhanced Debug Offers Script
// This script helps diagnose issues with offers not displaying in the
// Offer Management and Home page sections.

// Get offers from localStorage
const getStoredOffers = () => {
  const storedOffers = localStorage.getItem('offers');
  if (!storedOffers) {
    console.log('No offers found in localStorage');
    return [];
  }
  try {
    return JSON.parse(storedOffers);
  } catch (e) {
    console.error('Error parsing stored offers:', e);
    return [];
  }
};

// Filter offers by type (exclude default ones)
const filterOffers = (offers, excludeDefaults = true) => {
  if (excludeDefaults) {
    return offers.filter(offer => 
      !offer.id.startsWith('test-') && 
      !offer.id.startsWith('sample-') &&
      !offer.id.startsWith('offer-') &&
      !offer.id.startsWith('example-')
    );
  }
  return offers;
};

// Check if an offer would be displayed in OfferManagement component
const wouldDisplayInOfferManagement = (offer) => {
  if (!offer) return { display: false, reason: "Offer is null or undefined" };
  
  // Check for critical properties
  if (typeof offer.isDraft === 'undefined') {
    return { display: false, reason: "isDraft is undefined" };
  }
  
  if (offer.isDraft === true) {
    return { display: false, reason: "isDraft is true" };
  }
  
  // OfferManagement filters out drafts
  return { display: true, reason: "Passed all display criteria" };
};

// Check if an offer would be displayed in RecentLiveOffers component on HomePage
const wouldDisplayInRecentLiveOffers = (offer) => {
  if (!offer) return { display: false, reason: "Offer is null or undefined" };
  
  // Special filtering for RecentLiveOffers on HomePage
  // It filters to specific example offers only if they exist
  const isExampleOffer = offer.id === 'offer-spotlight-1' || 
                         offer.id === 'offer-happyhours-1' || 
                         offer.id === 'offer-spintowin-1';
                         
  // For non-example offers, check if they'd be filtered out
  if (!isExampleOffer) {
    if (typeof offer.isDraft === 'undefined') {
      return { display: false, reason: "isDraft is undefined" };
    }
    
    if (offer.isDraft === true) {
      return { display: false, reason: "isDraft is true" };
    }
    
    if (!offer.type) {
      return { display: false, reason: "type is missing" };
    }
  }
  
  return { 
    display: true, 
    reason: isExampleOffer ? "Is an example offer" : "Passed all display criteria",
    isExampleOffer
  };
};

// Save a test offer for debugging - includes proper properties
const addTestOffer = () => {
  const offers = getStoredOffers();
  
  // Create test offer with all required properties
  const newOffer = {
    id: `manual-test-${Date.now()}`,
    title: "Debug Test Offer",
    description: "This is a test offer for debugging display issues",
    type: "spotlight",
    isActive: true,
    isDraft: false, // Explicitly set to false
    views: 0,
    image: null,
    validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startDate: new Date().toISOString().split('T')[0],
    validityDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
  
  // Add to beginning of array
  offers.unshift(newOffer);
  
  // Save back to localStorage
  localStorage.setItem('offers', JSON.stringify(offers));
  console.log('Added test offer:', newOffer);
  
  return offers;
};

// Fix potential issues with offers
const fixOfferIssues = () => {
  const offers = getStoredOffers();
  
  // Count issues fixed
  let issuesFixed = 0;
  
  // Process each offer to fix issues
  const fixedOffers = offers.map(offer => {
    let isFixed = false;
    
    // Ensure isDraft is properly set
    if (offer.isDraft === undefined) {
      offer.isDraft = false;
      isFixed = true;
      issuesFixed++;
      console.log(`Fixed: Set isDraft=false for offer ${offer.id}`);
    }
    
    // Ensure type is set
    if (!offer.type) {
      offer.type = 'spotlight'; // Default type
      isFixed = true;
      issuesFixed++;
      console.log(`Fixed: Set type=spotlight for offer ${offer.id}`);
    }
    
    // Ensure isActive is set
    if (offer.isActive === undefined) {
      offer.isActive = true;
      isFixed = true;
      issuesFixed++;
      console.log(`Fixed: Set isActive=true for offer ${offer.id}`);
    }
    
    return offer;
  });
  
  if (issuesFixed > 0) {
    localStorage.setItem('offers', JSON.stringify(fixedOffers));
    console.log(`Fixed ${issuesFixed} issues in ${fixedOffers.length} offers`);
  } else {
    console.log('No issues found that needed fixing');
  }
  
  return fixedOffers;
};

// Show comprehensive storage information and diagnose display issues
const showStorageInfo = () => {
  const allOffers = getStoredOffers();
  const customOffers = filterOffers(allOffers);
  const testOffers = allOffers.filter(offer => 
    offer.id.startsWith('test-') || 
    offer.id.startsWith('sample-') ||
    offer.id.startsWith('offer-') ||
    offer.id.startsWith('example-')
  );
  
  console.log('===== OFFER STORAGE DEBUG INFO =====');
  console.log(`Total offers in storage: ${allOffers.length}`);
  console.log(`Default/test offers: ${testOffers.length}`);
  console.log(`Custom user offers: ${customOffers.length}`);
  
  // Check for display issues
  const displayIssues = {
    offerManagement: 0,
    recentLiveOffers: 0,
    total: customOffers.length
  };
  
  if (customOffers.length > 0) {
    console.log('\n=== USER-CREATED OFFERS ===');
    customOffers.forEach((offer, index) => {
      // Check why an offer might not display
      const offerMgmtCheck = wouldDisplayInOfferManagement(offer);
      const recentLiveCheck = wouldDisplayInRecentLiveOffers(offer);
      
      // Track display issues
      if (!offerMgmtCheck.display) displayIssues.offerManagement++;
      if (!recentLiveCheck.display) displayIssues.recentLiveOffers++;
      
      console.log(`\n${index + 1}. ${offer.title || 'Untitled'} (ID: ${offer.id})`);
      console.log(`   Type: ${offer.type || 'undefined'}`);
      console.log(`   Active: ${offer.isActive !== undefined ? offer.isActive : 'undefined'}`);
      console.log(`   Draft: ${offer.isDraft !== undefined ? offer.isDraft : 'undefined'}`);
      console.log(`   Will show in OfferManagement: ${offerMgmtCheck.display ? 'Yes' : 'No'} (${offerMgmtCheck.reason})`);
      console.log(`   Will show in RecentLiveOffers: ${recentLiveCheck.display ? 'Yes' : 'No'} (${recentLiveCheck.reason})`);
    });
  }
  
  // Show issue summary
  console.log('\n=== DISPLAY ISSUE SUMMARY ===');
  console.log(`Total custom offers: ${displayIssues.total}`);
  console.log(`Offers that won't show in OfferManagement: ${displayIssues.offerManagement}`);
  console.log(`Offers that won't show in RecentLiveOffers: ${displayIssues.recentLiveOffers}`);
  
  console.log('\n=== SOLUTION RECOMMENDATIONS ===');
  if (displayIssues.offerManagement > 0 || displayIssues.recentLiveOffers > 0) {
    console.log('Run fixOfferIssues() to attempt automatic repair of common issues');
    console.log('Issues may include:');
    console.log('1. isDraft flag might be true or undefined (should be false)');
    console.log('2. type property might be missing from some offers');
    console.log('3. isActive flag might be undefined');
  } else if (customOffers.length === 0) {
    console.log('No custom offers found. Try creating a test offer with addTestOffer()');
  } else {
    console.log('No obvious issues detected with offer properties');
    console.log('Possible remaining issues:');
    console.log('1. Component render timing issue - try refreshing the page');
    console.log('2. Filtering logic in components might be incorrect');
    console.log('3. Components might be using a cached version of offers');
  }
  
  console.log('\n================================');
  return { allOffers, customOffers, testOffers, displayIssues };
};

// Export functions for browser console use
if (typeof window !== 'undefined') {
  window.debugOffers = {
    getStoredOffers,
    filterOffers,
    addTestOffer,
    fixOfferIssues,
    showStorageInfo,
    wouldDisplayInOfferManagement,
    wouldDisplayInRecentLiveOffers
  };
  
  console.log('Offer debugging tools loaded! Type the following in your browser console:');
  console.log('- debugOffers.showStorageInfo() - to see all offers and diagnose issues');
  console.log('- debugOffers.addTestOffer() - to add a test offer with correct properties');
  console.log('- debugOffers.fixOfferIssues() - to attempt to fix common issues with offers');
}

// Run the commands to debug
const info = showStorageInfo();
