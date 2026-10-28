import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlusCircle,
  X,
  Share2,
  Palette,
  Video,
  TrendingUp,
  Compass,
  Layers,
  Search,
  ExternalLink,
  Copy,
  ToggleLeft,
  ToggleRight,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sliders,
  Eye,
  Layout,
  Code2,
  Smartphone,
  Cpu,
  ShoppingBag,
  Wrench,
  PenTool,
  Bot,
  Settings,
  ListPlus,
  RefreshCw,
  Home,
} from 'lucide-react';
import { api } from '../api/client';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';

const AVAILABLE_ICONS = [
  'Share2',
  'TrendingUp',
  'Palette',
  'Video',
  'Search',
  'PenTool',
  'Bot',
  'Layout',
  'Layers',
  'Smartphone',
  'Cpu',
  'ShoppingBag',
  'Wrench',
  'Code2',
  'Compass',
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'categories' | 'homepage'

  // Services State
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [servicePage, setServicePage] = useState(1);
  const [servicePageSize, setServicePageSize] = useState(8);

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalTab, setModalTab] = useState('basic'); // 'basic' | 'subservices' | 'benefits' | 'process' | 'faqs' | 'seo'
  const [isSaving, setIsSaving] = useState(false);

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    slug: '',
    categoryId: '',
    categorySlug: 'digital-marketing',
    categoryName: 'Digital Marketing',
    shortDescription: '',
    fullDescription: '',
    icon: 'Share2',
    image: '',
    highlight: '',
    order: 1,
    status: 'published',
    isPublished: true,
    isFeatured: true,
    showOnHome: true,
    subServices: [],
    problemsSolved: [''],
    benefits: [''],
    useCases: [''],
    processSteps: [
      { stepNumber: 1, title: 'Discovery & Audit', description: '' },
      { stepNumber: 2, title: 'Strategy & Roadmap', description: '' },
      { stepNumber: 3, title: 'Execution & Production', description: '' },
      { stepNumber: 4, title: 'Optimization & Review', description: '' },
    ],
    targetIndustries: '',
    faqs: [{ question: '', answer: '' }],
    seo: {
      title: '',
      metaDescription: '',
      keywords: '',
    },
  });

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: 'service', id: null, title: '' });

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Layers',
    displayOrder: 1,
    isActive: true,
  });

  // Homepage Settings State
  const [homepageSettings, setHomepageSettings] = useState({
    homepageDisplayMode: 'services_grid', // 'services_grid' | 'category_cards'
    maxHomeServices: 14,
    defaultCategoryTab: 'all',
    showMainServicesSection: true,
    initialCardsCount: 2,
    showMoreButtonLabel: 'Show More Services',
    showLessButtonLabel: 'Show Less',
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000';

  // Load Services & Categories
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [servicesRes, categoriesRes, settingsRes] = await Promise.all([
        api.get('/services/admin/all'),
        api.get('/categories/admin/all'),
        api.get('/settings/admin').catch(() => ({ success: false })),
      ]);

      if (servicesRes.success) setServices(servicesRes.data || []);
      if (categoriesRes.success) setCategories(categoriesRes.data || []);
      if (settingsRes.success && settingsRes.data?.servicesSettings) {
        setHomepageSettings(settingsRes.data.servicesSettings);
      }
    } catch (err) {
      setError(err.message || 'Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // ==========================================
  // SERVICE HANDLERS
  // ==========================================
  const handleOpenCreateService = () => {
    setEditingService(null);
    setModalTab('basic');
    setServiceForm({
      title: '',
      slug: '',
      categoryId: categories[0]?._id || '',
      categorySlug: categories[0]?.slug || 'digital-marketing',
      categoryName: categories[0]?.name || 'Digital Marketing',
      shortDescription: '',
      fullDescription: '',
      icon: 'Share2',
      image: '',
      highlight: '',
      order: services.length + 1,
      status: 'published',
      isPublished: true,
      isFeatured: true,
      showOnHome: true,
      subServices: [],
      problemsSolved: [''],
      benefits: [''],
      useCases: [''],
      processSteps: [
        { stepNumber: 1, title: 'Discovery & Audit', description: 'Analyze requirements, audience baseline, and benchmarks.' },
        { stepNumber: 2, title: 'Strategy & Roadmap', description: 'Architect deliverables, technical stack, and milestone calendar.' },
        { stepNumber: 3, title: 'Execution & Production', description: 'Develop code or creative assets with weekly client review check-ins.' },
        { stepNumber: 4, title: 'Optimization & Review', description: 'Measure performance metrics, test conversion funnels, and refine.' },
      ],
      targetIndustries: 'Food & Hospitality, E-Commerce & Retail, Healthcare, Professional Services',
      faqs: [{ question: '', answer: '' }],
      seo: {
        title: '',
        metaDescription: '',
        keywords: '',
      },
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service) => {
    setEditingService(service);
    setModalTab('basic');
    setServiceForm({
      title: service.title || '',
      slug: service.slug || '',
      categoryId: service.categoryId || '',
      categorySlug: service.categorySlug || 'digital-marketing',
      categoryName: service.categoryName || 'Digital Marketing',
      shortDescription: service.shortDescription || '',
      fullDescription: service.fullDescription || '',
      icon: service.icon || 'Share2',
      image: service.image || '',
      highlight: service.highlight || '',
      order: service.order !== undefined ? service.order : 1,
      status: service.status || (service.isPublished ? 'published' : 'draft'),
      isPublished: service.isPublished !== undefined ? service.isPublished : true,
      isFeatured: service.isFeatured !== undefined ? service.isFeatured : true,
      showOnHome: service.showOnHome !== undefined ? service.showOnHome : true,
      subServices: Array.isArray(service.subServices) ? JSON.parse(JSON.stringify(service.subServices)) : [],
      problemsSolved: service.problemsSolved?.length ? [...service.problemsSolved] : [''],
      benefits: service.benefits?.length ? [...service.benefits] : [''],
      useCases: service.useCases?.length ? [...service.useCases] : [''],
      processSteps: service.processSteps?.length
        ? JSON.parse(JSON.stringify(service.processSteps))
        : [
            { stepNumber: 1, title: 'Discovery & Audit', description: '' },
            { stepNumber: 2, title: 'Strategy & Roadmap', description: '' },
            { stepNumber: 3, title: 'Execution & Production', description: '' },
            { stepNumber: 4, title: 'Optimization & Review', description: '' },
          ],
      targetIndustries: Array.isArray(service.targetIndustries) ? service.targetIndustries.join(', ') : '',
      faqs: service.faqs?.length ? JSON.parse(JSON.stringify(service.faqs)) : [{ question: '', answer: '' }],
      seo: {
        title: service.seo?.title || '',
        metaDescription: service.seo?.metaDescription || '',
        keywords: Array.isArray(service.seo?.keywords) ? service.seo.keywords.join(', ') : '',
      },
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.shortDescription.trim()) {
      alert('Please fill out at least Title and Short Description.');
      return;
    }

    try {
      setIsSaving(true);

      // Clean payload
      const payload = {
        ...serviceForm,
        title: serviceForm.title.trim(),
        slug: serviceForm.slug.trim(),
        shortDescription: serviceForm.shortDescription.trim(),
        fullDescription: serviceForm.fullDescription.trim() || serviceForm.shortDescription.trim(),
        highlight: serviceForm.highlight.trim(),
        targetIndustries: serviceForm.targetIndustries
          ? serviceForm.targetIndustries.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        problemsSolved: serviceForm.problemsSolved.map((s) => s.trim()).filter(Boolean),
        benefits: serviceForm.benefits.map((s) => s.trim()).filter(Boolean),
        useCases: serviceForm.useCases.map((s) => s.trim()).filter(Boolean),
        processSteps: serviceForm.processSteps.filter((p) => p.title.trim()),
        faqs: serviceForm.faqs.filter((f) => f.question.trim() && f.answer.trim()),
        seo: {
          title: serviceForm.seo.title.trim(),
          metaDescription: serviceForm.seo.metaDescription.trim(),
          keywords: serviceForm.seo.keywords
            ? serviceForm.seo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
            : [],
        },
      };

      if (editingService) {
        await api.put(`/services/${editingService._id}`, payload);
        showToast(`Service "${payload.title}" updated successfully.`);
      } else {
        await api.post('/services', payload);
        showToast(`Service "${payload.title}" created successfully.`);
      }

      setIsServiceModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Error saving service.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDuplicateService = async (service) => {
    try {
      setLoading(true);
      const res = await api.post(`/services/${service._id}/duplicate`, {});
      if (res.success) {
        showToast(`Duplicated "${service.title}" as draft.`);
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to duplicate service.');
      setLoading(false);
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      const res = await api.patch(`/services/${service._id}/status`, {});
      if (res.success) {
        showToast(res.message || 'Status updated.');
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  const handleToggleShowOnHome = async (service) => {
    try {
      const nextVal = service.showOnHome === false;
      const res = await api.put(`/services/${service._id}`, { showOnHome: nextVal });
      if (res.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === service._id ? { ...s, showOnHome: nextVal } : s))
        );
        showToast(
          `Service "${service.title}" is now ${nextVal ? 'visible on' : 'hidden from'} Homepage.`
        );
      }
    } catch (err) {
      alert(err.message || 'Failed to update homepage visibility.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteTarget.type === 'service') {
        await api.delete(`/services/${deleteTarget.id}`);
        showToast(`Service "${deleteTarget.title}" deleted.`);
      } else if (deleteTarget.type === 'category') {
        await api.delete(`/categories/${deleteTarget.id}`);
        showToast(`Category "${deleteTarget.title}" deleted.`);
      }
      setDeleteModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Delete operation failed.');
    }
  };

  // ==========================================
  // CATEGORY HANDLERS
  // ==========================================
  const handleOpenCreateCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      icon: 'Layers',
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      icon: cat.icon || 'Layers',
      displayOrder: cat.displayOrder || 1,
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim() || !categoryForm.description.trim()) {
      alert('Please enter Category Name and Description.');
      return;
    }

    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, categoryForm);
        showToast(`Category "${categoryForm.name}" updated.`);
      } else {
        await api.post('/categories', categoryForm);
        showToast(`Category "${categoryForm.name}" created.`);
      }
      setIsCategoryModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to save category.');
    }
  };

  // ==========================================
  // HOMEPAGE CONTROLS HANDLER
  // ==========================================
  const handleSaveHomepageSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      await api.put('/settings', {
        servicesSettings: homepageSettings,
      });
      showToast('Homepage services settings saved successfully.');
    } catch (err) {
      alert(err.message || 'Failed to update homepage settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Filter & Paginate Services
  const filteredServices = services.filter((s) => {
    const matchesCat =
      selectedCategoryFilter === 'all' || s.categorySlug === selectedCategoryFilter;
    const matchesStatus =
      selectedStatusFilter === 'all' ||
      (selectedStatusFilter === 'published' && (s.status === 'published' || s.isPublished)) ||
      (selectedStatusFilter === 'draft' && (s.status === 'draft' || !s.isPublished));
    const matchesQuery =
      searchQuery.trim() === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesQuery;
  });

  const totalServicePages = Math.max(1, Math.ceil(filteredServices.length / servicePageSize));
  const paginatedServices = filteredServices.slice(
    (servicePage - 1) * servicePageSize,
    servicePage * servicePageSize
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Top Header & Division Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Dynamic control over all 14 agency services, sub-services, categories, and homepage display rules.
          </p>
        </div>

        {/* Action Button */}
        {activeTab === 'services' && (
          <button
            type="button"
            onClick={handleOpenCreateService}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
        {activeTab === 'categories' && (
          <button
            type="button"
            onClick={handleOpenCreateCategory}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Division Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-primary text-primary'
              : 'border-transparent text-content-muted hover:text-navy-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Services ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-primary text-primary'
              : 'border-transparent text-content-muted hover:text-navy-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('homepage')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'homepage'
              ? 'border-primary text-primary'
              : 'border-transparent text-content-muted hover:text-navy-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Homepage Display Controls</span>
        </button>
      </div>

      {/* TAB 1: MAIN SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs text-content-muted">Total Services</div>
              <div className="text-2xl font-bold font-heading text-navy-900 mt-1">
                {services.length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs text-content-muted">Digital Marketing</div>
              <div className="text-2xl font-bold font-heading text-primary mt-1">
                {services.filter((s) => s.categorySlug === 'digital-marketing').length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs text-content-muted">IT Services</div>
              <div className="text-2xl font-bold font-heading text-cyan-hover mt-1">
                {services.filter((s) => s.categorySlug === 'it-services').length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs text-content-muted">Published Live</div>
              <div className="text-2xl font-bold font-heading text-emerald-600 mt-1">
                {services.filter((s) => s.status === 'published' || s.isPublished).length}
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services by title, slug, or content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setServicePage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => {
                  setSelectedCategoryFilter(e.target.value);
                  setServicePage(1);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => {
                  setSelectedStatusFilter(e.target.value);
                  setServicePage(1);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>

              {(searchQuery || selectedCategoryFilter !== 'all' || selectedStatusFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategoryFilter('all');
                    setSelectedStatusFilter('all');
                    setServicePage(1);
                  }}
                  className="text-xs text-primary font-bold hover:underline px-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Services Table */}
          {loading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner size="lg" text="Loading services..." />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <p className="text-content-muted text-sm">No services found matching current filters.</p>
              <button
                type="button"
                onClick={handleOpenCreateService}
                className="text-xs font-bold text-primary hover:underline"
              >
                Create a new service
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface-light border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3.5">Service</th>
                      <th className="py-2.5 px-3.5">Category</th>
                      <th className="py-2.5 px-3.5">Sub-Services</th>
                      <th className="py-2.5 px-3.5">Order</th>
                      <th className="py-2.5 px-3.5">Status</th>
                      <th className="py-2.5 px-3.5">Home Show?</th>
                      <th className="py-2.5 px-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedServices.map((service) => {
                      const isPub = service.status === 'published' || service.isPublished;
                      const isMarketing = service.categorySlug === 'digital-marketing';

                      return (
                        <tr key={service._id} className="hover:bg-slate-50 transition-colors">
                          {/* Title & Slug */}
                          <td className="py-2.5 px-3.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                  isMarketing
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-cyan-accent/20 text-cyan-hover'
                                }`}
                              >
                                {service.icon?.slice(0, 2) || 'Sv'}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-navy-900 truncate max-w-xs sm:max-w-md text-xs sm:text-sm">
                                  {service.title}
                                </div>
                                <div className="text-[10px] text-content-muted font-mono flex items-center gap-1.5">
                                  <span>/services/{service.slug}</span>
                                  <a
                                    href={`${websiteUrl}/services/${service.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open on live website"
                                    className="text-slate-400 hover:text-primary"
                                  >
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-2.5 px-3.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                isMarketing
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-cyan-accent/20 text-cyan-hover'
                              }`}
                            >
                              {service.categoryName || (isMarketing ? 'Digital Marketing' : 'IT Services')}
                            </span>
                          </td>

                          {/* Sub-services count */}
                          <td className="py-2.5 px-3.5">
                            <span className="font-semibold text-navy-900 text-xs">
                              {service.subServices?.length || 0} sub-modules
                            </span>
                          </td>

                          {/* Order */}
                          <td className="py-2.5 px-3.5 font-mono font-bold text-slate-500 text-xs">
                            #{service.order}
                          </td>

                          {/* Status */}
                          <td className="py-2.5 px-3.5">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(service)}
                              title="Click to toggle status"
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                                isPub
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isPub ? 'bg-emerald-600' : 'bg-slate-400'
                                }`}
                              />
                              <span>{isPub ? 'Published' : 'Draft'}</span>
                            </button>
                          </td>

                          {/* Home Show Toggle */}
                          <td className="py-2.5 px-3.5">
                            <button
                              type="button"
                              onClick={() => handleToggleShowOnHome(service)}
                              title={
                                service.showOnHome !== false
                                  ? 'Visible on Homepage - click to hide'
                                  : 'Hidden from Homepage - click to show'
                              }
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                                service.showOnHome !== false
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              <Home className="w-2.5 h-2.5" />
                              <span>{service.showOnHome !== false ? 'Home: Visible' : 'Home: Hidden'}</span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-2.5 px-3.5 text-right">
                            <div className="inline-flex items-center gap-1">
                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditService(service)}
                                title="Edit Service"
                                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-navy-900 transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Duplicate */}
                              <button
                                type="button"
                                onClick={() => handleDuplicateService(service)}
                                title="Duplicate Service as Draft"
                                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              {/* Preview */}
                              <a
                                href={`${websiteUrl}/services/${service.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Preview on client site"
                                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-cyan-hover transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => {
                                  setDeleteTarget({
                                    type: 'service',
                                    id: service._id,
                                    title: service.title,
                                  });
                                  setDeleteModalOpen(true);
                                }}
                                title="Delete Service"
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Services Pagination */}
              <Pagination
                currentPage={servicePage}
                totalPages={totalServicePages}
                totalItems={filteredServices.length}
                pageSize={servicePageSize}
                onPageChange={setServicePage}
                onPageSizeChange={(newSize) => {
                  setServicePageSize(newSize);
                  setServicePage(1);
                }}
                pageSizeOptions={[6, 8, 12, 20]}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {cat.icon === 'TrendingUp' ? (
                        <TrendingUp className="w-6 h-6" />
                      ) : (
                        <Code2 className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        cat.isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-navy-900">{cat.name}</h3>
                    <div className="text-xs font-mono text-primary mt-0.5">slug: {cat.slug}</div>
                    <p className="text-xs text-content-muted mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-navy-900">
                    <span>Display Order: #{cat.displayOrder}</span>
                    <span>•</span>
                    <span className="text-primary">{cat.servicesCount || 0} Linked Services</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenEditCategory(cat)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Category</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteTarget({
                        type: 'category',
                        id: cat._id,
                        title: cat.name,
                      });
                      setDeleteModalOpen(true);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-700"
                  >
                    Delete Category
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HOMEPAGE DISPLAY CONTROLS */}
      {activeTab === 'homepage' && (
        <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-heading font-bold text-navy-900">
              Homepage Services Section Controls
            </h3>
            <p className="text-xs text-content-muted mt-1">
              Configure how the services catalogue is presented on the public homepage.
            </p>
          </div>

          <form onSubmit={handleSaveHomepageSettings} className="space-y-5">
            {/* Display Mode Selector */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Homepage Layout Mode (Requested Feature)
              </label>
              <select
                value={homepageSettings.homepageDisplayMode || 'services_grid'}
                onChange={(e) =>
                  setHomepageSettings({
                    ...homepageSettings,
                    homepageDisplayMode: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="services_grid">
                  Direct Main Services Grid (Show Individual Services Cards + Category Tabs — Recommended)
                </option>
                <option value="category_cards">
                  Category Division Cards (2 Large Category Cards + Show More Accordion)
                </option>
              </select>
              <p className="text-[11px] text-content-muted">
                {homepageSettings.homepageDisplayMode === 'category_cards'
                  ? 'Displays the two division cards (Digital Marketing vs IT Services) with an expandable accordion.'
                  : 'Directly displays all main services as interactive cards with instant category filter tabs (All, Digital Marketing, IT Services).'}
              </p>
            </div>

            {/* Default Category Tab */}
            {homepageSettings.homepageDisplayMode !== 'category_cards' && (
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Default Active Category Filter on Homepage
                </label>
                <select
                  value={homepageSettings.defaultCategoryTab || 'all'}
                  onChange={(e) =>
                    setHomepageSettings({
                      ...homepageSettings,
                      defaultCategoryTab: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900"
                >
                  <option value="all">All Services (Show both Marketing & IT)</option>
                  <option value="digital-marketing">Digital Marketing Only</option>
                  <option value="it-services">IT Services & Software Only</option>
                </select>
              </div>
            )}

            {/* Max Services Count */}
            {homepageSettings.homepageDisplayMode !== 'category_cards' && (
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Maximum Services to Display on Homepage
                </label>
                <select
                  value={homepageSettings.maxHomeServices || 14}
                  onChange={(e) =>
                    setHomepageSettings({
                      ...homepageSettings,
                      maxHomeServices: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900"
                >
                  <option value={6}>6 Services</option>
                  <option value={8}>8 Services</option>
                  <option value={12}>12 Services</option>
                  <option value={14}>All Available Services (Up to 14)</option>
                </select>
              </div>
            )}

            {/* Toggle Section */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-light border border-slate-200">
              <div>
                <div className="text-sm font-bold text-navy-900">Show Services Section on Homepage</div>
                <div className="text-xs text-content-muted">
                  Enable or disable the services section on the public homepage.
                </div>
              </div>
              <input
                type="checkbox"
                checked={homepageSettings.showMainServicesSection !== false}
                onChange={(e) =>
                  setHomepageSettings({
                    ...homepageSettings,
                    showMainServicesSection: e.target.checked,
                  })
                }
                className="w-5 h-5 text-primary rounded-lg focus:ring-primary"
              />
            </div>

            {/* Accordion labels (used if category_cards mode is chosen) */}
            {homepageSettings.homepageDisplayMode === 'category_cards' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Initial Category Cards Displayed
                  </label>
                  <select
                    value={homepageSettings.initialCardsCount}
                    onChange={(e) =>
                      setHomepageSettings({
                        ...homepageSettings,
                        initialCardsCount: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900"
                  >
                    <option value={2}>2 Cards (Digital Marketing & IT Services - Recommended)</option>
                    <option value={1}>1 Card (Digital Marketing Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    "Show More" Button Label
                  </label>
                  <input
                    type="text"
                    value={homepageSettings.showMoreButtonLabel}
                    onChange={(e) =>
                      setHomepageSettings({
                        ...homepageSettings,
                        showMoreButtonLabel: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    "Show Less" Button Label
                  </label>
                  <input
                    type="text"
                    value={homepageSettings.showLessButtonLabel}
                    onChange={(e) =>
                      setHomepageSettings({
                        ...homepageSettings,
                        showLessButtonLabel: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900"
                  />
                </div>
              </>
            )}

            <div className="pt-3">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-xs"
              >
                {savingSettings ? 'Saving Settings...' : 'Save Homepage Settings'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* SERVICE EDIT/CREATE MODAL */}
      {/* ======================================================== */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingService ? `Edit Service: ${editingService.title}` : 'Add New Main Service'}
        maxWidth="max-w-5xl"
      >
        <form onSubmit={handleSaveService} className="space-y-6">
          {/* Modal Tab Headers */}
          <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-3">
            {[
              { id: 'basic', label: '1. Basic Info' },
              { id: 'subservices', label: `2. Sub-Services (${serviceForm.subServices.length})` },
              { id: 'benefits', label: '3. Problems & Benefits' },
              { id: 'process', label: '4. Working Process' },
              { id: 'faqs', label: `5. FAQs (${serviceForm.faqs.length})` },
              { id: 'seo', label: '6. SEO Metadata' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setModalTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  modalTab === tab.id
                    ? 'bg-navy-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: BASIC INFO */}
          {modalTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    placeholder="e.g. Social Media Marketing (SMM)"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Slug (URL Key) *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    placeholder="e.g. social-media-marketing"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Category Division *
                  </label>
                  <select
                    value={serviceForm.categorySlug}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.slug === e.target.value);
                      setServiceForm({
                        ...serviceForm,
                        categorySlug: e.target.value,
                        categoryName: cat?.name || e.target.value,
                        categoryId: cat?._id || '',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Icon Name (Lucide)
                  </label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono"
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Display Sequence Order
                  </label>
                  <input
                    type="number"
                    value={serviceForm.order}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Highlight Tagline (Short Value Hook)
                </label>
                <input
                  type="text"
                  value={serviceForm.highlight}
                  onChange={(e) => setServiceForm({ ...serviceForm, highlight: e.target.value })}
                  placeholder="e.g. Turn passive social scrollers into active brand advocates."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Short Description (For Cards & Mega Menu) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.shortDescription}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, shortDescription: e.target.value })
                  }
                  placeholder="Brief summary shown on service cards..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Full In-Depth Description (For Service Hero & Detail Page)
                </label>
                <textarea
                  rows={4}
                  value={serviceForm.fullDescription}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, fullDescription: e.target.value })
                  }
                  placeholder="Detailed description outlining methodology and client value..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              {/* Status & Featured Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-navy-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceForm.status === 'published'}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        status: e.target.checked ? 'published' : 'draft',
                        isPublished: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>Published Live (Visible to public)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-navy-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceForm.isFeatured}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 text-cyan-accent rounded"
                  />
                  <span>Featured Badge</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-navy-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceForm.showOnHome !== false}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, showOnHome: e.target.checked })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Show on Homepage Services Grid</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: SUB-SERVICES MANAGER */}
          {modalTab === 'subservices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs text-content-muted">
                  Add, edit, or remove specialized sub-services and their specific deliverables.
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setServiceForm({
                      ...serviceForm,
                      subServices: [
                        ...serviceForm.subServices,
                        {
                          name: `New Sub-Service ${serviceForm.subServices.length + 1}`,
                          slug: `sub-service-${serviceForm.subServices.length + 1}`,
                          shortDescription: '',
                          detailedDescription: '',
                          deliverables: ['Deliverable 1', 'Deliverable 2'],
                          benefits: ['Benefit 1'],
                          isActive: true,
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sub-Service</span>
                </button>
              </div>

              {serviceForm.subServices.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl text-xs text-content-muted">
                  No sub-services added yet. Click "+ Add Sub-Service" to create one.
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {serviceForm.subServices.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary font-mono">
                          #{sIdx + 1} Sub-Service
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...serviceForm.subServices];
                            updated.splice(sIdx, 1);
                            setServiceForm({ ...serviceForm, subServices: updated });
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-bold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-navy-900 mb-0.5">
                            Sub-Service Name
                          </label>
                          <input
                            type="text"
                            value={sub.name}
                            onChange={(e) => {
                              const updated = [...serviceForm.subServices];
                              updated[sIdx].name = e.target.value;
                              setServiceForm({ ...serviceForm, subServices: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-navy-900 mb-0.5">
                            Short Summary
                          </label>
                          <input
                            type="text"
                            value={sub.shortDescription}
                            onChange={(e) => {
                              const updated = [...serviceForm.subServices];
                              updated[sIdx].shortDescription = e.target.value;
                              setServiceForm({ ...serviceForm, subServices: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-navy-900 mb-0.5">
                          Deliverables (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={Array.isArray(sub.deliverables) ? sub.deliverables.join(', ') : ''}
                          onChange={(e) => {
                            const updated = [...serviceForm.subServices];
                            updated[sIdx].deliverables = e.target.value
                              .split(',')
                              .map((d) => d.trim())
                              .filter(Boolean);
                            setServiceForm({ ...serviceForm, subServices: updated });
                          }}
                          placeholder="e.g. Profile audit, Content strategy, Monthly calendar"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROBLEMS & BENEFITS */}
          {modalTab === 'benefits' && (
            <div className="space-y-4">
              {/* Target Industries */}
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Suitable Industries (Comma-separated)
                </label>
                <input
                  type="text"
                  value={serviceForm.targetIndustries}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, targetIndustries: e.target.value })
                  }
                  placeholder="e.g. Food & Hospitality, Retail & D2C, Healthcare, Real Estate"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              {/* Problems Solved */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-navy-900">
                    Problems This Service Solves
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setServiceForm({
                        ...serviceForm,
                        problemsSolved: [...serviceForm.problemsSolved, ''],
                      })
                    }
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    + Add Problem
                  </button>
                </div>
                <div className="space-y-2">
                  {serviceForm.problemsSolved.map((prob, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={prob}
                        onChange={(e) => {
                          const updated = [...serviceForm.problemsSolved];
                          updated[idx] = e.target.value;
                          setServiceForm({ ...serviceForm, problemsSolved: updated });
                        }}
                        placeholder="e.g. Inconsistent posting schedule hurting algorithm reach..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...serviceForm.problemsSolved];
                          updated.splice(idx, 1);
                          setServiceForm({ ...serviceForm, problemsSolved: updated });
                        }}
                        className="text-slate-400 hover:text-red-500 px-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-navy-900">
                    Commercial Benefits & Use Cases
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setServiceForm({
                        ...serviceForm,
                        benefits: [...serviceForm.benefits, ''],
                      })
                    }
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    + Add Benefit
                  </button>
                </div>
                <div className="space-y-2">
                  {serviceForm.benefits.map((ben, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={ben}
                        onChange={(e) => {
                          const updated = [...serviceForm.benefits];
                          updated[idx] = e.target.value;
                          setServiceForm({ ...serviceForm, benefits: updated });
                        }}
                        placeholder="e.g. Consistent organic audience growth without fake followers..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...serviceForm.benefits];
                          updated.splice(idx, 1);
                          setServiceForm({ ...serviceForm, benefits: updated });
                        }}
                        className="text-slate-400 hover:text-red-500 px-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORKING PROCESS */}
          {modalTab === 'process' && (
            <div className="space-y-4">
              <div className="text-xs text-content-muted pb-1">
                Define the 4 stages of your working methodology for this service.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceForm.processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-2"
                  >
                    <div className="text-xs font-bold text-primary">Stage 0{idx + 1}</div>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...serviceForm.processSteps];
                        updated[idx].title = e.target.value;
                        setServiceForm({ ...serviceForm, processSteps: updated });
                      }}
                      placeholder="Step Title (e.g. Discovery & Audit)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...serviceForm.processSteps];
                        updated[idx].description = e.target.value;
                        setServiceForm({ ...serviceForm, processSteps: updated });
                      }}
                      placeholder="Step description..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {modalTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-content-muted">
                  Service-specific questions and transparent answers.
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setServiceForm({
                      ...serviceForm,
                      faqs: [...serviceForm.faqs, { question: '', answer: '' }],
                    })
                  }
                  className="text-xs font-bold text-primary hover:underline"
                >
                  + Add FAQ
                </button>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {serviceForm.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-light border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-900">Question #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...serviceForm.faqs];
                          updated.splice(idx, 1);
                          setServiceForm({ ...serviceForm, faqs: updated });
                        }}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...serviceForm.faqs];
                        updated[idx].question = e.target.value;
                        setServiceForm({ ...serviceForm, faqs: updated });
                      }}
                      placeholder="e.g. How quickly will we see growth?"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...serviceForm.faqs];
                        updated[idx].answer = e.target.value;
                        setServiceForm({ ...serviceForm, faqs: updated });
                      }}
                      placeholder="Direct, honest response..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SEO */}
          {modalTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Meta Title Tag
                </label>
                <input
                  type="text"
                  value={serviceForm.seo.title}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      seo: { ...serviceForm.seo, title: e.target.value },
                    })
                  }
                  placeholder="e.g. Social Media Marketing (SMM) Services | DigiBuddy4U"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Meta Description Tag
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.seo.metaDescription}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      seo: { ...serviceForm.seo, metaDescription: e.target.value },
                    })
                  }
                  placeholder="Short 150-160 character description for Google search snippets..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  SEO Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={serviceForm.seo.keywords}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      seo: { ...serviceForm.seo, keywords: e.target.value },
                    })
                  }
                  placeholder="e.g. social media marketing, SMM agency, instagram management"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary/90 transition-colors shadow-xs"
            >
              {isSaving ? 'Saving Changes...' : editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ======================================================== */}
      {/* CATEGORY EDIT/CREATE MODAL */}
      {/* ======================================================== */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title={editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g. Cloud Solutions"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">
              Category Slug *
            </label>
            <input
              type="text"
              required
              value={categoryForm.slug}
              onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
              placeholder="e.g. cloud-solutions"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              placeholder="Short description of services under this division..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={categoryForm.displayOrder}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, displayOrder: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Icon (TrendingUp / Code2 / Layers)
              </label>
              <select
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              >
                <option value="TrendingUp">TrendingUp</option>
                <option value="Code2">Code2</option>
                <option value="Layers">Layers</option>
                <option value="Cpu">Cpu</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-navy-900 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={categoryForm.isActive}
              onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
              className="w-4 h-4 text-primary rounded"
            />
            <span>Active Division (Visible in navbar and menus)</span>
          </label>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90"
            >
              Save Category
            </button>
          </div>
        </form>
      </Modal>

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ======================================================== */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              Are you sure you want to delete {deleteTarget.type}{' '}
              <strong>"{deleteTarget.title}"</strong>? This action cannot be undone.
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Yes, Delete Permanently
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
