import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, User, Plus } from 'lucide-react';
import QRCodeIcon from '../icons/QRCodeIcon';
import ScannerIcon from '../icons/ScannerIcon';

const BottomNavigation = ({ hidePlusButton = false }) => {
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
          <Home size={25} />
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
          <LayoutDashboard size={25} />
          <span className="text-xs mt-1">Ads</span>
        </NavLink>

        {!hidePlusButton && (
          <div className="relative -top-5">
            <button
              onClick={() => navigate('/create-offer')}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-[#001CD3] text-white shadow-lg hover:bg-[#226EDA] transition-colors"
            >
              <Plus size={27} />
            </button>
          </div>
        )}

        <NavLink
          to="/scan-qr"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <QRCodeIcon size={25} />
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
          <User size={25} />
          <span className="text-xs mt-1">Account</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;