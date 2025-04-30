import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, QrCode, User, Plus } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto">
      <nav className="flex items-center justify-between bg-white border-t border-gray-200 px-4 h-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/my-ads"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-xs mt-1">My Ads</span>
        </NavLink>

        <div className="relative -top-5">
          <button
            onClick={() => navigate('/create-ad')}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-800 text-white shadow-lg hover:bg-blue-900 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <NavLink
          to="/scan-qr"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <QrCode size={20} />
          <span className="text-xs mt-1">Scan QR</span>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <User size={20} />
          <span className="text-xs mt-1">Account</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;