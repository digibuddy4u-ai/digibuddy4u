import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Plus,
  Check,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { BRAND } from '../../utils/brandConstants';

export default function AddonDetailModal({
  addon,
  isOpen,
  onClose,
  onToggleCart,
  isInCart,
  visuals,
}) {
  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !addon) return null;

  const ItemIcon = visuals?.icon || Sparkles;
  const gradient = visuals?.gradient || 'from-blue-600 to-indigo-600';

  // Handle WhatsApp direct inquiry
  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hi DigiBuddy4U! I am interested in the "${addon.title}" service (${addon.priceDisplay}). Please share more details and availability.`
    );
    window.open(`https://wa.me/918141478024?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="addon-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      {/* Dark frosted backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200/90 z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Top Header with Gradient Icon, Title & Close Button */}
        <div className="p-6 sm:p-8 pb-5 border-b border-slate-100 relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-4">
              {/* Circular Glowing Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${gradient} ring-4 ring-slate-100 shadow-md`}
              >
                <ItemIcon className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                  {addon.category}
                </span>
                <h3
                  id="addon-modal-title"
                  className="text-xl sm:text-2xl font-heading font-black text-navy-950 tracking-tight leading-snug"
                >
                  {addon.title}
                </h3>
              </div>
            </div>

            {/* Price Box */}
            <div className="rounded-2xl bg-blue-50/90 border border-blue-200/80 px-4 py-2 sm:text-right shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Estimated Price
              </span>
              <span className="text-base sm:text-lg font-heading font-black text-navy-950">
                {addon.priceDisplay}
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {addon.shortDescription || addon.subtitle}
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* 1. What's Included ("shu che") */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-navy-950 flex flex-wrap items-center gap-2">
                <span>Everything Included In This Service</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 normal-case">
                  (શું સમાવેલ છે)
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(addon.inclusions || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. What's Not Included / Key Notes ("shu ny") */}
          {(addon.exclusions || []).length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-slate-800 flex flex-wrap items-center gap-2">
                  <span>Important Scope Notes & Exclusions</span>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-300/60 normal-case">
                    (શું સમાવેલ નથી)
                  </span>
                </h4>
              </div>

              <div className="space-y-2">
                {addon.exclusions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950"
                  >
                    <span className="text-amber-600 font-bold">•</span>
                    <span className="font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* WhatsApp Direct Enquiry */}
          <button
            type="button"
            onClick={handleWhatsAppEnquiry}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enquire on WhatsApp</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Add to Shortlist Toggle Button */}
            <button
              type="button"
              onClick={() => onToggleCart(addon)}
              className={`w-full sm:w-auto px-6 py-3 rounded-full font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-blue-500/25'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added in Shortlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add to Quotation</span>
                </>
              )}
            </button>

            {/* Done / Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-full bg-white hover:bg-slate-200 border border-slate-300 text-slate-600 font-heading font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
