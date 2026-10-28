import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BRAND } from '../utils/brandConstants';
import { api, API_URL } from '../utils/api';

const SiteSettingsContext = createContext({
  settings: BRAND,
  loading: false,
  refreshSettings: () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    businessName: BRAND.name,
    tagline: BRAND.tagline,
    email: BRAND.email,
    phone: BRAND.phone,
    whatsappNumber: BRAND.phone,
    whatsappUrl: BRAND.whatsappUrl,
    address: BRAND.address,
    socials: BRAND.socials,
    footerBio:
      'DigiBuddy4U is your dedicated digital growth partner. We empower modern brands through data-backed social media management, scroll-stopping content creation, viral-ready video reels, and ROI-focused digital marketing.',
  });
  const [loading, setLoading] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      const data = await res.json();
      if (data.success && data.data) {
        setSettings((prev) => ({
          ...prev,
          businessName: data.data.businessName || prev.businessName,
          tagline: data.data.tagline || prev.tagline,
          email: data.data.email || prev.email,
          phone: data.data.phone || prev.phone,
          whatsappNumber: data.data.whatsappNumber || prev.whatsappNumber,
          whatsappUrl: data.data.whatsappUrl || prev.whatsappUrl,
          address: data.data.address || prev.address,
          footerBio: data.data.footerBio || prev.footerBio,
          socials: {
            ...prev.socials,
            ...(data.data.socials || {}),
          },
          servicesSettings: data.data.servicesSettings || prev.servicesSettings,
          packagesSettings: data.data.packagesSettings || prev.packagesSettings,
        }));
      }
    } catch {
      // Fallback silently to current settings
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // Auto-sync whenever user focuses / switches to website tab from Admin panel
    const handleFocus = () => {
      fetchSettings();
    };
    window.addEventListener('focus', handleFocus);

    // Periodic refresh every 30 seconds to catch admin changes automatically
    const interval = setInterval(fetchSettings, 30000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [fetchSettings]);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    return {
      settings: BRAND,
      loading: false,
      refreshSettings: () => {},
    };
  }
  return context;
}
