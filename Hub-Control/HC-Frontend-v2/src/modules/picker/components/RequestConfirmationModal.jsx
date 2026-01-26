import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RequestConfirmationModal = ({ isOpen, onClose, onConfirm, isDark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl border transform transition-all scale-100 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full">
            <AlertTriangle size={32} />
          </div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Request New Order?</h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Are you ready to start picking immediately?
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={onClose} 
              className={`py-3 rounded-xl font-medium ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
            >
              Yes, Request
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestConfirmationModal;