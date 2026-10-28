import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import PortfolioCard from '../components/ui/PortfolioCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { PORTFOLIO_PROJECTS, UPCOMING_PORTFOLIO_PLACEHOLDERS } from '../utils/portfolioData';
import { api } from '../utils/api';

const CATEGORIES = ['All', 'Food & Hospitality', 'E-Commerce', 'B2B & Corporate'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState(PORTFOLIO_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    async function loadPortfolio() {
      try {
        const res = await api.get('/portfolio');
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const published = res.data
            .filter((p) => p.isPublished !== false)
            .map((p) => ({
              ...p,
              id: p.slug || p._id,
            }));
          if (published.length > 0) {
            setProjects(published);
          }
        }
      } catch {
        // Fallback to static
      }
    }

    loadPortfolio();

    const handleFocus = () => loadPortfolio();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadPortfolio, 20000);

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
        title="Portfolio — Client Work & Brand Case Studies"
        description="Explore DigiBuddy4U's client projects, including our featured food brand campaign for RotiWala. Genuine creative work with zero fabricated metrics."
      />

      {/* Hero Banner */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Real Work for <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Real Brands.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take a look at our current creative campaigns, visual systems, and reel production frameworks. Built with complete integrity and zero fabricated metrics.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md font-bold'
                    : 'bg-surface-light text-slate-700 hover:text-navy-950 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container space-y-12 sm:space-y-16">
          {/* Active Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          {/* Scalable Pipeline / Upcoming Projects Section */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Agency Expansion
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-900 mt-1">
                  Upcoming Client Showcases in Pipeline
                </h3>
              </div>
              <Badge variant="yellow" size="sm">
                In Onboarding
              </Badge>
            </div>

            <p className="text-sm text-content-muted leading-relaxed max-w-3xl">
              As part of our commitment to authentic agency practice, we only publish verified case study assets after campaigns have completed their pilot period and received client sign-off. The following partnerships are currently active in production:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UPCOMING_PORTFOLIO_PLACEHOLDERS.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-surface-light border border-slate-200/70 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-navy-900 text-sm">{item.title}</h4>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-content-muted leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-content-subtle font-medium">
                    Category: {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Statement Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white text-navy-950 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200/90 shadow-card-soft">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-lg text-navy-950">
                  Our Transparency & Data Verification Pledge
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  We refuse to inflate metrics with bot accounts or hypothetical growth statistics. All case studies published by DigiBuddy4U represent genuine creative production and authenticated brand scopes.
                </p>
              </div>
            </div>

            <Button to="/contact" variant="yellow" size="md" className="flex-shrink-0 font-bold">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
