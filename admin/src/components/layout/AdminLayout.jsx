import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FolderKanban,
  BookOpen,
  Quote,
  HelpCircle,
  Settings,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Users,
  BarChart3,
  Sparkles,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Leads CRM', path: '/leads', icon: Users, permissionKey: 'leads' },
  { name: 'Packages & Pricing', path: '/packages', icon: Package, permissionKey: 'packages' },
  { name: 'Package Analytics', path: '/package-analytics', icon: BarChart3, permissionKey: 'packageAnalytics' },
  { name: 'Enquiries', path: '/enquiries', icon: Inbox, permissionKey: 'enquiries' },
  { name: 'Customer Accounts', path: '/customers', icon: UserCheck, permissionKey: 'customers' },
  { name: 'Services', path: '/services', icon: Briefcase, permissionKey: 'services' },
  { name: 'Portfolio', path: '/portfolio', icon: FolderKanban, permissionKey: 'portfolio' },
  { name: 'Case Studies', path: '/case-studies', icon: BookOpen, permissionKey: 'caseStudies' },
  { name: 'Testimonials', path: '/testimonials', icon: Quote, permissionKey: 'testimonials' },
  { name: 'FAQ Manager', path: '/faqs', icon: HelpCircle, permissionKey: 'faqs' },
  { name: 'Website Settings', path: '/settings', icon: Settings, permissionKey: 'settings' },
  { name: 'Team & RBAC', path: '/staff', icon: ShieldCheck, permissionKey: 'staff' },
  { name: 'My Profile', path: '/profile', icon: User },
];

