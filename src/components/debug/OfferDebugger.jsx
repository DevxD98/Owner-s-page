import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

const OfferDebugger = () => {
  const { offers } = useApp();
  const [debugInfo, setDebugInfo] = useState(null);
  const [localStorageOffers, setLocalStorageOffers] = useState([]);

  useEffect(() => {
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

    // Generate debug info
    const generateDebugInfo = () => {
      const storedOffers = getStoredOffers();
      setLocalStorageOffers(storedOffers);
      
      const customOffers = filterOffers(storedOffers);
      const testOffers = storedOffers.filter(offer => 
        offer.id.startsWith('test-') || 
        offer.id.startsWith('sample-') ||
        offer.id.startsWith('offer-') ||
        offer.id.startsWith('example-')
      );
      
      const info = {
        localStorage: {
          totalCount: storedOffers.length,
          defaultCount: testOffers.length,
          customCount: customOffers.length,
          offers: customOffers
        },
        context: {
          totalCount: offers?.length || 0,
          activeOffers: offers?.filter(o => o.isActive && !o.isDraft)?.length || 0,
          draftOffers: offers?.filter(o => o.isDraft)?.length || 0
        },
        diagnostics: {
          isDraftUndefined: customOffers.some(o => o.isDraft === undefined),
          isActiveUndefined: customOffers.some(o => o.isActive === undefined),
          hasTypeUndefined: customOffers.some(o => o.type === undefined),
          potentialIssues: []
        }
      };

      // Check for potential issues
      if (info.diagnostics.isDraftUndefined) {
        info.diagnostics.potentialIssues.push("Some offers have undefined isDraft property");
      }
      
      if (info.diagnostics.isActiveUndefined) {
        info.diagnostics.potentialIssues.push("Some offers have undefined isActive property");
      }
      
      if (info.diagnostics.hasTypeUndefined) {
        info.diagnostics.potentialIssues.push("Some offers have undefined type property");
      }
      
      // Compare localStorage and context
      if (info.localStorage.totalCount !== info.context.totalCount) {
        info.diagnostics.potentialIssues.push("Number of offers in localStorage doesn't match context");
      }
      
      return info;
    };

    const debugInfo = generateDebugInfo();
    setDebugInfo(debugInfo);

    console.log('===== OFFER STORAGE DEBUG INFO =====');
    console.log('Local Storage Offers:', debugInfo.localStorage);
    console.log('Context Offers:', debugInfo.context);
    console.log('Diagnostics:', debugInfo.diagnostics);
  }, [offers]);

  // Add test offer function
  const addTestOffer = (type = "spotlight") => {
    const storedOffers = localStorage.getItem('offers');
    let offers = [];
    
    try {
      offers = storedOffers ? JSON.parse(storedOffers) : [];
    } catch (e) {
      console.error('Error parsing offers:', e);
      offers = [];
    }
    
    // Generate a timestamp-based ID to ensure proper sorting
    const timestamp = Date.now();
    
    // Create test offer
    const newOffer = {
      id: String(timestamp),
      title: `Debug ${type.charAt(0).toUpperCase() + type.slice(1)} Offer`,
      description: `This is a test ${type} offer for debugging display issues`,
      type: type,
      isActive: true,
      isDraft: false, // Explicitly set to false
      views: 0,
      image: null,
      validTill: new Date(timestamp + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    // Add specific properties based on offer type
    if (type === 'happyhours') {
      newOffer.startTime = "14:00";
      newOffer.endTime = "16:00";
      newOffer.startDate = new Date().toISOString().split('T')[0];
      newOffer.validityDate = new Date(timestamp + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    // Add to beginning of array
    offers.unshift(newOffer);
    
    // Save back to localStorage
    localStorage.setItem('offers', JSON.stringify(offers));
    console.log('Added test offer:', newOffer);
    
    // Reload page to refresh context
    window.location.reload();
  };

  if (!debugInfo) {
    return <div className="p-4">Loading debug information...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Offer Debugging Information</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Storage Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">LocalStorage</p>
            <p className="mt-1">Total: {debugInfo.localStorage.totalCount}</p>
            <p>Custom: {debugInfo.localStorage.customCount}</p>
            <p>Default: {debugInfo.localStorage.defaultCount}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Context</p>
            <p className="mt-1">Total: {debugInfo.context.totalCount}</p>
            <p>Active: {debugInfo.context.activeOffers}</p>
            <p>Draft: {debugInfo.context.draftOffers}</p>
          </div>
        </div>
      </div>
      
      {debugInfo.diagnostics.potentialIssues.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Potential Issues</h3>
          <ul className="list-disc pl-5">
            {debugInfo.diagnostics.potentialIssues.map((issue, i) => (
              <li key={i} className="text-red-600">{issue}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Custom Offers</h3>
        {debugInfo.localStorage.offers.length > 0 ? (
          <div className="space-y-4">
            {debugInfo.localStorage.offers.map((offer, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-medium">{offer.title}</h4>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {offer.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <p><span className="font-medium">Type:</span> {offer.type || 'undefined'}</p>
                  <p>
                    <span className="font-medium">Draft:</span> 
                    <span className={offer.isDraft === undefined ? 'text-red-500' : ''}> 
                      {offer.isDraft !== undefined ? String(offer.isDraft) : 'undefined'}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Active:</span> 
                    <span className={offer.isActive === undefined ? 'text-red-500' : ''}> 
                      {offer.isActive !== undefined ? String(offer.isActive) : 'undefined'}
                    </span>
                  </p>
                  <p><span className="font-medium">Valid Until:</span> {offer.validTill || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No custom offers found</p>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Add Test Offers</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => addTestOffer('spotlight')}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Add Spotlight Offer
          </button>
          <button
            onClick={() => addTestOffer('happyhours')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Happy Hours Offer
          </button>
          <button
            onClick={() => addTestOffer('spintowin')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add Spin to Win Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDebugger;
