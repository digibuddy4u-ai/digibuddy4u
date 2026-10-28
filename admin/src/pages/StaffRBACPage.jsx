import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  Check,
  X,
  Edit2,
  Trash2,
  Key,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Briefcase,
  Layers,
  Package,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { api } from '../api/client';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const MODULES = [
  { key: 'leads', name: 'Leads CRM', icon: Users, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'enquiries', name: 'Enquiries Desk', icon: Mail, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'packages', name: 'Packages & Pricing', icon: Package, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'packageAnalytics', name: 'Package Analytics', icon: TrendingUp, hasActions: ['view'] },
  { key: 'services', name: 'Services & Sub-Services', icon: Briefcase, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'portfolio', name: 'Portfolio & Client Work', icon: Layers, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'caseStudies', name: 'Case Studies', icon: FileText, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'testimonials', name: 'Testimonials', icon: Sparkles, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'faqs', name: 'FAQ Manager', icon: Shield, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'customers', name: 'Customer Accounts', icon: Users, hasActions: ['view', 'create', 'edit', 'delete'] },
  { key: 'settings', name: 'Website Settings', icon: Key, hasActions: ['view', 'edit'] },
  { key: 'staff', name: 'Staff & Team Access (RBAC)', icon: ShieldCheck, hasActions: ['view', 'create', 'edit', 'delete'] },
];

const ROLE_TEMPLATES = {
  sales: {
    label: 'Sales Executive',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    department: 'Sales & Inbound CRM',
    description: 'Handles incoming leads, client inquiries, CRM statuses, and client accounts.',
    permissions: {
      leads: { view: true, create: true, edit: true, delete: false },
      enquiries: { view: true, create: true, edit: true, delete: false },
      packages: { view: true, create: false, edit: false, delete: false },
      packageAnalytics: { view: true },
      services: { view: false, create: false, edit: false, delete: false },
      portfolio: { view: false, create: false, edit: false, delete: false },
      caseStudies: { view: false, create: false, edit: false, delete: false },
      testimonials: { view: false, create: false, edit: false, delete: false },
      faqs: { view: false, create: false, edit: false, delete: false },
      customers: { view: true, create: true, edit: true, delete: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
    },
  },
  package_manager: {
    label: 'Package & Pricing Manager',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    dotClass: 'bg-purple-500',
    department: 'Packages & Commercial Pricing',
    description: 'Manages official agency packages, deliverables, commercial pricing, and analytics.',
    permissions: {
      leads: { view: false, create: false, edit: false, delete: false },
      enquiries: { view: true, create: false, edit: false, delete: false },
      packages: { view: true, create: true, edit: true, delete: true },
      packageAnalytics: { view: true },
      services: { view: false, create: false, edit: false, delete: false },
      portfolio: { view: false, create: false, edit: false, delete: false },
      caseStudies: { view: false, create: false, edit: false, delete: false },
      testimonials: { view: false, create: false, edit: false, delete: false },
      faqs: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
    },
  },
  services_manager: {
    label: 'Services & Tech Manager',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    department: 'Website & IT Services',
    description: 'Manages website service catalog, sub-services, portfolio items, and case studies.',
    permissions: {
      leads: { view: false, create: false, edit: false, delete: false },
      enquiries: { view: false, create: false, edit: false, delete: false },
      packages: { view: false, create: false, edit: false, delete: false },
      packageAnalytics: { view: false },
      services: { view: true, create: true, edit: true, delete: true },
      portfolio: { view: true, create: true, edit: true, delete: true },
      caseStudies: { view: true, create: true, edit: true, delete: true },
      testimonials: { view: false, create: false, edit: false, delete: false },
      faqs: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
    },
  },
  marketing: {
    label: 'Marketing Specialist',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
    department: 'Digital Marketing & Content',
    description: 'Handles customer reviews, FAQs, inquiry follow-ups, and brand settings.',
    permissions: {
      leads: { view: true, create: false, edit: true, delete: false },
      enquiries: { view: true, create: false, edit: true, delete: false },
      packages: { view: true, create: false, edit: false, delete: false },
      packageAnalytics: { view: true },
      services: { view: false, create: false, edit: false, delete: false },
      portfolio: { view: false, create: false, edit: false, delete: false },
      caseStudies: { view: false, create: false, edit: false, delete: false },
      testimonials: { view: true, create: true, edit: true, delete: true },
      faqs: { view: true, create: true, edit: true, delete: true },
      customers: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, edit: true },
      staff: { view: false, create: false, edit: false, delete: false },
    },
  },
  superadmin: {
    label: 'Superadmin (Full Access)',
    badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    dotClass: 'bg-cyan-500',
    department: 'Executive Administration',
    description: 'Unrestricted access across all modules, website code, and staff management.',
    permissions: {
      leads: { view: true, create: true, edit: true, delete: true },
      enquiries: { view: true, create: true, edit: true, delete: true },
      packages: { view: true, create: true, edit: true, delete: true },
      packageAnalytics: { view: true },
      services: { view: true, create: true, edit: true, delete: true },
      portfolio: { view: true, create: true, edit: true, delete: true },
      caseStudies: { view: true, create: true, edit: true, delete: true },
      testimonials: { view: true, create: true, edit: true, delete: true },
      faqs: { view: true, create: true, edit: true, delete: true },
      customers: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, edit: true },
      staff: { view: true, create: true, edit: true, delete: true },
    },
  },
  custom: {
    label: 'Custom Role',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    dotClass: 'bg-slate-400',
    department: 'Custom Operations',
    description: 'Tailored permissions configured manually with exact view, edit, and create rights.',
    permissions: {
      leads: { view: false, create: false, edit: false, delete: false },
      enquiries: { view: false, create: false, edit: false, delete: false },
      packages: { view: false, create: false, edit: false, delete: false },
      packageAnalytics: { view: false },
      services: { view: false, create: false, edit: false, delete: false },
      portfolio: { view: false, create: false, edit: false, delete: false },
      caseStudies: { view: false, create: false, edit: false, delete: false },
      testimonials: { view: false, create: false, edit: false, delete: false },
      faqs: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
      staff: { view: false, create: false, edit: false, delete: false },
    },
  },
};

