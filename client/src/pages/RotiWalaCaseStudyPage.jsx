import React from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ExternalLink,
  Target,
  Video,
  Palette,
  HeartHandshake,
  TrendingUp,
  MapPin,
  Truck,
  PackageCheck,
  Layers,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { InstagramIcon } from '../components/common/SocialIcons';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { PORTFOLIO_PROJECTS } from '../utils/portfolioData';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function RotiWalaCaseStudyPage() {
  const { settings } = useSiteSettings();
  const rotiWala = PORTFOLIO_PROJECTS.find((p) => p.id === 'rotiwala') || PORTFOLIO_PROJECTS[0];

  return (
    <>
      <SEO
        title="RotiWala Case Study — Building a Strong Digital Brand Presence | DigiBuddy4U"
        description="Discover how DigiBuddy4U crafted an attractive digital presence, AI promotional reels, creative designs, and targeted festive campaigns for RotiWala in Ahmedabad and Gandhinagar."
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="site-container flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/portfolio" className="hover:text-primary transition-colors">
            Our Work
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-950 font-bold">RotiWala Case Study</span>
        </div>
      </div>

      {/* Case Study Hero Section */}
      <section className="bg-gradient-to-b from-white via-surface-light to-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="yellow" size="sm">
                  Active Client Case Study
                </Badge>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Food & Beverage
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Ahmedabad & Gandhinagar
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-heading font-black tracking-tight text-navy-950 leading-tight">
                RotiWala – Building a Strong Digital Brand Presence
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                How DigiBuddy partnered with <strong>RotiWala</strong> to communicate product quality, build customer awareness, and promote its daily roti delivery services with creative social media designs, AI video reels, and high-impact festive campaigns.
              </p>

              {/* Scope & Industry Quick Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Client
                  </span>
                  <span className="text-sm font-bold text-navy-950 mt-0.5 block">
                    RotiWala
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Industry
                  </span>
                  <span className="text-sm font-bold text-navy-950 mt-0.5 block">
                    Food & Beverage
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Services
                  </span>
                  <span className="text-sm font-bold text-navy-950 mt-0.5 block">
                    Social Media & AI Reels
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Execution
                  </span>
                  <span className="text-sm font-bold text-primary mt-0.5 block">
                    By DigiBuddy4U
                  </span>
                </div>
              </div>

              {/* Action Buttons with Direct Instagram Link */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <InstagramIcon className="w-5 h-5" />
                  <span>Visit Instagram (@{rotiWala.instagramHandle})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Side: RotiWala Official Brand Profile Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-amber-700 via-orange-800 to-amber-950 p-6 sm:p-8 text-white shadow-card-hover overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Instagram Identity Header */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <InstagramIcon className="w-5 h-5 text-accent-yellow" />
                    <span className="text-xs font-mono font-bold tracking-wider text-amber-200">
                      OFFICIAL INSTAGRAM
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold backdrop-blur-sm">
                    Verified Brand
                  </span>
                </div>

                {/* Centerpiece: Real Official Circular Logo */}
                <div className="relative z-10 my-6 text-center space-y-3">
                  <div className="relative inline-block mx-auto group">
                    <img
                      src={rotiWala.logo}
                      alt="RotiWala Official Brand Logo"
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-contain mx-auto shadow-2xl ring-4 ring-white/30 p-1 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                      RotiWala
                    </h2>
                    <a
                      href={rotiWala.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-mono text-accent-yellow hover:underline mt-0.5"
                    >
                      <span>@{rotiWala.instagramHandle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-amber-100/90 font-medium max-w-xs mx-auto leading-relaxed">
                    Fresh, Ghar Jaisi Premium Fulka Roti delivered with love across Ahmedabad & Gandhinagar.
                  </p>
                </div>

                {/* Live Instagram Bio Highlights */}
                <div className="relative z-10 bg-black/30 rounded-2xl p-4 border border-white/10 text-xs space-y-2 text-amber-100">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍞</span>
                    <span className="font-semibold text-white">Fresh Rotis, Delivered with Love</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accent-yellow flex-shrink-0" />
                    <span>Sarkhej, Ahmedabad, India 380055</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-accent-yellow flex-shrink-0" />
                    <span>FREE Home Delivery (Min Order: 20+ Rotis)</span>
                  </div>
                </div>

                {/* Link to Instagram button */}
                <div className="relative z-10 pt-5 mt-4 border-t border-white/15">
                  <a
                    href={rotiWala.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-navy-950 font-bold text-xs hover:bg-accent-yellow transition-colors shadow-sm"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                    <span>Open @{rotiWala.instagramHandle} on Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Breakdown */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="site-container max-w-4xl xl:max-w-5xl space-y-12 sm:space-y-16">
          {/* Section 1: About the Brand */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-light border border-slate-200/90 shadow-card-soft space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="blue">Brand Overview</Badge>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Section 01
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
              About the Brand
            </h2>

            <p className="text-base sm:text-lg text-content-dark font-medium leading-relaxed">
              <strong>RotiWala</strong> provides fresh, soft and ghar-jaisi rotis for customers in Ahmedabad and Gandhinagar.
            </p>

            <p className="text-sm sm:text-base text-content-muted leading-relaxed">
              Catering to busy working professionals, university students, corporate offices, hotels, and households, RotiWala solves the daily friction of kitchen meal preparation by delivering steaming, freshly puffed, soft rotis directly to doorsteps with strict hygiene and homestyle taste.
            </p>

            {/* Target Client Categories */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="text-xs font-bold text-navy-900 block">Households & Families</span>
                <span className="text-[11px] text-slate-500">Daily Meal Routine</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="text-xs font-bold text-navy-900 block">Working Professionals</span>
                <span className="text-[11px] text-slate-500">No Cooking Hassle</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="text-xs font-bold text-navy-900 block">Hotels & Restaurants</span>
                <span className="text-[11px] text-slate-500">Bulk Fresh Supply</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <span className="text-xs font-bold text-navy-900 block">Corporate & Events</span>
                <span className="text-[11px] text-slate-500">Office Festive Lunches</span>
              </div>
            </div>
          </div>

          {/* Section 2: The Challenge */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono block">
                  Problem Statement
                </span>
                <h3 className="text-2xl font-bold font-heading text-navy-900">
                  The Challenge
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4">
              <p className="text-base text-amber-950 font-semibold leading-relaxed">
                The brand needed an attractive digital presence to communicate its product quality, build customer awareness and promote its roti delivery services.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {rotiWala.challenges.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-amber-200/70 shadow-xs space-y-1.5"
                  >
                    <span className="text-xs font-bold text-amber-800 font-mono">
                      Challenge 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Our Approach */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono block">
                  Strategic Execution
                </span>
                <h3 className="text-2xl font-bold font-heading text-navy-900">
                  Our Approach
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              DigiBuddy worked on creating engaging digital content and a consistent brand presentation through:
            </p>

            <div className="space-y-3.5">
              {rotiWala.approach.map((item, idx) => {
                const ICONS = [Palette, Video, Sparkles, Award, HeartHandshake];
                const ItemIcon = ICONS[idx % ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-surface-light border border-slate-200/90 flex items-start gap-4 hover:border-primary/40 transition-colors shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-navy-900 text-accent-yellow font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ItemIcon className="w-4 h-4 text-accent-yellow" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-navy-950 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Creative Campaigns */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono block">
                    Content Formats
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-navy-900">
                    Creative Campaigns
                  </h3>
                </div>
              </div>
              <Badge variant="yellow" size="sm">
                5 Campaign Tracks
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rotiWala.creativeCampaigns.map((camp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-2.5 hover:border-amber-400 hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Campaign 0{idx + 1}
                    </span>
                    <h5 className="text-base font-bold font-heading text-navy-950">
                      {camp.name}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {camp.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-primary">
                    <span>Targeted Reach</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}

              {/* Instagram Callout Card in Grid */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-md space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                    <InstagramIcon className="w-4 h-4" />
                    <span>LIVE POSTS & REELS</span>
                  </div>
                  <h5 className="text-base font-bold font-heading">
                    Explore Reels on Instagram
                  </h5>
                  <p className="text-xs text-white/90 leading-relaxed">
                    Watch our AI-generated food reels, customer storytelling clips, and festive creative posts directly on Instagram.
                  </p>
                </div>

                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white text-navy-950 font-bold text-xs hover:bg-accent-yellow transition-colors"
                >
                  <span>@{rotiWala.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 5: Our Objective & DigiBuddy Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-navy-950 text-white space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-yellow/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="yellow" size="sm">
                  Our Objective
                </Badge>
                <span className="text-xs font-mono text-cyan-300">
                  Targeted Mission
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white leading-snug">
                To build brand awareness, create engaging social media communication and present RotiWala as a recognizable local food brand.
              </h3>

              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-accent-yellow font-bold">
                    Agency Promise
                  </span>
                  <p className="text-lg sm:text-xl font-heading font-extrabold text-white">
                    DigiBuddy – Creative Ideas. Digital Growth.
                  </p>
                </div>

                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-navy-950 font-bold text-xs sm:text-sm hover:bg-accent-yellow transition-colors shadow-md flex-shrink-0"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>View RotiWala Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Verified Integrity & Scope Notice (Strict anti-fabrication standards) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/90 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <h4 className="text-base sm:text-lg font-bold font-heading text-amber-950">
                Client Verification & Metrics Policy
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              At DigiBuddy4U, we practice strict digital integrity: <strong>we do not publish simulated follower metrics or invented revenue statistics.</strong> The RotiWala engagement represents verified creative branding, social content planning, AI video production, and festive campaign delivery.
            </p>
          </div>

          {/* Bottom Call to Action for Prospective Clients */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-light border border-slate-200 text-center space-y-6 shadow-card-soft">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                Want a Proven Digital Growth Strategy for Your Business?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Whether you run a local food business, retail outlet, e-commerce brand, or professional service firm, we craft creative ideas and measurable digital growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button to="/contact" variant="yellow" size="lg" icon={ArrowRight}>
                Get Your Free Brand Roadmap
              </Button>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
