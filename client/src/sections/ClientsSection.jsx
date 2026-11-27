import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { InstagramIcon, GoogleIcon } from '../components/common/SocialIcons';
import { CLIENT_BRANDS } from '../utils/clientsData';

function ClientCard({ brand, index }) {
  return (
    <div
      className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:bg-white/[0.1] hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm w-[290px] xs:w-[310px] sm:w-[320px] lg:w-[330px] xl:w-[340px] h-[390px] sm:h-[410px] flex-shrink-0 mx-2.5 sm:mx-3 select-none"
    >
      {/* Top Accent Line on Hover */}
      <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      {/* Card Content Top */}
      <div>
        <div className="flex flex-col items-center text-center">
          {/* Logo Frame */}
          <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl bg-white/5 border border-white/15 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-cyan-400/40 transition-transform duration-300 overflow-hidden">
            <img
              src={brand.logo}
              alt={`${brand.name} official logo`}
              className="w-full h-full object-contain rounded-xl"
              loading="lazy"
              draggable="false"
            />
          </div>

          {/* Industry Category Badge */}
          <span className="mt-3.5 inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/20 px-2.5 py-0.5 rounded-full">
            {brand.badge}
          </span>

          {/* Brand Name */}
          <h3 className="mt-2.5 text-base sm:text-lg font-heading font-extrabold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors min-h-[44px] flex items-center justify-center">
            {brand.name}
          </h3>

          {/* Industry */}
          <p className="mt-1 text-xs font-semibold text-slate-300 leading-snug min-h-[34px] flex items-center justify-center line-clamp-2">
            {brand.industry}
          </p>

          {/* Focus Description */}
          <p className="mt-2.5 text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-2.5 line-clamp-2">
            {brand.focus}
          </p>
        </div>
      </div>

      {/* Card Actions Bottom */}
      <div className="mt-auto pt-3 border-t border-white/10 space-y-1.5">
        {brand.googleBusinessUrl ? (
          <a
            href={brand.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 hover:from-emerald-500 hover:to-cyan-500 text-white font-heading font-bold text-xs shadow-md transition-all active:scale-98 group/btn border border-emerald-400/30"
            title={`View ${brand.name} on Google Business Profile`}
          >
            <GoogleIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Google Business Profile</span>
            <ExternalLink className="w-3 h-3 opacity-80 group-hover/btn:translate-x-0.5 transition-transform flex-shrink-0" />
          </a>
        ) : brand.instagramUrl ? (
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-blue-700 text-white font-heading font-bold text-xs shadow-md transition-all active:scale-98"
            title={`View @${brand.instagramHandle} on Instagram`}
          >
            <InstagramIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>View Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </a>
        ) : null}

        <Link
          to="/portfolio"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cyan-300 hover:text-white font-heading font-bold text-[11px] transition-colors"
        >
          <span>View Deliverables</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function ClientsSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Smooth fade-in reveal when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Drag-to-scroll support for mouse/trackpad
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Repeat items to guarantee seamless continuous infinite loop without any blank gaps
  const marqueeItems = [
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
    ...CLIENT_BRANDS,
  ];

  return (
    <section
      id="clients"
      ref={sectionRef}
      className={`py-16 sm:py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-label="Brands We've Worked With"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Section Header Container */}
      <div className="site-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            {/* Small Label: OUR CLIENTS */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-cyan-accent text-xs font-mono font-bold uppercase tracking-wider mb-3 backdrop-blur-sm shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-accent-yellow fill-current" />
              <span>OUR CLIENTS</span>
            </div>

            {/* Main Heading: Brands We've Worked With */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Brands We've{' '}
              <span className="bg-gradient-to-r from-cyan-accent via-blue-400 to-accent-yellow bg-clip-text text-transparent">
                Worked With
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Building digital experiences and helping businesses grow through creative strategies and digital solutions.
            </p>
          </div>


        </div>
      </div>

      {/* Animated Horizontal Marquee Carousel Track */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left & Right Vignette Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 lg:w-40 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 lg:w-40 bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent z-20" />

        {/* Scrollable Track Wrapper with Drag Support */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`relative overflow-x-auto overflow-y-hidden w-full flex scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] py-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <div
            className={`flex py-2 will-change-transform ${
              isPaused ? 'clients-marquee-paused' : 'animate-clients-marquee'
            }`}
          >
            {marqueeItems.map((brand, idx) => (
              <ClientCard
                key={`${brand.id}-${idx}`}
                brand={brand}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Reassurance Strip */}
      <div className="site-container relative z-10 mt-10 sm:mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 max-w-xl mx-auto backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Hover over any client card to pause auto-scroll. Drag horizontally to browse.
          </span>
        </div>
      </div>
    </section>
  );
}
