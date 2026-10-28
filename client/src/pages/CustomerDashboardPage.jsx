import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Heart,
  Download,
  FileText,
  Mail,
  Phone,
  Building,
  Calendar,
  ArrowRight,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { API_URL } from '../utils/api';

export default function CustomerDashboardPage() {
  const { customer, isAuthenticated, loading, logout, token } = useCustomerAuth();
  const [profileData, setProfileData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/customer/dashboard');
      return;
    }

    async function loadData() {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/customer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setProfileData(data.data);
        }
      } catch (err) {
        console.warn('Error loading customer dashboard:', err);
      } finally {
        setFetching(false);
      }
    }

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loading, token, navigate]);

  const handleDownloadPdf = async (slug, name) => {
    try {
      const res = await fetch(`${API_URL}/packages/${slug}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DigiBuddy4U_${name || slug}_Package.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Unable to download PDF. Please try again.');
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-surface-light">
        <LoadingSpinner size="lg" text="Loading customer dashboard..." />
      </div>
    );
  }

  const savedList = profileData?.savedPackages || [];
  const downloadsList = profileData?.downloadedPdfs || [];
  const enquiriesList = profileData?.enquiries || [];

  return (
    <>
      <SEO
        title="Customer Dashboard — DigiBuddy4U"
        description="View your saved DigiBuddy4U marketing packages, downloaded PDF specifications, and consultation inquiries."
      />

      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="site-container relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-cyan-accent font-bold tracking-wider">
              Client Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Welcome back, {profileData?.name || customer?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your saved package shortlists, downloaded PDF agreements, and consultation inquiries.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/packages');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 border border-navy-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Main Dashboard Body */}
      <section className="py-10 sm:py-14 bg-surface-light min-h-[60vh]">
        <div className="site-container space-y-10">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-content-muted font-bold block uppercase tracking-wider">
                  Saved Packages
                </span>
                <span className="text-2xl font-heading font-extrabold text-navy-900 mt-1 block">
                  {savedList.length}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-content-muted font-bold block uppercase tracking-wider">
                  PDF Specifications
                </span>
                <span className="text-2xl font-heading font-extrabold text-navy-900 mt-1 block">
                  {downloadsList.length}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-content-muted font-bold block uppercase tracking-wider">
                  Consultation Requests
                </span>
                <span className="text-2xl font-heading font-extrabold text-navy-900 mt-1 block">
                  {enquiriesList.length}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Section 1: Saved Packages Shortlist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-bold text-navy-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span>My Saved Package Shortlist</span>
                </h3>
                <p className="text-xs text-content-muted mt-0.5">
                  Notice: Saving a package or downloading its PDF does not constitute a purchase or booking.
                </p>
              </div>

              <Link
                to="/packages"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                Browse All Packages →
              </Link>
            </div>

            {savedList.length === 0 ? (
              <div className="py-10 text-center space-y-3">
                <p className="text-sm text-content-muted">You have not saved any packages to your shortlist yet.</p>
                <Button to="/packages" variant="primary" size="sm">
                  Explore Package Catalog
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedList.map((pkg) => (
                  <div
                    key={pkg._id || pkg.slug}
                    className="p-5 rounded-2xl border border-slate-200 bg-surface-light flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <Badge variant="blue" size="sm">{pkg.badge || 'Package'}</Badge>
                        <span className="text-xs text-content-muted">{pkg.minimumCommitment}</span>
                      </div>
                      <h4 className="font-heading font-extrabold text-lg text-navy-900 mt-2">{pkg.name}</h4>
                      <p className="text-primary font-bold text-base mt-0.5">{pkg.priceDisplay}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                      <Button
                        to={`/packages/${pkg.slug}`}
                        variant="primary"
                        size="sm"
                        className="flex-1 justify-center text-xs"
                      >
                        View Full Specs
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(pkg.slug, pkg.name)}
                        className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-navy-900 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Recent PDF Downloads & Enquiries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Downloaded PDFs */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-heading font-bold text-navy-900 flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                <span>Downloaded PDF Specifications</span>
              </h3>

              {downloadsList.length === 0 ? (
                <p className="text-xs text-content-muted py-6 text-center">No PDFs downloaded yet.</p>
              ) : (
                <div className="space-y-2.5 divide-y divide-slate-100">
                  {downloadsList.map((dl, idx) => (
                    <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-navy-900 block capitalize">
                          {dl.packageName || dl.packageSlug} Package PDF
                        </span>
                        <span className="text-[11px] text-content-muted">
                          {dl.downloadedAt ? new Date(dl.downloadedAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(dl.packageSlug, dl.packageName)}
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Re-download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation Enquiries */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-heading font-bold text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>My Consultation Inquiries</span>
              </h3>

              {enquiriesList.length === 0 ? (
                <p className="text-xs text-content-muted py-6 text-center">
                  You have not submitted any package consultation requests yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {enquiriesList.map((enq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-surface-light border border-slate-200/70 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900">{enq.service}</span>
                        <span className="capitalize px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-content-muted line-clamp-2">{enq.message}</p>
                      <span className="text-[10px] text-slate-400 block pt-1">
                        Submitted: {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Profile Information */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-heading font-bold text-navy-900 flex items-center gap-2">
              <User className="w-4 h-4 text-navy-900" />
              <span>Account Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-surface-light border border-slate-100">
                <span className="text-content-muted block mb-1">Full Name</span>
                <strong className="text-navy-900 text-sm">{profileData?.name}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-light border border-slate-100">
                <span className="text-content-muted block mb-1">Email Address</span>
                <strong className="text-navy-900 text-sm">{profileData?.email}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-light border border-slate-100">
                <span className="text-content-muted block mb-1">Phone / WhatsApp</span>
                <strong className="text-navy-900 text-sm">{profileData?.phone || 'Not provided'}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
