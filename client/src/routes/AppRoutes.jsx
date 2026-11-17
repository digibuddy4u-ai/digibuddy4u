import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorBoundary from '../components/common/ErrorBoundary';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Keep landing HomePage eager for fastest initial LCP
import HomePage from '../pages/HomePage';

// Lazy-load secondary routes for smaller initial JS bundle & improved Core Web Vitals
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../pages/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'));
const RotiWalaCaseStudyPage = lazy(() => import('../pages/RotiWalaCaseStudyPage'));
const PackagesPage = lazy(() => import('../pages/PackagesPage'));
const PackageDetailPage = lazy(() => import('../pages/PackageDetailPage'));
const CustomerDashboardPage = lazy(() => import('../pages/CustomerDashboardPage'));
const CustomerLoginPage = lazy(() => import('../pages/CustomerLoginPage'));
const CustomerRegisterPage = lazy(() => import('../pages/CustomerRegisterPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function RouteSuspenseFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface-light">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteSuspenseFallback />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="about-us" element={<Navigate to="/about" replace />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="packages/:slug" element={<PackageDetailPage />} />

            {/* Canonical Redirects to prevent duplicate content indexing */}
            <Route path="pricing" element={<Navigate to="/packages" replace />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="case-studies/rotiwala" element={<RotiWalaCaseStudyPage />} />
            <Route path="case-studies" element={<Navigate to="/case-studies/rotiwala" replace />} />
            <Route path="case-study/rotiwala" element={<Navigate to="/case-studies/rotiwala" replace />} />
            <Route path="case-study" element={<Navigate to="/case-studies/rotiwala" replace />} />

            <Route path="contact" element={<ContactPage />} />
            <Route path="contact-us" element={<Navigate to="/contact" replace />} />
            <Route path="customer/dashboard" element={<CustomerDashboardPage />} />
            <Route path="login" element={<CustomerLoginPage />} />
            <Route path="register" element={<CustomerRegisterPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