export default function StaffRBACPage() {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: 'Sales & Inbound CRM',
    role: 'sales',
    permissions: JSON.parse(JSON.stringify(ROLE_TEMPLATES.sales.permissions)),
    isActive: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch staff list
  const loadStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get('/staff');
      if (res.success && Array.isArray(res.data)) {
        setStaffList(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load staff list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const openAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      department: ROLE_TEMPLATES.sales.department,
      role: 'sales',
      permissions: JSON.parse(JSON.stringify(ROLE_TEMPLATES.sales.permissions)),
      isActive: true,
    });
    setError('');
    setShowPassword(false);
    setModalOpen(true);
  };

  const openEditModal = (staff) => {
    setEditingStaff(staff);
    const existingPerms =
      staff.permissions ||
      ROLE_TEMPLATES[staff.role]?.permissions ||
      ROLE_TEMPLATES.custom.permissions;

    setFormData({
      name: staff.name || '',
      email: staff.email || '',
      password: '', // blank unless resetting
      phone: staff.phone || '',
      department: staff.department || ROLE_TEMPLATES[staff.role]?.department || 'General',
      role: staff.role || 'custom',
      permissions: JSON.parse(JSON.stringify(existingPerms)),
      isActive: staff.isActive !== false,
    });
    setError('');
    setShowPassword(false);
    setModalOpen(true);
  };

  const handleRoleChange = (newRole) => {
    const template = ROLE_TEMPLATES[newRole];
    setFormData((prev) => ({
      ...prev,
      role: newRole,
      department: template?.department || prev.department,
      permissions: template ? JSON.parse(JSON.stringify(template.permissions)) : prev.permissions,
    }));
  };

  const handlePermissionToggle = (moduleKey, action) => {
    setFormData((prev) => {
      const perms = { ...prev.permissions };
      const currentModule = { ...(perms[moduleKey] || {}) };
      currentModule[action] = !currentModule[action];
      perms[moduleKey] = currentModule;

      return {
        ...prev,
        role: 'custom', // Auto-switch to custom when tweaking manually
        permissions: perms,
      };
    });
  };

  const handleSelectAllPermissions = () => {
    const allOn = {};
    MODULES.forEach((m) => {
      allOn[m.key] = {};
      m.hasActions.forEach((a) => {
        allOn[m.key][a] = true;
      });
    });
    setFormData((prev) => ({ ...prev, role: 'custom', permissions: allOn }));
  };

  const handleClearAllPermissions = () => {
    const allOff = {};
    MODULES.forEach((m) => {
      allOff[m.key] = {};
      m.hasActions.forEach((a) => {
        allOff[m.key][a] = false;
      });
    });
    setFormData((prev) => ({ ...prev, role: 'custom', permissions: allOff }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
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
      if (editingStaff) {
        // Update existing
        const updatePayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
          permissions: formData.permissions,
          isActive: formData.isActive,
        };
        if (formData.password.trim()) {
          updatePayload.password = formData.password.trim();
        }

        const res = await api.put(`/staff/${editingStaff._id}`, updatePayload);
        if (res.success) {
          setSuccessMsg(`Staff member ${formData.name} updated successfully.`);
          setTimeout(() => setSuccessMsg(''), 4000);
          setModalOpen(false);
          loadStaff();
        }
      } else {
        // Create new
        const res = await api.post('/staff', formData);
        if (res.success) {
          setSuccessMsg(`New staff member ${formData.name} created successfully.`);
          setTimeout(() => setSuccessMsg(''), 4000);
          setModalOpen(false);
          loadStaff();
        }
      }
    } catch (err) {
      setError(err.message || 'Action failed. Please check inputs.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStaff = async (staff) => {
    if (!window.confirm(`Are you sure you want to remove ${staff.name} from the team?`)) {
      return;
    }

    try {
      const res = await api.delete(`/staff/${staff._id}`);
      if (res.success) {
        setSuccessMsg(`Staff member ${staff.name} deleted.`);
        setTimeout(() => setSuccessMsg(''), 3000);
        loadStaff();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete staff member');
    }
  };

  const handleToggleStatus = async (staff) => {
    try {
      const res = await api.put(`/staff/${staff._id}`, { isActive: !staff.isActive });
      if (res.success) {
        loadStaff();
      }
    } catch (err) {
      alert(err.message || 'Failed to change status');
    }
  };

  // Filtered staff list
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.department?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'all' || s.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Calculate statistics
  const stats = {
    total: staffList.length,
    sales: staffList.filter((s) => s.role === 'sales').length,
    specialists: staffList.filter((s) => ['package_manager', 'services_manager', 'marketing'].includes(s.role)).length,
    active: staffList.filter((s) => s.isActive !== false).length,
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900 tracking-tight">
              Team & Staff Access (RBAC)
            </h1>
            <span className="text-xs font-mono font-bold bg-[#0D3E8C]/10 text-[#0D3E8C] px-2.5 py-0.5 rounded-full">
              Enterprise Role Security
            </span>
          </div>
          <p className="text-sm text-content-muted mt-1 max-w-2xl">
            Create team members, assign specialized department roles (Sales, Packages, Services, Marketing) and configure exact view, edit, and create permissions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0D3E8C] hover:bg-[#092B66] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex-shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Team Member</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Staff</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Admin console accounts</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sales Executives</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0D3E8C] mt-2">{stats.sales}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Assigned to Leads CRM</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Specialists</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 mt-2">{stats.specialists}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Packages, IT & Marketing</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Status</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">{stats.active}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Allowed portal access</div>
        </div>
      </div>

      {/* Role Filter Pills & Search */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team member, email..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white transition-all"
          />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { key: 'all', label: 'All Roles' },
            { key: 'sales', label: 'Sales' },
            { key: 'package_manager', label: 'Packages' },
            { key: 'services_manager', label: 'Services' },
            { key: 'marketing', label: 'Marketing' },
            { key: 'superadmin', label: 'Superadmin' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setRoleFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === tab.key
                  ? 'bg-[#0D3E8C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Table */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Loading team members..." />
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-navy-900 text-base">No staff members found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No team accounts match your current filter. Click "Add Team Member" above to create a staff account.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Staff Member</th>
                  <th className="py-3.5 px-4">Department & Role</th>
                  <th className="py-3.5 px-4">Authorized Modules</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredStaff.map((staff) => {
                  const roleConfig = ROLE_TEMPLATES[staff.role] || ROLE_TEMPLATES.custom;
                  const isCurrentUser = user?._id === staff._id || user?.id === staff._id;

                  // Authorized modules count
                  const allowedModules = MODULES.filter(
                    (m) => staff.role === 'superadmin' || staff.permissions?.[m.key]?.view
                  );

                  return (
                    <tr key={staff._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Email */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#0D3E8C]/10 text-[#0D3E8C] font-black text-sm flex items-center justify-center flex-shrink-0 border border-[#0D3E8C]/15">
                            {staff.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-heading font-extrabold text-navy-900 flex items-center gap-2">
                              <span className="truncate">{staff.name}</span>
                              {isCurrentUser && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-slate-500 text-xs truncate flex items-center gap-2">
                              <span>{staff.email}</span>
                              {staff.phone && (
                                <span className="text-slate-400 font-mono">• {staff.phone}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department & Role */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${roleConfig.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${roleConfig.dotClass}`} />
                            {roleConfig.label}
                          </span>
                          <div className="text-[11px] text-slate-400 font-semibold truncate">
                            {staff.department || 'General Operations'}
                          </div>
                        </div>
                      </td>

                      {/* Authorized Modules */}
                      <td className="py-4 px-4">
                        {staff.role === 'superadmin' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-xl border border-cyan-200">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                            Unrestricted (All 12 Modules)
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {allowedModules.slice(0, 4).map((m) => (
                              <span
                                key={m.key}
                                className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                              >
                                {m.name}
                              </span>
                            ))}
                            {allowedModules.length > 4 && (
                              <span className="text-[10px] font-bold text-[#0D3E8C] bg-blue-50 px-1.5 py-0.5 rounded-md">
                                +{allowedModules.length - 4} more
                              </span>
                            )}
                            {allowedModules.length === 0 && (
                              <span className="text-[11px] text-red-500 italic">No modules granted</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(staff)}
                          disabled={isCurrentUser}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                            staff.isActive !== false
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                          }`}
                          title={isCurrentUser ? "Cannot deactivate yourself" : "Click to toggle status"}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              staff.isActive !== false ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <span>{staff.isActive !== false ? 'Active' : 'Suspended'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(staff)}
                            className="p-2 rounded-xl text-slate-600 hover:text-[#0D3E8C] hover:bg-blue-50 transition-colors"
                            title="Edit Role & Permissions"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {!isCurrentUser && (
                            <button
                              type="button"
                              onClick={() => handleDeleteStaff(staff)}
                              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Staff Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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

      {/* ======================================================== */}
      {/* ADD / EDIT STAFF MODAL (With Granular Permissions Matrix) */}
      {/* ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-[32px] border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-navy-900">
                  {editingStaff ? `Edit Staff: ${editingStaff.name}` : 'Add New Team Member'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set user identity, assign department role, and customize exact permissions.
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
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
                    placeholder="e.g. rahul.sales@digibuddy4u.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98250 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Password {editingStaff ? '(Leave blank to keep unchanged)' : <span className="text-red-500">*</span>}
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
                      required={!editingStaff}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={editingStaff ? '•••••••• (unchanged)' : 'Enter strong password'}
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
              </div>

              {/* Row 3: Role Preset Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Role Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(ROLE_TEMPLATES).map(([roleKey, tpl]) => {
                    const isSelected = formData.role === roleKey;
                    return (
                      <button
                        key={roleKey}
                        type="button"
                        onClick={() => handleRoleChange(roleKey)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#0D3E8C] bg-[#0D3E8C]/5 shadow-xs ring-2 ring-[#0D3E8C]/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#0D3E8C]' : 'text-slate-800'}`}>
                            {tpl.label}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#0D3E8C]" />}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                          {tpl.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Department & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Department Title
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Sales & Inbound CRM"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0D3E8C]/30 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D3E8C]"></div>
                    <span className="ml-3 text-xs font-bold text-slate-700">
                      Active Account (Permit Login)
                    </span>
                  </label>
                </div>
              </div>

              {/* ======================================================== */}
              {/* GRANULAR PERMISSIONS MATRIX TABLE */}
              {/* ======================================================== */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-sm font-heading font-extrabold text-navy-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#0D3E8C]" />
                      <span>Granular Permissions Matrix</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Fine-tune individual View, Create, Edit, and Delete privileges per module.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleSelectAllPermissions}
                      className="text-[11px] font-bold text-[#0D3E8C] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Grant All
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAllPermissions}
                      className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-4">Module / Section</th>
                        <th className="py-2.5 px-3 text-center">View</th>
                        <th className="py-2.5 px-3 text-center">Create</th>
                        <th className="py-2.5 px-3 text-center">Edit</th>
                        <th className="py-2.5 px-3 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {MODULES.map((m) => {
                        const Icon = m.icon;
                        const perms = formData.permissions[m.key] || {};

                        return (
                          <tr key={m.key} className="hover:bg-slate-50/70 transition-colors">
                            {/* Module Name */}
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-2.5 font-bold text-navy-900">
                                <Icon className="w-3.5 h-3.5 text-slate-400" />
                                <span>{m.name}</span>
                              </div>
                            </td>

                            {/* View Action */}
                            <td className="py-2.5 px-3 text-center">
                              {m.hasActions.includes('view') ? (
                                <input
                                  type="checkbox"
                                  checked={!!perms.view}
                                  onChange={() => handlePermissionToggle(m.key, 'view')}
                                  className="w-4 h-4 rounded text-[#0D3E8C] focus:ring-[#0D3E8C]/30 border-slate-300 cursor-pointer"
                                />
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>

                            {/* Create Action */}
                            <td className="py-2.5 px-3 text-center">
                              {m.hasActions.includes('create') ? (
                                <input
                                  type="checkbox"
                                  checked={!!perms.create}
                                  onChange={() => handlePermissionToggle(m.key, 'create')}
                                  className="w-4 h-4 rounded text-[#0D3E8C] focus:ring-[#0D3E8C]/30 border-slate-300 cursor-pointer"
                                />
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>

                            {/* Edit Action */}
                            <td className="py-2.5 px-3 text-center">
                              {m.hasActions.includes('edit') ? (
                                <input
                                  type="checkbox"
                                  checked={!!perms.edit}
                                  onChange={() => handlePermissionToggle(m.key, 'edit')}
                                  className="w-4 h-4 rounded text-[#0D3E8C] focus:ring-[#0D3E8C]/30 border-slate-300 cursor-pointer"
                                />
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>

                            {/* Delete Action */}
                            <td className="py-2.5 px-3 text-center">
                              {m.hasActions.includes('delete') ? (
                                <input
                                  type="checkbox"
                                  checked={!!perms.delete}
                                  onChange={() => handlePermissionToggle(m.key, 'delete')}
                                  className="w-4 h-4 rounded text-[#0D3E8C] focus:ring-[#0D3E8C]/30 border-slate-300 cursor-pointer"
                                />
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer Buttons */}
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
                  {saving ? 'Saving...' : editingStaff ? 'Save Changes' : 'Create Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
