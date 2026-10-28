import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Heart,
  CheckCircle2,
  XCircle,
  Video,
  Layers,
  Camera,
  Calendar,
  Share2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  AlertCircle,
  MessageCircle,
  Mail,
  Phone,
  Lock,
  ChevronRight,
  FileText,
  Send,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { BRAND } from '../utils/brandConstants';
import { API_URL } from '../utils/api';

export default function PackageDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, customer, token, promptLogin, toggleSavePackage, isPackageSaved, trackEvent } = useCustomerAuth();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requiresLogin, setRequiresLogin] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    businessName: customer?.businessName || '',
    preferredContactMethod: 'whatsapp',
    message: '',
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');

  // Update enquiry form if customer logs in
  useEffect(() => {
    if (customer) {
      setEnquiryForm((prev) => ({
        ...prev,
        name: prev.name || customer.name || '',
        email: prev.email || customer.email || '',
        phone: prev.phone || customer.phone || '',
        businessName: prev.businessName || customer.businessName || '',
      }));
    }
  }, [customer]);

  useEffect(() => {
    async function loadPackage() {
      setLoading(true);
      setError('');
      try {
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}/packages/${slug}`, { headers });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Package not found.');
        }

        setPkg(data.data);
        setRequiresLogin(!!data.requiresLogin);

        if (!data.requiresLogin) {
          trackEvent('package_details_view', { slug: data.data.slug, name: data.data.name });
        }
      } catch (err) {
        setError(err.message || 'Failed to load package specification.');
      } finally {
        setLoading(false);
      }
    }

    loadPackage();
  }, [slug, token, trackEvent]);

  // Handle PDF Download
  const handleDownloadPdf = async () => {
    if (!isAuthenticated) {
      promptLogin(slug, `Please log in to download the official ${pkg?.name || ''} Package PDF.`);
      return;
    }

    setDownloadingPdf(true);
    try {
      trackEvent('package_pdf_download', { slug: pkg.slug, name: pkg.name });
      const headers = { Authorization: `Bearer ${token}` };
      const res = await fetch(`${API_URL}/packages/${slug}/pdf`, { headers });
      if (!res.ok) {
        throw new Error('Download failed. Please log in.');
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
      promptLogin(slug, 'Session expired or authentication required.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Handle Enquiry Submit
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    setEnquiryError('');

    try {
      trackEvent('package_enquiry_started', { slug: pkg?.slug, name: pkg?.name });
      const payload = {
        ...enquiryForm,
        packageSlug: pkg?.slug,
        packageName: pkg?.name,
      };

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/tracking/enquiry`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit consultation request.');
      }

      setEnquirySuccess(true);
      trackEvent('package_enquiry_submitted', { slug: pkg?.slug, name: pkg?.name });
    } catch (err) {
      setEnquiryError(err.message || 'Submission failed. Please try again or WhatsApp us directly.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-surface-light">
        <LoadingSpinner size="lg" text="Loading official package specification..." />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-surface-light">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-card-soft">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-xl font-heading font-bold text-navy-900">Package Not Found</h2>
          <p className="text-xs text-content-muted">{error || 'The requested package is unavailable.'}</p>
          <Button to="/packages" variant="primary" size="md">
            View All Packages
          </Button>
        </div>
      </div>
    );
  }

  const isSaved = isPackageSaved(pkg._id || pkg.slug);

  // LOCKED STATE: Visitor not logged in
  if (requiresLogin) {
    return (
      <>
        <SEO
          title={`${pkg.name} Package Specification — DigiBuddy4U`}
          description={`Log in to unlock full deliverables, shooting parameters, and PDF download for the ${pkg.name} package.`}
        />

        {/* Hero Banner Teaser */}
        <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-18 relative overflow-hidden border-b border-slate-100">
          <div className="site-container relative z-10 text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/packages" className="hover:text-primary transition-colors">Packages</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary font-semibold">{pkg.name}</span>
            </div>

            <Badge variant="blue" size="md" className="mb-3">
              Detailed Specification Locked
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-navy-950">
              {pkg.name} Package Details
            </h1>
            <p className="mt-3 text-lg font-bold text-primary">
              {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`}
            </p>
          </div>
        </section>

        {/* Locked Content Callout */}
        <section className="py-14 sm:py-20 bg-surface-light">
          <div className="site-container max-w-2xl text-center space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-extrabold text-navy-900">
                  Authentication Required
                </h3>
                <p className="text-sm text-content-muted leading-relaxed">
                  To view complete shooting limits, camera configurations, daily workflow schedules, client responsibilities, and to download the individual <strong>{pkg.name} Package PDF</strong>, please sign in or register a free account.
                </p>
              </div>

              {/* Public Highlights Teaser */}
              <div className="p-4 rounded-2xl bg-surface-light text-left space-y-2 text-xs text-navy-900">
                <span className="font-bold text-content-muted block uppercase tracking-wider text-[10px]">
                  Included Highlights:
                </span>
                {(pkg.keyHighlights || []).map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  type="button"
                  onClick={() =>
                    promptLogin(
                      pkg.slug,
                      `Log in or register to unlock full specifications, client deliverables, and download the ${pkg.name} PDF.`
                    )
                  }
                  variant="yellow"
                  size="lg"
                  className="w-full sm:w-auto font-bold justify-center"
                  icon={ArrowRight}
                >
                  Log In or Register to Unlock
                </Button>
                <Button to="/packages" variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                  Compare Other Packages
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // FULL UNLOCKED SPECIFICATION VIEW (Customer Authenticated)
  return (
    <>
      <SEO
        title={`${pkg.name} Package Specification — DigiBuddy4U`}
        description={`Complete specification for DigiBuddy4U ${pkg.name} Package. Monthly reels, static posts, camera shoots, Meta ads terms, and client responsibilities.`}
      />

      {/* Hero Header */}
      <section className="bg-white text-navy-950 py-10 sm:py-14 lg:py-16 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/packages" className="hover:text-primary transition-colors">Packages</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-semibold">{pkg.name} Package</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3">
                <Badge variant="blue" size="md">
                  {pkg.badge || 'Official Package'}
                </Badge>
                {pkg.minimumCommitment && (
                  <span className="text-xs text-slate-700 bg-surface-light border border-slate-200 px-3 py-1 rounded-full font-medium shadow-xs">
                    {pkg.minimumCommitment}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-navy-950 mt-2">
                {pkg.name} Package Specification
              </h1>

              <div className="flex flex-wrap items-baseline gap-3 mt-3">
                <span className="text-3xl sm:text-4xl font-heading font-black text-primary">
                  {pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`}
                </span>
                {pkg.alternativePriceDisplay && (
                  <span className="text-sm font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                    {pkg.alternativePriceDisplay}
                  </span>
                )}
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-heading font-bold text-sm hover:bg-primary-hover transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingPdf ? 'Generating PDF...' : 'Download Official PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSavePackage(pkg.slug)}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-navy-950 hover:border-slate-300 shadow-xs'
                }`}
                title={isSaved ? 'Saved in shortlist' : 'Save to shortlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <a
                href="#enquiry-form"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-yellow text-navy-950 font-heading font-bold text-sm hover:bg-accent-yellowHover transition-colors shadow-md"
              >
                <span>Request Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="site-container py-10 sm:py-14 space-y-12">
        {/* SECTION 1: Core Deliverables Matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
              1. Monthly Deliverables & Scope
            </h2>
            <span className="text-xs text-content-muted">Source: DigiBuddy4U Package Specification</span>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-card-soft overflow-hidden">
            <div className="divide-y divide-slate-100">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Platforms Covered</span>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-primary">
                  {(pkg.platforms || []).map((p, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Reels & Video Content</span>
                <div className="text-xs sm:text-sm text-content-dark space-y-1">
                  <strong className="text-navy-900 font-bold">{pkg.reelsCount}</strong>
                  {pkg.reelsDetails && <p className="text-content-muted">{pkg.reelsDetails}</p>}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Posts (Static & Carousels)</span>
                <div className="text-xs sm:text-sm text-content-dark space-y-1">
                  <strong className="text-navy-900 font-bold">{pkg.postsCount}</strong>
                  {pkg.postsDetails && <p className="text-content-muted">{pkg.postsDetails}</p>}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Stories & Highlights</span>
                <div className="text-xs sm:text-sm text-content-dark space-y-1">
                  <strong className="text-navy-900 font-bold">{pkg.storiesCount}</strong>
                  {pkg.storiesDetails && <p className="text-content-muted">{pkg.storiesDetails}</p>}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Shooting & Production</span>
                <div className="text-xs sm:text-sm text-content-dark space-y-1">
                  <strong className="text-navy-900 font-bold">{pkg.shootsCount}</strong>
                  {pkg.shootsDetails && <p className="text-content-muted">{pkg.shootsDetails}</p>}
                </div>
              </div>

              {pkg.influencerReels && pkg.influencerReels !== 'Not included' && (
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 bg-amber-50/50">
                  <span className="text-xs font-bold text-amber-900 w-48 flex-shrink-0">Influencer Collaborations</span>
                  <p className="text-xs sm:text-sm text-amber-900">{pkg.influencerReels}</p>
                </div>
              )}

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Copywriting & Keywords</span>
                <p className="text-xs sm:text-sm text-content-muted">{pkg.captionsAndHashtags || 'Captions & targeted hashtags'}</p>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Competitor & Market Study</span>
                <p className="text-xs sm:text-sm text-content-muted">{pkg.competitorCaseStudy}</p>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Meta Advertising</span>
                <div className="text-xs sm:text-sm text-content-dark space-y-1">
                  <p className="text-navy-900 font-semibold">{pkg.metaAds}</p>
                  {pkg.minSuggestedAdBudget && (
                    <p className="text-primary font-bold text-xs">Suggested Ad Budget: {pkg.minSuggestedAdBudget}</p>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Comments & DM Handling</span>
                <p className="text-xs sm:text-sm text-content-muted">{pkg.commentsAndDMs}</p>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Creative Revisions</span>
                <p className="text-xs sm:text-sm text-content-muted">{pkg.revisions}</p>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <span className="text-xs font-bold text-navy-900 w-48 flex-shrink-0">Reporting & Reviews</span>
                <p className="text-xs sm:text-sm text-content-muted">{pkg.reporting}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Inclusions vs Exclusions */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
            2. Scope Clarity: Inclusions vs. Exclusions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left: Inclusions */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-heading font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Everything Included in {pkg.name}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-content-dark">
                {(pkg.fullInclusions || pkg.keyHighlights || []).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Exclusions */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-heading font-bold text-base">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>What Is Not Included</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-content-dark">
                {(pkg.exclusions || []).map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-content-muted">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: Client Responsibilities */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
            3. What We Need From You
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
            <p className="text-xs sm:text-sm text-content-dark font-medium">
              Smooth marketing depends on timely collaboration. To keep our monthly schedule on track, we require:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-content-dark">
              {(pkg.clientRequirements || []).map((req, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-primary/10 flex items-start gap-2.5 shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                    {i + 1}
                  </div>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Standard Monthly Rhythm */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
            4. Monthly Execution Timeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(pkg.monthlyWorkflow || []).map((step, sIdx) => (
              <div key={sIdx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase text-primary bg-primary/10 px-2.5 py-0.5 rounded-md inline-block">
                  {step.dayRange}
                </span>
                <p className="text-xs text-content-dark leading-relaxed font-medium">
                  {step.activity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Terms & Conditions from PDF */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 border border-slate-200/80 space-y-3">
          <h3 className="text-base font-bold font-heading text-navy-900">
            Important Terms for All DigiBuddy4U Packages
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-content-muted">
            {(pkg.generalTerms || []).map((term, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 6: Consultation Enquiry Form */}
        <section id="enquiry-form" className="p-6 sm:p-10 rounded-3xl bg-white text-navy-950 border border-slate-200/90 shadow-card-soft space-y-6">
          <div className="max-w-2xl space-y-2">
            <Badge variant="blue" size="sm">
              Package Consultation
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
              Ready to Lock In the {pkg.name} Package?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your brand details below. Our senior strategist will review your requirements, confirm shooting schedules, and dispatch the service agreement.
            </p>
          </div>

          {enquirySuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">Consultation Request Received!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you! We have logged your request for the <strong>{pkg.name} Package</strong>. Our strategist will review your brand details and reach out within 24 business hours.
              </p>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              {enquiryError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-700">
                  {enquiryError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-slate-200 text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-slate-200 text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="name@business.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-slate-200 text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={enquiryForm.businessName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, businessName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-slate-200 text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. RotiWala"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Contact Channel
                </label>
                <div className="flex gap-4 text-xs text-slate-700 font-medium">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={enquiryForm.preferredContactMethod === 'whatsapp'}
                      onChange={() => setEnquiryForm({ ...enquiryForm, preferredContactMethod: 'whatsapp' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={enquiryForm.preferredContactMethod === 'phone'}
                      onChange={() => setEnquiryForm({ ...enquiryForm, preferredContactMethod: 'phone' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span>Phone Call</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={enquiryForm.preferredContactMethod === 'email'}
                      onChange={() => setEnquiryForm({ ...enquiryForm, preferredContactMethod: 'email' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brand Goals / Current Social Handles <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  placeholder={`Tell us about your brand, current follower count, location, target audience, and when you wish to begin the ${pkg.name} Package...`}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-slate-200 text-navy-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Button
                  type="submit"
                  variant="yellow"
                  size="lg"
                  disabled={enquirySubmitting}
                  className="w-full sm:w-auto font-bold justify-center"
                  icon={Send}
                >
                  {enquirySubmitting ? 'Submitting...' : `Submit Request for ${pkg.name}`}
                </Button>

                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25D366] hover:underline inline-flex items-center gap-1.5 font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Prefer instant chat? Talk to our strategist on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
