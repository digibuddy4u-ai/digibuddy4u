import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Admin from '../models/Admin.js';
import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import CaseStudy from '../models/CaseStudy.js';
import Pricing from '../models/Pricing.js';
import FAQ from '../models/FAQ.js';
import Setting from '../models/Setting.js';
import { ENV } from '../config/env.js';
import { INITIAL_CATEGORIES, CATALOG_SERVICES } from './servicesCatalog.js';

export const INITIAL_SERVICES = [
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    shortDescription: 'End-to-end account handling, content scheduling, audience interaction, and community nurturing across Instagram, LinkedIn, and Facebook.',
    fullDescription: 'We take complete ownership of your brand’s social footprint. From setting up cohesive brand visuals to maintaining daily publishing calendars, active community moderation, and story updates, we turn passive scrolling audiences into loyal advocates.',
    icon: 'Share2',
    deliverables: [
      'Monthly curated content calendar & scheduling',
      'Daily story updates & highlight curation',
      'Community engagement, DM & comment management',
      'Bio optimization & aesthetic grid structuring',
      'Monthly performance insights & organic health report',
    ],
    highlight: 'Build consistency, brand voice, and genuine community engagement.',
    order: 1,
    isPublished: true,
  },
  {
    title: 'Content Creation',
    slug: 'content-creation',
    shortDescription: 'High-converting graphics, carousel slides, infographics, and persuasive copywriting tailored to your target demographic.',
    fullDescription: 'Content is your primary digital salesman. Our creative team designs scroll-stopping visual assets paired with sharp, persuasive copy that educates your buyers, solves their pain points, and establishes category leadership.',
    icon: 'Palette',
    deliverables: [
      'High-resolution promotional and educational carousels',
      'Custom brand graphic templates and infographics',
      'Conversion-oriented copywriting with strong CTAs',
      'Product showcase creatives & brand banners',
      'Cross-platform creative formatting (feed, story, banner)',
    ],
    highlight: 'Stop the scroll with tailored visual storytelling that drives action.',
    order: 2,
    isPublished: true,
  },
  {
    title: 'Reels and Short-Form Video Content',
    slug: 'reels-and-video',
    shortDescription: 'Hook-driven, trend-aware vertical video editing and script direction engineered for Instagram Reels and YouTube Shorts.',
    fullDescription: 'Short-form video is the single most powerful organic reach engine today. We script, edit, pace, sound-design, and caption attention-grabbing reels that capture interest in the first 3 seconds and drive virality.',
    icon: 'Video',
    deliverables: [
      'Hook strategy & conversational script outlines',
      'Dynamic video editing with motion graphics and sound effects',
      'High-contrast subtitles & kinetic typography',
      'Trending audio research and synchronization',
      'B-roll selection & visual pacing enhancement',
    ],
    highlight: 'Leverage algorithms with high-retention vertical videos.',
    order: 3,
    isPublished: true,
  },
  {
    title: 'Digital Advertising',
    slug: 'digital-advertising',
    shortDescription: 'Data-driven paid ad campaigns across Meta (Instagram/Facebook) and Google Ads designed to generate qualified leads and sales.',
    fullDescription: 'Stop burning budget on boost buttons. We build structured ad funnels from cold audience prospecting to retargeting, combining granular demographic targeting, A/B creative testing, and pixel tracking to maximize your return on ad spend.',
    icon: 'TrendingUp',
    deliverables: [
      'Meta Ad Account setup & Pixel/CAPI tracking configuration',
      'Audience segmentation, lookalikes, and custom retargeting',
      'Ad creative copy variations & A/B testing framework',
      'Campaign budget optimization (CBO/ABO) management',
      'Weekly spend efficiency and campaign performance tracking reports',
    ],
    highlight: 'Laser-focused ad funnels that turn clicks into paying customers.',
    order: 4,
    isPublished: true,
  },
  {
    title: 'Brand Strategy and Branding',
    slug: 'brand-strategy-and-branding',
    shortDescription: 'Foundational brand identity, distinct tone of voice, color palette, typography guidelines, and strategic market positioning.',
    fullDescription: 'Great marketing fails without clear positioning. We help your business discover its unique market edge, craft a distinctive voice, establish cohesive visual guidelines, and differentiate clearly from competitors.',
    icon: 'Compass',
    deliverables: [
      'Brand positioning statement & value proposition definition',
      'Color palette, font hierarchy, and logo usage guidelines',
      'Brand tone of voice & messaging manual',
      'Competitor differentiation & customer persona mapping',
      'Digital brand style guide kit for multi-team use',
    ],
    highlight: 'Carve out an unmistakable identity that commands trust.',
    order: 5,
    isPublished: true,
  },
  {
    title: 'Social Media Strategy',
    slug: 'social-media-strategy',
    shortDescription: 'Actionable blueprints mapping content pillars, distribution cadence, competitor analysis, and clear KPIs for organic growth.',
    fullDescription: 'Random posting yields random results. We build comprehensive, data-backed roadmaps defining what to post, when to post, which formats to prioritize, and how to shepherd viewers through awareness to conversion.',
    icon: 'Layers',
    deliverables: [
      'In-depth competitor and industry benchmark audit',
      'Content pillar architecture (Educate, Entertain, Inspire, Convert)',
      'Publishing cadence, optimal time windows & channel matrix',
      'Community engagement tactics & outreach roadmap',
      'Quarterly growth milestone tracking framework',
    ],
    highlight: 'Replace guesswork with a systematic, goal-oriented roadmap.',
    order: 6,
    isPublished: true,
  },
];

