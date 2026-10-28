import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Lock,
  Mail,
  Phone,
  Building,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  TrendingUp,
  Layers,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function CustomerRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, trackEvent } = useCustomerAuth();

  const redirectTarget = searchParams.get('redirect') || '/customer/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      trackEvent('signup_started');
      await register(formData);
      navigate(redirectTarget);
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Create Client Account — DigiBuddy4U"
        description="Register your DigiBuddy4U client account to access customized digital marketing strategies, custom software deliverables, and campaign tracking."
      />

      <div className="min-h-screen bg-surface-light flex items-stretch">
        {/* ======================================================== */}
        {/* LEFT COLUMN: CINEMATIC AGENCY BRANDING (Hidden on Mobile) */}
        {/* ======================================================== */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-950 via-[#071A38] to-[#030711] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
          {/* Ambient Lighting Trails */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(8,102,245,0.12),transparent_60%)] pointer-events-none" />

          {/* Top: Logo & Back Link */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center font-heading font-black text-white text-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  DigiBuddy<span className="text-cyan-accent">4U</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1">
                  Client Onboarding
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Middle: Editorial Value Proposition */}
          <div className="relative z-10 my-auto py-12 space-y-8 max-w-xl">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-yellow/20 border border-accent-yellow/30 text-accent-yellow text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Onboarding Fees</span>
              </span>

              <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-heading font-extrabold leading-tight text-white">
                Start Building Your <br />
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  Digital Future Today.
                </span>
              </h1>

              <p className="text-sm xl:text-base text-slate-300 leading-relaxed pt-1">
                Create your client portal account in under 60 seconds. Unlock transparent service specifications, custom growth roadmaps, and instant project tracking.
              </p>
            </div>

            {/* Benefit Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-primary/20 text-cyan-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Full-Funnel Growth Infrastructure
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Data-driven social media management, high-ROAS Meta & Google ads, and custom web software.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-cyan-accent/20 text-cyan-hover flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Transparent Scope & Retainers
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Clear shoot parameters, production days, graphic limits, and zero hidden retainer clauses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Personalized Brand Audit
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Our team conducts a complimentary technical and creative audit for every newly registered client.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Trust & Security */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Grade Security & Data Privacy</span>
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              DigiBuddy4U v2.4
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: REGISTRATION FORM */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md space-y-6 sm:space-y-8">
            {/* Mobile Brand Header */}
            <div className="lg:hidden flex items-center justify-between pb-4 border-b border-slate-200">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-lg">
                  D
                </div>
                <span className="font-heading font-extrabold text-lg text-navy-900">
                  DigiBuddy<span className="text-primary">4U</span>
                </span>
              </Link>
              <Link
                to="/"
                className="text-xs font-semibold text-slate-600 hover:text-navy-900 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </div>

            {/* Form Title */}
            <div className="space-y-2">
              <Badge variant="yellow" size="sm">
                Free Client Registration
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-900">
                Create Your Account
              </h2>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                Join DigiBuddy4U to access customized proposals, real-time project tracking, and dedicated marketing roadmaps.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Phone & Brand Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Brand / Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. RotiWala"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Password <span className="text-red-500">*</span>{' '}
                  <span className="text-[11px] font-normal text-content-muted">(min. 6 chars)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-heading font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Create Free Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Switch to Login */}
              <div className="pt-4 text-center border-t border-slate-100">
                <p className="text-xs sm:text-sm text-content-muted">
                  Already have an account?{' '}
                  <Link
                    to={`/login?redirect=${encodeURIComponent(redirectTarget)}`}
                    className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Sign In Here</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>

              {/* Security Badges */}
              <div className="pt-4 flex items-center justify-center gap-5 text-[11px] text-content-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Protection</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Zero Spam Guarantee</span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
