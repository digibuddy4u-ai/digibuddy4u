import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Share2,
  Video,
  Layout,
  Cpu,
  Smartphone,
  Palette,
  Search,
  PenTool,
  Bot,
  Layers,
  Globe,
  ShieldCheck,
  ShoppingBag,
  Wrench,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { api } from '../utils/api';
import { useSiteSettings } from '../context/SiteSettingsContext';

// Comprehensive Icon Map to match database icon names
const ICON_MAP = {
  Share2,
  TrendingUp,
  Palette,
  Layout,
  Smartphone,
  Cpu,
  Video,
  Search,
  PenTool,
  Bot,
  Layers,
  Globe,
  ShieldCheck,
  ShoppingBag,
  Wrench,
  Sparkles,
  CheckCircle2,
};

// Unified 1-2 Color Palette: Signature Electric Blue & Crisp White
// Keeps the entire section clean, premium and corporate without loud rainbow clutter
const UNIFIED_PALETTE = {
  accentColor: '#0866F5', // Signature Electric Blue
  secondaryColor: '#FFFFFF', // Crisp White
  accentGradient: 'from-[#0866F5]/25 via-blue-600/10 to-transparent',
  glowColor: 'rgba(8, 102, 245, 0.28)',
  borderColor: 'rgba(8, 102, 245, 0.3)',
};

// Fallback baseline services if API is temporarily unreachable
const FALLBACK_SERVICES = [
  {
    id: 'social-media-marketing',
    number: '01',
    slug: 'social-media-marketing',
    category: 'Brand Building & Social Media',
    title: 'Social Media & Brand Marketing',
    headline: 'Build Familiarity & Consistent Inbound Engagement.',
    description:
      'We plan, design, and publish structured monthly content roadmaps across Instagram, Facebook, and LinkedIn. Through curated visual feeds, educational carousels, and daily story cadences, we help your brand build genuine familiarity and convert profile visitors into warm inquiries.',
    iconName: 'Share2',
    deliverables: [
      { number: '01', title: 'Instagram Feed Curation & Daily Story Rhythm' },
      { number: '02', title: 'Facebook & LinkedIn Business Page Authority' },
      { number: '03', title: 'Educational Carousels & Visual Creative Packs' },
      { number: '04', title: 'Community Care & Inbound DM Lead Routing' },
    ],
  },
  {
    id: 'performance-marketing',
    number: '02',
    slug: 'performance-marketing',
    category: 'Paid Media & Targeted Campaigns',
    title: 'Performance Marketing (Ads)',
    headline: 'Reach High-Intent Prospects Ready to Convert.',
    description:
      'We build, manage, and continuously test targeted paid ad campaigns across Meta (Instagram/Facebook) and Google Search. Through precise audience segmentation, ad creative variations, and conversion-focused landing paths, we help you acquire qualified customer inquiries at sustainable costs.',
    iconName: 'TrendingUp',
    deliverables: [
      { number: '01', title: 'Facebook & Instagram Meta Ad Campaigns' },
      { number: '02', title: 'Google Search & Intent-Driven PPC Ads' },
      { number: '03', title: 'Audience Segmentation & Retargeting Funnels' },
      { number: '04', title: 'Transparent Cost-Per-Lead Spend Tracking' },
    ],
  },
  {
    id: 'branding-creative-design',
    number: '03',
    slug: 'branding-creative-design',
    category: 'Visual Identity & System Design',
    title: 'Branding & Creative Design',
    headline: 'Establish A Polished, Credible Visual Identity.',
    description:
      'We craft distinctive visual assets that command customer trust—including custom vector logos, comprehensive color palettes, typography hierarchies, and marketing collateral designed to maintain professional consistency across physical and digital touchpoints.',
    iconName: 'Palette',
    deliverables: [
      { number: '01', title: 'Custom Vector Logo Design & Icon Suites' },
      { number: '02', title: 'Brand Style Guidelines & Typography Palettes' },
      { number: '03', title: 'Social Media Banner Kits & Creative Packs' },
      { number: '04', title: 'Packaging, Stationery & Print Collateral' },
    ],
  },
  {
    id: 'website-development',
    number: '04',
    slug: 'website-development',
    category: 'High-Performance Web Engineering',
    title: 'Website Design & Development',
    headline: 'Turn Online Traffic Into Verified Enquiries.',
    description:
      'We engineer responsive, sub-second loading websites using modern React and Tailwind code standards. Built with intuitive mobile ergonomics, clean information architecture, and direct contact funnels, your website makes it effortless for visitors to take action.',
    iconName: 'Layout',
    deliverables: [
      { number: '01', title: 'Conversion-Focused Modern UI/UX Layouts' },
      { number: '02', title: 'Sub-Second Page Loads & Clean Code Standards' },
      { number: '03', title: 'Search-Optimized Information Architecture' },
      { number: '04', title: 'One-Click WhatsApp & Direct Lead Forms' },
    ],
  },
  {
    id: 'mobile-app-development',
    number: '05',
    slug: 'mobile-app-development',
    category: 'Native & Cross-Platform Mobile Apps',
    title: 'Mobile App Development',
    headline: 'Put Your Business In Your Customers’ Pockets.',
    description:
      'We build intuitive, fluid mobile applications for Android and iOS using modern cross-platform frameworks. With secure cloud backends, customer authentication, and push notifications, your customers enjoy immediate mobile access to your products and services.',
    iconName: 'Smartphone',
    deliverables: [
      { number: '01', title: 'Android & iOS Cross-Platform Applications' },
      { number: '02', title: 'Fluid, Native-Feel Mobile User Experience' },
      { number: '03', title: 'Secure Cloud Database & Push Notification Setup' },
      { number: '04', title: 'Google Play Store & App Store Deployment' },
    ],
  },
  {
    id: 'custom-software',
    number: '06',
    slug: 'custom-software-development',
    category: 'Tailored Enterprise IT Solutions',
    title: 'Custom Software Development',
    headline: 'Automate Internal Operations & Customer Data.',
    description:
      'We develop custom internal tools, CRM engines, business dashboards, and automated database integrations tailored to your company’s unique workflow requirements—reducing manual errors and streamlining daily operations.',
    iconName: 'Cpu',
    deliverables: [
      { number: '01', title: 'Bespoke Web Applications & Admin Dashboards' },
      { number: '02', title: 'Dedicated CRM, HRMS & Lead Pipelines' },
      { number: '03', title: 'Scalable Cloud Database & RESTful APIs' },
      { number: '04', title: 'Security Hardening & Ongoing Tech Maintenance' },
    ],
  },
];

