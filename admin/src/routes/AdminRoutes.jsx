import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';

// Pages
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import EnquiriesPage from '../pages/EnquiriesPage';
import ServicesPage from '../pages/ServicesPage';
import PortfolioPage from '../pages/PortfolioPage';
import CaseStudiesPage from '../pages/CaseStudiesPage';
import PackagesPage from '../pages/PackagesPage';
import LeadsCRMPage from '../pages/LeadsCRMPage';
import PackageAnalyticsPage from '../pages/PackageAnalyticsPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import FAQPage from '../pages/FAQPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';
import StaffRBACPage from '../pages/StaffRBACPage';
import CustomersPage from '../pages/CustomersPage';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light">
        <LoadingSpinner text="Checking authentication status..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PermissionRoute({ permissionKey, children }) {
  const { user } = useAuth();

  // Superadmin has full unrestricted access
  if (user?.role === 'superadmin') return children;

  const perms = user?.permissions;
  if (!perms || perms[permissionKey]?.view === false) {
    return (
      <div className="p-8 sm:p-12 text-center max-w-lg mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-heading font-extrabold text-navy-900">Access Restricted</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Your current account role (<strong>{user?.role || 'Staff'}</strong>) does not have authorization to view or manage this section.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3E8C] text-white text-xs font-bold shadow-xs hover:bg-[#092B66] transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

export default function AdminRoutes() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !loading && isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />

        {/* Sales & CRM */}
        <Route
          path="leads"
          element={
            <PermissionRoute permissionKey="leads">
              <LeadsCRMPage />
            </PermissionRoute>
          }
        />
        <Route
          path="enquiries"
          element={
            <PermissionRoute permissionKey="enquiries">
              <EnquiriesPage />
            </PermissionRoute>
          }
        />
        <Route
          path="customers"
          element={
            <PermissionRoute permissionKey="customers">
              <CustomersPage />
            </PermissionRoute>
          }
        />

        {/* Packages & Pricing */}
        <Route
          path="packages"
          element={
            <PermissionRoute permissionKey="packages">
              <PackagesPage />
            </PermissionRoute>
          }
        />
        <Route
          path="package-analytics"
          element={
            <PermissionRoute permissionKey="packageAnalytics">
              <PackageAnalyticsPage />
            </PermissionRoute>
          }
        />
        <Route path="pricing" element={<Navigate to="/packages" replace />} />

        {/* Services & Portfolio */}
        <Route
          path="services"
          element={
            <PermissionRoute permissionKey="services">
              <ServicesPage />
            </PermissionRoute>
          }
        />
        <Route
          path="portfolio"
          element={
            <PermissionRoute permissionKey="portfolio">
              <PortfolioPage />
            </PermissionRoute>
          }
        />
        <Route
          path="case-studies"
          element={
            <PermissionRoute permissionKey="caseStudies">
              <CaseStudiesPage />
            </PermissionRoute>
          }
        />

        {/* Marketing & Content */}
        <Route
          path="testimonials"
          element={
            <PermissionRoute permissionKey="testimonials">
              <TestimonialsPage />
            </PermissionRoute>
          }
        />
        <Route
          path="faqs"
          element={
            <PermissionRoute permissionKey="faqs">
              <FAQPage />
            </PermissionRoute>
          }
        />

        {/* Settings & Team RBAC */}
        <Route
          path="settings"
          element={
            <PermissionRoute permissionKey="settings">
              <SettingsPage />
            </PermissionRoute>
          }
        />
        <Route
          path="staff"
          element={
            <PermissionRoute permissionKey="staff">
              <StaffRBACPage />
            </PermissionRoute>
          }
        />
        <Route path="team" element={<Navigate to="/staff" replace />} />

        {/* Profile (Always Accessible) */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
