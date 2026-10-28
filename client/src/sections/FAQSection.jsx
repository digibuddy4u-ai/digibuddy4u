import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import FAQAccordion from '../components/ui/FAQAccordion';
import { FAQ_DATA } from '../utils/faqData';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { api } from '../utils/api';
import { MessageCircle, Mail } from 'lucide-react';

export default function FAQSection() {
  const { settings } = useSiteSettings();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const res = await api.get('/faqs');
        if (isMounted) {
          if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
            // Format into accordion items
            const formatted = res.data.map((f) => ({
              id: f._id || f.id,
              question: f.question,
              answer: f.answer,
              category: f.category || 'General',
            }));
            setFaqs(formatted);
          } else {
            // Admin turned off / deleted all FAQs in database -> empty array
            setFaqs([]);
          }
        }
      } catch {
        if (isMounted) setFaqs([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFaqs();

    const handleFocus = () => loadFaqs();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadFaqs, 25000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Respect Admin Settings and hide completely if admin turned off FAQs or if 0 FAQs exist
  if (settings?.showFaqs === false || settings?.faqSettings?.showOnHome === false) {
    return null;
  }

  // If loading or if 0 FAQs in database, hide section completely
  if (!loading && (!faqs || faqs.length === 0)) {
    return null;
  }
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white border-y border-slate-100">
      <div className="site-container">
        <SectionHeader
          badge="Frequently Asked Questions"
          badgeVariant="blue"
          title="Clear Answers to"
          titleHighlight="Important Questions"
          description="We believe in straightforward answers, clear expectations, and zero hidden surprises."
          align="center"
        />

        <FAQAccordion items={faqs} />

        {/* Direct Help Card */}
        <div className="mt-10 sm:mt-12 max-w-3xl xl:max-w-4xl mx-auto p-6 sm:p-7 rounded-2xl bg-surface-light border border-slate-200/80 text-center space-y-4">
          <h4 className="font-heading font-bold text-navy-900 text-lg">
            Have a question that is not covered here?
          </h4>
          <p className="text-sm text-content-muted">
            Our team is always reachable directly. Send us a message on WhatsApp or send an email and we'll reply promptly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1EBE5D] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us ({settings.phone})</span>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us ({settings.email})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
