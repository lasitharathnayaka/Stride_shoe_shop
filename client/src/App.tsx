import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import CollectionsPage from '@/pages/CollectionsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import DashboardPage from '@/pages/DashboardPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import ExchangeReturnPage from '@/pages/ExchangeReturnPage';
import WishlistPage from '@/pages/WishlistPage';
import AuthPage from '@/pages/AuthPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import InnovationPage from '@/pages/InnovationPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/exchange" element={<ExchangeReturnPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
        </Route>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </>
  );
}
