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
            {/* Giant Background "Pricing" Typography - Sitting Directly Behind Card Tops */}
            <div className="relative flex justify-center items-center select-none pointer-events-none overflow-visible pt-1 sm:pt-3">
              <span className="text-7xl xs:text-8xl sm:text-9xl md:text-[10.5rem] lg:text-[12.5rem] font-black font-heading tracking-tight leading-none text-[#146EF5] opacity-95 select-none block text-center transform -translate-y-2 sm:-translate-y-4">
                Pricing
              </span>
            </div>

            {/* 3 Pricing Cards Grid with 3D Depth & Hover */}
            <div className="relative -mt-10 sm:-mt-14 md:-mt-18 lg:-mt-22 z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 items-center max-w-6xl mx-auto perspective-[1200px]">
              {retainerPackages.map((pkg, idx) => {
                const isGrowth = pkg.slug === 'growth' || pkg.badge === 'Most Popular' || idx === 1;
                const isPremium = pkg.slug === 'premium' || idx === 2;
                const isStarter = !isGrowth && !isPremium;
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                // Package names and badges matching Image 2 exactly
                const cardBadge = isGrowth ? 'GROWTH' : isStarter ? 'STARTER' : 'SCALE';
                const packageName = isStarter
                  ? 'Foundation'
                  : isGrowth
                  ? 'Expansion'
                  : 'Ultimate (Build Your Business from Scratch)';
                const subtitleText = isStarter
                  ? 'Perfect for building consistent social media presence'
                  : isGrowth
                  ? 'Perfect for growing brands needing model reels & Meta ads'
                  : 'For professional brands seeking multi-channel dominance';

                // Exactly 3 key highlights matching user request ("3 line ma j hoiey")
                const threeHighlights = isStarter
                  ? [
                      '6 Reels per Month (AI or Lifestyle Reels)',
                      '9 Social Media Posts (Instagram & Facebook)',
                      'Content Calendar, Script Writing & Audit',
                    ]
                  : isGrowth
                  ? [
                      '5 Reels (3 Model Based + 2 Founder Face)',
                      '15 Creatives (10 Posts + 3 Carousels + 2 Memes)',
                      '2 Meta Ads Campaigns & Full Management',
                    ]
                  : [
                      '10 Reels (6 Model + 4 Influencer Productions)',
                      '6 Meta Ads Campaigns Run (Strategy & Retargeting)',
                      'All Shoot, Influencer, Model & Ad Spend Expenses Included',
                    ];

                return (
                  <div
                    key={pkg.slug || idx}
                    className={`relative group transition-all duration-300 ease-out ${
                      isGrowth
                        ? 'lg:-translate-y-5 lg:scale-[1.03] z-20 hover:-translate-y-7 hover:scale-[1.05]'
                        : 'z-10 hover:-translate-y-3 hover:scale-[1.02]'
                    }`}
                  >
                    {/* Floating "Popular" Pill Badge for Center Card */}
                    {isGrowth && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                        <span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-500/40 border border-blue-400/30">
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Card Surface with Frosted Glass & Blue Ambient Reflection Blur */}
                    <div
                      className={`rounded-[30px] sm:rounded-[34px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                        isGrowth
                          ? 'bg-white/85 border-2 border-blue-500 shadow-[0_25px_60px_rgba(8,102,245,0.20)] ring-4 ring-blue-500/10 hover:shadow-[0_35px_80px_rgba(8,102,245,0.30)]'
                          : 'bg-white/85 border border-white/90 shadow-xl shadow-slate-200/70 hover:shadow-2xl hover:border-blue-300/80'
                      }`}
                    >
                      {/* Frosted Glass Blue Blur Effect at Top of Cards (matching reference image) */}
                      {isGrowth && (
                        <>
                          <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-blue-500/30 via-blue-400/15 to-transparent rounded-t-[32px] blur-md pointer-events-none" />
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-24 bg-blue-500/25 rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isStarter && (
                        <div className="absolute -top-4 -right-4 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                      )}
                      {isPremium && (
                        <div className="absolute -top-4 -left-4 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                      )}

                      <div className="relative z-10 space-y-2.5">
                        {/* Line 1: Category Badge & Plan Name from Image 2 */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              {cardBadge}
                            </span>
                            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-navy-950 tracking-tight leading-snug">
                              {packageName}
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

                        {/* Line 2: Price Block */}
                        <div className="pt-0.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl lg:text-[2.65rem] font-heading font-black text-navy-950 tracking-tight leading-none">
                              ₹{pkg.monthlyPrice?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm font-semibold text-slate-500">
                              {pkg.billingType === 'Campaign' ? '/campaign' : '/month'}
                            </span>
                          </div>
                        </div>

                        {/* Line 3: Subtitle / Tagline from Image 2 */}
                        <p className="text-xs text-slate-500 font-medium leading-relaxed min-h-[32px]">
                          {subtitleText}
                        </p>

                        {/* Horizontal Divider Line */}
                        <div className="pt-2 pb-1 border-t border-slate-200/70" />

                        {/* EXACTLY 3 LINES of Features with Solid Blue Checkmarks */}
                        <div className="space-y-3 pt-1">
                          {threeHighlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2.5">
                              {/* Solid Blue Circle Checkmark */}
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="text-xs font-medium text-slate-700 leading-snug">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Subtle link to inspect full scope */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => handleCardClick(pkg)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <span>View full scope (10+ inclusions)</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom CTA Button */}
                      <div className="pt-5 mt-5 border-t border-slate-100 relative z-10 space-y-2">
                        {isGrowth ? (
                          /* Center Card: Vibrant Electric Blue Pill Button */
                          <button
                            type="button"
                            onClick={() => handleGetStarted(pkg)}
                            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-sm shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Get Started</span>
                          </button>
                        ) : (
                          /* Outer Cards: Sleek Dark / Black Pill Button */
                          <button
                            type="button"
                            onClick={() => handleGetStarted(pkg)}
                            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 hover:from-black hover:to-slate-900 text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Get Started</span>
                          </button>
                        )}

                        {/* Secondary Action: PDF Download */}
                        <div className="flex items-center justify-center text-[11px] pt-0.5">
                          <button
                            type="button"
                            onClick={(e) => handleDownloadPdf(pkg, e)}
                            className="text-slate-400 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                            title={`Download official ${pkg.name} PDF`}
                          >
                            <Download className="w-3 h-3 text-blue-600" />
                            <span>Download Package PDF</span>
                          </button>
                        </div>
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
          <div className="relative mt-2 sm:mt-4">
            {/* Giant Background "Digital Foundation" Typography */}
            <div className="relative flex justify-center items-center select-none pointer-events-none overflow-visible pt-1 sm:pt-3">
              <span className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.2rem] font-black font-heading tracking-tight leading-none text-[#146EF5] opacity-95 select-none block text-center transform -translate-y-2 sm:-translate-y-4 whitespace-nowrap px-4">
                Digital Foundation
              </span>
            </div>

            {/* Main Frosted Glass Card with 2-Column Deliverable Pills */}
            <div className="relative -mt-8 sm:-mt-12 md:-mt-14 z-10 max-w-4xl mx-auto">
              {/* Floating Pill Badge on Card Border */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-500/40 border border-blue-400/30">
                  <Zap className="w-3.5 h-3.5 fill-current text-white" />
                  <span>ONE-TIME BUSINESS SETUP</span>
                </span>
              </div>

              {/* Card Body */}
              <div className="rounded-[36px] bg-white/85 backdrop-blur-2xl border-2 border-white/90 shadow-[0_25px_60px_rgba(8,102,245,0.15)] p-6 sm:p-9 lg:p-10 relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(8,102,245,0.22)]">
                {/* Frosted Glass Radiant Blue Reflection Glow */}
                <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-blue-500/25 via-blue-400/10 to-transparent rounded-t-[36px] blur-md pointer-events-none" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-80 h-24 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Card Title & Description */}
                  <div className="text-center pt-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-navy-950 tracking-tight leading-tight">
                      {setupPkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto leading-relaxed">
                      {setupPkg.description}
                    </p>
                  </div>

                  {/* Centered Price Pill Box */}
                  <div className="text-center my-4 sm:my-5">
                    <div className="inline-block rounded-2xl bg-blue-50/80 border border-blue-200/70 py-3.5 px-8 sm:px-12 shadow-xs">
                      <div className="text-3xl sm:text-4xl lg:text-[2.65rem] font-heading font-black text-navy-950 tracking-tight leading-none">
                        ₹{setupPkg.monthlyPrice?.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        One-Time Investment • No Monthly Fee
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Deliverable Pill Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 py-2">
                    {/* Left Column (6 items) */}
                    <div className="space-y-2.5 sm:space-y-3">
                      {[
                        'Business Website Setup (Mobile-Ready)',
                        'WhatsApp Business Account Setup',
                        'Profile Optimization & Bio Setup',
                        'Shoot Concept & Storyboard Planning',
                        'Professional Video Shoot & Direction',
                        'Content Writing & Brand Messaging',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-full bg-white/75 border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs font-semibold text-slate-800 leading-snug truncate">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Right Column (6 items) */}
                    <div className="space-y-2.5 sm:space-y-3">
                      {[
                        'Google Business Profile (GBP) Setup',
                        'Instagram, Facebook & LinkedIn Setup',
                        '1 Model for Advertisement Shoot',
                        'Advertisement Script Writing',
                        'Professional Video Editing',
                        'Brand Presentation & Launch Guidance',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-full bg-white/75 border border-slate-200/80 shadow-xs hover:border-blue-300 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs font-semibold text-slate-800 leading-snug truncate">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="pt-4 border-t border-slate-200/80 mt-5" />

                  {/* Action Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                    <button
                      type="button"
                      onClick={() => handleGetStarted(setupPkg)}
                      className="w-full sm:w-auto py-3.5 px-7 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-sm shadow-lg shadow-blue-500/35 hover:shadow-xl hover:shadow-blue-500/45 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Started with Foundation Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center sm:justify-end gap-5 text-xs font-bold pt-1 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleCardClick(setupPkg)}
                        className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Scope Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownloadPdf(setupPkg, e)}
                        className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title={`Download official ${setupPkg.name} PDF`}
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
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
