import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Lock,
  User,
  Phone,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Clock,
  PauseCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { BRAND } from '../../utils/brandConstants';

export default function CustomerAuthModal() {
  const {
    authModalOpen,
    authModalTargetSlug,
    authModalAutoClose,
    closeAuthModal,
    login,
    register,
    trackEvent,
  } = useCustomerAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Handle auto-close timer if specified
  useEffect(() => {
    if (!authModalOpen) {
      setCountdown(null);
      setIsPaused(false);
      return;
    }

    if (typeof authModalAutoClose === 'number' && authModalAutoClose > 0) {
      setCountdown(authModalAutoClose);
      setIsPaused(false);
    } else {
      setCountdown(null);
      setIsPaused(false);
    }
  }, [authModalOpen, authModalAutoClose]);

  useEffect(() => {
    if (!authModalOpen || countdown === null || isPaused) return;

    if (countdown <= 0) {
      closeAuthModal();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          closeAuthModal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [authModalOpen, countdown, isPaused, closeAuthModal]);

  const handleInputFocus = () => {
    if (authModalAutoClose && !isPaused) {
      setIsPaused(true);
    }
  };

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password.');
      return;
    }

    if (isRegister && !formData.name) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        trackEvent('signup_started', { slug: authModalTargetSlug });
        await register(
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            businessName: formData.businessName,
            password: formData.password,
          },
          authModalTargetSlug
        );
      } else {
        await login(formData.email, formData.password, authModalTargetSlug);
      }

      closeAuthModal();

      if (authModalTargetSlug) {
        navigate(`/packages/${authModalTargetSlug}`);
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const progressPercent =
    authModalAutoClose && countdown !== null
      ? Math.max(0, Math.min(100, (countdown / authModalAutoClose) * 100))
      : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xl animate-in fade-in duration-200 select-none overflow-y-auto"
      onClick={closeAuthModal}
    >
      {/* Wrapper to allow top avatar and bottom hanging button to protrude cleanly */}
      <div
        className="w-full max-w-[390px] sm:max-w-[420px] relative z-10 my-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* OVERLAPPING AVATAR CIRCLE (Exact Reference Design) */}
        {/* ======================================================== */}
        <div className="absolute -top-13 sm:-top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="w-26 h-26 sm:w-28 sm:h-28 rounded-full bg-[#081830] border-[3px] border-white/70 shadow-[0_15px_30px_rgba(8,24,48,0.45)] flex items-center justify-center transition-transform hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-13 h-13 sm:w-14 sm:h-14 text-white"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FROSTED GLASS MAIN CARD */}
        {/* ======================================================== */}
        <div className="rounded-[38px] bg-gradient-to-b from-[#FAF8FC]/96 via-[#F1F0F7]/94 to-[#E6E5EF]/92 backdrop-blur-2xl border border-white/85 shadow-[0_30px_70px_-15px_rgba(3,10,25,0.6)] pt-18 sm:pt-20 pb-9 px-7 sm:px-9 relative overflow-visible">
          {/* Close Button (X) */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 hover:text-navy-950 flex items-center justify-center transition-colors shadow-xs z-30"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Timed Auto-close Progress Bar (if countdown active) */}
          {authModalAutoClose && (
            <div className="mb-4 rounded-xl overflow-hidden bg-slate-200/80 border border-slate-300/60 text-[11px]">
              <div
                className="h-1 bg-gradient-to-r from-primary to-accent-yellow transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
              <div className="px-3 py-1.5 flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    Auto-closing in <strong className="text-primary font-mono">{countdown}s</strong>
                  </span>
                </div>
                {!isPaused ? (
                  <button
                    type="button"
                    onClick={() => setIsPaused(true)}
                    className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <PauseCircle className="w-3 h-3" />
                    <span>Keep Open</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600">Paused</span>
                )}
              </div>
            </div>
          )}

          {/* Tab Switcher: Log In | Create Free Account */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-2xl mb-5 border border-slate-300/40">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
                if (authModalAutoClose) setIsPaused(true);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-heading font-extrabold rounded-xl transition-all ${
                !isRegister
                  ? 'bg-white text-[#0A1A33] shadow-md'
                  : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError('');
                if (authModalAutoClose) setIsPaused(true);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-heading font-extrabold rounded-xl transition-all ${
                isRegister
                  ? 'bg-white text-[#0A1A33] shadow-md'
                  : 'text-slate-600 hover:text-navy-950'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field: Full Name (Only when registering) */}
            {isRegister && (
              <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40 animate-in fade-in">
                <div className="w-13 sm:w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onFocus={handleInputFocus}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 px-4 py-3 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
                />
              </div>
            )}

            {/* Field: Email ID */}
            <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40">
              <div className="w-13 sm:w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <input
                type="email"
                required
                placeholder="Email ID"
                value={formData.email}
                onFocus={handleInputFocus}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 px-4 py-3 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
              />
            </div>

            {/* Field: Phone / WhatsApp (Only when registering) */}
            {isRegister && (
              <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40 animate-in fade-in">
                <div className="w-13 sm:w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  value={formData.phone}
                  onFocus={handleInputFocus}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 px-4 py-3 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
                />
              </div>
            )}

            {/* Field: Password */}
            <div className="rounded-xl overflow-hidden flex items-stretch shadow-xs border border-[#1b3454]/20 relative transition-all focus-within:ring-2 focus-within:ring-[#0866F5]/40">
              <div className="w-13 sm:w-14 bg-[#0A1A33] text-white flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder={isRegister ? 'Password (min. 6 chars)' : 'Password'}
                value={formData.password}
                onFocus={handleInputFocus}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex-1 bg-[#203D61] text-white placeholder:text-slate-300/80 pl-4 pr-11 py-3 text-sm font-medium focus:outline-none focus:bg-[#25466e] transition-colors"
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

            {/* Options Row: Remember Me & Forgot Password (Log In Mode) */}
            {!isRegister ? (
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
                  href={`https://wa.me/${BRAND.phoneRaw}?text=Hi%20DigiBuddy4U%2C%20I%20need%20assistance%20resetting%20my%20account%20password.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#0A1A33] transition-colors font-semibold"
                >
                  Forgot Password?
                </a>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 pt-0.5 text-center">
                By creating an account, you agree to our Terms of Service & Privacy Policy.
              </div>
            )}

            {/* ======================================================== */}
            {/* HANGING TIERED "LOGIN" BUTTON (Exact Reference Design) */}
            {/* ======================================================== */}
            <div className="flex justify-center -mb-15 sm:-mb-16 pt-4 sm:pt-5">
              <button
                type="submit"
                disabled={loading}
                className="w-[72%] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#5B79A6] via-[#718EB7] to-[#5B79A6] hover:from-[#6687B5] hover:to-[#6687B5] text-white font-heading font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_12px_25px_-4px_rgba(20,45,75,0.45)] hover:shadow-[0_16px_30px_-4px_rgba(20,45,75,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-white/30"
              >
                {loading
                  ? 'PROCESSING...'
                  : isRegister
                  ? 'CREATE ACCOUNT'
                  : 'LOGIN'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Trust Badges under the Card */}
        <div className="mt-9 flex items-center justify-center gap-4 text-[11px] text-white/80">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure 256-bit SSL</span>
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent" />
            <span>100% Privacy Protected</span>
          </span>
        </div>
      </div>
    </div>
  );
}
