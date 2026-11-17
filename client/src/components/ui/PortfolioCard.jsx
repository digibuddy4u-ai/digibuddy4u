import React from 'react';
import {
  ExternalLink,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  MessageCircle,
} from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import Badge from '../common/Badge';
import { BRAND } from '../../utils/brandConstants';

export default function PortfolioCard({ project }) {
  const whatsappUrl = `${BRAND.whatsappUrl}&text=${encodeURIComponent(
    `Hi DigiBuddy4U, I saw your work with ${project.client} and would like to discuss a similar project for my business.`
  )}`;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      {/* Visual Header / Mockup Banner */}
      <div
        className={`relative h-56 sm:h-64 bg-gradient-to-br ${
          project.bannerGradient || 'from-slate-900 via-navy-950 to-slate-950'
        } p-6 flex flex-col justify-between overflow-hidden text-white`}
      >
        {/* Subtle decorative circles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <Badge variant="yellow" size="sm" className="shadow-xs font-semibold">
            {project.category}
          </Badge>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/30 backdrop-blur-md text-white border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            {project.status || 'Active Client'}
          </span>
        </div>

        {/* Graphic Showcase Center */}
        <div className="relative z-10 my-auto flex items-center gap-4 pt-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-lg flex-shrink-0 flex items-center justify-center border border-white/20">
            {project.logo ? (
              <img
                src={project.logo}
                alt={`${project.client} logo`}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            ) : (
              <Layers className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-white drop-shadow-sm truncate">
              {project.client}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-1 mt-0.5">
              {project.industry}
            </p>
            {project.location && (
              <div className="flex items-center gap-1 text-[11px] text-accent-yellow mt-1 font-medium">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Banner Tag */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/80 border-t border-white/15 pt-2.5">
          <span className="line-clamp-1 text-[11px] sm:text-xs text-slate-300">
            {project.tagline}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-base sm:text-lg font-heading font-bold text-navy-950 group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-content-muted leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Scope of Services Pills */}
          {project.scope && project.scope.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Scope of Work Executed
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.scope.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-light border border-slate-200/80 text-navy-900 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Deliverables Checklist */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="p-4 rounded-2xl bg-surface-light/70 border border-slate-200/70 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deliverables & Creative Assets</span>
              </span>
              <ul className="space-y-1.5">
                {project.deliverables.map((d, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Link & Socials */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {project.instagramUrl ? (
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#E1306C] text-xs font-bold transition-colors shadow-2xs"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@{project.instagramHandle}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span />
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors ml-auto shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
