import React, { useState, useEffect } from 'react';
import PickerHeader from '../components/picker/PickerHeader';
import TaskCard from '../components/picker/TaskCard';
import TaskDetailView from '../components/picker/TaskDetailView';
import RequestConfirmationModal from '../components/picker/modals/RequestConfirmationModal';
import FinalizeOrderModal from '../components/picker/modals/FinalizeOrderModal';
import { requestNewOrder, updatePickerStatus } from '../services/pickerService';
import { Download, History, Loader2, Truck, AlertCircle } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_USER = { name: "Alex Picker", role: "Warehouse Associate" };
const MOCK_HISTORY = [
  { id: 101, orderId: "ORD-5521", status: "COMPLETED", totalItems: 3, zone: "A", timeAssigned: "09:30 AM" },
  { id: 102, orderId: "ORD-5524", status: "COMPLETED", totalItems: 1, zone: "C", timeAssigned: "10:15 AM" }
];

const PickerLP = ({ onLogout }) => {
  // --- STATE ---
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: "Loading...", id: null, role: "Warehouse Associate" });
  const [isOnline, setIsOnline] = useState(() => {
      const storedStatus = localStorage.getItem('isActive');
      // If storedStatus is "1", return true. Otherwise false.
      return parseInt(storedStatus) === 1;
  });

  // Data State
  const [activeTask, setActiveTask] = useState(null); 
  const [inProcessTasks, setInProcessTasks] = useState([]); 
  const [taskHistory, setTaskHistory] = useState(MOCK_HISTORY);
  
  // UI State
  const [viewMode, setViewMode] = useState('active'); // 'active' | 'in-process' | 'history' | 'detail'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal State
  const [showRequestModal, setShowRequestModal] = useState(false); 
  const [finalizeTask, setFinalizeTask] = useState(null); 

  // --- HANDLERS ---
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  // 1. Request Order
  const initiateRequest = () => {
    if (activeTask) return;
    setShowRequestModal(true);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedId = localStorage.getItem('userId');
    const roleName = localStorage.getItem('role');
    
    if (storedName && storedId) {
      setUser(prev => ({ ...prev, name: storedName, id: storedId, role: roleName}));
    }
  }, []);

  const confirmAndRequest = async () => {
    setShowRequestModal(false);
    setLoading(true);
    setError(null);
    setViewMode('active'); 

    try {
      const newOrder = await requestNewOrder(user.id); 
      setActiveTask({ ...newOrder, status: 'PENDING' });
    } catch (err) {
      setError("No orders available or connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Picking Complete -> Move to In-Process
  const handlePickingComplete = () => {
    if (!activeTask) return;
    
    // Set status to PROCESSING when moving to the queue
    const processingTask = { 
      ...activeTask, 
      status: "PROCESSING", 
      timePicked: new Date().toLocaleTimeString() 
    };

    setInProcessTasks(prev => [processingTask, ...prev]);
    setActiveTask(null);
    setViewMode('in-process'); 
    alert("Items Picked! Order moved to In-Process."); 
  };

  // 3. Finalize Order (FIXED STATUS LOGIC)
  const handleFinalizeAction = (action) => {
    if (!finalizeTask) return;

    if (action === 'COMPLETED') {
      // FIX 1: Overwrite status to COMPLETED
      const completedTask = { 
          ...finalizeTask, 
          status: "COMPLETED", 
          timeCompleted: new Date().toLocaleTimeString() 
      };

      // Add to History
      setTaskHistory(prev => [completedTask, ...prev]);
      // Remove from In-Process
      setInProcessTasks(prev => prev.filter(t => t.id !== finalizeTask.id));
      
      alert(`Order ${finalizeTask.orderId} marked as COMPLETED.`);
    } 
    else if (action === 'ISSUE') {
      // FIX 2: Find the specific item and overwrite status to ISSUE
      setInProcessTasks(prevTasks => prevTasks.map(task => {
        if (task.id === finalizeTask.id) {
            return { ...task, status: "ISSUE" }; // <--- Forced Status Update
        }
        return task;
      }));
      
      alert(`Issue reported for Order ${finalizeTask.orderId}.`);
    }

    setFinalizeTask(null); // Close Modal
  };

  const handleToggleStatus = async () => {
    if (!user.id) return;

    // Calculate new status
    const newIsOnline = !isOnline;
    const apiStatus = newIsOnline ? 1 : 0;

    // A. Optimistic Update (UI)
    setIsOnline(newIsOnline);

    try {
        // B. API Call
        await updatePickerStatus(user.id, apiStatus);
        
        // C. IMPORTANT: Update LocalStorage so refresh remembers the new state
        localStorage.setItem('isActive', apiStatus);
        
        console.log(`Status updated to: ${newIsOnline ? 'Online' : 'Offline'}`);

    } catch (err) {
        // D. Revert if API fails
        setIsOnline(!newIsOnline); 
        alert("Failed to update status. Check connection.");
    }
  };

  // --- RENDER DETAIL VIEW ---
  if (activeTask && viewMode === 'detail') {
    return (
      <TaskDetailView 
        task={activeTask} 
        onBack={() => setViewMode('active')} 
        onCompleteTask={handlePickingComplete} 
        theme={theme}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col relative ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- INTEGRATED MODALS --- */}
      <RequestConfirmationModal 
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onConfirm={confirmAndRequest}
        isDark={isDark}
      />

      <FinalizeOrderModal
        task={finalizeTask}
        onClose={() => setFinalizeTask(null)}
        onFinalize={handleFinalizeAction}
        isDark={isDark}
      />

      {/* --- HEADER --- */}
      <PickerHeader 
         user={user} 
         isOnline={isOnline} 
         onToggleStatus={handleToggleStatus} // <--- Link the function here
         onLogout={onLogout}
         theme={theme}
         onToggleTheme={toggleTheme}
       />

      <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-6">

        {/* --- NAVIGATION TABS --- */}
        <div className="grid grid-cols-3 gap-3">
          <NavButton 
            active={viewMode === 'active'} 
            onClick={() => { setViewMode('active'); initiateRequest(); }} 
            icon={<Download size={20} />} 
            label="Request" 
            loading={loading}
            isDark={isDark}
          />
          <NavButton 
            active={viewMode === 'in-process'} 
            onClick={() => setViewMode('in-process')} 
            icon={<Truck size={20} />} 
            label="In-Process" 
            badgeCount={inProcessTasks.length}
            isDark={isDark}
          />
          <NavButton 
            active={viewMode === 'history'} 
            onClick={() => setViewMode('history')} 
            icon={<History size={20} />} 
            label="History" 
            isDark={isDark}
          />
        </div>

        {/* --- MAIN DISPLAY AREA --- */}
        <div className="flex-1 pb-20">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-4">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* 1. ACTIVE VIEW */}
          {viewMode === 'active' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Current Pick</h3>
              {activeTask ? (
                <div onClick={() => setViewMode('detail')}> 
                  <TaskCard task={activeTask} onSelect={() => setViewMode('detail')} theme={theme} />
                  <p className="text-center text-xs mt-2 text-slate-500 animate-pulse">Tap card to start picking</p>
                </div>
              ) : (
                <EmptyState icon={<Download size={24} />} title="No Active Pick" subtitle='Tap "Request" to start' isDark={isDark} />
              )}
            </div>
          )}

          {/* 2. IN-PROCESS VIEW */}
          {viewMode === 'in-process' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Delivery Queue ({inProcessTasks.length})
              </h3>
              
              {inProcessTasks.length === 0 ? (
                 <EmptyState icon={<Truck size={24} />} title="No Orders in Process" isDark={isDark} />
              ) : (
                <div className="space-y-3">
                  {inProcessTasks.map(task => (
                    <div key={task.id} onClick={() => setFinalizeTask(task)} className="cursor-pointer hover:scale-[1.02] transition-transform">
                      {/* TaskCard will now receive the UPDATED status (ISSUE or PROCESSING) */}
                      <TaskCard task={task} onSelect={() => setFinalizeTask(task)} theme={theme} />
                    </div>
                  ))}
                  <p className="text-center text-xs mt-4 text-slate-500">Tap an order to complete delivery or report issue</p>
                </div>
              )}
            </div>
          )}

          {/* 3. HISTORY VIEW */}
          {viewMode === 'history' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Completed ({taskHistory.length})</h3>
              <div className="space-y-3">
                {taskHistory.map(task => (
                  <div key={task.id} className="opacity-75 grayscale hover:grayscale-0 transition-all">
                    <TaskCard task={task} onSelect={() => {}} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS (Keep these here or move to separate files if preferred) ---

const NavButton = ({ active, onClick, icon, label, badgeCount, loading, isDark }) => (
  <button 
    onClick={onClick}
    className={`
      relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all active:scale-95
      ${active
        ? 'bg-blue-600 text-white border-blue-500'
        : (isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600')
      }
    `}
  >
    {loading ? <Loader2 className="animate-spin" size={20}/> : icon}
    <span className="font-bold text-xs text-center leading-tight">{label}</span>
    {badgeCount > 0 && (
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
        {badgeCount}
      </span>
    )}
  </button>
);

const EmptyState = ({ icon, title, subtitle, isDark }) => (
  <div className={`h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-6 ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-300 bg-slate-50'}`}>
    <div className={`p-3 rounded-full ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-slate-300'}`}>
      {icon}
    </div>
    <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{title}</p>
    {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
  </div>
);

export default PickerLP;