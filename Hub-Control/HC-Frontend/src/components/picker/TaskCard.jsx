import React from 'react';
import { MapPin, Box, Clock, ChevronRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

const TaskCard = ({ task, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(task)}
      className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-slate-200 active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Order #{task.orderId}</h3>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <Clock size={12} /> {task.timeAssigned}
          </span>
        </div>
        <StatusBadge status={task.status} type={task.status === 'Completed' ? 'success' : 'warning'} />
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
          <Box size={14} className="text-blue-500" />
          <span className="font-semibold">{task.totalItems} Items</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
          <MapPin size={14} className="text-orange-500" />
          <span>Zone {task.zone}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
        Start Picking <ChevronRight size={16} className="ml-auto" />
      </div>
    </div>
  );
};

export default TaskCard;