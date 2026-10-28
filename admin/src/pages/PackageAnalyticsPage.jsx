import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  UserCheck,
  Sparkles,
  MessageSquare,
  Award,
  Layers,
  ArrowRight,
  Filter,
  Calendar,
  CheckCircle2,
  Users,
  Target,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { API_BASE_URL } from '../api/client';

const PACKAGE_NAMES = {
  basic: 'Basic Package (₹5,000/mo)',
  standard: 'Standard Package (₹7,500/mo)',
  growth: 'Growth Package (₹20,000/mo)',
  pro: 'Pro Package (₹30,000/mo)',
  elite: 'Elite Package (₹40,000/mo)',
};

export default function PackageAnalyticsPage() {
  const [range, setRange] = useState('30d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('digibuddy_admin_token');

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/analytics?range=${range}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        setError(json.message || 'Failed to fetch analytics.');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to analytics endpoint.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  const funnel = data?.funnel || {
    cardViews: 0,
    detailsClicks: 0,
    loginPrompts: 0,
    signups: 0,
    logins: 0,
    detailsViews: 0,
    pdfDownloads: 0,
    savedPackages: 0,
    enquiriesSubmitted: 0,
    totalLeads: 0,
    wonLeads: 0,
  };

  const conversions = data?.conversions || {
    viewToEnquiryRate: '0.0%',
    leadToWinRate: '0.0%',
  };

  const packageBreakdown = data?.packageBreakdown || [];
  const statusDist = data?.leadStatusDistribution || {};

  // Maximum value for funnel normalization
  const maxFunnelVal = Math.max(funnel.cardViews, funnel.detailsViews, 1);

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-heading font-black text-navy-900 tracking-tight">
              Package & Telemetry Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-accent/20 text-cyan-hover border border-cyan-accent/30">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Analyze client conversion funnels, gated spec engagement, PDF downloads, and package popularity.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Range Selector */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' },
              { id: 'all', label: 'All Time' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  range === tab.id
                    ? 'bg-navy-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchAnalytics}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-20 flex justify-center">
          <LoadingSpinner text="Computing package conversion funnel and metrics..." />
        </div>
      ) : error ? (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          <strong>Notice:</strong> {error}
        </div>
      ) : (
        <>
          {/* Top KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard
              title="Card Impressions"
              value={funnel.cardViews}
              icon={Eye}
              color="blue"
              subtitle="Homepage & Catalog views"
            />
            <StatCard
              title="Unlocked Specs Views"
              value={funnel.detailsViews}
              icon={Layers}
              color="cyan"
              subtitle="Full specification views"
            />
            <StatCard
              title="PDF Downloads"
              value={funnel.pdfDownloads}
              icon={Download}
              color="yellow"
              subtitle="Branded PDF downloads"
            />
            <StatCard
              title="Consultation Leads"
              value={funnel.enquiriesSubmitted}
              icon={MessageSquare}
              color="emerald"
              subtitle="Package enquiry submissions"
            />
            <StatCard
              title="View-to-Lead Rate"
              value={conversions.viewToEnquiryRate}
              icon={TrendingUp}
              color="purple"
              subtitle="Detail view → Enquiry %"
            />
            <StatCard
              title="Won Client Rate"
              value={conversions.leadToWinRate}
              icon={Award}
              color="emerald"
              subtitle="Leads converted to won"
            />
          </div>

          {/* Visual Conversion Funnel Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-navy-900">
                  Full Customer Journey & Conversion Funnel
                </h3>
                <p className="text-xs text-content-muted mt-0.5">
                  Chronological progression from public package browsing to customer sign-in and enquiry submission.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Total Funnel Conversions: <strong className="text-primary">{funnel.enquiriesSubmitted}</strong>
                </span>
              </div>
            </div>

            {/* Funnel Steps */}
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  label: 'Package Card Impressions',
                  count: funnel.cardViews,
                  desc: 'Visitors viewing package pricing cards on public website',
                  color: 'bg-primary',
                },
                {
                  step: 2,
                  label: 'Specifications Clicks',
                  count: funnel.detailsClicks,
                  desc: 'Visitors clicking "More Details" to view complete package deliverables',
                  color: 'bg-blue-500',
                },
                {
                  step: 3,
                  label: 'Authentication Prompts Shown',
                  count: funnel.loginPrompts,
                  desc: 'Login/Register modal shown to unlock gated package specs & PDF download',
                  color: 'bg-indigo-500',
                },
                {
                  step: 4,
                  label: 'Customer Registrations & Logins',
                  count: (funnel.signups || 0) + (funnel.logins || 0),
                  desc: `${funnel.signups || 0} registered new accounts + ${funnel.logins || 0} logged in`,
                  color: 'bg-cyan-500',
                },
                {
                  step: 5,
                  label: 'Unlocked Deep-Dive Spec Views',
                  count: funnel.detailsViews,
                  desc: 'Authenticated clients viewing detailed deliverables, shooting limits & terms',
                  color: 'bg-teal-500',
                },
                {
                  step: 6,
                  label: 'Branded Package PDF Downloads',
                  count: funnel.pdfDownloads,
                  desc: 'Vector DigiBuddy4U package PDF downloaded with full terms & rhythm',
                  color: 'bg-accent-yellow',
                },
                {
                  step: 7,
                  label: 'Direct Consultation Enquiries',
                  count: funnel.enquiriesSubmitted,
                  desc: 'High-intent enquiry form submitted with project details',
                  color: 'bg-emerald-500',
                },
                {
                  step: 8,
                  label: 'Won Deals / Retainers Closed',
                  count: funnel.wonLeads,
                  desc: 'Clients marked as "Won" in CRM pipeline',
                  color: 'bg-emerald-600',
                },
              ].map((stage) => {
                const percentage =
                  maxFunnelVal > 0 ? Math.min(100, Math.round((stage.count / maxFunnelVal) * 100)) : 0;

                return (
                  <div key={stage.step} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-navy-950 text-white font-bold text-[10px] flex items-center justify-center">
                          {stage.step}
                        </span>
                        <span className="font-bold text-navy-900">{stage.label}</span>
                        <span className="text-slate-400 hidden md:inline">• {stage.desc}</span>
                      </div>
                      <div className="font-heading font-black text-navy-900 text-sm">
                        {stage.count}{' '}
                        <span className="text-[10px] font-normal text-slate-400">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                        style={{ width: `${Math.max(percentage, stage.count > 0 ? 3 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Two-Column Grid: Package Breakdown & Lead Pipeline Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Package Comparison Table (2 Cols) */}
            <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-heading font-black text-navy-900">
                    Package Popularity & Engagement
                  </h3>
                  <p className="text-xs text-content-muted mt-0.5">
                    Individual engagement metrics across the 5 official DigiBuddy4U packages.
                  </p>
                </div>
                <Link
                  to="/packages"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Edit Packages</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {packageBreakdown.length === 0 ? (
                <div className="p-8 text-center text-xs text-content-muted bg-slate-50 rounded-2xl">
                  No package telemetry recorded in the selected date range.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold text-[11px] uppercase">
                        <th className="py-2 px-3">Package</th>
                        <th className="py-2 px-3 text-center">Card Views</th>
                        <th className="py-2 px-3 text-center">Specs Views</th>
                        <th className="py-2 px-3 text-center">PDF Downloads</th>
                        <th className="py-2 px-3 text-center">Shortlists</th>
                        <th className="py-2 px-3 text-center">Enquiries</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {packageBreakdown.map((pkg) => (
                        <tr key={pkg.slug} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-3">
                            <div className="font-bold text-navy-900 capitalize text-xs">
                              {PACKAGE_NAMES[pkg.slug] || pkg.slug}
                            </div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                              Slug: {pkg.slug}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center font-semibold text-slate-700">
                            {pkg.cardViews}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-primary">
                            {pkg.detailsViews}
                          </td>
                          <td className="py-2 px-3 text-center font-semibold text-accent-yellowHover">
                            {pkg.pdfDownloads}
                          </td>
                          <td className="py-2 px-3 text-center font-semibold text-slate-700">
                            {pkg.savedCount}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {pkg.enquiries}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Lead Status Distribution (1 Col) */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-heading font-black text-navy-900">
                    CRM Pipeline Health
                  </h3>
                  <p className="text-xs text-content-muted mt-0.5">
                    Distribution of active leads across deal stages.
                  </p>
                </div>
                <Link
                  to="/leads"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Open CRM</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  'New',
                  'Interested',
                  'Contacted',
                  'Qualified',
                  'Proposal Sent',
                  'Negotiation',
                  'Won',
                  'Lost',
                  'Not Interested',
                ].map((st) => {
                  const count = statusDist[st] || 0;
                  const total = Object.values(statusDist).reduce((a, b) => a + b, 0);
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

                  return (
                    <div key={st} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{st}</span>
                        <span className="font-bold text-navy-900">
                          {count}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({pct}%)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            st === 'Won'
                              ? 'bg-emerald-500'
                              : st === 'Lost'
                              ? 'bg-red-400'
                              : 'bg-primary'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
