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
    '/create-account'
  ];
  
  const hideNavigation = hideNavigationPaths.includes(location.pathname);
  const hidePlusButton = location.pathname === '/create-offer' || location.pathname === '/draft-offers' || location.pathname === '/preview-offer';

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto pb-16 bg-white">
      <main className={`flex-1 ${!hideNavigation ? 'pb-16' : ''}`}>
        <Outlet />
      </main>
      {!hideNavigation && <BottomNavigation hidePlusButton={hidePlusButton} />}
    </div>
  );
};

export default Layout;