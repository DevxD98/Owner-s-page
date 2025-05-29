// Offer Debug Helper Script
// Copy and paste this into the browser console to debug offer display issues

(function() {
  console.log('=== OFFER DISPLAY DEBUGGER ===');
  
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
  
  // Filter offers by type
  const filterOffers = (offers, type) => {
    return offers.filter(offer => offer.type === type);
  };
  
  // Get custom (non-sample) offers
  const getCustomOffers = (offers) => {
    return offers.filter(offer => 
      !offer.id.includes('offer-spotlight-') && 
      !offer.id.includes('offer-happyhours-') && 
      !offer.id.includes('offer-spintowin-') &&
      !offer.id.startsWith('test-') &&
      !offer.id.startsWith('sample-') &&
      !offer.id.startsWith('example-')
    );
  };
  
  const logOfferProperties = (offer) => {
    return {
      id: offer.id,
      title: offer.title,
      type: offer.type,
      isDraft: offer.isDraft,
      isActive: offer.isActive,
      validTill: offer.validTill
    };
  };
  
  // Main function
  const debugOffers = () => {
    const allOffers = getStoredOffers();
    const userOffers = getCustomOffers(allOffers);
    
    console.log(`Total offers: ${allOffers.length}`);
    console.log(`User-created offers: ${userOffers.length}`);
    
    if (userOffers.length > 0) {
      console.log('\nUser-created offers:');
      userOffers.forEach((offer, i) => {
        console.log(`${i+1}. ${offer.title}`, logOfferProperties(offer));
      });
    }
    
    console.log('\nOffer counts by type and draft status:');
    const spotlightOffers = filterOffers(allOffers, 'spotlight');
    const happyhoursOffers = filterOffers(allOffers, 'happyhours');
    const spintowinOffers = filterOffers(allOffers, 'spintowin');
    
    console.log(`Spotlight: ${spotlightOffers.length} (Draft: ${spotlightOffers.filter(o => o.isDraft).length})`);
    console.log(`Happy Hours: ${happyhoursOffers.length} (Draft: ${happyhoursOffers.filter(o => o.isDraft).length})`);
    console.log(`Spin to Win: ${spintowinOffers.length} (Draft: ${spintowinOffers.filter(o => o.isDraft).length})`);
    
    console.log('\nPotential issues:');
    const offersMissingIsDraft = allOffers.filter(o => o.isDraft === undefined);
    const offersMissingIsActive = allOffers.filter(o => o.isActive === undefined);
    const offersMissingType = allOffers.filter(o => !o.type);
    
    if (offersMissingIsDraft.length > 0) {
      console.error(`Found ${offersMissingIsDraft.length} offers with missing isDraft property`);
    }
    
    if (offersMissingIsActive.length > 0) {
      console.error(`Found ${offersMissingIsActive.length} offers with missing isActive property`);
    }
    
    if (offersMissingType.length > 0) {
      console.error(`Found ${offersMissingType.length} offers with missing type property`);
    }
    
    return {
      allOffers,
      userOffers,
      spotlightOffers,
      happyhoursOffers,
      spintowinOffers,
      issues: {
        offersMissingIsDraft,
        offersMissingIsActive,
        offersMissingType
      }
    };
  };

  // Run the debugger and store results for further inspection
  window.offerDebugResults = debugOffers();
  
  console.log('\nDebug results stored in window.offerDebugResults');
  console.log('=== END OF DEBUG ===');
})();
