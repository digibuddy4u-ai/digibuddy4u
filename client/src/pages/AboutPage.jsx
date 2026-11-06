import React, { useState } from 'react';
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
  Camera,
  FileCheck,
  CheckCheck,
  Rocket,
  Eye,
  BarChart3,
  Star,
  Play,
  Share2,
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

  // Interactive Engine Tab State
  const [activeEngine, setActiveEngine] = useState('reels');

  // Core Pillars / Growth Engines data
  const growthEngines = [
    {
      id: 'reels',
      name: 'Viral 4K & AI Reels',
      badge: 'High Organic Reach',
      icon: Video,
      color: 'text-primary',
      bgGlow: 'bg-primary/10',
      headline: 'Engineered for the First 2.5 Seconds of Attention',
      description:
        'We combine cinematic Sony Alpha 4K camera gear, studio-grade wireless lighting, and cutting-edge AI visual scripting to produce high-retention video reels that stop the infinite thumb-scroll.',
      bullets: [
        'Dedicated on-site shoots in Ahmedabad & Gandhinagar with professional stabilization',
        'AI-assisted script hooks, trending audio curation, and dynamic kinetic typography',
        'Story-driven reels (behind-the-scenes, food making, customer testimonials, festive specials)',
        'Full 4K color grading and custom sound design for instant brand prestige',
      ],
      tools: ['Sony 4K Cine Gear', 'DJI Ronin', 'DaVinci Resolve', 'Midjourney AI', 'Adobe AfterEffects'],
    },
    {
      id: 'branding',
      name: 'Brand Architecture & Design',
      badge: 'Visual Identity',
      icon: Layers,
      color: 'text-cyan-600',
      bgGlow: 'bg-cyan-500/10',
      headline: 'Pixel-Perfect Visuals That Look Like a Multi-Million Brand',
      description:
        'Generic Canva templates kill customer trust. Every social post, carousel guide, festival creative, and menu mockup is custom-designed according to your verified brand guidelines and colors.',
      bullets: [
        '100% bespoke design templates created exclusively for your brand aesthetic',
        'Educational carousel slides that build authoritative saves and shares on Instagram',
        'Strategic festive campaign graphics tailored for Diwali, Uttarayan, Navratri, & holidays',
        'Consistent typography, color harmonisation, and brand guidelines adherence',
      ],
      tools: ['Figma', 'Adobe Photoshop', 'Illustrator', 'High-Res Asset Vault'],
    },
    {
      id: 'meta_ads',
      name: 'Meta Ads & Direct Funnels',
      badge: 'Targeted ROI',
      icon: TrendingUp,
      color: 'text-amber-500',
      bgGlow: 'bg-amber-500/10',
      headline: 'Laser-Focused Paid Reach That Delivers Inquiries, Not Just Clicks',
      description:
        'We do not boost random posts blindly. We engineer targeted Meta Ad campaigns with hyper-local pin-code targeting, retargeting funnels, and click-to-WhatsApp inbound triggers.',
      bullets: [
        'Hyper-local radius and interest targeting across Ahmedabad, Gujarat, and Pan-India',
        'Direct Click-to-WhatsApp messaging ads that place verified buyers right in your inbox',
        'A/B creative testing of hooks, copy variations, and headline angles',
        'Live performance tracking with honest cost-per-lead and acquisition metrics',
      ],
      tools: ['Meta Ads Manager', 'Custom Pixel Tracking', 'WhatsApp Business API', 'Google Analytics 4'],
    },
    {
      id: 'approval',
      name: 'Pre-Approval & Dedicated Care',
      badge: 'Zero Risk',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgGlow: 'bg-emerald-500/10',
      headline: 'Nothing Ever Goes Live Without Your 100% Written Sign-Off',
      description:
        'Tired of agencies publishing rogue typos or incorrect offers? DigiBuddy4U enforces an ironclad 48-hour pre-approval window for all monthly creatives, scripts, and captions.',
      bullets: [
        'Organised monthly content deck shared via WhatsApp & Google Drive before scheduled publish',
        'Dedicated senior strategist on direct WhatsApp speed-dial (replies in under 15 minutes)',
        'Zero junior account managers or endless email ticket delays',
        'Month-to-month flexibility with complete creative asset ownership handed to you',
      ],
      tools: ['Dedicated WhatsApp Group', 'Google Workspace Deck', 'Trello Workflow', 'Slack Priority'],
    },
  ];

  const currentEngineData = growthEngines.find((e) => e.id === activeEngine) || growthEngines[0];

  return (
    <>
      <SEO
        title="About Us — Why DigiBuddy4U is Your True Digital Growth Partner"
        description="Discover how DigiBuddy4U replaces bloated agency bureaucracy with dedicated partner agility, 4K reel storytelling, 100% pre-approved deliverables, and honest growth."
      />

      {/* 1. Top Breadcrumb & Live Availability Pill */}
      <div className="bg-slate-50/80 border-b border-slate-200/80 py-2.5">
        <div className="site-container flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-slate-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-navy-950 font-bold">About DigiBuddy4U</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Accepting Select Retainer Clients • Gujarat & Pan-India</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Clean White Luxury Canvas with Soft Glowing Ambient Lights */}
      <section className="bg-white text-navy-950 py-14 sm:py-20 lg:py-24 relative overflow-hidden border-b border-slate-100">
        {/* Soft Radial Ambient Lights (Subtle, Clean & Bright) */}
        <div className="absolute top-0 right-10 w-[450px] h-[450px] bg-primary/[0.04] rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-accent/[0.05] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-5 right-1/4 w-[350px] h-[350px] bg-accent-yellow/[0.04] rounded-full blur-[70px] pointer-events-none" />

        {/* Subtle Geometric Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#0866F5 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="site-container relative z-10 text-center max-w-5xl mx-auto">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 shadow-xs hover:border-primary/40 transition-colors">
            <Sparkles className="w-4 h-4 text-accent-yellow animate-spin" style={{ animationDuration: '6s' }} />
            <span>Built Differently • The Modern Growth Partner</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.12] sm:leading-[1.08] text-navy-950">
            We Are Driven by One Mission:{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-hover to-primary bg-clip-text text-transparent">
              Your Brand's Digital Growth.
            </span>
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            DigiBuddy4U was born out of a simple frustration: businesses were tired of bloated agencies that promised the moon, handed accounts to untrained interns, and delivered generic Canva templates. We built a dedicated, agile <strong className="text-navy-950 font-semibold">"Buddy Model"</strong> where senior creative thinkers work directly with you.
          </p>

          {/* Floating Interactive Micro-Badges Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
            <div className="animate-float-slow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-card-soft text-navy-900 text-xs sm:text-sm font-semibold hover:border-primary/40 hover:shadow-md transition-all cursor-default">
              <Video className="w-4 h-4 text-primary" />
              <span>4K Camera Shoots & AI Reels</span>
            </div>

            <div className="animate-float-delayed inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-card-soft text-navy-900 text-xs sm:text-sm font-semibold hover:border-emerald-400 hover:shadow-md transition-all cursor-default">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Pre-Approval Before Live</span>
            </div>

            <div className="animate-float-slow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-card-soft text-navy-900 text-xs sm:text-sm font-semibold hover:border-cyan-400 hover:shadow-md transition-all cursor-default">
              <Zap className="w-4 h-4 text-cyan-600" />
              <span>Direct WhatsApp Speed-Dial</span>
            </div>

            <div className="animate-float-delayed inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-card-soft text-navy-900 text-xs sm:text-sm font-semibold hover:border-amber-400 hover:shadow-md transition-all cursor-default">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Real Revenue & Inbound Leads</span>
            </div>

            <div className="animate-float-slow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-card-soft text-navy-900 text-xs sm:text-sm font-semibold hover:border-purple-400 hover:shadow-md transition-all cursor-default">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Zero Junior Account Handoffs</span>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Button
              to="/packages"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto shadow-elevated justify-center"
            >
              Explore Growth Packages
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-sm sm:text-base transition-all shadow-card-soft hover:shadow-md w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* 3. Live Verified Metrics Cards */}
        <div className="site-container mt-12 sm:mt-16 max-w-6xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {/* Metric 1 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-navy-950">98.4%</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 mt-1">Client Retention Rate</div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Brands stay month after month because results speak</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CheckCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-navy-950">100%</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 mt-1">Pre-Approval Policy</div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Zero posts or reels published without your sign-off</p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-navy-950">&lt; 15m</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 mt-1">WhatsApp Response Time</div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Dedicated senior lead on direct chat, zero ticket waits</p>
            </div>

            {/* Metric 4 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-navy-950">30+</div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 mt-1">Active Brand Campaigns</div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Food, retail, services & regional powerhouses</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive "Vendor vs. Buddy" Philosophy Comparison */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light border-b border-slate-200/80">
        <div className="site-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="blue" size="md" className="mb-3">
              The Agency Problem & Solution
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
              Why We Call Ourselves Your <span className="text-primary">"Buddy"</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              In digital marketing, a vendor simply checks boxes on a contract. A <strong className="text-navy-950">Buddy</strong> stands beside you in the trenches—understanding your profit margins, tasting your recipes, knowing your customer's objections, and celebrating every real inquiry your business receives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: The Typical Agency */}
            <div className="rounded-3xl bg-white border border-rose-200/80 p-6 sm:p-8 lg:p-10 shadow-card-soft space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
                      <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-navy-950">
                        The Typical Agency
                      </h3>
                      <p className="text-xs text-rose-600 font-medium">Bloated, Slow & Impersonal</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200">
                    Old Model
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Passed to Junior Interns</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Sold by a slick salesperson, then handed over to an inexperienced intern who barely understands your industry.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Generic Cookie-Cutter Templates</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Recycled Canva layouts with stock photos that make your brand look like a clone of thousands of others.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Vanity Metric Hiding</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        They brag about millions of "impressions" from bot traffic while your register never rings and leads remain zero.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Slow Email Ticket Support</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Urgent festive promo? Wait 3 business days for a support ticket while your campaign window closes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100 text-xs text-slate-500">
                Outcome: Frustration, wasted marketing budget, and zero digital brand equity.
              </div>
            </div>

            {/* Right Card: The DigiBuddy4U Partner Difference (Highlighted!) */}
            <div className="rounded-3xl bg-white border-2 border-primary/40 p-6 sm:p-8 lg:p-10 shadow-elevated relative overflow-hidden space-y-6 flex flex-col justify-between group">
              {/* Top Corner Ribbon / Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-cyan-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                <span>The DigiBuddy Advantage</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-navy-950">
                        The DigiBuddy4U Partner
                      </h3>
                      <p className="text-xs text-primary font-bold">Dedicated, Agile & Accountable</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Senior Creative Brains on Your Account</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Direct collaboration with experienced creative directors, videographers, and performance media buyers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Custom 4K Shoots & AI Hooks</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        High-end real footage of your kitchen, factory, products, or service team paired with viral-tested script frameworks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">100% Pre-Approval Peace of Mind</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Every single reel, caption, graphic, and hashtag set is delivered in advance for your complete sign-off.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-navy-900">Direct WhatsApp Group Chat</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Instant, friendly communication on WhatsApp with response times consistently under 15 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-navy-950 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" /> Transparent Month-to-Month Retainers
                </span>
                <span className="text-primary font-bold">No Hidden Lock-ins →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive "Our 4 Core Growth Engines" (Tabs & Live Interactive Showcase) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="site-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <Badge variant="blue" size="md" className="mb-3">
              How We Drive Real Results
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
              Our 4 Pillars of Execution
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Explore the four core capabilities that turn everyday businesses into recognizable local leaders and digital category kings.
            </p>

            {/* Interactive Tab Buttons */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {growthEngines.map((engine) => {
                const IconComponent = engine.icon;
                const isActive = activeEngine === engine.id;
                return (
                  <button
                    key={engine.id}
                    onClick={() => setActiveEngine(engine.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-elevated scale-105'
                        : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-navy-950'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-accent-yellow' : 'text-slate-500'}`} />
                    <span>{engine.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Engine Card Display */}
          <div className="rounded-3xl bg-surface-light border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-card-soft transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>{currentEngineData.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 leading-tight">
                  {currentEngineData.headline}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentEngineData.description}
                </p>

                <div className="space-y-3 pt-2">
                  {currentEngineData.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-navy-950">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Tools Used Badges */}
                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Industry Tools & Gear:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentEngineData.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-card-soft space-y-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      {React.createElement(currentEngineData.icon, { className: 'w-6 h-6' })}
                    </div>
                    <Badge variant="blue" size="sm">
                      Deliverable Standard
                    </Badge>
                  </div>

                  <h4 className="text-lg font-bold font-heading text-navy-950">
                    What You Receive Monthly
                  </h4>

                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-semibold text-navy-900">Creative Production</span>
                      <span className="text-emerald-600 font-bold">100% Bespoke</span>
                    </li>
                    <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-semibold text-navy-900">Pre-Approval Window</span>
                      <span className="text-primary font-bold">48 Hours Before Live</span>
                    </li>
                    <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-semibold text-navy-900">Revisions Policy</span>
                      <span className="text-slate-900 font-bold">Unlimited on Drafts</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-semibold text-navy-900">Account Access</span>
                      <span className="text-slate-900 font-bold">Direct Founder / Lead</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Button
                      to="/packages"
                      variant="primary"
                      size="md"
                      icon={ArrowRight}
                      className="w-full justify-center text-center font-bold"
                    >
                      View Packages With This Feature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real Client Spotlight: RotiWala (The Proof of The Buddy Model) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light border-b border-slate-200/80">
        <div className="site-container max-w-6xl">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-card-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Info */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>Featured Case Study • Real Gujarat Brand</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-navy-950 leading-tight">
                  How We Built Digital Momentum for <span className="text-primary">RotiWala</span>
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  RotiWala delivers fresh, hygienic, and ghar-jaisi rotis for families, corporate offices, and events across Ahmedabad and Gandhinagar. DigiBuddy4U took their digital brand from zero awareness to a recognizable household name.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-surface-light border border-slate-100 text-center">
                    <div className="text-xl sm:text-2xl font-black text-navy-950">AI Video</div>
                    <div className="text-[11px] text-slate-500 font-medium">Reels & Storytelling</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-light border border-slate-100 text-center">
                    <div className="text-xl sm:text-2xl font-black text-primary">Diwali & Dhanteras</div>
                    <div className="text-[11px] text-slate-500 font-medium">Festive Campaigns</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-light border border-slate-100 text-center col-span-2 sm:col-span-1">
                    <div className="text-xl sm:text-2xl font-black text-emerald-600">Direct Inquiries</div>
                    <div className="text-[11px] text-slate-500 font-medium">WhatsApp Orders</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://www.instagram.com/rotiwala__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-opacity shadow-xs"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Visit @rotiwala__ on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    to="/case-studies/rotiwala"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Card / Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-navy-950 text-white p-6 sm:p-8 shadow-card-hover space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <img
                      src="/rotiwala-logo.jpg"
                      alt="RotiWala Logo"
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-bold font-heading text-white">RotiWala Case Study</h4>
                      <p className="text-xs text-cyan-300">Fresh Rotis • Ahmedabad & Gandhinagar</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span>Industry:</span>
                      <strong className="text-white">Food & Hospitality</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span>Campaign Focus:</span>
                      <strong className="text-white">Festive, Corporate & Family</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span>Agency Scope:</span>
                      <strong className="text-white">Social Media, 4K Reels, Strategy</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs italic text-slate-200">
                    "DigiBuddy4U doesn't just manage our account; they understand our dough, our daily delivery crunch, and how our customers think."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The 4-Step Production Rhythm Roadmap */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="site-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="blue" size="md" className="mb-3">
              Predictable Delivery
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
              The 4-Step Production Rhythm
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Never wonder what your agency is working on. Every single month follows an exact, synchronized timeline with zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-surface-light border border-slate-200/80 shadow-card-soft space-y-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="text-lg font-heading font-bold text-navy-950">Audit & Discovery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We dissect your past performance, analyze top competitor reels, interview your team, and lock in your core commercial targets.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-surface-light border border-slate-200/80 shadow-card-soft space-y-4 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                02
              </div>
              <h3 className="text-lg font-heading font-bold text-navy-950">Content Architecture</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We write viral hooks, structure weekly post themes, plan festive calendars, and organize the exact shot list for photography/video.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-surface-light border border-slate-200/80 shadow-card-soft space-y-4 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                03
              </div>
              <h3 className="text-lg font-heading font-bold text-navy-950">Shoot & 48h Pre-Approval</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We capture 4K footage on-site and edit reels. You review the full content deck and approve everything before a single asset goes live.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-surface-light border border-slate-200/80 shadow-card-soft space-y-4 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="text-lg font-heading font-bold text-navy-950">Publish & Scale ROI</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We publish at peak audience hours, manage inquiries, deploy hyper-local Meta ads, and deliver comprehensive transparent monthly reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Core Values / Working Code Bento */}
      <section className="py-14 sm:py-20 lg:py-24 bg-surface-light border-b border-slate-200/80">
        <div className="site-container max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <Badge variant="blue" size="md" className="mb-3">
              Our Working Code
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-extrabold text-navy-950 tracking-tight">
              The Principles That Guide Every Deliverable
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-navy-950">Outcome Oriented</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every single reel and graphic is structured around commercial objectives, customer acquisition, and real revenue—never vanity metrics.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-navy-950">Strategic Clarity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We never post randomly to fill a quota. Every piece aligns with structured content pillars, seasonal hooks, and audience psychology.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-navy-950">Radical Honesty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We tell you the truth about algorithm shifts, realistic timelines, and ad budgets. If an idea won't work, we tell you before you spend.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-navy-950">Empathetic Care</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We treat your business with the care of our own. Fast, courteous communication via WhatsApp with genuine respect for your vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Bottom High-Impact CTA Banner (Pure White Luxury Card with Glowing Accents) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-primary/10 via-cyan-accent/10 to-accent-yellow/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="site-container relative z-10 max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-white border-2 border-primary/20 p-8 sm:p-12 lg:p-14 shadow-elevated space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Direct Strategist Access • Online Today</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight">
              Ready for a Marketing Partner Who Actually Cares?
            </h2>

            <p className="text-sm xs:text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Skip the bureaucratic agency sales decks. Chat directly with our senior creative team on WhatsApp, review our transparent monthly packages, and let's craft your brand's growth story.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 pt-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>Chat on WhatsApp ({phone})</span>
              </a>

              <Button
                to="/packages"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="justify-center font-bold"
              >
                View Packages & Scope
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> Month-to-Month Retainers
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> 100% Pre-Approval Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> Full Creative Ownership
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
