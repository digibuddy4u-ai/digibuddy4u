import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Phone,
  Mail,
  Building,
  Tag,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Clock4,
  AlertCircle,
  FileText,
  Eye,
  Heart,
  ChevronRight,
  UserCheck,
  Send,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import { API_BASE_URL } from '../api/client';

const STATUS_OPTIONS = [
  'New',
  'Interested',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost',
  'Not Interested',
];

const STATUS_COLORS = {
  New: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10',
  Interested: 'bg-cyan-50 text-cyan-800 border-cyan-200 ring-cyan-500/10',
  Contacted: 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/10',
  Qualified: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10',
  'Proposal Sent': 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/10',
  Negotiation: 'bg-orange-50 text-orange-800 border-orange-200 ring-orange-500/10',
  Won: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-500/20 font-bold',
  Lost: 'bg-red-50 text-red-700 border-red-200 ring-red-500/10',
  'Not Interested': 'bg-slate-100 text-slate-600 border-slate-300 ring-slate-500/10',
};

const EVENT_ICONS = {
  package_card_view: Eye,
  package_details_click: ExternalLink,
  login_prompt_shown: AlertCircle,
  signup_completed: Sparkles,
  login_completed: UserCheck,
  package_details_view: Eye,
  package_saved: Heart,
  package_pdf_download: Download,
  package_enquiry_submitted: MessageSquare,
};

