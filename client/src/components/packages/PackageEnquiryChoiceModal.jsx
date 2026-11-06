import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, FileText, X, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { BRAND } from '../../utils/brandConstants';

export default function PackageEnquiryChoiceModal({ isOpen, onClose, pkg }) {
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  if (!isOpen || !pkg) return null;

  const phone = settings?.phone || BRAND.phone;
  const cleanPhone = phone.replace(/\D/g, '');
  const packagePrice = pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`;
  const packageTitle = `${pkg.name} Package (${packagePrice})`;

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hi DigiBuddy4U! I am interested in your ${packageTitle}. Please share more details, deliverables, and onboarding steps for my business.`
    );
    const url = `https://wa.me/${cleanPhone}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleViewDetailsClick = () => {
    onClose();
    navigate(`/packages/${pkg.slug || 'growth'}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="choice-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 bg-navy-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-4 xs:p-6 sm:p-8 text-navy-950 animate-in zoom-in-95 duration-200">
        {/* Decorative Top Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag & Selected Package Pill */}
        <div className="space-y-2 mb-5 sm:mb-6 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="truncate">Selected: {pkg.name} • {packagePrice}</span>
          </div>

          <h2 id="choice-modal-title" className="text-xl xs:text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight leading-snug break-words">
            Ready to Get Started with {pkg.name}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Connect directly with our digital growth strategist on <strong>WhatsApp</strong> for instant onboarding, or explore the full deliverables specification.
          </p>
        </div>

        {/* Action Options */}
        <div className="space-y-3 sm:space-y-3.5">
          {/* Primary Option: WhatsApp Connect */}
          <div
            onClick={handleWhatsAppClick}
            className="group relative p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/40 border-2 border-[#25D366] hover:border-[#1EBE5D] hover:shadow-lg transition-all cursor-pointer ring-2 ring-emerald-500/10"
          >
            <div className="flex items-start justify-between gap-2.5 sm:gap-3">
              <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-9 xs:w-11 h-9 xs:h-11 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1EBE5D] text-white flex items-center justify-center shadow-md flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 xs:w-6 h-5 xs:h-6 fill-current" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
                    <h3 className="text-sm xs:text-base sm:text-lg font-heading font-extrabold text-navy-950">
                      Connect on WhatsApp
                    </h3>
                    <span className="text-[9px] xs:text-[10px] font-bold uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 rounded-full">
                      Fastest • ~5 Mins
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Chat directly with our marketing strategist. Get the complete campaign roadmap, posting calendar, and onboarding details instantly.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 text-[#25D366] group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
            </div>

            <div className="mt-3 pt-2.5 border-t border-emerald-100 flex flex-wrap items-center justify-between text-xs font-bold text-emerald-700 gap-1">
              <span>Open WhatsApp Chat directly</span>
              <span className="flex items-center gap-1 font-mono">
                <span>@{cleanPhone}</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Secondary Option: View Full Package Details */}
          <div
            onClick={handleViewDetailsClick}
            className="group relative p-3.5 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2.5 sm:gap-3">
              <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-9 xs:w-11 h-9 xs:h-11 rounded-2xl bg-slate-200/80 group-hover:bg-primary text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5 group-hover:scale-110 transition-all">
                  <FileText className="w-5 xs:w-6 h-5 xs:h-6" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
                    <h3 className="text-sm xs:text-base sm:text-lg font-heading font-extrabold text-navy-950">
                      View Full Package Scope
                    </h3>
                    <span className="text-[9px] xs:text-[10px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      Specifications
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Inspect complete reels schedules, camera shooting specs, carousel limits, and deliverables on the site.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
            </div>
          </div>
        </div>

        {/* Footer Link: Maybe Later / Direct Details */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleViewDetailsClick}
            className="text-primary hover:underline font-bold flex items-center gap-1"
          >
            <span>Maybe Later, Explore {pkg.name} Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
