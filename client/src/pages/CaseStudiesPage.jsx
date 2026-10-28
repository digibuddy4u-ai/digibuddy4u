import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  CheckCircle2,
  AlertCircle,
  Video,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { PORTFOLIO_PROJECTS } from '../utils/portfolioData';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { api } from '../utils/api';

export default function CaseStudiesPage() {
  const { settings } = useSiteSettings();
  const [caseStudy, setCaseStudy] = useState(
    () => PORTFOLIO_PROJECTS.find((p) => p.id === 'rotiwala') || PORTFOLIO_PROJECTS[0]
  );

  useEffect(() => {
    let isMounted = true;
    async function loadCaseStudy() {
      try {
        const res = await api.get('/case-studies');
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const cs = res.data[0];
          setCaseStudy((prev) => ({
            ...prev,
            title: cs.title || prev.title,
            client: cs.client || prev.client,
            overview: cs.overview || prev.overview,
            challenges: Array.isArray(cs.challenges) && cs.challenges.length > 0 ? cs.challenges : prev.challenges,
            strategy: Array.isArray(cs.strategy) && cs.strategy.length > 0 ? cs.strategy : prev.strategy,
            deliverables: Array.isArray(cs.deliverables) && cs.deliverables.length > 0 ? cs.deliverables : prev.deliverables,
          }));
        }
      } catch {
        // Fallback
      }
    }

    loadCaseStudy();

    const handleFocus = () => loadCaseStudy();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadCaseStudy, 25000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const rotiWala = caseStudy;

  return (
    <>
      <SEO
        title="Case Study — RotiWala Digital Marketing Overhaul"
        description="Discover how DigiBuddy4U built the brand identity, content strategy, and vertical reel pipeline for food service provider RotiWala."
      />

      {/* Header Banner */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            How DigiBuddy4U Brought <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">RotiWala</span> to Digital Life.
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive breakdown of the strategy, visual creative direction, and short-form video execution designed for a daily homestyle food brand.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-700">
            <span className="flex items-center gap-1.5 bg-surface-light border border-slate-200 px-3.5 py-1.5 rounded-full font-medium shadow-xs">
              <Utensils className="w-4 h-4 text-primary" />
              Client: RotiWala
            </span>
            <span className="flex items-center gap-1.5 bg-surface-light border border-slate-200 px-3.5 py-1.5 rounded-full font-medium shadow-xs">
              <Calendar className="w-4 h-4 text-cyan-600" />
              Engagement: Active
            </span>
            <span className="flex items-center gap-1.5 bg-surface-light border border-slate-200 px-3.5 py-1.5 rounded-full font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              Status: Verified Client Scope
            </span>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="site-container max-w-4xl xl:max-w-5xl space-y-10 sm:space-y-12">
          {/* Executive Summary */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-light border border-slate-200/90 shadow-card-soft space-y-4">
            <Badge variant="blue">Executive Summary</Badge>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
              The Client & The Opportunity
            </h2>
            <p className="text-base text-content-muted leading-relaxed">
              <strong>RotiWala</strong> is a dedicated food brand catering to busy working professionals, university students, and families who crave the comfort of homemade rotis and balanced Indian meals without the friction of kitchen preparation.
            </p>
            <p className="text-base text-content-muted leading-relaxed">
              While the kitchen produced top-notch, hygienic, and authentic food, their digital touchpoints lacked consistency, modern visual appeal, and a seamless pipeline to capture customer orders. DigiBuddy4U was brought on board as their complete digital growth buddy.
            </p>
          </div>

          {/* Core Challenges */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                !
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy-900">
                Key Marketing Challenges
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rotiWala.challenges.map((challenge, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-primary">Challenge 0{idx + 1}</span>
                  <p className="text-sm text-content-dark font-medium leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Roadmap */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy-900">
                The DigiBuddy4U Strategy & Execution
              </h3>
            </div>

            <div className="space-y-4">
              {rotiWala.strategy.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-light border border-slate-200/90 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-navy-900 text-accent-yellow font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-navy-900 font-semibold leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Produced */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-light border border-slate-200/90 text-navy-950 space-y-6 shadow-card-soft">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  Campaign Output
                </span>
                <h3 className="text-2xl font-bold font-heading text-navy-950 mt-1">
                  Scope of Deliverables Delivered
                </h3>
              </div>
              <Badge variant="blue" size="sm">
                In Production
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {rotiWala.scope.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-snug font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Performance Metrics & Client Testimonial Placeholder (Strictly Adheres to Rules) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/90 border border-amber-200/80 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold font-heading text-amber-950">
                Verified Campaign Analytics & Client Review Notice
              </h4>
            </div>

            <p className="text-sm text-amber-900 leading-relaxed">
              At DigiBuddy4U, we hold ourselves to strict ethical standards. <strong>We do not fabricate artificial ROI figures, fake follower counts, or invented client testimonials.</strong>
            </p>

            <div className="p-4 rounded-2xl bg-white border border-amber-200/80 text-xs sm:text-sm text-amber-950 space-y-1">
              <span className="font-bold block">
                [Status: Campaign Verification In Progress]
              </span>
              <p>
                The RotiWala campaign is an active client engagement. Full engagement metrics, reach analytics, and verified client testimonials will be published following official campaign milestone signoff.
              </p>
            </div>
          </div>

          {/* Bottom Conversion Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-light border border-slate-200/90 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
              Want a Tailored Growth Strategy for Your Brand?
            </h3>
            <p className="text-base text-content-muted max-w-xl mx-auto">
              Whether you are in food, retail, e-commerce, or service industries, we will map out an actionable strategy tailored to your exact market.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/contact" variant="yellow" size="lg" icon={ArrowRight}>
                Request Your Brand Roadmap
              </Button>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-base hover:bg-[#1EBE5D] transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat with our Strategist</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
