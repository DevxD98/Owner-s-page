import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { loadAccountInfo } from '../utils/localStorageHelper.js';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import MyAdsPage from '../pages/MyAdsPage';
import CreateAdPage from '../pages/CreateAdPage';
import CreateOfferPage from '../pages/CreateOfferPage';
import ScanQRPage from '../pages/ScanQRPage';
import AccountPage from '../pages/AccountPage';
import OfferManagementPage from '../pages/OfferManagementPage';
import BookingStatusPage from '../pages/BookingStatusPage';
import RedemptionTrackerPage from '../pages/RedemptionTrackerPage';
import StorePage from '../pages/StorePage';
import CreateAccountPage from '../pages/CreateAccountPage';
import StoreInformationPage from '../pages/StoreInformationPage';
import LocationBranchPage from '../pages/LocationBranchPage';
import DraftOffersPage from '../pages/DraftOffersPage';
import PreviewOfferPage from '../pages/PreviewOfferPage';
import BoostOfferPage from '../pages/BoostOfferPage';
import SponsoredAdsPage from '../pages/SponsoredAdsPage';
import AdTypeSelectionPage from '../pages/AdTypeSelectionPage';
import HelpPage from '../pages/HelpPage';
import VerificationPage from '../pages/VerificationPage';
import WalletPage from '../pages/WalletPage';
import OfferDebugger from '../components/debug/OfferDebugger';


const AppRoutes = () => {
  const { storeName } = useApp();
  // Only redirect to create-account if storeName is not set
  // Use local storage to prevent infinite loop during navigation
  const accountInfo = loadAccountInfo() || {};
  const isAccountSetUp = !!storeName || !!(accountInfo && accountInfo.hasAccount);
  
  return (
    <Routes>
      {/* Verification page is standalone outside the Layout */}
      <Route path="verification" element={<VerificationPage />} />
      
      {/* All other routes are inside the Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={isAccountSetUp ? <HomePage /> : <Navigate to="/create-account" replace />} />
        <Route path="my-ads" element={<MyAdsPage />} />
        <Route path="create-ad" element={<CreateAdPage />} />
        <Route path="create-offer" element={<CreateOfferPage />} />
        <Route path="preview-offer" element={<PreviewOfferPage />} />
        <Route path="boost-offer" element={<BoostOfferPage />} />
        <Route path="sponsored-ads" element={<SponsoredAdsPage />} />
        <Route path="ad-type-selection" element={<AdTypeSelectionPage />} />
        <Route path="draft-offers" element={<DraftOffersPage />} />
        <Route path="scan-qr" element={<ScanQRPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="offer-management" element={<OfferManagementPage />} />
        <Route path="booking-status" element={<BookingStatusPage />} />
        <Route path="redemption-tracker" element={<RedemptionTrackerPage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="create-account" element={<CreateAccountPage />} />
        <Route path="store-information" element={<StoreInformationPage />} />
        <Route path="location-branch" element={<LocationBranchPage />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="switch-account" element={<Navigate to="/" replace />} />
        <Route path="debug-offers" element={<OfferDebugger />} />
        <Route path="timing-availability" element={<Navigate to="/" replace />} />

        <Route path="settings" element={<Navigate to="/" replace />} />
        <Route path="help-support" element={<HelpPage />} />
        <Route path="about-app" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;