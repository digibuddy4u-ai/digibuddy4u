import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Pages
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import PortfolioPage from '../pages/PortfolioPage';
import CaseStudiesPage from '../pages/CaseStudiesPage';
import PackagesPage from '../pages/PackagesPage';
import PackageDetailPage from '../pages/PackageDetailPage';
import CustomerDashboardPage from '../pages/CustomerDashboardPage';
import CustomerLoginPage from '../pages/CustomerLoginPage';
import CustomerRegisterPage from '../pages/CustomerRegisterPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="packages/:slug" element={<PackageDetailPage />} />
          <Route path="pricing" element={<PackagesPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="customer/dashboard" element={<CustomerDashboardPage />} />
          <Route path="login" element={<CustomerLoginPage />} />
          <Route path="register" element={<CustomerRegisterPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