export const INITIAL_PORTFOLIO = [
  {
    title: 'RotiWala — Freshness, Hygiene & Homestyle Meals',
    slug: 'rotiwala',
    client: 'RotiWala',
    tagline: 'Delivering warm, fresh, homestyle rotis and wholesome daily meals.',
    category: 'Food & Hospitality',
    overview: 'RotiWala is a food service provider focused on bringing wholesome, freshly prepared rotis and homestyle meals to households and busy professionals. DigiBuddy4U partnered with RotiWala to build a distinct digital presence, establish consistent social media storytelling, and showcase the freshness and cleanliness of their kitchen operations.',
    scope: [
      'Social Media Management & Posting Schedule',
      'Visual Identity Styling & Color Harmony',
      'Reels & Behind-the-Scenes Food Preparation Videos',
      'Daily Specials & Menu Highlight Creative Cards',
      'Local Audience Engagement & Query Response Support',
    ],
    challenges: [
      'Establishing trust around hygiene and ingredient freshness in food delivery.',
      'Differentiating daily homestyle food from standard fast-food competitors.',
      'Building a reliable daily ordering routine for working customers.',
    ],
    strategy: [
      'Pillar 1: Kitchen Transparency — Real footage of dough preparation, cleanliness, and hot-off-the-tawa rotis.',
      'Pillar 2: Everyday Relatability — Content highlighting the comfort of homemade taste without the hassle of cooking.',
      'Pillar 3: Clear Ordering Action — Direct WhatsApp click-to-order links on every post and story highlight.',
    ],
    deliverablesDelivered: [
      'Brand Social Media Kit',
      'Weekly Reel Concepts & Edited Clips',
      'High-Resolution Promo Graphics',
      'WhatsApp Order Direct Setup',
    ],
    status: 'Active Client Engagement',
    isMetricsPending: true,
    metricsNotice: 'Authentic performance metrics, reach analytics, and verified client testimonials will be published once the current campaign cycle completes client review. DigiBuddy4U strictly avoids fabricated statistics.',
    isFeatured: true,
    isPublished: true,
    order: 1,
  },
];

export const INITIAL_CASE_STUDIES = [
  {
    title: 'How DigiBuddy4U Brought RotiWala to Digital Life',
    slug: 'rotiwala-case-study',
    client: 'RotiWala',
    category: 'Food & Hospitality',
    subtitle: 'From a local food venture to an appetizing, consistent social media presence.',
    overview: 'RotiWala engaged DigiBuddy4U to establish an authentic digital voice, produce mouth-watering behind-the-scenes reels, and build a reliable daily ordering rhythm via social media.',
    challenges: [
      'Overcoming customer skepticism about food cleanliness through authentic visual proof.',
      'Maintaining daily posting cadence without disrupting fast-paced kitchen operations.',
      'Creating easy conversion funnels directly to customer service and WhatsApp ordering.',
    ],
    strategy: [
      'Kitchen Transparency Strategy with raw, genuine video footage.',
      'Homestyle Relatability content pillars focusing on convenience for working professionals.',
      'Direct Click-to-WhatsApp order links embedded across stories and bio.',
    ],
    deliverables: [
      'Weekly short-form food reels with kinetic subtitles',
      'Branded daily menu creatives and specials cards',
      'WhatsApp ordering funnel and inquiry routing setup',
    ],
    verifiedNotice: 'Campaign metrics and official client testimonials are verified upon milestone sign-off. DigiBuddy4U strictly avoids fabricated data.',
    status: 'Active Engagement',
    isPublished: true,
    order: 1,
  },
];

