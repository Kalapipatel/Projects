import React from 'react';
import { Package, MapPin, Clock, ArrowRight } from 'lucide-react';

const TaskCard = ({ task, onSelect, theme }) => {
  const isDark = theme === 'dark';
  const isCompleted = task.taskStatus === 'COMPLETED';

  return (
    <div 
      onClick={onSelect}
      className={`p-4 rounded-xl border transition-all relative overflow-hidden
        ${isDark 
          ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200' 
          : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800 shadow-sm'
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider
              ${isCompleted 
                ? 'bg-emerald-500/10 text-emerald-500' 
                : 'bg-blue-500/10 text-blue-500'}
            `}>
              {task.taskStatus || 'PENDING'}
            </span>
            <span className="text-xs font-mono opacity-50">#{task.orderId}</span>
          </div>
          <h4 className="font-bold text-lg mt-1">Order #{task.externalOrderId || task.orderId}</h4>
        </div>
        {onSelect && <ArrowRight size={20} className="opacity-50" />}
      </div>

      <div className="flex items-center gap-4 text-xs opacity-70 mt-3">
        <div className="flex items-center gap-1">
          <Package size={14} />
          <span>{task.itemCount || (task.items ? task.items.length : 0)} Items</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>Zone A</span>
        </div>
        {task.timePicked && (
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{task.timePicked}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;