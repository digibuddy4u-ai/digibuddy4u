import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import CustomerAuthModal from '../components/auth/CustomerAuthModal';
import AddonCartDrawer from '../components/addons/AddonCartDrawer';
import IntroSplash from '../components/common/IntroSplash';
import CustomCursor from '../components/common/CustomCursor';
import useScrollToTop from '../hooks/useScrollToTop';

export default function RootLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-white text-content-dark selection:bg-cyan-accent selection:text-navy-950">
      <CustomCursor />
      <IntroSplash />
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton floating={true} />
      <CustomerAuthModal />
      <AddonCartDrawer />
    </div>
  );
}
