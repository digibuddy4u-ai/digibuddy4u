import { useEffect } from 'react';
import { BRAND } from '../../utils/brandConstants';

export default function SEO({ title, description, canonical }) {
  useEffect(() => {
    // Title
    const fullTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
    document.title = fullTitle;

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const defaultDesc = 'DigiBuddy4U is your digital growth partner specializing in social media management, strategic content creation, high-converting video reels, and digital advertising.';
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }

    // Scroll to top automatically when SEO updates
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, canonical]);

  return null;
}
