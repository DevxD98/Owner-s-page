import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const CreateAdPage = () => {
  const navigate = useNavigate();
  const { addOffer } = useApp();
  const [title, setTitle] = useState('');
  const [validTill, setValidTill] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !validTill) {
      setError('Please fill in all fields');
      return;
    }
    
    addOffer({
      title,
      validTill,
      isActive: true,
    });
    
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Create New Offer</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Offer Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Flat 30% OFF on ₹499+"
          />
        </div>
        
        <div>
          <label htmlFor="validTill" className="block mb-2 text-sm font-medium">
            Valid Till
          </label>
          <input
            type="text"
            id="validTill"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 30 May 2025"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Create Offer
        </button>
      </form>
    </div>
  );
};

export default CreateAdPage;