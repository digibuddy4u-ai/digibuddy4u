import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../components/common/SocialIcons';
import { CLIENT_BRANDS } from '../utils/clientsData';

export default function ClientsSection() {
  return (
    <section id="clients" className="py-16 sm:py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Premium Ambient Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-cyan-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow fill-current" />
            <span>Proven Track Record • Real Brand Projects</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Brands We've <span className="bg-gradient-to-r from-cyan-accent via-blue-400 to-accent-yellow bg-clip-text text-transparent">Worked With</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Helping businesses build their digital presence through creative content, social media management and digital solutions.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {CLIENT_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:bg-white/[0.1] hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

              <div>
                {/* Logo & Category Badge */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/15 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-cyan-400/40 transition-transform duration-300 overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} official logo`}
                      className="w-full h-full object-contain rounded-xl"
                      loading="lazy"
                    />
                  </div>

                  <span className="mt-4 inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/20 px-2.5 py-0.5 rounded-full">
                    {brand.badge}
                  </span>

                  {/* Brand Name */}
                  <h3 className="mt-3 text-lg font-heading font-extrabold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                    {brand.name}
                  </h3>

                  {/* Industry */}
                  <p className="mt-1.5 text-xs font-semibold text-slate-300 leading-snug">
                    {brand.industry}
                  </p>

                  {/* Focus Scope */}
                  <p className="mt-3 text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                    {brand.focus}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                {brand.instagramUrl && (
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-blue-700 text-white font-heading font-bold text-xs shadow-md transition-all active:scale-98"
                    title={`Open @${brand.instagramHandle} on Instagram`}
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>View Instagram</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {brand.caseStudyUrl && (
                  <Link
                    to={brand.caseStudyUrl}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cyan-300 hover:text-white font-heading font-bold text-[11px] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Footer Strip */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 max-w-xl mx-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Real accounts & growth campaigns executed with dedicated creative direction and measurable impact.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
