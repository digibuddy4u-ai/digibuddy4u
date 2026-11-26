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

// Fallback baseline 17 add-ons
const ALL_ADDONS = [
  {
    title: 'Google Business Profile Setup',
    slug: 'google-profile-setup',
    category: 'Local Growth & Maps',
    badge: 'Local SEO',
    priceDisplay: '₹1,000 one-time',
    iconName: 'MapPin',
    subtitle: 'Complete GBP verification, Maps ranking & local review optimization.',
    shortDescription: 'Complete Google Business Profile setup, official verification, and local category optimization. Helps local clients discover, call, and navigate to your business on Google Maps.',
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
  },
  {
    title: 'AI & Reel Editing',
    slug: 'ai-reel-editing',
    category: 'Video & Production',
    badge: 'AI & Video Creation',
    priceDisplay: '₹5,000 / package',
    iconName: 'Video',
    subtitle: 'AI-powered and raw clips reel editing with scriptwriting & audio sync.',
    shortDescription: 'Professional AI-powered and raw video reel creation to help businesses create engaging social media content. Includes AI reels, raw clips editing, scriptwriting, captions, and hashtag suggestions.',
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
  },
];

// Helper to assign a consistent gradient and icon to any addon
const getAddonVisuals = (addon) => {
  const slug = addon.slug || '';
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
  const FallbackIcon = ICON_MAP[addon.iconName] || Sparkles;
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
          // Merge remote with local subtitle fallbacks
          const merged = json.data.map((remote) => {
            const local = ALL_ADDONS.find((a) => a.slug === remote.slug);
            return local ? { ...remote, subtitle: local.subtitle || remote.shortDescription } : remote;
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
              Explore our full catalogue of on-demand capabilities to customize your quotation or combine with your monthly retainer.
            </p>

            {/* Category Filter Pills on Packages Page */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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
                onClick={() => toggleCartItem(addon)}
                className={`group cursor-pointer rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-300 relative border ${
                  added
                    ? 'bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5'
                }`}
              >
                {/* Left Side: Glowing Circular Gradient Icon + Text */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${visuals.gradient} ring-4 ring-slate-100 group-hover:scale-105 transition-transform`}
                  >
                    <ItemIcon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-navy-950 group-hover:text-blue-600 transition-colors truncate">
                        {addon.title}
                      </h3>
                      {added && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-2.5 h-2.5" />
                          Added
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                      {addon.subtitle || addon.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Right Side: Price & Toggle Action */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                    {addon.priceDisplay}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      added
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600'
                    }`}
                  >
                    {added ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    )}
                  </div>
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
    </section>
  );
}
