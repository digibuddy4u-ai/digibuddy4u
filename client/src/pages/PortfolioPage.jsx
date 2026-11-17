import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock } from 'lucide-react';
import SEO from '../components/common/SEO';
import PortfolioCard from '../components/ui/PortfolioCard';
import Button from '../components/common/Button';
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
    <div className="bg-[#F5F8FC] min-h-screen">
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

      {/* Hero Banner — Clean Minimal Corporate Surface */}
      <section className="bg-white text-[#071A38] py-8 sm:py-12 relative border-b border-[#E2E8F0]">
        <div className="site-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[#0866F5] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Verified Client Engagements</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-[#071A38]">
            Real Work for <span className="text-[#0866F5]">Real Brands.</span>
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Explore authentic creative deliverables, video reel production, and social media campaigns executed for our enterprise and business clients.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0866F5] text-white shadow-xs font-bold'
                    : 'bg-[#F5F8FC] text-[#64748B] hover:text-[#071A38] hover:bg-white border border-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid — Responsive 3-Col Desktop, 2-Col Tablet, 1-Col Mobile */}
      <section className="py-8 sm:py-10 bg-[#F5F8FC]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Pipeline & Corporate Transparency */}
      <section className="py-8 sm:py-10 bg-[#F5F8FC] border-t border-[#E2E8F0]">
        <div className="site-container space-y-6">
          {/* Scalable Pipeline / Upcoming Projects Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0866F5]">
                  Agency Expansion
                </span>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#071A38] mt-0.5">
                  Upcoming Client Showcases in Pipeline
                </h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFC629]/20 text-[#071A38] border border-[#FFC629]/40 self-start sm:self-auto">
                In Onboarding
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed max-w-3xl">
              As part of our commitment to authentic agency practice, we only publish verified case study assets after campaigns have completed their pilot period and received client sign-off.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {UPCOMING_PORTFOLIO_PLACEHOLDERS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#071A38] text-xs font-heading">{item.title}</h3>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[10px] text-[#64748B] font-medium">
                    Category: {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency Statement Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white text-[#071A38] flex flex-col md:flex-row items-center justify-between gap-4 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0866F5]/10 text-[#0866F5] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-sm sm:text-base text-[#071A38]">
                  Our Transparency & Data Verification Pledge
                </h4>
                <p className="text-xs text-[#64748B] max-w-xl">
                  We refuse to inflate metrics with bot accounts or hypothetical growth statistics. All projects published by DigiBuddy4U represent genuine creative production and authenticated brand scopes.
                </p>
              </div>
            </div>

            <Button to="/contact" variant="primary" size="sm" className="flex-shrink-0 font-bold bg-[#0866F5] hover:bg-[#0652C5] text-white">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
