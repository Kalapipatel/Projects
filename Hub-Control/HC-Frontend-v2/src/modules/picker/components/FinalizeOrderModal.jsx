import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const FinalizeOrderModal = ({ task, onClose, onFinalize, isDark }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl border transform transition-all scale-100 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-left w-full border-b pb-3 border-dashed border-slate-700">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Finalize Order</h3>
              <p className="text-slate-500 text-sm">Order #{task.orderId}</p>
          </div>

          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Have you delivered the items to the packing area?
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            {/* OPTION 1: COMPLETED */}
            <button 
              onClick={() => onFinalize('COMPLETED')}
              className="w-full py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <CheckCircle size={20} /> Order Delivered (Complete)
            </button>

            {/* OPTION 2: ISSUE */}
            <button 
              onClick={() => onFinalize('ISSUE')}
              className="w-full py-4 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <AlertCircle size={20} /> Report Issue
            </button>

             {/* Cancel */}
             <button 
              onClick={onClose}
              className={`mt-2 py-2 text-sm ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Cancel / Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinalizeOrderModal;