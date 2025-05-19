import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles, Clock, Gift, FileText, PlusCircle, BarChart3, QrCode, Settings, HelpCircle, Star } from 'lucide-react';
import DemoCard from '../components/demos/DemoCard';
import FeatureDemo from '../components/demos/FeatureDemo';
import AnimatedTooltip from '../components/demos/AnimatedTooltip';

const HelpPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [animationDirection, setAnimationDirection] = useState('right');
  // No tour guide functionality is needed
  
  // Handle section change with animation direction
  const handleSectionChange = (sectionId) => {
    // Determine animation direction based on current vs new section
    const sections = helpSections.map(s => s.id);
    const currentIndex = sections.indexOf(activeSection);
    const newIndex = sections.indexOf(sectionId);
    
    setAnimationDirection(newIndex > currentIndex ? 'right' : 'left');
    setActiveSection(sectionId);
  };
  
  // No tour steps needed

  const helpSections = [
    { id: 'overview', title: 'App Overview', icon: <HelpCircle size={20} className="text-blue-600" /> },
    { id: 'offers', title: 'Creating Offers', icon: <Sparkles size={20} className="text-purple-600" /> },
    { id: 'ads', title: 'Managing Ads', icon: <PlusCircle size={20} className="text-green-600" /> },
    { id: 'qr', title: 'QR Code Scanning', icon: <QrCode size={20} className="text-amber-600" /> },
    { id: 'analytics', title: 'Viewing Analytics', icon: <BarChart3 size={20} className="text-pink-600" /> },
  ];

  const renderContent = () => {
    // Apply different animation class based on direction
    const animationClass = animationDirection === 'right' 
      ? 'animate-slideFromRight' 
      : 'animate-slideFromLeft';
    
    switch (activeSection) {
      case 'overview':
        return (
          <div className={animationClass}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Owner's Page!</h2>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-6 overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white animate-pulse-subtle" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Grow Your Business</h3>
                <p className="text-center text-gray-600 text-sm">
                  Create offers, manage promotions, and track performance
                </p>
              </div>
              
              {/* Interactive decoration elements */}
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Gift size={18} className="text-purple-600" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock size={18} className="text-amber-600" />
                </div>
              </div>
              
              {/* Animated decoration */}
              <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 animate-pulse-slow"></div>
              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse-slow"></div>
              
              {/* Shine effect overlay */}
              <div className="absolute inset-0 shine-effect pointer-events-none"></div>
            </div>
            <p className="mb-4 text-gray-700">
              Owner's Page is your all-in-one solution for managing your business. Create stunning offers, run marketing campaigns, 
              track customer engagement, and grow your business - all from one simple dashboard.
            </p>
            <DemoCard title="Getting Started" theme="blue">
              <p className="text-blue-700">
                Explore the features by tapping on the different sections in this help page, or jump right into 
                the app using the navigation menu at the bottom of your screen.
              </p>
            </DemoCard>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              {helpSections.slice(1).map(section => (
                <button 
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 mb-2">
                    {section.icon}
                  </div>
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'offers':
        return (
          <div className={animationClass}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Creating Exciting Offers</h2>
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-5 rounded-xl mb-6">
              <h3 className="font-semibold text-indigo-800 mb-2">Three Types of Offers</h3>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white/80 p-3 rounded-lg text-center">
                  <Sparkles size={24} className="mx-auto text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Spotlight</span>
                </div>
                <div className="bg-white/80 p-3 rounded-lg text-center">
                  <Clock size={24} className="mx-auto text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Happy Hours</span>
                </div>
                <div className="bg-white/80 p-3 rounded-lg text-center">
                  <Gift size={24} className="mx-auto text-pink-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Spin to Win</span>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-2">How to Create an Offer</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <p className="text-sm text-gray-700">Tap on the "+ Create" button from the home screen or offers tab</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <p className="text-sm text-gray-700">Select the type of offer you want to create</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <p className="text-sm text-gray-700">Fill in the details, set validity dates and redemption limits</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">4</span>
                </div>
                <p className="text-sm text-gray-700">Preview your offer and publish it or save as draft</p>
              </div>
            </div>

            <DemoCard title="Pro Tip" theme="amber">
              <p className="text-amber-700">
                Creating time-limited "Happy Hours" offers can drive traffic during your slow business hours!
              </p>
            </DemoCard>

            <button 
              onClick={() => navigate('/create-offer')}
              className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
            >
              Try Creating an Offer
            </button>
          </div>
        );
      case 'ads':
        return (
          <div className={animationClass}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Managing Your Ads</h2>
            <div className="aspect-video bg-gradient-to-br from-green-100 to-teal-100 rounded-xl mb-6 overflow-hidden relative">
              {/* Ad Mockup */}
              <div className="absolute inset-4 bg-white/90 rounded-lg shadow-md flex flex-col">
                <div className="h-20 bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-white/80 font-medium px-2 py-0.5 bg-white/20 rounded-full">Sponsored</span>
                      <h3 className="text-white font-semibold mt-1">50% OFF on Selected Items</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <PlusCircle size={16} className="text-teal-600" />
                    </div>
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-gray-500">Limited time promotion at your favorite store!</p>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Star size={12} className="text-green-600" />
                      </div>
                      <span className="text-xs text-gray-500 ml-1">4.9</span>
                    </div>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Interactive elements */}
              <div className="absolute bottom-2 right-2 p-1 bg-white/80 rounded-lg flex space-x-1">
                <AnimatedTooltip 
                  content="Active campaign" 
                  position="top"
                  theme="success"
                  autoShow={true} 
                  delay={1500}
                >
                  <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                </AnimatedTooltip>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-green-200/30 animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-teal-200/30 animate-pulse-slow"></div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">Boosting Your Visibility</h3>
            <p className="mb-4 text-gray-700">
              Sponsored ads help your business stand out in search results and recommendations. Create eye-catching 
              ads to attract new customers and remind existing ones about your products and services.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-1">Creating Effective Ads</h4>
                <p className="text-sm text-gray-600">
                  Use high-quality images, clear messaging, and compelling offers to make your ads perform better.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-1">Tracking Performance</h4>
                <p className="text-sm text-gray-600">
                  Monitor views, clicks, and conversions to optimize your ad campaigns over time.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-1">Budget Management</h4>
                <p className="text-sm text-gray-600">
                  Set daily or campaign budgets to control your spending and maximize ROI.
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/create-ad')}
              className="w-full py-3 mt-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-teal-700 transition-all shadow-sm"
            >
              Try Creating an Ad
            </button>
          </div>
        );
      case 'qr':
        return (
          <div className={animationClass}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">QR Code Scanning</h2>
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl mb-6 overflow-hidden relative">
              {/* Interactive QR Scanner Mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* QR Code Frame */}
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    {/* Scanning animation */}
                    <div className="absolute left-0 right-0 h-0.5 bg-amber-500 top-1/2 animate-pulse"></div>
                    
                    {/* Corner markers */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>
                    
                    {/* QR Code placeholder */}
                    <div className="absolute inset-8 bg-white/80 rounded-sm flex items-center justify-center">
                      <div className="grid grid-cols-4 grid-rows-4 gap-1">
                        {[...Array(16)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-amber-900/70' : 'bg-transparent'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                    <div className="px-3 py-1 bg-white rounded-full shadow-md flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs font-medium text-gray-700">Ready to scan</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-orange-200/30 animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-amber-200/30 animate-pulse-slow"></div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">Verifying Customers Easily</h3>
            <p className="mb-4 text-gray-700">
              The QR code scanner makes it easy to validate customer offers and track redemptions in real-time. 
              No more paper vouchers or complicated validation processes!
            </p>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
              <div className="bg-amber-50 p-3 border-b border-amber-100">
                <h4 className="font-medium text-amber-800">How QR Scanning Works</h4>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm text-gray-700">Customer shows their offer QR code on their device</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm text-gray-700">You scan it using the QR scanner in the app</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm text-gray-700">The app verifies the offer is valid and not expired</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">4</span>
                    </div>
                    <p className="text-sm text-gray-700">Redemption is recorded and analytics updated instantly</p>
                  </div>
                </div>
              </div>
            </div>

            <DemoCard title="Pro Tip" theme="blue">
              <p className="text-blue-700">
                Keep your phone's camera clean for better QR code scanning performance!
              </p>
            </DemoCard>

            <button 
              onClick={() => navigate('/scan-qr')}
              className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-sm"
            >
              Try QR Scanner
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className={animationClass}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Understanding Your Analytics</h2>
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-red-100 rounded-xl mb-6 overflow-hidden relative">
              {/* Analytics Dashboard Mockup */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/90 rounded-xl shadow-md p-3 w-full h-full flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-800">Performance Overview</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Last 7 days</span>
                      <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                  
                  {/* Chart mockup */}
                  <div className="flex-1 relative mb-2">
                    {/* Chart bars */}
                    <div className="absolute bottom-0 inset-x-0 flex justify-between items-end h-full px-1">
                      {[65, 40, 85, 55, 70, 45, 90].map((height, i) => (
                        <div key={i} className="w-4 bg-gradient-to-t from-pink-500 to-rose-400 rounded-t-sm animate-pulse-subtle" style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                    
                    {/* Chart horizontal lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                      <div className="border-b border-gray-300 w-full h-0"></div>
                      <div className="border-b border-gray-300 w-full h-0"></div>
                      <div className="border-b border-gray-300 w-full h-0"></div>
                      <div className="border-b border-gray-300 w-full h-0"></div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-pink-50 p-2 rounded-lg">
                      <div className="text-xs text-pink-700 font-medium">Views</div>
                      <div className="text-sm font-bold text-gray-800">12.8k</div>
                    </div>
                    <div className="bg-rose-50 p-2 rounded-lg">
                      <div className="text-xs text-rose-700 font-medium">Clicks</div>
                      <div className="text-sm font-bold text-gray-800">3.4k</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <div className="text-xs text-purple-700 font-medium">Converts</div>
                      <div className="text-sm font-bold text-gray-800">643</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-pink-200/30 animate-pulse-slow"></div>
              <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-rose-200/30 animate-pulse-slow"></div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">Making Data-Driven Decisions</h3>
            <p className="mb-4 text-gray-700">
              Your dashboard provides valuable insights into customer behavior, offer performance, and business trends.
              Use this data to optimize your marketing strategy and grow your business.
            </p>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-5">
              <h4 className="font-medium text-gray-800 mb-3">Key Metrics You Can Track</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium text-sm">Offer Views</span>
                  </div>
                  <p className="text-xs text-gray-600">How many people saw your offers</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium text-sm">Redemptions</span>
                  </div>
                  <p className="text-xs text-gray-600">How many offers were claimed</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="font-medium text-sm">Conversion</span>
                  </div>
                  <p className="text-xs text-gray-600">Percentage of views that converted</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="font-medium text-sm">Peak Times</span>
                  </div>
                  <p className="text-xs text-gray-600">When your offers perform best</p>
                </div>
              </div>
            </div>

            <DemoCard title="Pro Tip" theme="pink">
              <p className="text-pink-700">
                Check your analytics weekly to identify trends and adjust your marketing strategy accordingly!
              </p>
            </DemoCard>

            <button 
              onClick={() => navigate('/')}
              className="w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all shadow-sm"
            >
              View Your Dashboard
            </button>
          </div>
        );
      default:
        return <div>Select a section to learn more</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col"
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
      
      {/* Header */}
      <div className="flex items-center p-4 relative z-10 shadow-sm bg-white bg-opacity-90">
        <button onClick={() => navigate(-1)} className="mr-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">How It Works</h1>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm overflow-x-auto z-10">
        <div className="flex p-1 min-w-max">            {helpSections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`px-4 py-2.5 rounded-lg flex items-center whitespace-nowrap transition-all mx-1
                ${activeSection === section.id 
                  ? 'bg-gray-100 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="mr-1.5">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 bg-gray-50 p-4 pt-6 max-w-md mx-auto w-full overflow-y-auto relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default HelpPage;
