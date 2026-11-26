import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
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

// 6 Core Featured Add-ons upfront as requested by user
const FEATURED_SIX = [
  {
    title: 'Google Business Profile Setup',
    slug: 'google-profile-setup',
    category: 'Local Growth & Maps',
    badge: 'Local SEO',
    priceDisplay: '₹1,000 one-time',
    subtitle: 'Complete GBP verification, Maps ranking & review optimization.',
    icon: MapPin,
    gradient: 'from-violet-600 to-indigo-500 shadow-violet-500/25',
    glowColor: 'bg-violet-500/15',
  },
  {
    title: 'Website Development',
    slug: 'website-basic',
    category: 'Website & IT',
    badge: 'Mobile-Ready',
    priceDisplay: 'From ₹5,000 one-time',
    subtitle: 'Modern, high-converting responsive business sites & landing pages.',
    icon: Layout,
    gradient: 'from-pink-500 to-rose-600 shadow-pink-500/25',
    glowColor: 'bg-rose-500/15',
  },
  {
    title: 'Corporate Video & Camera Shoot',
    slug: 'corporate-videos-shoot-on-camera',
    category: 'Video & Production',
    badge: '4K Cinema',
    priceDisplay: 'From ₹5,000 / shoot day',
    subtitle: 'Cinema camera & iPhone shoots with pro lighting and creative direction.',
    icon: Camera,
    gradient: 'from-amber-500 to-orange-500 shadow-orange-500/25',
    glowColor: 'bg-amber-500/15',
  },
  {
    title: 'Meta & Google Ads Setup',
    slug: 'meta-ads',
    category: 'Paid Advertising',
    badge: 'High ROAS',
    priceDisplay: 'From ₹1,000 / campaign',
    subtitle: 'High-converting Facebook, Instagram & Google search ad campaigns.',
    icon: Target,
    gradient: 'from-purple-600 to-fuchsia-500 shadow-purple-500/25',
    glowColor: 'bg-purple-500/15',
  },
  {
    title: 'SEO & Online Presence',
    slug: 'seo-advance-on-page-and-off-page',
    category: 'Search Engine Optimization',
    badge: 'Google Ranking',
    priceDisplay: 'From ₹5,000',
    subtitle: 'Technical audit, on-page SEO & high-authority local search visibility.',
    icon: TrendingUp,
    gradient: 'from-blue-600 to-cyan-500 shadow-blue-500/25',
    glowColor: 'bg-blue-500/15',
  },
  {
    title: 'Brand Identity & Logo Design',
    slug: 'logo-design',
    category: 'Branding & Identity',
    badge: 'Vector Design',
    priceDisplay: 'From ₹3,500 one-time',
    subtitle: 'Creative vector logo marks, visiting card design & brand guidelines.',
    icon: Palette,
    gradient: 'from-amber-500 to-yellow-500 shadow-amber-500/25',
    glowColor: 'bg-yellow-500/15',
  },
];

