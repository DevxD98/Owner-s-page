import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto pb-16 bg-white">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;