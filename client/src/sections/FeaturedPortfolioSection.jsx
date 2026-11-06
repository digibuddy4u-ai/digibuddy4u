import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Video,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Palette,
  MessageCircle,
  ExternalLink,
  Flame,
  Play,
  Heart,
  Share2,
  Bookmark,
  Volume2,
  MapPin,
  Truck,
  TrendingUp,
} from 'lucide-react';
import { InstagramIcon } from '../components/common/SocialIcons';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { PORTFOLIO_PROJECTS, UPCOMING_PORTFOLIO_PLACEHOLDERS } from '../utils/portfolioData';
import { api } from '../utils/api';

export default function FeaturedPortfolioSection() {
  const [featuredProject, setFeaturedProject] = useState(
    () => PORTFOLIO_PROJECTS.find((p) => p.id === 'rotiwala') || PORTFOLIO_PROJECTS[0]
  );

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const res = await api.get('/portfolio');
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const featured =
            res.data.find((p) => p.isFeatured && p.isPublished !== false) ||
            res.data.find((p) => p.isPublished !== false) ||
            res.data[0];
          if (featured) {
            setFeaturedProject({
              ...featured,
              id: featured.slug || featured._id,
            });
          }
        }
      } catch {
        // Fallback
      }
    }

    loadFeatured();

    const handleFocus = () => loadFeatured();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadFeatured, 25000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const rotiWala = featuredProject;

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 text-white relative overflow-hidden border-y border-slate-800">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-accent-yellow text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-accent-yellow animate-pulse" />
            <span>Featured Client Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white">
            Real Work. Real Brand. <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">RotiWala.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            How DigiBuddy4U created the visual brand identity, vertical AI storytelling reels, and high-converting WhatsApp ordering funnels for Ahmedabad & Gandhinagar's favorite homestyle food service.
          </p>
        </div>

        {/* Master Showcase Card */}
        <div className="rounded-[32px] bg-slate-900/90 border border-slate-700/70 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Vertical Smartphone / Reel Mockup (5 cols on lg) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center relative bg-gradient-to-br from-slate-950 via-[#140f0a] to-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800">
              {/* Backlight halo behind phone */}
              <div className="absolute w-64 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Status Header above mockup */}
              <div className="w-full max-w-[310px] flex items-center justify-between mb-4 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Instagram Reel
                </span>
                <span className="font-mono text-[11px] text-amber-300/80 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                  9:16 Vertical Format
                </span>
              </div>

              {/* Phone Frame Device */}
              <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-[38px] bg-[#111827] p-3 shadow-2xl ring-1 ring-white/20 shadow-amber-500/10">
                {/* Screen Content */}
                <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-b from-[#2a1306] via-[#1a0a02] to-black aspect-[9/18] flex flex-col justify-between text-white border border-white/10">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Top Header inside Phone */}
                  <div className="relative z-20 pt-7 px-3.5 pb-2 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-[#E1306C]">
                        <img
                          src="/images/portfolio/rotiwala-logo.png"
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
                      href="https://www.instagram.com/rotiwaladelivery/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white transition-colors backdrop-blur-sm"
                    >
                      Follow
                    </a>
                  </div>

                  {/* Center Visual: High-Impact Circular Logo & Warm Food Presentation */}
                  <div className="relative z-10 px-4 my-auto text-center space-y-3">
                    <div className="relative inline-block mx-auto">
                      {/* Pulsing golden aura */}
                      <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl animate-pulse" />
                      <img
                        src="/images/portfolio/rotiwala-logo.png"
                        alt="RotiWala Official Logo"
                        className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full object-contain mx-auto shadow-2xl ring-4 ring-amber-400/40 p-1.5 bg-white/10 backdrop-blur-md"
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

                  {/* Reel Engagement Rail (Right side of screen) */}
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

                  {/* Bottom Phone Action Bar: WhatsApp Click to Order */}
                  <div className="relative z-20 p-3 bg-gradient-to-t from-black via-black/90 to-transparent space-y-2">
                    <div className="text-[10px] text-white/90 font-medium leading-tight line-clamp-1 pr-10">
                      🛵 FREE Home Delivery • Min Order: 20+ Rotis
                    </div>
                    <a
                      href="https://www.instagram.com/rotiwaladelivery/"
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

              {/* Verified Scope Note below mockup */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-accent-yellow" />
                <span>Verified Client Partnership • DigiBuddy4U</span>
              </div>
            </div>

            {/* Right: Campaign Strategy, Deliverables & Actions (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div>
                {/* Category & Status Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-yellow font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    Social Media & AI Video Overhaul
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Sarkhej, Ahmedabad & Gandhinagar
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-black text-white leading-tight">
                  RotiWala – Building a Strong Digital Brand Presence
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  RotiWala provides fresh, soft and ghar-jaisi rotis for customers across Ahmedabad and Gandhinagar. DigiBuddy4U partnered with RotiWala to communicate product freshness, build customer awareness, and promote doorstep delivery services.
                </p>

                {/* 4 Strategic Pillars Produced */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5 flex items-center justify-between">
                    <span>What DigiBuddy4U Executed</span>
                    <span className="text-[11px] font-mono text-cyan-400 font-normal">Active Deliverables</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Card 1 */}
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1 hover:border-amber-400/40 transition-colors">
                      <div className="flex items-center gap-2 text-accent-yellow">
                        <Palette className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">Creative Brand Designs</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Warm culinary color palette, hygiene-focused social templates, and mobile-first menu cards.
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1 hover:border-cyan-400/40 transition-colors">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Video className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">AI Video Reels & Stories</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        9:16 vertical behind-the-scenes reels showing fresh tawa preparation, steam, and relatable stories.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1 hover:border-orange-400/40 transition-colors">
                      <div className="flex items-center gap-2 text-orange-400">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">Festive & Special Campaigns</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Targeted campaign sprints for Diwali, hotel banquet dinners, office lunches, and bhandara drives.
                      </p>
                    </div>

                    {/* Card 4 */}
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1 hover:border-emerald-400/40 transition-colors">
                      <div className="flex items-center gap-2 text-[#25D366]">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">WhatsApp Direct Ordering</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        One-click WhatsApp order prompts routing incoming customer queries directly to kitchen delivery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Creative Campaigns Chips */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Creative Campaigns Delivered
                    </span>
                    <span className="text-[10px] text-accent-yellow font-bold">5 Tracks</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-200">
                      ✨ Why Choose RotiWala?
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-200">
                      🪔 Office Diwali Celebration
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-200">
                      🏨 Hotel Dinner Solution
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-200">
                      🙏 Bhandara Special
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600/60 text-slate-200">
                      🏡 Family Storytelling
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <Button
                  to="/case-studies/rotiwala"
                  variant="yellow"
                  size="md"
                  icon={ArrowRight}
                  className="font-bold shadow-lg shadow-amber-500/20"
                >
                  View Complete Case Study
                </Button>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://www.instagram.com/rotiwaladelivery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md hover:scale-105"
                  >
                    <InstagramIcon className="w-4 h-4 fill-current" />
                    <span>Visit Instagram (@rotiwaladelivery)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Button
                    to="/portfolio"
                    variant="outline"
                    size="md"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-xs"
                  >
                    All Client Work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Expansion Slots Showcase */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h4 className="text-sm font-bold font-heading text-white">
                Portfolio Pipeline & Upcoming Client Releases
              </h4>
              <p className="text-xs text-slate-400">
                Our portfolio architecture is engineered to showcase expanding enterprise & local client partnerships.
              </p>
            </div>
            <Badge variant="blue" size="sm">
              Scalable System
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPCOMING_PORTFOLIO_PLACEHOLDERS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
