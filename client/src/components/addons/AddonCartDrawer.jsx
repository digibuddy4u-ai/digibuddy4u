import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Trash2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { useAddonCart } from '../../context/AddonCartContext';
import { BRAND } from '../../utils/brandConstants';

export default function AddonCartDrawer() {
  const {
    cartItems,
    totalCount,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    clearCart,
    selectedPackage,
    setSelectedPackage,
    getWhatsAppUrl,
  } = useAddonCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end animate-in fade-in duration-200">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-surface-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-navy-950 text-lg leading-tight">
                Selected Add-Ons
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {totalCount} {totalCount === 1 ? 'service' : 'services'} added to your quote
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: List of Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {totalCount === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-navy-900 text-base">
                Your Add-On Shortlist is Empty
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Click the <strong className="text-primary font-bold">+ icon</strong> on any extra capability below to customize your growth package.
              </p>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors"
              >
                <span>Browse Add-Ons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Optional Package Attachment Selector */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <Package className="w-4 h-4" />
                  <span>Attach to a Monthly Retainer? (Optional)</span>
                </div>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-blue-200 rounded-xl px-3 py-2 text-navy-950 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">No Package (Add-Ons Only / Standalone Quote)</option>
                  <option value="Social Media Starter (₹10,000/mo)">Social Media Starter (₹10,000/mo)</option>
                  <option value="Business Startup Setup (₹15,000 One-Time)">Business Startup Setup (₹15,000 One-Time)</option>
                  <option value="Business Growth (₹20,000/mo) - Most Popular">Business Growth (₹20,000/mo) - Most Popular</option>
                  <option value="Premium Brand Scale (₹80,000/campaign) - Premium">Premium Brand Scale (₹80,000/campaign) - Premium</option>
                </select>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {cartItems.map((item, idx) => (
                  <div
                    key={item.slug || item._id || idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-3 group hover:border-primary/40 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          {item.category || 'Add-On'}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-navy-950 text-sm leading-snug truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-slate-700">
                        {item.priceDisplay}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id || item.slug)}
                      className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                      title="Remove add-on"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear All shortcut */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All Items</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {totalCount > 0 && (
          <div className="p-5 sm:p-6 border-t border-slate-200 bg-surface-light space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>Selected Capabilities:</span>
              <strong className="text-navy-950 font-bold">{totalCount} Services</strong>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get Instant Quote on WhatsApp</span>
            </a>

            {/* Direct Formal Consultation Form Link */}
            <Link
              to={`/contact?plan=${encodeURIComponent(
                selectedPackage || 'Custom Add-Ons: ' + cartItems.map((i) => i.title).join(', ')
              )}`}
              onClick={closeDrawer}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <span>Submit Formal Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[10px] text-center text-slate-400">
              Zero obligation &bull; Direct answers from our senior team within hours
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
