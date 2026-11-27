import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Plus,
  Check,
  Target,
  Search,
  MapPin,
  TrendingUp,
  Globe,
  Layout,
  Code2,
  Camera,
  Smartphone,
  Video,
  Users,
  Palette,
  CreditCard,
  BookOpen,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { useAddonCart } from '../../context/AddonCartContext';
import { API_URL } from '../../utils/api';
import AddonDetailModal from './AddonDetailModal';

// Icon Map helper for add-ons
const ICON_MAP = {
  Target,
  Search,
  MapPin,
  TrendingUp,
  Globe,
  Layout,
  Code2,
  Camera,
  Smartphone,
  Video,
  Users,
  Palette,
  CreditCard,
  BookOpen,
  Sparkles,
  MessageCircle,
};

// 6 Core Featured Add-ons upfront on Home Page
const FEATURED_SIX_SLUGS = [
  'google-profile-setup',
  'website-basic',
  'corporate-videos-shoot-on-camera',
  'meta-ads',
  'seo-advance-on-page-and-off-page',
  'logo-design',
];

// Fallback baseline 17 add-ons with concise, point-to-point inclusions and exclusions
const ALL_ADDONS = [
  {
    title: 'Google Business Profile Setup',
    slug: 'google-profile-setup',
    category: 'Local Growth & Maps',
    badge: 'Local SEO',
    priceDisplay: '₹1,000 one-time',
    iconName: 'MapPin',
    subtitle: 'Complete GBP verification, Maps ranking & local review optimization.',
    shortDescription: 'Complete Google Business Profile setup, official verification assistance, and local category optimization. Helps local clients discover, call, and navigate to your business on Google Maps.',
    inclusions: [
      'Profile Setup & Verification',
      'Google Maps Location Pin Setup',
      'Photos, Logo & Cover Upload',
      'WhatsApp & Call Button Setup',
      'Products & Services Listing',
      'Review QR Code & Direct Link',
    ],
    exclusions: [
      'Google postcard delivery time depends on Google',
      'Paid Google Ads / Maps ads budget not included',
    ],
  },
  {
    title: 'Website Development',
    slug: 'website-basic',
    category: 'Website & IT',
    badge: 'Sub-Second Load',
    priceDisplay: 'From ₹5,000 one-time',
    iconName: 'Layout',
    subtitle: 'Modern, high-converting responsive business sites & landing pages.',
    shortDescription: 'Modern, high-speed single-page website or landing page with mobile responsiveness. Features click-to-WhatsApp action, contact forms, and instant speed optimization.',
    inclusions: [
      'Mobile & Desktop Responsive Design',
      'Click-to-Call & WhatsApp Lead Forms',
      'Sub-Second Page Load Speed',
      'Essential On-Page SEO Setup',
      'Social Links & Google Maps Embed',
      '1 Month Technical Support',
    ],
    exclusions: [
      'Domain & hosting renewal (billed at actuals)',
      'Online payment gateway (available in Custom Portal)',
    ],
  },
  {
    title: 'Corporate Video & Camera Shoot',
    slug: 'corporate-videos-shoot-on-camera',
    category: 'Video & Production',
    badge: 'Cinema 4K Quality',
    priceDisplay: 'From ₹5,000 / shoot day',
    iconName: 'Camera',
    subtitle: 'Cinema camera & iPhone shoots with pro lighting and creative direction.',
    shortDescription: 'High-end 4K production shoot inside Ahmedabad using cinematic mirrorless cameras, studio lighting, and pro mics. Perfect for founder stories, factory tours, and brand ad films.',
    inclusions: [
      'Cinema 4K Camera & Prime Lenses',
      'Studio Softbox Lighting Setup',
      'Wireless Collar Microphones',
      'Director & Cameraman On-Set',
      'Founder & Office B-Roll Coverage',
      'All Raw 4K Footage Delivery',
    ],
    exclusions: [
      'Video editing & motion graphics (billed separately)',
      'Travel outside Ahmedabad city limits',
    ],
  },
  {
    title: 'Meta & Google Ads Setup',
    slug: 'meta-ads',
    category: 'Paid Advertising',
    badge: 'High ROAS',
    priceDisplay: 'From ₹1,000 / campaign',
    iconName: 'Target',
    subtitle: 'High-converting Facebook, Instagram & Google search ad campaigns.',
    shortDescription: 'High-converting Facebook & Instagram ad campaigns with custom audience targeting. Includes A/B creative testing and direct WhatsApp / lead form conversion funnels.',
    inclusions: [
      'Meta Ads Account & Pixel Setup',
      'Target Audience & Radius Research',
      '2-3 Ad Creative Variations',
      'Click-to-WhatsApp Lead Funnel',
      'A/B Testing of Headlines & Copy',
      'Campaign Performance Report',
    ],
    exclusions: [
      'Direct ad spend budget paid directly to Meta',
      'Video shooting (available as Video add-on)',
    ],
  },
  {
    title: 'SEO & Online Presence',
    slug: 'seo-advance-on-page-and-off-page',
    category: 'Search Engine Optimization',
    badge: 'Full Scale Growth',
    priceDisplay: 'From ₹5,000',
    iconName: 'Globe',
    subtitle: 'Technical audit, on-page SEO & high-authority local search visibility.',
    shortDescription: 'Comprehensive technical SEO audit, high-authority backlink building, and local citation outreach. Drives sustainable organic rankings and long-term customer search traffic.',
    inclusions: [
      'Full Technical SEO & Speed Audit',
      'On-Page Meta Tags & Schema Markup',
      'High-Authority Local Citations',
      'Google Search Console & GA4 Setup',
      'Keyword Ranking & Growth Report',
    ],
    exclusions: [
      'Guaranteed #1 ranking for global generic keywords',
      'Paid third-party backlink fees',
    ],
  },
  {
    title: 'Brand Identity & Logo Design',
    slug: 'logo-design',
    category: 'Branding & Identity',
    badge: 'Vector Brand Mark',
    priceDisplay: 'From ₹3,500 one-time',
    iconName: 'Palette',
    subtitle: 'Creative vector logo marks, visiting card design & brand guidelines.',
    shortDescription: 'Distinctive, custom vector logo mark paired with brand typography rules and high-contrast color codes. Delivered in full resolution across all web and print vector formats.',
    inclusions: [
      '3 Unique Vector Logo Concepts',
      'Up to 3 Revision Rounds',
      'Vector Source Files (AI, SVG, PNG, PDF)',
      'Brand Color Codes (HEX, RGB, CMYK)',
      'Typography & Font Pairings',
      'Full Commercial Copyright',
    ],
    exclusions: [
      'Government trademark registration fee',
      'Physical printing of stationery',
    ],
  },
  {
    title: 'Google Ads Setup',
    slug: 'google-ads',
    category: 'Paid Advertising',
    badge: 'High Intent',
    priceDisplay: 'From ₹1,000 / campaign',
    iconName: 'Search',
    subtitle: 'Search, Display, and Performance Max ad campaigns capturing active buyers.',
    shortDescription: 'Intent-driven Google Search, Display, and Performance Max ad campaigns. Captures ready-to-buy prospects actively searching for your services in your target city.',
    inclusions: [
      'Google Search & Call-Only Ads',
      'Negative Keywords List (No Budget Waste)',
      'High-Converting Ad Copy & Extensions',
      'Conversion Tracking Setup',
      'Local Radius & Geo Targeting',
    ],
    exclusions: [
      'Direct click spend paid to Google',
      'Landing page design (available separately)',
    ],
  },
  {
    title: 'SEO Basic (On Page)',
    slug: 'seo-basic-on-page',
    category: 'Search Engine Optimization',
    badge: 'Essential',
    priceDisplay: '₹5,000',
    iconName: 'TrendingUp',
    subtitle: 'Meta titles, headings & image alt optimization across your core website.',
    shortDescription: 'Meta title, meta description, heading structure, and image alt text optimization across your website. Ensures search engines properly understand and index your core pages.',
    inclusions: [
      'Meta Titles & Descriptions (Up to 8 Pages)',
      'H1, H2, H3 Heading Structure Audit',
      'Image Alt Tags for Google Search',
      'XML Sitemap & Robots.txt Setup',
      'Google Search Console Indexing',
    ],
    exclusions: [
      'Off-page backlink outreach (available in SEO Advance)',
      'Ongoing monthly retainer maintenance',
    ],
  },
  {
    title: 'Advance Custom Website & Portal',
    slug: 'website-advance',
    category: 'Website & IT',
    badge: 'Custom Web Portal',
    priceDisplay: 'Starting From ₹12,000 one-time',
    iconName: 'Code2',
    subtitle: 'Custom multi-page business portal built with React, Node.js & Tailwind.',
    shortDescription: 'Custom multi-page web platform or business portal built with modern React, Tailwind, and Node.js. Includes interactive UX, custom inquiry management, and scalable cloud hosting.',
    inclusions: [
      'Custom Full-Stack Build (React & Node.js)',
      'Multi-Page Dynamic Architecture',
      'Admin Dashboard & Content Manager',
      'Payment Gateway Integration',
      'Instant WhatsApp & Email Lead Alerts',
      '3 Months Technical Support',
    ],
    exclusions: [
      'Cloud hosting & domain registration fees',
      'Third-party SMS/WhatsApp API message credits',
    ],
  },
  {
    title: 'Corporate Videos Shoot on iPhone',
    slug: 'corporate-videos-shoot-on-iphone',
    category: 'Video & Production',
    badge: 'Social First',
    priceDisplay: 'From ₹5,000 / shoot day',
    iconName: 'Smartphone',
    subtitle: 'Agile 4K iPhone shoots with gimbal stabilization & wireless mics for reels.',
    shortDescription: 'Agile 4K iPhone video shoot with motorized gimbal stabilization and clip-on wireless microphones. Ideal for high-retention vertical reels, behind-the-scenes, and office vibes.',
    inclusions: [
      '4K ProRes Shoot (iPhone 15/16 Pro Max)',
      '3-Axis Motorized Gimbal Stabilization',
      'Dual Wireless Collar Mics',
      'Portable Bi-Color LED Lighting',
      '9:16 Framing for Instagram Reels',
      'Same-Day Raw Clips Cloud Transfer',
    ],
    exclusions: [
      'Reels editing & captions (available as add-on)',
      'Travel outside Ahmedabad',
    ],
  },
  {
    title: 'Product Photography',
    slug: 'product-photography',
    category: 'Video & Production',
    badge: 'Studio Lighting',
    priceDisplay: 'From ₹5,000',
    iconName: 'Camera',
    subtitle: 'High-res studio & lifestyle product photography formatted for web & ads.',
    shortDescription: 'High-resolution studio and lifestyle product photography with specialized background sets and lighting. Retouched and formatted for ecommerce listings and social media feeds.',
    inclusions: [
      'Studio Shoot for 15-20 Products',
      'White & Lifestyle Background Staging',
      'Multiple Angles (Front, 45°, Close-Up)',
      'Digital Retouching & Color Balance',
      'Web-Optimized Images for Amazon & Shopify',
    ],
    exclusions: [
      'Professional model fees (if required)',
      'Product transport courier to studio',
    ],
  },
  {
    title: 'UGC Videos',
    slug: 'ugc-videos',
    category: 'Video & Production',
    badge: 'High Engagement',
    priceDisplay: 'From ₹5,000 / video',
    iconName: 'Video',
    subtitle: 'Authentic User-Generated Content style reels with relatable creators.',
    shortDescription: 'Authentic User-Generated Content (UGC) style videos featuring relatable creators or staff presentations. Proven to build organic social trust and slash customer acquisition costs.',
    inclusions: [
      'Authentic Creator Testimonial / Review',
      'High-Retention Script & 3-Second Hook',
      'Vertical 9:16 Full HD/4K Video',
      'Animated Captions, Sound FX & Cuts',
      'Full Commercial Advertising Rights',
    ],
    exclusions: [
      'Celebrity / mega-influencer collaboration',
      'Sample product shipping to creator',
    ],
  },
  {
    title: 'Influencer Marketing',
    slug: 'influencer-marketing',
    category: 'Paid Advertising',
    badge: 'Targeted Reach',
    priceDisplay: 'Starting From ₹10,000 / campaign',
    iconName: 'Users',
    subtitle: 'Micro and niche influencer identification, outreach & shoot coordination.',
    shortDescription: 'Targeted micro and niche influencer identification, outreach, campaign briefing, and shoot coordination. Amplifies your brand recognition across verified local target audiences.',
    inclusions: [
      'Shortlist of 5-10 Relevant Local Influencers',
      'Outreach, Negotiation & Contracts',
      'Creative Script & Talking Points Brief',
      'Review of Video Drafts Before Posting',
      'Campaign Reach & Engagement Report',
    ],
    exclusions: [
      'Direct influencer collaboration fee (payout)',
      'Product samples/meals given to influencers',
    ],
  },
  {
    title: 'Business Card Design & Printing',
    slug: 'business-card-design-and-printing',
    category: 'Branding & Identity',
    badge: 'Print Ready',
    priceDisplay: 'From ₹2,000 (Design + Print)',
    iconName: 'CreditCard',
    subtitle: 'Premium visiting cards with spot UV, velvet matte & doorstep delivery.',
    shortDescription: 'Premium double-sided visiting card design with spot UV, velvet matte lamination, or gold foil options. Includes bespoke graphic design plus physical printing delivered to you.',
    inclusions: [
      'Double-Sided Custom Card Design',
      '350-400 GSM Heavy Art Card Stock',
      'Velvet Matte or Gloss Lamination',
      'Print Run of 500 or 1,000 Cards',
      'QR Code to WhatsApp or Maps',
      'Free Doorstep Delivery in Ahmedabad',
    ],
    exclusions: [
      'Luxury foil/spot UV finish (minor extra charge)',
      'Shipping outside Gujarat',
    ],
  },
  {
    title: 'Catalog & Menu Design',
    slug: 'catalog-design',
    category: 'Branding & Identity',
    badge: 'Multi-Page Layout',
    priceDisplay: 'From ₹4,500 / catalog',
    iconName: 'BookOpen',
    subtitle: 'Polished digital & printable product catalogs, brochures, and menus.',
    shortDescription: 'Structured, polished digital and printable product catalog, brochure, or restaurant menu. Features organized visual hierarchy designed to make customer ordering seamless.',
    inclusions: [
      '4 to 8-Page Custom Catalog / Menu',
      'Product Specs, Badges & Pricing Grid',
      'Print-Ready CMYK PDF with Bleed',
      'Digital PDF with Click-to-WhatsApp Buttons',
      'Up to 3 Rounds of Price Revisions',
    ],
    exclusions: [
      'Physical bulk offset paper printing',
      'Product photography shoots',
    ],
  },
  {
    title: 'AI & Reel Editing',
    slug: 'ai-reel-editing',
    category: 'Video & Production',
    badge: 'AI & Video Creation',
    priceDisplay: '₹2,000 / reel',
    iconName: 'Video',
    subtitle: '1 complete AI reel with content writing, video editing & animated captions.',
    shortDescription: 'Complete 1 AI video reel creation for your business. We handle everything from script and content writing to high-retention video editing, kinetic animated captions, and audio sync.',
    inclusions: [
      '1 Complete High-Retention AI Video Reel',
      'Professional Script & Content Writing',
      'Advanced Video Editing & Transitions',
      'Kinetic Animated Auto-Captions',
      'AI Voiceover or Trending Audio Sync',
      'Hook Optimization & Hashtag Suggestions',
    ],
    exclusions: [
      'On-site physical camera shooting',
      'Daily social account management',
    ],
  },
  {
    title: 'WhatsApp Business Setup',
    slug: 'whatsapp-business-setup',
    category: 'Local Growth & Maps',
    badge: 'Channel Setup',
    priceDisplay: '₹1,000 one-time',
    iconName: 'MessageCircle',
    subtitle: 'Official WhatsApp Business profile, auto-replies & product catalog.',
    shortDescription: 'Get your WhatsApp Business account professionally configured to communicate with customers and showcase your products or services. Includes profile branding, catalog setup, and automated messaging.',
    inclusions: [
      'Official WhatsApp Business App Setup',
      'Branded Profile (Logo, Bio, Hours, Links)',
      'Products & Services Catalog (Up to 10 Items)',
      'Automated Greeting & Away Messages',
      'Quick Replies for Common Questions',
      'Click-to-WhatsApp Link & QR Code',
    ],
    exclusions: [
      'Green Tick Meta Verification SaaS fees',
      'Bulk spam broadcasting tools',
    ],
  },
];

