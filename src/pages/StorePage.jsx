import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { blobUrlToDataUrl } from '../utils/imageUtils.js';

const StorePage = () => {
  const navigate = useNavigate();
  const { 
    storeName, 
    storeCategory, 
    storeAddress, 
    storeLogo: contextStoreLogo, 
    storeImage: contextStoreImage,
    storePhone,
    storeHours,
    setStoreLogo: updateStoreLogo,
    setStoreImage: updateStoreImage
  } = useApp();
  
  const [selectedTab, setSelectedTab] = useState('catalogue');
  const [showCatalogEditor, setShowCatalogEditor] = useState(true); // Start with editor open
  const [catalogImages, setCatalogImages] = useState(Array(4).fill(null)); // Start with 4 images for 2x2 grid
  const [storeBanner, setStoreBanner] = useState(contextStoreImage || "");
  const [storeLogo, setStoreLogo] = useState(contextStoreLogo || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [uploadFeedback, setUploadFeedback] = useState({ show: false, index: null });
  const scrollContainerRef = useRef(null);
  
  // Update local state when context changes
  useEffect(() => {
    if (contextStoreImage) setStoreBanner(contextStoreImage);
    if (contextStoreLogo) setStoreLogo(contextStoreLogo);
  }, [contextStoreImage, contextStoreLogo]);
  
  // Animation effect for page load
  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const bannerInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const catalogInputRefs = useRef(Array(4).fill(null).map(() => React.createRef())); // Update to 4 refs for 2x2 grid

  // Function to add more photo placeholders
  const addMorePhotos = () => {
    const newImages = [...catalogImages, null, null];
    setCatalogImages(newImages);
    
    // Add more refs
    catalogInputRefs.current = [...catalogInputRefs.current, React.createRef(), React.createRef()];
    
    // Wait for DOM to update and scroll to new photos
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: 'smooth'
        });
        
        // Update active index to the last added image
        setActiveImageIndex(newImages.length - 2);
      }
    }, 100);
  };
  
  // Function to handle horizontal scrolling with mouse wheel
  const handleHorizontalScroll = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };
  
  // Function to handle scroll events to update the active dot indicator
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const scrollPosition = scrollContainerRef.current.scrollLeft;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const newActiveIndex = Math.round(scrollPosition / (containerWidth / 2));
    
    if (newActiveIndex !== activeImageIndex && newActiveIndex < catalogImages.length) {
      setActiveImageIndex(newActiveIndex);
    }
  };
  
  // Function to scroll to a specific image when clicking on dot
  const scrollToImage = (index) => {
    if (!scrollContainerRef.current) return;
    
    const containerWidth = scrollContainerRef.current.clientWidth;
    const scrollAmount = index * (containerWidth / 2);
    
    scrollContainerRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setActiveImageIndex(index);
  };

  return (
    <div 
      className={`flex flex-col items-center w-full min-h-screen transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced gradient overlay with longer fade effect */}
      <div style={{
        background: "linear-gradient(180deg, rgba(129,140,248,0.2) 0%, rgba(196,181,253,0.15) 30%, rgba(224,231,255,0.05) 70%, rgba(255,255,255,0) 100%)"
      }} className="absolute top-0 left-0 w-full h-36 z-0 pointer-events-none"></div>
      
      {/* Subtle animated light effect */}
      <div className="absolute top-0 left-0 w-full opacity-10 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-5 left-[10%] w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-10 right-[15%] w-24 h-24 bg-gradient-to-br from-purple-100/20 to-transparent rounded-full blur-xl animate-float-slow-reverse"></div>
      </div>
      
      {/* Store Banner */}
      <div className="relative w-full h-[368px]">
        {storeBanner ? (
          <img
            src={storeBanner}
            alt="Store Banner"
            className="w-full h-full object-cover rounded-b-[30px] cursor-pointer"
            onClick={() => bannerInputRef.current.click()}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Cpath d='M400,150 C430,150 450,120 450,100 C450,80 430,50 400,50 C370,50 350,80 350,100 C350,120 370,150 400,150 Z' fill='%23d1d5db'/%3E%3Cpath d='M250,350 Q400,250 550,350' stroke='%23d1d5db' stroke-width='20' fill='transparent'/%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-[30px] flex flex-col items-center justify-center cursor-pointer"
            onClick={() => bannerInputRef.current.click()}
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Add Store Banner</p>
            <p className="text-gray-400 text-sm mt-1">Recommended size: 1200 x 400 px</p>
          </div>
        )}
        <input 
          type="file" 
          ref={bannerInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const blobUrl = URL.createObjectURL(e.target.files[0]);
              try {
                // Convert to data URL for persistence
                const dataUrl = await blobUrlToDataUrl(blobUrl);
                setStoreBanner(dataUrl);
                // Update the context
                updateStoreImage && updateStoreImage(dataUrl);
                // Release the blob URL
                URL.revokeObjectURL(blobUrl);
              } catch (error) {
                console.error('Error processing banner image:', error);
                setStoreBanner(blobUrl); // Fallback to blob URL if conversion fails
              }
            }
          }}
        />

        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-9 left--3 bg-white rounded-full p-2 shadow-md"
        >
          <ArrowLeft size={25} />
        </button>

        {/* Store Logo */}
        <div className="absolute -bottom-[44px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden shadow-lg bg-white relative">
            {storeLogo ? (
              <img
                src={storeLogo}
                alt="Store Logo"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => logoInputRef.current.click()}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%23d1d5db'/%3E%3Cpath d='M25,85 Q50,65 75,85' stroke='%23d1d5db' stroke-width='10' fill='transparent'/%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div 
                className="w-full h-full bg-gray-200 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => logoInputRef.current.click()}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <Pencil size={24} className="text-gray-400" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Add Logo</span>
              </div>
            )}
            <button 
              className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all"
              onClick={() => logoInputRef.current.click()}
            >
              <Pencil size={16} />
            </button>
            <input 
              type="file" 
              ref={logoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const blobUrl = URL.createObjectURL(e.target.files[0]);
                  try {
                    // Convert to data URL for persistence
                    const dataUrl = await blobUrlToDataUrl(blobUrl);
                    setStoreLogo(dataUrl);
                    // Update the context
                    updateStoreLogo && updateStoreLogo(dataUrl);
                    // Release the blob URL
                    URL.revokeObjectURL(blobUrl);
                  } catch (error) {
                    console.error('Error processing logo image:', error);
                    setStoreLogo(blobUrl); // Fallback to blob URL if conversion fails
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white w-full flex flex-col items-center text-center px-4 pt-20">
        <h1 className="text-lg font-semibold">“Here’s How Your Store Looks to Customers”</h1>
        <h2 className="text-xl font-medium mt-2">{storeName || 'Shop Name'}</h2>
        <p className="text-gray-500 mb-6">{storeAddress || 'Address'}</p>

        {/* Tabs */}
        <div className="flex w-full border-b border-gray-300 mb-4">
          <button
            onClick={() => setSelectedTab('offers')}
            className={`flex-1 py-3 font-semibold transition-all ${
              selectedTab === 'offers'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Available Offers
          </button>
          <button
            onClick={() => setSelectedTab('catalogue')}
            className={`flex-1 py-3 font-semibold transition-all ${
              selectedTab === 'catalogue'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Store Catalogue
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow w-full text-center text-gray-500 min-h-[120px]">
          {selectedTab === 'offers' ? (
            <div className="flex items-center justify-center h-full">
              <p>This store has no offers currently</p>
            </div>
          ) : (
            <div className="w-full">
              {!showCatalogEditor ? (
                <div className="flex items-center justify-center h-[120px]">
                  <p>No products added yet</p>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-600 font-medium">Showcase your best products with photos</p>
                    <span className="text-xs text-gray-500">
                      {catalogImages.some(img => img !== null) 
                        ? `${activeImageIndex + 1} / ${catalogImages.length}`
                        : '0 / 0'
                      }
                    </span>
                  </div>
                  
                  {/* Gallery container with navigation arrows */}
                  <div className="relative">
                    {/* Left scroll button */}
                    <button 
                      onClick={() => {
                        const newIndex = Math.max(0, activeImageIndex - 1);
                        scrollToImage(newIndex);
                      }}
                      className={`absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 shadow-md transition-all ${
                        activeImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                      disabled={activeImageIndex === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    
                    {/* Horizontal scrollable image gallery */}
                    <div 
                      ref={scrollContainerRef}
                      className="flex overflow-x-auto pb-4 px-1 gap-3 mb-2 hide-scrollbar snap-x snap-mandatory" 
                      onWheel={handleHorizontalScroll}
                      onScroll={handleScroll}
                      style={{scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch'}}
                    >
                    {catalogImages.map((image, index) => (
                      <div 
                        key={index}
                        className="flex-shrink-0 snap-center pl-0.5 first:pl-0.5"
                        style={{width: 'calc(60% - 8px)', minWidth: '180px', maxWidth: '250px'}}
                      >
                        <div 
                          className="aspect-square bg-gray-100 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:shadow-md w-full catalog-image"
                          onClick={() => catalogInputRefs.current[index].current.click()}
                        >
                          {image ? (
                            <div className="relative w-full h-full group">
                              <img 
                                src={image} 
                                alt={`Catalog ${index}`} 
                                className="w-full h-full object-cover cursor-pointer" 
                                title="Click to change image"
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                                Product {index + 1}
                              </div>
                              
                              {/* Action buttons overlay */}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex space-x-1">
                                  <button 
                                    className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newImages = [...catalogImages];
                                      newImages[index] = null;
                                      setCatalogImages(newImages);
                                    }}
                                    title="Remove image"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M18 6L6 18"></path>
                                      <path d="M6 6l12 12"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {uploadFeedback.show && uploadFeedback.index === index && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
                                  <div className="bg-white rounded-lg p-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-1">
                                      <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Uploaded!</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400 text-sm p-2 relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-60"></div>
                              <div className="relative z-10 flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                                    <circle cx="12" cy="13" r="4"></circle>
                                    <path d="M12 8v.01"></path>
                                    <path d="M8 21l4-4 4 4"></path>
                                  </svg>
                                </div>
                                <span className="font-medium text-gray-500">Tap to Add Photo</span>
                                <span className="text-xs mt-1">{index + 1} of {catalogImages.length}</span>
                              </div>
                            </div>
                          )}
                          <input 
                            type="file" 
                            ref={catalogInputRefs.current[index]} 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                // Create blob URL first
                                const blobUrl = URL.createObjectURL(e.target.files[0]);
                                
                                try {
                                  // Convert to data URL for persistence
                                  const dataUrl = await blobUrlToDataUrl(blobUrl);
                                  
                                  // Update the array with the data URL
                                  const newImages = [...catalogImages];
                                  newImages[index] = dataUrl;
                                  setCatalogImages(newImages);
                                  
                                  // Release the blob URL
                                  URL.revokeObjectURL(blobUrl);
                                  
                                  // Show feedback
                                  setUploadFeedback({ show: true, index });
                                  setTimeout(() => {
                                    setUploadFeedback({ show: false, index: null });
                                  }, 2000);
                                } catch (error) {
                                  console.error('Error processing catalog image:', error);
                                  
                                  // Fallback to using blob URL if conversion fails
                                  const newImages = [...catalogImages];
                                  newImages[index] = blobUrl;
                                  setCatalogImages(newImages);
                                  
                                  // Show feedback
                                  setUploadFeedback({ show: true, index });
                                  setTimeout(() => {
                                    setUploadFeedback({ show: false, index: null });
                                  }, 2000);
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                    
                    {/* Right scroll button */}
                    <button 
                      onClick={() => {
                        const newIndex = Math.min(catalogImages.length - 1, activeImageIndex + 1);
                        scrollToImage(newIndex);
                      }}
                      className={`absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1.5 shadow-md transition-all ${
                        activeImageIndex >= catalogImages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                      }`}
                      disabled={activeImageIndex >= catalogImages.length - 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Pagination dots for mobile */}
                  <div className="flex justify-center gap-1.5 mt-2 mb-4">
                    {catalogImages.map((_, index) => (
                      <button
                        key={`dot-${index}`}
                        onClick={() => scrollToImage(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeImageIndex === index 
                            ? 'bg-indigo-500 dot-active'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Add more photos button */}
                  <button
                    className="w-full border border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 py-3.5 rounded-xl my-4 font-semibold flex items-center justify-center gap-2 hover:from-indigo-100 hover:to-purple-100 transition-all shadow-sm"
                    onClick={addMorePhotos}
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                    Add More Photos
                  </button>
                  
                  <div className="flex gap-3 mt-6 mb-8">
                    <button 
                      className="flex-1 border border-gray-300 py-3.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center"
                      onClick={() => setCatalogImages(Array(4).fill(null))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                      Reset All
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center"
                      onClick={() => {
                        // Here we would typically save to backend
                        // For now just show a success message
                        alert('Catalog saved successfully!');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Catalog Button removed - editor is shown directly */}
      </div>
    </div>
  );
};

export default StorePage;