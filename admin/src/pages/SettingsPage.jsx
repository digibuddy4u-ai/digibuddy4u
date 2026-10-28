import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api/client';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    whatsappUrl: '',
    address: '',
    footerBio: '',
    showFaqs: true,
    socials: {
      instagram: '',
      linkedin: '',
      facebook: '',
      whatsapp: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await api.get('/settings/admin');
        if (res.success && res.data) {
          setFormData({
            businessName: res.data.businessName || 'DigiBuddy4U',
            tagline: res.data.tagline || 'Your Digital Growth Partner',
            email: res.data.email || 'info@digibuddy4u.com',
            phone: res.data.phone || '+91 63524 78028',
            whatsappNumber: res.data.whatsappNumber || '+91 63524 78028',
            whatsappUrl: res.data.whatsappUrl || '',
            address: res.data.address || 'India',
            footerBio: res.data.footerBio || '',
            showFaqs: res.data.showFaqs !== false,
            socials: {
              instagram: res.data.socials?.instagram || '',
              linkedin: res.data.socials?.linkedin || '',
              facebook: res.data.socials?.facebook || '',
              whatsapp: res.data.socials?.whatsapp || '',
            },
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setSavedSuccess(false);

      const res = await api.put('/settings', formData);
      if (res.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading website settings..." />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
          Website & Agency Settings
        </h1>
        <p className="text-sm text-content-muted mt-1">
          Configure agency contact numbers, WhatsApp links, and public branding parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Website settings updated and saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card-soft space-y-4">
          <h2 className="text-base font-bold font-heading text-navy-900 border-b border-slate-100 pb-3">
            Agency Identity & Tagline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                Agency Brand Name
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
              Footer Bio Description
            </label>
            <textarea
              rows={2}
              value={formData.footerBio}
              onChange={(e) => setFormData({ ...formData, footerBio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card-soft space-y-4">
          <h2 className="text-base font-bold font-heading text-navy-900 border-b border-slate-100 pb-3">
            Contact Channels & WhatsApp Routing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                Official Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                Direct Phone
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                Office Location / Region
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
              WhatsApp Direct Click Link
            </label>
            <input
              type="text"
              value={formData.whatsappUrl}
              onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card-soft space-y-4">
          <h2 className="text-base font-bold font-heading text-navy-900 border-b border-slate-100 pb-3">
            Social Media Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">Instagram</label>
              <input
                type="text"
                value={formData.socials.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-navy-900 mb-1">LinkedIn</label>
              <input
                type="text"
                value={formData.socials.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Homepage Sections Visibility */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card-soft space-y-4">
          <h2 className="text-base font-bold font-heading text-navy-900 border-b border-slate-100 pb-3">
            Homepage Section Visibility
          </h2>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <div className="text-sm font-bold text-navy-900">FAQ Section (Frequently Asked Questions)</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Enable or disable the FAQ block on the website. If turned off, it will be completely hidden.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showFaqs !== false}
                onChange={(e) => setFormData({ ...formData, showFaqs: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
