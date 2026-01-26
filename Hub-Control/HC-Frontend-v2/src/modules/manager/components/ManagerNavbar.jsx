import React from 'react';
import { LogOut, Store, Bell, Menu, User } from 'lucide-react';

const ManagerNavbar = ({ managerName, storeName, onLogout, onToggleSidebar }) => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 py-3 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center">
        
        {/* Left: Branding & Store Info */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden text-slate-600 dark:text-slate-400"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              HubControl <span className="text-blue-600 text-sm font-normal">Manager</span>
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              <Store size={12} />
              <span>{storeName || 'No Store Selected'}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-900 dark:text-white">{managerName || 'Manager'}</div>
              <div className="text-xs text-slate-500">Store Manager</div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
               <User size={18} />
            </div>

            <button 
              onClick={onLogout}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-1"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNavbar;