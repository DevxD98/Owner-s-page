import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Megaphone, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

// Example sponsored ads data for when there are no real ads
const exampleAds = [
  {
    id: 'sponsored-example-1',
    title: 'Summer Special - 20% Off',
    description: 'Get 20% off on all summer collection. Limited time offer!',
    validTill: '2025-06-10T00:00:00.000Z',
    isActive: true,
    isDraft: false,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 1240,
    isSponsored: true,
    adType: 'image'
  },
  {
    id: 'sponsored-example-2',
    title: 'Weekend Coffee Deal',
    description: 'Buy one coffee, get one free every weekend. Valid at all our locations.',
    validTill: '2025-06-17T00:00:00.000Z',
    isActive: true, 
    isDraft: false,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 938,
    isSponsored: true,
    adType: 'image'
  }
];

// Format date to show "Jun 10" format
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (error) {
    return 'Invalid date';
  }
};

const MyAdsPage = () => {
  const navigate = useNavigate();
  const { sponsoredAds } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [visibleAds, setVisibleAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter ads based on search term and filter
  useEffect(() => {
    // Get all actual ads that aren't drafts
    let filteredAds = sponsoredAds.filter(ad => !ad.isDraft);
    
    // If no actual ads, use example ads
    if (filteredAds.length === 0) {
      filteredAds = exampleAds;
    }
    
    // Apply filters
    if (filter !== 'all') {
      filteredAds = filteredAds.filter(ad => {
        if (filter === 'active') return ad.isActive;
        if (filter === 'inactive') return !ad.isActive;
        return true;
      });
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredAds = filteredAds.filter(ad => 
        (ad.title && ad.title.toLowerCase().includes(term)) ||
        (ad.description && ad.description.toLowerCase().includes(term))
      );
    }
    
    setVisibleAds(filteredAds);
    setIsLoading(false);
  }, [sponsoredAds, searchTerm, filter]);

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Ads</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="my-4">
        <div className="flex items-center mb-5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search ads..."
              className="pl-12 w-full p-3.5 text-base border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
          
        {/* Filter tabs */}
        <div className="flex overflow-x-auto pb-2 gap-1.5 mb-6 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 text-base font-medium rounded-lg ${filter === 'all' 
              ? 'bg-purple-500 text-white shadow-sm' 
              : 'bg-white text-gray-600 border border-gray-200'} whitespace-nowrap flex-shrink-0`}
          >
            All Ads
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2.5 text-base font-medium rounded-lg ${filter === 'active' 
              ? 'bg-green-500 text-white shadow-sm' 
              : 'bg-white text-gray-600 border border-gray-200'} whitespace-nowrap flex-shrink-0`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-6 py-2.5 text-base font-medium rounded-lg ${filter === 'inactive' 
              ? 'bg-gray-500 text-white shadow-sm' 
              : 'bg-white text-gray-600 border border-gray-200'} whitespace-nowrap flex-shrink-0`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Ads List */}
      <div className="space-y-4 mt-2">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : visibleAds.length > 0 ? (
          visibleAds.map((ad) => (
            <div key={ad.id} className="mb-4">
              {/* Updated Ad Card Design to Match ActiveSponsoredAds */}
              <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                {/* Ad Image */}
                <div className="relative w-full h-28">
                  <img 
                    src={ad.imagePreview || ad.image} 
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Views Badge - Extremely compact like in offer management */}
                  <div className="absolute top-2 left-2">
                    <div className="px-1 py-0.25 text-[9px] font-medium rounded-md bg-white border border-gray-100 shadow-sm flex items-center">
                      <Eye size={10} className="mr-1 text-purple-500" />
                      <span className="text-gray-700" style={{ lineHeight: '1.2' }}>
                        {ad.views?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Badge - Extremely compact like in offer management */}
                  <div className="absolute top-2 right-2">
                    <div className={`px-1 py-0.25 text-[9px] font-medium rounded-md ${
                      ad.isActive 
                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-500 border border-emerald-100' 
                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                      } whitespace-nowrap shadow-sm`} style={{ lineHeight: '1.2' }}>
                      {ad.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
                
                {/* Ad Content */}
                <div className="p-4">
                  {/* Title with Ad Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-800">{ad.title}</h3>
                    <div className="bg-purple-100 text-purple-700 px-2 py-0.5 text-[10px] rounded-md">
                      Ad
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4">{ad.description}</p>
                  
                  {/* Valid Till Date */}
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-orange-400" />
                    <span className="text-gray-700 text-sm font-medium">Valid: Undefined - {formatDate(ad.validTill)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Megaphone size={24} className="text-purple-500" />
            </div>
            <p className="text-gray-700 font-medium">No matching ads found</p>
            <p className="text-gray-500 text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first ad to increase visibility'}
            </p>
            {!searchTerm && filter === 'all' && (
              <button 
                onClick={() => navigate('/ad-type-selection')} 
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Create Ad
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Removed floating action button */}
    </div>
  );
};

export default MyAdsPage;