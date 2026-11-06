import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND } from '../utils/brandConstants';

const AddonCartContext = createContext(null);
const STORAGE_KEY = 'digibuddy_addon_cart';

export function AddonCartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (addon) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => (item._id && item._id === addon._id) || item.slug === addon.slug);
      if (exists) return prev;
      return [...prev, addon];
    });
  };

  const removeFromCart = (addonIdOrSlug) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== addonIdOrSlug && item.slug !== addonIdOrSlug)
    );
  };

  const toggleCartItem = (addon) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => (item._id && item._id === addon._id) || item.slug === addon.slug);
      if (exists) {
        return prev.filter((item) => (item._id ? item._id !== addon._id : item.slug !== addon.slug));
      } else {
        return [...prev, addon];
      }
    });
  };

  const isInCart = (addonIdOrSlug) => {
    return cartItems.some(
      (item) => (item._id && item._id === addonIdOrSlug) || item.slug === addonIdOrSlug
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Compose formatted WhatsApp enquiry message
  const getWhatsAppUrl = () => {
    if (cartItems.length === 0) {
      return BRAND.whatsappUrl;
    }

    const itemsList = cartItems
      .map((item, index) => `${index + 1}. *${item.title}* (${item.priceDisplay || 'Custom Quote'})`)
      .join('\n');

    const pkgText = selectedPackage ? `\n\n*Combined with Package:* ${selectedPackage}` : '';

    const message = `Hello DigiBuddy4U Team!\n\nI am interested in customizing my service plan with the following *Add-Ons / Extra Services*:\n\n${itemsList}${pkgText}\n\nPlease share the detailed quotation, timeline, and deliverables for these services.`;

    const cleanPhone = BRAND.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AddonCartContext.Provider
      value={{
        cartItems,
        totalCount: cartItems.length,
        addToCart,
        removeFromCart,
        toggleCartItem,
        isInCart,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        selectedPackage,
        setSelectedPackage,
        getWhatsAppUrl,
      }}
    >
      {children}
    </AddonCartContext.Provider>
  );
}

export function useAddonCart() {
  const context = useContext(AddonCartContext);
  if (!context) {
    throw new Error('useAddonCart must be used within an AddonCartProvider');
  }
  return context;
}
