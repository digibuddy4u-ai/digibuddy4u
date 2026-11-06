import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { BRAND } from '../../utils/brandConstants';

export default function AutoWhatsAppPopup({ delayMs = 60000 }) {
  const { settings } = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('digibuddy_auto_wp_dismissed');
    if (dismissed) return;

    // Set 1-minute (60 seconds) timer
    const timer = setTimeout(() => {
      const stillDismissed = sessionStorage.getItem('digibuddy_auto_wp_dismissed');
      if (!stillDismissed) {
        setIsVisible(true);
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('digibuddy_auto_wp_dismissed', 'true');
  };

  const handleOpenWhatsApp = () => {
    handleDismiss();
    const phone = settings?.phone || BRAND.phone;
    const cleanPhone = phone.replace(/\D/g, '');
    const prefilledMessage = encodeURIComponent(
      'Hi DigiBuddy4U, I was exploring your website and want to discuss digital marketing growth packages for my business.'
    );
    const url = `https://wa.me/${cleanPhone}?text=${prefilledMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="auto-wp-title"
      className="fixed bottom-24 sm:bottom-24 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-32px)] sm:w-96 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-3xl bg-white border-2 border-emerald-500/40 shadow-2xl p-5 text-navy-950 relative overflow-hidden ring-4 ring-emerald-500/10">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors"
          aria-label="Close WhatsApp prompt"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Active Support Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active on WhatsApp Now
          </span>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Replies in ~2 mins
          </span>
        </div>

        {/* Content Body */}
        <div className="space-y-1.5 pr-4">
          <h3 id="auto-wp-title" className="text-base sm:text-lg font-heading font-extrabold text-navy-950 leading-snug">
            Need Help Choosing the Right Plan? 👋
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our digital growth strategists are active right now. Get a personalized roadmap, custom package quote, or instant answers on WhatsApp!
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] text-white font-heading font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
