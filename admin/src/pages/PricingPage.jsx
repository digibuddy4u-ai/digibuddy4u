import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit2, Trash2, Check, PlusCircle, X, Sparkles } from 'lucide-react';
import { api } from '../api/client';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function PricingPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    badge: '',
    description: '',
    monthlyPrice: 'Custom Plan',
    isRecommended: false,
    features: [''],
    ctaText: 'Get Started',
    ctaLink: '/contact',
    order: 0,
    isPublished: true,
  });

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/pricing/admin/all');
      if (res.success) {
        setPackages(res.data);
      }
    } catch (err) {
      alert(err.message || 'Failed to load pricing packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      badge: '',
      description: '',
      monthlyPrice: 'Custom Plan',
      isRecommended: false,
      features: [''],
      ctaText: 'Get Started',
      ctaLink: '/contact',
      order: packages.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingItem(pkg);
    setFormData({
      name: pkg.name,
      badge: pkg.badge || '',
      description: pkg.description,
      monthlyPrice: pkg.monthlyPrice || 'Custom Plan',
      isRecommended: pkg.isRecommended,
      features: pkg.features?.length ? [...pkg.features] : [''],
      ctaText: pkg.ctaText || 'Get Started',
      ctaLink: pkg.ctaLink || '/contact',
      order: pkg.order || 0,
      isPublished: pkg.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        features: formData.features.map((f) => f.trim()).filter(Boolean),
      };

      if (editingItem) {
        const res = await api.put(`/pricing/${editingItem._id}`, payload);
        if (res.success) {
          setPackages((prev) => prev.map((p) => (p._id === editingItem._id ? res.data : p)));
        }
      } else {
        const res = await api.post('/pricing', payload);
        if (res.success) {
          setPackages((prev) => [...prev, res.data]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save pricing package');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await api.delete(`/pricing/${deleteId}`);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => p._id !== deleteId));
        setDeleteModalOpen(false);
        setDeleteId(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete package');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Pricing Packages & Retainers
          </h1>
          <p className="text-sm text-content-muted mt-1">
            Configure monthly growth tiers, feature deliverables, and CTA routing.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3">
            <LoadingSpinner text="Loading packages..." />
          </div>
        ) : (
          packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`rounded-3xl p-6 bg-white border flex flex-col justify-between shadow-card-soft ${
                pkg.isRecommended ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                    {pkg.name}
                  </span>
                  {pkg.isRecommended && (
                    <span className="text-[11px] font-bold text-navy-950 bg-accent-yellow px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-heading text-navy-900">
                  {pkg.monthlyPrice}
                </h3>
                <p className="text-xs text-content-muted mt-2 min-h-[36px]">{pkg.description}</p>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900 block">
                    Features ({pkg.features?.length || 0}):
                  </span>
                  <ul className="space-y-1.5 text-xs text-content-dark">
                    {pkg.features?.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pkg)}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Tier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteId(pkg._id);
                    setDeleteModalOpen(true);
                  }}
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Package' : 'New Package'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Price Tag</label>
              <input
                type="text"
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Badge Text</label>
            <input
              type="text"
              placeholder="e.g. Most Popular"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Description *</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase text-navy-900">Features</label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
                className="text-xs font-bold text-primary inline-flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {formData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => {
                      const list = [...formData.features];
                      list[idx] = e.target.value;
                      setFormData({ ...formData, features: list });
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          features: formData.features.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isRecommended"
              checked={formData.isRecommended}
              onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked })}
              className="rounded text-primary w-4 h-4"
            />
            <label htmlFor="isRecommended" className="text-xs font-bold text-navy-900">
              Highlight as "Most Popular" / Recommended Tier
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover"
            >
              {isSaving ? 'Saving...' : 'Save Package'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Package"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-content-muted">Are you sure you want to delete this pricing package?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
