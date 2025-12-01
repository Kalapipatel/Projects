import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { Users, ClipboardList, BarChart2, Archive } from 'lucide-react';

// 1. Accept onAction prop
const QuickActions = ({ onAction }) => {
  const actions = [
    // 2. Add a 'view' property that matches the App.js view names
    { label: "Manage Pickers", icon: Users, color: "bg-purple-500", view: 'managePickers' },
    { label: "Inventory", icon: Archive, color: "bg-orange-500", view: 'inventory' },
    { label: "Order Queue", icon: ClipboardList, color: "bg-blue-500", view: 'orderQueue' },
    { label: "Performance", icon: BarChart2, color: "bg-emerald-500", view: 'performance' }, 
  ];

  return (
    <DashboardCard title="Quick Actions">
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            // 3. Trigger the navigation on click
            onClick={() => onAction && onAction(action.view)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all group"
          >
            <div className={`p-3 rounded-full ${action.color} bg-opacity-20 mb-2 group-hover:scale-110 transition-transform`}>
              <action.icon size={20} className="text-white" />
            </div>
            <span className="text-sm font-medium text-slate-300">{action.label}</span>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
};

export default QuickActions;