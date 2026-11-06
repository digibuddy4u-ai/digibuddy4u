import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  LayoutGrid,
  List,
  Target,
  MapPin,
  TrendingUp,
  Globe,
  Layout,
  Code2,
  Camera,
  Smartphone,
  Video,
  Users,
  Palette,
  CreditCard,
  BookOpen,
  ShoppingBag,
  DollarSign,
  Package,
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { api } from '../api/client';

const ICON_COMPONENTS = {
  Target,
  Search,
  MapPin,
  TrendingUp,
  Globe,
  Layout,
  Code2,
  Camera,
  Smartphone,
  Video,
  Users,
  Palette,
  CreditCard,
  BookOpen,
  Sparkles,
};

const CATEGORIES = [
  'All',
  'Paid Advertising',
  'Video & Production',
  'Website & IT',
  'Branding & Identity',
  'Search Engine Optimization',
  'Local Growth & Maps',
];

const EMPTY_ADDON = {
  title: '',
  slug: '',
  category: 'Paid Advertising',
  shortDescription: '',
  priceDisplay: 'From ₹5,000 / month',
  startingPrice: 5000,
  badge: 'Add-On',
  iconName: 'Sparkles',
  deliverablesText: '',
  order: 1,
  isPublished: true,
  showOnHome: true,
};

