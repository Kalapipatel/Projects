import React from 'react';

const variants = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  neutral: 'bg-slate-700/50 text-slate-300 border-slate-600',
};

const StatusBadge = ({ status, type = 'neutral' }) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[type]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;