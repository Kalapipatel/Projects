import React from 'react';
import { Loader2 } from 'lucide-react';

export const NavButton = ({ active, onClick, icon, label, badgeCount, loading, isDark }) => (
  <button 
    onClick={onClick}
    className={`
      relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all active:scale-95
      ${active
        ? 'bg-blue-600 text-white border-blue-500'
        : (isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600')
      }
    `}
  >
    {loading ? <Loader2 className="animate-spin" size={20}/> : icon}
    <span className="font-bold text-xs text-center leading-tight">{label}</span>
    {badgeCount > 0 && (
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
        {badgeCount}
      </span>
    )}
  </button>
);

export const EmptyState = ({ icon, title, subtitle, isDark }) => (
  <div className={`h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-6 ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-300 bg-slate-50'}`}>
    <div className={`p-3 rounded-full ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-slate-300'}`}>
      {icon}
    </div>
    <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{title}</p>
    {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
  </div>
);