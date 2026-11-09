import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Sparkles,
  ArrowRight,
  Download,
  Heart,
  Video,
  Layers,
  Calendar,
  Camera,
  Share2,
  TrendingUp,
  ShieldCheck,
  Clock,
  HelpCircle,
  FileText,
  AlertCircle,
  Crown,
  Info,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { BRAND } from '../utils/brandConstants';
import { API_URL } from '../utils/api';
import { PACKAGES_CATALOG } from '../utils/packagesCatalog';
import AddonsSection from '../components/addons/AddonsSection';
import PackageEnquiryChoiceModal from '../components/packages/PackageEnquiryChoiceModal';

export default function PackagesPage() {
  const [packages, setPackages] = useState(PACKAGES_CATALOG);
  const [loading, setLoading] = useState(false);
  const [enquiryModalPkg, setEnquiryModalPkg] = useState(null);
  const navigate = useNavigate();

  const {
    isAuthenticated,
    customer,
    savedPackages,
    toggleSavePackage,
    isPackageSaved,
    promptLogin,
    token,
    trackEvent,
  } = useCustomerAuth();

  useEffect(() => {
    let isMounted = true;
    async function fetchPackages() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length === 4) {
          setPackages(json.data);
        } else if (isMounted) {
          setPackages(PACKAGES_CATALOG);
        }
      } catch (err) {
        if (isMounted) setPackages(PACKAGES_CATALOG);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPackages();

    const handleFocus = () => fetchPackages();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleGetStarted = (pkg) => {
    trackEvent?.('package_page_get_started_click', { slug: pkg.slug, name: pkg.name });
    setEnquiryModalPkg(pkg);
  };

  const handleMoreDetails = (pkg) => {
    trackEvent?.('package_page_details_click', { slug: pkg.slug, name: pkg.name });
    navigate(`/packages/${pkg.slug}`);
  };

  const handleDownloadPdf = async (pkg) => {
    trackEvent?.('package_page_pdf_download_click', { slug: pkg.slug, name: pkg.name });

    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/packages/${pkg.slug}/pdf`, { headers });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DigiBuddy4U_${pkg.name}_Package.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return;
      }
    } catch (err) {
      // Fallback below
    }

    const cleanPhone = (BRAND.phone || '').replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hi DigiBuddy4U! Please send me the official PDF brochure for the ${pkg.name} Package (${pkg.priceDisplay}).`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const displayedPackages = packages.filter((p) => p.isPublished !== false);

  return (
    <>
      <SEO
        title="Packages & Pricing — DigiBuddy4U Digital Marketing & Growth"
        description="Explore DigiBuddy4U's official 4 packages: Social Media Starter (₹10,000/mo), Business Startup Setup (₹15,000 One-Time), Business Growth (₹20,000/mo - Most Popular), and Premium Brand Scale (₹80,000/campaign)."
      />

      {/* Header Banner */}
      <section className="bg-white text-navy-950 py-14 sm:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <Badge variant="blue" size="md" className="mb-4">
            Official Pricing & Retainers
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Digital Growth & Marketing{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From essential social consistency and one-time business foundation setup to full-scale creative production and Meta ads dominance.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> Guaranteed Deliverables & Timelines
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> 100% Pre-Approval Policy
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> Direct WhatsApp Senior Strategist Access
            </span>
          </div>
        </div>
      </section>

      {/* Main Packages Grid (Desktop 4-col, Tablet 2-col, Mobile 1-col) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light min-h-[60vh]">
        <div className="site-container">
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading official packages..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 xl:gap-6 items-stretch mx-auto">
              {displayedPackages.map((pkg, idx) => {
                const isGrowth = pkg.slug === 'growth' || pkg.badge === 'Most Popular';
                const isPremium = pkg.slug === 'premium' || pkg.badge === 'Premium';
                const isSetup = pkg.billingType === 'One-Time' || pkg.slug === 'startup-setup';
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                return (
                  <div
                    key={pkg.slug || idx}
                    className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-5 xl:p-6 flex flex-col justify-between transition-all duration-300 relative group ${
                      isGrowth
                        ? 'bg-white border-2 border-primary shadow-2xl ring-4 ring-primary/10 lg:-translate-y-2'
                        : isPremium
                        ? 'bg-gradient-to-b from-white via-slate-50/70 to-white border-2 border-navy-900 shadow-2xl ring-4 ring-navy-900/10 lg:-translate-y-2'
                        : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                    }`}
                  >
                    {/* Top Floating Badge for Most Popular & Premium */}
                    {isGrowth && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-yellow text-navy-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3.5 h-3.5 fill-current text-navy-950" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {isPremium && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-navy-950 text-cyan-accent border border-cyan-accent/30 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                          <Crown className="w-3.5 h-3.5 text-accent-yellow" />
                          Premium
                        </span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Top Bar: Title & Heart button */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={
                              isGrowth
                                ? 'yellow'
                                : isPremium
                                ? 'blue'
                                : isSetup
                                ? 'blue'
                                : 'slate'
                            }
                            size="sm"
                          >
                            {pkg.badge || (isSetup ? 'Business Setup' : 'Monthly')}
                          </Badge>
                          {isSetup && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              One-Time
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleSavePackage(pkg.slug)}
                          title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            isSaved
                              ? 'bg-red-50 text-red-500 shadow-xs'
                              : 'bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Package Name */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight min-h-[56px] flex items-center">
                          {pkg.name}
                        </h3>

                        {/* Price & Billing */}
                        <div className="mt-2.5 pb-3 border-b border-slate-100">
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight">
                              ₹{pkg.monthlyPrice?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-500">
                              {pkg.billingType === 'One-Time'
                                ? '/ One-Time'
                                : pkg.billingType === 'Campaign'
                                ? '/ Campaign'
                                : '/ Month'}
                            </span>
                          </div>
                          <span className="text-[11px] text-content-muted block mt-1 font-medium">
                            {pkg.billingSubtitle || (isSetup ? 'One-time setup' : 'Billed monthly')}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[54px]">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Features Highlights List */}
                      <div className="pt-2 space-y-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Included Services:
                        </span>

                        <div className="space-y-2 text-xs sm:text-[13px] text-slate-700">
                          {(pkg.keyHighlights || []).map((highlight, hIdx) => {
                            const isNote = highlight.toLowerCase().includes('note:') || highlight.toLowerCase().includes('one-time setup');
                            return (
                              <div
                                key={hIdx}
                                className={`flex items-start gap-2 ${
                                  isNote
                                    ? 'p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 font-semibold text-[11px]'
                                    : ''
                                }`}
                              >
                                {!isNote ? (
                                  <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                      isGrowth
                                        ? 'bg-primary text-white'
                                        : isPremium
                                        ? 'bg-navy-900 text-cyan-accent'
                                        : 'bg-primary/10 text-primary'
                                    }`}
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  </div>
                                ) : (
                                  <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                                )}
                                <span className="leading-snug">{highlight}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Premium Package Additional Costs Notice */}
                      {isPremium && (
                        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1.5 text-slate-600">
                          <div className="flex items-center gap-1.5 font-bold text-navy-950">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            <span>Additional Expenses Notice:</span>
                          </div>
                          <p className="text-[10px] leading-relaxed text-slate-500">
                            The following expenses are not included in the ₹80,000 package price and will be charged separately wherever applicable:
                          </p>
                          <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5 pl-1">
                            <li>Influencer Collaboration Fees</li>
                            <li>Model Fees / Booking Charges</li>
                            <li>Meta Ads Budget / Ad Spend</li>
                            <li>Travel & Transportation Expenses</li>
                            <li>Location / Studio Rental Charges</li>
                            <li>Props, Costumes & Extra Requirements</li>
                          </ul>
                        </div>
                      )}

                      {/* One-Time Setup Callout */}
                      {isSetup && (
                        <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Note:</strong> This is a one-time setup package, not a monthly subscription.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-5 mt-5 border-t border-slate-100 space-y-2">
                      <Button
                        type="button"
                        onClick={() => handleGetStarted(pkg)}
                        variant={isGrowth ? 'yellow' : isPremium ? 'primary' : 'primary'}
                        size="md"
                        className={`w-full justify-center font-heading font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 ${
                          isPremium ? 'bg-navy-950 hover:bg-navy-900 text-white' : ''
                        }`}
                        icon={ArrowRight}
                      >
                        Choose Plan / Enquire
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleMoreDetails(pkg)}
                          className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-950 font-heading font-bold text-[11px] transition-colors"
                        >
                          <span>Full Scope</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(pkg)}
                          className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-950 font-heading font-bold text-[11px] transition-colors"
                          title={`Download official ${pkg.name} PDF`}
                        >
                          <Download className="w-3 h-3 text-primary" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* On-Demand Addons Section */}
      <AddonsSection />

      {/* Choice Modal: Enquire on WhatsApp vs Website Form */}
      <PackageEnquiryChoiceModal
        isOpen={Boolean(enquiryModalPkg)}
        onClose={() => setEnquiryModalPkg(null)}
        pkg={enquiryModalPkg}
      />
    </>
  );
}