// Helper to assign a consistent gradient and icon to any addon
const getAddonVisuals = (addon) => {
  const slug = addon?.slug || '';
  if (slug.includes('google-profile')) {
    return { icon: MapPin, gradient: 'from-violet-600 to-indigo-500 shadow-violet-500/25' };
  }
  if (slug.includes('website-advance')) {
    return { icon: Code2, gradient: 'from-rose-600 to-red-500 shadow-rose-500/25' };
  }
  if (slug.includes('website')) {
    return { icon: Layout, gradient: 'from-pink-500 to-rose-600 shadow-pink-500/25' };
  }
  if (slug.includes('camera') || slug.includes('shoot-on-camera')) {
    return { icon: Camera, gradient: 'from-amber-500 to-orange-500 shadow-orange-500/25' };
  }
  if (slug.includes('iphone')) {
    return { icon: Smartphone, gradient: 'from-orange-500 to-amber-600 shadow-amber-500/25' };
  }
  if (slug.includes('meta-ads')) {
    return { icon: Target, gradient: 'from-purple-600 to-fuchsia-500 shadow-purple-500/25' };
  }
  if (slug.includes('google-ads')) {
    return { icon: Search, gradient: 'from-blue-600 to-indigo-600 shadow-blue-500/25' };
  }
  if (slug.includes('seo-advance') || slug.includes('seo-advance-on-page-and-off-page')) {
    return { icon: Globe, gradient: 'from-blue-600 to-cyan-500 shadow-blue-500/25' };
  }
  if (slug.includes('seo')) {
    return { icon: TrendingUp, gradient: 'from-cyan-600 to-blue-500 shadow-cyan-500/25' };
  }
  if (slug.includes('logo')) {
    return { icon: Palette, gradient: 'from-amber-500 to-yellow-500 shadow-amber-500/25' };
  }
  if (slug.includes('business-card')) {
    return { icon: CreditCard, gradient: 'from-emerald-600 to-teal-500 shadow-emerald-500/25' };
  }
  if (slug.includes('catalog')) {
    return { icon: BookOpen, gradient: 'from-indigo-600 to-purple-600 shadow-indigo-500/25' };
  }
  if (slug.includes('photography')) {
    return { icon: Camera, gradient: 'from-orange-600 to-red-500 shadow-orange-500/25' };
  }
  if (slug.includes('ugc')) {
    return { icon: Video, gradient: 'from-pink-600 to-purple-600 shadow-pink-500/25' };
  }
  if (slug.includes('influencer')) {
    return { icon: Users, gradient: 'from-violet-600 to-pink-500 shadow-violet-500/25' };
  }
  if (slug.includes('ai-reel')) {
    return { icon: Video, gradient: 'from-fuchsia-600 to-purple-600 shadow-fuchsia-500/25' };
  }
  if (slug.includes('whatsapp')) {
    return { icon: MessageCircle, gradient: 'from-emerald-500 to-green-600 shadow-emerald-500/25' };
  }
  const FallbackIcon = ICON_MAP[addon?.iconName] || Sparkles;
  return { icon: FallbackIcon, gradient: 'from-blue-600 to-indigo-600 shadow-blue-500/25' };
};

