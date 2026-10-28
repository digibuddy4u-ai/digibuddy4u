import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { BRAND } from '../utils/brandConstants';
import { API_URL } from '../utils/api';

// Default static fallback packages from PDF in case of network latency
const FALLBACK_PACKAGES = [
  {
    name: 'Basic',
    slug: 'basic',
    badge: 'Starter SMM',
    monthlyPrice: 5000,
    priceDisplay: '₹5,000/month',
    minimumCommitment: 'Monthly',
    platforms: ['Instagram'],
    reelsCount: '2–3 reels/month',
    postsCount: '8 posts/month',
    storiesCount: '8 stories/month',
    shootsCount: 'Not included',
    metaAds: '+₹1,000/mo optional',
    keyHighlights: [
      'Instagram focus',
      '2–3 reels/month (raw clips or AI)',
      '8 branded posts & 8 stories',
      'Captions, hashtags & calendar',
      '1-page Mini Snapshot competitor study',
      'Basic monthly report',
    ],
  },
  {
    name: 'Standard',
    slug: 'standard',
    badge: 'Dual Platform',
    monthlyPrice: 7500,
    priceDisplay: '₹7,500/month',
    minimumCommitment: 'Minimum 3 months',
    platforms: ['Instagram', 'Facebook'],
    reelsCount: '4 reels/month',
    postsCount: '10 posts/month',
    storiesCount: '12 stories/month',
    shootsCount: 'Not included',
    metaAds: '1 active campaign included',
    keyHighlights: [
      'Instagram + Facebook management',
      '4 reels/month (3 raw clips + 1 AI)',
      '10 branded posts & 12 stories',
      '1 active Meta Ads campaign included',
      '2–3 page Competitor Study',
      'Monthly ad performance report',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    badge: 'Most Popular',
    monthlyPrice: 20000,
    priceDisplay: '₹20,000/month',
    alternativePriceDisplay: '₹15,000/month without Meta ads',
    minimumCommitment: 'Minimum 3 months',
    platforms: ['Instagram', 'Facebook'],
    reelsCount: '8 reels/month',
    postsCount: '12 posts/month',
    storiesCount: '16 stories/month',
    shootsCount: '1 shoot day (up to 3-4h)',
    metaAds: '2 active campaigns included',
    isFeatured: true,
    keyHighlights: [
      'Instagram + Facebook with custom format',
      '1 shoot day/mo at your location (Ahmedabad)',
      '8 reels/month (shoot, UGC, AI, educational)',
      '12 posts & 16 stories (with highlight covers)',
      '2 active Meta Ads campaigns (A/B testing)',
      'Weekday comment & DM replies (leads forwarded)',
      '5–6 page Market Position Case Study',
    ],
  },
  {
    name: 'Pro',
    slug: 'pro',
    badge: 'Multi-Channel Scale',
    monthlyPrice: 30000,
    priceDisplay: '₹30,000/month',
    alternativePriceDisplay: '₹25,000/month without Meta ads',
    minimumCommitment: 'Minimum 6 months',
    platforms: ['Instagram', 'Facebook', 'YouTube Shorts / LinkedIn'],
    reelsCount: '12 reels/month',
    postsCount: '16 posts/month',
    storiesCount: '20 stories/month',
    shootsCount: '2 shoot days (Camera + iPhone)',
    metaAds: '3 active campaigns included',
    keyHighlights: [
      '3 channels: IG + FB + YouTube/LinkedIn',
      '2 shoot days/mo (Mirrorless camera + iPhone)',
      '12 reels/month (cinematic, UGC, AI, educational)',
      '16 posts & 20 stories with polls & Q&A',
      '3 active Meta Ads campaigns',
      'Same-day hot lead sharing from DMs',
      'Bi-weekly update + monthly report',
    ],
  },
  {
    name: 'Elite',
    slug: 'elite',
    badge: 'Enterprise Dominance',
    monthlyPrice: 40000,
    priceDisplay: '₹40,000/month',
    minimumCommitment: 'Minimum 6 months',
    platforms: ['Instagram', 'Facebook', 'YouTube / LinkedIn', 'Google Business'],
    reelsCount: '16 reels/month',
    postsCount: '20 posts/month',
    storiesCount: '24 stories/month',
    shootsCount: '2 shoot days (up to 5h each)',
    metaAds: '3 campaigns (retargeting & lookalikes)',
    keyHighlights: [
      'Omnichannel: IG + FB + YT/LinkedIn + GBP',
      '2 shoot days/mo with camera crew & lights',
      '16 reels/month + 2 micro-influencer collabs',
      '20 posts & 24 interactive stories',
      '3 Meta Ads campaigns with custom lookalikes',
      'Full Brand & Market Strategy report (12-mo roadmap)',
      'Weekly progress touchpoint + executive report',
    ],
  },
];

export default function PackagesPage() {
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'shoots', 'ads'
  const { isAuthenticated, token, promptLogin, toggleSavePackage, isPackageSaved, trackEvent } = useCustomerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('package_card_view', { count: packages.length });

    async function loadPackages() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPackages(data.data);
        }
      } catch (err) {
        console.warn('Using fallback package catalog:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPackages();

    const handleFocus = () => loadPackages();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadPackages, 15000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [trackEvent]);

  // Handle More Details Click
  const handleMoreDetails = (pkg) => {
    trackEvent('package_details_click', { slug: pkg.slug, name: pkg.name });

    if (pkg.requiresLoginForDetails && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Create a free account or log in to unlock complete deliverables, shooting schedules, ad spend guides, and download the official ${pkg.name} Package PDF.`
      );
    } else {
      navigate(`/packages/${pkg.slug}`);
    }
  };

  // Handle PDF Download Click
  const handleDownloadPdf = async (pkg) => {
    if (pkg.requiresLoginForPdf && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Please log in or create an account to download the official ${pkg.name} Package PDF specification.`
      );
      return;
    }

    try {
      trackEvent('package_pdf_download', { slug: pkg.slug, name: pkg.name });
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/packages/${pkg.slug}/pdf`, { headers });
      if (!res.ok) {
        throw new Error('Failed to download PDF. Please log in.');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DigiBuddy4U_${pkg.name}_Package.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      promptLogin(pkg.slug, 'Authentication required to download this official package PDF.');
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'shoots') return pkg.shootsCount && pkg.shootsCount !== 'Not included';
    if (filter === 'ads') return pkg.metaAds && !pkg.metaAds.includes('optional');
    return true;
  });

  return (
    <>
      <SEO
        title="Packages & Pricing — Transparent Social Media Marketing"
        description="Explore DigiBuddy4U's 5 official packages: Basic, Standard, Growth, Pro, and Elite. Authentic deliverables, verified shoot hours, and transparent ad-spend rules."
      />

      {/* Header Banner */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Transparent Retainers.{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Zero Hidden Surprises.</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From essential consistent publishing to high-production camera shoots and omnichannel ad scaling. Read full inclusions, client requirements, and download individual PDF specifications.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-light text-slate-700 hover:text-navy-950 border border-slate-200'
              }`}
            >
              All 5 Packages
            </button>
            <button
              type="button"
              onClick={() => setFilter('shoots')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === 'shoots'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-light text-slate-700 hover:text-navy-950 border border-slate-200'
              }`}
            >
              With On-Location Shoots (Growth, Pro, Elite)
            </button>
            <button
              type="button"
              onClick={() => setFilter('ads')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === 'ads'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-light text-slate-700 hover:text-navy-950 border border-slate-200'
              }`}
            >
              With Meta Ads Included
            </button>
          </div>
        </div>
      </section>

      {/* Main Packages Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light min-h-[60vh]">
        <div className="site-container">
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading official packages..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
              {filteredPackages.map((pkg) => {
                const isFeatured = pkg.slug === 'growth';
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                return (
                  <div
                    key={pkg.slug}
                    className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                      isFeatured
                        ? 'bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 -translate-y-1 sm:-translate-y-2'
                        : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                    }`}
                  >
                    {/* Featured / Popular Badge */}
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-yellow text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3.5 h-3.5" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Top Bar: Title & Heart button */}
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant={isFeatured ? 'blue' : 'slate'} size="sm">
                            {pkg.badge || 'Monthly'}
                          </Badge>
                          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-900 mt-2">
                            {pkg.name}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleSavePackage(pkg.slug)}
                          title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            isSaved
                              ? 'bg-red-50 text-red-500 shadow-xs'
                              : 'bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Pricing Display */}
                      <div className="pt-1">
                        <div className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 tracking-tight">
                          {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/mo`}
                        </div>
                        {pkg.minimumCommitment && (
                          <div className="text-xs text-content-muted mt-1 font-medium">
                            {pkg.minimumCommitment}
                          </div>
                        )}
                        {pkg.alternativePriceDisplay && (
                          <div className="text-[11px] text-primary font-semibold mt-1">
                            {pkg.alternativePriceDisplay}
                          </div>
                        )}
                      </div>

                      {/* Platforms Badge Strip */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {(pkg.platforms || ['Instagram']).map((plat, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-navy-900"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>

                      {/* Deliverables Snapshot Metrics */}
                      <div className="grid grid-cols-2 gap-2 py-2 text-[11px] text-content-dark bg-surface-light rounded-xl p-2.5 border border-slate-200/60 font-medium">
                        <div>
                          <span className="text-content-muted block text-[10px]">Reels</span>
                          <strong className="text-navy-900">{pkg.reelsCount}</strong>
                        </div>
                        <div>
                          <span className="text-content-muted block text-[10px]">Posts</span>
                          <strong className="text-navy-900">{pkg.postsCount}</strong>
                        </div>
                        <div>
                          <span className="text-content-muted block text-[10px]">Stories</span>
                          <strong className="text-navy-900">{pkg.storiesCount}</strong>
                        </div>
                        <div>
                          <span className="text-content-muted block text-[10px]">Shoots</span>
                          <strong className="text-navy-900">{pkg.shootsCount}</strong>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-1 text-xs text-content-dark">
                        {(pkg.keyHighlights || []).slice(0, 6).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-5 mt-5 border-t border-slate-100 space-y-2.5">
                      <Button
                        type="button"
                        onClick={() => handleMoreDetails(pkg)}
                        variant={isFeatured ? 'yellow' : 'primary'}
                        size="md"
                        className="w-full justify-center font-bold text-xs"
                        icon={ArrowRight}
                      >
                        More Details
                      </Button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(pkg)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-primary" />
                        <span>Get Package PDF</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Monthly Workflow Timeline Strip from Page 2 of PDF */}
          <div className="mt-14 sm:mt-18 p-6 sm:p-10 rounded-3xl bg-white text-navy-950 border border-slate-200/90 shadow-card-soft">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <Badge variant="blue" size="sm">
                  Standard Operating Rhythm
                </Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-950 mt-1">
                  How Every Month Works With DigiBuddy4U
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Predictable 7-Stage Monthly Production Pipeline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase">
                  Days 1 to 3
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You send raw clips, photos, offers, and monthly goals in our shared drive.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-cyan-600 font-bold uppercase">
                  Days 3 to 10
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We prepare content calendar and ad plans. For Growth, Pro & Elite, on-location shoots take place.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase">
                  Days 10 to 24
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We edit reels, design posts/stories, and prepare ad creatives. You review with included revisions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-emerald-600 font-bold uppercase">
                  Days 24 to 30+
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We schedule, publish, optimize live Meta ads, and generate your monthly performance report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
