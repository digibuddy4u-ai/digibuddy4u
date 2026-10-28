import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Utensils,
  Video,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Palette,
  MessageCircle,
  FileText,
} from 'lucide-react';
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
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-white border-y border-slate-100">
      <div className="site-container">
        <SectionHeader
          badge="Featured Portfolio"
          badgeVariant="yellow"
          title="Real Client Showcase:"
          titleHighlight="RotiWala"
          description="A behind-the-scenes look at how DigiBuddy4U built the brand identity, vertical food reels, menu designs, and WhatsApp ordering flow for an authentic homestyle meals brand."
          align="center"
        />

        {/* Main Showcase Banner */}
        <div className="rounded-3xl bg-surface-light border border-slate-200/90 overflow-hidden shadow-card-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Media Showcase (5 cols on lg) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-700 via-orange-800 to-amber-950 p-6 sm:p-8 xl:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <Badge variant="yellow" size="sm">
                  Active Client
                </Badge>
                <span className="text-xs font-semibold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 text-amber-200">
                  Food & Hospitality
                </span>
              </div>

              {/* RotiWala Brand Centerpiece */}
              <div className="relative z-10 my-6 sm:my-8 text-center space-y-3.5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mx-auto text-accent-yellow shadow-2xl">
                  <Utensils className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white">
                    RotiWala
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mt-1 font-mono">
                    Freshness & Homestyle Meals
                  </p>
                </div>
                <p className="text-sm text-amber-100/90 font-medium max-w-xs mx-auto leading-relaxed">
                  Delivering warm, fresh, wholesome rotis and daily meals to households and working professionals.
                </p>

                {/* Scope Pillars Quick Chips */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 max-w-xs mx-auto text-[11px]">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    🎬 Kitchen Reels
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    🎨 Visual Brand Kit
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    📋 Menu Creatives
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    💬 WhatsApp Orders
                  </span>
                </div>
              </div>

              {/* Verified Status Footnote */}
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-amber-100">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Ongoing Campaign Engagement
                </span>
                <span className="font-semibold text-accent-yellow flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-yellow" />
                  Verified Scope
                </span>
              </div>
            </div>

            {/* Content & Scope Breakdown (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 xl:p-10 space-y-6 flex flex-col justify-between bg-white">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    Project Overview & Strategic Execution
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950 leading-tight">
                  {rotiWala.title}
                </h4>

                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {rotiWala.overview}
                </p>

                {/* 4 Core Deliverables Grid */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-3.5 flex items-center justify-between">
                    <span>Key Project Deliverables Produced</span>
                    <span className="text-[11px] font-mono text-primary font-normal">Active Deliverables</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Deliverable 1: Brand & Campaign Creatives */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-navy-950">Brand & Campaign Creatives</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Warm culinary color palette, hygiene-focused social templates, and typography crafted for brand consistency.
                      </p>
                    </div>

                    {/* Deliverable 2: Food Reels & Short-Form Videos */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-navy-950">Food Reels & Short-Form Videos</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        9:16 behind-the-scenes vertical reels showing fresh dough preparation, steaming rotis, and kinetic subtitles.
                      </p>
                    </div>

                    {/* Deliverable 3: Menu Designs & Daily Specials */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-600" />
                        <span className="text-xs font-bold text-navy-950">Menu Designs & Daily Specials</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Mobile-first daily specials cards, rotating subji announcements, and combo menus formatted for social feeds.
                      </p>
                    </div>

                    {/* Deliverable 4: WhatsApp Ordering & Enquiry Flow */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span className="text-xs font-bold text-navy-950">WhatsApp Ordering & Enquiry Flow</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        One-click WhatsApp order prompts embedded across social posts and stories, routing customer orders directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transparency Notice Regarding Performance Metrics */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 space-y-1">
                    <strong className="block text-amber-950 font-bold">
                      Creative Execution & Verified Engagement
                    </strong>
                    <p className="text-amber-900 leading-relaxed">
                      {rotiWala.metricsNotice || 'Authentic campaign metrics and verified reach analytics will be published following official campaign milestone sign-off. DigiBuddy4U strictly avoids fabricated data.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <Button
                  to="/case-studies"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  View Project Case Study
                </Button>
                <Button
                  to="/portfolio"
                  variant="secondary"
                  size="md"
                >
                  Explore Our Work
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Future Expansion Slots Showcase (demonstrating system scalability) */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-base font-bold font-heading text-navy-900">
                Portfolio Pipeline
              </h4>
              <p className="text-xs text-content-muted">
                Our portfolio architecture is built to showcase expanding client partnerships.
              </p>
            </div>
            <Badge variant="slate" size="sm">
              Scalable System
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UPCOMING_PORTFOLIO_PLACEHOLDERS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-dashed border-slate-300 bg-surface-light/50 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy-900">{item.title}</span>
                    <span className="text-[10px] uppercase font-semibold text-content-muted bg-slate-200 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-content-muted">{item.description}</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap">
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
