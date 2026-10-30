import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info, HelpCircle } from 'lucide-react';

export default function RiskBadge({ level, size = 'md', showIcon = true, needsReview = false }) {
  const normalized = (level || 'low').toLowerCase();

  const configs = {
    low: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      label: 'Low Priority'
    },
    medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      label: 'Medium Priority'
    },
    high: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertOctagon,
      label: 'High Priority'
    },
    'insufficient data': {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: HelpCircle,
      label: 'Insufficient Data / Needs Review'
    }
  };

  const current = configs[normalized] || configs.low;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2'
  }[size] || 'text-xs font-medium px-2.5 py-1 gap-1.5';

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center rounded-full border ${current.bg} ${sizeClasses} transition-colors`}
        title={`Support Priority: ${current.label}`}
      >
        {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
        <span>{current.label}</span>
      </span>

      {needsReview && normalized !== 'insufficient data' && (
        <span
          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200"
          title="Single severe signal triggered an educator review flag"
        >
          <Info className="w-3 h-3" />
          <span>Needs Review</span>
        </span>
      )}
    </div>
  );
}
