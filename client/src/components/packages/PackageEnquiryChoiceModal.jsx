import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Globe, X, ArrowRight, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { BRAND } from '../../utils/brandConstants';

export default function PackageEnquiryChoiceModal({ isOpen, onClose, pkg }) {
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  if (!isOpen || !pkg) return null;

  const phone = settings?.phone || BRAND.phone;
  const cleanPhone = phone.replace(/\D/g, '');
  const packageTitle = `${pkg.name} Package (${pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`})`;

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hi DigiBuddy4U! I am interested in your ${packageTitle}. Please share more details, deliverables, and onboarding steps for my business.`
    );
    const url = `https://wa.me/${cleanPhone}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleWebsiteClick = () => {
    onClose();
    navigate(`/contact?plan=${encodeURIComponent(packageTitle)}`);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-8 text-navy-950 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag & Selected Package Pill */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Package Selected: {pkg.name}</span>
          </div>

          <h2 id="choice-modal-title" className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight leading-snug">
            તમે કેવી રીતે આગળ વધવા માંગો છો?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Would you like to enquire directly on <strong>WhatsApp</strong> or continue on the <strong>Website</strong>?
          </p>
        </div>

        {/* 2 Main Choice Options */}
        <div className="space-y-3.5">
          {/* Option 1: WhatsApp Enquiry (Featured & Recommended) */}
          <div
            onClick={handleWhatsAppClick}
            className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 border-2 border-[#25D366] hover:border-[#1EBE5D] hover:shadow-lg transition-all cursor-pointer ring-2 ring-emerald-500/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1EBE5D] text-white flex items-center justify-center shadow-md flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-navy-950">
                      WhatsApp પર Inquiry કરો
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 rounded-full">
                      Fastest • 5 Min
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    અમારા Marketing Strategist સાથે સીધી વાત કરો. પેકેજ ડિટેલ્સ અને ઑનબોર્ડિંગ પ્લાન તરત જ WhatsApp પર મળશે.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#25D366] group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
            </div>

            <div className="mt-3 pt-2.5 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Open WhatsApp Chat directly</span>
              <span className="flex items-center gap-1 font-mono">
                <span>@{cleanPhone}</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Option 2: Website Direct Flow */}
          <div
            onClick={handleWebsiteClick}
            className="group relative p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-slate-200/80 group-hover:bg-primary text-slate-700 group-hover:text-white flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5 group-hover:scale-110 transition-all">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-navy-950">
                      Website પર ફોર્મ ભરીને જુઓ
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      Online Form
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    તમારી બિઝનેસ વિગતો વેબસાઇટ પર જ ભરો અને ઓનલાઇન Custom Quote મેળવો.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
            </div>
          </div>
        </div>

        {/* Alternative link: View full details on site */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleViewDetailsClick}
            className="text-primary hover:underline font-bold"
          >
            Explore {pkg.name} Full Deliverables Scope &rarr;
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
