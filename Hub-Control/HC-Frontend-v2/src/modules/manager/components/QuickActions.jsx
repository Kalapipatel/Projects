import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import { Users, ClipboardList, BarChart2, Archive } from 'lucide-react';

const QuickActions = ({ storeId }) => {
  const navigate = useNavigate();

  const actions = [
    { label: "Manage Pickers", icon: Users, color: "bg-purple-500", path: 'manage-pickers' },
    { label: "Inventory", icon: Archive, color: "bg-orange-500", path: 'inventory' },
    { label: "Order Queue", icon: ClipboardList, color: "bg-blue-500", path: 'order-queue' },
    { label: "Performance", icon: BarChart2, color: "bg-emerald-500", path: 'performance' }, 
  ];

  const handleNav = (path) => {
    if (!storeId) return alert("Please select a store first.");
    navigate(`/manager/${storeId}/${path}`);
  };

  return (
    <DashboardCard title="Quick Actions">
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={() => handleNav(action.path)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group shadow-sm"
          >
            <div className={`p-3 rounded-full ${action.color} bg-opacity-10 mb-2 group-hover:scale-110 transition-transform`}>
              <action.icon size={20} className={`${action.color.replace('bg-', 'text-')}`} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
};

export default QuickActions;