const EVENT_LABELS = {
  package_card_view: 'Viewed package preview card',
  package_details_click: 'Clicked to view package details',
  login_prompt_shown: 'Prompted to login/register to view locked package',
  signup_completed: 'Completed customer registration',
  login_completed: 'Logged in to customer portal',
  package_details_view: 'Viewed unlocked full package specifications',
  package_saved: 'Saved package to shortlisted bookmarks',
  package_pdf_download: 'Downloaded branded package PDF specifications',
  package_enquiry_submitted: 'Submitted package consultation request',
};

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [packageFilter, setPackageFilter] = useState('all');
  const [statusCounts, setStatusCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  // Lead Timeline & Detail Modal State
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadDetails, setLeadDetails] = useState(null);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [timelineTab, setTimelineTab] = useState('timeline'); // 'timeline' | 'notes' | 'enquiries'
  const [newNoteText, setNewNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [assignedStaff, setAssignedStaff] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const token = localStorage.getItem('digibuddy_admin_token');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
      });
      if (search.trim()) params.append('search', search.trim());
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (packageFilter !== 'all') params.append('packageSlug', packageFilter);

      const res = await fetch(`${API_BASE_URL}/leads/admin/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
        setStatusCounts(data.statusCounts || {});
        setTotalPages(data.pages || 1);
        setTotalLeads(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch CRM leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [currentPage, statusFilter, packageFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeads();
  };

  const handleInlineStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
        setActionMessage(`Lead status updated to "${newStatus}".`);
        setTimeout(() => setActionMessage(''), 3500);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const openLeadModal = async (lead) => {
    setSelectedLead(lead);
    setAssignedStaff(lead.assignedTo || '');
    setFollowUpDate(
      lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ''
    );
    setLoadingTimeline(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/leads/${lead._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLeadDetails(data.data);
      }
    } catch (err) {
      console.error('Failed to load lead details:', err);
    } finally {
      setLoadingTimeline(false);
    }
  };

  const handleSaveAssignment = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;
    setSavingAssignment(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/leads/${selectedLead._id}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assignedTo: assignedStaff,
          followUpDate: followUpDate || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedLead((prev) => ({
          ...prev,
          assignedTo: assignedStaff,
          followUpDate: followUpDate || null,
        }));
        setLeads((prev) =>
          prev.map((l) =>
            l._id === selectedLead._id
              ? { ...l, assignedTo: assignedStaff, followUpDate: followUpDate || null }
              : l
          )
        );
        setActionMessage('Lead assignment & follow-up date updated.');
        setTimeout(() => setActionMessage(''), 3500);
      }
    } catch (err) {
      console.error('Failed to save assignment:', err);
    } finally {
      setSavingAssignment(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;
    setSubmittingNote(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/leads/${selectedLead._id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: newNoteText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setLeadDetails((prev) => ({
          ...prev,
          lead: {
            ...prev.lead,
            internalNotes: data.data,
          },
        }));
        setNewNoteText('');
        setActionMessage('Internal note saved to lead profile.');
        setTimeout(() => setActionMessage(''), 3500);
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/admin/leads/export/csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DigiBuddy4U_Leads_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export leads CSV:', err);
    }
  };

  const totalFilteredCount = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-navy-900 tracking-tight">
              Leads & Client Pipeline
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              {totalLeads} Total Leads
            </span>
          </div>
          <p className="text-sm text-content-muted mt-1">
            Track customer package interest, PDF downloads, enquiries, and convert high-intent prospects into paying clients.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={fetchLeads}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-navy-900 hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh Leads"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-md"
          >
            <Download className="w-4 h-4 text-accent-yellow" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{actionMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage('')}
            className="text-emerald-700 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Status Pipeline Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          type="button"
          onClick={() => {
            setStatusFilter('all');
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            statusFilter === 'all'
              ? 'bg-navy-950 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>All Statuses</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-800">
            {totalFilteredCount}
          </span>
        </button>

        {STATUS_OPTIONS.map((st) => {
          const count = statusCounts[st] || 0;
          const isActive = statusFilter === st;
          return (
            <button
              key={st}
              type="button"
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <span>{st}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or company..."
            className="w-full pl-10 pr-20 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-navy-900"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-navy-900 text-white text-[11px] font-semibold hover:bg-navy-800"
          >
            Find
          </button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-content-muted">
            <Filter className="w-3.5 h-3.5" />
            <span>Package:</span>
          </div>
          <select
            value={packageFilter}
            onChange={(e) => {
              setPackageFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Packages</option>
            <option value="basic">Basic (₹5k)</option>
            <option value="standard">Standard (₹7.5k)</option>
            <option value="growth">Growth (₹20k)</option>
            <option value="pro">Pro (₹30k)</option>
            <option value="elite">Elite (₹40k)</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-card-soft overflow-hidden">
        {loading ? (
          <div className="p-16 flex items-center justify-center">
            <LoadingSpinner text="Loading CRM leads and telemetry..." />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-navy-900">No Leads Found</h3>
            <p className="text-xs text-content-muted max-w-sm mx-auto">
              No leads match your current search and filter criteria. Try clearing filters or submit a test enquiry on the website.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3.5">Lead Contact</th>
                  <th className="py-2.5 px-3.5">Company / Brand</th>
                  <th className="py-2.5 px-3.5">Preferred Package</th>
                  <th className="py-2.5 px-3.5">Pipeline Status</th>
                  <th className="py-2.5 px-3.5">Assignment & Next Step</th>
                  <th className="py-2.5 px-3.5">Activity</th>
                  <th className="py-2.5 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => {
                  const statusClass = STATUS_COLORS[lead.status] || STATUS_COLORS['New'];
                  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                  const waNumber = cleanPhone.startsWith('91')
                    ? cleanPhone
                    : cleanPhone.length === 10
                    ? `91${cleanPhone}`
                    : cleanPhone;

                  return (
                    <tr
                      key={lead._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Contact Info */}
                      <td className="py-2 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-navy-950 text-accent-yellow font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {(lead.name || 'L')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-navy-900 text-xs">
                              {lead.name}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                              <a
                                href={`mailto:${lead.email}`}
                                className="hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{lead.email}</span>
                              </a>
                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="hover:text-primary transition-colors flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{lead.phone}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Business */}
                      <td className="py-2 px-3.5">
                        <div className="font-semibold text-slate-800 text-xs">
                          {lead.businessName || '—'}
                        </div>
                        {lead.source && (
                          <span className="text-[10px] text-slate-400 capitalize">
                            Source: {lead.source.replace('_', ' ')}
                          </span>
                        )}
                      </td>

                      {/* Preferred Package */}
                      <td className="py-2 px-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-navy-950 text-white font-bold text-[11px]">
                          <Tag className="w-3 h-3 text-accent-yellow" />
                          <span>{lead.preferredPackage || 'Package Enquiry'}</span>
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-2 px-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleInlineStatusChange(lead._id, e.target.value)}
                          className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 ${statusClass}`}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Assigned & Follow Up */}
                      <td className="py-2 px-3.5">
                        <div className="space-y-0.5">
                          <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                            <UserCheck className="w-3 h-3 text-slate-400" />
                            <span>{lead.assignedTo || 'Unassigned'}</span>
                          </div>
                          {lead.followUpDate ? (
                            <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>
                                Follow-up: {new Date(lead.followUpDate).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400">No follow-up set</span>
                          )}
                        </div>
                      </td>

                      {/* Activity Summary */}
                      <td className="py-2 px-3.5">
                        <div className="space-y-0.5 text-[11px]">
                          <div className="text-slate-600 font-medium">
                            {lead.enquiriesCount || 1} Enquiry Submitted
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-300" />
                            <span>
                              {lead.lastActivityDate
                                ? new Date(lead.lastActivityDate).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                  })
                                : 'Recent'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-2 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                                `Hello ${lead.name}, thank you for your interest in DigiBuddy4U's ${lead.preferredPackage || 'digital marketing'} package. We would love to discuss your growth goals!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => openLeadModal(lead)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-950 text-white hover:bg-primary font-bold text-[11px] transition-colors"
                          >
                            <span>Timeline & Notes</span>
                            <ChevronRight className="w-3 h-3 text-accent-yellow" />
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

        {/* Pagination Footer */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalLeads}
          pageSize={20}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Lead Timeline & Detail Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => {
            setSelectedLead(null);
            setLeadDetails(null);
          }}
          title={selectedLead.name}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-6">
            {/* Modal Quick Profile Card */}
            <div className="p-4 rounded-2xl bg-navy-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-navy-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-heading font-black text-white">
                    {selectedLead.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      STATUS_COLORS[selectedLead.status] || 'bg-slate-800 text-white'
                    }`}
                  >
                    {selectedLead.status}
                  </span>
                  {selectedLead.preferredPackage && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/20 text-cyan-accent border border-cyan-accent/30">
                      Target: {selectedLead.preferredPackage}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                  {selectedLead.businessName && (
                    <span className="flex items-center gap-1 font-semibold text-accent-yellow">
                      <Building className="w-3.5 h-3.5" />
                      {selectedLead.businessName}
                    </span>
                  )}
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selectedLead.email}
                  </a>
                  {selectedLead.phone && (
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {selectedLead.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Direct WhatsApp Contact CTA */}
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${(selectedLead.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors self-start sm:self-auto flex-shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Lead</span>
                </a>
              )}
            </div>

            {/* Assignment & Next Step Box */}
            <form
              onSubmit={handleSaveAssignment}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Assigned Team Member
                </label>
                <input
                  type="text"
                  value={assignedStaff}
                  onChange={(e) => setAssignedStaff(e.target.value)}
                  placeholder="e.g. Krunal / Senior Strategist"
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-white border border-slate-300 text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Next Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg text-xs bg-white border border-slate-300 text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={savingAssignment}
                  className="w-full px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {savingAssignment ? 'Saving...' : 'Update Assignment'}
                </button>
              </div>
            </form>

            {/* Tabs for Timeline / CRM Notes / Enquiry Messages */}
            <div>
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  type="button"
                  onClick={() => setTimelineTab('timeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    timelineTab === 'timeline'
                      ? 'bg-navy-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Clock4 className="w-3.5 h-3.5" />
                  <span>Activity Trail ({leadDetails?.timeline?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineTab('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    timelineTab === 'notes'
                      ? 'bg-navy-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Internal CRM Notes ({leadDetails?.lead?.internalNotes?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineTab('enquiries')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    timelineTab === 'enquiries'
                      ? 'bg-navy-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquiry Messages ({leadDetails?.enquiries?.length || 0})</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                {loadingTimeline ? (
                  <div className="py-12 flex justify-center">
                    <LoadingSpinner text="Fetching lead interaction history..." />
                  </div>
                ) : (
                  <>
                    {/* Activity Timeline Tab */}
                    {timelineTab === 'timeline' && (
                      <div className="space-y-3">
                        {leadDetails?.timeline && leadDetails.timeline.length > 0 ? (
                          <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                            {leadDetails.timeline.map((act) => {
                              const IconComponent = EVENT_ICONS[act.eventType] || Eye;
                              const label = EVENT_LABELS[act.eventType] || act.eventType;
                              return (
                                <div key={act._id} className="relative group">
                                  <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary shadow-xs">
                                    <IconComponent className="w-2.5 h-2.5" />
                                  </div>
                                  <div className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-bold text-navy-900 text-xs">
                                        {label}
                                      </span>
                                      <span className="text-[10px] text-slate-400">
                                        {new Date(act.createdAt).toLocaleString('en-IN', {
                                          day: 'numeric',
                                          month: 'short',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 flex-wrap text-[11px] text-slate-600">
                                      {act.packageName && (
                                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                                          {act.packageName}
                                        </span>
                                      )}
                                      {act.device && (
                                        <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] capitalize">
                                          {act.device}
                                        </span>
                                      )}
                                      {act.isLoggedIn && (
                                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                          Authenticated
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-xs text-content-muted bg-slate-50 rounded-xl">
                            No telemetry activity recorded yet for this contact.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Internal Notes Tab */}
                    {timelineTab === 'notes' && (
                      <div className="space-y-4">
                        {/* Add Note Form */}
                        <form onSubmit={handleAddNote} className="space-y-2">
                          <label className="block text-xs font-bold text-navy-900">
                            Add Private CRM Note
                          </label>
                          <textarea
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            rows={3}
                            placeholder="Record client requirements, budget discussion, objection notes, or follow-up summary..."
                            className="w-full p-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={submittingNote || !newNoteText.trim()}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-bold transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{submittingNote ? 'Saving Note...' : 'Add Note'}</span>
                            </button>
                          </div>
                        </form>

                        {/* Existing Notes List */}
                        <div className="space-y-2.5">
                          {leadDetails?.lead?.internalNotes &&
                          leadDetails.lead.internalNotes.length > 0 ? (
                            leadDetails.lead.internalNotes.map((n, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                              >
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-bold text-navy-900">
                                    {n.author || 'Admin Staff'}
                                  </span>
                                  <span className="text-slate-400">
                                    {new Date(n.createdAt).toLocaleString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                                  {n.note}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="p-6 text-center text-xs text-content-muted bg-slate-50 rounded-xl">
                              No internal CRM notes added yet. Use the box above to log updates.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Enquiry Messages Tab */}
                    {timelineTab === 'enquiries' && (
                      <div className="space-y-3">
                        {leadDetails?.enquiries && leadDetails.enquiries.length > 0 ? (
                          leadDetails.enquiries.map((enq) => (
                            <div
                              key={enq._id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-navy-900 text-xs">
                                  {enq.service || 'Package Consultation'}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(enq.createdAt).toLocaleString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line">
                                {enq.message}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                <span>Status: <strong className="capitalize">{enq.status}</strong></span>
                                {enq.brandName && <span>• Brand: <strong>{enq.brandName}</strong></span>}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-xs text-content-muted bg-slate-50 rounded-xl">
                            No direct form messages on file.
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
