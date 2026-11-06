import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight, Download, Heart, Layers, Video, Camera, Share2 } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import PackageEnquiryChoiceModal from '../components/packages/PackageEnquiryChoiceModal';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { API_URL } from '../utils/api';

// Official Social Media Management Packages
const DEFAULT_PACKAGES = [
  {
    name: 'Basic',
    slug: 'basic',
    badge: 'Starter SMM',
    monthlyPrice: 5000,
    priceDisplay: '₹5,000/month',
    minimumCommitment: 'Monthly',
    platforms: ['1 Social Media Platform'],
    postsCount: '6 Posts',
    reelsCount: '3 Reels',
    keyHighlights: [
      '6 Posts',
      '3 Reels',
      '1 Social Media Platform',
      'Caption Writing',
      'Hashtag Research',
      'Content Writing',
      'Social Media Account Audit',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    badge: 'Most Popular',
    monthlyPrice: 10000,
    priceDisplay: '₹10,000/month',
    minimumCommitment: 'Monthly',
    platforms: ['Instagram', 'Facebook'],
    postsCount: '10 Posts',
    reelsCount: '10 Reels',
    isFeatured: true,
    keyHighlights: [
      '10 Posts',
      '10 Reels',
      '6 Carousel Posts',
      'Instagram + Facebook Management',
      'Profile Optimization for Both Platforms',
      'Caption Writing',
      'Hashtag Research',
      'Content Writing',
      'Monthly Content Planning',
    ],
  },
  {
    name: 'Premium',
    slug: 'premium',
    badge: 'Full Production',
    monthlyPrice: 20000,
    priceDisplay: '₹20,000/month',
    minimumCommitment: 'Monthly',
    platforms: ['Instagram', 'Facebook'],
    postsCount: '15 Posts',
    reelsCount: '10 Reels',
    shootsCount: '1 Professional Shoot Day',
    keyHighlights: [
      '15 Posts',
      '10 Reels',
      '3 Carousel Posts',
      '2 Meme Creatives',
      '1 Professional Shoot Day at Client Location by Our Team',
      'Instagram + Facebook Management',
      'Caption Writing',
      'Hashtag Research',
      'Content Writing',
      'Monthly Content Calendar',
    ],
  },
];

export default function PricingPreviewSection() {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [loading, setLoading] = useState(true);
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

  // Load packages from API with auto-fallback
  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPackages(json.data);
        }
      } catch (err) {
        // Fallback silently to DEFAULT_PACKAGES
      } finally {
        if (isMounted) setLoading(false);
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
    if (pkg.requiresLoginForDetails && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Create a free account or log in to unlock complete deliverables, shooting schedules, and download the official ${pkg.name} Package PDF.`
      );
    } else {
      navigate(`/packages/${pkg.slug}`);
    }
  };

  const handleDownloadPdf = async (pkg, e) => {
    e?.stopPropagation();
    trackEvent?.('package_pdf_download_click', { slug: pkg.slug, name: pkg.name });

    if (pkg.requiresLoginForPdf && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Please log in or create an account to download the official ${pkg.name} Package PDF specification.`
      );
      return;
    }

    try {
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

  // Filter packages for display (display Basic, Growth, Premium)
  const displayedPackages = packages.filter(
    (pkg) => pkg.showOnHome !== false && pkg.isPublished !== false
  );

  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-24 bg-surface-light relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Social Media Management"
          badgeVariant="blue"
          title="Social Media Management"
          titleHighlight="Packages"
          description="Consistent, high-impact content production and community growth designed to scale your brand presence across social platforms."
          align="center"
        />

        {/* 3 Modern Social Media Packages Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {displayedPackages.map((pkg) => {
            const isFeatured = pkg.isFeatured || pkg.slug === 'growth';
            const isSaved = isPackageSaved(pkg._id || pkg.slug);

            return (
              <div
                key={pkg.slug}
                className={`rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  isFeatured
                    ? 'bg-white border-2 border-primary shadow-2xl ring-4 ring-primary/10 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                }`}
              >
                {/* Most Popular Badge on Growth Package */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-yellow text-navy-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Top Bar: Badge & Shortlist Heart */}
                  <div className="flex items-center justify-between">
                    <Badge variant={isFeatured ? 'blue' : 'slate'} size="sm">
                      {pkg.badge || (isFeatured ? 'Most Popular' : 'Monthly Retainer')}
                    </Badge>

                    <button
                      type="button"
                      onClick={() => toggleSavePackage(pkg.slug)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isSaved
                          ? 'bg-red-50 text-red-500 shadow-xs'
                          : 'bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                      title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
                      aria-label="Save to shortlist"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Package Title & Price */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 tracking-tight">
                      {pkg.name}
                    </h3>
                    <div className="text-3xl sm:text-4xl font-heading font-black text-navy-900 mt-2 tracking-tight">
                      {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`}
                    </div>
                    <span className="text-xs text-content-muted block mt-1 font-medium">
                      Billed monthly &bull; Guaranteed deliverables
                    </span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm text-content-dark">
                    {(pkg.keyHighlights || []).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug font-medium text-navy-900">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Clear "Get Started" CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                  <Button
                    type="button"
                    onClick={() => handleGetStarted(pkg)}
                    variant={isFeatured ? 'yellow' : 'primary'}
                    size="lg"
                    className="w-full justify-center font-heading font-bold text-sm shadow-md transition-all active:scale-98"
                    icon={ArrowRight}
                  >
                    Get Started
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCardClick(pkg)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors"
                    >
                      <span>Full Scope</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDownloadPdf(pkg, e)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors"
                      title={`Download official ${pkg.name} Package PDF`}
                    >
                      <Download className="w-3.5 h-3.5 text-primary" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA navigation strip */}
        <div className="mt-12 sm:mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/packages"
            variant="outlinePrimary"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto font-bold"
          >
            Compare All 3 Packages & Full Scope
          </Button>

          <a
            href="#addons"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-heading font-bold text-sm transition-all"
          >
            <span>Explore 15 Add-Ons & Extras ↓</span>
          </a>

          <Button
            to="/contact"
            variant="yellow"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto font-bold"
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
