import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight, Download, Heart } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { API_URL } from '../utils/api';

// 5 Official packages from PDF
const DEFAULT_PACKAGES = [
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
    metaAds: '+₹1,000/mo optional',
    keyHighlights: [
      'Instagram focus (2–3 reels + 8 posts)',
      '1 revision per item',
      'Starting 1-page Mini Snapshot competitor study',
      'Basic monthly reach & follower report',
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
    metaAds: '1 active campaign included',
    keyHighlights: [
      'Instagram + Facebook management',
      '4 reels/month (3 clips + 1 AI)',
      '1 active Meta Ads campaign included',
      '2–3 page Competitor Study',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    badge: 'Most Popular',
    monthlyPrice: 20000,
    priceDisplay: '₹20,000/month',
    alternativePriceDisplay: '₹15,000 without ads',
    minimumCommitment: 'Minimum 3 months',
    platforms: ['Instagram', 'Facebook'],
    reelsCount: '8 reels/month',
    postsCount: '12 posts/month',
    shootsCount: '1 shoot day (up to 3-4h)',
    metaAds: '2 active campaigns included',
    isFeatured: true,
    keyHighlights: [
      '1 on-location shoot day/mo in Ahmedabad',
      '8 reels & 12 posts & 16 stories',
      '2 active Meta Ads campaigns',
      'Weekday comments & DM management',
      '5–6 page Market Position Case Study',
    ],
  },
  {
    name: 'Pro',
    slug: 'pro',
    badge: 'Multi-Channel Scale',
    monthlyPrice: 30000,
    priceDisplay: '₹30,000/month',
    alternativePriceDisplay: '₹25,000 without ads',
    minimumCommitment: 'Minimum 6 months',
    platforms: ['Instagram', 'Facebook', 'YouTube / LinkedIn'],
    reelsCount: '12 reels/month',
    postsCount: '16 posts/month',
    shootsCount: '2 shoot days (Camera + iPhone)',
    metaAds: '3 active campaigns included',
    keyHighlights: [
      '3 channels: IG + FB + YouTube/LinkedIn',
      '2 shoot days/mo (Camera crew + iPhone)',
      '12 reels/month + 16 posts',
      '3 active Meta Ads campaigns',
      'Competitor ad tracking & ideal buyer profile',
    ],
  },
  {
    name: 'Elite',
    slug: 'elite',
    badge: 'Enterprise Scale',
    monthlyPrice: 40000,
    priceDisplay: '₹40,000/month',
    minimumCommitment: 'Minimum 6 months',
    platforms: ['Instagram', 'Facebook', 'YouTube', 'Google Business'],
    reelsCount: '16 reels/month',
    postsCount: '20 posts/month',
    shootsCount: '2 shoot days (up to 5h each)',
    metaAds: '3 campaigns (retargeting & lookalikes)',
    keyHighlights: [
      'Omnichannel: IG + FB + YT + GBP',
      '2 full production shoot days/mo (5h each)',
      '16 reels + 2 micro-influencer collabs',
      '3 Meta Ads campaigns with custom lookalikes',
      'Full Brand & Market Strategy 12-mo roadmap',
    ],
  },
];

export default function PricingPreviewSection() {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const { isAuthenticated, promptLogin, toggleSavePackage, isPackageSaved } = useCustomerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPackages(data.data);
        }
      } catch (e) {
        // Fallback default
      }
    }

    load();

    // Auto-update whenever user refocuses / switches to website tab from Admin
    const handleFocus = () => load();
    window.addEventListener('focus', handleFocus);

    // Also periodic poll every 15s to keep live data in sync with Admin panel
    const interval = setInterval(load, 15000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const handleCardClick = (pkg) => {
    if (pkg.requiresLoginForDetails && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Create a free account or log in to unlock complete deliverables, shooting schedules, ad spend guides, and download the official ${pkg.name} Package PDF.`
      );
    } else {
      navigate(`/packages/${pkg.slug}`);
    }
  };

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-surface-light">
      <div className="site-container">
        <SectionHeader
          badge="Packages & Pricing"
          badgeVariant="blue"
          title="Digital Growth Packages Designed for"
          titleHighlight="Measurable Impact"
          description="Source of truth pricing based on authentic shoot hours, verified deliverables, and transparent ad-spend rules. Zero hidden retainers."
          align="center"
        />

        {/* Homepage Packages Grid (Filtered by Admin Show On Home selection) */}
        {(() => {
          const displayedPackages = packages.filter(
            (pkg) => pkg.showOnHome !== false && pkg.isPublished !== false
          );

          if (displayedPackages.length === 0) {
            return (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <p className="text-sm text-content-muted">No packages currently selected for homepage preview.</p>
                <Link to="/packages" className="text-xs font-bold text-primary hover:underline mt-2 inline-block">
                  View Full Packages Catalog →
                </Link>
              </div>
            );
          }

          const gridCols =
            displayedPackages.length === 1
              ? 'max-w-md mx-auto grid-cols-1'
              : displayedPackages.length === 2
              ? 'max-w-3xl mx-auto grid-cols-1 md:grid-cols-2'
              : displayedPackages.length === 3
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
              : displayedPackages.length === 4
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';

          return (
            <div className={`grid ${gridCols} gap-5 sm:gap-6 items-stretch`}>
              {displayedPackages.map((pkg) => {
                const isFeatured = pkg.isFeatured || pkg.slug === 'growth';
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                return (
                  <div
                    key={pkg.slug}
                    className={`rounded-3xl p-6 sm:p-6.5 flex flex-col justify-between transition-all duration-300 relative ${
                      isFeatured
                        ? 'bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 -translate-y-1 sm:-translate-y-2'
                        : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                    }`}
                  >
                {/* Most Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-yellow text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <Badge variant={isFeatured ? 'blue' : 'slate'} size="sm">
                      {pkg.badge || 'Package'}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => toggleSavePackage(pkg.slug)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-red-500' : 'text-slate-300 hover:text-red-500'
                      }`}
                      title={isSaved ? 'Saved' : 'Save to shortlist'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-navy-900">
                      {pkg.name}
                    </h3>
                    <div className="text-2xl font-black font-heading text-navy-900 mt-1">
                      {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/mo`}
                    </div>
                    {pkg.minimumCommitment && (
                      <span className="text-[11px] text-content-muted block mt-0.5">
                        {pkg.minimumCommitment}
                      </span>
                    )}
                    {pkg.alternativePriceDisplay && (
                      <span className="text-[10px] text-primary font-bold block mt-0.5">
                        {pkg.alternativePriceDisplay}
                      </span>
                    )}
                  </div>

                  {/* Highlights list */}
                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-content-dark">
                    {(pkg.keyHighlights || []).slice(0, 4).map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                  <Button
                    type="button"
                    onClick={() => handleCardClick(pkg)}
                    variant={isFeatured ? 'yellow' : 'primary'}
                    size="sm"
                    className="w-full justify-center text-xs font-bold"
                    icon={ArrowRight}
                  >
                    More Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    })()}

        {/* Bottom CTA to Full Comparison Page */}
        <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/packages"
            variant="outlinePrimary"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto font-bold"
          >
            Compare All 5 Packages & Download PDFs
          </Button>
        </div>
      </div>
    </section>
  );
}
