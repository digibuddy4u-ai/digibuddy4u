import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  external = false,
  ...rest
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold font-sans rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] select-none tracking-[-0.01em]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5 gap-2',
    lg: 'text-base sm:text-lg px-7 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-primary',
    yellow: 'bg-accent-yellow text-navy-900 font-bold hover:bg-accent-yellowHover shadow-md hover:shadow-lg hover:shadow-accent-yellow/30 focus-visible:ring-accent-yellow',
    cyan: 'bg-cyan-accent text-navy-950 font-bold hover:bg-cyan-hover shadow-md hover:shadow-cyan-accent/30 focus-visible:ring-cyan-accent',
    secondary: 'bg-white text-navy-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm focus-visible:ring-navy-900',
    outlineNavy: 'bg-transparent text-navy-900 border-2 border-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-900',
    outlineWhite: 'bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-navy-900 focus-visible:ring-white',
    ghost: 'bg-transparent text-content-dark hover:bg-slate-100 focus-visible:ring-slate-300',
    ghostWhite: 'bg-transparent text-white/90 hover:bg-white/10 hover:text-white focus-visible:ring-white/40',
  };

  const combinedClasses = `
    ${baseStyles}
    ${sizeStyles[size] || sizeStyles.md}
    ${variantStyles[variant] || variantStyles.primary}
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `.trim();

  const iconElement = Icon ? (
    typeof Icon === 'function' || typeof Icon === 'object' ? (
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
    ) : (
      Icon
    )
  ) : null;

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
      {!isLoading && Icon && iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && iconElement}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedClasses}
      {...rest}
    >
      {content}
    </button>
  );
}
