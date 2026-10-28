import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export default function PortfolioCard({ project }) {
  const isRotiWala = project.id === 'rotiwala';

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-card-soft hover:shadow-card-hover transition-all duration-300">
      {/* Visual Header / Mockup Banner */}
      <div className="relative h-64 sm:h-72 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 flex flex-col justify-between overflow-hidden text-white">
        {/* Subtle decorative circles & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <Badge variant="yellow" size="sm" className="shadow-sm">
            {project.category}
          </Badge>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Graphic Showcase Center */}
        <div className="relative z-10 my-auto text-center py-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg mb-3">
            <Utensils className="w-8 h-8" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight drop-shadow-sm">
            {project.client}
          </h4>
          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-sm mx-auto mt-1 line-clamp-1">
            {project.tagline}
          </p>
        </div>

        {/* Bottom Banner Tag */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/80 border-t border-white/15 pt-3">
          <span>Social Media & Reel Strategy</span>
          <span className="font-semibold text-accent-yellow">Client Spotlight</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-content-muted leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Scope of Work Pills */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-navy-900/80 mb-2.5 block">
            Scope of Services
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.scope.map((item, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-surface-light border border-slate-200/80 text-content-dark font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Transparent Notice regarding metrics (NO fake statistics) */}
        {project.isMetricsPending && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950">Client Transparency Notice</span>
              <span>{project.metricsNotice}</span>
            </div>
          </div>
        )}

        {/* Action Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover group-hover:translate-x-1 transition-all"
          >
            <span>View Full Case Study</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-content-muted font-medium">
            Active Campaign
          </span>
        </div>
      </div>
    </div>
  );
}
