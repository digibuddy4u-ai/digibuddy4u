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
  Globe,
  Compass,
  CheckCircle2,
  Zap,
  MessageCircle,
  Film,
  Search,
  Target,
  MapPin,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { BRAND } from '../utils/brandConstants';
import { API_URL } from '../utils/api';
import {
  PACKAGES_CATALOG,
  MAIN_PACKAGES,
} from '../utils/packagesCatalog';
import { getDeliverableIcon } from '../utils/featureIconHelper';
import AddonsSection from '../components/addons/AddonsSection';
import PackageEnquiryChoiceModal from '../components/packages/PackageEnquiryChoiceModal';

const CHIP_ICONS = {
  Video,
  Film,
  Layers,
  Globe,
  Compass,
  Camera,
  TrendingUp,
  CheckCircle2,
  Zap,
  Search,
  Target,
  MapPin,
};

export default function PackagesPage() {
  const [packages, setPackages] = useState(PACKAGES_CATALOG);
  const [loading, setLoading] = useState(false);
  const [enquiryModalPkg, setEnquiryModalPkg] = useState(null);
  const [expandedNotice, setExpandedNotice] = useState(false);
  const navigate = useNavigate();

  const {
    toggleSavePackage,
    isPackageSaved,
    token,
    trackEvent,
  } = useCustomerAuth();

  useEffect(() => {
    let isMounted = true;
    async function fetchPackages() {
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
      // Fallback
    }

    const cleanPhone = (BRAND.phone || '').replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hi DigiBuddy4U! Please send me the official PDF brochure for the ${pkg.name} Package (${pkg.priceDisplay}).`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // 4 Main Packages
  const allMainPackages =
    packages.filter((p) => !p.isAddonPackage).length === 4
      ? packages.filter((p) => !p.isAddonPackage)
      : (MAIN_PACKAGES || PACKAGES_CATALOG);

  // ₹15,000 One-Time Setup Package (Featured horizontally at the top)
  const setupPkg =
    allMainPackages.find((p) => p.slug === 'startup-setup' || p.billingType === 'One-Time') ||
    allMainPackages[1];

  // 3 Retainer & Campaign Packages (Displayed in a 3-column grid below)
  const retainerPackages = allMainPackages.filter(
    (p) => p.slug !== setupPkg?.slug && p.billingType !== 'One-Time'
  );

  return (
    <>
      <SEO
        title="Packages & Pricing — DigiBuddy4U Digital Marketing & Growth"
        description="Explore DigiBuddy4U's official packages: Foundation (₹10,000/mo), Digital Foundation (₹15,000 One-Time), Expansion (₹20,000/mo - Most Popular), and Ultimate (Build Your Business from Scratch) (₹80,000/campaign)."
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

      {/* Main Packages Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light min-h-[60vh]">
        <div className="site-container">
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading official packages..." />
            </div>
          ) : (
            <>
              {/* ======================================================== */}
              {/* 1. HORIZONTAL FEATURED CARD: Digital Foundation (₹15,000 One-Time Setup) */}
              {/* ======================================================== */}
              {setupPkg && (
                <div className="w-full rounded-3xl bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/50 border-2 border-cyan-300 shadow-xl shadow-cyan-900/5 relative p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
                  {/* Ambient Lighting */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Floating Top Pill */}
                  <div className="absolute -top-3.5 left-6 sm:left-10 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-accent-yellow fill-current" />
                      Special Foundation Setup • One-Time Investment
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch relative z-10">
                    {/* Left Column: Title, Price, Description & Chips */}
                    <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0">
                      <div className="space-y-4">
                        {/* Top Bar Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 border border-cyan-200 px-2.5 py-1 rounded-lg">
                              Business Setup
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              One-Time
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleSavePackage(setupPkg.slug)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                              isPackageSaved(setupPkg._id || setupPkg.slug)
                                ? 'bg-red-50 text-red-500 shadow-xs'
                                : 'bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200'
                            }`}
                            title={isPackageSaved(setupPkg._id || setupPkg.slug) ? 'Remove from shortlist' : 'Save to shortlist'}
                            aria-label="Save to shortlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isPackageSaved(setupPkg._id || setupPkg.slug) ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Title & Price */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
                            {setupPkg.name}
                          </h3>

                          <div className="mt-2.5 pb-3 border-b border-slate-200/80">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight">
                                ₹{setupPkg.monthlyPrice?.toLocaleString('en-IN')}
                              </span>
                              <span className="text-sm font-bold text-slate-500">
                                / One-Time
                              </span>
                            </div>
                            <span className="text-xs text-content-muted block mt-1 font-medium">
                              One-time investment • Zero monthly commitment • Full handover
                            </span>
                          </div>

                          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {setupPkg.description}
                          </p>
                        </div>

                        {/* Visual Highlight Chips */}
                        <div className="pt-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Core Pillars Included:
                          </span>
                          <div className="grid grid-cols-1 gap-1.5">
                            {(setupPkg.chips || []).map((chip, cIdx) => {
                              const IconComponent = CHIP_ICONS[chip.icon] || CheckCircle2;
                              return (
                                <div
                                  key={cIdx}
                                  className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold bg-white/90 border border-cyan-200/80 text-navy-950 shadow-xs"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-6 h-6 rounded-lg bg-cyan-600/10 text-cyan-700 flex items-center justify-center flex-shrink-0">
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-heading font-bold text-xs truncate">
                                      {chip.label}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-500 flex-shrink-0">
                                    {chip.desc}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column: Included Scope Checklist */}
                    <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-between py-2 lg:py-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-navy-950 block">
                            Everything Included In This Setup:
                          </span>
                          <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-100/60 px-2.5 py-0.5 rounded-full">
                            Full Business Setup
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 text-xs text-slate-700">
                          {(setupPkg.keyHighlights || []).map((highlight, hIdx) => {
                            if (highlight.toLowerCase().includes('note:')) return null;
                            const { icon: ItemIcon, badgeClass } = getDeliverableIcon(highlight);

                            return (
                              <div key={hIdx} className="flex items-center gap-2.5 bg-white/90 p-2.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeClass}`}>
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="leading-snug font-semibold text-slate-800">{highlight}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Highlight Reassurance Pill */}
                      <div className="mt-4 p-3 rounded-2xl bg-cyan-100/60 border border-cyan-200 text-xs text-cyan-950 flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                        <span>
                          <strong>Ready-to-Use Business Foundation:</strong> Complete website, Google Business Profile, WhatsApp setup, Instagram & Facebook setup, and directed model ad shoot.
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Pricing & Action Buttons */}
                    <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center gap-3 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0">
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3.5 text-center">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>One-Time Investment</span>
                        </div>

                        <div className="pt-1">
                          <span className="text-3xl sm:text-4xl font-heading font-black text-navy-950">₹15,000</span>
                          <span className="text-xs font-bold text-slate-500 block mt-0.5">/ One-Time Setup</span>
                        </div>

                        <Button
                          type="button"
                          onClick={() => handleGetStarted(setupPkg)}
                          variant="primary"
                          size="md"
                          className="w-full justify-center font-heading font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                          icon={ArrowRight}
                        >
                          Choose Plan / Enquire
                        </Button>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleMoreDetails(setupPkg)}
                            className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-navy-950 font-heading font-bold text-[11px] transition-colors"
                          >
                            <span>Full Scope</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadPdf(setupPkg)}
                            className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-navy-950 font-heading font-bold text-[11px] transition-colors"
                            title={`Download official ${setupPkg.name} PDF`}
                          >
                            <Download className="w-3 h-3 text-primary" />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Instant enquiry prefilled on WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* 2. THREE ONGOING & CAMPAIGN PACKAGES (3-Column Grid) */}
              {/* ======================================================== */}
              <div className="mt-8 sm:mt-12">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                    <span>Ongoing Marketing & Growth Retainers</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 tracking-tight">
                    Monthly Retainers & Brand Campaigns
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Build lasting organic presence, viral reels consistency, and high-ROAS Meta advertising campaigns with our dedicated growth tiers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 w-full items-stretch">
                  {retainerPackages.map((pkg, idx) => {
                    const isGrowth = pkg.slug === 'growth' || pkg.badge === 'Most Popular';
                    const isPremium = pkg.slug === 'premium' || pkg.badge === 'Premium';
                    const isSaved = isPackageSaved(pkg._id || pkg.slug);
                    const chips = pkg.chips || [];

                    return (
                      <div
                        key={pkg.slug || idx}
                        className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                          isGrowth
                            ? 'bg-white border-2 border-primary shadow-2xl ring-4 ring-primary/10 lg:-translate-y-2.5 z-10'
                            : isPremium
                            ? 'bg-gradient-to-b from-white via-slate-50/70 to-white border-2 border-navy-900 shadow-2xl ring-4 ring-navy-900/10 lg:-translate-y-2.5 z-10'
                            : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                        }`}
                      >
                        {/* Floating Top Badge */}
                        {isGrowth && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-accent-yellow text-navy-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                              <Sparkles className="w-3.5 h-3.5 fill-current text-navy-950" />
                              Most Popular
                            </span>
                          </div>
                        )}

                        {isPremium && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-navy-950 text-cyan-accent border border-cyan-accent/30 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                              <Crown className="w-3.5 h-3.5 text-accent-yellow" />
                              Premium Campaign
                            </span>
                          </div>
                        )}

                        <div className="space-y-4">
                          {/* Top Bar: Category Label & Shortlist Heart */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              {isGrowth ? (
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                                  Social Growth Retainer
                                </span>
                              ) : isPremium ? (
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-navy-950 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                                  Omnichannel Scale
                                </span>
                              ) : (
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                                  Starter Plan
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleSavePackage(pkg.slug)}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                isSaved
                                  ? 'bg-red-50 text-red-500 shadow-xs'
                                  : 'bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                              title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                              aria-label="Save to shortlist"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          {/* Package Title & Price Box */}
                          <div>
                            <h3 className={`font-heading font-extrabold text-navy-950 tracking-tight leading-snug min-h-[56px] flex items-center ${isPremium ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                              {pkg.name}
                            </h3>

                            {/* Price and Billing Type */}
                            <div className="mt-2 pb-3 border-b border-slate-100">
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight">
                                  ₹{pkg.monthlyPrice?.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-slate-500">
                                  {pkg.billingType === 'Campaign' ? '/ Campaign' : '/ Month'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap mt-1">
                                <span className="text-[11px] text-content-muted font-medium">
                                  {pkg.billingType === 'Campaign'
                                    ? 'End-to-end full campaign execution'
                                    : 'Billed monthly'}
                                </span>
                                {pkg.billingType === 'Monthly' && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    {pkg.minimumCommitment || 'Minimum 3 Months'}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Short Description */}
                            <p className="mt-2.5 text-xs text-slate-600 leading-relaxed min-h-[48px]">
                              {pkg.description}
                            </p>
                          </div>

                          {/* Visual Chips */}
                          <div className="pt-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                              Key Highlights:
                            </span>
                            <div className="grid grid-cols-1 gap-1.5">
                              {chips.map((chip, cIdx) => {
                                const IconComponent = CHIP_ICONS[chip.icon] || CheckCircle2;
                                return (
                                  <div
                                    key={cIdx}
                                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                                      isGrowth
                                        ? 'bg-primary/5 border border-primary/20 text-navy-950'
                                        : isPremium
                                        ? 'bg-navy-950/5 border border-navy-950/15 text-navy-950'
                                        : 'bg-slate-50 border border-slate-200/80 text-navy-950'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <div
                                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                          isGrowth
                                            ? 'bg-primary text-white'
                                            : isPremium
                                            ? 'bg-navy-900 text-cyan-accent'
                                            : 'bg-primary/10 text-primary'
                                        }`}
                                      >
                                        <IconComponent className="w-3.5 h-3.5" />
                                      </div>
                                      <span className="font-heading font-bold text-xs truncate">
                                        {chip.label}
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-500 flex-shrink-0">
                                      {chip.desc}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Full Included Features Checklist */}
                          <div className="pt-2 space-y-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                              Complete Scope:
                            </span>

                            <div className="space-y-2 text-xs text-slate-700">
                              {(pkg.keyHighlights || []).map((highlight, hIdx) => {
                                if (highlight.toLowerCase().includes('note:')) return null;
                                const { icon: ItemIcon, badgeClass } = getDeliverableIcon(highlight);

                                return (
                                  <div key={hIdx} className="flex items-center gap-2.5">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeClass}`}>
                                      <ItemIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="leading-snug font-medium text-slate-700">{highlight}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Included Expenses Notice for ₹80,000 Package */}
                          {isPremium && (
                            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] space-y-1 text-emerald-950">
                              <div
                                onClick={() => setExpandedNotice(!expandedNotice)}
                                className="flex items-center justify-between font-bold text-emerald-900 cursor-pointer"
                              >
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                  <span>Expenses Included in Package:</span>
                                </div>
                                <span className="text-[10px] text-emerald-700 font-bold hover:underline">
                                  {expandedNotice ? 'Hide' : 'View (6)'}
                                </span>
                              </div>
                              {expandedNotice ? (
                                <div className="pt-1.5 border-t border-emerald-200/80 space-y-1">
                                  <p className="text-[10px] text-emerald-800 font-medium leading-tight">
                                    Included inside the ₹80,000 package price:
                                  </p>
                                  <ul className="list-disc list-inside text-[10px] text-emerald-900 space-y-0.5">
                                    <li>Influencer Collaboration Fees (Included)</li>
                                    <li>Model Fees / Booking Charges (Included)</li>
                                    <li>Meta Ads Budget / Ad Spend (Included)</li>
                                    <li>Travel & Transportation Expenses (Included)</li>
                                    <li>Location / Studio Rental Charges (Included)</li>
                                    <li>Props, Costumes & Production Setup (Included)</li>
                                  </ul>
                                </div>
                              ) : (
                                <p className="text-[10px] text-emerald-800 truncate">
                                  Influencer, model, ads budget & shoot expenses included.
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions: Get Started & Details */}
                        <div className="pt-5 mt-5 border-t border-slate-100 space-y-2">
                          <Button
                            type="button"
                            onClick={() => handleGetStarted(pkg)}
                            variant={isGrowth ? 'yellow' : 'primary'}
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
              </div>
            </>
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
