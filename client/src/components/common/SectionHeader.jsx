import React from 'react';
import Badge from './Badge';

export default function SectionHeader({
  badge,
  badgeVariant = 'blue',
  title,
  titleHighlight,
  description,
  align = 'center',
  theme = 'light', // 'light' or 'dark'
  className = '',
}) {
  const isDark = theme === 'dark';
  const isCentered = align === 'center';

  return (
    <div
      className={`max-w-4xl xl:max-w-5xl ${isCentered ? 'mx-auto text-center' : 'text-left'} mb-8 sm:mb-10 md:mb-12 ${className}`}
    >
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] font-heading break-words ${
          isDark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}{' '}
        {titleHighlight && (
          <span
            className={
              isDark
                ? 'text-cyan-accent bg-clip-text text-transparent bg-gradient-to-r from-cyan-accent to-accent-yellow'
                : 'text-primary'
            }
          >
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed break-words ${
            isDark ? 'text-slate-300' : 'text-content-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
