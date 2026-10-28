import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../api/client';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'Food & Hospitality',
    subtitle: '',
    overview: '',
    status: 'Active Engagement',
    isPublished: true,
  });

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const loadCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await api.get('/case-studies/admin/all');
      if (res.success) {
        setStudies(res.data);
      }
    } catch (err) {
      alert(err.message || 'Failed to load case studies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      client: '',
      category: 'Digital Marketing',
      subtitle: '',
      overview: '',
      status: 'Active Engagement',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      client: item.client,
      category: item.category || 'Digital Marketing',
      subtitle: item.subtitle || '',
      overview: item.overview,
      status: item.status || 'Active Engagement',
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      if (editingItem) {
        const res = await api.put(`/case-studies/${editingItem._id}`, formData);
        if (res.success) {
          setStudies((prev) => prev.map((s) => (s._id === editingItem._id ? res.data : s)));
        }
      } else {
        const res = await api.post('/case-studies', formData);
        if (res.success) {
          setStudies((prev) => [res.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save case study');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await api.delete(`/case-studies/${deleteId}`);
      if (res.success) {
        setStudies((prev) => prev.filter((s) => s._id !== deleteId));
        setDeleteModalOpen(false);
        setDeleteId(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete case study');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Case Studies Management
          </h1>
          <p className="text-sm text-content-muted mt-1">
            Publish deep-dive agency breakdown stories and strategy narratives.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Loading case studies..." />
        ) : studies.length === 0 ? (
          <div className="py-16 text-center text-content-muted space-y-2">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-navy-900 text-base">No case studies yet</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-light border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-content-muted">
                  <tr>
                    <th className="py-2.5 px-3.5">Client</th>
                    <th className="py-2.5 px-3.5">Title</th>
                    <th className="py-2.5 px-3.5">Category</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studies.slice((page - 1) * pageSize, page * pageSize).map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3.5 font-bold text-navy-900 text-xs sm:text-sm">{item.client}</td>
                      <td className="py-2 px-3.5 font-semibold text-xs text-navy-900">
                        {item.title}
                      </td>
                      <td className="py-2 px-3.5 text-xs text-content-muted">{item.category}</td>
                      <td className="py-2 px-3.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 px-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(item._id);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
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
              totalPages={Math.max(1, Math.ceil(studies.length / pageSize))}
              totalItems={studies.length}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Case Study' : 'New Case Study'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Client *</label>
            <input
              type="text"
              required
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Overview *</label>
            <textarea
              rows={3}
              required
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
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
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Case Study"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-content-muted">Are you sure you want to delete this case study?</p>
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
