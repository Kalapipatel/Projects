import React, { useState, useEffect } from 'react';
import DashboardCard from '../ui/DashboardCard';
import { Package, Clock, CheckCircle, Loader } from 'lucide-react';

// FIX: Accept props (inputs) from the parent
const OrderTabsCard = ({ pending = 0, progress = 0, completed = 0, total = 0 }) => {
  const [activeTab, setActiveTab] = useState('pending');

  // FIX: Map the incoming props to the internal data structure
  const data = {
    pending: { 
        count: pending, 
        label: "Pending Batches", 
        icon: Clock, 
        color: "text-amber-400", 
        // Note: Your current API only sends counts, not the list of rows. 
        // So we leave this empty for now to match the "0" count correctly.
        list: [] 
    },
    progress: { 
        count: progress, 
        label: "Picking Now", 
        icon: Loader, 
        color: "text-blue-400", 
        list: [] 
    },
    completed: { 
        count: completed, 
        label: "Completed Today", 
        icon: CheckCircle, 
        color: "text-emerald-400", 
        list: [] 
    },
    total: { 
        count: total, 
        label: "Total Orders", 
        icon: Package, 
        color: "text-slate-200", 
        list: [] 
    }
  };

  const current = data[activeTab];
  const Icon = current.icon;

  return (
    <DashboardCard className="h-full">
      {/* The Tab Switcher */}
      <div className="bg-slate-800/50 p-1 rounded-xl flex mb-6">
        {Object.keys(data).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize
              ${activeTab === key 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="text-center py-4">
        <div className={`inline-flex items-center justify-center p-4 rounded-full bg-slate-800 mb-4 ${current.color} bg-opacity-10`}>
          <Icon size={32} className={current.color} />
        </div>
        
        {/* FIX: Animated update effect key */}
        <h2 key={current.count} className="text-5xl font-bold text-white mb-2 tracking-tight animate-in fade-in zoom-in duration-300">
            {current.count}
        </h2>
        
        <p className="text-slate-400 font-medium">{current.label}</p>
      </div>

      {/* Mini List Preview */}
      <div className="mt-6 border-t border-slate-800 pt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Latest {activeTab}
        </h4>
        <div className="space-y-2">
          {current.list.length > 0 ? current.list.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-slate-300 bg-slate-800/30 p-2 rounded">
              <span>{item.id}</span>
              <span className="opacity-60">{item.time || item.picker}</span>
            </div>
          )) : (
             <div className="text-sm text-slate-500 italic">
                {current.count === 0 ? "No orders in this category." : "View details in Reports."}
             </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};

export default OrderTabsCard;