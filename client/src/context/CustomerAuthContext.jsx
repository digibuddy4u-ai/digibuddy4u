import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_URL } from '../utils/api';

const CustomerAuthContext = createContext(null);

const STORAGE_KEY_TOKEN = 'digibuddy_customer_token';
const STORAGE_KEY_CUSTOMER = 'digibuddy_customer_user';
const STORAGE_KEY_VISITOR = 'digibuddy_visitor_id';

// Generate or retrieve persistent anonymous visitor ID
function getOrCreateVisitorId() {
  let vId = localStorage.getItem(STORAGE_KEY_VISITOR);
  if (!vId) {
    vId = 'vis_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEY_VISITOR, vId);
  }
  return vId;
}

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY_TOKEN) || null);
  const [loading, setLoading] = useState(true);
  const [visitorId] = useState(getOrCreateVisitorId());

  // Global Auth Modal State for login-gating
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTargetSlug, setAuthModalTargetSlug] = useState(null);
  const [authModalReason, setAuthModalReason] = useState('');
  const [authModalAutoClose, setAuthModalAutoClose] = useState(null);

  // Fetch current customer profile if token exists
  const fetchProfile = useCallback(async (authToken) => {
    try {
      const res = await fetch(`${API_URL}/customer/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCustomer(data.data);
        localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(data.data));
      } else {
        // Token invalid or expired
        logout();
      }
    } catch (err) {
      console.warn('Failed to fetch customer profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchProfile]);

  // Timed Login Popup: Show login modal after 60 seconds on site if unauthenticated
  useEffect(() => {
    if (token || customer) return;

    // Check if already triggered in this browser session
    const hasPrompted = sessionStorage.getItem('digibuddy_timed_login_prompt');
    if (hasPrompted) return;

    const timer = setTimeout(() => {
      const currentToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (!currentToken) {
        sessionStorage.setItem('digibuddy_timed_login_prompt', 'true');
        promptLogin(
          null,
          'You have been exploring DigiBuddy4U for 1 minute! Create a free account or log in to unlock our full package specifications, custom proposals, and downloadable PDFs.',
          5 // Auto-close in 5s if user does not interact
        );
      }
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, [token, customer]);

  // Telemetry Event Tracker
  const trackEvent = useCallback(
    async (eventType, packageData = {}, metadata = {}) => {
      try {
        const payload = {
          eventType,
          packageId: packageData._id || packageData.id || null,
          packageSlug: packageData.slug || '',
          packageName: packageData.name || '',
          visitorId,
          referrer: document.referrer || '',
          landingPage: window.location.href,
          device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
          metadata,
        };

        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        await fetch(`${API_URL}/tracking/event`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Silently catch tracking errors so UX is never disrupted
      }
    },
    [token, visitorId]
  );

  // Login
  const login = async (email, password, targetPackageSlug = null) => {
    const res = await fetch(`${API_URL}/customer/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, visitorId, targetPackageSlug }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed.');
    }

    setToken(data.token);
    setCustomer(data.data);
    localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
    localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(data.data));
    return data;
  };

  // Register
  const register = async (userData, targetPackageSlug = null) => {
    const res = await fetch(`${API_URL}/customer/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, visitorId, targetPackageSlug }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed.');
    }

    setToken(data.token);
    setCustomer(data.data);
    localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
    localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(data.data));
    return data;
  };

  // Logout
  const logout = () => {
    setToken(null);
    setCustomer(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_CUSTOMER);
  };

  // Toggle Shortlist Save / Unsave
  const toggleSavePackage = async (packageSlug) => {
    if (!token) {
      promptLogin(packageSlug, 'Please log in to save packages to your shortlist.');
      return false;
    }

    try {
      const res = await fetch(`${API_URL}/customer/save-package/${packageSlug}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        // Refresh profile data
        fetchProfile(token);
        return data.isSaved;
      }
    } catch (err) {
      console.error('Error toggling package save:', err);
    }
    return false;
  };

  // Helper to open login gate modal
  const promptLogin = (
    targetSlug = null,
    reason = 'Account required to view complete package specifications and download individual PDFs.',
    autoClose = null
  ) => {
    setAuthModalTargetSlug(targetSlug);
    setAuthModalReason(reason);
    setAuthModalAutoClose(autoClose);
    setAuthModalOpen(true);
    trackEvent('login_prompt_shown', { slug: targetSlug }, { reason, autoClose });
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthModalAutoClose(null);
  };

  const isPackageSaved = (packageIdOrSlug) => {
    if (!customer || !Array.isArray(customer.savedPackages)) return false;
    return customer.savedPackages.some(
      (p) => (p._id === packageIdOrSlug || p.slug === packageIdOrSlug || p === packageIdOrSlug)
    );
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated: !!customer,
        loading,
        visitorId,
        login,
        register,
        logout,
        fetchProfile: () => fetchProfile(token),
        toggleSavePackage,
        isPackageSaved,
        trackEvent,
        promptLogin,
        authModalOpen,
        authModalTargetSlug,
        authModalReason,
        authModalAutoClose,
        closeAuthModal,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
