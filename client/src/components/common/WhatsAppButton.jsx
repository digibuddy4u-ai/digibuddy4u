import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Mail, X } from 'lucide-react';
import { BRAND } from '../../utils/brandConstants';

export default function WhatsAppButton({ floating = true, text = 'WhatsApp', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Non-floating inline button
  if (!floating) {
    return (
      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1EBE5D] transition-all shadow-md active:scale-95 ${className}`}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>{text}</span>
      </a>
    );
  }

  return (
    <aside
      ref={widgetRef}
      aria-label="Quick Communication Speed Dial"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Expanded Action Icons (WhatsApp & Email only) */}
      {isOpen && (
        <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* 1. WhatsApp Icon Button */}
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Chat on WhatsApp"
          >
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-navy-950 text-white shadow-md border border-navy-800 transition-opacity opacity-90 group-hover:opacity-100">
              WhatsApp
            </span>
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-[#20BA59] hover:scale-110 active:scale-95 transition-all duration-200">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
          </a>

          {/* 2. Email Icon Button */}
          <a
            href={`mailto:${BRAND.email}?subject=Inquiry for DigiBuddy4U Digital Marketing & Growth Services`}
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Send an Email"
          >
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-navy-950 text-white shadow-md border border-navy-800 transition-opacity opacity-90 group-hover:opacity-100">
              Email
            </span>
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-primary-hover hover:scale-110 active:scale-95 transition-all duration-200">
              <Mail className="w-5 h-5" />
            </div>
          </a>
        </div>
      )}

      {/* Main Circular Floating Trigger Button (Pure Icon, No Text) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${
          isOpen
            ? 'bg-navy-950 text-white focus:ring-navy-900/30'
            : 'bg-gradient-to-tr from-primary to-blue-600 text-white focus:ring-primary/40'
        }`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        {/* Subtle pulsing glow when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-primary/30 blur-sm animate-pulse -z-10" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-7 h-7 fill-white/20 text-white transition-transform duration-200" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
        )}
      </button>
    </aside>
  );
}