export default function ServicesOverviewSection() {
  const { settings } = useSiteSettings();
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [activeNumber, setActiveNumber] = useState('01');
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  // Fetch only services that have permission from Admin Panel (showOnHome: true / $ne: false)
  const fetchAdminApprovedServices = useCallback(async () => {
    try {
      const res = await api.get('/services?home=true');
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        // Filter strictly for admin permission: showOnHome !== false and isPublished !== false
        const approvedServices = res.data.filter(
          (s) => s.showOnHome !== false && s.isPublished !== false && s.status !== 'draft'
        );

        if (approvedServices.length > 0) {
          const formatted = approvedServices.map((service, index) => {
            const num = String(index + 1).padStart(2, '0');
            const palette = UNIFIED_PALETTE;

            // Extract deliverables: use direct deliverables, or subServices, or benefits
            let deliverables = [];
            if (Array.isArray(service.deliverables) && service.deliverables.length > 0) {
              deliverables = service.deliverables.slice(0, 4).map((d, dIdx) => ({
                number: String(dIdx + 1).padStart(2, '0'),
                title: typeof d === 'string' ? d : d.title || d.name,
              }));
            } else if (Array.isArray(service.subServices) && service.subServices.length > 0) {
              deliverables = service.subServices.slice(0, 4).map((sub, sIdx) => ({
                number: String(sIdx + 1).padStart(2, '0'),
                title: sub.name || sub.title || `Capability ${sIdx + 1}`,
              }));
            } else if (Array.isArray(service.benefits) && service.benefits.length > 0) {
              deliverables = service.benefits.slice(0, 4).map((b, bIdx) => ({
                number: String(bIdx + 1).padStart(2, '0'),
                title: typeof b === 'string' ? b : b.title || b.text,
              }));
            } else {
              deliverables = [
                { number: '01', title: 'Dedicated Strategy & Tailored Architecture' },
                { number: '02', title: 'High-Standard Agency Execution' },
                { number: '03', title: 'Continuous Quality & Performance Audits' },
                { number: '04', title: 'Full Transparency & Ongoing Technical Support' },
              ];
            }

            return {
              id: service._id || service.slug || `srv-${index}`,
              number: num,
              slug: service.slug,
              category: service.categoryName || 'Flagship Agency Service',
              title: service.title,
              headline: service.highlight && service.highlight.trim().length > 0
                ? service.highlight.trim()
                : `${service.title} for Modern Business Growth.`,
              description: service.shortDescription || service.fullDescription || '',
              iconName: service.icon || 'Sparkles',
              deliverables,
              accentColor: palette.accentColor,
              accentGradient: palette.accentGradient,
              glowColor: palette.glowColor,
            };
          });

          setServices(formatted);
        }
      }
    } catch (err) {
      console.warn('Using baseline agency services fallback:', err?.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminApprovedServices();

    // Auto-sync immediately when admin updates services in the admin tab and returns to site
    const handleFocus = () => {
      fetchAdminApprovedServices();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchAdminApprovedServices]);

  // Bidirectional active card tracking:
  // Dynamically tracks the visible stacked card on top during both
  // UP-TO-DOWN (01 -> 02 -> 03 -> 04 -> 05 -> 06) and
  // DOWN-TO-UP (06 -> 05 -> 04 -> 03 -> 02 -> 01) scrolling.
  useEffect(() => {
    if (!services || services.length === 0) return;

    let ticking = false;

    const updateActiveCard = () => {
      if (!cardRefs.current || cardRefs.current.length === 0) return;

      const firstEl = cardRefs.current[0];
      const stickyTop = firstEl
        ? parseFloat(window.getComputedStyle(firstEl).top) || 128
        : 128;
      // Buffer (+25px) ensures smooth bidirectional transition as cards slide over
      const threshold = stickyTop + 25;

      let currentActiveIndex = 0;

      for (let i = 0; i < services.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // When a card's top reaches or passes the sticky threshold, it is active and on top
        if (rect.top <= threshold) {
          currentActiveIndex = i;
        }
      }

      const num = String(currentActiveIndex + 1).padStart(2, '0');
      setActiveNumber((prev) => (prev !== num ? num : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveCard);
        ticking = true;
      }
    };

    // Calculate immediately on mount/data change
    updateActiveCard();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [services]);

  // Respect admin homepage toggle if main services section is turned off
  if (settings?.servicesSettings?.showMainServicesSection === false) {
    return null;
  }

  return (
    <section
      id="services"
      className="bg-[#030711] text-white pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28 relative overflow-visible select-none border-t border-white/5"
    >
      {/* Background ambient lighting (Unified Electric Blue only) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0866F5]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0866F5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative">
        {/* Mobile Header: Visible only on small devices */}
        <div className="mb-10 lg:hidden text-center sm:text-left">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            Our Core Services & <br />
            <span className="text-primary">
              Practical Benefits.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg">
            Explore what we offer and the tangible commercial value each capability delivers for your brand.
          </p>
        </div>

        {/* Main Two-Column Layout (Sticky Tracking Counter Left + Stacking Cards Right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 items-start relative">
          {/* ======================================================== */}
          {/* LEFT SIDE: STICKY COUNTER & GIANT OUTLINE NUMBER */}
          {/* (Inspired by agdigitalmarketing.in reference layout) */}
          {/* ======================================================== */}
          <div className="hidden lg:flex flex-col sticky top-28 lg:top-32 w-1/3 h-[65vh] justify-between pb-8 pointer-events-none z-10">
            <div>
              <h2 className="text-3xl xl:text-4xl font-heading font-black text-white leading-tight">
                Our Core Services & <br />
                <span className="text-primary">
                  Practical Benefits.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed max-w-sm font-medium">
                Explore what we offer and the tangible commercial value each capability delivers for your brand.
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-blue-300">
                <span className="w-8 h-[1px] bg-primary" />
                <span>Scroll to stack cards ({activeNumber} / {String(services.length).padStart(2, '0')})</span>
              </div>
            </div>

            {/* Giant Outlined Stroke Number (Unified Electric Blue Stroke) */}
            <div
              className="text-[12rem] xl:text-[15rem] leading-[0.8] font-light tracking-tighter text-transparent select-none transition-all duration-300 font-mono"
              style={{
                WebkitTextStroke: '2.5px rgba(8, 102, 245, 0.9)',
                textShadow: '0 0 60px rgba(8, 102, 245, 0.35)',
              }}
            >
              {activeNumber}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: STICKY STACKING SERVICE CARDS */}
          {/* (Unified Electric Blue & White Color Palette) */}
          {/* ======================================================== */}
          <div className="w-full lg:w-2/3 flex flex-col relative space-y-0">
            {services.map((service, index) => {
              const IconComponent = ICON_MAP[service.iconName] || Sparkles;
              const isLast = index === services.length - 1;
              const palette = UNIFIED_PALETTE;

              return (
                <div
                  key={service.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  id={`service-stack-card-${service.slug || service.id}`}
                  className="sticky top-20 sm:top-24 lg:top-32 flex flex-col rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 mb-16 sm:mb-24 lg:mb-32 transition-all duration-300"
                  style={{
                    zIndex: index + 1,
                    backgroundColor: '#071A38',
                    backgroundImage: `
                      radial-gradient(circle at 92% 8%, rgba(8, 102, 245, 0.28) 0%, transparent 60%),
                      linear-gradient(180deg, #09224A 0%, #05142E 100%)
                    `,
                    border: '1px solid rgba(8, 102, 245, 0.32)',
                    boxShadow: `
                      0 -12px 35px -5px rgba(0, 0, 0, 0.75),
                      0 25px 65px -10px rgba(2, 6, 23, 0.95),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `,
                  }}
                >
                  {/* Card Header Tag & Outlined Number */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 shadow-sm text-primary"
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider block text-primary"
                        >
                          {service.category}
                        </span>
                        <span className="text-xs text-white font-semibold hidden sm:inline">
                          {service.title}
                        </span>
                      </div>
                    </div>

                    {/* Number Badge (Clean Blue & White Outlined Stroke) */}
                    <div
                      className="text-4xl sm:text-5xl lg:text-6xl font-light text-transparent select-none font-mono tracking-tight"
                      style={{
                        WebkitTextStroke: '1.5px rgba(8, 102, 245, 0.95)',
                      }}
                    >
                      {service.number}
                    </div>
                  </div>

                  {/* Large Headline */}
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    {service.headline}
                  </h3>

                  {/* Supporting Description */}
                  <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-2xl font-medium">
                    {service.description}
                  </p>

                  {/* Deliverables Breakdown List (Unified Blue & White) */}
                  <div className="flex flex-col border-t border-white/15 mt-8 sm:mt-10">
                    {service.deliverables.map((item) => (
                      <div
                        key={item.number + item.title}
                        className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 transition-colors hover:border-primary/50 cursor-default"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <span
                            className="w-2 h-2 rounded-full transition-all group-hover:scale-125 flex-shrink-0 bg-primary"
                          />
                          <span className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-mono text-xs sm:text-sm text-slate-400 group-hover:text-primary transition-colors font-bold flex-shrink-0">
                          {item.number}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Bottom CTA Row */}
                  <div className="mt-8 pt-2 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-primary group transition-colors"
                    >
                      <span>Explore {service.title} Details</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {isLast && (
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-primary/25"
                      >
                        <span>Explore All Services</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
