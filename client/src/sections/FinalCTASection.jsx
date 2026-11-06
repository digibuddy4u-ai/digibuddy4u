import React from 'react';
import { ArrowRight, MessageCircle, Mail, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '../components/common/SocialIcons';
import Button from '../components/common/Button';
import { BRAND } from '../utils/brandConstants';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function FinalCTASection() {
  const { settings } = useSiteSettings();
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white text-navy-950 relative overflow-hidden border-t border-slate-100">
      {/* Background radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,102,245,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative site-container text-center space-y-6 sm:space-y-8">
        <div className="max-w-4xl xl:max-w-5xl mx-auto space-y-4 sm:space-y-5">
          {/* Headline */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-navy-950 leading-tight break-words">
            Ready to Build a Stronger{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Digital Presence?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you need strategic social media management, high-converting paid ads, a modern website, or bespoke software — {settings.businessName || BRAND.name} is ready to grow with you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
          <Button
            to="/contact"
            variant="yellow"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto justify-center text-center shadow-elevated font-bold"
          >
            Let's Grow Together
          </Button>

          <a
            href={settings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md hover:shadow-lg text-center"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp ({settings.phone})</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Complimentary Strategy & Tech Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Client Pre-Approval on Deliverables</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Transparent Pricing & Zero Fake Data</span>
          </div>
        </div>

        {/* Direct Contact Bar & Socials */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm text-slate-600 font-medium max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${BRAND.email}`}
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>{BRAND.email}</span>
            </a>
            <a
              href={`tel:${BRAND.phone}`}
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-accent-yellow" />
              <span>{BRAND.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Follow:</span>
            <a
              href={BRAND.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DigiBuddy4U on Instagram"
              title="Instagram"
              className="w-8 h-8 rounded-lg bg-surface-light border border-slate-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 flex items-center justify-center transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={BRAND.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DigiBuddy4U on Facebook"
              title="Facebook"
              className="w-8 h-8 rounded-lg bg-surface-light border border-slate-200 text-slate-700 hover:text-[#1877F2] hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={BRAND.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DigiBuddy4U on LinkedIn"
              title="LinkedIn"
              className="w-8 h-8 rounded-lg bg-surface-light border border-slate-200 text-slate-700 hover:text-[#0A66C2] hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