// Fallback baseline 15 add-ons in case API is temporarily loading
const FALLBACK_ADDONS = [
  {
    title: 'Google Business Profile Setup',
    slug: 'google-profile-setup',
    category: 'Local Growth & Maps',
    badge: 'Local SEO',
    priceDisplay: '₹1,000 one-time',
    iconName: 'MapPin',
    shortDescription: 'Complete Google Business Profile setup, official verification, and local category optimization. Helps local clients discover, call, and navigate to your business on Google Maps.',
  },
  {
    title: 'Basic Website',
    slug: 'website-basic',
    category: 'Website & IT',
    badge: 'Sub-Second Load',
    priceDisplay: 'From ₹5000 one-time',
    iconName: 'Layout',
    shortDescription: 'Modern, high-speed single-page website or landing page with mobile responsiveness. Features click-to-WhatsApp action, contact forms, and instant speed optimization.',
  },
  {
    title: 'Corporate Videos Shoot On Camera',
    slug: 'corporate-videos-shoot-on-camera',
    category: 'Video & Production',
    badge: 'Cinema 4K Quality',
    priceDisplay: 'From ₹10,000 / shoot day',
    iconName: 'Camera',
    shortDescription: 'High-end 4K production shoot inside Ahmedabad using cinematic mirrorless cameras, studio lighting, and pro mics. Perfect for founder stories, factory tours, and brand ad films.',
  },
  {
    title: 'Meta Ads Setup',
    slug: 'meta-ads',
    category: 'Paid Advertising',
    badge: 'High ROAS',
    priceDisplay: 'From ₹1,000 / campaign',
    iconName: 'Target',
    shortDescription: 'High-converting Facebook & Instagram ad campaigns with custom audience targeting. Includes A/B creative testing and direct WhatsApp / lead form conversion funnels.',
  },
  {
    title: 'SEO Advance (On Page And Off Page)',
    slug: 'seo-advance-on-page-and-off-page',
    category: 'Search Engine Optimization',
    badge: 'Full Scale Growth',
    priceDisplay: '₹20,000',
    iconName: 'Globe',
    shortDescription: 'Comprehensive technical SEO audit, high-authority backlink building, and local citation outreach. Drives sustainable organic rankings and long-term customer search traffic.',
  },
  {
    title: 'Logo Design',
    slug: 'logo-design',
    category: 'Branding & Identity',
    badge: 'Vector Brand Mark',
    priceDisplay: 'From ₹3,500 one-time',
    iconName: 'Palette',
    shortDescription: 'Distinctive, custom vector logo mark paired with brand typography rules and high-contrast color codes. Delivered in full resolution across all web and print vector formats.',
  },
  {
    title: 'Google Ads Setup',
    slug: 'google-ads',
    category: 'Paid Advertising',
    badge: 'High Intent',
    priceDisplay: 'From ₹1,000 / campaign',
    iconName: 'Search',
    shortDescription: 'Intent-driven Google Search, Display, and Performance Max ad campaigns. Captures ready-to-buy prospects actively searching for your services in your target city.',
  },
  {
    title: 'SEO Basic (On Page)',
    slug: 'seo-basic-on-page',
    category: 'Search Engine Optimization',
    badge: 'Essential',
    priceDisplay: '₹5,000',
    iconName: 'TrendingUp',
    shortDescription: 'Meta title, meta description, heading structure, and image alt text optimization across your website. Ensures search engines properly understand and index your core pages.',
  },
  {
    title: 'Advance Website',
    slug: 'website-advance',
    category: 'Website & IT',
    badge: 'Custom Web Portal',
    priceDisplay: 'Starting From ₹12,000 one-time',
    iconName: 'Code2',
    shortDescription: 'Custom multi-page web platform or business portal built with modern React, Tailwind, and Node.js. Includes interactive UX, custom inquiry management, and scalable cloud hosting.',
  },
  {
    title: 'Corporate Videos Shoot on iPhone',
    slug: 'corporate-videos-shoot-on-iphone',
    category: 'Video & Production',
    badge: 'Social First',
    priceDisplay: 'From ₹5,000 / shoot day',
    iconName: 'Smartphone',
    shortDescription: 'Agile 4K iPhone video shoot with motorized gimbal stabilization and clip-on wireless microphones. Ideal for high-retention vertical reels, behind-the-scenes, and office vibes.',
  },
  {
    title: 'Product Photography',
    slug: 'product-photography',
    category: 'Creative & Media',
    badge: 'Studio Lighting',
    priceDisplay: 'From ₹5,000',
    iconName: 'Camera',
    shortDescription: 'High-resolution studio and lifestyle product photography with specialized background sets and lighting. Retouched and formatted for ecommerce listings and social media feeds.',
  },
  {
    title: 'UGC Videos',
    slug: 'ugc-videos',
    category: 'Video & Production',
    badge: 'High Engagement',
    priceDisplay: 'From ₹5,000 / video',
    iconName: 'Video',
    shortDescription: 'Authentic User-Generated Content (UGC) style videos featuring relatable creators or staff presentations. Proven to build organic social trust and slash customer acquisition costs.',
  },
  {
    title: 'Influencer Marketing',
    slug: 'influencer-marketing',
    category: 'Social & Brand Growth',
    badge: 'Targeted Reach',
    priceDisplay: 'Starting From ₹10,000 / campaign',
    iconName: 'Users',
    shortDescription: 'Targeted micro and niche influencer identification, outreach, campaign briefing, and shoot coordination. Amplifies your brand recognition across verified local target audiences.',
  },
  {
    title: 'Business Card Design And Printing',
    slug: 'business-card-design-and-printing',
    category: 'Branding & Identity',
    badge: 'Print Ready',
    priceDisplay: 'From ₹2,000 (Design + Print)',
    iconName: 'CreditCard',
    shortDescription: 'Premium double-sided visiting card design with spot UV, velvet matte lamination, or gold foil options. Includes bespoke graphic design plus physical printing delivered to you.',
  },
  {
    title: 'Catalog Design',
    slug: 'catalog-design',
    category: 'Branding & Identity',
    badge: 'Multi-Page Layout',
    priceDisplay: 'From ₹4,500 / catalog',
    iconName: 'BookOpen',
    shortDescription: 'Structured, polished digital and printable product catalog, brochure, or restaurant menu. Features organized visual hierarchy designed to make customer ordering seamless.',
  },
  {
    title: 'AI & Reel Editing',
    slug: 'ai-reel-editing',
    category: 'Video & Production',
    badge: 'AI & Video Creation',
    priceDisplay: '₹5,000 / package',
    iconName: 'Video',
    shortDescription: 'Professional AI-powered and raw video reel creation to help businesses create engaging social media content. Includes AI reels, raw clips editing, scriptwriting, captions, and hashtag suggestions.',
  },
  {
    title: 'WhatsApp Business Setup',
    slug: 'whatsapp-business-setup',
    category: 'Local Growth & Maps',
    badge: 'Channel Setup',
    priceDisplay: '₹1,000 one-time',
    iconName: 'MessageCircle',
    shortDescription: 'Get your WhatsApp Business account professionally configured to communicate with customers and showcase your products or services. Includes profile branding, catalog setup, and automated messaging.',
  },
];

