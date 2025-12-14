import React from 'react';
import { LogOut, Moon, Sun, Bell, User, Box } from 'lucide-react';

const AdminNavbar = ({ theme, toggleTheme, onNavigate }) => {

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    onNavigate('login'); 
  };

  return (
    <nav className="w-full h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
      
      {/* Brand - Matches ManagerNavbar */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Box className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-none">HubControl</h1>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Super Admin</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
        </button>

        <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Administrator</p>
            <p className="text-xs text-slate-400">System Owner</p>
          </div>
          <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 border border-slate-700">
            <User size={18} />
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout} 
          className="ml-2 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;