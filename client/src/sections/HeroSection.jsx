import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CinemaCameraIcon from '../components/common/CinemaCameraIcon';
import {
  Camera,
  Globe,
  Target,
  Smartphone,
  Cpu,
  Palette,
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Clapperboard,
  Code2,
  Database,
  Layers,
  CheckCircle2,
} from 'lucide-react';

// Authentic Vector Instagram SVG Icon
const VectorInstagramIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// UNIFIED BLUE & WHITE GRADIENT BACKGROUND FOR REEL CARD
const REEL_BG_GRADIENT =
  'radial-gradient(ellipse at 50% 25%, #0F2D5E 0%, #071A38 65%, #030816 100%)';

// PURE VECTOR SERVICES LIST (NO IMAGES / NO STOCK PHOTOS - UNIFIED BLUE & WHITE)
const VECTOR_SERVICES = [
  {
    id: 'video-production',
    title: 'Video Production & Shoots',
    category: 'Commercials & Viral Content',
    tag: '#AdFilms #4KShoots',
    badgeText: 'Shooting & Video',
    iconKey: 'camera',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: '4K Commercial Ad Shoots, Studio Setups & High-Retention Viral Reels.',
    link: '/services/video-production-content-creation',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Instagram & Meta Growth',
    tag: '#Instagram #ViralReels',
    badgeText: 'Social Media (IG)',
    iconKey: 'instagram',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Instagram Grid Curation, Daily Reels Strategy, Stories & Community DM Lead Flow.',
    link: '/services/social-media-marketing',
  },
  {
    id: 'website-development',
    title: 'Website Design & Dev',
    category: 'Modern Web Engineering',
    tag: '#NextJS #HighSpeedWeb',
    badgeText: 'Web Development',
    iconKey: 'globe',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'High-speed conversion websites, sub-second loads, Core Web Vitals & custom UI/UX.',
    link: '/services/website-development',
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing (Ads)',
    category: 'Targeted Meta & Google Ads',
    tag: '#MetaAds #GooglePPC',
    badgeText: 'Performance Ads',
    iconKey: 'target',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Precision Meta Ads & Google Search PPC engineered for high-intent verified leads.',
    link: '/services/performance-marketing',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Native iOS & Android Apps',
    tag: '#Flutter #CrossPlatform',
    badgeText: 'Mobile Apps',
    iconKey: 'smartphone',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Fast, responsive cross-platform apps with 60fps native UX & real-time cloud sync.',
    link: '/services/mobile-app-development',
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software & Cloud',
    category: 'Tailored Business Software',
    tag: '#CustomCRM #CloudAPIs',
    badgeText: 'Custom Software',
    iconKey: 'cpu',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Bespoke enterprise CRM, billing automation, HRMS platforms & scalable cloud architecture.',
    link: '/services/custom-software-development',
  },
  {
    id: 'branding-creative-design',
    title: 'Branding & Creative Design',
    category: 'Visual Identity & Logos',
    tag: '#LogoDesign #BrandSystem',
    badgeText: 'Branding & Design',
    iconKey: 'palette',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Iconic logo marks, complete brand guidelines, typography palettes & marketing graphics.',
    link: '/services/branding-creative-design',
  },
  {
    id: 'seo-online-presence',
    title: 'SEO & Search Ranking',
    category: 'Search Engine Optimization',
    tag: '#SearchRanking #OrganicSEO',
    badgeText: 'SEO & Search',
    iconKey: 'search',
    accentColor: '#0866F5',
    gradientBg: REEL_BG_GRADIENT,
    description: 'Technical SEO audits, local Google Business ranking, and sustainable organic clicks.',
    link: '/services/seo-online-presence',
  },
];

