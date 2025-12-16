import React, { useState } from 'react';
import { LogOut, Moon, Sun, Bell, User, Box, X } from 'lucide-react';

const AdminNavbar = ({ theme, toggleTheme, onNavigate, alerts = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isDark = theme === 'dark';

  const handleLogout = () => {
    localStorage.clear();
    onNavigate('login'); 
  };

  return (
    <nav className="w-full h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
      
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Box className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">HubControl</h1>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Super Admin</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-all ${showNotifications 
              ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-white' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
          >
            <Bell size={20} />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            )}
          </button>

          {/* Alert Dropdown Logic */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">System Alerts</h3>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X size={16} /></button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">No active alerts</div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="p-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 items-start cursor-pointer">
                       <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                          alert.type === 'critical' ? 'bg-red-500' : 
                          alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                       }`}></div>
                       <div>
                         <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{alert.msg}</p>
                         <span className="text-xs text-slate-400 mt-1 block">Just now</span>
                       </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
                <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View Full History</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Administrator</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">System Owner</p>
          </div>
          <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <User size={18} />
          </div>
        </div>

        <button onClick={handleLogout} className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;