import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  CheckCircle2,
  XCircle,
  Eye,
  Lock,
  Layers,
  ArrowUpDown,
  Search,
  Filter,
  LayoutGrid,
  List,
  Check,
  Video,
  Camera,
  Home,
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { API_BASE_URL } from '../api/client';

const EMPTY_PACKAGE = {
  name: '',
  slug: '',
  badge: '',
  monthlyPrice: 10000,
  priceDisplay: '₹10,000/month',
  alternativePriceWithoutAds: null,
  alternativePriceDisplay: '',
  optionalMetaAdsCost: 0,
  minimumCommitment: 'Minimum 3 months',
  platforms: ['Instagram', 'Facebook'],
  reelsCount: '4 reels/month',
  reelsDetails: '',
  postsCount: '10 posts/month',
  postsDetails: '',
  storiesCount: '12 stories/month',
  storiesDetails: '',
  shootsCount: 'Not included',
  shootsDetails: '',
  influencerReels: 'Not included',
  captionsAndHashtags: 'Captions and hashtags included',
  contentCalendar: 'Monthly calendar',
  postingAndScheduling: 'We schedule and post for you',
  competitorCaseStudy: '',
  metaAds: '',
  metaAdsCampaignsCount: 1,
  minSuggestedAdBudget: '₹5,000/month',
  commentsAndDMs: 'Not included',
  revisions: '2 per item',
  reporting: 'Monthly report',
  keyHighlights: [],
  fullInclusions: [],
  exclusions: [],
  clientRequirements: [],
  generalTerms: [],
  order: 1,
  isPublished: true,
  showOnHome: true,
  isFeatured: false,
  requiresLoginForDetails: true,
  requiresLoginForPdf: true,
};

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form field text helpers for array inputs
  const [textHighlights, setTextHighlights] = useState('');
  const [textInclusions, setTextInclusions] = useState('');
  const [textExclusions, setTextExclusions] = useState('');
  const [textRequirements, setTextRequirements] = useState('');
  const [textTerms, setTextTerms] = useState('');
  const [textPlatforms, setTextPlatforms] = useState('');

  const token = localStorage.getItem('digibuddy_admin_token');
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000';

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/packages/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPackages(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenCreate = () => {
    setEditingPkg({ ...EMPTY_PACKAGE });
    setTextHighlights('');
    setTextInclusions('');
    setTextExclusions('');
    setTextRequirements('');
    setTextTerms('');
    setTextPlatforms('Instagram, Facebook');
    setActiveTab('general');
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPkg({ ...pkg, showOnHome: pkg.showOnHome !== false });
    setTextHighlights((pkg.keyHighlights || []).join('\n'));
    setTextInclusions((pkg.fullInclusions || []).join('\n'));
    setTextExclusions((pkg.exclusions || []).join('\n'));
    setTextRequirements((pkg.clientRequirements || []).join('\n'));
    setTextTerms((pkg.generalTerms || []).join('\n'));
    setTextPlatforms((pkg.platforms || []).join(', '));
    setActiveTab('general');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...editingPkg,
        keyHighlights: textHighlights.split('\n').map((s) => s.trim()).filter(Boolean),
        fullInclusions: textInclusions.split('\n').map((s) => s.trim()).filter(Boolean),
        exclusions: textExclusions.split('\n').map((s) => s.trim()).filter(Boolean),
        clientRequirements: textRequirements.split('\n').map((s) => s.trim()).filter(Boolean),
        generalTerms: textTerms.split('\n').map((s) => s.trim()).filter(Boolean),
        platforms: textPlatforms.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const isEdit = !!editingPkg._id;
      const url = isEdit
        ? `${API_BASE_URL}/packages/admin/${editingPkg._id}`
        : `${API_BASE_URL}/packages/admin`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Save failed');

      setModalOpen(false);
      loadPackages();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmId(null);
        loadPackages();
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleToggleStatus = async (pkg, field) => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages/admin/${pkg._id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: !pkg[field] }),
      });
      const data = await res.json();
      if (data.success) {
        setPackages((prev) =>
          prev.map((p) => (p._id === pkg._id ? { ...p, [field]: !p[field] } : p))
        );
      }
    } catch (err) {
      alert('Failed to toggle status.');
    }
  };

  const handleDownloadPdf = async (slug, name) => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages/${slug}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DigiBuddy4U_${name}_Package.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Error downloading PDF.');
    }
  };

  const filtered = packages.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-heading font-black text-navy-900 tracking-tight">
              Official Packages & Pricing Plans
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              Synced with Website Frontend
            </span>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Manage the 5 official growth packages (Basic, Standard, Growth, Pro, Elite) with deliverables, shoot days, Meta Ads, and PDF gating.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Filter / Search Bar & View Mode Toggle */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search packages by name or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-content-muted font-bold">
            {packages.length} Official Packages
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-navy-900 shadow-xs'
                  : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-navy-900 shadow-xs'
                  : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content: Cards View OR Table View */}
      {loading ? (
        <div className="p-16 flex justify-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <LoadingSpinner text="Loading official packages catalog..." />
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center text-sm text-content-muted bg-white rounded-2xl border border-slate-200 shadow-xs">
          No packages found matching "{searchTerm}".
        </div>
      ) : viewMode === 'cards' ? (
        /* Cards Grid View matching the agency tiers */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => {
            const isFeatured = pkg.isFeatured || pkg.badge?.toLowerCase().includes('popular');

            return (
              <div
                key={pkg._id}
                className={`relative rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 shadow-card-soft hover:shadow-card-hover ${
                  isFeatured
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Badge & Order */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      #{pkg.order} Tier
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {pkg.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-navy-950 text-accent-yellow">
                          {pkg.badge}
                        </span>
                      )}
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-accent-yellow text-navy-950">
                          ★ Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Slug */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-heading font-black text-navy-900">
                      {pkg.name} Package
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      slug: /{pkg.slug}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="my-4 pt-3 border-t border-slate-100">
                    <div className="text-2xl sm:text-3xl font-heading font-black text-navy-900">
                      {pkg.priceDisplay}
                    </div>
                    {pkg.alternativePriceDisplay && (
                      <div className="text-xs font-bold text-primary mt-0.5">
                        {pkg.alternativePriceDisplay}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span>Commitment:</span>
                      <strong className="text-navy-900">{pkg.minimumCommitment || 'Monthly'}</strong>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Target Platforms
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(pkg.platforms || []).map((pl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700"
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Deliverables
                    </div>

                    <div className="flex items-start gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Reels:</strong> {pkg.reelsCount}</span>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Static / Carousels:</strong> {pkg.postsCount}</span>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Stories:</strong> {pkg.storiesCount}</span>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-cyan-hover mt-0.5 flex-shrink-0" />
                      <span><strong>Shoots:</strong> {pkg.shootsCount}</span>
                    </div>

                    {pkg.metaAds && (
                      <div className="flex items-start gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-accent-yellowHover mt-0.5 flex-shrink-0" />
                        <span><strong>Meta Ads:</strong> {pkg.metaAds}</span>
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Revisions:</strong> {pkg.revisions}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {/* Status Toggles */}
                  <div className="flex items-center justify-between gap-1.5 text-xs flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(pkg, 'showOnHome')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        pkg.showOnHome !== false
                          ? 'bg-blue-50 text-primary border-blue-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                      title="Click to toggle whether this package appears on Homepage"
                    >
                      <Home className="w-3 h-3" />
                      <span>{pkg.showOnHome !== false ? 'Home: Visible' : 'Home: Hidden'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(pkg, 'requiresLoginForDetails')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        pkg.requiresLoginForDetails
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{pkg.requiresLoginForDetails ? 'Login Gated' : 'Public Specs'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(pkg, 'isPublished')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        pkg.isPublished
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {pkg.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(pkg)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-navy-950 text-white hover:bg-primary font-bold text-xs transition-colors"
                      title="Edit Package Specifications"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(pkg.slug, pkg.name)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs transition-colors"
                      title="Download Generated Branded PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-accent-yellowHover" />
                      <span>PDF</span>
                    </button>

                    <a
                      href={`${websiteUrl}/packages/${pkg.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs transition-colors"
                      title="View Public Website Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 font-heading text-navy-900 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3.5">Order</th>
                  <th className="py-2.5 px-3.5">Package</th>
                  <th className="py-2.5 px-3.5">Monthly Retainer</th>
                  <th className="py-2.5 px-3.5">Commitment</th>
                  <th className="py-2.5 px-3.5">Platforms</th>
                  <th className="py-2.5 px-3.5">Home Show?</th>
                  <th className="py-2.5 px-3.5">Login Gated?</th>
                  <th className="py-2.5 px-3.5">Status</th>
                  <th className="py-2.5 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-3.5 font-bold text-slate-400 font-mono">
                      #{pkg.order}
                    </td>

                    <td className="py-2 px-3.5">
                      <div className="font-bold text-navy-900 text-xs sm:text-sm">{pkg.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-content-muted font-mono">/{pkg.slug}</span>
                        {pkg.badge && (
                          <span className="text-[9px] bg-slate-100 text-navy-900 px-1.5 py-0.5 rounded font-bold">
                            {pkg.badge}
                          </span>
                        )}
                        {pkg.isFeatured && (
                          <span className="text-[9px] bg-accent-yellow/20 text-navy-950 font-bold px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-2 px-3.5">
                      <strong className="text-navy-900 font-bold text-xs sm:text-sm">{pkg.priceDisplay}</strong>
                      {pkg.alternativePriceDisplay && (
                        <div className="text-[10px] text-primary">{pkg.alternativePriceDisplay}</div>
                      )}
                    </td>

                    <td className="py-2 px-3.5 text-content-muted text-xs">
                      {pkg.minimumCommitment || 'Monthly'}
                    </td>

                    <td className="py-2 px-3.5">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(pkg.platforms || []).map((pl, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-navy-900">
                            {pl}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Show on Home Toggle */}
                    <td className="py-2 px-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(pkg, 'showOnHome')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          pkg.showOnHome !== false
                            ? 'bg-blue-50 text-primary border border-blue-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                        title="Toggle visibility on Homepage Pricing Section"
                      >
                        <Home className="w-2.5 h-2.5" />
                        <span>{pkg.showOnHome !== false ? 'Yes' : 'No'}</span>
                      </button>
                    </td>

                    <td className="py-2 px-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(pkg, 'requiresLoginForDetails')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          pkg.requiresLoginForDetails
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                        title="Click to toggle login requirement"
                      >
                        <Lock className="w-3 h-3" />
                        <span>{pkg.requiresLoginForDetails ? 'Login Required' : 'Public'}</span>
                      </button>
                    </td>

                    <td className="py-2 px-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(pkg, 'isPublished')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pkg.isPublished
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {pkg.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-2 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(pkg.slug, pkg.name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Download Generated PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`${websiteUrl}/packages/${pkg.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                          title="Preview Public Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(pkg)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                          title="Edit Package"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(pkg._id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
          <div className="p-6 rounded-2xl bg-white max-w-sm w-full space-y-4 shadow-xl">
            <h4 className="font-heading font-bold text-navy-900 text-base">Delete Package?</h4>
            <p className="text-xs text-content-muted leading-relaxed">
              Are you sure you want to delete this package? This will permanently remove its public page and PDF download endpoint.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-bold text-content-muted hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Editor Modal */}
      {modalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="my-8 rounded-3xl bg-white max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                  {editingPkg._id ? `Edit ${editingPkg.name} Package` : 'Create New Package'}
                </h3>
                <span className="text-xs text-slate-400">
                  Update pricing, deliverables, shoot schedules, and PDF rules.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                ✕
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-heading font-bold overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'general'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-content-muted hover:text-navy-900'
                }`}
              >
                1. Pricing & General
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('deliverables')}
                className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'deliverables'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-content-muted hover:text-navy-900'
                }`}
              >
                2. Content & Shoots
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('strategy')}
                className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'strategy'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-content-muted hover:text-navy-900'
                }`}
              >
                3. Ads & Strategy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lists')}
                className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'lists'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-content-muted hover:text-navy-900'
                }`}
              >
                4. Inclusions / Terms Lists
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('access')}
                className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'access'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-content-muted hover:text-navy-900'
                }`}
              >
                5. Access & Gating
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* TAB 1: General Info */}
              {activeTab === 'general' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Package Name *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.name}
                        onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Growth"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Slug (URL identifier) *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.slug}
                        onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value.toLowerCase().trim() })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary font-mono"
                        placeholder="e.g. growth"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Monthly Price (INR) *</label>
                      <input
                        type="number"
                        required
                        value={editingPkg.monthlyPrice}
                        onChange={(e) =>
                          setEditingPkg({
                            ...editingPkg,
                            monthlyPrice: Number(e.target.value),
                            priceDisplay: `₹${Number(e.target.value).toLocaleString('en-IN')}/month`,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Price Display String *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.priceDisplay}
                        onChange={(e) => setEditingPkg({ ...editingPkg, priceDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="₹20,000/month"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={editingPkg.badge}
                        onChange={(e) => setEditingPkg({ ...editingPkg, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Most Popular"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">
                        Alternative Price Without Ads (Optional)
                      </label>
                      <input
                        type="number"
                        value={editingPkg.alternativePriceWithoutAds || ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          setEditingPkg({
                            ...editingPkg,
                            alternativePriceWithoutAds: val,
                            alternativePriceDisplay: val ? `₹${val.toLocaleString('en-IN')}/month without Meta ads` : '',
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="e.g. 15000"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Minimum Commitment</label>
                      <input
                        type="text"
                        value={editingPkg.minimumCommitment}
                        onChange={(e) => setEditingPkg({ ...editingPkg, minimumCommitment: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Minimum 3 months"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={editingPkg.order}
                        onChange={(e) => setEditingPkg({ ...editingPkg, order: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={editingPkg.isFeatured}
                        onChange={(e) => setEditingPkg({ ...editingPkg, isFeatured: e.target.checked })}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor="isFeatured" className="font-bold text-navy-900 cursor-pointer">
                        Mark as Featured / Most Popular
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Deliverables */}
              {activeTab === 'deliverables' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Platforms (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={textPlatforms}
                      onChange={(e) => setTextPlatforms(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      placeholder="Instagram, Facebook, YouTube Shorts"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Reels Count *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.reelsCount}
                        onChange={(e) => setEditingPkg({ ...editingPkg, reelsCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="8 reels/month"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Reels Specification Details</label>
                      <input
                        type="text"
                        value={editingPkg.reelsDetails}
                        onChange={(e) => setEditingPkg({ ...editingPkg, reelsDetails: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="3 shoot, 2 UGC, 2 AI, 1 educational"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Posts Count *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.postsCount}
                        onChange={(e) => setEditingPkg({ ...editingPkg, postsCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="12 posts/month"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Stories Count *</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.storiesCount}
                        onChange={(e) => setEditingPkg({ ...editingPkg, storiesCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="16 stories/month"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Shoots Count</label>
                      <input
                        type="text"
                        value={editingPkg.shootsCount}
                        onChange={(e) => setEditingPkg({ ...editingPkg, shootsCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="1 shoot day (up to 3-4 hours)"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Shoots Specification</label>
                      <input
                        type="text"
                        value={editingPkg.shootsDetails}
                        onChange={(e) => setEditingPkg({ ...editingPkg, shootsDetails: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="Inside Ahmedabad with lights, mic, gimbal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Influencer Reels (for Elite package)
                    </label>
                    <input
                      type="text"
                      value={editingPkg.influencerReels}
                      onChange={(e) => setEditingPkg({ ...editingPkg, influencerReels: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      placeholder="2 micro-influencer collaboration reels/month"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Strategy & Ads */}
              {activeTab === 'strategy' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">Meta Ads Terms & Scope</label>
                    <input
                      type="text"
                      value={editingPkg.metaAds}
                      onChange={(e) => setEditingPkg({ ...editingPkg, metaAds: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      placeholder="2 active campaigns included (leads/reach)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Suggested Ad Budget (Direct to Meta)</label>
                      <input
                        type="text"
                        value={editingPkg.minSuggestedAdBudget}
                        onChange={(e) => setEditingPkg({ ...editingPkg, minSuggestedAdBudget: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="₹10,000/month"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Comments & DM Handling</label>
                      <input
                        type="text"
                        value={editingPkg.commentsAndDMs}
                        onChange={(e) => setEditingPkg({ ...editingPkg, commentsAndDMs: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="Replies on weekdays. Simple answers only."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">Competitor / Market Analysis Scope</label>
                    <input
                      type="text"
                      value={editingPkg.competitorCaseStudy}
                      onChange={(e) => setEditingPkg({ ...editingPkg, competitorCaseStudy: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                      placeholder="5-6 page Market Position Case Study"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Revisions Limit</label>
                      <input
                        type="text"
                        value={editingPkg.revisions}
                        onChange={(e) => setEditingPkg({ ...editingPkg, revisions: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="2 per item"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy-900 mb-1">Reporting & Updates</label>
                      <input
                        type="text"
                        value={editingPkg.reporting}
                        onChange={(e) => setEditingPkg({ ...editingPkg, reporting: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                        placeholder="Monthly report with content & ad results"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Lists & Operating Terms */}
              {activeTab === 'lists' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Key Highlights (1 per line — Shown on public overview cards)
                    </label>
                    <textarea
                      rows={4}
                      value={textHighlights}
                      onChange={(e) => setTextHighlights(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-800 mb-1">
                      Everything Included (1 per line — Shown in detailed view & PDF)
                    </label>
                    <textarea
                      rows={5}
                      value={textInclusions}
                      onChange={(e) => setTextInclusions(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/20 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-rose-800 mb-1">
                      Exclusions / Not Included (1 per line — Shown in detailed view & PDF)
                    </label>
                    <textarea
                      rows={4}
                      value={textExclusions}
                      onChange={(e) => setTextExclusions(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/20 text-xs focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-primary mb-1">
                      What We Need From You / Client Responsibilities (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      value={textRequirements}
                      onChange={(e) => setTextRequirements(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-blue-50/20 text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      General Operating Terms (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      value={textTerms}
                      onChange={(e) => setTextTerms(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Access & Gating Controls */}
              {activeTab === 'access' && (
                <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="requiresLoginForDetails"
                      checked={editingPkg.requiresLoginForDetails}
                      onChange={(e) =>
                        setEditingPkg({ ...editingPkg, requiresLoginForDetails: e.target.checked })
                      }
                      className="rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <div>
                      <label htmlFor="requiresLoginForDetails" className="font-bold text-navy-900 cursor-pointer">
                        Require Customer Login to View Full Specification
                      </label>
                      <p className="text-content-muted text-[11px] mt-0.5">
                        If enabled, unauthenticated visitors will see public highlights and be prompted to sign up or log in to view the complete details page.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="requiresLoginForPdf"
                      checked={editingPkg.requiresLoginForPdf}
                      onChange={(e) =>
                        setEditingPkg({ ...editingPkg, requiresLoginForPdf: e.target.checked })
                      }
                      className="rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <div>
                      <label htmlFor="requiresLoginForPdf" className="font-bold text-navy-900 cursor-pointer">
                        Require Customer Login to Download Individual Package PDF
                      </label>
                      <p className="text-content-muted text-[11px] mt-0.5">
                        Forces visitors to authenticate before downloading the branded PDF specification, recording lead intent.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-slate-200">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={editingPkg.isPublished}
                      onChange={(e) =>
                        setEditingPkg({ ...editingPkg, isPublished: e.target.checked })
                      }
                      className="rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <div>
                      <label htmlFor="isPublished" className="font-bold text-navy-900 cursor-pointer">
                        Publish on Live Website
                      </label>
                      <p className="text-content-muted text-[11px] mt-0.5">
                        When unchecked, the package is saved as an internal draft and hidden from public visitors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="showOnHome"
                      checked={editingPkg.showOnHome !== false}
                      onChange={(e) =>
                        setEditingPkg({ ...editingPkg, showOnHome: e.target.checked })
                      }
                      className="rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <div>
                      <label htmlFor="showOnHome" className="font-bold text-navy-900 cursor-pointer">
                        Show on Homepage Pricing Section
                      </label>
                      <p className="text-content-muted text-[11px] mt-0.5">
                        When enabled, this package is displayed directly on the front-facing homepage packages grid.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-content-muted hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-heading font-bold bg-primary hover:bg-primary-hover text-white rounded-xl shadow-xs"
                >
                  {saving ? 'Saving...' : editingPkg._id ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
