import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Layout,
  Camera,
  Target,
  TrendingUp,
  Palette,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

// 6 Core Featured Services matching the user's reference mockup exactly
const CORE_SERVICES = [
  {
    title: 'Google Business Profile Setup',
    subtitle: 'Complete GBP verification, Maps ranking & local review optimization.',
    icon: MapPin,
    gradient: 'from-violet-600 to-indigo-500 shadow-violet-500/25',
    link: '/services/seo-online-presence',
  },
  {
    title: 'Website Design & Development',
    subtitle: 'Modern, engaging, sub-second loading & conversion-driven web platforms.',
    icon: Layout,
    gradient: 'from-pink-500 to-rose-600 shadow-pink-500/25',
    link: '/services/website-development',
  },
  {
    title: 'Corporate Video & Camera Shoot',
    subtitle: 'Cinematic 4K mirrorless camera & iPhone video shoots with studio lighting.',
    icon: Camera,
    gradient: 'from-amber-500 to-orange-500 shadow-orange-500/25',
    link: '/services/video-production-content-creation',
  },
  {
    title: 'Performance Marketing (Ads)',
    subtitle: 'High-ROAS Meta (Instagram & Facebook) and Google Search PPC ad campaigns.',
    icon: Target,
    gradient: 'from-purple-600 to-fuchsia-500 shadow-purple-500/25',
    link: '/services/performance-marketing',
  },
  {
    title: 'SEO & Online Presence',
    subtitle: 'Comprehensive technical SEO, keyword ranking & high-authority organic search.',
    icon: TrendingUp,
    gradient: 'from-blue-600 to-cyan-500 shadow-blue-500/25',
    link: '/services/seo-online-presence',
  },
  {
    title: 'Brand Identity & Design',
    subtitle: 'Distinctive vector logo marks, brand guidelines & high-impact collateral.',
    icon: Palette,
    gradient: 'from-amber-500 to-yellow-500 shadow-amber-500/25',
    link: '/services/branding-creative-design',
  },
];

export default function ServicesOverviewSection() {
  const { settings } = useSiteSettings();

  // Respect admin toggle if main services section is turned off
  if (settings?.servicesSettings?.showMainServicesSection === false) {
    return null;
  }

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-slate-100"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 max-w-6xl mx-auto">
        {/* Section Header matching user reference image exactly */}
        <div className="text-left mb-8 sm:mb-12 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-heading font-black text-navy-950 tracking-tight leading-tight">
            We don’t just design we build brands{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              that launch and grow.
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-heading font-bold text-slate-500 mt-3.5 uppercase tracking-wider">
            Our Services:
          </p>
        </div>

        {/* ======================================================== */}
        {/* 6 CORE SERVICES GRID (2 Columns x 3 Rows Matching Mockup) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {CORE_SERVICES.map((item, idx) => {
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.link}
                className="group rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-300 relative border bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5"
              >
                {/* Left Side: Glowing Circular Gradient Icon + Text */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${item.gradient} ring-4 ring-slate-100 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-navy-950 group-hover:text-blue-600 transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Side: Diagonal Arrow (↗) */}
                <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM ACTION BUTTONS                                    */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-navy-950 border border-slate-300/80 font-heading font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>More Services & Add-Ons</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Custom Scope / Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
