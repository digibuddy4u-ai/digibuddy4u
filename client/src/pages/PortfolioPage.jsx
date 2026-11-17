import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import PortfolioCard from '../components/ui/PortfolioCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { PORTFOLIO_PROJECTS, UPCOMING_PORTFOLIO_PLACEHOLDERS } from '../utils/portfolioData';
import { api } from '../utils/api';
import { getOrganizationSchema, getBreadcrumbSchema } from '../utils/seoConfig';

const CATEGORIES = ['All', 'Outdoor & Landscaping', 'Automotive', 'Corporate & B2B', 'Food & Beverage'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState(PORTFOLIO_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    async function loadPortfolio() {
      try {
        const res = await api.get('/portfolio');
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const backendMap = new Map();
          res.data
            .filter((p) => p.isPublished !== false)
            .forEach((p) => {
              const key = (p.slug || p._id || p.id || '').toLowerCase();
              if (key) backendMap.set(key, p);
            });

          // Always preserve our complete verified 6-client catalog, merging backend data by key
          const merged = PORTFOLIO_PROJECTS.map((staticProj) => {
            const key = (staticProj.slug || staticProj.id || '').toLowerCase();
            const fromBackend = backendMap.get(key);
            if (fromBackend) {
              return {
                ...staticProj,
                ...fromBackend,
                id: staticProj.id,
                logo: fromBackend.logo || staticProj.logo,
                scope: fromBackend.scope && fromBackend.scope.length ? fromBackend.scope : staticProj.scope,
                deliverables:
                  fromBackend.deliverables && fromBackend.deliverables.length
                    ? fromBackend.deliverables
                    : staticProj.deliverables,
              };
            }
            return staticProj;
          });

          // Also append any new custom project created in the admin portal
          res.data.forEach((p) => {
            const key = (p.slug || p._id || p.id || '').toLowerCase();
            const exists = PORTFOLIO_PROJECTS.some(
              (sp) => (sp.slug || sp.id || '').toLowerCase() === key
            );
            if (!exists && p.isPublished !== false) {
              merged.push({
                ...p,
                id: p.slug || p._id,
              });
            }
          });

          setProjects(merged);
        }
      } catch {
        // Fallback to static PORTFOLIO_PROJECTS
      }
    }

    loadPortfolio();

    const handleFocus = () => loadPortfolio();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadPortfolio, 30000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.includes(activeCategory));

  return (
    <>
      <SEO
        title="Client Portfolio & Creative Campaigns | DigiBuddy4U"
        description="Explore DigiBuddy4U verified client portfolio, showcasing our social media management, video reels editing, graphic design, and marketing campaigns for leading brands."
        keywords="Digital Marketing Portfolio, Social Media Marketing Ahmedabad, Video Reels Production, Branding Portfolio, DigiBuddy4U Clients"
        canonical="/portfolio"
        schema={[
          getOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
          ]),
        ]}
      />

      {/* Hero Banner */}
      <section className="bg-white text-navy-950 py-8 sm:py-12 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Real Work for <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Real Brands.</span>
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take a look at our current creative campaigns, visual systems, and reel production frameworks. Built with complete integrity and zero fabricated metrics.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'bg-surface-light text-slate-700 hover:text-navy-950 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid - All 6 Verified Client Brands (Compact 3-Col Layout) */}
      <section className="py-8 sm:py-10 bg-surface-light">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Pipeline & Transparency (Compact Footer Section) */}
      <section className="py-8 sm:py-10 bg-surface-light border-t border-slate-200/80">
        <div className="site-container space-y-6">
          {/* Scalable Pipeline / Upcoming Projects Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Agency Expansion
                </span>
                <h2 className="text-base sm:text-lg font-bold font-heading text-navy-900 mt-0.5">
                  Upcoming Client Showcases in Pipeline
                </h2>
              </div>
              <Badge variant="yellow" size="sm">
                In Onboarding
              </Badge>
            </div>

            <p className="text-xs text-content-muted leading-relaxed max-w-3xl">
              As part of our commitment to authentic agency practice, we only publish verified case study assets after campaigns have completed their pilot period and received client sign-off.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {UPCOMING_PORTFOLIO_PLACEHOLDERS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-surface-light border border-slate-200/70 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-navy-900 text-xs">{item.title}</h4>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-content-muted leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[10px] text-content-subtle font-medium">
                    Category: {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Statement Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white text-navy-950 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200/90 shadow-card-soft">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-sm sm:text-base text-navy-950">
                  Our Transparency & Data Verification Pledge
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  We refuse to inflate metrics with bot accounts or hypothetical growth statistics. All projects published by DigiBuddy4U represent genuine creative production and authenticated brand scopes.
                </p>
              </div>
            </div>

            <Button to="/contact" variant="yellow" size="sm" className="flex-shrink-0 font-bold">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
