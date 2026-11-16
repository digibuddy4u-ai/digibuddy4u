import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  STATIC_ROUTES_SEO,
  formatSeoTitle,
  resolveCanonicalUrl,
  getOrganizationSchema,
  getServiceSchema,
  getPackageSchema,
  getBreadcrumbSchema,
} from '../src/utils/seoConfig.js';
import { FALLBACK_SERVICES } from '../src/utils/servicesCatalog.js';
import { PACKAGES_CATALOG } from '../src/utils/packagesCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const publicDir = path.join(clientRoot, 'public');
const distDir = path.join(clientRoot, 'dist');

function escapeHtmlAttr(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function collectAllRoutes() {
  const routes = [...STATIC_ROUTES_SEO];

  // Dynamic 14 Service Pages
  for (const service of FALLBACK_SERVICES) {
    routes.push({
      path: `/services/${service.slug}`,
      title: service.seo?.title || `${service.title} in Ahmedabad | DigiBuddy4U`,
      description: service.seo?.metaDescription || service.shortDescription,
      keywords:
        service.seo?.keywords ||
        `${service.title}, ${service.categoryName} Ahmedabad, DigiBuddy4U`,
      canonical: `/services/${service.slug}`,
      ogType: 'website',
      robots: 'index, follow',
      changefreq: 'monthly',
      priority: '0.8',
      schema: [
        getOrganizationSchema(),
        getServiceSchema(service),
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]),
      ].filter(Boolean),
    });
  }

  // Dynamic 4 Package Specification Pages
  for (const pkg of PACKAGES_CATALOG) {
    routes.push({
      path: `/packages/${pkg.slug}`,
      title: `${pkg.name} Package (${pkg.priceDisplay}) | DigiBuddy4U`,
      description: `Explore ${pkg.name} (${pkg.priceDisplay}) by DigiBuddy4U in Ahmedabad: ${pkg.description}`,
      keywords: `${pkg.name} Package, Digital Marketing Packages Ahmedabad, Social Media Marketing Agency Ahmedabad, DigiBuddy4U`,
      canonical: `/packages/${pkg.slug}`,
      ogType: 'website',
      robots: 'index, follow',
      changefreq: 'monthly',
      priority: '0.8',
      schema: [
        getOrganizationSchema(),
        getPackageSchema(pkg),
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Packages', path: '/packages' },
          { name: `${pkg.name} Package`, path: `/packages/${pkg.slug}` },
        ]),
      ].filter(Boolean),
    });
  }

  // Enrich /services & /packages schema catalogs with dynamic entries
  const servicesRoute = routes.find((r) => r.path === '/services');
  if (servicesRoute) {
    servicesRoute.schema = [
      ...servicesRoute.schema,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'DigiBuddy4U Services Catalogue',
        itemListElement: FALLBACK_SERVICES.map((srv, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: srv.title,
          url: resolveCanonicalUrl(`/services/${srv.slug}`),
        })),
      },
    ];
  }

  const packagesRoute = routes.find((r) => r.path === '/packages');
  if (packagesRoute) {
    packagesRoute.schema = [
      ...packagesRoute.schema,
      ...PACKAGES_CATALOG.map(getPackageSchema).filter(Boolean),
    ];
  }

  return routes;
}

function buildSitemapXml(routes) {
  const lastmod = new Date().toISOString().split('T')[0];
  const urlEntries = routes
    .map((route) => {
      const loc = resolveCanonicalUrl(route.canonical || route.path);
      return [
        '  <url>',
        `    <loc>${escapeHtmlText(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq || 'monthly'}</changefreq>`,
        `    <priority>${route.priority || '0.7'}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

function buildRobotsTxt() {
  return [
    '# robots.txt for DigiBuddy4U',
    'User-agent: *',
    'Allow: /',
    'Disallow: /customer/',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
}

function injectRouteHead(baseHtml, route) {
  const resolvedTitle = formatSeoTitle(route.title);
  const resolvedCanonical = resolveCanonicalUrl(route.canonical || route.path);
  const resolvedRobots = route.robots || 'index, follow, max-image-preview:large';
  const resolvedOgType = route.ogType || 'website';
  const schemaJson = JSON.stringify(
    route.schema?.length === 1 ? route.schema[0] : route.schema
  ).replace(/</g, '\\u003c');

  // Remove baseline meta/canonical/OG/Twitter/schema block and inject exact per-route tags
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlText(resolvedTitle)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeHtmlAttr(route.description)}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${escapeHtmlAttr(
        resolvedRobots.includes('max-image-preview')
          ? resolvedRobots
          : `${resolvedRobots}, max-image-preview:large`
      )}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtmlAttr(resolvedCanonical)}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${escapeHtmlAttr(resolvedOgType)}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtmlAttr(resolvedTitle)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtmlAttr(route.description)}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${escapeHtmlAttr(resolvedCanonical)}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${escapeHtmlAttr(DEFAULT_OG_IMAGE)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtmlAttr(resolvedTitle)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtmlAttr(route.description)}" />`
    )
    .replace(
      /<script\s+id="digibuddy4u-structured-data"[^>]*>[\s\S]*?<\/script>/i,
      ''
    );

  const extraHeadTags = [
    route.keywords
      ? `    <meta name="keywords" content="${escapeHtmlAttr(route.keywords)}" />`
      : '',
    route.schema && route.schema.length > 0
      ? `    <script id="digibuddy4u-structured-data" type="application/ld+json">${schemaJson}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  if (extraHeadTags) {
    html = html.replace('</head>', `${extraHeadTags}\n  </head>`);
  }

  return html;
}

export function generateSeoArtifacts({ writeDistSnapshots = true } = {}) {
  const routes = collectAllRoutes();
  const sitemapXml = buildSitemapXml(routes);
  const robotsTxt = buildRobotsTxt();

  // Ensure public/ always stays updated with sitemap.xml and robots.txt
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  if (writeDistSnapshots && fs.existsSync(path.join(distDir, 'index.html'))) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');

    const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

    for (const route of routes) {
      const routeHtml = injectRouteHead(baseHtml, route);
      if (route.path === '/') {
        fs.writeFileSync(path.join(distDir, 'index.html'), routeHtml, 'utf8');
      } else {
        const cleanSegment = route.path.replace(/^\/+|\/+$/g, '');
        const targetFile = path.join(distDir, `${cleanSegment}.html`);
        fs.mkdirSync(path.dirname(targetFile), { recursive: true });
        fs.writeFileSync(targetFile, routeHtml, 'utf8');
      }
    }
  }

  return { routesCount: routes.length };
}

// Allow direct execution via `node scripts/generateSeo.mjs`
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const result = generateSeoArtifacts({ writeDistSnapshots: fs.existsSync(distDir) });
  console.log(`✅ Generated sitemap.xml, robots.txt, and ${result.routesCount} route SEO metadata snapshots.`);
}
