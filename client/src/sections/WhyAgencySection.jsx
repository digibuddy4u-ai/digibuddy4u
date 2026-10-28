import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Badge from '../components/common/Badge';

export default function WhyAgencySection() {
  const CHALLENGES = [
    {
      title: 'Shrinking Attention & Content Noise',
      desc: 'Capture distracted audiences with distinct visual hooks, clear messaging, and high-retention creative.',
    },
    {
      title: 'Disjointed Freelancers & Mixed Messaging',
      desc: 'Align creative content, ad campaigns, and web presence under one unified strategy without vendor friction.',
    },
    {
      title: 'Wasted Ad Budgets on Vanity Metrics',
      desc: 'Deploy structured audience segmentation and conversion tracking to generate qualified inquiries, not empty likes.',
    },
    {
      title: 'Slow Websites & Leaky Conversion Funnels',
      desc: 'Convert visitors into customers with sub-second page loads, responsive mobile UX, and frictionless lead paths.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white text-navy-950 relative overflow-hidden border-t border-slate-100">
      {/* Subtle background glow decorators */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STRATEGIC NARRATIVE & APPROACH               */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            <Badge variant="blue" size="sm">
              The Strategic Difference
            </Badge>

            {/* Main Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-heading text-navy-950 tracking-tight leading-[1.15]">
              Your Business Deserves More Than{' '}
              <span className="text-primary">Just Marketing.</span>
            </h2>

            {/* Concise Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We combine creative strategy, digital marketing, and technology to help businesses stand out, attract the right customers, and build lasting growth.
            </p>

            {/* Principle Highlight Box */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-blue-50/70 border-l-4 border-primary">
              <span className="block font-bold text-primary mb-1 text-xs uppercase tracking-wider font-mono">
                THE DIGIBUDDY4U APPROACH
              </span>
              <p className="text-sm sm:text-base font-bold text-navy-950 leading-snug">
                Strategy first. Creativity that connects. Technology that performs.
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1 w-full">
              {CHALLENGES.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-xs transition-all duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-950 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Partner with DigiBuddy4U</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all"
              >
                <span>Explore All Services</span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: HIGH-CONTRAST CREATIVE BANNER CARD          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-lg lg:max-w-none group">
              {/* Outer decorative ambient glow */}
              <div
                className="absolute -inset-2 rounded-[32px] opacity-75 blur-xl transition-opacity duration-500 group-hover:opacity-100 -z-10"
                style={{
                  background:
                    'radial-gradient(circle, rgba(8, 102, 245, 0.35) 0%, rgba(24, 213, 232, 0.2) 60%, transparent 80%)',
                }}
              />

              {/* Main Banner Visual Frame */}
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(7,26,56,0.35)] border-2 border-slate-900/10 bg-[#071A38]">
                <img
                  src="/images/why-creative-agency-banner.png"
                  alt="Why Every Business Needs A Creative Advertising Agency - DigiBuddy4U"
                  className="w-full h-auto object-cover block select-none transform transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Bottom subtle brand trust strip */}
                <div className="bg-[#05142E] px-5 py-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#18D5E8] animate-pulse" />
                    <span className="text-[11px] font-mono text-slate-300 font-semibold tracking-wide">
                      DigiBuddy4U &bull; Full-Stack Growth
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary/30 text-blue-200 border border-primary/40">
                    Marketing + IT
                  </span>
                </div>
              </div>

              {/* Floating Badge (Top Right) */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 bg-white text-navy-950 px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200/80 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>The DigiBuddy4U Approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
