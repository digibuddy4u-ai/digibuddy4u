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

// Fallback baseline 17 add-ons with rich inclusions ("shu che") and exclusions ("shu ny")
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
      'Complete Google Business Profile (GBP) creation & official verification guidance',
      'Accurate Google Maps pin location pinpointing & postal address validation',
      'Primary & secondary category selection for maximum local discovery',
      'Business hours, contact numbers, Click-to-WhatsApp & website link integration',
      'Initial upload of 10+ high-resolution business photos, logo & cover banner',
      'Products & services catalog listing with descriptions and starting prices',
      'Direct Google Review QR code & short link generator to collect 5-star customer ratings',
      'Standard business description copy with local SEO keywords',
    ],
    exclusions: [
      'Physical postal verification postcard arrival speed depends on Google (if triggered by Google)',
      'Paid Google Local Service Ads or sponsored Maps pin ad budget not included',
      'Ongoing daily review monitoring or monthly updates (available on retainer)',
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
      'Modern, high-converting responsive single-page business website or landing page',
      '100% mobile, tablet, and desktop responsive layout with smooth scrolling',
      'Instant Click-to-WhatsApp, direct phone call triggers & lead contact forms',
      'Sub-second loading speed optimization with lightweight modern assets',
      'Social media links, WhatsApp button & Google Maps location embed',
      'Essential On-Page SEO: meta titles, meta descriptions, and favicon setup',
      'Basic inquiry notifications routed directly to your WhatsApp or email',
      '1 Month complimentary post-launch technical bug-fix support',
    ],
    exclusions: [
      'Domain name registration and annual cloud hosting subscription (billed at actuals or client-provided)',
      'Multi-currency payment gateway or complex ecommerce shopping cart (available in Custom Portal)',
      'Writing long content for 5+ additional internal pages (can be added separately)',
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
      'Professional on-location video shoot in Ahmedabad with creative direction',
      'Cinematic 4K mirrorless camera setup (Sony / Canon cinema line lenses)',
      'Studio-grade softbox lighting, key light, and fill light for crisp illumination',
      'Broadcast-quality wireless lavalier microphones (Rode / DJI) for crystal-clear voice',
      'Founder interviews, office walkthrough, machinery/factory & team b-roll coverage',
      'Creative storyboard discussion and shot planning before shoot day',
      'Complete raw 4K footage delivered securely via Google Drive transfer',
    ],
    exclusions: [
      'Post-production video editing, motion graphics & color grading (billed separately or in retainer)',
      'Travel and lodging expenses outside Ahmedabad city limits',
      'Professional actor, anchor, or fashion model booking fees (available as add-on)',
      'Special shoot permissions, studio rental or paid location entry fees',
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
      'Full setup and configuration of Meta Business Suite & Ads Manager account',
      'Meta Pixel installation guidance and lead event conversion tracking',
      'Laser-targeted audience research (demographics, interests, behaviors & radius)',
      '2-3 High-impact ad creative variations (image / carousel) with persuasive sales copy',
      'Instant Click-to-WhatsApp lead generation funnel or native Meta Instant Form',
      'A/B split testing of headlines, captions, and call-to-action buttons',
      'Campaign performance review & ROAS optimization report after initial run',
    ],
    exclusions: [
      'Direct ad spend budget paid directly to Facebook / Meta via your payment card',
      'Physical video shoot for ad assets (can be bundled with Camera Shoot)',
      'Daily 24/7 comment moderation and lead answering (available on monthly retainer)',
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
      'Full technical SEO audit covering crawlability, indexation & Core Web Vitals',
      'Complete On-Page optimization: meta titles, descriptions, H1-H6 tags & schema markup',
      'Image optimization with WebP format conversion and descriptive alt tags',
      'High-authority backlink outreach and verified local business directory citations',
      'Google Search Console and Google Analytics 4 (GA4) property setup and indexing',
      'Robots.txt, XML sitemap generation, and canonical tag configuration',
      'Monthly keyword ranking progress report with organic traffic analytics',
    ],
    exclusions: [
      'Guaranteed #1 Google ranking for hyper-competitive global generic keywords',
      'Complete redesign or rewriting of existing proprietary web software',
      'Paid guest posting placement fees (if third-party editorial publication charges)',
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
      '3 Distinct, custom vector logo concepts crafted around your business positioning',
      'Up to 3 revision iterations on the selected concept for perfection',
      'Master vector source files: AI, EPS, SVG, print-ready PDF, transparent PNG & high-res JPG',
      'Brand color system specification with exact HEX, RGB, and CMYK color codes',
      'Brand typography guide with primary & secondary font pairings',
      'Social media display profile pictures (DP) and square icon adaptations',
      '100% original, bespoke design with full commercial copyright transfer',
    ],
    exclusions: [
      'Trademark government registration fees and legal IP filing fees',
      'Physical paper printing of corporate stationery (printing available as add-on)',
      'Extended 50-page corporate brand identity manual (available on custom enterprise quote)',
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
      'High-intent Google Search, Call-Only & Local ad campaign architecture',
      'Comprehensive negative keyword library to block irrelevant clicks and stop budget waste',
      'Keyword match-type strategy (Exact, Phrase & Broad match with modifiers)',
      'High-converting ad copy with all sitelink, callout, phone, and snippet extensions',
      'Google Tag Manager and Google Ads conversion tracking setup',
      'Precise geo-targeting for Ahmedabad or target service radius',
      'Smart bidding strategy recommendation based on target CPA or conversions',
    ],
    exclusions: [
      'Direct click cost ad spend paid directly to Google via credit/debit card',
      'Dedicated custom landing page design (can be bundled with Website Development)',
      'Google Merchant Center feed integration for 500+ ecommerce products',
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
      'Meta title & meta description optimization across up to 8 core website pages',
      'H1, H2, H3 heading hierarchy audit aligned with high-intent search keywords',
      'Image alt attributes optimization for discovery in Google Image searches',
      'XML sitemap validation and clean robots.txt generation',
      'Google Search Console verification and crawl indexation submission',
      'Internal linking recommendations to pass link authority between key pages',
    ],
    exclusions: [
      'Off-page backlink outreach or high-authority directory citations (included in SEO Advance)',
      'Ongoing monthly retainer rank maintenance',
      'Heavy server-level backend infrastructure restructuring',
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
      'Full-stack custom web application built with modern React, Tailwind CSS & Node.js',
      'Multi-page architecture with dynamic routing and instant sub-second page transitions',
      'Custom lead capture forms with instant WhatsApp API and email alerts',
      'Dedicated Admin dashboard to view inquiries, manage content, or update products',
      'Payment gateway integration (Razorpay / Cashfree / Stripe)',
      'SSL certificate setup, secure HTTP headers, and responsive mobile-first UI',
      'Cross-browser and cross-device testing across iOS, Android, macOS & Windows',
      '3 Months complimentary technical bug-fix and maintenance warranty',
    ],
    exclusions: [
      'Cloud VPS server / hosting subscription & custom domain fees (billed at actuals)',
      'Third-party paid API subscriptions (e.g. transactional WhatsApp API, SMS bundles)',
      'Large-scale enterprise ERP or multi-vendor marketplace architecture',
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
      'Half-day / full-day dynamic shoot using Apple iPhone 15/16 Pro Max in 4K ProRes',
      'Motorized 3-axis gimbal stabilization for smooth cinematic moving shots',
      'Dual wireless lavalier microphones for crisp voice recording without background hiss',
      'Compact bi-color LED video light for vibrant indoor and office lighting',
      'Vertical 9:16 framing curated specifically for Instagram Reels & YouTube Shorts',
      'Fast same-day transfer of all raw video and audio files via high-speed storage',
    ],
    exclusions: [
      'Post-production video editing, captioning & audio sync (billed separately or in retainer)',
      'Drone aerial videography',
      'Travel expenses outside Ahmedabad municipal limits',
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
      'High-resolution studio shoot for up to 15-20 products with professional lighting',
      'Pure white ecommerce backdrop and textured lifestyle surface staging',
      'Multiple product angles (front, 45-degree angle, close-up texture & packaging)',
      'Professional digital retouching: dust removal, color correction, and contrast balancing',
      'Web-optimized JPEG & PNG assets formatted for Amazon, Flipkart & Shopify',
      'High-res master images delivered via secure cloud link',
    ],
    exclusions: [
      'Professional hand model or fashion model fees (if human model requested)',
      'Custom prop fabrication or specialized location rental',
      'Product pickup/shipping courier logistics to studio',
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
      'Authentic User-Generated Content (UGC) creator testimonial or unboxing demonstration',
      'Conversational, natural presentation that feels organic and non-ad-like in user feeds',
      'High-retention scriptwriting focusing on a 3-second attention-grabbing hook',
      'Full video editing with animated on-screen captions, sound effects, and zoom cuts',
      'Delivered in 9:16 vertical 1080p/4K resolution ready for Instagram & Meta Ads',
      'Full commercial advertising usage rights for your brand channels',
    ],
    exclusions: [
      'Celebrity / mega-influencer endorsement contracts',
      'Shipping of physical product sample to the creator',
      'Ad campaign management / media ad spend',
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
      'Curated shortlist of 5-10 relevant local Ahmedabad or niche influencers with real engagement',
      'Influencer outreach, deliverable negotiation, and brand contract coordination',
      'Creative briefing sheet outlining mandatory talking points, hashtags & brand mentions',
      'Review and quality check of influencer video drafts prior to publication',
      'Coordination of influencer venue visits or product dispatch',
      'Post-campaign reach, impressions & engagement analytics report',
    ],
    exclusions: [
      'Direct influencer collaboration fees (payout directly depends on creator followers and tier)',
      'Free product samples or meals provided to influencers during collaboration',
      'Guaranteed direct sales conversion numbers (influencers build brand awareness & trust)',
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
      'Custom double-sided professional visiting card design (2 creative concepts)',
      'High-grade 350-400 GSM heavy art card stock with premium velvet matte or gloss finish',
      'Physical printing of 500 or 1,000 visiting cards',
      'QR code integration linking directly to WhatsApp chat, GBP profile, or digital contact vCard',
      'Print-ready vector PDF files provided for lifetime reprint flexibility',
      'Complimentary doorstep courier delivery within Ahmedabad',
    ],
    exclusions: [
      'Luxury specialty finishes (spot UV, metallic foil embossing) available at minor add-on cost',
      'Courier shipping outside Gujarat',
      'Primary logo design from scratch (client provides logo or books Logo Design add-on)',
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
      'Custom 4 to 8-page product catalog, brochure, or restaurant food menu layout',
      'Structured visual hierarchy with item names, specifications, badges & pricing tables',
      'High-resolution CMYK print-ready PDF with bleed marks for physical printing',
      'Interactive digital PDF version with clickable Click-to-WhatsApp order buttons',
      'Up to 3 revision cycles for price and item adjustments',
      'Cover page, brand story introduction & back contact page layout included',
    ],
    exclusions: [
      'Physical bulk offset printing (can be quoted separately based on paper and quantity)',
      'Product photo shoots (client provides images or books Product Photography add-on)',
      'Technical writing or translation into multiple languages',
    ],
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
    inclusions: [
      'Editing of 8-10 high-impact vertical Instagram Reels or YouTube Shorts',
      'AI voiceover generation or synchronization with trending Instagram audio tracks',
      'Dynamic animated auto-captions with color highlights and engaging emojis',
      'Strategic B-roll footage selection, smooth zoom cuts, and transition sound effects',
      'First 3-second retention hook optimization to boost watch time and viral reach',
      'Exported in crisp 1080x1920 MP4 with suggested hashtags and captions ready to post',
    ],
    exclusions: [
      'Physical on-site videographer shoot (client provides raw footage or uses AI stock footage)',
      'Daily social media account posting and comment management',
      'Custom 3D character modeling or complex Hollywood VFX',
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
      'Professional WhatsApp Business App setup on your dedicated mobile or landline number',
      'Branded business profile configuration (logo, bio, website link, email, operating hours)',
      'Product and services catalog setup for up to 10 items with prices & direct order links',
      'Automated greeting message welcoming new customers instantly',
      'Automated away message for outside business hours',
      'Quick replies shortcuts setup for frequently asked questions (pricing, address, bank info)',
      'Direct Click-to-WhatsApp link and printable QR code for marketing banners & flyers',
    ],
    exclusions: [
      'Official Meta WhatsApp Cloud API green tick badge (requires Meta business verification & monthly SaaS subscription)',
      'Mass bulk spam broadcast messaging tools',
      'Daily 24/7 human customer support answering',
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
