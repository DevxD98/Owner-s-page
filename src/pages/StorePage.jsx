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
  const [showCatalogEditor, setShowCatalogEditor] = useState(false);
  const [catalogImages, setCatalogImages] = useState(Array(6).fill(null));
  const [storeBanner, setStoreBanner] = useState(contextStoreImage || "");
  const [storeLogo, setStoreLogo] = useState(contextStoreLogo || "");
  
  // Update local state when context changes
  useEffect(() => {
    if (contextStoreImage) setStoreBanner(contextStoreImage);
    if (contextStoreLogo) setStoreLogo(contextStoreLogo);
  }, [contextStoreImage, contextStoreLogo]);
  
  const bannerInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const catalogInputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      {/* Store Banner */}
      <div className="relative w-[360px] h-[368px]">
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
      <div className="bg-white w-[360px] flex flex-col items-center text-center px-4 pt-14">
        <h1 className="text-lg font-semibold">“Here’s How Your Store Looks to Customers”</h1>
        <h2 className="text-xl font-medium mt-2">{storeName || 'Shop Name'}</h2>
        <p className="text-gray-500 mb-6">Address</p>

        {/* Tabs */}
        <div className="flex w-full border-b border-gray-300 mb-4">
          <button
            onClick={() => setSelectedTab('offers')}
            className={`flex-1 py-3 font-semibold ${
              selectedTab === 'offers'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-400'
            }`}
          >
            Available Offers
          </button>
          <button
            onClick={() => setSelectedTab('catalogue')}
            className={`flex-1 py-3 font-semibold ${
              selectedTab === 'catalogue'
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-400'
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
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {catalogImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square bg-gray-200 rounded-md flex items-center justify-center overflow-hidden"
                        onClick={() => catalogInputRefs.current[index].current.click()}
                      >
                        {image ? (
                          <img src={image} alt={`Catalog ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 text-xs p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                              <circle cx="12" cy="13" r="4"></circle>
                              <line x1="12" y1="8" x2="12" y2="8"></line>
                            </svg>
                            <span className="mt-1">Tap to Add Photo</span>
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
                  <div className="flex gap-2 mt-6 mb-8">
                    <button 
                      className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold"
                      onClick={() => setShowCatalogEditor(false)}
                    >
                      Edit Catalog
                    </button>
                    <button 
                      className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold shadow"
                      onClick={() => setShowCatalogEditor(false)}
                    >
                      Looks Good - Publish
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Catalog Button */}
        {selectedTab === 'catalogue' && !showCatalogEditor && (
          <div className="w-full px-4 mb-8">
            <button 
              className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold shadow"
              onClick={() => setShowCatalogEditor(true)}
            >
              Upload Your Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;