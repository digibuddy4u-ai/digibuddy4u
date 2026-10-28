import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  PlusCircle,
  X,
  AlertCircle,
  Star,
} from 'lucide-react';
import { api } from '../api/client';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    tagline: '',
    category: 'Food & Hospitality',
    overview: '',
    scope: [''],
    challenges: [''],
    strategy: [''],
    status: 'Active Client Engagement',
    isMetricsPending: true,
    metricsNotice: 'Authentic performance metrics and verified client testimonials will be published once the current campaign cycle completes client review. DigiBuddy4U strictly avoids fabricated statistics.',
    isFeatured: false,
    isPublished: true,
    order: 0,
  });

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/portfolio/admin/all');
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch portfolio projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      client: '',
      tagline: '',
      category: 'Food & Hospitality',
      overview: '',
      scope: [''],
      challenges: [''],
      strategy: [''],
      status: 'Active Client Engagement',
      isMetricsPending: true,
      metricsNotice: 'Authentic performance metrics will be published following campaign review. No fabricated metrics.',
      isFeatured: false,
      isPublished: true,
      order: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      client: project.client,
      tagline: project.tagline || '',
      category: project.category || 'Food & Hospitality',
      overview: project.overview || '',
      scope: project.scope?.length ? [...project.scope] : [''],
      challenges: project.challenges?.length ? [...project.challenges] : [''],
      strategy: project.strategy?.length ? [...project.strategy] : [''],
      status: project.status || 'Active Client Engagement',
      isMetricsPending: project.isMetricsPending,
      metricsNotice: project.metricsNotice || '',
      isFeatured: project.isFeatured,
      isPublished: project.isPublished,
      order: project.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        scope: formData.scope.map((s) => s.trim()).filter(Boolean),
        challenges: formData.challenges.map((s) => s.trim()).filter(Boolean),
        strategy: formData.strategy.map((s) => s.trim()).filter(Boolean),
      };

      if (editingProject) {
        const res = await api.put(`/portfolio/${editingProject._id}`, payload);
        if (res.success) {
          setProjects((prev) =>
            prev.map((p) => (p._id === editingProject._id ? res.data : p))
          );
        }
      } else {
        const res = await api.post('/portfolio', payload);
        if (res.success) {
          setProjects((prev) => [res.data, ...prev]);
        }
      }

      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await api.delete(`/portfolio/${deleteId}`);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== deleteId));
        setDeleteModalOpen(false);
        setDeleteId(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Portfolio & Client Work
          </h1>
          <p className="text-sm text-content-muted mt-1">
            Manage showcase projects such as RotiWala with verified scope and transparent data notices.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Project</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Loading portfolio..." />
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-content-muted space-y-2">
            <FolderKanban className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-navy-900 text-base">No portfolio projects yet</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-light border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-content-muted">
                  <tr>
                    <th className="py-2.5 px-3.5">Client</th>
                    <th className="py-2.5 px-3.5">Project Title</th>
                    <th className="py-2.5 px-3.5">Category</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.slice((page - 1) * pageSize, page * pageSize).map((proj) => (
                    <tr key={proj._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3.5">
                        <div className="font-bold text-navy-900 flex items-center gap-2">
                          {proj.client}
                          {proj.isFeatured && (
                            <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow" />
                          )}
                        </div>
                        <div className="text-[11px] text-content-muted">{proj.slug}</div>
                      </td>
                      <td className="py-2 px-3.5">
                        <div className="font-semibold text-xs text-navy-900">{proj.title}</div>
                        <div className="text-[11px] text-content-muted line-clamp-1 max-w-sm">
                          {proj.overview}
                        </div>
                      </td>
                      <td className="py-2 px-3.5 text-xs font-medium text-navy-900">
                        {proj.category}
                      </td>
                      <td className="py-2 px-3.5">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-2 px-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(proj)}
                            className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteId(proj._id);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete"
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

            <Pagination
              currentPage={page}
              totalPages={Math.max(1, Math.ceil(projects.length / pageSize))}
              totalItems={projects.length}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPage(1);
              }}
              pageSizeOptions={[5, 8, 12, 20]}
            />
          </>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.client}` : 'New Portfolio Project'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Overview & Background *
            </label>
            <textarea
              rows={3}
              required
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Status Badge
              </label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Scope list */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-navy-900">
                Scope of Deliverables
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, scope: [...formData.scope, ''] })}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {formData.scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const list = [...formData.scope];
                      list[idx] = e.target.value;
                      setFormData({ ...formData, scope: list });
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                  {formData.scope.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          scope: formData.scope.filter((_, i) => i !== idx),
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

          {/* Metrics Notice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Data Transparency Notice
            </label>
            <input
              type="text"
              value={formData.metricsNotice}
              onChange={(e) => setFormData({ ...formData, metricsNotice: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-navy-900">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded text-primary focus:ring-primary w-4 h-4"
              />
              Featured Project
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-navy-900">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded text-primary focus:ring-primary w-4 h-4"
              />
              Published on Public Website
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Project"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-content-muted">
            Are you sure you want to delete this portfolio project?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
