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
import AddonsSection from '../components/addons/AddonsSection';
import PackageEnquiryChoiceModal from '../components/packages/PackageEnquiryChoiceModal';

// 3 Official Social Media Management Packages
const FALLBACK_PACKAGES = [
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
    shootsCount: 'Not included',
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
    shootsCount: 'Not included',
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

export default function PackagesPage() {
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
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

  useEffect(() => {
    let isMounted = true;
    async function fetchPackages() {
      try {
        const res = await fetch(`${API_URL}/packages`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPackages(json.data);
        }
      } catch (err) {
        // Fallback already in place
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
    if (pkg.requiresLoginForDetails && !isAuthenticated) {
      promptLogin(
        pkg.slug,
        `Create a free client account or log in to unlock full scope deliverables, shoot schedules, and official ${pkg.name} Package PDF.`
      );
    } else {
      navigate(`/packages/${pkg.slug}`);
    }
  };

  const handleDownloadPdf = async (pkg) => {
    trackEvent?.('package_page_pdf_download_click', { slug: pkg.slug, name: pkg.name });
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
      if (!res.ok) throw new Error('Failed to download PDF.');

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

  const displayedPackages = packages.filter((p) => p.isPublished !== false);

  return (
    <>
      <SEO
        title="Social Media Management Packages — Transparent Retainers"
        description="Choose from DigiBuddy4U's official Social Media Management Packages: Basic (₹5,000/mo), Growth (₹10,000/mo - Most Popular), and Premium (₹20,000/mo)."
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
            Social Media Management{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Consistent content creation, strategic hashtag research, and dedicated community growth. Fixed monthly retainers with guaranteed deliverables and zero hidden costs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> Guaranteed Monthly Deliverables
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> Professional Copywriting & Research
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              <Check className="w-4 h-4 text-primary" /> No Lock-in Contracts
            </span>
          </div>
        </div>
      </section>

      {/* Main Social Media Management Packages Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light min-h-[60vh]">
        <div className="site-container">
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading official packages..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
              {displayedPackages.map((pkg) => {
                const isFeatured = pkg.isFeatured || pkg.slug === 'growth';
                const isSaved = isPackageSaved(pkg._id || pkg.slug);

                return (
                  <div
                    key={pkg.slug}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                      isFeatured
                        ? 'bg-white border-2 border-primary shadow-2xl ring-4 ring-primary/10 lg:-translate-y-2'
                        : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                    }`}
                  >
                    {/* Most Popular Badge */}
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-yellow text-navy-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="space-y-5">
                      {/* Top Bar: Title & Heart button */}
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant={isFeatured ? 'blue' : 'slate'} size="sm">
                            {pkg.badge || 'Monthly'}
                          </Badge>
                          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 mt-2 tracking-tight">
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
                        <div className="text-3xl sm:text-4xl font-heading font-black text-navy-900 tracking-tight">
                          {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`}
                        </div>
                        <div className="text-xs text-content-muted mt-1 font-medium">
                          Billed monthly &bull; Minimum 1 month commitment
                        </div>
                      </div>

                      {/* Platforms Badge Strip */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {(pkg.platforms || ['Instagram']).map((plat, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-navy-900"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>

                      {/* Bullet Highlights Checklist */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-content-dark">
                        {(pkg.keyHighlights || []).map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span className="leading-snug font-medium text-navy-900">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
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
                          onClick={() => handleMoreDetails(pkg)}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors"
                        >
                          <span>Full Scope</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(pkg)}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-primary" />
                          <span>PDF Spec</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Standard Operating Workflow Strip */}
          <div className="mt-14 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-white text-navy-950 border border-slate-200/90 shadow-card-soft max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <Badge variant="blue" size="sm">
                  Monthly Rhythm
                </Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-950 mt-1">
                  How Every Month Works With DigiBuddy4U
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Structured 5-Stage Monthly Social Media Execution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase">
                  Days 1 to 3 &bull; Input
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You share monthly offers, goals, product details, and raw media in our shared drive.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-cyan-600 font-bold uppercase">
                  Days 3 to 7 &bull; Plan
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We prepare the content calendar, copy, and scripts. For Premium, shoot day takes place.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-primary font-bold uppercase">
                  Days 7 to 20 &bull; Create
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We edit reels, design posts & carousels, and submit for client review and revisions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono text-emerald-600 font-bold uppercase">
                  Days 20 to 30+ &bull; Publish
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scheduled publishing at peak times, account optimization, and monthly analytics review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A La Carte Add-Ons & Extra Services Section */}
      <AddonsSection />

      {/* Choice Modal: Enquire on WhatsApp vs Website */}
      <PackageEnquiryChoiceModal
        isOpen={Boolean(enquiryModalPkg)}
        onClose={() => setEnquiryModalPkg(null)}
        pkg={enquiryModalPkg}
      />
    </>
  );
}
