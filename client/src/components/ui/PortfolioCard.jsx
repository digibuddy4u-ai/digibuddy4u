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
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Compact Banner Header */}
      <div
        className={`relative bg-gradient-to-br ${
          project.bannerGradient || 'from-slate-900 via-navy-950 to-slate-950'
        } p-4 sm:p-5 text-white overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

        {/* Top Meta: Category & Status */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <Badge variant="yellow" size="sm" className="shadow-2xs text-[10px] font-bold px-2 py-0.5">
            {project.category}
          </Badge>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/40 backdrop-blur-md text-white border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>Active</span>
          </span>
        </div>

        {/* Brand Emblem & Name */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1.5 shadow-md flex-shrink-0 flex items-center justify-center border border-white/20">
            {project.logo ? (
              <img
                src={project.logo}
                alt={`${project.client} logo`}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            ) : (
              <Layers className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-heading font-extrabold tracking-tight text-white drop-shadow-xs truncate">
              {project.client}
            </h3>
            <p className="text-xs text-slate-200 line-clamp-1">
              {project.industry}
            </p>
            {project.location && (
              <div className="flex items-center gap-1 text-[11px] text-accent-yellow mt-0.5 font-medium truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compact Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-3">
          <p className="text-xs text-content-muted leading-relaxed line-clamp-2">
            {project.overview}
          </p>

          {/* Scope of Work Pills */}
          {project.scope && project.scope.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Scope & Capabilities
              </span>
              <div className="flex flex-wrap gap-1">
                {project.scope.slice(0, 4).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-surface-light border border-slate-200 text-navy-900 font-medium"
                  >
                    {item}
                  </span>
                ))}
                {project.scope.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                    +{project.scope.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Key Deliverables Highlights */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Deliverables Snapshot</span>
              </span>
              <ul className="space-y-1">
                {project.deliverables.slice(0, 2).map((d, i) => (
                  <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug line-clamp-1">
                    <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                    <span className="truncate">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Link & Socials */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {project.instagramUrl ? (
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#E1306C] text-xs font-bold transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span />
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors ml-auto"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
