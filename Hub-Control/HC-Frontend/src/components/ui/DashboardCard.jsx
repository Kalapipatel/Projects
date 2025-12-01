import React from 'react';

const DashboardCard = ({ children, className = "", title, action }) => {
  return (
    <div className={`bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;