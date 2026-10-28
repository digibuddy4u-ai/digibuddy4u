import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Briefcase,
  FolderKanban,
  Clock,
  ArrowRight,
  TrendingUp,
  Settings,
  PlusCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  Users,
  Package,
  BarChart3,
} from 'lucide-react';
import { api } from '../api/client';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const res = await api.get('/dashboard/overview');
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading agency analytics..." size="lg" />;
  }

  const stats = data?.stats || {
    totalEnquiries: 0,
    newEnquiries: 0,
    inProgressEnquiries: 0,
    totalServices: 0,
    totalProjects: 0,
  };

  const recentEnquiries = data?.recentEnquiries || [];

  return (
    <div className="space-y-5">
      {/* Top Welcome Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-navy-950 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-navy-800 shadow-lg">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-navy-800 text-cyan-accent border border-cyan-accent/30">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
            <span>Digital Agency Control Deck</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-white">
            Welcome to DigiBuddy4U Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Monitor client inquiries, curate digital marketing services, update portfolio case studies, and configure website settings.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          <Link
            to="/leads"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent-yellow text-navy-950 font-bold text-xs hover:bg-accent-yellowHover transition-all shadow-sm"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads CRM</span>
          </Link>
          <Link
            to="/package-analytics"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-accent text-navy-950 font-bold text-xs hover:bg-cyan-accent/90 transition-all shadow-sm"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Package Telemetry</span>
          </Link>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
          >
            <Package className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Packages</span>
          </Link>
          <a
            href={import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit Website</span>
          </a>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          <strong>Notice:</strong> {error}
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inquiries"
          value={stats.totalEnquiries}
          icon={Inbox}
          color="blue"
          subtitle="All received leads"
        />
        <StatCard
          title="New Leads"
          value={stats.newEnquiries}
          icon={TrendingUp}
          color="emerald"
          subtitle="Requires attention"
        />
        <StatCard
          title="Active Services"
          value={stats.totalServices}
          icon={Briefcase}
          color="cyan"
          subtitle="Marketing offerings"
        />
        <StatCard
          title="Portfolio Items"
          value={stats.totalProjects}
          icon={FolderKanban}
          color="yellow"
          subtitle="RotiWala & pipeline"
        />
      </div>

      {/* Recent Enquiries & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Recent Enquiries Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-card-soft p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold font-heading text-navy-900">
                Recent Contact Inquiries
              </h2>
              <p className="text-xs text-content-muted">
                Latest messages received through the public contact form.
              </p>
            </div>
            <Link
              to="/enquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover"
            >
              <span>View All ({stats.totalEnquiries})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-content-muted space-y-2">
              <Inbox className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No customer inquiries recorded yet.</p>
              <p className="text-xs">Form submissions on your website will appear here in real-time.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-content-muted">
                    <th className="py-2.5 px-3">Lead</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-navy-900 text-xs">{enq.name}</div>
                        <div className="text-[11px] text-content-muted">{enq.email}</div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-xs text-navy-900">
                        {enq.service}
                      </td>
                      <td className="py-2.5 px-3">
                        <StatusBadge status={enq.status} />
                      </td>
                      <td className="py-2.5 px-3 text-xs text-content-muted whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Link
                          to={`/enquiries?view=${enq._id}`}
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Agency Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card-soft p-4 sm:p-5 space-y-3">
            <h3 className="text-base font-bold font-heading text-navy-900">
              Agency Quick Shortcuts
            </h3>

            <div className="space-y-2">
              <Link
                to="/leads"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-light hover:bg-slate-100 border border-slate-200/70 transition-colors text-xs sm:text-sm font-semibold text-navy-900"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Leads CRM & Prospects</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/packages"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-light hover:bg-slate-100 border border-slate-200/70 transition-colors text-xs sm:text-sm font-semibold text-navy-900"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-cyan-hover" />
                  <span>Packages & PDF Gating</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/package-analytics"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-light hover:bg-slate-100 border border-slate-200/70 transition-colors text-sm font-semibold text-navy-900"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-accent-yellowHover" />
                  <span>Funnel & Conversion Telemetry</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/services"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-light hover:bg-slate-100 border border-slate-200/70 transition-colors text-sm font-semibold text-navy-900"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Manage Services</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-light hover:bg-slate-100 border border-slate-200/70 transition-colors text-sm font-semibold text-navy-900"
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-slate-500" />
                  <span>Update Portfolio / RotiWala</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Seed / Connection card */}
          <div className="bg-navy-900 text-white rounded-3xl border border-navy-800 p-6 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-yellow">
              Database Seed Sync
            </span>
            <h4 className="text-sm font-bold">Initial Data Loaded</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Services, packages, FAQs, and the RotiWala showcase are seeded and ready for full CRUD management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
