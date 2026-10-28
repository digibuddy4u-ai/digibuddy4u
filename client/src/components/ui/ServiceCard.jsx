import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Palette,
  Video,
  TrendingUp,
  Compass,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP = {
  Share2,
  Palette,
  Video,
  TrendingUp,
  Compass,
  Layers,
};

export default function ServiceCard({ service, index = 0 }) {
  const IconComponent = ICON_MAP[service.icon] || Share2;

  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1.5">
      {/* Top subtle accent line on hover */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-cyan-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full" />

      <div>
        {/* Icon & Index */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center p-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-3xl font-heading font-black text-slate-200 group-hover:text-primary/20 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-900 group-hover:text-primary transition-colors leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-sm sm:text-base text-content-muted leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Key Deliverables bullets */}
        {service.deliverables && (
          <div className="mt-5 pt-5 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900/70 mb-3 block">
              Key Deliverables
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-content-dark">
              {service.deliverables.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover group-hover:translate-x-1 transition-all"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="text-xs font-semibold text-content-muted hover:text-navy-900 transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
