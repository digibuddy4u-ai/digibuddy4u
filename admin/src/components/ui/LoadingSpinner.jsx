import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading data...', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-3`} />
      {text && <p className="text-sm font-medium text-content-muted">{text}</p>}
    </div>
  );
}
