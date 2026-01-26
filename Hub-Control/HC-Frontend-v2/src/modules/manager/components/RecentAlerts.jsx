import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import DashboardCard from './DashboardCard'; // Adjust path to global UI

const getIcon = (type) => {
  switch (type) {
    case 'critical': return <AlertCircle className="text-red-500" size={18} />;
    case 'warning': return <AlertTriangle className="text-amber-500" size={18} />;
    case 'success': return <CheckCircle className="text-emerald-500" size={18} />;
    default: return <Info className="text-blue-500" size={18} />;
  }
};

const RecentAlerts = ({ alerts = [] }) => {
  return (
    <DashboardCard title="Recent Alerts" className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2 max-h-[300px]">
        {alerts.length === 0 ? (
          <div className="text-center text-slate-500 py-8 text-sm">No new alerts</div>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="mt-0.5 flex-shrink-0">
                {getIcon(alert.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                  {alert.message}
                </p>
                <span className="text-xs text-slate-400 mt-1 block">
                  {alert.time || 'Just now'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
};

export default RecentAlerts;