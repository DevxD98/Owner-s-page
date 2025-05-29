import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = () => {
  const location = useLocation();
  
  // Pages where bottom navigation should be hidden
  const hideNavigationPaths = [
    '/store',
    '/offer-management',
    '/booking-status',
    '/redemption-tracker',
    '/create-account',
    '/help-support', // Hide navigation on help/demo pages
    '/boost-offer', // Hide navigation on boost offer page
    '/sponsored-ads' // Hide navigation on sponsored ads page
  ];
  
  const hideNavigation = hideNavigationPaths.includes(location.pathname);
  const hidePlusButton = location.pathname === '/create-offer' || location.pathname === '/draft-offers' || location.pathname === '/preview-offer' || location.pathname === '/sponsored-ads';

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      <main className={`flex-1 ${!hideNavigation ? 'pb-20' : 'pb-4'}`}>
        <Outlet />
      </main>
      {!hideNavigation && <BottomNavigation hidePlusButton={hidePlusButton} />}
    </div>
  );
};

export default Layout;