const CATEGORIES = [
  'All',
  'Paid Advertising',
  'Video & Production',
  'Website & IT',
  'Branding & Identity',
  'Search Engine Optimization',
  'Local Growth & Maps',
];

export default function AddonsSection() {
  const [addons, setAddons] = useState(FALLBACK_ADDONS);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { toggleCartItem, isInCart, totalCount, openDrawer } = useAddonCart();

  useEffect(() => {
    let isMounted = true;
    async function fetchAddons() {
      try {
        const res = await fetch(`${API_URL}/addons`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAddons(json.data);
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

  const filteredAddons = addons
    .filter((item) => item.isPublished !== false)
    .filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory));

  return (
    <section id="addons" className="py-14 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2.5 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            A La Carte Add-Ons & Extras
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
            Customize Your Scope With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              On-Demand Services
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Pick any extra service below to add to your custom growth quote or combine with your monthly retainer.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 6 CORE FEATURED ADD-ONS (2-Column Grid as in Image)     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {FEATURED_SIX.map((item, idx) => {
            const Icon = item.icon;
            // Match with active cart status
            const activeAddon = addons.find((a) => a.slug === item.slug) || item;
            const added = isInCart(activeAddon._id || activeAddon.slug);

            return (
              <div
                key={idx}
                onClick={() => toggleCartItem(activeAddon)}
                className={`group cursor-pointer rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-300 relative border ${
                  added
                    ? 'bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5'
                }`}
              >
                {/* Left Side: Gradient Icon Container + Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Glowing Gradient Circular Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-tr ${item.gradient} ring-4 ring-slate-100 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-navy-950 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </h3>
                      {added && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-2.5 h-2.5" />
                          Added
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Side: Price & Arrow */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                    {item.priceDisplay}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                    {added ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* EXPANDABLE SECTION FOR ALL 15+ ADD-ONS                   */}
        {/* ======================================================== */}
        {showAll && (
          <div className="mt-8 pt-8 border-t border-slate-200/80 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Category Filter Pills */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
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

            {/* Complete Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredAddons.map((addon, index) => {
                const added = isInCart(addon._id || addon.slug);
                const IconComponent = ICON_MAP[addon.iconName] || Sparkles;

                return (
                  <div
                    key={addon.slug || addon._id || index}
                    className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative group border ${
                      added
                        ? 'bg-blue-50/60 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                              added
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                              {addon.category}
                            </span>
                            {addon.badge && (
                              <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 mt-0.5">
                                {addon.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCartItem(addon)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            added
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white'
                          }`}
                          aria-label={`${added ? 'Remove' : 'Add'} ${addon.title}`}
                        >
                          {added ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                        </button>
                      </div>

                      <h4 className="text-base font-heading font-bold text-navy-950 group-hover:text-blue-600 transition-colors leading-snug">
                        {addon.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[32px]">
                        {addon.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <strong className="text-xs font-heading font-extrabold text-navy-950">
                        {addon.priceDisplay}
                      </strong>
                      <button
                        type="button"
                        onClick={() => toggleCartItem(addon)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                          added
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {added ? 'Added' : '+ Add Service'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BOTTOM ACTION BUTTONS: "MORE ADD-ONS" & SHORTLIST        */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Main "More Add-Ons" toggle button requested by user */}
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-navy-950 border border-slate-300/80 font-heading font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{showAll ? 'Show Fewer Add-Ons' : 'More Add-Ons (15+ Services)'}</span>
            {showAll ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-blue-600" />}
          </button>

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
