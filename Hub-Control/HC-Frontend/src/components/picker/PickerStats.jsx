import React from 'react';

const PickerStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-4">
      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.assigned}</div>
        <div className="text-xs text-blue-400 font-medium uppercase">Assigned</div>
      </div>
      <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-center">
        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        <div className="text-xs text-orange-400 font-medium uppercase">Pending</div>
      </div>
      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
        <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
        <div className="text-xs text-emerald-400 font-medium uppercase">Done</div>
      </div>
    </div>
  );
};

export default PickerStats;