export const INITIAL_PRICING = [
  {
    name: 'Starter Growth',
    badge: 'Essential Presence',
    description: 'Ideal for local businesses and early-stage startups needing a consistent, polished social footprint.',
    monthlyPrice: 'Custom Plan',
    isRecommended: false,
    features: [
      '12 Curated posts per month (Graphics & Carousels)',
      '4 Short-form vertical reels (Scripting & Editing)',
      'Account bio & highlight setup / optimization',
      'Publishing calendar & copywriting with hashtags',
      'Basic community moderation & monthly report',
      '1 Platform focus (Instagram or Facebook)',
    ],
    ctaText: 'Start with Starter',
    ctaLink: '/contact?plan=starter',
    order: 1,
    isPublished: true,
  },
  {
    name: 'Accelerated Growth',
    badge: 'Most Popular',
    description: 'Designed for ambitious businesses ready to aggressively expand organic reach, engagement, and inbound leads.',
    monthlyPrice: 'Recommended Tier',
    isRecommended: true,
    features: [
      '20 High-impact posts per month (Carousels, Graphics)',
      '8 Trend-focused Reels / Short-form videos',
      'Active community management & daily story strategy',
      'Dedicated digital marketing strategist & account buddy',
      'Basic Meta Ad campaign setup & monitoring (Ad spend extra)',
      '2 Platforms handled (e.g. Instagram + LinkedIn / Facebook)',
      'Bi-weekly performance audit & strategy alignment call',
    ],
    ctaText: 'Choose Accelerated Growth',
    ctaLink: '/contact?plan=growth',
    order: 2,
    isPublished: true,
  },
  {
    name: 'Omnichannel Scale',
    badge: 'Full-Service Digital',
    description: 'Comprehensive digital agency partnership for brands aiming for market leadership and high conversion.',
    monthlyPrice: 'Custom Tailored',
    isRecommended: false,
    features: [
      '30+ Multi-format visual assets per month',
      '12-16 High-production Reels & video creatives',
      'Full-funnel digital advertising (Meta & Google Ads)',
      'Brand positioning & campaign creative direction',
      'Multi-channel execution (Instagram, LinkedIn, FB, YouTube)',
      'Dedicated creative team & priority turnaround',
      'Real-time Slack / WhatsApp coordination & weekly analytics',
    ],
    ctaText: 'Book Strategic Consultation',
    ctaLink: '/contact?plan=scale',
    order: 3,
    isPublished: true,
  },
];

export const INITIAL_FAQS = [
  {
    question: 'How does DigiBuddy4U partner with my brand?',
    answer: 'We act as an integrated extension of your internal team. We start with a thorough discovery audit of your brand, audience, and competitors. From there, we formulate a monthly content roadmap, produce all visual creatives, edit reels, draft engaging copy, and handle scheduled publishing and community moderation.',
    category: 'General',
    order: 1,
    isPublished: true,
  },
  {
    question: 'Which social platforms do you manage?',
    answer: 'We primarily specialize in Instagram, Facebook, and LinkedIn, along with vertical video optimization for YouTube Shorts. We align our focus with where your high-intent customers spend their time rather than stretching resources across irrelevant channels.',
    category: 'Platforms',
    order: 2,
    isPublished: true,
  },
  {
    question: 'How do you ensure the content matches our brand voice and tone?',
    answer: 'Before publishing a single post, we establish a Brand Style & Voice Guide capturing your tone, color rules, and messaging boundaries. Furthermore, every batch of creatives and videos is sent through a pre-approval calendar so you always have full visibility before anything goes live.',
    category: 'Workflow',
    order: 3,
    isPublished: true,
  },
  {
    question: 'Do you manage paid ad spend in addition to organic content?',
    answer: 'Yes. While organic social media builds credibility, trust, and brand loyalty, paid digital advertising (Meta Ads, Google Ads) enables rapid customer acquisition and retargeting. We design full-funnel ad campaigns to generate qualified leads and sales.',
    category: 'Advertising',
    order: 4,
    isPublished: true,
  },
  {
    question: 'How soon can we expect tangible results?',
    answer: 'Brand visual cohesion and audience engagement improvements typically happen within the first 30 days. High-impact organic growth and inbound lead flow generally build sustained momentum within 60 to 90 days of consistent, high-quality execution.',
    category: 'Results',
    order: 5,
    isPublished: true,
  },
  {
    question: 'Can we customize a package if our needs differ from standard tiers?',
    answer: 'Absolutely. Every business has unique goals and resource constraints. We regularly tailor customized deliverables—whether you need pure video editing, end-to-end management, or targeted ad management—to fit your exact requirements.',
    category: 'Pricing',
    order: 6,
    isPublished: true,
  },
];

