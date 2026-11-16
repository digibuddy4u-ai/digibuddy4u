import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  formatSeoTitle,
  resolveCanonicalUrl,
  getOrganizationSchema,
  getWebSiteSchema,
} from '../../utils/seoConfig';
import { BRAND } from '../../utils/brandConstants';

function upsertMetaTag(attrName, attrValue, content) {
  if (!attrValue) return;
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  robots,
  noindex = false,
  schema = null,
}) {
  const location = useLocation();

  useLayoutEffect(() => {
    const resolvedTitle = formatSeoTitle(title);
    document.title = resolvedTitle;

    const defaultDesc =
      'DigiBuddy4U is a digital marketing agency in Ahmedabad offering social media management, Meta ads, video reels production, SEO services, and website development.';
    const resolvedDesc = description || defaultDesc;

    const targetPath = canonical || canonicalUrl || location.pathname || '/';
    const resolvedCanonical = noindex ? '' : resolveCanonicalUrl(targetPath);
    const resolvedOgUrl = resolveCanonicalUrl(targetPath);
    const resolvedRobots = robots || (noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Core Meta Tags
    upsertMetaTag('name', 'description', resolvedDesc);
    upsertMetaTag('name', 'keywords', keywords || '');
    upsertMetaTag('name', 'robots', resolvedRobots);

    // Canonical URL
    upsertLinkTag('canonical', resolvedCanonical);

    // Open Graph Metadata
    upsertMetaTag('property', 'og:site_name', BRAND.name);
    upsertMetaTag('property', 'og:locale', 'en_IN');
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:title', resolvedTitle);
    upsertMetaTag('property', 'og:description', resolvedDesc);
    upsertMetaTag('property', 'og:url', resolvedOgUrl);
    upsertMetaTag('property', 'og:image', ogImage || DEFAULT_OG_IMAGE);
    upsertMetaTag('property', 'og:image:alt', `${BRAND.name} — Digital Marketing & IT Partner in Ahmedabad`);

    // Twitter Card Metadata
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', resolvedTitle);
    upsertMetaTag('name', 'twitter:description', resolvedDesc);
    upsertMetaTag('name', 'twitter:image', ogImage || DEFAULT_OG_IMAGE);

    // Structured Data (JSON-LD)
    const schemaId = 'digibuddy4u-structured-data';
    let scriptEl = document.getElementById(schemaId);
    const defaultSchemas = noindex ? [] : [getOrganizationSchema(), getWebSiteSchema()];
    const rawSchemas = schema
      ? Array.isArray(schema)
        ? schema.filter(Boolean)
        : [schema]
      : defaultSchemas;

    if (rawSchemas.length > 0 && !noindex) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.id = schemaId;
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(
        rawSchemas.length === 1 ? rawSchemas[0] : rawSchemas
      );
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    canonicalUrl,
    ogType,
    ogImage,
    robots,
    noindex,
    schema,
    location.pathname,
  ]);

  return null;
}
