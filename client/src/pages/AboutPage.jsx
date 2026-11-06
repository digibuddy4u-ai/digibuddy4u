import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Compass,
  Award,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Video,
  Layers,
  Cpu,
  MessageCircle,
  Phone,
  Check,
  ChevronRight,
  ExternalLink,
  Clock,
  Palette,
  Globe,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { InstagramIcon } from '../components/common/SocialIcons';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { BRAND } from '../utils/brandConstants';

export default function AboutPage() {
  const { settings } = useSiteSettings();
  const phone = settings?.phone || BRAND.phone;
  const whatsappUrl = settings?.whatsappUrl || BRAND.whatsappUrl;

  return (
    <>
      <SEO
        title="About Us — Why DigiBuddy4U is Your True Digital Growth Partner"
        description="Learn how DigiBuddy4U replaces bureaucratic agency bloat with dedicated partner agility, high-production 4K video storytelling, conversion websites, and honest growth."
      />

      {/* 1. Breadcrumb Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 text-slate-400">
        <div className="site-container flex items-center gap-2 text-xs font-medium">
          <Link to="/" className="hover:text-accent-yellow transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-bold">About Us</span>
        </div>
      </div>

      {/* 2. Hero Section: Modern Dark Luxury Gradient with Radiant Glows */}
      <section className="bg-gradient-to-b from-slate-950 via-navy-950 to-slate-900 text-white py-14 sm:py-20 lg:py-28 relative overflow-hidden border-b border-slate-800">
        {/* Ambient Backlight Halos */}
        <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-primary/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_center,rgba(8,102,245,0.08),transparent_70%)] pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow animate-pulse" />
            <span>Built Differently • Agency Reimagined</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08] text-white break-words">
            We Are Driven by One Mission:{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-amber-300 bg-clip-text text-transparent">
              Your Brand's Digital Growth.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-sm xs:text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            DigiBuddy4U was born out of a simple frustration: brands were tired of bloated agencies that promised the moon, delivered generic templates, and hid behind vanity numbers. We built a dedicated, high-agility partner model.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Button
              to="/contact"
              variant="yellow"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto justify-center text-center font-bold shadow-xl shadow-amber-500/20"
            >
              Partner With DigiBuddy4U
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-sm sm:text-base transition-all shadow-md text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Talk to Us on WhatsApp</span>
            </a>
          </div>

          {/* 4-Stat Trust Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-accent-yellow mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Strict Standard</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-black text-white">100%</div>
              <p className="text-xs text-slate-400 leading-snug">Client Pre-Approval on all content before publishing</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-cyan-400 mb-1">
                <Zap className="w-5 h-5" />
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Rapid Support</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-black text-white">~5 Mins</div>
              <p className="text-xs text-slate-400 leading-snug">Average WhatsApp response time for active client accounts</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Ethical Policy</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-black text-white">0%</div>
              <p className="text-xs text-slate-400 leading-snug">Zero bot traffic, fake followers, or fabricated statistics</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-orange-400 mb-1">
                <Video className="w-5 h-5" />
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Studio Specs</span>
              </div>
              <div className="text-xl sm:text-3xl font-heading font-black text-white">4K 60fps</div>
              <p className="text-xs text-slate-400 leading-snug">Cinema cameras, dedicated audio, and on-location shoot crew</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The "Buddy" Philosophy: Traditional Agency vs. DigiBuddy4U Partner */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white text-navy-950">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary font-mono inline-block">
              Our Operating Philosophy
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight break-words">
              Why We Call Ourselves Your <span className="text-primary">"Buddy"</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              In digital marketing, a vendor simply checks boxes on a contract. A <strong>Buddy</strong> stands beside you in the trenches—understanding your profit margins, tasting your recipes (like we do with client projects like RotiWala), knowing your customer's objections, and celebrating every real customer inquiry your business receives.
            </p>
          </div>

          {/* Comparison Cards: Vendor vs Buddy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            {/* The Other Guy: The Bureaucratic Vendor */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-card-soft flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 font-mono">
                    Traditional Agency Model
                  </span>
                  <XCircle className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-950">
                  The Bureaucratic Vendor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  How traditional, bloated agencies operate with rigid markups, junior handoffs, and endless email chains.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Handoff to inexperienced interns right after signing contract</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Recycled Canva templates that look identical to your competitors</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Slow support: 3-5 business days waiting for support ticket replies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Reports packed with vanity impressions that bring 0 actual sales</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Long lock-in contracts with heavy cancellation penalties</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-xs text-rose-800 font-medium">
                Result: Wasted marketing budgets, generic branding, and frustration.
              </div>
            </div>

            {/* The DigiBuddy Way: The Agile Partner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#071A38] via-[#09224A] to-[#05142E] text-white border-2 border-primary/50 shadow-2xl ring-4 ring-primary/10 flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                    The DigiBuddy4U Model
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Your Dedicated Growth Partner
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  How DigiBuddy4U operates as your agile internal marketing & tech squad.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span>Direct access to senior creative strategists & camera crew</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span>100% custom-crafted 9:16 reels, audio hooks, and bespoke design systems</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span>Rapid WhatsApp communication with ~5 mins average response times</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span>Focus on verified customer leads, doorstep orders, and inbound inquiries</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span>Month-to-month retainers: our work earns your renewal every 30 days</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-medium relative z-10">
                Result: Authentic local brand dominance, higher margins, and sustainable scale.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4 Core Working Pillars: Bento Box Grid */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light border-y border-slate-200">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <Badge variant="blue" size="md">
              Core Pillars
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight break-words">
              The 4 Pillars Powering Our Delivery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Every deliverable produced at DigiBuddy4U passes through four non-negotiable agency standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-navy-950">
                  Outcome Oriented
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every campaign, video hook, and ad dollar is engineered around commercial outcomes—direct inquiries, verified footfall, and measurable sales.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-primary flex items-center justify-between">
                <span>KPI Aligned</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-navy-950">
                  Strategic Clarity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We never post randomly. Every piece of content connects back to structured content pillars, audience desires, and seasonal sales spikes.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-cyan-700 flex items-center justify-between">
                <span>Structured Roadmaps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-navy-950">
                  Total Honesty
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We tell you the truth about algorithm shifts, budget sizing, and real timelines. No invented revenue screenshots or inflated metrics.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-emerald-700 flex items-center justify-between">
                <span>Ethical Marketing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-navy-950">
                  Empathetic Care
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Prompt, respectful communication via WhatsApp and direct channels. We celebrate your wins and troubleshoot hurdles with equal urgency.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-amber-700 flex items-center justify-between">
                <span>WhatsApp First</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Proven Client In-Action Spotlight (RotiWala Partnership) */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="site-container">
          <div className="p-6 xs:p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-[#140f0a] to-slate-900 text-white relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-accent-yellow border border-amber-500/30 font-mono">
                    Proof in Action
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Ahmedabad & Gandhinagar
                  </span>
                </div>

                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-heading font-black text-white leading-tight break-words">
                  How We Partner in the Trenches: RotiWala
                </h3>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                  When RotiWala launched homestyle fresh roti delivery across Ahmedabad and Gandhinagar, we didn't just schedule generic food graphics. We tasted the rotis, filmed steam on the tawa, produced 9:16 vertical AI storytelling reels, engineered festive Diwali campaigns, and built direct WhatsApp ordering funnels.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button to="/case-studies/rotiwala" variant="yellow" size="md" icon={ArrowRight} className="font-bold">
                    Read Complete RotiWala Case Study
                  </Button>
                  <a
                    href="https://www.instagram.com/rotiwaladelivery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md"
                  >
                    <InstagramIcon className="w-4 h-4 fill-current" />
                    <span>Visit @rotiwaladelivery</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative p-4 rounded-3xl bg-slate-900/80 border border-amber-500/30 text-center space-y-3 shadow-xl backdrop-blur-md">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-white/10 p-1.5 ring-4 ring-amber-400/40">
                    <img
                      src="/images/portfolio/rotiwala-logo.png"
                      alt="RotiWala"
                      className="w-full h-full rounded-full object-contain bg-white shadow-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">RotiWala Delivery</h4>
                    <p className="text-[11px] text-amber-200/80">Active SMM & AI Video Client</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                    <span>Verified Client Engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 4-Step Agency Rhythm / How We Operate */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white text-navy-950">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary font-mono inline-block">
              Working Process
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight break-words">
              How We Work With Every Client
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              A clear, predictable monthly rhythm designed to produce consistent creative output without eating up your team's valuable time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-card-soft space-y-3 relative overflow-hidden">
              <span className="text-4xl font-light text-primary/30 select-none font-mono block">01</span>
              <h4 className="text-lg font-heading font-bold text-navy-950">Discovery & Audit</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We analyze your competitors, audit current social profiles, identify audience friction points, and define monthly content pillars.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-card-soft space-y-3 relative overflow-hidden">
              <span className="text-4xl font-light text-cyan-600/30 select-none font-mono block">02</span>
              <h4 className="text-lg font-heading font-bold text-navy-950">Scripting & Shoots</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We craft viral-retention reel scripts, prepare caption drafts, and conduct on-location 4K camera shoots with professional lighting and audio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-card-soft space-y-3 relative overflow-hidden">
              <span className="text-4xl font-light text-amber-500/30 select-none font-mono block">03</span>
              <h4 className="text-lg font-heading font-bold text-navy-950">Pre-Approval Window</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nothing goes live without your sign-off. You review full monthly reels and post drafts, request tweaks, and approve in 24-48 hours.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-card-soft space-y-3 relative overflow-hidden">
              <span className="text-4xl font-light text-[#25D366]/30 select-none font-mono block">04</span>
              <h4 className="text-lg font-heading font-bold text-navy-950">Publish & Scale</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We schedule posts at peak engagement hours, route incoming DMs, launch Meta ads, and deliver comprehensive monthly performance reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom High-Impact CTA Banner */}
      <section className="py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="blue" size="md">
            Start Your Growth Journey
          </Badge>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight break-words">
            Ready for a Marketing Partner Who Actually Cares?
          </h2>

          <p className="text-sm xs:text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Skip the bloated agency sales pitch. Talk directly with our senior creative strategists, review our transparent monthly packages, and let's build something remarkable.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 pt-3 w-full sm:w-auto">
            <Button to="/contact" variant="yellow" size="lg" icon={ArrowRight} className="w-full sm:w-auto justify-center text-center font-bold">
              Get Your Free Brand Roadmap
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-sm sm:text-base transition-all shadow-md w-full sm:w-auto text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp ({phone})</span>
            </a>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" /> Month-to-Month Retainers
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" /> No Lock-in Contracts
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" /> 100% Pre-Approved Deliverables
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
