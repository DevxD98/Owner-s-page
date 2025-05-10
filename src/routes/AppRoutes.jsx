import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
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

const AppRoutes = () => {
  const { storeName } = useApp();
  const isNewUser = !storeName;
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={isNewUser ? <Navigate to="/create-account" replace /> : <HomePage />} />
        <Route path="my-ads" element={<MyAdsPage />} />
        <Route path="create-ad" element={<CreateAdPage />} />
        <Route path="create-offer" element={<CreateOfferPage />} />
        <Route path="scan-qr" element={<ScanQRPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="offer-management" element={<OfferManagementPage />} />
        <Route path="booking-status" element={<BookingStatusPage />} />
        <Route path="redemption-tracker" element={<RedemptionTrackerPage />} />
        <Route path="store" element={<StorePage />} />
        <Route path="create-account" element={<CreateAccountPage />} />
        <Route path="store-information" element={<StoreInformationPage />} />
        <Route path="location-branch" element={<LocationBranchPage />} />
        <Route path="switch-account" element={<Navigate to="/" replace />} />
        <Route path="timing-availability" element={<Navigate to="/" replace />} />
        <Route path="settings" element={<Navigate to="/" replace />} />
        <Route path="help-support" element={<Navigate to="/" replace />} />
        <Route path="about-app" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;