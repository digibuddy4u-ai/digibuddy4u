import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Inbox,
  Search,
  Trash2,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { api } from '../api/client';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

const STATUS_FILTERS = [
  { label: 'All Enquiries', value: 'all' },
  { label: 'New Leads', value: 'new' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Closed', value: 'closed' },
];

export default function EnquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [notesText, setNotesText] = useState('');

  // Delete Modal State
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (search) params.append('search', search);
      params.append('page', page);
      params.append('limit', 15);

      const res = await api.get(`/enquiries?${params.toString()}`);
      if (res.success) {
        setEnquiries(res.data);
        setPagination(res.pagination);

        // Check if `view` query param matches an enquiry
        const viewId = searchParams.get('view');
        if (viewId) {
          const found = res.data.find((e) => e._id === viewId);
          if (found) {
            handleOpenDetail(found);
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, search, page]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await api.patch(`/enquiries/${enquiryId}`, { status: newStatus });
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleOpenDetail = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setNotesText(enquiry.internalNotes || '');
    setDetailModalOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setUpdatingNotes(true);
      const res = await api.patch(`/enquiries/${selectedEnquiry._id}`, {
        internalNotes: notesText,
      });
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === selectedEnquiry._id ? { ...e, internalNotes: notesText } : e))
        );
        setSelectedEnquiry((prev) => ({ ...prev, internalNotes: notesText }));
      }
    } catch (err) {
      alert(err.message || 'Failed to save notes');
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      const res = await api.delete(`/enquiries/${deleteId}`);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== deleteId));
        setDeleteModalOpen(false);
        setDeleteId(null);
        if (selectedEnquiry?._id === deleteId) {
          setDetailModalOpen(false);
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Client Enquiries & Leads
          </h1>
          <p className="text-sm text-content-muted mt-1">
            Review incoming project briefs, update processing statuses, and connect directly with leads.
          </p>
        </div>

        <button
          onClick={loadEnquiries}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card-soft space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.value);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === tab.value
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-surface-light text-content-dark hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, service..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-soft overflow-hidden">
        {loading ? (
          <LoadingSpinner text="Loading enquiries..." />
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-content-muted space-y-2">
            <Inbox className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-navy-900 text-base">No enquiries found</p>
            <p className="text-xs">Try selecting a different filter or clearing search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-light border-b border-slate-200/80 text-xs font-bold uppercase tracking-wider text-content-muted">
                <tr>
                  <th className="py-2.5 px-4">Lead / Contact</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => {
                  const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`}?text=Hi%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20DigiBuddy4U!`;

                  return (
                    <tr key={enq._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-navy-900 text-xs sm:text-sm">{enq.name}</div>
                        <div className="text-[11px] text-content-muted">{enq.email}</div>
                        {enq.brandName && (
                          <span className="text-[11px] font-semibold text-primary">
                            @{enq.brandName}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-xs text-navy-900 block">
                          {enq.service}
                        </span>
                        <span className="text-[11px] text-content-muted line-clamp-1 max-w-sm">
                          {enq.message}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                          className="text-xs font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 text-navy-900 focus:outline-none focus:border-primary shadow-xs"
                        >
                          <option value="new">New Lead</option>
                          <option value="in-progress">In Progress</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3 text-xs text-content-muted whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Direct WhatsApp Quick Chat button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat with Lead on WhatsApp"
                            className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>

                          {/* View Detail button */}
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(enq)}
                            title="View Full Message"
                            className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteId(enq._id);
                              setDeleteModalOpen(true);
                            }}
                            title="Delete Enquiry"
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
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
        )}

        {/* Enhanced Compact Pagination */}
        <Pagination
          currentPage={page}
          totalPages={pagination.pages}
          totalItems={pagination.total}
          pageSize={15}
          onPageChange={setPage}
        />
      </div>

      {/* Details & Notes Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={selectedEnquiry ? `Inquiry from ${selectedEnquiry.name}` : 'Enquiry Details'}
        maxWidth="max-w-2xl"
      >
        {selectedEnquiry && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-light border border-slate-200">
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedEnquiry.status} />
                <span className="text-xs text-content-muted">
                  Received {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 hover:bg-slate-50"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-content-muted uppercase tracking-wider block font-bold mb-1">
                  Full Name
                </span>
                <span className="text-sm font-bold text-navy-900">{selectedEnquiry.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-content-muted uppercase tracking-wider block font-bold mb-1">
                  Brand / Handle
                </span>
                <span className="text-sm font-bold text-navy-900">
                  {selectedEnquiry.brandName || 'N/A'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-content-muted uppercase tracking-wider block font-bold mb-1">
                  Phone / WhatsApp
                </span>
                <span className="text-sm font-bold text-navy-900">{selectedEnquiry.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-content-muted uppercase tracking-wider block font-bold mb-1">
                  Service Requested
                </span>
                <span className="text-sm font-bold text-primary">{selectedEnquiry.service}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block mb-2">
                Customer Message
              </span>
              <div className="p-4 rounded-2xl bg-surface-light border border-slate-200 text-sm text-content-dark whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block mb-2">
                Internal Agency Notes
              </span>
              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add follow-up notes, discussion summary, or quotation details here..."
                className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  disabled={updatingNotes}
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover disabled:opacity-50"
                >
                  {updatingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Delete Enquiry"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-content-muted">
            Are you sure you want to permanently delete this customer enquiry? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-content-dark hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
