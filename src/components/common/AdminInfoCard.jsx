import React, { useState } from 'react';
import { Info, HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function AdminInfoCard({
  title,
  children,
  badge = 'Admin Guide',
  defaultExpanded = true,
  variant = 'blue'
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const variantStyles = {
    blue: {
      bg: 'bg-blue-50/70 border-blue-200/80',
      text: 'text-blue-900',
      badge: 'bg-blue-100/80 text-blue-800 border-blue-300/60',
      icon: 'text-blue-600',
    },
    amber: {
      bg: 'bg-amber-50/70 border-amber-200/80',
      text: 'text-amber-900',
      badge: 'bg-amber-100/80 text-amber-800 border-amber-300/60',
      icon: 'text-amber-600',
    },
    indigo: {
      bg: 'bg-indigo-50/70 border-indigo-200/80',
      text: 'text-indigo-900',
      badge: 'bg-indigo-100/80 text-indigo-800 border-indigo-300/60',
      icon: 'text-indigo-600',
    },
    slate: {
      bg: 'bg-slate-50 border-slate-200',
      text: 'text-slate-800',
      badge: 'bg-slate-200 text-slate-700 border-slate-300',
      icon: 'text-slate-600',
    }
  }[variant] || variantStyles.blue;

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${variantStyles.bg}`}>
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-white/80 shadow-sm">
            <Info className={`w-4 h-4 ${variantStyles.icon}`} />
          </div>
          <span className="text-xs font-bold text-slate-900 tracking-tight">{title}</span>
          {badge && (
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${variantStyles.badge}`}>
              {badge}
            </span>
          )}
        </div>

        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          aria-label="Toggle explanation"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className={`mt-3 text-xs leading-relaxed ${variantStyles.text} animate-fade-in pt-3 border-t border-black/5`}>
          {children}
        </div>
      )}
    </div>
  );
}
