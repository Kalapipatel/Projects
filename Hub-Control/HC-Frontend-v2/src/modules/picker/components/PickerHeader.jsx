import React from 'react';
import { User, Power, LogOut, Sun, Moon } from 'lucide-react';

const PickerHeader = ({ user, isOnline, onToggleStatus, onLogout, theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`
      sticky top-0 z-30 border-b backdrop-blur-md px-4 py-3 shadow-lg transition-colors duration-300
      ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'bg-white/80 border-slate-200 text-slate-800'}
    `}>
      <div className="flex justify-between items-center">
        {/* Left: User Info */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner
            ${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}
          `}>
            <User size={20} />
          </div>
          <div>
            <h2 className="font-bold leading-tight">{user.name}</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.role}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className={`p-2 rounded-full transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className={`p-2 rounded-full transition-all hover:text-red-500 ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Status Bar (Sub-header) */}
      <div className="mt-4 flex items-center justify-between">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
          isOnline 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
            : isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
        }`}>
           <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
           <span className="text-sm font-medium">{isOnline ? 'Active' : 'Offline'}</span>
        </div>

        <button
          onClick={onToggleStatus}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1
            ${isOnline 
              ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
              : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'}
          `}
        >
          <Power size={12} />
          {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
        </button>
      </div>
    </div>
  );
};

export default PickerHeader;