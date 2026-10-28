import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Share2,
  TrendingUp,
  Palette,
  Video,
  Search,
  PenTool,
  Bot,
  Layout,
  Layers,
  Smartphone,
  Cpu,
  ShoppingBag,
  Wrench,
  Code2,
  Compass,
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { FALLBACK_SERVICES, FALLBACK_CATEGORIES } from '../utils/servicesCatalog';
import { BRAND } from '../utils/brandConstants';
import { api } from '../utils/api';

const ICON_MAP = {
  Share2,
  TrendingUp,
  Palette,
  Video,
  Search,
  PenTool,
  Bot,
  Layout,
  Layers,
  Smartphone,
  Cpu,
  ShoppingBag,
  Wrench,
  Code2,
  Compass,
};

function getServiceIcon(iconName, defaultIcon = Layers) {
  if (iconName && ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  return defaultIcon || Layers;
}

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  // Sync state with URL param
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  // Fetch live services and categories from backend
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [servRes, catRes] = await Promise.all([
          api.get('/services').catch(() => ({ success: false })),
          api.get('/categories').catch(() => ({ success: false })),
        ]);

        if (isMounted) {
          if (servRes.success && Array.isArray(servRes.data) && servRes.data.length > 0) {
            setServices(servRes.data);
          }
          if (catRes.success && Array.isArray(catRes.data) && catRes.data.length > 0) {
            setCategories(catRes.data);
          }
        }
      } catch (err) {
        // Fallback to static catalogue
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadData, 20000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  // Safe filter services
  const safeServices = Array.isArray(services) ? services : FALLBACK_SERVICES;
  const filteredServices = safeServices.filter((service) => {
    if (!service) return false;
    const matchesCategory =
      activeCategory === 'all' || service.categorySlug === activeCategory;
    const q = (searchQuery || '').trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      (service.title && service.title.toLowerCase().includes(q)) ||
      (service.shortDescription && service.shortDescription.toLowerCase().includes(q)) ||
      (Array.isArray(service.subServices) &&
        service.subServices.some((sub) => {
          const name = typeof sub === 'string' ? sub : sub?.name || '';
          return name.toLowerCase().includes(q);
        }));
    return matchesCategory && matchesSearch;
  });

  const safeCategories = Array.isArray(categories) ? categories : FALLBACK_CATEGORIES;
  const activeCategoryObj =
    activeCategory !== 'all'
      ? safeCategories.find((c) => c?.slug === activeCategory)
      : null;

  return (
    <>
      <SEO
        title="Services — Complete Digital Marketing & IT Catalogue | DigiBuddy4U"
        description="Explore DigiBuddy4U's complete catalogue of 14 dynamic services across Digital Marketing and IT Solutions: SMM, Meta Ads, Video Reels, Custom Web Apps, Mobile Apps, and ERP Systems."
        canonicalUrl="/services"
      />

      {/* Header Banner */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            Comprehensive Digital Marketing &{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">IT Services</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From viral organic reels and paid customer acquisition funnels to bespoke software and cloud web applications. Engineered for sustainable business growth.
          </p>

          {/* Search Bar */}
          <div className="mt-7 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services (e.g. reels, mobile app, ads, seo, ecommerce)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-light border border-slate-200 text-navy-950 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-navy-950"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <section className="py-10 sm:py-14 lg:py-16 bg-surface-light min-h-[50vh]">
        <div className="site-container">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-navy-950 text-white shadow-md'
                  : 'bg-white text-navy-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Services ({safeServices.length})
            </button>

            {safeCategories.map((cat) => {
              if (!cat || !cat.slug) return null;
              const count = safeServices.filter((s) => s?.categorySlug === cat.slug).length;
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug || cat._id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? cat.slug === 'digital-marketing'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-cyan-hover text-white shadow-md'
                      : 'bg-white text-navy-900 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Notice */}
          {activeCategory !== 'all' && activeCategoryObj && (
            <div className="mb-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Showing Category:
                </span>
                <h3 className="text-lg font-heading font-bold text-navy-900">
                  {activeCategoryObj.name || activeCategory}
                </h3>
                {activeCategoryObj.description && (
                  <p className="text-xs text-content-muted mt-0.5">
                    {activeCategoryObj.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className="text-xs font-bold text-primary hover:underline flex-shrink-0"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Services Grid */}
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading service catalogue..." />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-base text-content-muted">
                No services found matching "<strong>{searchQuery}</strong>".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                }}
                className="text-xs font-bold text-primary hover:underline"
              >
                Clear search and show all services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredServices.map((service, idx) => {
                const IconComponent = getServiceIcon(service.icon, Layers);
                const isMarketing = service.categorySlug === 'digital-marketing';
                const subServices = Array.isArray(service.subServices) ? service.subServices : [];

                return (
                  <div
                    key={service._id || service.slug || idx}
                    className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                            isMarketing
                              ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                              : 'bg-cyan-accent/20 text-cyan-hover group-hover:bg-cyan-hover group-hover:text-white'
                          }`}
                        >
                          {IconComponent ? (
                            <IconComponent className="w-6 h-6" />
                          ) : (
                            <Layers className="w-6 h-6" />
                          )}
                        </div>
                        <Badge variant={isMarketing ? 'blue' : 'cyan'} size="sm">
                          {service.categoryName || (isMarketing ? 'Marketing' : 'IT')}
                        </Badge>
                      </div>

                      {/* Title & Short Description */}
                      <div>
                        <h3 className="text-xl font-heading font-extrabold text-navy-900 group-hover:text-primary transition-colors">
                          <Link to={`/services/${service.slug}`}>{service.title}</Link>
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-content-muted leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Sub-services Preview List */}
                      {subServices.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-slate-100">
                          <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider flex items-center justify-between">
                            <span>Includes ({subServices.length}):</span>
                            <span className="text-primary text-[10px] font-semibold">
                              Available Modules
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {subServices.slice(0, 4).map((sub, sIdx) => {
                              const label = typeof sub === 'string' ? sub : (sub?.name || '');
                              if (!label) return null;
                              return (
                                <span
                                  key={sub?._id || sub?.slug || sIdx}
                                  className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60"
                                >
                                  {label}
                                </span>
                              );
                            })}
                            {subServices.length > 4 && (
                              <span className="text-[10px] font-semibold text-slate-400 self-center">
                                +{subServices.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View Full Service Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] text-content-muted font-mono">
                        #{service.order !== undefined ? service.order : idx + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Requirement CTA Banner */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-3xl bg-white text-navy-950 border border-slate-200/90 shadow-card-soft flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <Badge variant="blue" size="sm">
                Custom Multi-Service Engagements
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                Need a Blended Marketing + Tech Scope?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Many growing brands combine website development with performance ad funnels and reels production. We create bundled retainers with dedicated creative and technical leads.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
              <Button
                to="/contact"
                variant="yellow"
                size="lg"
                icon={ArrowRight}
                className="w-full sm:w-auto justify-center font-bold"
              >
                Let's Talk
              </Button>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm hover:bg-[#20ba59] transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
