import { BRAND } from './brandConstants.js';

export const SITE_URL = 'https://digibuddy4u.vercel.app';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;

/**
 * Normalizes a page title without duplicating the brand name suffix.
 */
export function formatSeoTitle(title) {
  if (!title) return `${BRAND.name} — Digital Marketing Agency in Ahmedabad`;
  if (title.toLowerCase().includes(BRAND.name.toLowerCase())) {
    return title;
  }
  return `${title} | ${BRAND.name}`;
}

/**
 * Resolves a canonical path or full URL into a canonical HTTPS URL without trailing slash (except root).
 */
export function resolveCanonicalUrl(canonical = '/') {
  if (!canonical) return `${SITE_URL}/`;
  if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
    return canonical.replace('http://', 'https://');
  }
  const cleanPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
  if (cleanPath === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
}

/**
 * Organization JSON-LD Schema (strictly verified website identity fields only).
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    alternateName: `${BRAND.name} — ${BRAND.tagline}`,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
      width: 960,
      height: 520,
    },
    email: BRAND.email,
    telephone: BRAND.phone,
    sameAs: [
      BRAND.socials.instagram,
      BRAND.socials.facebook,
      BRAND.socials.linkedin,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.phone,
      email: BRAND.email,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  };
}

/**
 * ProfessionalService / LocalBusiness JSON-LD Schema.
 * Uses only verified city/region (Ahmedabad, Gujarat, India) without inventing street address, ratings, or awards.
 */
export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BRAND.name,
    description:
      'DigiBuddy4U is a digital marketing agency and website development partner in Ahmedabad, Gujarat offering social media management, Meta ads, video production, SEO services, and custom software.',
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    email: BRAND.email,
    telephone: BRAND.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Gandhinagar' },
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    sameAs: [
      BRAND.socials.instagram,
      BRAND.socials.facebook,
      BRAND.socials.linkedin,
    ].filter(Boolean),
  };
}

/**
 * WebSite JSON-LD Schema.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND.name,
    description:
      'Digital Marketing Agency in Ahmedabad offering social media marketing, Meta ads management, SEO services, video production, and website development.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

/**
 * BreadcrumbList JSON-LD Schema.
 * @param {Array<{name: string, path: string}>} items
 */
export function getBreadcrumbSchema(items = []) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: resolveCanonicalUrl(item.path),
    })),
  };
}

/**
 * Service JSON-LD Schema for individual service pages (/services/:slug).
 */
