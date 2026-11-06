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
  Play,
  Heart,
  Share2,
  Bookmark,
  Volume2,
  ChefHat,
  Clock,
  Check,
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
        description="Discover how DigiBuddy4U crafted an appetizing digital presence, AI promotional food reels, creative designs, and targeted festive campaigns for RotiWala in Ahmedabad and Gandhinagar."
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 text-slate-400">
        <div className="site-container flex items-center gap-2 text-xs font-medium">
          <Link to="/" className="hover:text-accent-yellow transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/portfolio" className="hover:text-accent-yellow transition-colors">
            Our Work
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold">RotiWala Case Study</span>
        </div>
      </div>

      {/* Case Study Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 text-white py-12 sm:py-16 lg:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-accent-yellow">
                  <Flame className="w-3.5 h-3.5" />
                  Official Client Case Study
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Food & Beverage
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  Ahmedabad & Gandhinagar
                </span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight break-words">
                RotiWala – Building a Strong Digital Brand Presence
              </h1>

              <p className="text-sm xs:text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                How DigiBuddy partnered with <strong>RotiWala</strong> to communicate product freshness, build brand awareness, and scale its daily doorstep delivery services through creative graphic designs, AI video reels, and festive campaign funnels.
              </p>

              {/* Scope & Industry Quick Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                <div className="p-3 xs:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Client
                  </span>
                  <span className="text-xs xs:text-sm font-bold text-white mt-0.5 block truncate">
                    RotiWala
                  </span>
                </div>
                <div className="p-3 xs:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Industry
                  </span>
                  <span className="text-xs xs:text-sm font-bold text-white mt-0.5 block truncate">
                    Food & Hospitality
                  </span>
                </div>
                <div className="p-3 xs:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Services
                  </span>
                  <span className="text-xs xs:text-sm font-bold text-accent-yellow mt-0.5 block truncate">
                    AI Reels & Social Kit
                  </span>
                </div>
                <div className="p-3 xs:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    Execution
                  </span>
                  <span className="text-xs xs:text-sm font-bold text-cyan-400 mt-0.5 block truncate">
                    By DigiBuddy4U
                  </span>
                </div>
              </div>

              {/* Action Buttons with Direct Instagram Link */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 xs:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs xs:text-sm sm:text-base hover:opacity-95 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto text-center"
                >
                  <InstagramIcon className="w-4 xs:w-5 h-4 xs:h-5 fill-current" />
                  <span>Visit Instagram (@{rotiWala.instagramHandle})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs xs:text-sm sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md w-full sm:w-auto text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Side: Realistic Vertical Smartphone Reel Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[270px] xs:max-w-[290px] sm:max-w-[330px] rounded-[34px] sm:rounded-[40px] bg-[#0c121e] p-2.5 sm:p-3 shadow-2xl ring-1 ring-white/20 shadow-amber-500/10">
                {/* Screen Content */}
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#2a1306] via-[#1a0a02] to-black aspect-[9/18] flex flex-col justify-between text-white border border-white/10">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Top Story Header in Phone */}
                  <div className="relative z-20 pt-7 px-3.5 pb-2 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-[#E1306C]">
                        <img
                          src={rotiWala.logo}
                          alt="RotiWala"
                          className="w-full h-full rounded-full object-contain bg-white"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[11px] font-bold leading-tight">
                          <span>rotiwaladelivery</span>
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
                        </div>
                        <span className="text-[9px] text-amber-200/70 leading-none">Sponsored • Ahmedabad</span>
                      </div>
                    </div>
                    <a
                      href={rotiWala.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white transition-colors backdrop-blur-sm"
                    >
                      Follow
                    </a>
                  </div>

                  {/* Center Visual: Large RotiWala Emblem */}
                  <div className="relative z-10 px-4 my-auto text-center space-y-3">
                    <div className="relative inline-block mx-auto">
                      <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl animate-pulse" />
                      <img
                        src={rotiWala.logo}
                        alt="RotiWala Official Logo"
                        className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 rounded-full object-contain mx-auto shadow-2xl ring-4 ring-amber-400/40 p-1.5 bg-white/10 backdrop-blur-md"
                      />
                      <div className="absolute bottom-1 right-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-1.5 shadow-lg border-2 border-black">
                        <Flame className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-accent-yellow border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                        100% Ghar Jaisi Fulka Roti
                      </span>
                      <h4 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                        RotiWala
                      </h4>
                      <p className="text-[11px] text-amber-100/80 font-medium leading-tight max-w-[200px] mx-auto mt-0.5">
                        Fresh, soft and ghar-jaisi rotis delivered across Ahmedabad & Gandhinagar.
                      </p>
                    </div>

                    {/* Fake Video Reel Play Bar */}
                    <div className="pt-1 flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center backdrop-blur-md cursor-pointer transition-transform hover:scale-110">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                      <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden max-w-[120px]">
                        <div className="h-full bg-accent-yellow w-2/3" />
                      </div>
                      <Volume2 className="w-3.5 h-3.5 text-white/70" />
                    </div>
                  </div>

                  {/* Reel Engagement Rail */}
                  <div className="absolute right-2.5 bottom-20 z-20 flex flex-col items-center gap-3 text-white/90">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <Heart className="w-4 h-4 text-[#FD1D1D] fill-[#FD1D1D]" />
                      </div>
                      <span className="text-[9px] font-bold mt-0.5">1.4K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[9px] font-bold mt-0.5">86</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <Share2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[9px] font-bold mt-0.5">Share</span>
                    </div>
                  </div>

                  {/* Bottom Phone Action Bar */}
                  <div className="relative z-20 p-3 bg-gradient-to-t from-black via-black/90 to-transparent space-y-2">
                    <div className="text-[10px] text-white/90 font-medium leading-tight line-clamp-1 pr-10">
                      🛵 FREE Home Delivery • Min Order: 20+ Rotis
                    </div>
                    <a
                      href={rotiWala.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] text-white font-bold text-xs hover:brightness-110 transition-all shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio Pill below Phone */}
              <div className="mt-4 text-center">
                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent-yellow hover:underline font-mono"
                >
                  <span>@{rotiWala.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Sections */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white text-navy-950">
        <div className="site-container max-w-4xl xl:max-w-5xl space-y-10 sm:space-y-16">
          {/* Section 1: About the Brand */}
          <div className="p-4 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/90 shadow-card-soft space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary font-mono">
                Brand Overview
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Section 01
              </span>
            </div>

            <h2 className="text-xl xs:text-2xl sm:text-4xl font-heading font-black text-navy-900 break-words">
              About the Brand
            </h2>

            <p className="text-sm xs:text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              <strong>RotiWala</strong> provides fresh, soft and ghar-jaisi rotis for customers in Ahmedabad and Gandhinagar.
            </p>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              Catering to busy working professionals, university students, corporate offices, hotels, and households, RotiWala solves the daily friction of kitchen meal preparation by delivering warm, freshly puffed, soft rotis directly to doorsteps with strict hygiene and homestyle taste.
            </p>

            {/* Target Client Categories */}
            <div className="pt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 xs:p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <ChefHat className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-navy-900 block">Households & Families</span>
                <span className="text-[11px] text-slate-500">Daily Meal Routine</span>
              </div>
              <div className="p-3 xs:p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs font-bold text-navy-900 block">Working Professionals</span>
                <span className="text-[11px] text-slate-500">No Cooking Hassle</span>
              </div>
              <div className="p-3 xs:p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <Utensils className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-navy-900 block">Hotels & Restaurants</span>
                <span className="text-[11px] text-slate-500">Bulk Fresh Supply</span>
              </div>
              <div className="p-3 xs:p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
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
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-navy-900 break-words">
                  The Challenge
                </h3>
              </div>
            </div>

            <div className="p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-4">
              <p className="text-sm xs:text-base sm:text-lg text-amber-950 font-semibold leading-relaxed">
                The brand needed an attractive digital presence to communicate its product quality, build customer awareness and promote its roti delivery services.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
                {rotiWala.challenges.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 xs:p-4 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-1.5"
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
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-navy-900 break-words">
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
                    className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 xs:gap-4 hover:border-primary/40 transition-colors shadow-xs"
                  >
                    <div className="w-8 xs:w-9 h-8 xs:h-9 rounded-xl bg-navy-900 text-accent-yellow font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ItemIcon className="w-4 h-4 text-accent-yellow" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm xs:text-base font-bold text-navy-950 font-heading break-words">
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
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-navy-900">
                    Creative Campaigns
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 font-mono">
                5 Campaign Tracks
              </span>
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
          <div className="p-5 xs:p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-slate-950 text-white space-y-6 relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-accent-yellow font-mono">
                  Our Objective
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  Targeted Mission
                </span>
              </div>

              <h3 className="text-xl xs:text-2xl sm:text-4xl font-heading font-black tracking-tight text-white leading-snug break-words">
                To build brand awareness, create engaging social media communication and present RotiWala as a recognizable local food brand.
              </h3>

              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-accent-yellow font-bold">
                    Agency Promise
                  </span>
                  <p className="text-base xs:text-lg sm:text-2xl font-heading font-black text-white break-words">
                    DigiBuddy – Creative Ideas. Digital Growth.
                  </p>
                </div>

                <a
                  href={rotiWala.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 xs:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-md flex-shrink-0 w-full sm:w-auto text-center"
                >
                  <InstagramIcon className="w-4 h-4 fill-current" />
                  <span>View RotiWala Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Verified Scope Notice */}
          <div className="p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-amber-50/90 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <h4 className="text-sm xs:text-base sm:text-lg font-bold font-heading text-amber-950 break-words">
                Client Verification & Metrics Policy
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              At DigiBuddy4U, we practice strict digital integrity: <strong>we do not publish simulated follower metrics or invented revenue statistics.</strong> The RotiWala engagement represents verified creative branding, social content planning, AI video production, and festive campaign delivery.
            </p>
          </div>

          {/* Bottom Call to Action for Prospective Clients */}
          <div className="p-5 xs:p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-6 shadow-card-soft">
            <div className="w-12 xs:w-14 h-12 xs:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-6 xs:w-7 h-6 xs:h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 break-words">
                Want a Proven Digital Growth Strategy for Your Business?
              </h3>
              <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Whether you run a local food business, retail outlet, e-commerce brand, or professional service firm, we craft creative ideas and measurable digital growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Button to="/contact" variant="yellow" size="lg" icon={ArrowRight} className="w-full sm:w-auto justify-center text-center">
                Get Your Free Brand Roadmap
              </Button>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md w-full sm:w-auto text-center"
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
