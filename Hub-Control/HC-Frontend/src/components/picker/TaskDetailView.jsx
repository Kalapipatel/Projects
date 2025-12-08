import React, { useState, useEffect } from 'react';
import { ArrowLeft, Scan, CheckCircle, XCircle, RefreshCw, AlertTriangle, MapPin, Box, AlertCircle } from 'lucide-react';
import Button from '../ui/Button'; // Ensure path is correct based on your folder structure

const TaskDetailView = ({ initialItems, taskMetadata, onBack, onCompleteTask, theme }) => {
  const isDark = theme === 'dark';

  // --- 1. Enums & Constants ---
  const PICK_STATUS = {
    PENDING: 'PENDING',
    PICKED: 'PICKED',
    NOTFOUND: 'NOTFOUND',
    SUBSTITUTED: 'SUBSTITUTED'
  };

  // --- 2. State Initialization ---
  // We use the passed 'initialItems' which are already mapped in PickerLP
  const [taskItems, setTaskItems] = useState(() => {
    return initialItems.map((item, index) => ({
      ...item,
      // Ensure unique UI ID
      uiId: item.taskItemId ? item.taskItemId : `temp-${index}`, 
      pickStatus: item.pickStatus || PICK_STATUS.PENDING,
      isScanned: (item.pickStatus && item.pickStatus !== PICK_STATUS.PENDING)
    }));
  });

  const [errorMsg, setErrorMsg] = useState('');

  // --- 3. Actions ---

  const handleScanItem = (uniqueId) => {
    setErrorMsg(''); 
    setTaskItems(currentItems => 
      currentItems.map(item => 
        item.uiId === uniqueId ? { ...item, isScanned: true } : item
      )
    );
  };

  const handleSelectStatus = (uniqueId, status) => {
    setErrorMsg(''); 
    setTaskItems(currentItems => 
      currentItems.map(item => 
        item.uiId === uniqueId ? { ...item, pickStatus: status } : item
      )
    );
  };

  const handleFinishTask = () => {
    const pendingItems = taskItems.filter(item => item.pickStatus === PICK_STATUS.PENDING);
    if (pendingItems.length > 0) {
      setErrorMsg(`Please select item status for ${pendingItems.length} remaining item(s).`);
      return;
    }
    onCompleteTask(taskItems);
  };

  const completedCount = taskItems.filter(i => i.pickStatus !== PICK_STATUS.PENDING).length;
  const totalCount = taskItems.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // --- 4. Helper for Badges ---
  const getStatusBadge = (status) => {
    switch(status) {
      case PICK_STATUS.PICKED:
        return { icon: <CheckCircle size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Picked' };
      case PICK_STATUS.NOTFOUND:
        return { icon: <XCircle size={18} />, color: 'text-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Not Found' };
      case PICK_STATUS.SUBSTITUTED:
        return { icon: <RefreshCw size={18} />, color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Substituted' };
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* --- Navbar: Order ID & Task ID --- */}
      <div className={`px-4 py-3 shadow-md flex items-center gap-3 sticky top-0 z-20 border-b transition-colors
          ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <button onClick={onBack} className={`p-2 -ml-2 rounded-full ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <div className={`flex items-center gap-2 text-sm font-mono opacity-80 mb-1 
            ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
             {/* Uses taskMetadata prop now */}
             <span>ORD #{taskMetadata?.orderId || '---'}</span>
             <span className="opacity-30">|</span>
             <span>TASK #{taskMetadata?.taskId || '---'}</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div 
              className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="text-right">
             <span className="block font-bold text-emerald-500">{progress}%</span>
        </div>
      </div>

      {/* --- List of Cards --- */}
      <div className="flex-1 p-4 overflow-y-auto pb-32 space-y-5">
        {taskItems.map((item) => {
          const product = item.product || {}; 
          const isPending = item.pickStatus === PICK_STATUS.PENDING;
          const statusStyle = getStatusBadge(item.pickStatus);
          
          return (
            <div 
              key={item.uiId} 
              className={`rounded-xl border transition-all duration-300 overflow-hidden shadow-sm relative
                ${!isPending 
                  ? (isDark ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-white/60 border-slate-200 opacity-70') 
                  : (isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200')}
              `}
            >
              {/* --- Card Header: Item ID --- */}
              <div className={`px-4 py-2 text-xs font-mono font-bold tracking-wide border-b flex justify-between items-center
                  ${isDark ? 'bg-slate-800/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                <span>ITEM #{item.taskItemId}</span>
                {!isPending && <span className="text-emerald-500 flex items-center gap-1"><CheckCircle size={12} /> DONE</span>}
              </div>

              {/* --- Card Body --- */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  {/* Product Details */}
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={`text-xs px-2 py-0.5 rounded font-mono flex items-center gap-1
                         ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}
                       `}>
                         <MapPin size={10} />
                         {product.location || 'N/A'}
                       </span>
                       {product.isFragile && (
                         <span className="bg-rose-500/10 text-rose-500 text-xs px-2 py-0.5 rounded flex items-center gap-1 border border-rose-500/20">
                           <AlertTriangle size={10} /> Fragile
                         </span>
                       )}
                    </div>
                    
                    <h3 className={`font-bold text-lg leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {product.name || 'Unknown Item'}
                    </h3>
                    <p className={`text-sm mt-1 flex items-center gap-1 font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      <Box size={12} />
                      Prod ID: #{product.productId}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="pl-4 text-right border-l border-dashed border-slate-200 dark:border-slate-800">
                    <span className={`text-[10px] uppercase font-bold tracking-wider block mb-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Qty</span>
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.quantity}
                    </div>
                  </div>
                </div>

                {/* --- Interactive Area --- */}
                <div className={`pt-4 border-t border-dashed ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  
                  {/* PHASE 1: Not Scanned Yet */}
                  {!item.isScanned && (
                    <Button 
                      onClick={() => handleScanItem(item.uiId)}
                      className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 py-3 text-sm flex items-center justify-center gap-2 transition-all shadow-blue-500/20 shadow-lg"
                    >
                      <Scan size={18} /> Scan Item to Start
                    </Button>
                  )}

                  {/* PHASE 2: Scanned -> Waiting for Selection */}
                  {item.isScanned && isPending && (
                    <div className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <button 
                           onClick={() => handleSelectStatus(item.uiId, PICK_STATUS.PICKED)}
                           className="flex flex-col items-center justify-center p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-all active:scale-95"
                        >
                           <CheckCircle size={24} className="mb-1" />
                           <span className="text-[10px] font-bold uppercase">Picked</span>
                        </button>

                        <button 
                           onClick={() => handleSelectStatus(item.uiId, PICK_STATUS.NOTFOUND)}
                           className="flex flex-col items-center justify-center p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 transition-all active:scale-95"
                        >
                           <XCircle size={24} className="mb-1" />
                           <span className="text-[10px] font-bold uppercase">Not Found</span>
                        </button>

                        <button 
                           onClick={() => handleSelectStatus(item.uiId, PICK_STATUS.SUBSTITUTED)}
                           className="flex flex-col items-center justify-center p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-all active:scale-95"
                        >
                           <RefreshCw size={24} className="mb-1" />
                           <span className="text-[10px] font-bold uppercase">Substitute</span>
                        </button>
                    </div>
                  )}

                  {/* PHASE 3: Completed */}
                  {!isPending && (
                      <div className="flex gap-2">
                        <div className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm border ${statusStyle.bg} ${statusStyle.color} ${statusStyle.border}`}>
                          {statusStyle.icon}
                          {statusStyle.label}
                        </div>
                        <button 
                          onClick={() => handleSelectStatus(item.uiId, PICK_STATUS.PENDING)}
                          className={`px-3 rounded-lg border flex items-center justify-center transition-colors
                             ${isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100'}`}
                        >
                           <RefreshCw size={16} />
                        </button>
                      </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`p-4 border-t sticky bottom-0 z-30 flex flex-col gap-2 ${isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
        {errorMsg && (
          <div className="flex items-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}
        <Button 
          variant="primary"
          className={`w-full py-3.5 text-lg font-bold shadow-lg transition-all
            ${progress === 100 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20' 
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
          onClick={handleFinishTask}
        >
          {progress === 100 ? 'Complete Task' : 'Pick All Items'}
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailView;