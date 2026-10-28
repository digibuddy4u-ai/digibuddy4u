import React, { useState, useEffect } from 'react';
import { Quote, Plus, Edit2, Trash2, Star, CheckCircle2 } from 'lucide-react';
import { api } from '../api/client';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    content: '',
    rating: 5,
    isVerified: true,
    isPublished: true,
  });

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/testimonials/admin/all');
      if (res.success) {
        setTestimonials(res.data);
      }
    } catch (err) {
      alert(err.message || 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      clientRole: '',
      clientCompany: '',
      content: '',
      rating: 5,
      isVerified: true,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName,
      clientRole: item.clientRole || '',
      clientCompany: item.clientCompany || '',
      content: item.content,
      rating: item.rating || 5,
      isVerified: item.isVerified,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      if (editingItem) {
        const res = await api.put(`/testimonials/${editingItem._id}`, formData);
        if (res.success) {
          setTestimonials((prev) => prev.map((t) => (t._id === editingItem._id ? res.data : t)));
        }
      } else {
        const res = await api.post('/testimonials', formData);
        if (res.success) {
          setTestimonials((prev) => [res.data, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save testimonial');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await api.delete(`/testimonials/${deleteId}`);
      if (res.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== deleteId));
        setDeleteModalOpen(false);
        setDeleteId(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Client Testimonials & Reviews
          </h1>
          <p className="text-sm text-content-muted mt-1">
            Publish verified client feedback and authentic statements. (Strictly authentic, non-fabricated).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Loading reviews..." />
        ) : testimonials.length === 0 ? (
          <div className="py-16 text-center text-content-muted space-y-2">
            <Quote className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-navy-900 text-base">No testimonials recorded yet</p>
            <p className="text-xs">
              Client reviews will appear here once authenticated following project milestone sign-off.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-light border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-content-muted">
                  <tr>
                    <th className="py-2.5 px-3.5">Client</th>
                    <th className="py-2.5 px-3.5">Rating</th>
                    <th className="py-2.5 px-3.5">Review Content</th>
                    <th className="py-2.5 px-3.5">Verified</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testimonials.slice((page - 1) * pageSize, page * pageSize).map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3.5">
                        <div className="font-bold text-navy-900 text-xs sm:text-sm">{item.clientName}</div>
                        <div className="text-[11px] text-content-muted">
                          {item.clientRole} {item.clientCompany && `• ${item.clientCompany}`}
                        </div>
                      </td>
                      <td className="py-2 px-3.5">
                        <div className="flex items-center text-accent-yellow">
                          {Array.from({ length: item.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-3.5 text-xs text-content-muted max-w-sm">
                        <p className="line-clamp-2 italic">"{item.content}"</p>
                      </td>
                      <td className="py-2 px-3.5">
                        {item.isVerified ? (
                          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Unverified</span>
                        )}
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
              totalPages={Math.max(1, Math.ceil(testimonials.length / pageSize))}
              totalItems={testimonials.length}
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
        title={editingItem ? 'Edit Testimonial' : 'New Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Company</label>
              <input
                type="text"
                value={formData.clientCompany}
                onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Testimonial Quote *</label>
            <textarea
              rows={3}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-navy-900">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="rounded text-primary w-4 h-4"
              />
              Verified Client Review
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-navy-900">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded text-primary w-4 h-4"
              />
              Published
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
              {isSaving ? 'Saving...' : 'Save Review'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Testimonial"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-content-muted">Are you sure you want to delete this testimonial?</p>
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
