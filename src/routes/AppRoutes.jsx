import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="my-ads" element={<MyAdsPage />} />
        <Route path="create-ad" element={<CreateAdPage />} />
<Route path="create-offer" element={<CreateOfferPage />} />
        <Route path="scan-qr" element={<ScanQRPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="offer-management" element={<OfferManagementPage />} />
        <Route path="booking-status" element={<BookingStatusPage />} />
        <Route path="redemption-tracker" element={<RedemptionTrackerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;