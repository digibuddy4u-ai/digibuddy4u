import React from 'react';

export default function StatusBadge({ status }) {
  const normalized = (status || 'new').toLowerCase();

  const styles = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-emerald-500/10',
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-300 ring-blue-500/10',
    contacted: 'bg-amber-50 text-amber-700 border-amber-300 ring-amber-500/10',
    closed: 'bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/10',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    draft: 'bg-amber-50 text-amber-700 border-amber-300',
  };

  const labels = {
    new: 'New Lead',
    'in-progress': 'In Progress',
    contacted: 'Contacted',
    closed: 'Closed',
    published: 'Published',
    draft: 'Draft',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ring-1 ${
        styles[normalized] || 'bg-slate-100 text-slate-700 border-slate-300'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {labels[normalized] || status}
    </span>
  );
}
