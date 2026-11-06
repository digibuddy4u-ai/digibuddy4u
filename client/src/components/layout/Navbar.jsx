import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  TrendingUp,
  Code2,
  Share2,
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
  Sparkles,
  User,
  FileText,
  Briefcase,
  Home,
  Target,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedInIcon } from '../common/SocialIcons';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { BRAND, NAV_LINKS } from '../../utils/brandConstants';
import { FALLBACK_SERVICES } from '../../utils/servicesCatalog';
import { api } from '../../utils/api';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useAddonCart } from '../../context/AddonCartContext';

// Icon Map helper for services
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
  FileText,
  Briefcase,
};

function getServiceIcon(iconName, defaultIcon = Layers) {
  return ICON_MAP[iconName] || defaultIcon;
}

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [activeCategoryView, setActiveCategoryView] = useState(null); // null | 'digital-marketing' | 'it-services'
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null); // null | 'digital-marketing' | 'it-services'
  const [servicesData, setServicesData] = useState([]);

  const servicesTimeoutRef = useRef(null);
  const workTimeoutRef = useRef(null);
  const location = useLocation();
  const { customer, isAuthenticated, promptLogin } = useCustomerAuth();
  const { totalCount, openDrawer } = useAddonCart();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesDropdownOpen(false);
    setWorkDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileWorkOpen(false);
    setActiveCategoryView(null);
    setMobileCategoryOpen(null);
  }, [location.pathname]);

  // Track scroll position for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch live services overview with fallback and auto-sync on focus
  useEffect(() => {
    let isMounted = true;
    async function fetchServices() {
      try {
        const res = await api.get('/services');
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServicesData(res.data);
        }
      } catch (err) {
        // Fallback silently
      }
    }

    fetchServices();

    const handleFocus = () => fetchServices();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(fetchServices, 25000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const activeServices = servicesData.length > 0 ? servicesData : FALLBACK_SERVICES;
  const digitalMarketingServices = activeServices
    .filter((s) => s.categorySlug === 'digital-marketing')
    .slice(0, 7);
  const itServices = activeServices
    .filter((s) => s.categorySlug === 'it-services')
    .slice(0, 7);

  // Desktop hover handlers with safety delays to avoid flickers
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    setWorkDropdownOpen(false);
    setServicesDropdownOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      setActiveCategoryView(null);
    }, 220);
  };

  const handleWorkEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(false);
    setWorkDropdownOpen(true);
  };

  const handleWorkLeave = () => {
    workTimeoutRef.current = setTimeout(() => {
      setWorkDropdownOpen(false);
    }, 180);
  };

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setWorkDropdownOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to determine if a route is active
  const isRouteActive = (path, dropdownType) => {
    if (dropdownType === 'services') {
      return location.pathname.startsWith('/services') || servicesDropdownOpen;
    }
    if (dropdownType === 'work') {
      return (
        location.pathname.startsWith('/portfolio') ||
        location.pathname.startsWith('/case-studies') ||
        workDropdownOpen
      );
    }
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Icon mapping for top pill nav
  const getNavIcon = (name, dropdownType, isActive) => {
    if (name === 'Home') return <Home className={`w-3.5 h-3.5 ${isActive ? 'fill-current' : ''}`} />;
    if (dropdownType === 'services') return <Target className="w-3.5 h-3.5" />;
    if (name === 'Packages') return <Calendar className="w-3.5 h-3.5" />;
    if (dropdownType === 'work') return <CheckCircle2 className="w-3.5 h-3.5" />;
    if (name === 'About Us') return <Sparkles className="w-3.5 h-3.5" />;
    if (name === 'Contact Us') return <Phone className="w-3.5 h-3.5" />;
    return null;
  };

  return (
    <>
      {/* ========================================================
          1. FLOATING CAPSULE / PILL TOP NAVBAR (DESKTOP & MOBILE)
         ======================================================== */}
      <header
        className={`sticky top-2.5 sm:top-4 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300`}
        aria-label="Site Header"
      >
        <div className="site-container-fluid pointer-events-auto relative">
          <div
            className={`max-w-[1360px] mx-auto rounded-full transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4 ${
              isScrolled
                ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.1)] py-2 px-3 sm:px-5 ring-1 ring-black/5'
                : 'bg-white/90 backdrop-blur-lg border border-slate-200/70 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] py-2 sm:py-2.5 px-3.5 sm:px-5 ring-1 ring-black/5'
            }`}
          >
            {/* Left: Brand Logo (Logo component internally renders <Link to="/">) */}
            <div className="flex items-center pl-1">
              <Logo variant="dark" showTagline={false} size="sm" />
            </div>

            {/* Center: Desktop Navigation Dock (Pill Capsule with Active Oval Highlight) */}
            <nav
              className="hidden lg:flex items-center p-1 rounded-full bg-slate-100/70 border border-slate-200/60 shadow-inner gap-1"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const active = isRouteActive(link.path, link.dropdownType);

                // 1. SERVICES DROPDOWN (Mega-Menu)
                if (link.dropdownType === 'services') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="true"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 ${
                          active
                            ? 'bg-navy-950 text-white shadow-sm'
                            : 'text-slate-700 hover:text-navy-950 hover:bg-white/80'
                        }`}
                      >
                        {getNavIcon(link.name, link.dropdownType, active)}
                        <span>Services</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            servicesDropdownOpen ? 'rotate-180' : active ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Minimal, Normal, Small Services Dropdown (Only 2 Items) */}
                      {servicesDropdownOpen && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          role="menu"
                          onMouseEnter={() => {
                            if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                          }}
                        >
                          <div className="relative flex items-start">
                            {/* Primary Small Menu: Only 2 Normal Clean Items */}
                            <div className="w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 space-y-1 text-navy-950">
                              {/* 1. Digital Marketing */}
                              <div
                                onMouseEnter={() => setActiveCategoryView('digital-marketing')}
                              >
                                <Link
                                  to="/services?category=digital-marketing"
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                    activeCategoryView === 'digital-marketing'
                                      ? 'bg-primary text-white shadow-xs'
                                      : 'text-navy-950 hover:bg-slate-100 hover:text-primary'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Digital Marketing</span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                                </Link>
                              </div>

                              {/* 2. IT Services */}
                              <div
                                onMouseEnter={() => setActiveCategoryView('it-services')}
                              >
                                <Link
                                  to="/services?category=it-services"
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                    activeCategoryView === 'it-services'
                                      ? 'bg-primary text-white shadow-xs'
                                      : 'text-navy-950 hover:bg-slate-100 hover:text-primary'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <Code2 className="w-4 h-4" />
                                    <span>IT Services</span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                                </Link>
                              </div>
                            </div>

                            {/* Flyout Submenu: Appears cleanly on hover next to the selected category */}
                            {activeCategoryView && (
                              <div
                                className="ml-1.5 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-1.5 space-y-0.5 animate-in fade-in slide-in-from-left-1 duration-150 text-navy-950"
                                onMouseEnter={() => {
                                  if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                                }}
                              >
                                {(activeCategoryView === 'digital-marketing'
                                  ? digitalMarketingServices
                                  : itServices
                                ).map((service) => {
                                  const IconComponent = getServiceIcon(
                                    service.icon,
                                    activeCategoryView === 'digital-marketing' ? TrendingUp : Code2
                                  );
                                  return (
                                    <Link
                                      key={service.slug}
                                      to={`/services/${service.slug}`}
                                      onClick={() => {
                                        setServicesDropdownOpen(false);
                                        setActiveCategoryView(null);
                                      }}
                                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-navy-900 hover:bg-slate-100 hover:text-primary transition-colors group"
                                    >
                                      <IconComponent className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary flex-shrink-0 transition-colors" />
                                      <span className="truncate">{service.title}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // 2. OUR WORK DROPDOWN (Portfolio & Case Studies)
                if (link.dropdownType === 'work') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={handleWorkEnter}
                      onMouseLeave={handleWorkLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                        aria-expanded={workDropdownOpen}
                        aria-haspopup="true"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 ${
                          active
                            ? 'bg-navy-950 text-white shadow-sm'
                            : 'text-slate-700 hover:text-navy-950 hover:bg-white/80'
                        }`}
                      >
                        {getNavIcon(link.name, link.dropdownType, active)}
                        <span>Our Work</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            workDropdownOpen ? 'rotate-180' : active ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {workDropdownOpen && (
                        <div
                          className="absolute left-0 top-full pt-2.5 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          role="menu"
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/90 p-2.5 ring-1 ring-black/5 space-y-1 text-navy-900">
                            <Link
                              to="/portfolio"
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                              role="menuitem"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Layers className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-navy-900 group-hover:text-primary transition-colors flex items-center justify-between">
                                  <span>Portfolio</span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-[11px] text-content-muted leading-tight mt-0.5">
                                  Explore client projects, campaigns & creative deliverables
                                </div>
                              </div>
                            </Link>

                            <Link
                              to="/case-studies/rotiwala"
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                              role="menuitem"
                            >
                              <div className="w-8 h-8 rounded-lg bg-accent-yellow/20 text-navy-950 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-yellow transition-colors">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-navy-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                                  <span>Case Studies</span>
                                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-accent-yellow/30 text-navy-900 rounded">
                                    RotiWala
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                                </div>
                                <div className="text-[11px] text-content-muted leading-tight mt-0.5">
                                  In-depth strategic breakdown of execution & results
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // 3. STANDARD NAVBAR LINKS (Home, About Us, Packages, Contact Us)
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-navy-950 text-white shadow-sm'
                          : 'text-slate-700 hover:text-navy-950 hover:bg-white/80'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {getNavIcon(link.name, link.dropdownType, isActive)}
                        <span>{link.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Actions (WhatsApp Button — Login removed as requested) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {totalCount > 0 && (
                <button
                  type="button"
                  onClick={openDrawer}
                  className="relative p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all flex items-center justify-center animate-in fade-in"
                  title="View Shortlisted Add-Ons"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-yellow text-navy-950 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                </button>
              )}

              {isAuthenticated && (
                <Link
                  to="/customer/dashboard"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-950 font-heading font-bold text-xs transition-colors border border-slate-200 shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>{customer?.name?.split(' ')[0] || 'My Portal'}</span>
                </Link>
              )}

              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 shadow-md hover:shadow-lg transition-all active:scale-95 hover:scale-105"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Top Controls (WhatsApp & Menu) */}
            <div className="flex items-center gap-2 lg:hidden">
              {totalCount > 0 && (
                <button
                  type="button"
                  onClick={openDrawer}
                  className="relative p-2 rounded-full bg-primary/10 text-primary transition-all flex items-center justify-center"
                  title="View Shortlisted Add-Ons"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-yellow text-navy-950 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                </button>
              )}

              {isAuthenticated && (
                <Link
                  to="/customer/dashboard"
                  className="p-2 rounded-full bg-slate-100 text-primary font-bold text-xs border border-slate-200"
                  title="My Portal"
                >
                  <User className="w-4 h-4" />
                </Link>
              )}

              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] px-3.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-navy-900 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Top Dropdown Drawer (Floating Below the Top Capsule) */}
          {isOpen && (
            <div className="lg:hidden absolute top-[calc(100%+8px)] inset-x-0 mx-auto rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-2xl p-4 overflow-hidden animate-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto text-navy-900 ring-1 ring-black/5">
              <div className="space-y-1.5">
                {NAV_LINKS.map((link) => {
                  // Mobile Services Accordion
                  if (link.dropdownType === 'services') {
                    return (
                      <div key={link.name} className="border-b border-slate-100 pb-1.5">
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-navy-900 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span>Services</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {mobileServicesOpen && (
                          <div className="pl-2 pr-1 pt-1 pb-2 space-y-1.5">
                            {/* 1. Mobile Digital Marketing Accordion */}
                            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileCategoryOpen(
                                    mobileCategoryOpen === 'digital-marketing' ? null : 'digital-marketing'
                                  )
                                }
                                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-navy-950"
                              >
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4 text-primary" />
                                  <span>Digital Marketing</span>
                                </div>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    mobileCategoryOpen === 'digital-marketing' ? 'rotate-180 text-primary' : 'text-slate-400'
                                  }`}
                                />
                              </button>

                              {mobileCategoryOpen === 'digital-marketing' && (
                                <div className="p-2 pt-0 space-y-0.5 border-t border-slate-100 bg-white">
                                  {digitalMarketingServices.map((service) => {
                                    const IconComp = getServiceIcon(service.icon, TrendingUp);
                                    return (
                                      <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-navy-900 hover:text-primary hover:bg-slate-50 rounded-lg"
                                      >
                                        <IconComp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                        <span className="truncate">{service.title}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* 2. Mobile IT Services Accordion */}
                            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileCategoryOpen(
                                    mobileCategoryOpen === 'it-services' ? null : 'it-services'
                                  )
                                }
                                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-navy-950"
                              >
                                <div className="flex items-center gap-2">
                                  <Code2 className="w-4 h-4 text-cyan-600" />
                                  <span>IT Services</span>
                                </div>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    mobileCategoryOpen === 'it-services' ? 'rotate-180 text-cyan-600' : 'text-slate-400'
                                  }`}
                                />
                              </button>

                              {mobileCategoryOpen === 'it-services' && (
                                <div className="p-2 pt-0 space-y-0.5 border-t border-slate-100 bg-white">
                                  {itServices.map((service) => {
                                    const IconComp = getServiceIcon(service.icon, Code2);
                                    return (
                                      <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-navy-900 hover:text-cyan-700 hover:bg-slate-50 rounded-lg"
                                      >
                                        <IconComp className="w-3.5 h-3.5 text-cyan-hover flex-shrink-0" />
                                        <span className="truncate">{service.title}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Mobile Our Work Accordion
                  if (link.dropdownType === 'work') {
                    return (
                      <div key={link.name} className="border-b border-slate-100 pb-1.5">
                        <button
                          type="button"
                          onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-navy-900 hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>Our Work</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileWorkOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {mobileWorkOpen && (
                          <div className="pl-3 pr-2 py-1 space-y-1">
                            <Link
                              to="/portfolio"
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-navy-900 hover:text-primary hover:bg-slate-50 rounded-lg"
                            >
                              <Layers className="w-4 h-4 text-primary" />
                              <span>Portfolio (All Projects)</span>
                            </Link>
                            <Link
                              to="/case-studies/rotiwala"
                              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-navy-900 hover:text-primary hover:bg-slate-50 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-accent-yellow" />
                                <span>Case Studies</span>
                              </div>
                              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 bg-accent-yellow/20 text-navy-900 rounded">
                                RotiWala
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Mobile Standard Links
                  const isStandardActive = isRouteActive(link.path);
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isStandardActive ? 'text-primary bg-primary/10' : 'text-navy-900 hover:bg-slate-50'
                      }`}
                    >
                      {getNavIcon(link.name, link.dropdownType, isStandardActive)}
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  {isAuthenticated ? (
                    <Link
                      to="/customer/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-950 font-heading font-bold text-xs shadow-xs transition-colors"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span>My Account Portal</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        promptLogin(null, 'Log in to access your package specifications.');
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-accent-yellow hover:bg-yellow-400 text-navy-950 font-heading font-bold text-xs shadow-xs transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                  )}

                  <div className="pt-1 flex flex-col gap-1.5 text-xs text-content-muted">
                    <a href={`mailto:${settings.email}`} className="flex items-center gap-2 py-0.5 hover:text-primary">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>{settings.email}</span>
                    </a>
                    <a href={`tel:${settings.phone}`} className="flex items-center gap-2 py-0.5 hover:text-primary">
                      <Phone className="w-3.5 h-3.5 text-accent-yellow" />
                      <span>{settings.phone}</span>
                    </a>
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-0.5 text-[#25D366] font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp ({settings.phone})</span>
                    </a>
                  </div>

                  {/* Mobile Social Links */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">Follow DigiBuddy4U:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={settings.socials?.instagram || BRAND.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:text-pink-600 flex items-center justify-center transition-colors"
                        title="Instagram"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={settings.socials?.facebook || BRAND.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:text-[#1877F2] flex items-center justify-center transition-colors"
                        title="Facebook"
                      >
                        <FacebookIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={settings.socials?.linkedin || BRAND.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:text-[#0A66C2] flex items-center justify-center transition-colors"
                        title="LinkedIn"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ========================================================
          2. FLOATING CAPSULE BOTTOM DOCK FOR MOBILE (EXACT SCREENSHOT MATCH)
          Direct recreation of the user's reference image!
         ======================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation Dock"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
          {/* 1. Home Tab (with filled capsule highlight when active) */}
          <Link
            to="/"
            title="Home"
            aria-label="Home"
            className={`transition-all duration-300 flex items-center justify-center ${
              location.pathname === '/'
                ? 'w-12 h-10 rounded-full bg-navy-950 text-white shadow-md'
                : 'w-11 h-10 rounded-full text-slate-500 hover:text-navy-950 hover:bg-slate-100/70'
            }`}
          >
            <Home className={`w-5 h-5 ${location.pathname === '/' ? 'fill-current' : ''}`} />
          </Link>

          {/* 2. Our Work Tab (Checkmark icon like reference) */}
          <Link
            to="/portfolio"
            title="Our Work"
            aria-label="Our Work"
            className={`transition-all duration-300 flex items-center justify-center ${
              location.pathname.startsWith('/portfolio') || location.pathname.startsWith('/case-studies')
                ? 'w-12 h-10 rounded-full bg-navy-950 text-white shadow-md'
                : 'w-11 h-10 rounded-full text-slate-500 hover:text-navy-950 hover:bg-slate-100/70'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
          </Link>

          {/* 3. Packages Tab (Calendar icon like reference) */}
          <Link
            to="/packages"
            title="Packages & Pricing"
            aria-label="Packages"
            className={`transition-all duration-300 flex items-center justify-center ${
              location.pathname.startsWith('/packages')
                ? 'w-12 h-10 rounded-full bg-navy-950 text-white shadow-md'
                : 'w-11 h-10 rounded-full text-slate-500 hover:text-navy-950 hover:bg-slate-100/70'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </Link>

          {/* 4. Services Tab (Target icon like reference) */}
          <Link
            to="/services"
            title="Services"
            aria-label="Services"
            className={`transition-all duration-300 flex items-center justify-center ${
              location.pathname.startsWith('/services')
                ? 'w-12 h-10 rounded-full bg-navy-950 text-white shadow-md'
                : 'w-11 h-10 rounded-full text-slate-500 hover:text-navy-950 hover:bg-slate-100/70'
            }`}
          >
            <Target className="w-5 h-5" />
          </Link>

          {/* 5. Contact Tab (Phone/WhatsApp) */}
          <Link
            to="/contact"
            title="Contact Us"
            aria-label="Contact"
            className={`transition-all duration-300 flex items-center justify-center ${
              location.pathname === '/contact'
                ? 'w-12 h-10 rounded-full bg-navy-950 text-white shadow-md'
                : 'w-11 h-10 rounded-full text-slate-500 hover:text-navy-950 hover:bg-slate-100/70'
            }`}
          >
            <Phone className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </>
  );
}
