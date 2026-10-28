import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue', subtitle, onClick }) {
  const colorStyles = {
    blue: 'bg-primary/10 text-primary border-primary/20',
    cyan: 'bg-cyan-accent/20 text-cyan-hover border-cyan-accent/30',
    yellow: 'bg-accent-yellow/20 text-accent-yellowHover border-accent-yellow/40',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card-soft transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-primary/50 hover:shadow-card-hover' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
            {title}
          </span>
          <h3 className="text-3xl font-heading font-black text-navy-900 mt-2">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-content-muted mt-1">{subtitle}</p>
          )}
        </div>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs ${colorStyles[color] || colorStyles.blue}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
