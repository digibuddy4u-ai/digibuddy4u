import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '../components/common/SocialIcons';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import ContactForm from '../components/ui/ContactForm';
import Badge from '../components/common/Badge';
import { BRAND } from '../utils/brandConstants';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function ContactPage() {
  const { settings } = useSiteSettings();
  return (
    <>
      <SEO
        title="Contact Us — Start Growing Your Brand"
        description={`Get in touch with DigiBuddy4U. Connect directly via WhatsApp (${settings.phone}) or email ${settings.email} for your custom digital growth roadmap.`}
      />

      {/* Header Banner */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Let’s Build Something <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Exceptional.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have a question, need a quote, or want to discuss scaling your brand’s social footprint? Our senior marketing team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Direct Contact Info & Guarantees (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <Badge variant="blue" className="mb-3">
                  Direct Channels
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900 leading-snug">
                  Fast Responses. <br />
                  <span className="text-primary">Zero Corporate Runaround.</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-content-muted leading-relaxed">
                  We value your time. Choose your preferred channel below or complete the inquiry form and we will review your brand details.
                </p>
              </div>

              {/* Contact Method Cards */}
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#25D366] transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25D366]">
                      Fastest Response (Instant)
                    </span>
                    <h3 className="text-base font-bold text-navy-900">
                      WhatsApp Chat
                    </h3>
                    <p className="text-sm text-content-muted mt-0.5">
                      {settings.phone}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-primary transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Official Inquiries
                    </span>
                    <h3 className="text-base font-bold text-navy-900">
                      Email Desk
                    </h3>
                    <p className="text-sm text-content-muted mt-0.5">
                      {settings.email}
                    </p>
                  </div>
                </a>

                {/* Phone Call */}
                <a
                  href={`tel:${settings.phone}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-accent-yellow transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-yellow/15 text-navy-900 group-hover:bg-accent-yellow transition-colors flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
                      Direct Voice Line
                    </span>
                    <h3 className="text-base font-bold text-navy-900">
                      Direct Phone
                    </h3>
                    <p className="text-sm text-content-muted mt-0.5">
                      {settings.phone}
                    </p>
                  </div>
                </a>
              </div>

              {/* Social Channels Connect Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  Follow Us Online
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Catch our latest vertical video reels, marketing breakdowns, and agency announcements:
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={settings.socials?.instagram || BRAND.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 text-xs font-semibold transition-all group"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={settings.socials?.facebook || BRAND.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#1877F2] hover:border-blue-300 hover:bg-blue-50 text-xs font-semibold transition-all group"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#1877F2] group-hover:scale-110 transition-transform" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={settings.socials?.linkedin || BRAND.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0A66C2] hover:border-sky-300 hover:bg-sky-50 text-xs font-semibold transition-all group"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="p-6 rounded-2xl bg-white text-navy-950 space-y-3.5 border border-slate-200/90 shadow-card-soft">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The DigiBuddy Commitment</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Average reply time: under 2 hours during business hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Complimentary 20-minute brand audit call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Strict privacy protection for your project details</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
