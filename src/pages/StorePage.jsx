import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

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
    setCatalogImages([...catalogImages, null, null]);
    // Add more refs
    catalogInputRefs.current = [...catalogInputRefs.current, React.createRef(), React.createRef()];
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
          />
        ) : (
          <div 
            className="w-full h-full bg-gray-200 rounded-b-[30px] flex items-center justify-center cursor-pointer"
            onClick={() => bannerInputRef.current.click()}
          >
            <p className="text-gray-500">Click to add store banner</p>
          </div>
        )}
        <input 
          type="file" 
          ref={bannerInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setStoreBanner(URL.createObjectURL(e.target.files[0]));
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
        <div className="absolute -bottom-[38.5px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-[77px] h-[77px] rounded-full border-4 border-white overflow-hidden shadow-lg bg-white relative">
            {storeLogo ? (
              <img
                src={storeLogo}
                alt="Store Logo"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => logoInputRef.current.click()}
              />
            ) : (
              <div 
                className="w-full h-full bg-gray-300 flex items-center justify-center cursor-pointer"
                onClick={() => logoInputRef.current.click()}
              >
                <Pencil size={20} className="text-gray-500" />
              </div>
            )}
            <button 
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
              onClick={() => logoInputRef.current.click()}
            >
              <Pencil size={12} />
            </button>
            <input 
              type="file" 
              ref={logoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const logoUrl = URL.createObjectURL(e.target.files[0]);
                  setStoreLogo(logoUrl);
                  // Update the context
                  updateStoreLogo && updateStoreLogo(logoUrl);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white w-full flex flex-col items-center text-center px-4 pt-14">
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
                  <p className="text-gray-600 font-medium mb-3">Showcase your best products with photos</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {catalogImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square bg-gray-100 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:shadow-md"
                        onClick={() => catalogInputRefs.current[index].current.click()}
                      >
                        {image ? (
                          <img src={image} alt={`Catalog ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 text-sm p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                              <circle cx="12" cy="13" r="4"></circle>
                              <line x1="12" y1="8" x2="12" y2="8"></line>
                            </svg>
                            <span className="mt-2 font-medium">Tap to Add Photo</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          ref={catalogInputRefs.current[index]} 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const newImages = [...catalogImages];
                              newImages[index] = URL.createObjectURL(e.target.files[0]);
                              setCatalogImages(newImages);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Add more photos button */}
                  <button
                    className="w-full border border-indigo-400 text-indigo-600 py-3 rounded-xl my-4 font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
                    onClick={addMorePhotos}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Add More Photos
                  </button>
                  
                  <div className="flex gap-3 mt-4 mb-8">
                    <button 
                      className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setCatalogImages(Array(4).fill(null))}
                    >
                      Reset All
                    </button>
                    <button 
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition-colors"
                      onClick={() => {
                        // Here we would typically save to backend
                        // For now just show a success message
                        alert('Catalog saved successfully!');
                      }}
                    >
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