import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  Key,
  Eye,
  EyeOff,
  Sparkles,
  Download,
  Package,
  Calendar,
  Building,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Clock,
  ShieldCheck,
  X,
} from 'lucide-react';
import { api } from '../api/client';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    isActive: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customer/admin/all');
      if (res.success && Array.isArray(res.data)) {
        setCustomers(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const openAddModal = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      businessName: '',
      isActive: true,
    });
    setError('');
    setShowPassword(false);
    setModalOpen(true);
  };

  const openEditModal = (cust) => {
    setEditingCustomer(cust);
    setFormData({
      name: cust.name || '',
      email: cust.email || '',
      password: '', // Blank unless resetting
      phone: cust.phone || '',
      businessName: cust.businessName || '',
      isActive: cust.isActive !== false,
    });
    setError('');
    setShowPassword(false);
    setModalOpen(true);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$';
    let pass = '';
    for (let i = 0; i < 9; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: pass }));
    setShowPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (editingCustomer) {
        const updatePayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          isActive: formData.isActive,
        };
        if (formData.password.trim()) {
          updatePayload.password = formData.password.trim();
        }

        const res = await api.put(`/customer/admin/${editingCustomer._id}`, updatePayload);
        if (res.success) {
          setSuccessMsg(`Customer ${formData.name} updated successfully.`);
          setTimeout(() => setSuccessMsg(''), 4000);
          setModalOpen(false);
          loadCustomers();
        }
      } else {
        const res = await api.post('/customer/admin/create', formData);
        if (res.success) {
          setSuccessMsg(`Customer account for ${formData.name} created successfully.`);
          setTimeout(() => setSuccessMsg(''), 4000);
          setModalOpen(false);
          loadCustomers();
        }
      }
    } catch (err) {
      setError(err.message || 'Action failed. Please verify credentials.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cust) => {
    if (!window.confirm(`Are you sure you want to delete customer account for ${cust.name}?`)) {
      return;
    }

    try {
      const res = await api.delete(`/customer/admin/${cust._id}`);
      if (res.success) {
        setSuccessMsg(`Customer ${cust.name} deleted.`);
        setTimeout(() => setSuccessMsg(''), 3000);
        loadCustomers();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete customer');
    }
  };

  const handleToggleStatus = async (cust) => {
    try {
      const res = await api.put(`/customer/admin/${cust._id}`, { isActive: !cust.isActive });
      if (res.success) {
        loadCustomers();
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  // Filter customers
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.toLowerCase().includes(search.toLowerCase()) ||
      c.businessName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && c.isActive !== false) ||
      (statusFilter === 'inactive' && c.isActive === false);

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalSavedPackages = customers.reduce(
    (acc, curr) => acc + (Array.isArray(curr.savedPackages) ? curr.savedPackages.length : 0),
    0
  );
  const totalPdfsDownloaded = customers.reduce(
    (acc, curr) => acc + (Array.isArray(curr.downloadedPdfs) ? curr.downloadedPdfs.length : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 tracking-tight">
              Customer Accounts & Client Portal
            </h1>
            <span className="text-xs font-mono font-bold bg-[#0D3E8C]/10 text-[#0D3E8C] px-2.5 py-0.5 rounded-full">
              Client CRM
            </span>
          </div>
          <p className="text-sm text-content-muted mt-1 max-w-2xl">
            Monitor registered client accounts, downloaded package proposals, saved packages, and create new client logins with verified credentials.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0D3E8C] hover:bg-[#092B66] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex-shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Client Account</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Clients</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">{customers.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Registered customer portals</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Accounts</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            {customers.filter((c) => c.isActive !== false).length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Can login and unlock PDFs</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Packages</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 mt-2">{totalSavedPackages}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Bookmarked by clients</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">PDF Downloads</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">{totalPdfsDownloaded}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Official deliverables PDFs</div>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, business..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto">
          {[
            { key: 'all', label: 'All Accounts' },
            { key: 'active', label: 'Active Only' },
            { key: 'inactive', label: 'Suspended' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.key
                  ? 'bg-[#0D3E8C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Loading client accounts..." />
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-navy-900 text-base">No customer accounts found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No clients match your search criteria. Click "Add Client Account" to create a client portal login.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Client Identity</th>
                  <th className="py-3.5 px-4">Contact & Business</th>
                  <th className="py-3.5 px-4">Portal Activity</th>
                  <th className="py-3.5 px-4">Registered</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredCustomers.map((cust) => {
                  const savedCount = cust.savedPackages?.length || 0;
                  const pdfCount = cust.downloadedPdfs?.length || 0;

                  return (
                    <tr key={cust._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#0D3E8C]/10 text-[#0D3E8C] font-black text-sm flex items-center justify-center flex-shrink-0 border border-[#0D3E8C]/15">
                            {cust.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-heading font-extrabold text-navy-900 truncate">
                              {cust.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-semibold truncate flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              <span>{cust.businessName || 'Independent Client'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="text-slate-800 font-medium truncate flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{cust.email}</span>
                          </div>
                          {cust.phone && (
                            <div className="text-slate-500 text-xs font-mono flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{cust.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Activity */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              savedCount > 0
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}
                          >
                            <Package className="w-3 h-3" />
                            {savedCount} Saved
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              pdfCount > 0
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}
                          >
                            <Download className="w-3 h-3" />
                            {pdfCount} PDFs
                          </span>
                        </div>
                      </td>

                      {/* Registered Date */}
                      <td className="py-4 px-4">
                        <div className="text-slate-600 text-xs flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>
                            {cust.createdAt
                              ? new Date(cust.createdAt).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(cust)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                            cust.isActive !== false
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              cust.isActive !== false ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <span>{cust.isActive !== false ? 'Active' : 'Suspended'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(cust)}
                            className="p-2 rounded-xl text-slate-600 hover:text-[#0D3E8C] hover:bg-blue-50 transition-colors"
                            title="Edit Client or Reset Password"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(cust)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Client Account"
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
      </div>

      {/* Add / Edit Customer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-[32px] border border-slate-200 shadow-2xl p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-navy-900">
                  {editingCustomer ? `Edit Client: ${editingCustomer.name}` : 'Create Client Portal Account'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generate login credentials for client portal and proposal unlocks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Client Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dharmik R."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address (Login ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. dharmik@rotiwala.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98980 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. RotiWala Foods"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Password {editingCustomer ? '(Leave blank to keep unchanged)' : <span className="text-red-500">*</span>}
                  </label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-[11px] font-bold text-[#0D3E8C] hover:underline inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Auto-generate
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required={!editingCustomer}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingCustomer ? '•••••••• (unchanged)' : 'Enter client password'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D3E8C]"></div>
                  <span className="ml-3 text-xs font-bold text-slate-700">
                    Active Account (Can Log Into Portal)
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0D3E8C] hover:bg-[#092B66] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingCustomer ? 'Save Changes' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