const CATEGORIES = [
  'All',
  'Paid Advertising',
  'Video & Production',
  'Website & IT',
  'Branding & Identity',
  'Search Engine Optimization',
  'Local Growth & Maps',
];

export default function AddonsSection({ isPackagesPage = false }) {
  const [addons, setAddons] = useState(ALL_ADDONS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAddonForModal, setSelectedAddonForModal] = useState(null);
  const location = useLocation();

  // True if explicitly passed or on /packages route
  const onPackagesPage = isPackagesPage || location.pathname.startsWith('/packages');

  const { toggleCartItem, isInCart, totalCount, openDrawer } = useAddonCart();

  useEffect(() => {
    let isMounted = true;
    async function fetchAddons() {
      try {
        const res = await fetch(`${API_URL}/addons`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Merge remote with local subtitle, inclusions, exclusions fallbacks
          const merged = json.data.map((remote) => {
            const local = ALL_ADDONS.find((a) => a.slug === remote.slug);
            return local
              ? {
                  ...local,
                  ...remote,
                  subtitle: local.subtitle || remote.shortDescription,
                  inclusions: local.inclusions || remote.inclusions || [],
                  exclusions: local.exclusions || remote.exclusions || [],
                }
              : remote;
          });
          setAddons(merged);
        }
      } catch (err) {
        // Fallback already in place
      }
    }

    fetchAddons();

    const handleFocus = () => fetchAddons();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // On Home Page: Show the 6 core featured ones
  // On Packages Page: Show all 17 filtered by category
  const displayAddons = onPackagesPage
    ? addons
        .filter((item) => item.isPublished !== false)
        .filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory))
    : FEATURED_SIX_SLUGS.map((slug) => addons.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <section id="addons" className="py-14 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        {onPackagesPage ? (
          /* Packages Page Header */
          <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2.5 border border-blue-200/60">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              All 17 A La Carte Add-Ons
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
              On-Demand Services &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Extra Capabilities
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Explore our full catalogue of on-demand capabilities to customize your quotation or combine with your monthly retainer. Click any service to view full inclusions and scope.
            </p>

            {/* Category Filter Pills on Packages Page */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-50 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Home Page Header matching Screenshot */
          <div className="text-left mb-8 sm:mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
              We don’t just design, we build brands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                that launch and grow.
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-heading font-bold text-slate-500 mt-3 uppercase tracking-wider">
              OUR ON-DEMAND SERVICES & ADD-ONS:
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2-COLUMN UNIFIED SLEEK CARDS (6 on Home, All 17 on Packages) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayAddons.map((addon, idx) => {
            const visuals = getAddonVisuals(addon);
            const ItemIcon = visuals.icon;
            const added = isInCart(addon._id || addon.slug);

            return (
              <div
                key={addon.slug || addon._id || idx}
                onClick={() => setSelectedAddonForModal(addon)}
                className={`group cursor-pointer rounded-2xl sm:rounded-[24px] p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 relative border ${
                  added
                    ? 'bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-400 hover:-translate-y-0.5'
                }`}
              >
                {/* Left Side: Glowing Circular Gradient Icon + Text Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${visuals.gradient} ring-4 ring-slate-100 group-hover:scale-105 transition-transform shadow-xs`}
                  >
                    <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h3 className="font-heading font-extrabold text-sm sm:text-base text-navy-950 group-hover:text-blue-600 transition-colors leading-snug">
                        {addon.title}
                      </h3>
                      {added && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                          Added
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-1 line-clamp-1">
                      {addon.subtitle || addon.shortDescription}
                    </p>

                    {/* Mobile price and details tap hint */}
                    <div className="flex items-center gap-2 mt-2 sm:hidden">
                      <span className="text-[11px] font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded-md">
                        {addon.priceDisplay}
                      </span>
                      <span className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5">
                        Details & scope &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Price & Detail Action Hint */}
                <div className="hidden sm:flex flex-col items-end justify-center gap-2 flex-shrink-0 pl-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold text-navy-950 bg-slate-100/90 border border-slate-200/80 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-colors shadow-2xs whitespace-nowrap">
                    {addon.priceDisplay}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Mobile Right Arrow Button */}
                <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 group-hover:text-blue-600 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM ACTION BUTTONS                                    */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {!onPackagesPage && (
            /* On Home Page: Redirects directly to /packages#addons */
            <Link
              to="/packages#addons"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-navy-950 border border-slate-300/80 font-heading font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>More Add-Ons (17+ Services)</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          )}

          {/* View Shortlist Drawer button */}
          <button
            type="button"
            onClick={openDrawer}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-heading font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-accent-yellow" />
            <span>View Selected Add-Ons ({totalCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Cart Pill (Appears when 1 or more items selected) */}
      {totalCount > 0 && (
        <aside
          aria-label="Selected Add-Ons Bar"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300 w-[92%] max-w-md"
        >
          <div className="bg-navy-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/30 animate-pulse">
                {totalCount}
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold font-heading text-white block">
                  {totalCount} {totalCount === 1 ? 'Add-On' : 'Add-Ons'} Selected
                </span>
                <span className="text-[11px] text-cyan-400 font-medium">
                  Ready for instant WhatsApp quote
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-yellow hover:bg-yellow-400 text-navy-950 font-heading font-extrabold text-xs shadow-md transition-all active:scale-95 flex-shrink-0 cursor-pointer"
            >
              <span>Review & Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Interactive Detail Popup Modal */}
      <AddonDetailModal
        addon={selectedAddonForModal}
        isOpen={Boolean(selectedAddonForModal)}
        onClose={() => setSelectedAddonForModal(null)}
        onToggleCart={toggleCartItem}
        isInCart={selectedAddonForModal ? isInCart(selectedAddonForModal._id || selectedAddonForModal.slug) : false}
        visuals={selectedAddonForModal ? getAddonVisuals(selectedAddonForModal) : null}
      />
    </section>
  );
}
