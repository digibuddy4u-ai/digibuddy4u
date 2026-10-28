import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Code2,
  Share2,
  Palette,
  Video,
  Search,
  PenTool,
  Bot,
  Layout,
  Layers,
  Smartphone,
  Cpu,
  ShoppingBag,
  Wrench,
  Compass,
  Check,
  Building,
  Target,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { BRAND } from '../utils/brandConstants';
import { FALLBACK_SERVICES } from '../utils/servicesCatalog';
import { api } from '../utils/api';

const ICON_MAP = {
  Share2,
  TrendingUp,
  Palette,
  Video,
  Search,
  PenTool,
  Bot,
  Layout,
  Layers,
  Smartphone,
  Cpu,
  ShoppingBag,
  Wrench,
  Code2,
  Compass,
};

function getServiceIcon(iconName, defaultIcon = Layers) {
  return ICON_MAP[iconName] || defaultIcon;
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSubServiceIndex, setActiveSubServiceIndex] = useState(0);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch service data by slug from backend
  useEffect(() => {
    let isMounted = true;
    async function loadService() {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/services/${slug}`);
        if (isMounted) {
          if (res.success && res.data) {
            setService(res.data);
            setFormData((prev) => ({ ...prev, service: res.data.title }));
          } else {
            // Check fallback catalogue
            const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
            if (fallback) {
              setService(fallback);
              setFormData((prev) => ({ ...prev, service: fallback.title }));
            } else {
              setError('Service not found.');
            }
          }
        }
      } catch (err) {
        // Fallback
        const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
        if (isMounted) {
          if (fallback) {
            setService(fallback);
            setFormData((prev) => ({ ...prev, service: fallback.title }));
          } else {
            setError('Unable to load service details. Please try again.');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadService();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitSuccess(false);
    setActiveSubServiceIndex(0);
  }, [slug]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please enter your Name, Email, and Message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        service: formData.service || service?.title || 'General Enquiry',
        message: formData.message.trim(),
      });

      if (res.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: service?.title || '',
          message: '',
        });
      } else {
        setFormError(res.message || 'Failed to submit enquiry. Please try again or WhatsApp us.');
      }
    } catch (err) {
      setFormError(err.message || 'Unable to submit enquiry. Please reach out directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-24">
        <LoadingSpinner size="lg" text="Loading service details..." />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
          Service Not Found
        </h2>
        <p className="text-content-muted">
          We couldn't find the requested service under <code className="text-primary font-mono font-bold">/services/{slug}</code>.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button to="/services" variant="primary">
            Browse All Services
          </Button>
          <Button to="/" variant="secondary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = getServiceIcon(service.icon, Layers);
  const activeSubServices = Array.isArray(service.subServices) ? service.subServices : [];
  const currentSub = activeSubServices[activeSubServiceIndex] || activeSubServices[0];
  const isMarketing = service.categorySlug === 'digital-marketing';

  const whatsappMessage = encodeURIComponent(
    `Hi DigiBuddy4U, I am interested in discussing your "${service.title}" service for my business.`
  );
  const serviceWhatsAppUrl = `https://wa.me/916352478028?text=${whatsappMessage}`;

  return (
    <>
      <SEO
        title={service.seo?.title || `${service.title} | DigiBuddy4U`}
        description={service.seo?.metaDescription || service.shortDescription}
        canonicalUrl={`/services/${service.slug}`}
      />

      {/* HERO SECTION */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Action */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb & Category Badge */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="text-slate-400">/</span>
                <Link to="/services" className="text-slate-500 hover:text-primary transition-colors">
                  Services
                </Link>
                <span className="text-slate-400">/</span>
                <Link
                  to={`/services?category=${service.categorySlug}`}
                  className="text-primary hover:underline font-semibold"
                >
                  {service.categoryName || (isMarketing ? 'Digital Marketing' : 'IT Services')}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-navy-950 leading-tight">
                {service.title}
              </h1>

              {/* Tagline / Highlight */}
              {service.highlight && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold shadow-xs">
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{service.highlight}</span>
                </div>
              )}

              {/* Full Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {service.fullDescription || service.shortDescription}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-yellow text-navy-950 font-heading font-bold text-sm shadow-md hover:bg-yellow-400 transition-colors"
                >
                  <span>Discuss This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={serviceWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm hover:bg-[#20ba59] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Transparent Scopes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Customized to Your Stage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Direct Partner Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Overview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-surface-light border border-slate-200/90 p-7 shadow-card-soft space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500">Service Blueprint</div>
                      <div className="text-sm font-bold text-navy-950 font-heading">{service.title}</div>
                    </div>
                  </div>
                  <Badge variant={isMarketing ? 'blue' : 'cyan'} size="sm">
                    {service.categoryName || 'Active'}
                  </Badge>
                </div>

                {/* Sub-services count & quick pills */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-navy-950 uppercase tracking-wider flex items-center justify-between">
                    <span>Available Sub-Services:</span>
                    <span className="text-primary font-bold">{activeSubServices.length} Total</span>
                  </div>
                  <div className="space-y-2">
                    {activeSubServices.slice(0, 5).map((sub, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs"
                      >
                        <span className="text-navy-950 font-medium">
                          {typeof sub === 'string' ? sub : (sub?.name || '')}
                        </span>
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                    ))}
                    {activeSubServices.length > 5 && (
                      <div className="text-[11px] text-center text-slate-500 pt-1 font-medium">
                        + {activeSubServices.length - 5} additional specialized sub-modules
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick note on genuine delivery */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 leading-relaxed shadow-xs">
                  Deliverables and posting cadences are customized according to your package and target growth velocity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-SERVICES & DELIVERABLES EXPLORER */}
      {activeSubServices.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
          <div className="site-container">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
              <Badge variant="blue">Full Scope Breakdown</Badge>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900">
                What This Service Includes & Sub-Services
              </h2>
              <p className="text-content-muted text-sm sm:text-base">
                Click on any sub-service to inspect the specific deliverables, processes, and strategic advantages we provide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sub-Service Navigation List (Left 5 Cols) */}
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-bold text-navy-900 uppercase tracking-wider px-3 pb-1">
                  Select a Sub-Service ({activeSubServices.length}):
                </div>
                {activeSubServices.map((sub, idx) => {
                  const isSelected = idx === activeSubServiceIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSubServiceIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                        isSelected
                          ? 'bg-navy-950 text-white border-navy-950 shadow-md translate-x-1'
                          : 'bg-surface-light text-navy-900 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                          {typeof sub === 'string' ? sub : (sub?.name || '')}
                        </div>
                        {sub.shortDescription && (
                          <div
                            className={`text-xs mt-0.5 truncate ${
                              isSelected ? 'text-slate-300' : 'text-content-muted'
                            }`}
                          >
                            {sub.shortDescription}
                          </div>
                        )}
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 transition-transform ${
                          isSelected ? 'text-accent-yellow translate-x-1' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Sub-Service Details Panel (Right 7 Cols) */}
              <div className="lg:col-span-7">
                {currentSub ? (
                  <div className="rounded-3xl bg-surface-light border border-slate-200/90 p-8 sm:p-10 shadow-card-soft space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Sub-Service #{activeSubServiceIndex + 1}
                        </span>
                        <h3 className="text-2xl font-heading font-extrabold text-navy-900 mt-1">
                          {currentSub.name}
                        </h3>
                      </div>
                      <Badge variant="yellow" size="sm">
                        Available
                      </Badge>
                    </div>

                    <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                      {currentSub.detailedDescription || currentSub.shortDescription || 'Tailored implementation aligned with your brand standards and growth targets.'}
                    </p>

                    {/* Deliverables List */}
                    {Array.isArray(currentSub.deliverables) && currentSub.deliverables.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>Key Deliverables & Inclusions:</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentSub.deliverables.map((del, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-2.5 text-xs text-navy-900 font-medium"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits List */}
                    {Array.isArray(currentSub.benefits) && currentSub.benefits.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-accent-yellow" />
                          <span>Commercial Benefits:</span>
                        </h4>
                        <div className="space-y-2">
                          {currentSub.benefits.map((ben, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2.5 text-xs text-content-muted">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span>{ben}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disclaimer Note */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 leading-relaxed">
                      <strong>Note:</strong> Deliverable frequencies and specific deliverables vary depending on the chosen package. Inquire below to build a customized scope.
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-content-muted">Select a sub-service to inspect details.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROBLEMS SOLVED & COMMERCIAL BENEFITS */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Problems this service solves */}
            <div className="space-y-6">
              <Badge variant="yellow">Pain Points We Eliminate</Badge>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 leading-snug">
                Challenges This Service <span className="text-primary">Solves For You</span>
              </h2>
              <p className="text-sm text-content-muted leading-relaxed">
                Many businesses struggle with wasted ad spend, flat social engagement, or clunky technical software. Here is what we fix:
              </p>

              <div className="space-y-3 pt-2">
                {Array.isArray(service.problemsSolved) && service.problemsSolved.length > 0 ? (
                  service.problemsSolved.map((prob, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-navy-900 leading-relaxed">
                        {prob}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs text-content-muted">
                    Eliminates marketing bottlenecks, technical roadblocks, and inconsistent brand execution.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Benefits & Business Use Cases */}
            <div className="space-y-6">
              <Badge variant="blue">Commercial Outcomes</Badge>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 leading-snug">
                Tangible Benefits & <span className="text-cyan-hover">Business Value</span>
              </h2>
              <p className="text-sm text-content-muted leading-relaxed">
                We design every deliverable to move commercial needles—increasing inquiries, improving margins, and establishing market leadership.
              </p>

              <div className="space-y-3 pt-2">
                {Array.isArray(service.benefits) && service.benefits.length > 0 ? (
                  service.benefits.map((ben, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-navy-900 leading-relaxed">
                        {ben}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs text-content-muted">
                    Drives higher brand recognition, streamlined user operations, and predictable inquiry flow.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Suitable Industries Pills */}
          {Array.isArray(service.targetIndustries) && service.targetIndustries.length > 0 && (
            <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-navy-900">
                  Ideal For These Industries & Business Types:
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {service.targetIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-surface-light border border-slate-200 text-xs font-semibold text-navy-900"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* OUR 4-STEP WORKING PROCESS */}
      {Array.isArray(service.processSteps) && service.processSteps.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
          <div className="site-container">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
              <Badge variant="blue">Our Methodology</Badge>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900">
                How We Execute This Service
              </h2>
              <p className="text-content-muted text-sm sm:text-base">
                A predictable, transparent 4-stage process designed to eliminate surprises and maintain continuous momentum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-surface-light border border-slate-200/90 p-7 shadow-xs hover:shadow-card-hover transition-all space-y-4 relative"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white font-heading font-black text-lg flex items-center justify-center shadow-xs">
                    0{step.stepNumber || idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-navy-900">{step.title}</h3>
                    <p className="text-xs text-content-muted mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE SPECIFIC FAQS */}
      {Array.isArray(service.faqs) && service.faqs.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
          <div className="site-container max-w-4xl xl:max-w-5xl">
            <div className="text-center mb-8 sm:mb-10 space-y-3">
              <Badge variant="cyan">Frequently Asked Questions</Badge>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-navy-900">
                Common Questions About {service.title}
              </h2>
              <p className="text-content-muted text-sm">
                Honest, straightforward answers with zero fabricated guarantees.
              </p>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-bold text-navy-900 text-sm sm:text-base hover:text-primary transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-content-muted leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ENQUIRY & CONTACT SECTION WITH PRESELECTED SERVICE */}
      <section id="enquiry-form" className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left: Contact Info & Value Prop */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="yellow">Start The Conversation</Badge>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-900 leading-tight">
                Request a Consultation for{' '}
                <span className="text-primary">{service.title}</span>
              </h2>
              <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                Fill out the brief inquiry form and our lead strategist will respond with specific ideas, package estimates, and a tailored action plan.
              </p>

              <div className="pt-4 space-y-4">
                <a
                  href={serviceWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-surface-light border border-slate-200 hover:border-[#25D366] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-content-muted">Quickest Response Channel:</div>
                    <div className="text-sm font-bold text-navy-900 group-hover:text-[#25D366] transition-colors">
                      Chat on WhatsApp (+91 63524 78028)
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-surface-light border border-slate-200 hover:border-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-content-muted">Official Email Address:</div>
                    <div className="text-sm font-bold text-navy-900 group-hover:text-primary transition-colors">
                      {BRAND.email}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Dynamic Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-surface-light border border-slate-200/90 p-8 sm:p-10 shadow-card-soft">
                {submitSuccess ? (
                  <div className="text-center py-8 space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-navy-900">
                      Enquiry Received!
                    </h3>
                    <p className="text-sm text-content-muted max-w-md mx-auto">
                      Thank you for your interest in <strong>{service.title}</strong>. Our team will review your requirements and reach out promptly via WhatsApp or email.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold font-heading text-navy-900 pb-2 border-b border-slate-200">
                      Service Enquiry Form
                    </h3>

                    {formError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="rahul@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1">
                          Business / Brand Name (Optional)
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          placeholder="e.g. RotiWala Express"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Preselected Service Field */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">
                        Selected Service
                      </label>
                      <input
                        type="text"
                        name="service"
                        readOnly
                        value={formData.service}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-navy-900 font-bold text-sm cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">
                        How can we help your business? *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your brand goals, target audience, current bottlenecks, or desired timeline..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        className="w-full justify-center font-bold"
                        icon={Send}
                      >
                        {submitting ? 'Submitting Enquiry...' : 'Submit Service Enquiry'}
                      </Button>
                    </div>

                    <p className="text-[11px] text-content-muted text-center pt-1">
                      We respect your privacy. Zero spam. We never share your contact information.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES CROSS-SELL */}
      {Array.isArray(service.relatedServices) && service.relatedServices.length > 0 && (
        <section className="py-12 sm:py-16 bg-surface-light border-t border-slate-100">
          <div className="site-container">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
                Complementary Services
              </h3>
              <Link to="/services" className="text-xs font-bold text-primary hover:underline">
                View All Services →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.relatedServices.map((rel, rIdx) => {
                const RelIcon = getServiceIcon(rel.icon, Layers);
                return (
                  <Link
                    key={rIdx}
                    to={`/services/${rel.slug}`}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <RelIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-base text-navy-900 group-hover:text-primary transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-content-muted line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-primary">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
