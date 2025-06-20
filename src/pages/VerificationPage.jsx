import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateVerificationStatus } from '../utils/localStorageHelper';
import { Upload, X, Info, CheckCircle } from 'lucide-react';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessRegNumber: '',
    gstNumber: '',
    panNumber: '',
    idProof: '',
    idProofFile: null,
    bankProof: '',
    bankProofFile: null,
    businessAddress: '',
    utilityBill: '',
    utilityBillFile: null,
    shopPhoto: null,
    businessLogo: null,
    fssaiNumber: '',
    fssaiFile: null,
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(files[0]),
        [`${name}File`]: files[0]
      });
    }
  };
  
  const validate = () => {
    // In a real app we would do validation, but for this purpose we'll skip it
    return {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Skip validation since fields are optional for the demo
    // In a real application, you would validate and send this data to the backend
    
    // Update the verification status in local storage
    updateVerificationStatus(true);
    
    // Navigate to home page after clicking verify & continue
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b from-blue-50 to-white min-h-screen p-4 pb-20">
      <div className="w-full max-w-md mx-auto my-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-3 text-gray-800 tracking-tight">Business Verification</h1>
          <p className="text-gray-600">Complete your account setup</p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-4 text-left">
            <div className="flex">
              <Info size={20} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-blue-800 text-sm">
                Please provide the required documents for verification. All information will be kept private and secure.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <CheckCircle size={20} className="text-green-600 mr-2" />
          Essential Documents for Shop Verification
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name */}
          <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 ${errors.businessName ? 'focus:ring-red-300 border-red-200' : 'focus:ring-blue-300 border border-gray-100'}`}
              placeholder="Business Name"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            {errors.businessName && <p className="text-red-500 text-sm mt-1 px-2">{errors.businessName}</p>}
          </div>
          
          {/* Business Registration Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">1. Shop/Business Registration Certificate</label>
            <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <input
                type="text"
                id="businessRegNumber"
                name="businessRegNumber"
                value={formData.businessRegNumber}
                onChange={handleChange}
                className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100`}
                placeholder="Registration Number"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Issued by local municipal authorities. Validates legal existence.</p>
          </div>
          
          {/* GST Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">2. GST Registration Certificate (if applicable)</label>
            <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100`}
                placeholder="GST Number"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Required if annual turnover exceeds the GST threshold.</p>
          </div>
          
          {/* PAN Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">3. PAN Card of Business Owner</label>
            <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100`}
                placeholder="PAN Number"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">For identity verification and financial tracking.</p>
          </div>
          
          {/* ID Proof Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">4. Identity Proof (Aadhar/Voter ID/Driving License)</label>
            <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {!formData.idProof ? (
                <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload ID proof</span>
                  <input 
                    type="file" 
                    name="idProof" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf"
                  />
                </label>
              ) : (
                <div className="p-3 relative">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                      <CheckCircle size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium">ID Proof uploaded</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, idProof: null, idProofFile: null})}
                      className="ml-auto bg-gray-200 p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">For address and identity proof of the owner.</p>
          </div>
          
          {/* Bank Account Proof Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">5. Bank Account Proof (Cancelled Cheque/Passbook)</label>
            <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {!formData.bankProof ? (
                <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload bank proof</span>
                  <input 
                    type="file" 
                    name="bankProof" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf"
                  />
                </label>
              ) : (
                <div className="p-3 relative">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                      <CheckCircle size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium">Bank Proof uploaded</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, bankProof: null, bankProofFile: null})}
                      className="ml-auto bg-gray-200 p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">For verification of banking details and financial information.</p>
          </div>
          
          {/* Business Address & Utility Bill/Rent Agreement */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">6. Utility Bill or Rent Agreement</label>
            <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-2">
              <input
                type="text"
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100`}
                placeholder="Business Address"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
            <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {!formData.utilityBill ? (
                <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload utility bill/rent agreement</span>
                  <input 
                    type="file" 
                    name="utilityBill" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf"
                  />
                </label>
              ) : (
                <div className="p-3 relative">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                      <CheckCircle size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium">Utility Bill uploaded</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, utilityBill: null, utilityBillFile: null})}
                      className="ml-auto bg-gray-200 p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">For verification of business location and address proof.</p>
          </div>
          
          {/* Shop Photo / Business Logo Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">7. Business Logo / Shop Front Photo</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Shop Front Photo Upload */}
              <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                {!formData.shopPhoto ? (
                  <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                    <Upload size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Shop Front Photo</span>
                    <input 
                      type="file" 
                      name="shopPhoto" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept="image/*"
                    />
                  </label>
                ) : (
                  <div className="p-3 relative">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-600 p-1 rounded-lg">
                        <CheckCircle size={16} />
                      </div>
                      <span className="ml-1 text-xs font-medium">Photo added</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, shopPhoto: null})}
                        className="ml-auto bg-gray-200 p-1 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Business Logo Upload */}
              <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                {!formData.businessLogo ? (
                  <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                    <Upload size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center">Business Logo</span>
                    <input 
                      type="file" 
                      name="businessLogo" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept="image/*"
                    />
                  </label>
                ) : (
                  <div className="p-3 relative">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-600 p-1 rounded-lg">
                        <CheckCircle size={16} />
                      </div>
                      <span className="ml-1 text-xs font-medium">Logo added</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, businessLogo: null})}
                        className="ml-auto bg-gray-200 p-1 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">For business branding and location verification.</p>
          </div>
          
          {/* FSSAI License (for food businesses) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1 ml-1">8. FSSAI License (For Food Businesses)</label>
            <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-2">
              <input
                type="text"
                id="fssaiNumber"
                name="fssaiNumber"
                value={formData.fssaiNumber}
                onChange={handleChange}
                className={`w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100`}
                placeholder="FSSAI License Number"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            <div className="relative bg-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {!formData.fssaiFile ? (
                <label className="flex flex-col items-center justify-center p-4 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload FSSAI License</span>
                  <input 
                    type="file" 
                    name="fssaiFile" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf"
                  />
                </label>
              ) : (
                <div className="p-3 relative">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                      <CheckCircle size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium">FSSAI License uploaded</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, fssaiFile: null})}
                      className="ml-auto bg-gray-200 p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Mandatory for all food business operators. Skip if not applicable.</p>
          </div>
          
          {/* Verification Note */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-4">
            <div className="flex">
              <Info size={20} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 text-sm font-medium">Document Verification Note:</p>
                <ul className="text-amber-700 text-xs mt-1 space-y-1">
                  <li>• Verification may take up to 24-48 business hours</li>
                  <li>• All fields above are optional for now, but will be required for final approval</li>
                  <li>• You can start using the platform with limited features while verification is in progress</li>
                  <li>• For faster verification, ensure documents are clearly visible and valid</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg mt-4"
            >
              <span>Verify & Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              By submitting, you agree to our verification process and terms of service
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
