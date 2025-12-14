import React, { useState, useEffect } from 'react';
import DashboardCard from '../ui/DashboardCard';
import StatusBadge from '../ui/StatusBadge';
import { Bell, X } from 'lucide-react';

// Utility to format ISO time string to "Xm ago"
const formatTimeAgo = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const RecentAlerts = ({ alerts = [] }) => {
  const [displayedAlerts, setDisplayedAlerts] = useState([]);

  // Sync state with props when store/data changes
  useEffect(() => {
    setDisplayedAlerts(alerts);
  }, [alerts]);

  // Handle local dismissal of alerts
  const handleClearAlert = (indexToClear) => {
    setDisplayedAlerts((prev) => prev.filter((_, index) => index !== indexToClear));
  };

  const handleClearAll = () => {
    setDisplayedAlerts([]);
  };

  return (
    <DashboardCard 
      title="Live Alerts" 
      action={
        <button 
          onClick={handleClearAll}
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          Clear All
        </button>
      }
    >
      {/* Height Calculation: 
         Approx 60px per alert. 4 alerts ~= 240px. 
         h-64 (16rem/256px) provides space for ~4 items + scrollbar 
      */}
      <div className="space-y-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
        {displayedAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
            <Bell size={24} className="mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          displayedAlerts.map((alert, i) => {
            // Map backend 'type' to frontend 'status' for colors
            // Backend types: "Low Stock", etc.
            // We'll map "Low Stock" -> "error", others -> "warning" or "info"
            let badgeType = 'info';
            if (alert.type?.toLowerCase().includes('low stock')) badgeType = 'error';
            else if (alert.type?.toLowerCase().includes('idle')) badgeType = 'warning';

            return (
              <div key={i} className="group flex items-start justify-between gap-3 border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Bell size={16} className="text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200 mb-1 leading-snug">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alert.type} type={badgeType} />
                      <span className="text-xs text-slate-500">
                        {formatTimeAgo(alert.time)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Clear Button (Visible on Hover) */}
                <button 
                  onClick={() => handleClearAlert(i)}
                  className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  title="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </DashboardCard>
  );
};

export default RecentAlerts;