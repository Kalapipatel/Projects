import React from 'react';

const EmptyState = ({ icon, title, subtitle, isDark }) => (
  <div className={`h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-6 ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-300 bg-slate-50'}`}>
    <div className={`p-3 rounded-full ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-slate-300'}`}>
      {icon}
    </div>
    <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{title}</p>
    {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
  </div>
);

export default EmptyState;