const ROLE_LABELS = {
  superadmin: 'Superadmin',
  sales: 'Sales Executive',
  package_manager: 'Package Manager',
  services_manager: 'Services Manager',
  marketing: 'Marketing Specialist',
  custom: 'Custom Staff',
  admin: 'Administrator',
};

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('digibuddy_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Filter navigation items by role and permissions
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (!item.permissionKey) return true; // Dashboard & Profile always visible
    if (user?.role === 'superadmin') return true; // Superadmin has full access
    const perms = user?.permissions;
    if (!perms) return false;
    return !!perms[item.permissionKey]?.view;
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('digibuddy_admin_sidebar_collapsed', String(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const clientUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex text-content-dark">
      {/* ======================================================== */}
      {/* DESKTOP VIBRANT BLUE FLOATING CAPSULE SIDEBAR */}
      {/* ======================================================== */}
      <aside
        className={`hidden lg:flex flex-col fixed top-3 left-3 h-[calc(100vh-24px)] z-40 rounded-[32px] border border-white/20 shadow-[0_20px_60px_rgba(4,18,55,0.6)] backdrop-blur-2xl transition-all duration-300 ease-in-out text-white overflow-hidden ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        style={{
          backgroundColor: '#07214E',
          background: 'linear-gradient(180deg, #0D3E8C 0%, #08285D 45%, #051636 100%)',
        }}
      >
        {/* Ambient Brand Electric Blue Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#0866F5]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#18D5E8]/25 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header: Glowing Logo & Collapse/Expand Button */}
        <div className="p-3.5 pb-2 relative z-10 flex items-center justify-between border-b border-white/15">
          {collapsed ? (
            <div className="w-full flex flex-col items-center gap-2">
              <Link
                to="/"
                title="DigiBuddy4U Admin Console"
                className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 shadow-[0_0_18px_rgba(24,213,232,0.4)] flex items-center justify-center transition-transform hover:scale-105"
              >
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center font-heading font-black text-white text-xs">
                  D
                </div>
              </Link>
              <button
                type="button"
                onClick={toggleCollapsed}
                title="Expand Sidebar"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
                <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 shadow-[0_0_18px_rgba(24,213,232,0.4)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="font-heading font-black text-white text-base">D</span>
                </div>
                <div className="min-w-0 truncate">
                  <div className="font-heading font-black text-white text-sm tracking-tight truncate">
                    DigiBuddy<span className="text-[#18D5E8]">4U</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#18D5E8] block -mt-0.5">
                    Console
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={toggleCollapsed}
                title="Collapse Sidebar"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items List */}
        <nav
          className={`flex-1 py-3 space-y-1.5 overflow-y-auto sidebar-scroll relative z-10 ${
            collapsed ? 'px-2.5' : 'pl-3.5 pr-0'
          }`}
        >
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            // ========================================================
            // COLLAPSED STATE: Rounded Icon Pill (Left Side of Reference)
            // ========================================================
            if (collapsed) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`w-11 h-11 mx-auto rounded-full flex items-center justify-center transition-all duration-200 relative group border ${
                    isActive
                      ? 'bg-white text-[#0D3E8C] font-black shadow-lg shadow-black/40 scale-105 border-white'
                      : 'bg-white/10 hover:bg-white/25 text-white hover:text-white border-transparent hover:border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />

                  {/* Tooltip on Hover */}
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#05183B] text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-white/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              );
            }

            // ========================================================
            // EXPANDED STATE: Extruded Active Tab with Concave Cutout
            // (Right Side of Reference - Exactly as in User's Image)
            // ========================================================
            if (isActive) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-l-2xl rounded-r-none bg-white text-[#0D3E8C] font-black text-xs sm:text-sm mr-[-1px] shadow-lg shadow-black/30 z-20 group transition-all"
                >
                  {/* Top Concave Curved Fillet */}
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute -top-4 right-0 w-4 h-4 text-white fill-current pointer-events-none z-20"
                  >
                    <path d="M 0,16 A 16,16 0 0,0 16,0 L 16,16 Z" />
                  </svg>

                  <Icon className="w-4 h-4 flex-shrink-0 text-[#0D3E8C]" />
                  <span className="truncate text-[#0D3E8C] font-black">{item.name}</span>

                  {/* Bottom Concave Curved Fillet */}
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute -bottom-4 right-0 w-4 h-4 text-white fill-current pointer-events-none z-20"
                  >
                    <path d="M 0,0 A 16,16 0 0,1 16,16 L 16,0 Z" />
                  </svg>
                </NavLink>
              );
            }

            // Inactive Item (Solid White Font on Blue)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2.5 mr-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all duration-200 border border-white/5 hover:border-white/25 group"
              >
                <Icon className="w-4 h-4 flex-shrink-0 text-white/90 group-hover:text-white transition-colors" />
                <span className="truncate text-white font-semibold">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer: Live Website Link & User Profile */}
        <div className="p-3 border-t border-white/15 space-y-2 relative z-10">
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <a
                href={clientUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Website (:3000)"
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all group relative"
              >
                <ExternalLink className="w-4 h-4" />
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-[#05183B] text-white text-[11px] font-bold whitespace-nowrap shadow-xl border border-white/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  Live Website
                </div>
              </a>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="w-10 h-10 rounded-2xl bg-red-500/20 hover:bg-red-500/35 text-red-300 flex items-center justify-center transition-all group relative"
              >
                <LogOut className="w-4 h-4" />
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-[#05183B] text-red-300 text-[11px] font-bold whitespace-nowrap shadow-xl border border-white/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  Logout
                </div>
              </button>
            </div>
          ) : (
            <>
              <a
                href={clientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white hover:text-cyan-200 transition-all shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
                  <span className="text-white">Live Website</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-accent bg-black/25 px-1.5 py-0.5 rounded-md border border-white/15">
                  :3000
                </span>
              </a>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-accent-yellow font-black text-xs flex-shrink-0">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">
                      {user?.name || 'DigiBuddy Admin'}
                    </div>
                    <div className="text-[10px] text-cyan-200 font-semibold truncate">
                      {ROLE_LABELS[user?.role] || user?.role || 'Staff'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-xl text-white/80 hover:text-red-300 hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ======================================================== */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:pl-28' : 'lg:pl-72'
        }`}
      >
        {/* Top Navbar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-navy-900 lg:hidden hover:bg-slate-100"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-content-muted">
              <span className="font-bold text-navy-900">DigiBuddy4U Agency Control Center</span>
              <span>•</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                API Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>View Live Website</span>
            </a>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors text-right"
              >
                <div className="hidden md:block">
                  <div className="text-xs font-bold text-navy-900 leading-tight">{user?.name}</div>
                  <div className="text-[10px] text-content-muted">{user?.email}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-cyan-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              className="relative w-72 m-3 rounded-[32px] border border-white/20 text-white p-5 flex flex-col justify-between shadow-2xl z-10 backdrop-blur-2xl"
              style={{
                backgroundColor: '#07214E',
                background: 'linear-gradient(180deg, #0D3E8C 0%, #08285D 45%, #051636 100%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-heading font-black text-white text-sm">
                      D
                    </div>
                    <div className="font-heading font-black text-white text-base">
                      DigiBuddy<span className="text-cyan-accent">4U</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-xl text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="py-4 space-y-1.5 max-h-[60vh] overflow-y-auto sidebar-scroll">
                  {visibleNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path));
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
                          isActive
                            ? 'bg-white text-[#0B3374] font-black shadow-lg border-white'
                            : 'bg-white/[0.08] hover:bg-white/20 text-white border-transparent'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B3374]' : 'text-white/90'}`} />
                        <span
                          className={`truncate font-semibold ${
                            isActive ? 'text-[#0D3E8C] font-black' : 'text-white'
                          }`}
                        >
                          {item.name}
                        </span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <a
                  href={clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-cyan-accent"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Public Website</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 bg-[#F5F8FC]">
          <div className="w-full max-w-[1760px] mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
