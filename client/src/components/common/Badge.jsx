import React from 'react';

export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
}) {
  const variantStyles = {
    blue: 'bg-primary/10 text-primary border-primary/20',
    cyan: 'bg-cyan-accent/15 text-navy-900 border-cyan-accent/30',
    yellow: 'bg-accent-yellow/20 text-navy-900 border-accent-yellow/40',
    navy: 'bg-navy-900 text-white border-navy-800',
    outline: 'bg-transparent text-content-muted border-slate-300',
    slate: 'bg-slate-100 text-content-dark border-slate-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-300/80',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.blue} ${className}`}
    >
      {children}
    </span>
  );
}