export function getServiceSchema(service) {
  if (!service) return null;
  const serviceUrl = resolveCanonicalUrl(`/services/${service.slug}`);
  const subServices = Array.isArray(service.subServices) ? service.subServices : [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.title,
    serviceType: service.categoryName || 'Digital Marketing & IT Services',
    description: service.seo?.metaDescription || service.fullDescription || service.shortDescription,
    url: serviceUrl,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'City', name: 'Gandhinagar' },
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
  };

  if (subServices.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.title} Modules`,
      itemListElement: subServices.map((sub) => {
        const subName = typeof sub === 'string' ? sub : sub.name;
        const subDesc = typeof sub === 'string' ? undefined : sub.shortDescription;
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: subName,
            ...(subDesc ? { description: subDesc } : {}),
          },
        };
      }),
    };
  }

  return schema;
}

/**
 * Package Service/Offer JSON-LD Schema (strictly factual price & currency in INR, no fake reviews).
 */
export function getPackageSchema(pkg) {
  if (!pkg) return null;
  const pkgUrl = resolveCanonicalUrl(`/packages/${pkg.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pkgUrl}#package`,
    name: `${pkg.name} Package — ${BRAND.name}`,
    description: pkg.description,
    url: pkgUrl,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    offers: {
      '@type': 'Offer',
      price: String(pkg.monthlyPrice || ''),
      priceCurrency: 'INR',
      url: pkgUrl,
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Static Route Metadata Definitions (shared across runtime SEO and Vite build HTML snapshot generator).
 */
export const STATIC_ROUTES_SEO = [
  {
    path: '/',
    title: 'DigiBuddy4U | Digital Marketing Agency in Ahmedabad',
    description:
      'DigiBuddy4U is a digital marketing agency in Ahmedabad offering social media management, Meta ads, video reels production, SEO services & website development.',
    keywords:
      'Digital Marketing Agency in Ahmedabad, Digital Marketing Services in Ahmedabad, Social Media Marketing Agency Ahmedabad, Website Development Company Ahmedabad, SEO Services in Ahmedabad, Meta Ads Agency Ahmedabad',
    canonical: '/',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'weekly',
    priority: '1.0',
    schema: [
      getOrganizationSchema(),
      getProfessionalServiceSchema(),
      getWebSiteSchema(),
    ],
  },
  {
    path: '/about',
    title: 'About DigiBuddy4U | Digital Marketing Agency Ahmedabad',
    description:
      'Meet DigiBuddy4U, your digital growth partner in Ahmedabad, Gujarat. Direct senior creative strategy, 4K video shoots, pre-approved social media & IT builds.',
    keywords:
      'Digital Marketing Agency in Ahmedabad, Branding Agency Ahmedabad, Video Production Agency Ahmedabad, DigiBuddy4U',
    canonical: '/about',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'monthly',
    priority: '0.8',
    schema: [
      getOrganizationSchema(),
      getProfessionalServiceSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ]),
    ],
  },
  {
    path: '/services',
    title: 'Digital Marketing Services in Ahmedabad & IT | DigiBuddy4U',
    description:
      'Explore 14 digital marketing services in Ahmedabad and IT solutions: social media marketing, Meta ads, SEO services, branding, video production & websites.',
    keywords:
      'Digital Marketing Services in Ahmedabad, Website Development Company Ahmedabad, SEO Services in Ahmedabad, Social Media Marketing Agency Ahmedabad, Meta Ads Agency Ahmedabad',
    canonical: '/services',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'weekly',
    priority: '0.9',
    schema: [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  },
  {
    path: '/packages',
    title: 'Digital Marketing Packages & Pricing Ahmedabad | DigiBuddy4U',
    description:
      'Transparent digital marketing packages in Ahmedabad: Digital Foundation (₹15,000 One-Time), Foundation (₹10,000/mo), Expansion (₹20,000/mo) & Ultimate (₹80,000).',
    keywords:
      'Social Media Marketing Packages Ahmedabad, Digital Marketing Pricing Gujarat, Meta Ads Agency Ahmedabad, Business Website Development',
    canonical: '/packages',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'weekly',
    priority: '0.9',
    schema: [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
      ]),
    ],
  },
  {
    path: '/portfolio',
    title: 'Client Portfolio & Creative Campaigns | DigiBuddy4U',
    description:
      'Explore DigiBuddy4U verified client portfolio, showcasing our social media management, video reels editing, graphic design, and marketing campaigns for leading brands in India and UAE.',
    keywords:
      'Digital Marketing Portfolio, Social Media Marketing Agency, Video Reels Production, Branding Agency Portfolio, DigiBuddy4U Clients',
    canonical: '/portfolio',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'monthly',
    priority: '0.8',
    schema: [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
      ]),
    ],
  },
  {
    path: '/contact',
    title: 'Contact DigiBuddy4U | Digital Marketing Agency Ahmedabad',
    description:
      'Contact DigiBuddy4U in Ahmedabad, Gujarat for social media marketing, Meta ads, SEO, and website development. Call or WhatsApp +91 63524 78028.',
    keywords:
      'Contact Digital Marketing Agency Ahmedabad, Website Development Quote Ahmedabad, Meta Ads Consultation Gujarat',
    canonical: '/contact',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'monthly',
    priority: '0.8',
    schema: [
      getOrganizationSchema(),
      getProfessionalServiceSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact' },
      ]),
    ],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | DigiBuddy4U',
    description:
      'Read the official DigiBuddy4U Privacy Policy covering client confidentiality, inquiry handling, and data security practices.',
    keywords: 'DigiBuddy4U Privacy Policy',
    canonical: '/privacy-policy',
    ogType: 'website',
    robots: 'index, follow',
    changefreq: 'yearly',
    priority: '0.3',
    schema: [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
      ]),
    ],
  },
];
