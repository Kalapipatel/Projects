import React from 'react';
import { MapPin, Box, Clock, ChevronRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

const TaskCard = ({ task, onSelect, theme }) => {
  const isDark = theme === 'dark';

  // Helper to format Java LocalDateTime string
  const formatTime = (isoString) => {
    if(!isoString) return "--:--";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate total items (sum of quantities)
  const totalItems = task.pickingTaskItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div 
      onClick={() => onSelect(task)}
      className={`
        mb-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 active:scale-[0.98]
        ${isDark 
          ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-lg shadow-black/20' 
          : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          {/* Accessing nested order object */}
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            #{task.order?.orderId || 'Unknown'}
          </h3>
          <span className={`text-xs flex items-center gap-1 mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            <Clock size={12} /> {formatTime(task.assignedAt)}
          </span>
        </div>
        {/* Mapping Java Enum to Badge Type */}
        <StatusBadge 
          status={task.taskStatus} 
          type={task.taskStatus === 'COMPLETED' ? 'success' : 'warning'} 
        />
      </div>

      <div className="flex items-center gap-3 text-sm">
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          <Box size={14} className="text-blue-500" />
          <span className="font-semibold">{totalItems} Items</span>
        </div>
        {/* You can add Zone logic here if your backend provides it, otherwise remove or mock */}
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          <MapPin size={14} className="text-orange-500" />
          <span>Warehouse</span>
        </div>
      </div>

      <div className="mt-4 flex items-center text-blue-500 font-medium text-sm">
        Start Picking <ChevronRight size={16} className="ml-auto" />
      </div>
    </div>
  );
};

export default TaskCard;