import React from 'react';

export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6" role="status">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-slate-200 border-t-primary animate-spin`}
      />
      {text && <span className="text-xs sm:text-sm font-medium text-content-muted">{text}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
