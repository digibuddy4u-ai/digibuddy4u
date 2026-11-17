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
import { BRAND } from '../../utils/brandConstants';

export default function PortfolioCard({ project }) {
  const whatsappUrl = `${BRAND.whatsappUrl}&text=${encodeURIComponent(
    `Hi DigiBuddy4U, I saw your work with ${project.client} and would like to discuss a similar project for my business.`
  )}`;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#0866F5]/10 hover:border-[#0866F5]/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Top Thin Electric-Blue Accent Line */}
      <div className="h-1 w-full bg-[#0866F5] opacity-90 group-hover:opacity-100 transition-opacity relative z-20" />

      {/* Client Logo Watermark in Background (30% to 40% Opacity) */}
      {project.logo && (
        <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none select-none overflow-hidden z-0">
          <img
            src={project.logo}
            alt=""
            aria-hidden="true"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain opacity-[0.32] group-hover:opacity-[0.40] group-hover:scale-105 transition-all duration-300 filter"
          />
        </div>
      )}

      {/* Corporate Minimal Header */}
      <div className="p-5 sm:p-6 pb-4 border-b border-[#E2E8F0] bg-white/85 backdrop-blur-xs relative z-10">
        {/* Top Meta: Category & Green Active Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-[#F5F8FC]/90 text-[#071A38] border border-[#E2E8F0]">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50/90 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>Active</span>
          </span>
        </div>

        {/* Client Identity: Consistent White Logo Container & Bold Navy Typography */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-xl bg-white border border-[#E2E8F0] p-2 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:border-[#0866F5]/40 transition-colors">
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
              <Layers className="w-6 h-6 text-[#0866F5]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-heading font-bold text-[#071A38] tracking-tight group-hover:text-[#0866F5] transition-colors truncate">
              {project.client}
            </h3>
            <p className="text-xs text-[#64748B] font-medium line-clamp-1 mt-0.5">
              {project.industry}
            </p>
            {project.location && (
              <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5 font-medium truncate">
                <MapPin className="w-3 h-3 text-[#0866F5] flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 pt-4 flex-1 flex flex-col justify-between space-y-4 bg-white/75 backdrop-blur-2xs relative z-10">
        <div className="space-y-3.5">
          <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed line-clamp-2">
            {project.overview}
          </p>

          {/* Scope of Work Pills */}
          {project.scope && project.scope.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#071A38]/70 mb-1.5 block">
                Scope & Capabilities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.scope.slice(0, 4).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#F5F8FC]/90 border border-[#E2E8F0] text-[#071A38] font-medium shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
                {project.scope.length > 4 && (
                  <span className="text-[10px] px-2 py-1 rounded-md bg-[#F5F8FC]/90 text-[#64748B] font-medium border border-[#E2E8F0]">
                    +{project.scope.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Key Deliverables Snapshot Box */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="p-3 rounded-xl bg-[#F5F8FC]/90 border border-[#E2E8F0] space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0866F5] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deliverables Snapshot</span>
              </span>
              <ul className="space-y-1.5">
                {project.deliverables.slice(0, 2).map((d, i) => (
                  <li key={i} className="text-xs text-[#64748B] flex items-start gap-2 leading-snug line-clamp-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0866F5] flex-shrink-0 mt-0.5" />
                    <span className="truncate">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Link & Socials */}
        <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
          {project.instagramUrl ? (
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F5F8FC] text-[#071A38] hover:text-[#0866F5] text-xs font-semibold transition-colors shadow-2xs"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Instagram</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          ) : (
            <span />
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0866F5] hover:bg-[#0652C5] text-white text-xs font-semibold shadow-xs transition-colors ml-auto"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
