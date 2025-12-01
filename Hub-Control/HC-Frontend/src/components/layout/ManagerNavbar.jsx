import React from 'react';
import { Box } from 'lucide-react';

const ManagerNavbar = ({ onLogout, managerName, storeName }) => {
  return (
    <nav className="w-full h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="w-6 h-6 text-white" />
          </div>
        <span className="text-xl font-bold text-white tracking-tight">HubControl</span>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          {/* FIX: Display dynamic manager name */}
          <p className="text-sm font-medium text-white">manager {managerName}</p>
          
          {/* Optional: Show store name below for context if available */}
          {storeName && (
             <p className="text-xs text-slate-400">{storeName}</p>
          )}
        </div>
        <button 
          onClick={onLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ManagerNavbar;