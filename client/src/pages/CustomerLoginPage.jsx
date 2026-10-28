import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, trackEvent } = useCustomerAuth();

  const redirectTarget = searchParams.get('redirect') || '/customer/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      trackEvent('login_completed');
      navigate(redirectTarget);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In — DigiBuddy4U"
        description="Sign in to your DigiBuddy4U customer portal to access real-time marketing analytics, custom software milestones, and project deliverables."
      />

      <div
        className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden select-none"
        style={{
          background: `
            radial-gradient(circle at 12% 18%, rgba(226, 140, 155, 0.88) 0%, transparent 45%),
            radial-gradient(circle at 88% 14%, rgba(78, 91, 138, 0.92) 0%, transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(38, 73, 126, 0.95) 0%, transparent 55%),
            radial-gradient(circle at 15% 85%, rgba(182, 102, 126, 0.88) 0%, transparent 50%),
            linear-gradient(135deg, #2b3956 0%, #152238 100%)
          `,
        }}
      >
        {/* Background Ambient Soft Light Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Main Card Wrapper */}
        <div className="w-full max-w-[390px] sm:max-w-[420px] relative z-10 my-16">
          {/* ======================================================== */}
          {/* OVERLAPPING AVATAR CIRCLE (Exact Reference Design) */}
          {/* ======================================================== */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
            <div className="w-28 h-28 rounded-full bg-[#081830] border-[3px] border-white/60 shadow-[0_15px_30px_rgba(8,24,48,0.4)] flex items-center justify-center transition-transform hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14 text-white"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          {/* ======================================================== */}
          {/* FROSTED GLASS MAIN CARD */}
          {/* ======================================================== */}
          <div className="rounded-[38px] bg-gradient-to-b from-[#FAF8FC]/95 via-[#F1F0F7]/92 to-[#E6E5EF]/90 backdrop-blur-2xl border border-white/80 shadow-[0_30px_70px_-15px_rgba(10,25,50,0.4)] pt-20 pb-10 px-7 sm:px-9 relative overflow-visible">
            {/* Brand Title */}
            <div className="text-center mb-6">
              <h1 className="text-lg font-heading font-extrabold text-[#0A1A33] tracking-tight">
                DigiBuddy<span className="text-[#0866F5]">4U</span>
              </h1>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                Client Portal
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input 1: Email ID */}
              <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40">
                <div className="w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
                />
              </div>

              {/* Input 2: Password */}
              <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 relative transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40">
                <div className="w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 pl-4 pr-11 py-3.5 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 font-medium">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-navy-950">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0A1A33] bg-[#0A1A33] border-slate-300 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="https://wa.me/916352478028?text=Hi%20DigiBuddy4U%2C%20I%20need%20assistance%20resetting%20my%20account%20password."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#0A1A33] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* ======================================================== */}
              {/* HANGING TIERED "LOGIN" BUTTON (Exact Reference Design) */}
              {/* ======================================================== */}
              <div className="flex justify-center -mb-16 pt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-[72%] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#5B79A6] via-[#718EB7] to-[#5B79A6] hover:from-[#6687B5] hover:to-[#6687B5] text-white font-heading font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_12px_25px_-4px_rgba(20,45,75,0.45)] hover:shadow-[0_16px_30px_-4px_rgba(20,45,75,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-white/30"
                >
                  {loading ? 'AUTHENTICATING...' : 'LOGIN'}
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Links: Register & Home */}
          <div className="mt-12 text-center space-y-2">
            <p className="text-xs text-white/90">
              Don’t have an account yet?{' '}
              <Link
                to={`/register?redirect=${encodeURIComponent(redirectTarget)}`}
                className="font-bold text-accent-yellow hover:underline"
              >
                Create Free Account
              </Link>
            </p>
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
