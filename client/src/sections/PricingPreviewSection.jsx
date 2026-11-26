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
  TrendingUp,
  ShieldCheck,
  Clock,
  Zap,
  Crown,
  Globe,
  Camera,
  CheckCircle2,
  MessageCircle,
  Film,
  Target,
  MapPin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import PackageEnquiryChoiceModal from '../components/packages/PackageEnquiryChoiceModal';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { API_URL } from '../utils/api';
import {
  PACKAGES_CATALOG,
  MAIN_PACKAGES,
} from '../utils/packagesCatalog';
import { getDeliverableIcon } from '../utils/featureIconHelper';

export default function PricingPreviewSection() {
  const [packages, setPackages] = useState(PACKAGES_CATALOG);
  const [enquiryModalPkg, setEnquiryModalPkg] = useState(null);
  const [activeTab, setActiveTab] = useState('retainers'); // 'retainers' | 'setup'
  const [expandedNotice, setExpandedNotice] = useState(false);
  const navigate = useNavigate();

  const {
    toggleSavePackage,
    isPackageSaved,
    token,
    trackEvent,
  } = useCustomerAuth();

  // Load packages from API with auto-fallback to canonical PACKAGES_CATALOG
  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length >= 4) {
          const merged = json.data.map((remotePkg) => {
            const local = PACKAGES_CATALOG.find((p) => p.slug === remotePkg.slug);
            return local ? { ...remotePkg, ...local, _id: remotePkg._id || local._id } : remotePkg;
          });
          setPackages(merged);
        } else if (isMounted) {
          setPackages(PACKAGES_CATALOG);
        }
      } catch (err) {
        if (isMounted) setPackages(PACKAGES_CATALOG);
      }
    }

    loadPackages();

    const handleFocus = () => loadPackages();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleGetStarted = (pkg) => {
    trackEvent?.('package_get_started_click', { slug: pkg.slug, name: pkg.name });
    setEnquiryModalPkg(pkg);
  };

  const handleCardClick = (pkg) => {
    trackEvent?.('package_card_click', { slug: pkg.slug, name: pkg.name });
    navigate(`/packages/${pkg.slug}`);
  };

  const handleDownloadPdf = async (pkg, e) => {
    e?.stopPropagation();
    trackEvent?.('package_pdf_download_click', { slug: pkg.slug, name: pkg.name });

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
    } catch {
      // Fallback
    }

    handleGetStarted(pkg);
  };

  // 4 Main Packages
  const allMainPackages =
    packages.filter((p) => !p.isAddonPackage).length === 4
      ? packages.filter((p) => !p.isAddonPackage)
      : (MAIN_PACKAGES || PACKAGES_CATALOG);

  // ₹15,000 One-Time Setup Package
  const setupPkg =
    allMainPackages.find((p) => p.slug === 'startup-setup' || p.billingType === 'One-Time') ||
    allMainPackages[1];

  // 3 Retainer & Campaign Packages (Foundation/Starter, Expansion/Growth, Ultimate/Scale)
  const retainerPackages = allMainPackages.filter(
    (p) => p.slug !== setupPkg?.slug && p.billingType !== 'One-Time'
  );

  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-24 bg-[#F5F8FC] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-current" />
            <span>DigiBuddy4U Pricing & Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
            Predictable Pricing for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Measurable Growth
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Choose from our continuous monthly growth retainers or our full-service digital foundation business launch.
          </p>

          {/* Tab Selector: Retainers vs One-Time Setup */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-white border border-slate-200/90 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('retainers')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all ${
                activeTab === 'retainers'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
              }`}
            >
              Growth Retainers & Campaigns (3 Plans)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('setup')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all ${
                activeTab === 'setup'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
              }`}
            >
              One-Time Business Setup (₹15,000)
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: 3-CARD PRICING SECTION MATCHING USER'S DESIGN     */}
        {/* ======================================================== */}
        {activeTab === 'retainers' && (
          <div className="relative mt-2 sm:mt-4">
            {/* Giant Background "Pricing" Typography - Elevated & Prominently Visible */}
            <div className="relative flex justify-center items-center select-none pointer-events-none overflow-visible pt-2 sm:pt-4 pb-2">
              <span className="text-7xl xs:text-8xl sm:text-9xl md:text-[10.5rem] lg:text-[12.5rem] font-black font-heading tracking-tight leading-none text-blue-600/90 select-none block text-center transform -translate-y-3 sm:-translate-y-5">
                Pricing
              </span>
            </div>

            {/* 3 Pricing Cards Grid */}
            <div className="relative -mt-6 sm:-mt-10 md:-mt-12 lg:-mt-14 z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 items-center max-w-6xl mx-auto">
              {retainerPackages.map((pkg, idx) => {
                const isGrowth = pkg.slug === 'growth' || pkg.badge === 'Most Popular' || idx === 1;
                const isPremium = pkg.slug === 'premium' || idx === 2;
                const isStarter = !isGrowth && !isPremium;
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                // Friendly display subtitle and clean short plan name
                const cardBadge = isGrowth ? 'Growth' : isStarter ? 'Starter' : 'Scale';
                const planTitle = isPremium ? 'Ultimate' : pkg.name;

                return (
                  <div
                    key={pkg.slug || idx}
                    className={`rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                      isGrowth
                        ? 'bg-white border-2 border-blue-500 shadow-[0_25px_60px_rgba(8,102,245,0.18)] ring-4 ring-blue-500/10 lg:-translate-y-5 lg:scale-[1.03] z-20'
                        : 'bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:border-blue-200/90 z-10'
                    }`}
                  >
                    {/* Center Card Radiant Blue Top Glow */}
                    {isGrowth && (
                      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent rounded-t-[30px] pointer-events-none" />
                    )}

                    {/* Floating "Popular" Pill Badge for Center Card */}
                    {isGrowth && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-500/40">
                          Popular
                        </span>
                      </div>
                    )}

                    <div className="relative z-10 space-y-3.5">
                      {/* Top Row: Plan Name / Category & Shortlist Heart */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                            {cardBadge}
                          </span>
                          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-navy-950 tracking-tight leading-tight">
                            {planTitle}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleSavePackage(pkg.slug)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isSaved
                              ? 'bg-red-50 text-red-500 shadow-xs'
                              : 'bg-slate-100/80 text-slate-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                          title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                          aria-label="Save to shortlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Pricing Block - High up & prominent */}
                      <div className="pt-0.5">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl lg:text-[2.65rem] font-heading font-black text-navy-950 tracking-tight leading-none">
                            ₹{pkg.monthlyPrice?.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-semibold text-slate-500">
                            {pkg.billingType === 'Campaign' ? '/campaign' : '/month'}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
                          {isStarter && 'Perfect for building consistent social media presence'}
                          {isGrowth && 'Perfect for growing brands needing model reels & Meta ads'}
                          {isPremium && 'Build your business from scratch with full-scale multi-channel scale'}
                        </p>
                      </div>

                      {/* Divider Line */}
                      <div className="pt-1 pb-1 border-t border-slate-100" />

                      {/* Deliverables / Features List with Solid Blue Checkmarks */}
                      <div className="space-y-2.5 pt-1">
                        {(pkg.keyHighlights || []).slice(0, 8).map((highlight, hIdx) => {
                          if (highlight.toLowerCase().includes('note:')) return null;

                          return (
                            <div key={hIdx} className="flex items-start gap-2.5">
                              {/* Blue Solid Checkmark Icon matching the design */}
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="text-xs font-medium text-slate-700 leading-snug">
                                {highlight}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Special Included Expenses Badge for Ultimate (₹80,000) */}
                      {isPremium && (
                        <div className="mt-3 p-3 rounded-2xl bg-blue-50/80 border border-blue-200/70 text-[11px] space-y-1 text-navy-950">
                          <div
                            onClick={() => setExpandedNotice(!expandedNotice)}
                            className="flex items-center justify-between font-bold text-blue-900 cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                              <span>All Production Expenses Included</span>
                            </div>
                            <span className="text-[10px] text-blue-700 font-bold hover:underline">
                              {expandedNotice ? 'Hide' : 'View (6)'}
                            </span>
                          </div>
                          {expandedNotice ? (
                            <ul className="pt-1.5 border-t border-blue-200/80 list-disc list-inside text-[10px] text-slate-700 space-y-0.5">
                              <li>Influencer Collaboration Fees (Included)</li>
                              <li>Model Fees / Booking Charges (Included)</li>
                              <li>Meta Ads Budget / Ad Spend (Included)</li>
                              <li>Travel & Location / Studio Rental (Included)</li>
                              <li>Props & Production Setup (Included)</li>
                            </ul>
                          ) : (
                            <p className="text-[10px] text-slate-600 truncate">
                              Influencer, model, ads budget & shoot expenses included.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Button matching the design */}
                    <div className="pt-6 mt-6 border-t border-slate-100 relative z-10 space-y-2.5">
                      {isGrowth ? (
                        /* Middle Card: Vibrant Electric Blue Pill Button */
                        <button
                          type="button"
                          onClick={() => handleGetStarted(pkg)}
                          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-sm shadow-lg shadow-blue-500/35 hover:shadow-xl hover:shadow-blue-500/45 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        /* Outer Cards: Sleek Dark / Black Pill Button */
                        <button
                          type="button"
                          onClick={() => handleGetStarted(pkg)}
                          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 hover:from-black hover:to-slate-900 text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      {/* Secondary Actions: Full Scope & PDF Download */}
                      <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                        <button
                          type="button"
                          onClick={() => handleCardClick(pkg)}
                          className="text-slate-500 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Full Scope</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDownloadPdf(pkg, e)}
                          className="text-slate-500 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          title={`Download official ${pkg.name} PDF`}
                        >
                          <Download className="w-3 h-3 text-blue-600" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout Banner for One-Time Business Foundation */}
            {setupPkg && (
              <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-white border border-blue-200 shadow-md p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-left">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <Zap className="w-5 h-5 fill-current text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-navy-950 text-sm sm:text-base">
                        Starting a New Business?
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        One-Time • ₹15,000
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Get a full mobile-ready website, Google Business, WhatsApp & 1 model advertisement shoot.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('setup')}
                  className="px-5 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-heading font-bold text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  <span>Explore Foundation Setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ONE-TIME BUSINESS SETUP PACKAGE (₹15,000)         */}
        {/* ======================================================== */}
        {activeTab === 'setup' && setupPkg && (
          <div className="mt-6 max-w-4xl mx-auto rounded-3xl bg-white border-2 border-blue-500/80 shadow-2xl p-6 sm:p-8 lg:p-10 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200/80 mb-2">
                  <Sparkles className="w-3 h-3 fill-current" />
                  One-Time Business Setup
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                  {setupPkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  {setupPkg.description}
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-3xl sm:text-4xl font-heading font-black text-navy-950 block">
                  ₹{setupPkg.monthlyPrice?.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  / One-Time Investment • No Monthly Fee
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 text-xs text-slate-700">
              {(setupPkg.keyHighlights || []).map((highlight, hIdx) => {
                if (highlight.toLowerCase().includes('note:')) return null;
                return (
                  <div key={hIdx} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="font-semibold text-slate-800 leading-snug">{highlight}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleGetStarted(setupPkg)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started with Foundation Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCardClick(setupPkg)}
                  className="text-xs font-bold text-slate-600 hover:text-navy-950 flex items-center gap-1"
                >
                  <span>Full Scope Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDownloadPdf(setupPkg, e)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions & Links */}
        <div className="mt-12 sm:mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            to="/packages"
            variant="outlinePrimary"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto font-bold text-xs sm:text-sm rounded-full"
          >
            Compare All Packages & Specifications
          </Button>

          <Button
            to="/contact"
            variant="yellow"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto font-bold text-xs sm:text-sm rounded-full"
          >
            Request Custom Scope / Consultation
          </Button>
        </div>
      </div>

      {/* Choice Modal: Enquire on WhatsApp vs Website Form */}
      <PackageEnquiryChoiceModal
        isOpen={Boolean(enquiryModalPkg)}
        onClose={() => setEnquiryModalPkg(null)}
        pkg={enquiryModalPkg}
      />
    </section>
  );
}