// DYNAMIC TYPEWRITER PHRASES FOR HERO HEADLINE
const HERO_TYPEWRITER_PHRASES = [
  'Deliver Real Results',
  'Build Powerful Brands',
  'Turn Clicks Into Customers',
  'Create Digital Experiences',
  'Drive Business Growth',
  'Make Brands Stand Out',
  'Turn Ideas Into Reality',
  'Grow Your Business',
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter Headline State
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Accessibility check for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
    } else if (mq.addListener) {
      mq.addListener(onChange);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', onChange);
      } else if (mq.removeListener) {
        mq.removeListener(onChange);
      }
    };
  }, []);

  // Typewriter animation loop (cycles through the 8 phrases)
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypewriterText(HERO_TYPEWRITER_PHRASES[0]);
      return;
    }

    const currentPhrase = HERO_TYPEWRITER_PHRASES[typewriterIndex];
    let timeoutId;

    if (!isDeleting) {
      // Typing phase: type letter by letter
      if (typewriterText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length + 1));
        }, 70);
      } else {
        // Full phrase displayed: pause for 2000ms
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting phase: erase letter by letter
      if (typewriterText.length > 0) {
        timeoutId = setTimeout(() => {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length - 1));
        }, 38);
      } else {
        // Fully erased: pause briefly and advance to next phrase
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setTypewriterIndex((prev) => (prev + 1) % HERO_TYPEWRITER_PHRASES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typewriterText, isDeleting, typewriterIndex, prefersReducedMotion]);

  // Auto-cycle through vector service cards every 3.5 seconds (paused if hovered or reduced motion)
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % VECTOR_SERVICES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <>
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 min-h-[82vh] flex items-center bg-white text-navy-950">
        {/* ========================================================= */}
        {/* Lemon Mirch Style Floating Background Blobs & Shapes      */}
        {/* ========================================================= */}
        {/* 1. Large Blue/Navy Orb Blob */}
        <div
          className="absolute -right-24 -top-24 sm:-right-20 sm:-top-20 lg:-right-24 xl:-right-16 w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full pointer-events-none opacity-90 filter blur-[2px] animate-[heroFloat_12s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #0866F5, #071A38)',
          }}
        />

        {/* 2. Cinema Video Camera Floating Vector (Exact User Reference Image) */}
        <div
          className="absolute right-1 top-2 sm:right-4 sm:top-6 lg:-right-8 xl:right-6 2xl:right-14 w-20 h-20 xs:w-28 xs:h-28 sm:w-44 sm:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full pointer-events-none opacity-40 xs:opacity-80 lg:opacity-95 animate-[heroFloat_12s_ease-in-out_infinite] select-none flex items-center justify-center p-2 xs:p-3.5 sm:p-5 lg:p-6 bg-white"
          style={{
            boxShadow:
              '0 24px 60px -15px rgba(8, 102, 245, 0.45), 0 0 0 4px #FFFFFF, 0 0 0 7px #0866F5',
          }}
        >
          {/* Inner Dashed Ring with Cinema Camera Vector */}
          <div className="relative w-full h-full rounded-full border-2 border-dashed border-[#0866F5]/40 flex items-center justify-center p-1.5 xs:p-2.5 sm:p-4">
            <CinemaCameraIcon className="w-full h-auto text-navy-950 drop-shadow-sm transition-transform duration-500 hover:scale-105" />

            {/* Small Recording Indicator Badge on Camera */}
            <div className="absolute top-1 right-1 xs:top-2 xs:right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 flex items-center gap-1 bg-rose-500 text-white font-bold text-[7px] xs:text-[8px] sm:text-[9px] px-1 xs:px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-white animate-ping" />
              <span>REC</span>
            </div>
          </div>
        </div>

        {/* 3. Small Yellow Floating Sphere */}
        <div
          className="absolute right-56 sm:right-72 bottom-12 sm:bottom-16 w-24 h-24 sm:w-36 sm:h-36 rounded-full pointer-events-none filter blur-[1px] animate-[heroFloat_12s_ease-in-out_infinite_-4s]"
          style={{ backgroundColor: '#FFC629' }}
        />

        {/* 4. Cyan Ring Floating Decorator */}
        <div
          className="hidden sm:block absolute left-[45%] top-16 w-16 h-16 rounded-full pointer-events-none border-[5px] border-[#18D5E8] bg-transparent animate-[heroFloat_12s_ease-in-out_infinite_-7s]"
        />

        {/* 5. Ambient Glow in Bottom-Left */}
        <div
          className="absolute -left-28 -bottom-28 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(8, 102, 245, 0.12), transparent 70%)',
          }}
        />

        {/* ========================================================= */}
        {/* Main Hero Container & 2-Column Grid                       */}
        {/* ========================================================= */}
        <div className="site-container relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr] gap-10 xl:gap-16 items-center">
            {/* ----------------------------------------------------- */}
            {/* COLUMN 1: PURE VECTOR REEL CARD (NO PHOTOS / PURE SVG) */}
            {/* ----------------------------------------------------- */}
            <div
              className="order-2 lg:order-1 flex justify-center w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[325px] h-[450px] xs:h-[480px] rounded-[130px_130px_28px_28px] xs:rounded-[160px_160px_28px_28px] overflow-hidden bg-navy-950 border-2 border-blue-500/30 shadow-[0_34px_60px_-24px_rgba(7,26,56,0.45)] select-none transition-transform duration-300 hover:scale-[1.01]"
                style={{
                  boxShadow:
                    '0 30px 60px -20px rgba(8, 102, 245, 0.35), 0 10px 25px -10px rgba(7, 26, 56, 0.3)',
                }}
              >
                {/* Render Each Vector Service Card */}
                {VECTOR_SERVICES.map((srv, idx) => {
                  const isActive = idx === currentSlide;

                  return (
                    <div
                      key={srv.id}
                      className={`absolute inset-0 p-5 flex flex-col justify-between transition-opacity duration-500 ease-in-out ${
                        isActive
                          ? 'opacity-100 z-10 pointer-events-auto'
                          : 'opacity-0 z-0 pointer-events-none'
                      }`}
                      style={{
                        background: srv.gradientBg,
                      }}
                    >
                      {/* Clean arched top without cramped header */}
                      <div className="pt-8" />

                      {/* CENTER VECTOR ICON SHOWCASE (PURE BLUE & WHITE) */}
                      <div className="flex flex-col items-center justify-center my-auto py-2">
                        {/* 1. Video Production & Shoot Vector (Exact User Reference Camera) */}
                        {srv.iconKey === 'camera' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse p-2">
                              <CinemaCameraIcon className="w-16 h-13 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 flex items-center gap-1.5 text-blue-200 font-mono text-[10px]">
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                              <span className="font-bold text-white">REC &bull; 4K 60FPS</span>
                            </div>
                          </div>
                        )}

                        {/* 2. Social Media Vector (Instagram SVG - Pure Blue & White) */}
                        {srv.iconKey === 'instagram' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/15 border-2 border-blue-400/50 p-0.5 shadow-xl shadow-blue-500/25 mb-3">
                              <div className="w-full h-full bg-[#071A38] rounded-[22px] flex items-center justify-center text-white">
                                <VectorInstagramIcon className="w-12 h-12 text-white" />
                              </div>
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 text-white font-sans text-[10px] flex items-center gap-2">
                              <span className="text-blue-300">Targeted Reach</span>
                              <span className="text-blue-400">&bull;</span>
                              <span className="text-white font-bold">Audience Growth</span>
                            </div>
                          </div>
                        )}

                        {/* 3. Website Development Vector (Globe + Code) */}
                        {srv.iconKey === 'globe' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Globe className="w-12 h-12 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-xl px-3 py-1 font-mono text-[10px] text-blue-200 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-white">Speed & Core Web Vitals Optimized</span>
                            </div>
                          </div>
                        )}

                        {/* 4. Performance Marketing Vector (Target + Ads) */}
                        {srv.iconKey === 'target' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Target className="w-12 h-12 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3.5 py-1 text-blue-200 font-sans text-[10px] font-bold flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-white">Performance-Focused &bull; Targeted Ads</span>
                            </div>
                          </div>
                        )}

                        {/* 5. Mobile App Development Vector */}
                        {srv.iconKey === 'smartphone' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Smartphone className="w-12 h-12 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 text-blue-200 font-mono text-[10px] flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-white">Flutter &bull; 60fps Native</span>
                            </div>
                          </div>
                        )}

                        {/* 6. Custom Software & Cloud Vector */}
                        {srv.iconKey === 'cpu' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Cpu className="w-12 h-12 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 text-blue-200 font-mono text-[10px] flex items-center gap-1.5">
                              <Database className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-white">Custom CRM &bull; Cloud Infrastructure</span>
                            </div>
                          </div>
                        )}

                        {/* 7. Branding & Creative Design Vector */}
                        {srv.iconKey === 'palette' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Palette className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/30">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#0866F5]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                              <span className="w-2.5 h-2.5 rounded-full bg-white" />
                              <span className="text-white text-[10px] font-bold ml-1">Brand Identity System</span>
                            </div>
                          </div>
                        )}

                        {/* 8. SEO & Search Ranking Vector */}
                        {srv.iconKey === 'search' && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border-2 border-blue-400/40 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-3 animate-pulse">
                              <Search className="w-12 h-12 text-white" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 text-blue-200 font-mono text-[10px] font-bold flex items-center gap-1.5">
                              <span className="text-blue-400 font-bold">Search Visibility</span>
                              <span className="text-white">&bull; Organic SEO Strategy</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* BOTTOM VECTOR CARD CONTENT & LINK */}
                      <div className="text-white text-left z-20 pb-4">
                        {/* Sticker Tag */}
                        <div className="mb-1.5">
                          <span className="inline-block text-[10px] font-extrabold px-3 py-0.5 rounded-full text-white bg-primary border border-blue-400/30 shadow-xs">
                            {srv.tag}
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 className="font-heading font-black text-lg leading-tight mb-1 text-white">
                          {srv.title}
                        </h3>

                        {/* Service Description */}
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                          {srv.description}
                        </p>

                        {/* Vector Action Button */}
                        <Link
                          to={srv.link}
                          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-primary hover:bg-primary-hover px-4 py-1.5 rounded-full transition-colors shadow-md shadow-primary/25"
                        >
                          <span>Explore Service</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* ------------------------------------------------- */}
                {/* BOTTOM DOT INDICATORS                             */}
                {/* ------------------------------------------------- */}
                <div className="absolute left-0 right-0 bottom-2.5 flex justify-center gap-1.5 z-30">
                  {VECTOR_SERVICES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to service ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-5 bg-white shadow-sm'
                          : 'w-1.5 bg-white/30 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* COLUMN 2: HERO CONTENT & COPYWRITING (Lemon Mirch)    */}
            {/* ----------------------------------------------------- */}
            <div className="order-1 lg:order-2 flex flex-col items-start text-left lg:pr-8 xl:pr-14 relative z-20 w-full">
              {/* Dynamic Typewriter Headline */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading text-navy-950 leading-[1.12] sm:leading-[1.08] tracking-tight max-w-xl xl:max-w-2xl grid break-words">
                {/* Invisible Sizers: covers ALL 8 typewriter phrases so the grid height remains 100% stable across all screen widths without layout shifts */}
                {HERO_TYPEWRITER_PHRASES.map((phrase) => (
                  <span
                    key={phrase}
                    className="invisible pointer-events-none select-none col-start-1 row-start-1 text-left break-words"
                    aria-hidden="true"
                  >
                    <span className="text-navy-950">We </span>
                    <span className="text-primary not-italic">{phrase}</span>
                    <span className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] ml-1.5" />
                  </span>
                ))}

                {/* Visible Animated Typewriter Content */}
                <span className="col-start-1 row-start-1 text-left break-words" aria-hidden="true">
                  <span className="text-navy-950">We </span>
                  <span className="text-primary not-italic inline">
                    {typewriterText}
                    {!prefersReducedMotion && (
                      <span
                        className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[0.82em] bg-primary ml-1.5 align-baseline animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </span>

                {/* Accessible screen-reader text */}
                <span className="sr-only">
                  We Deliver Real Results, Build Powerful Brands, Turn Clicks Into Customers, Create Digital Experiences, Drive Business Growth, Make Brands Stand Out, Turn Ideas Into Reality, and Grow Your Business.
                </span>
              </h1>

              {/* Signature Yellow Accent Bar */}
              <div className="w-24 xs:w-28 sm:w-36 h-2 xs:h-2.5 bg-[#FFC629] rounded-full mt-3.5 sm:mt-5" />

              {/* Subtitle Description */}
              <p className="text-sm xs:text-base sm:text-lg text-slate-600 max-w-lg my-4 sm:my-6 font-normal leading-relaxed">
                We help brands stand out with strategic marketing, creative content, high-performing websites, and innovative IT solutions that turn ideas into measurable growth.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <span>Start your project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-primary hover:bg-primary/5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base border-2 border-primary transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  See our work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Tilted Animated Marquee Ribbon (Lemon Mirch Style)        */}
      {/* ========================================================= */}
      <div className="overflow-hidden py-6 sm:py-8 bg-white" aria-hidden="true">
        <div className="bg-primary text-white -rotate-1 sm:-rotate-1.5 -mx-8 py-3.5 sm:py-4 overflow-hidden shadow-md">
          <div className="flex w-max animate-[ribbonScroll_32s_linear_infinite] will-change-transform transform-gpu">
            {Array.from({ length: 4 }).map((_, blockIdx) => (
              <div key={blockIdx} className="flex items-center gap-8 sm:gap-12 pl-8 sm:pl-12">
                <span className="flex items-center gap-8 sm:gap-12 whitespace-nowrap uppercase font-heading font-extrabold text-xl sm:text-3xl tracking-wide">
                  <span>Social Media</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span className="stroke-text">Performance Ads</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span>SEO &amp; Content</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span className="stroke-text">Branding</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span>Websites</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span className="stroke-text">Custom Software</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                  <span>Mobile Apps</span>
                  <span className="text-[#FFC629] text-base">&#10022;</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          50% {
            transform: translateY(-24px);
          }
        }
        @keyframes ribbonScroll {
          to {
            transform: translateX(-50%);
          }
        }
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 1.5px #FFFFFF;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[heroFloat_12s_ease-in-out_infinite\\],
          .animate-\\[heroFloat_12s_ease-in-out_infinite_-4s\\],
          .animate-\\[heroFloat_12s_ease-in-out_infinite_-7s\\],
          .animate-\\[ribbonScroll_32s_linear_infinite\\] {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
