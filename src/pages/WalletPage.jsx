import React from 'react';
import { ArrowLeft, Plus, Wallet, CreditCard, Clock, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WalletPage = () => {
  const navigate = useNavigate();

  // Example transaction data
  const transactions = [
    {
      id: 'tx-1',
      type: 'Sponsored Ad',
      amount: -2500,
      date: '2025-06-15T10:30:00',
      status: 'Completed'
    },
    {
      id: 'tx-2',
      type: 'Added Funds',
      amount: 5000,
      date: '2025-06-10T14:22:00',
      status: 'Completed'
    },
    {
      id: 'tx-3',
      type: 'Offer Boost',
      amount: -1200,
      date: '2025-06-05T09:15:00',
      status: 'Completed'
    }
  ];

  // Format date to show in readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate('/account')} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Wallet</h1>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-80">Available Balance</p>
            <Wallet size={20} />
          </div>
          <h2 className="text-3xl font-bold mb-6">₹11,300.00</h2>
          <div className="flex space-x-3">
            <button className="flex-1 bg-white bg-opacity-20 py-2.5 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition">
              <Plus size={16} className="mr-2" />
              Add Money
            </button>
            <button className="flex-1 bg-white bg-opacity-20 py-2.5 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition">
              <Download size={16} className="mr-2" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between p-2 border-b border-gray-100 pb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                <CreditCard size={20} className="text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium">Credit/Debit Cards</h4>
                <p className="text-xs text-gray-500">2 cards connected</p>
              </div>
            </div>
            <button className="text-blue-700 font-medium text-sm">Manage</button>
          </div>

          <div className="flex items-center justify-between p-2 pt-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Add Payment Method</h4>
                <p className="text-xs text-gray-500">Connect UPI, bank account, etc.</p>
              </div>
            </div>
            <button className="text-purple-700 font-medium text-sm">Add</button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border-b border-gray-100 flex items-center">
              <div className={`w-10 h-10 rounded-lg ${transaction.amount > 0 ? 'bg-green-100' : 'bg-orange-100'} flex items-center justify-center mr-3`}>
                {transaction.amount > 0 ? (
                  <Plus size={20} className="text-green-700" />
                ) : (
                  <FileText size={20} className="text-orange-700" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{transaction.type}</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" /> 
                  {formatDate(transaction.date)}
                </div>
              </div>
              <div className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                <p className="font-bold">{transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                <p className="text-xs text-gray-500">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-3 py-3 border border-gray-300 rounded-lg text-blue-700 font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default WalletPage;
