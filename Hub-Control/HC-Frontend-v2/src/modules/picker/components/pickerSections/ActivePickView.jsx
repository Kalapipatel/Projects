import React from 'react';
import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState'; // Corrected import path
import { Download, Loader2 } from 'lucide-react';

const ActivePickView = ({ activeTask, loading, isDark, theme, onStartPicking, initiateRequest }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Current Pick</h3>
        {!activeTask && (
          <button 
            onClick={initiateRequest} 
            className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            + NEW REQUEST
          </button>
        )}
      </div>

      {activeTask ? (
        <div> 
          {loading ? (
             <div className={`h-40 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                <Loader2 className="animate-spin text-blue-500" size={32} />
             </div>
          ) : (
             <div className="cursor-pointer hover:scale-[1.02] transition-transform">
               <TaskCard 
                 task={activeTask} 
                 theme={theme}
                 onSelect={onStartPicking} 
               />
               <p className="text-center text-xs mt-3 text-emerald-500 font-medium animate-pulse">
                  Tap card to Start Picking Items &rarr;
               </p>
             </div>
          )}
        </div>
      ) : (
        <EmptyState 
          icon={<Download size={24} />} 
          title="No Active Pick" 
          subtitle='Tap "Request" to get an order' 
          isDark={isDark} 
        />
      )}
    </div>
  );
};

export default ActivePickView;