import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';
import { BRAND, NAV_LINKS } from '../../utils/brandConstants';
import { SERVICES_DATA } from '../../utils/servicesData';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export default function Footer() {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 pt-12 pb-10 sm:pt-14 sm:pb-12 border-t border-slate-200">
      <div className="site-container">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-slate-200">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" showTagline={true} size="md" />
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mt-3">
              {settings.footerBio ||
                'DigiBuddy4U is your full-service digital growth and technology partner. We empower modern businesses through strategic marketing, viral-ready video reels, performance ads, custom websites, and tailored software solutions.'}
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2.5 text-slate-700 hover:text-primary transition-colors font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{settings.email}</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2.5 text-slate-700 hover:text-primary transition-colors font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-accent-yellow">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{settings.phone}</span>
              </a>

              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#25D366] hover:underline transition-colors font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span>Chat on WhatsApp ({settings.phone})</span>
              </a>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-navy-950 uppercase tracking-wider block mb-2">
                Follow DigiBuddy4U
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={settings.socials?.instagram || BRAND.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow DigiBuddy4U on Instagram"
                  title="Follow us on Instagram"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all group"
                >
                  <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={settings.socials?.facebook || BRAND.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow DigiBuddy4U on Facebook"
                  title="Connect on Facebook"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-[#1877F2] hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={settings.socials?.linkedin || BRAND.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with DigiBuddy4U on LinkedIn"
                  title="Connect on LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-[#0A66C2] hover:border-sky-300 hover:bg-sky-50 transition-all group"
                >
                  <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={settings.whatsappUrl || BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp message"
                  title="WhatsApp Us"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#25D366] hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-navy-950 text-xs tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Services (All 14)
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Our Work (Portfolio)
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-primary transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-navy-950 text-xs tracking-wider uppercase">
              Core Divisions
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1.5">
                  Digital Marketing
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>
                    <Link to="/services/social-media-marketing" className="hover:text-primary transition-colors font-medium">
                      Social Media Marketing (SMM)
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/performance-marketing" className="hover:text-primary transition-colors font-medium">
                      Performance Marketing & Paid Ads
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/branding-creative-design" className="hover:text-primary transition-colors font-medium">
                      Branding & Creative Design
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/video-production-content-creation" className="hover:text-primary transition-colors font-medium">
                      Reels & Video Production
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 block mb-1.5">
                  IT & Software
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>
                    <Link to="/services/website-development" className="hover:text-primary transition-colors font-medium">
                      Website Design & Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/web-application-development" className="hover:text-primary transition-colors font-medium">
                      Custom Web Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/mobile-app-development" className="hover:text-primary transition-colors font-medium">
                      Mobile Apps (Android & Flutter)
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-software-development" className="hover:text-primary transition-colors font-medium">
                      Custom ERP & Software
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Client Spotlight & Trust Badge */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-navy-950 text-xs tracking-wider uppercase">
              Client Showcase
            </h3>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-card-soft space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                Featured Brand
              </span>
              <h4 className="text-sm font-bold text-navy-950">RotiWala</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Brand positioning, video reels, and social media management for homestyle daily meals.
              </p>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-1"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#25D366] flex-shrink-0" />
              <span>Verified Campaign Deliverables</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {BRAND.name}. All rights reserved. {BRAND.tagline}.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Support & Contact
            </Link>
            <span className="inline-flex items-center gap-1 text-slate-500">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for brand growth
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