export async function seedInitialData() {
  // 1. Seed Admin User
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@digibuddy4u.com';
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@DigiBuddy4U#2026';
  const adminName = process.env.INITIAL_ADMIN_NAME || 'DigiBuddy Admin';

  let admin = await Admin.findOne({ email: adminEmail.toLowerCase() });
  if (!admin) {
    admin = await Admin.create({
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: adminPassword,
      role: 'superadmin',
      isActive: true,
    });
    console.log(`👤 Superadmin created: ${adminEmail}`);
  } else {
    admin.password = adminPassword;
    await admin.save();
    console.log(`👤 Superadmin password refreshed: ${adminEmail}`);
  }

  // 2. Seed Categories
  const categoryMap = {};
  for (const cat of INITIAL_CATEGORIES) {
    const savedCat = await ServiceCategory.findOneAndUpdate(
      { slug: cat.slug },
      cat,
      { upsert: true, new: true }
    );
    categoryMap[cat.slug] = savedCat._id;
  }
  console.log('📁 Categories seeded: Digital Marketing, IT Services');

  // 3. Seed Complete 14 Services Catalogue with Sub-services
  for (const s of CATALOG_SERVICES) {
    const data = {
      ...s,
      categoryId: categoryMap[s.categorySlug] || null,
    };
    await Service.findOneAndUpdate({ slug: s.slug }, data, { upsert: true, new: true });
  }
  console.log(`💼 Seeded ${CATALOG_SERVICES.length} comprehensive services with sub-services`);

  // 3. Seed Portfolio
  for (const p of INITIAL_PORTFOLIO) {
    await Portfolio.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }

  // 4. Seed Case Studies
  for (const cs of INITIAL_CASE_STUDIES) {
    await CaseStudy.findOneAndUpdate({ slug: cs.slug }, cs, { upsert: true, new: true });
  }

  // 5. Seed Pricing Packages
  for (const pr of INITIAL_PRICING) {
    await Pricing.findOneAndUpdate({ name: pr.name }, pr, { upsert: true, new: true });
  }

  // 6. Seed FAQs
  for (const f of INITIAL_FAQS) {
    await FAQ.findOneAndUpdate({ question: f.question }, f, { upsert: true, new: true });
  }

  // 7. Seed Website Settings
  let setting = await Setting.findOne();
  if (!setting) {
    await Setting.create({
      businessName: 'DigiBuddy4U',
      tagline: 'Your Digital Growth Partner',
      email: 'info@digibuddy4u.com',
      phone: '+91 63524 78028',
      whatsappNumber: '+91 63524 78028',
      whatsappUrl: 'https://wa.me/916352478028?text=Hi%20DigiBuddy4U%2C%20I%20would%20like%20to%20discuss%20growing%20my%20brand%20online.',
      address: 'India',
      socials: {
        instagram: 'https://instagram.com/digibuddy4u',
        linkedin: 'https://linkedin.com/company/digibuddy4u',
        facebook: 'https://facebook.com/digibuddy4u',
        whatsapp: 'https://wa.me/916352478028',
      },
    });
  }
}

// Standalone CLI execution
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  console.log('🌱 Starting DigiBuddy4U Database Seeding...');
  try {
    await mongoose.connect(ENV.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB.');
    await seedInitialData();
    console.log('\n✨ Database seeding complete! You can now log into the admin dashboard.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}
