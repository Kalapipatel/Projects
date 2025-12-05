import React from 'react';

const PickerStats = ({ stats, theme }) => {
  const isDark = theme === 'dark';
  
  const cardBase = `flex flex-col items-center justify-center p-3 rounded-2xl border backdrop-blur-sm transition-colors duration-300`;
  const darkStyle = `bg-slate-900/50 border-slate-800`;
  const lightStyle = `bg-white border-slate-200 shadow-sm`;

  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-4">
      <div className={`${cardBase} ${isDark ? darkStyle : lightStyle}`}>
        <div className="text-2xl font-bold text-blue-500">{stats.assigned}</div>
        <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Assigned</div>
      </div>
      
      <div className={`${cardBase} ${isDark ? darkStyle : lightStyle}`}>
        <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
        <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Pending</div>
      </div>
      
      <div className={`${cardBase} ${isDark ? darkStyle : lightStyle}`}>
        <div className="text-2xl font-bold text-emerald-500">{stats.completed}</div>
        <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Done</div>
      </div>
    </div>
  );
};

export default PickerStats;