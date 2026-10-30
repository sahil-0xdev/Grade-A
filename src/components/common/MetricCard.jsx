import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  colorScheme = 'blue',
  onClick,
  badge
}) {
  const schemeStyles = {
    orange: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-[#F9870D]',
      iconBg: 'bg-[#F9870D]/10 text-[#F9870D]',
      badge: 'bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/30',
      arrowHover: 'group-hover:text-[#F9870D]'
    },
    blue: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-[#F9870D]',
      iconBg: 'bg-[#F9870D]/10 text-[#F9870D]',
      badge: 'bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/30',
      arrowHover: 'group-hover:text-[#F9870D]'
    },
    rose: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-rose-400',
      iconBg: 'bg-rose-50 text-rose-600',
      badge: 'bg-rose-50 text-rose-700 border border-rose-200/60',
      arrowHover: 'group-hover:text-rose-600'
    },
    amber: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-amber-400',
      iconBg: 'bg-amber-50 text-amber-600',
      badge: 'bg-amber-50 text-amber-700 border border-amber-200/60',
      arrowHover: 'group-hover:text-amber-600'
    },
    emerald: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-emerald-400',
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
      arrowHover: 'group-hover:text-emerald-600'
    },
    indigo: {
      bg: 'bg-white',
      border: 'border-slate-200/90 hover:border-[#F9870D]',
      iconBg: 'bg-[#F9870D]/10 text-[#F9870D]',
      badge: 'bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/30',
      arrowHover: 'group-hover:text-[#F9870D]'
    }
  }[colorScheme] || {
    bg: 'bg-white',
    border: 'border-slate-200/90 hover:border-[#F9870D]',
    iconBg: 'bg-[#F9870D]/10 text-[#F9870D]',
    badge: 'bg-[#F9870D]/10 text-[#F9870D] border border-[#F9870D]/30',
    arrowHover: 'group-hover:text-[#F9870D]'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-5 transition-all duration-200 ${schemeStyles.bg} ${schemeStyles.border} ${
        onClick
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-card-hover group active:translate-y-0'
          : 'shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${schemeStyles.badge}`}>
              {badge}
            </span>
          )}
          {Icon && (
            <div className={`p-2.5 rounded-xl ${schemeStyles.iconBg} transition-transform group-hover:scale-110 duration-200`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        {onClick && (
          <span className={`text-xs font-semibold text-slate-400 ${schemeStyles.arrowHover} inline-flex items-center gap-0.5 transition-colors`}>
            View list
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-2 text-xs text-slate-500 font-medium">
          {subtext}
        </div>
      )}
    </div>
  );
}
