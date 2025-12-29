import React from 'react';
import TaskCard from '../TaskCard';
import { EmptyState } from '../PickerUIHelpers';
import { History } from 'lucide-react';

const HistoryView = ({ tasks, isDark, theme }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Completed ({tasks.length})</h3>
      <div className="space-y-3">
        {tasks.length === 0 ? (
            <EmptyState icon={<History size={24} />} title="No History Yet" isDark={isDark} />
        ) : (
            tasks.map((task, index) => (
            <div key={index} className="opacity-75 grayscale hover:grayscale-0 transition-all">
                <TaskCard task={task} theme={theme} />
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;