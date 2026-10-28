import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('digibuddy_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('digibuddy_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.admin) {
          setUser(res.admin);
          localStorage.setItem('digibuddy_admin_user', JSON.stringify(res.admin));
        }
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem('digibuddy_admin_token');
        localStorage.removeItem('digibuddy_admin_user');
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.admin);
      localStorage.setItem('digibuddy_admin_token', res.token);
      localStorage.setItem('digibuddy_admin_user', JSON.stringify(res.admin));
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Continue client cleanup even if network fails
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('digibuddy_admin_token');
    localStorage.removeItem('digibuddy_admin_user');
  };

  const updateUser = (updated) => {
    setUser((prev) => {
      const val = { ...prev, ...updated };
      localStorage.setItem('digibuddy_admin_user', JSON.stringify(val));
      return val;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
