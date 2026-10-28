import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({
  variant = 'dark', // 'dark' = for light backgrounds, 'light' = for dark backgrounds
  showTagline = false,
  className = '',
  size = 'md',
  useFullImage = false,
  noLink = false,
}) {
  const isLight = variant === 'light';
  const Component = noLink ? 'div' : Link;
  const linkProps = noLink ? {} : { to: '/' };

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  if (useFullImage) {
    return (
      <Component
        {...linkProps}
        className={`inline-block select-none transition-opacity hover:opacity-95 ${className}`}
        aria-label="DigiBuddy4U - Home"
      >
        <img
          src="/logo.jpg"
          alt="DigiBuddy4U - Your Digital Growth Partner"
          className="h-10 md:h-12 w-auto object-contain rounded-lg shadow-xs"
        />
      </Component>
    );
  }

  return (
    <Component
      {...linkProps}
      className={`inline-flex items-center gap-2.5 font-heading tracking-tight select-none group transition-opacity hover:opacity-95 ${className}`}
      aria-label="DigiBuddy4U - Home"
    >
      {/* Official Brand Icon: Speech Bubble + Golden Trend Arrow + Star Sparkle */}
      <div className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-sm flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="db_logo_cyan_blue" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="db_logo_arrow" x1="28" y1="64" x2="72" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>

          {/* Cyan to Blue Rounded Container */}
          <rect width="100" height="100" rx="26" fill="url(#db_logo_cyan_blue)" />

          {/* Golden 4-point Sparkle Star */}
          <path d="M84 15C84 20 87 22.5 91 23.5C87 24.5 84 27 84 32C84 27 81 24.5 77 23.5C81 22.5 84 20 84 15Z" fill="#FDE047" />

          {/* White Speech Bubble with Tail */}
          <path d="M22 36C22 28.268 28.268 22 36 22H68C75.732 22 82 28.268 82 36V52C82 59.732 75.732 66 68 66H37.5L25 76V65C23.15 62.9 22 59.8 22 56V36Z" fill="#FFFFFF" />

          {/* Golden Trending Growth Arrow Inside Bubble */}
          <path d="M33 55.5L45 43.5L53 51.5L67 36.5" stroke="url(#db_logo_arrow)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M57 36.5H67V46.5" stroke="url(#db_logo_arrow)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-bold leading-none ${sizeClasses[size]}`}>
          <span className={isLight ? 'text-white' : 'text-navy-900'}>
            Digi
          </span>
          <span className="text-primary font-extrabold">Buddy</span>
          <span className="text-accent-yellow font-black ml-0.5">4U</span>
        </div>
        {showTagline && (
          <span className={`text-[9.5px] uppercase font-semibold tracking-wider mt-1 ${isLight ? 'text-cyan-accent' : 'text-content-muted'}`}>
            Your Digital Growth Partner
          </span>
        )}
      </div>
    </Component>
  );
}
