import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { AddonCartProvider } from './context/AddonCartContext';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteSettingsProvider>
        <CustomerAuthProvider>
          <AddonCartProvider>
            <AppRoutes />
          </AddonCartProvider>
        </CustomerAuthProvider>
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}
