import React from 'react';
import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';
import { Truck } from 'lucide-react';

const QueueView = ({ tasks, isDark, theme, onSelectTask }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Delivery Queue ({tasks.length})
      </h3>
      
      {tasks.length === 0 ? (
         <EmptyState icon={<Truck size={24} />} title="No Orders in Process" isDark={isDark} />
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="cursor-pointer hover:scale-[1.02] transition-transform">
              <TaskCard 
                task={task} 
                onSelect={() => onSelectTask(task)} 
                theme={theme} 
              />
            </div>
          ))}
          <p className="text-center text-xs mt-4 text-slate-500">Tap an order to complete delivery or report issue</p>
        </div>
      )}
    </div>
  );
};

export default QueueView;