export default function AddonsPage() {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000';

  const loadAddons = async () => {
    setLoading(true);
    try {
      const res = await api.get('/addons/admin/all');
      if (res.success && Array.isArray(res.data)) {
        setAddons(res.data);
      }
    } catch (err) {
      console.error('Failed to load add-ons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddons();
  }, []);

  const handleOpenAdd = () => {
    setEditingAddon({
      ...EMPTY_ADDON,
      order: addons.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingAddon({
      ...item,
      deliverablesText: Array.isArray(item.deliverables) ? item.deliverables.join('\n') : '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingAddon.title?.trim()) {
      alert('Title is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: editingAddon.title.trim(),
        slug:
          editingAddon.slug?.trim() ||
          editingAddon.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
        category: editingAddon.category,
        shortDescription: editingAddon.shortDescription,
        priceDisplay: editingAddon.priceDisplay,
        startingPrice: Number(editingAddon.startingPrice) || 0,
        badge: editingAddon.badge,
        iconName: editingAddon.iconName || 'Sparkles',
        deliverables: (editingAddon.deliverablesText || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        order: Number(editingAddon.order) || 1,
        isPublished: editingAddon.isPublished !== false,
        showOnHome: editingAddon.showOnHome !== false,
      };

      if (editingAddon._id) {
        await api.put(`/addons/admin/${editingAddon._id}`, payload);
      } else {
        await api.post('/addons/admin', payload);
      }

      setModalOpen(false);
      setEditingAddon(null);
      await loadAddons();
    } catch (err) {
      alert(err.message || 'Error saving add-on');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (item, field = 'isPublished') => {
    try {
      const newStatus = !item[field];
      const res = await api.patch(`/addons/admin/${item._id}/status`, {
        [field]: newStatus,
      });

      if (res.success) {
        setAddons((prev) =>
          prev.map((a) => (a._id === item._id ? { ...a, [field]: newStatus } : a))
        );
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/addons/admin/${id}`);
      setDeleteConfirmId(null);
      await loadAddons();
    } catch (err) {
      alert('Failed to delete add-on.');
    }
  };

  const filteredAddons = addons.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const publishedCount = addons.filter((a) => a.isPublished).length;
  const draftCount = addons.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-heading font-black text-navy-900 tracking-tight">
              A La Carte Add-Ons & Extra Services
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              {addons.length} Active Services
            </span>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Manage all 15 on-demand extra services, starting prices, 2-line deliverables, and instant shortlist/cart availability.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href={`${websiteUrl}/packages#addons`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-heading font-bold text-xs transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <span>Preview on Website</span>
          </a>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Add-On</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation Switcher between Packages and Add-Ons */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Link
          to="/packages"
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>Monthly Packages (5)</span>
        </Link>
        <Link
          to="/addons"
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-xs flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Add-Ons & Extras ({addons.length})</span>
        </Link>
        <Link
          to="/package-analytics"
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
        >
          Analytics & Logs
        </Link>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Catalog
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-black text-navy-900 mt-1">
            {addons.length}
          </div>
          <span className="text-[11px] text-content-muted mt-0.5 block">15 official items</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
            Published Live
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-600 mt-1">
            {publishedCount}
          </div>
          <span className="text-[11px] text-content-muted mt-0.5 block">Visible on frontend</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
            Draft / Inactive
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-black text-amber-600 mt-1">
            {draftCount}
          </div>
          <span className="text-[11px] text-content-muted mt-0.5 block">Hidden from visitors</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
            Categories
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-black text-primary mt-1">
            {CATEGORIES.length - 1}
          </div>
          <span className="text-[11px] text-content-muted mt-0.5 block">Marketing, IT & Media</span>
        </div>
      </div>

      {/* Controls: Search, Category Filters, and View Toggle */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search add-ons by name, price, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-light"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-xl border transition-colors ${
                viewMode === 'cards'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl border transition-colors ${
                viewMode === 'table'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Add-Ons Grid or Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" text="Loading add-on catalog..." />
        </div>
      ) : filteredAddons.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-heading font-bold text-base text-navy-900">No add-ons found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or category filter, or click "Add New Add-On" to register an extra service.
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAddons.map((item) => {
            const Icon = ICON_COMPONENTS[item.iconName] || Sparkles;

            return (
              <div
                key={item._id}
                className={`p-5 rounded-3xl bg-white border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                  item.isPublished
                    ? 'border-slate-200/90'
                    : 'border-dashed border-slate-300 bg-slate-50/60 opacity-80'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon, Category & Status Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          {item.category}
                        </span>
                        <h3 className="font-heading font-extrabold text-base text-navy-900 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item, 'isPublished')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                        item.isPublished
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                      }`}
                      title="Click to toggle published status"
                    >
                      {item.isPublished ? '● Active' : '○ Draft'}
                    </button>
                  </div>

                  {/* 2-line Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  {/* Badge & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Starting At</span>
                      <span className="font-heading font-extrabold text-sm text-navy-900">
                        {item.priceDisplay}
                      </span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-primary/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Order: #{item.order}</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
                      title="Edit Add-On"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Add-On"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price Display</th>
                  <th className="py-3 px-4">Badge</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAddons.map((item) => {
                  const Icon = ICON_COMPONENTS[item.iconName] || Sparkles;

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">{item.order}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-heading font-bold text-navy-900 block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                              {item.shortDescription}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{item.category}</td>
                      <td className="py-3.5 px-4 font-heading font-bold text-navy-900">
                        {item.priceDisplay}
                      </td>
                      <td className="py-3.5 px-4">
                        {item.badge ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-primary/20">
                            {item.badge}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item, 'isPublished')}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                            item.isPublished
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {item.isPublished ? '● Active' : '○ Draft'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(item._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Add-On Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAddon?._id ? `Edit: ${editingAddon.title}` : 'Add New Add-On / Extra Service'}
        maxWidth="max-w-2xl"
      >
        {editingAddon && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingAddon.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingAddon((prev) => ({
                      ...prev,
                      title,
                      slug: prev._id
                        ? prev.slug
                        : title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, ''),
                    }));
                  }}
                  placeholder="e.g. Meta Ads, Corporate Videos Shoot On Camera..."
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Slug (URL Safe Identifier)
                </label>
                <input
                  type="text"
                  value={editingAddon.slug}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, slug: e.target.value.toLowerCase() }))
                  }
                  placeholder="e.g. meta-ads"
                  className="w-full px-3.5 py-2 rounded-xl text-sm font-mono border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={editingAddon.category}
                  onChange={(e) => setEditingAddon((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Price Display Label *
                </label>
                <input
                  type="text"
                  required
                  value={editingAddon.priceDisplay}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, priceDisplay: e.target.value }))
                  }
                  placeholder="e.g. From ₹5,000 / campaign or ₹3,000 one-time"
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Starting Price (Numeric for calculation) */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Numeric Starting Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={editingAddon.startingPrice || 0}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({
                      ...prev,
                      startingPrice: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Highlight Badge
                </label>
                <input
                  type="text"
                  value={editingAddon.badge || ''}
                  onChange={(e) => setEditingAddon((prev) => ({ ...prev, badge: e.target.value }))}
                  placeholder="e.g. High ROAS, Local SEO, Studio Quality..."
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Icon
                </label>
                <select
                  value={editingAddon.iconName || 'Sparkles'}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, iconName: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  {Object.keys(ICON_COMPONENTS).map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingAddon.order || 1}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, order: Number(e.target.value) || 1 }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* 2-line Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  2-Line Description (Deliverables / Outcome) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingAddon.shortDescription}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, shortDescription: e.target.value }))
                  }
                  placeholder="Concise 2-line explanation shown on the service card..."
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tip: Keep it 2 sentences highlighting the deliverable and client business benefit.
                </span>
              </div>

              {/* Deliverables (optional bullets) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Detailed Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingAddon.deliverablesText || ''}
                  onChange={(e) =>
                    setEditingAddon((prev) => ({ ...prev, deliverablesText: e.target.value }))
                  }
                  placeholder="Deliverable item 1&#10;Deliverable item 2&#10;Deliverable item 3"
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-xs"
                />
              </div>

              {/* Toggles */}
              <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAddon.isPublished}
                    onChange={(e) =>
                      setEditingAddon((prev) => ({ ...prev, isPublished: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-navy-900">
                    Publish Live (Visible on website)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAddon.showOnHome}
                    onChange={(e) =>
                      setEditingAddon((prev) => ({ ...prev, showOnHome: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-navy-900">
                    Show on Homepage Add-Ons Grid
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white transition-all shadow-sm disabled:opacity-60"
              >
                {saving ? 'Saving...' : editingAddon._id ? 'Update Add-On' : 'Create Add-On'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete this add-on service? It will no longer appear on the website or in the shortlist drawer.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDelete(deleteConfirmId)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-xs"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}