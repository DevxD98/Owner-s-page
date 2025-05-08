import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const StorePage = () => {
  const navigate = useNavigate();
  const { storeName } = useApp();
  const [selectedTab, setSelectedTab] = useState('catalogue');

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      {/* Store Banner */}
      <div className="relative w-[360px] h-[368px]">
        <img
          src="https://via.placeholder.com/360x368"
          alt="Store Banner"
          className="w-full h-full object-cover rounded-b-[30px]"
        />

        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-1 bg-white rounded-full p-2 shadow-md"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Store Logo */}
        <div className="absolute -bottom-[38.5px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-[77px] h-[77px] rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
            <img
              src="https://via.placeholder.com/77"
              alt="Store Logo"
              className="w-full h-full object-cover"
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
        <div className="flex-grow w-full text-center text-gray-500 min-h-[120px] flex items-center justify-center">
        
          {selectedTab === 'offers' ? (
            <p>This store has no offers currently</p>
          ) : (
            <p>No products added yet</p>
          )}
        </div>

        {/* Upload Catalog Button */}
        {selectedTab === 'catalogue' && (
          <div className="w-full px-4 mb-8">
            <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold shadow">
              Upload Your Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;