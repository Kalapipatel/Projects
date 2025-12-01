import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import StatusBadge from '../ui/StatusBadge';
import { Bell } from 'lucide-react';

const RecentAlerts = () => {
  const alerts = [
    { msg: "Low Stock: Dairy Milk Silk", type: "error", time: "10m ago" },
    { msg: "Picker 'Rahul' is idle > 15m", type: "warning", time: "32m ago" },
    { msg: "System Maintenance Scheduled", type: "info", time: "2h ago" },
    { msg: "2System Maintenance Scheduled", type: "info", time: "2h ago" },
  ];

  return (
    <DashboardCard 
      title="Live Alerts" 
      action={<button className="text-xs text-blue-400 hover:text-blue-300">View All</button>}
    >
      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-slate-800 pb-3 last:border-0 last:pb-0">
            <Bell size={16} className="text-slate-500 mt-1" />
            <div>
              <p className="text-sm text-slate-200 mb-1">{alert.msg}</p>
              <div className="flex items-center gap-2">
                <StatusBadge status={alert.type.toUpperCase()} type={alert.type} />
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentAlerts;