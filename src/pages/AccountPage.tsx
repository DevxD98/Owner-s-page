import React from 'react';
import { ArrowLeft, Store, Settings, CreditCard, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Store size={20} />, label: 'Store Information', onClick: () => {} },
    { icon: <Settings size={20} />, label: 'Account Settings', onClick: () => {} },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', onClick: () => {} },
    { icon: <FileText size={20} />, label: 'Terms & Conditions', onClick: () => {} },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Account</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-800 font-bold text-xl">SM</span>
          </div>
          <div>
            <h2 className="font-medium">Sample Merchant</h2>
            <p className="text-gray-500 text-sm">merchant@example.com</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <span className="text-gray-600 mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <button className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 text-red-500 mt-6">
          <LogOut size={20} className="mr-3" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPage;