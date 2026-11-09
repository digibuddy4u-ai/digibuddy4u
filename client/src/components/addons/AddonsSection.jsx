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
  MessageCircle,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Badge from '../common/Badge';
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

// Fallback baseline 15 add-ons in case API is temporarily loading
const FALLBACK_ADDONS = [
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
    title: 'Google Ads Setup',
    slug: 'google-ads',
    category: 'Paid Advertising',
    badge: 'High Intent',
    priceDisplay: 'From ₹1,000 / campaign',
    iconName: 'Search',
    shortDescription: 'Intent-driven Google Search, Display, and Performance Max ad campaigns. Captures ready-to-buy prospects actively searching for your services in your target city.',
  },
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
    title: 'SEO Basic (On Page)',
    slug: 'seo-basic-on-page',
    category: 'Search Engine Optimization',
    badge: 'Essential',
    priceDisplay: '₹5,000',
    iconName: 'TrendingUp',
    shortDescription: 'Meta title, meta description, heading structure, and image alt text optimization across your website. Ensures search engines properly understand and index your core pages.',
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
    title: 'Basic Website',
    slug: 'website-basic',
    category: 'Website & IT',
    badge: 'Sub-Second Load',
    priceDisplay: 'From ₹5000 one-time',
    iconName: 'Layout',
    shortDescription: 'Modern, high-speed single-page website or landing page with mobile responsiveness. Features click-to-WhatsApp action, contact forms, and instant speed optimization.',
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
    title: 'Corporate Videos Shoot On Camera',
    slug: 'corporate-videos-shoot-on-camera',
    category: 'Video & Production',
    badge: 'Cinema 4K Quality',
    priceDisplay: 'From ₹10,000 / shoot day',
    iconName: 'Camera',
    shortDescription: 'High-end 4K production shoot inside Ahmedabad using cinematic mirrorless cameras, studio lighting, and pro mics. Perfect for founder stories, factory tours, and brand ad films.',
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
    title: 'Logo Design',
    slug: 'logo-design',
    category: 'Branding & Identity',
    badge: 'Vector Brand Mark',
    priceDisplay: 'From ₹3,500 one-time',
    iconName: 'Palette',
    shortDescription: 'Distinctive, custom vector logo mark paired with brand typography rules and high-contrast color codes. Delivered in full resolution across all web and print vector formats.',
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

export default function AddonsSection({
  title = 'A La Carte Add-Ons & Extra Services',
  subtitle = 'Need extra capabilities beyond monthly packages? Pick any on-demand service below and add it to your custom quote.',
  showCategories = true,
  limit = null,
}) {
  const [addons, setAddons] = useState(FALLBACK_ADDONS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

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
      } finally {
        if (isMounted) setLoading(false);
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
    .filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory))
    .slice(0, limit || addons.length);

  return (
    <section id="addons" className="py-14 sm:py-20 lg:py-24 bg-white border-t border-slate-100 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="A La Carte Add-Ons"
          badgeVariant="blue"
          title="Customize Your Plan With"
          titleHighlight="On-Demand Extra Capabilities"
          description={subtitle}
          align="center"
        />

        {/* Category Filter Pills */}
        {showCategories && (
          <div className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-surface-light text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Add-Ons Grid (15 Interactive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {filteredAddons.map((addon, index) => {
            const added = isInCart(addon._id || addon.slug);
            const Icon = ICON_MAP[addon.iconName] || Sparkles;

            return (
              <div
                key={addon.slug || addon._id || index}
                className={`rounded-3xl p-5 sm:p-6.5 flex flex-col justify-between transition-all duration-300 relative group border ${
                  added
                    ? 'bg-blue-50/50 border-primary shadow-lg ring-2 ring-primary/20'
                    : 'bg-white border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-primary/40'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Category + Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors flex-shrink-0 ${
                          added
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-surface-light border border-slate-200 text-primary group-hover:bg-primary group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-primary block">
                          {addon.category}
                        </span>
                        {addon.badge && (
                          <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 mt-0.5">
                            {addon.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Plus / Add to Cart Action Icon Button */}
                    <button
                      type="button"
                      onClick={() => toggleCartItem(addon)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-xs active:scale-90 ${
                        added
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-300'
                          : 'bg-primary hover:bg-primary-hover text-white shadow-primary/25 hover:scale-105'
                      }`}
                      title={added ? 'Remove from shortlist' : 'Add to quotation shortlist'}
                      aria-label={`${added ? 'Remove' : 'Add'} ${addon.title}`}
                    >
                      {added ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </button>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-lg sm:text-xl font-heading font-black text-navy-950 group-hover:text-primary transition-colors leading-snug">
                    {addon.title}
                  </h3>

                  {/* 2-line Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 min-h-[40px]">
                    {addon.shortDescription}
                  </p>
                </div>

                {/* Bottom Row: Price Display & Status Pill */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                      Estimate / Retainer
                    </span>
                    <strong className="text-xs sm:text-sm font-heading font-extrabold text-navy-950">
                      {addon.priceDisplay}
                    </strong>
                  </div>

                  {/* Interactive State Toggle Pill */}
                  <button
                    type="button"
                    onClick={() => toggleCartItem(addon)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      added
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-50 hover:bg-primary hover:text-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Service</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-surface-light border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0 font-bold">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-navy-950 text-sm">
                Need a Custom Package Bundle or Bespoke Scope?
              </h4>
              <p className="text-xs text-slate-500">
                You can combine any add-ons with our 5 monthly packages for special bundle pricing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-primary text-white font-bold text-xs transition-colors flex-shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-accent-yellow" />
            <span>View Shortlist ({totalCount})</span>
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
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/30 animate-pulse">
                {totalCount}
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold font-heading text-white block">
                  {totalCount} {totalCount === 1 ? 'Add-On' : 'Add-Ons'} Selected
                </span>
                <span className="text-[11px] text-cyan-accent font-medium">
                  Ready for instant WhatsApp quote
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-yellow hover:bg-accent-yellowHover text-navy-950 font-heading font-extrabold text-xs shadow-md transition-all active:scale-95 flex-shrink-0"
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
