import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Mail, RotateCcw, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import { BRAND } from '../../utils/brandConstants';
import { submitEnquiry } from '../../utils/api';

export default function ContactForm({ prefilledService = '', defaultPlan = '' }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service') || prefilledService || '';
  const initialPlan = searchParams.get('plan') || defaultPlan || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    service: initialService || (initialPlan ? `Pricing Plan: ${initialPlan}` : ''),
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null); // { success: boolean, enquiryId?: string, offlineFallback?: boolean, message?: string, data: {} }

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid business email address.';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 8) {
      newErrors.phone = 'Please provide a valid contact / WhatsApp number.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select the primary service of interest.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief overview of your business goals (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Connect to backend API
      const res = await submitEnquiry(formData);
      setSubmissionResult({
        success: true,
        enquiryId: res.enquiryId,
        offlineFallback: false,
        message: res.message || 'Enquiry successfully logged in database.',
        data: { ...formData },
      });
    } catch (err) {
      // If backend API is not running or database is not connected,
      // clearly report the offline state and offer immediate WhatsApp/Email handoff
      // WITHOUT pretending data was saved to a database that didn't respond!
      setSubmissionResult({
        success: false,
        offlineFallback: true,
        message: 'Could not connect to automated API server right now.',
        errorDetail: err.message,
        data: { ...formData },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      brandName: '',
      service: '',
      message: '',
    });
    setErrors({});
  };

  const submittedData = submissionResult?.data;

  // Build direct WhatsApp message
  const whatsappMessage = submittedData
    ? encodeURIComponent(
        `Hi DigiBuddy4U,\n\nMy name is ${submittedData.name}${submittedData.brandName ? ` from ${submittedData.brandName}` : ''}.\nEmail: ${submittedData.email}\nPhone: ${submittedData.phone}\nService Interested: ${submittedData.service}\n\nProject Notes:\n${submittedData.message}`
      )
    : '';

  const emailSubject = encodeURIComponent(`Growth Inquiry: ${submittedData?.name || 'New Client'}`);
  const emailBody = submittedData
    ? encodeURIComponent(
        `Hello DigiBuddy4U Team,\n\nName: ${submittedData.name}\nBrand/Company: ${submittedData.brandName || 'N/A'}\nEmail: ${submittedData.email}\nPhone: ${submittedData.phone}\nService of Interest: ${submittedData.service}\n\nMessage:\n${submittedData.message}`
      )
    : '';

  if (submissionResult) {
    const isApiSuccess = submissionResult.success && !submissionResult.offlineFallback;

    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card-soft text-center space-y-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ${
            isApiSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isApiSuccess ? (
            <CheckCircle2 className="w-9 h-9" />
          ) : (
            <AlertCircle className="w-9 h-9" />
          )}
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy-900">
            {isApiSuccess ? 'Enquiry Logged Successfully!' : 'Enquiry Ready to Forward'}
          </h3>
          <p className="mt-2 text-content-muted text-sm sm:text-base max-w-lg mx-auto">
            Thank you, <strong className="text-navy-900">{submittedData.name}</strong>.
            {isApiSuccess
              ? ' Your project enquiry has been securely logged into our agency admin dashboard.'
              : ' Your details have been formatted and verified.'}
          </p>
        </div>

        {/* Database state notice */}
        {isApiSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs sm:text-sm text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-950">Logged in Agency CRM</span>
              <p>Reference ID: {submissionResult.enquiryId}. Our team typically reviews incoming leads in under 2 hours.</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-left text-xs sm:text-sm text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Automated API Server Offline
            </span>
            <p>
              Our backend server could not be reached directly ({submissionResult.errorDetail}). To guarantee your message reaches our strategists without delay, please send it directly via <strong>WhatsApp</strong> or <strong>Email</strong> below:
            </p>
          </div>
        )}

        {/* Action triggers */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={`https://wa.me/916352478028?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#1EBE5D] transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp (+91 63524 78028)</span>
          </a>

          <a
            href={`mailto:${BRAND.email}?subject=${emailSubject}&body=${emailBody}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 text-white font-bold text-sm sm:text-base hover:bg-navy-800 transition-all shadow-md hover:shadow-lg"
          >
            <Mail className="w-5 h-5" />
            <span>Send Email ({BRAND.email})</span>
          </a>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-navy-900 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card-soft space-y-5"
    >
      <div className="border-b border-slate-100 pb-4 mb-2">
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy-900">
          Tell Us About Your Brand
        </h3>
        <p className="text-xs sm:text-sm text-content-muted mt-1">
          Fill in your details below and we will outline a custom digital roadmap for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>}
        </div>

        {/* Business Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rahul@brand.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone / WhatsApp */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
              errors.phone
                ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
        </div>

        {/* Brand / Company Name */}
        <div>
          <label htmlFor="brandName" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
            Brand Name / Instagram Handle
          </label>
          <input
            id="brandName"
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="e.g. @yourbrand or MyCompany"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-primary/20 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Service of Interest */}
      <div>
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
          Service of Interest <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 bg-white ${
            errors.service
              ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
              : 'border-slate-200 focus:border-primary focus:ring-primary/20'
          }`}
        >
          <option value="">Select a service...</option>
          <option value="Social Media Management">Social Media Management</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Reels & Video Content">Reels and Short-Form Video Content</option>
          <option value="Digital Advertising">Digital Advertising (Meta & Google Ads)</option>
          <option value="Brand Strategy & Branding">Brand Strategy and Branding</option>
          <option value="Social Media Strategy">Social Media Strategy Audit</option>
          <option value="All-in-One Digital Growth">All-in-One Digital Growth Package</option>
          <option value="Package: Social Media Starter (₹10,000/mo)">Social Media Starter (₹10,000 / Month)</option>
          <option value="Package: Business Startup Setup (₹15,000 One-Time)">Business Startup Setup (₹15,000 / One-Time)</option>
          <option value="Package: Business Growth (₹20,000/mo)">Business Growth (₹20,000 / Month - Most Popular)</option>
          <option value="Package: Premium Brand Scale (₹80,000/campaign)">Premium Brand Scale (₹80,000 / Campaign)</option>
          <option value="Add-On: AI & Reel Editing (₹5,000/package)">Add-On: AI & Reel Editing (₹5,000 / Package)</option>
          <option value="Add-On: WhatsApp Business Setup (₹1,000 One-Time)">Add-On: WhatsApp Business Setup (₹1,000 / One-Time)</option>
        </select>
        {errors.service && <p className="text-xs text-red-600 mt-1 font-medium">{errors.service}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
          Project Goals & Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your current marketing challenges, current followers, or target timeline..."
          className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
            errors.message
              ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
              : 'border-slate-200 focus:border-primary focus:ring-primary/20'
          }`}
        />
        {errors.message && <p className="text-xs text-red-600 mt-1 font-medium">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="yellow"
        size="lg"
        isLoading={isSubmitting}
        icon={Send}
        className="w-full justify-center shadow-md hover:shadow-lg mt-2"
      >
        Submit Project Inquiry
      </Button>

      <p className="text-center text-xs text-content-muted">
        Direct privacy guaranteed. We do not spam. Reach us immediately at{' '}
        <a href={`tel:${BRAND.phone}`} className="text-primary font-semibold hover:underline">
          {BRAND.phone}
        </a>
      </p>
    </form>
  );
}
