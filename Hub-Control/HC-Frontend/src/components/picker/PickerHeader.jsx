import React from 'react';
import { User, Power, LogOut } from 'lucide-react';

const PickerHeader = ({ user, isOnline, onToggleStatus, onLogout }) => {
  return (
    <div className="bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{user.name}</h2>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Status Toggle - Large for easy tapping */}
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
        <span className="text-sm font-medium text-slate-600">Availability Status</span>
        <button
          onClick={onToggleStatus}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            isOnline 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-200 text-slate-500'
          }`}
        >
          <Power size={16} />
          {isOnline ? 'ACTIVE' : 'OFFLINE'}
        </button>
      </div>
    </div>
  );
};

export default PickerHeader;