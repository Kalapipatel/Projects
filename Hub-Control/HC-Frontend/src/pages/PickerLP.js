import React, { useState, useEffect } from 'react';
import PickerHeader from '../components/picker/PickerHeader';
import TaskCard from '../components/picker/TaskCard'; 
import TaskDetailView from '../components/picker/TaskDetailView'; 
import RequestConfirmationModal from '../components/picker/modals/RequestConfirmationModal';
import FinalizeOrderModal from '../components/picker/modals/FinalizeOrderModal';
// Added updateTaskStatus to imports
import { requestNewOrder, updatePickerStatus, startPickingTask, updateItemStatus, updateTaskStatus } from '../services/pickerService'; 
import { Download, History, Loader2, Truck, AlertCircle } from 'lucide-react';

// --- CONSTANTS ---
const STORE_ID = 1; // Default Store ID

const PickerLP = ({ onLogout }) => {
  // --- STATE ---
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: "Loading...", id: null, role: "Warehouse Associate" });
  
  const [isOnline, setIsOnline] = useState(() => {
      const storedStatus = localStorage.getItem('isActive');
      return parseInt(storedStatus) === 1;
  });

  // Data State
  const [activeTask, setActiveTask] = useState(null); 
  const [activeTaskItems, setActiveTaskItems] = useState([]); 
  const [inProcessTasks, setInProcessTasks] = useState([]); 
  const [taskHistory, setTaskHistory] = useState([]);
  
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

  // Load User Data
  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedId = localStorage.getItem('userId');
    const roleName = localStorage.getItem('role');
    
    if (storedName && storedId) {
      setUser(prev => ({ ...prev, name: storedName, id: storedId, role: roleName}));
    }
  }, []);

  // 1. Request Order
  const initiateRequest = () => {
    if (!isOnline) {
        alert("You must be ONLINE to request orders.");
        return;
    }
    if (activeTask) return; 
    setShowRequestModal(true);
  };

  const confirmAndRequest = async () => {
    setShowRequestModal(false);
    setLoading(true);
    setError(null);
    setViewMode('active'); 

    try {
      const newOrder = await requestNewOrder(user.id, STORE_ID); 
      setActiveTask(newOrder); 
    } catch (err) {
      console.error(err);
      setError(err.message || "No orders available or connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Start Picking (FETCH ITEMS)
  const handleStartPicking = async () => {
    if (!activeTask || !user.id) return;

    setLoading(true);
    setError(null);

    try {
      // API CALL
      const apiData = await startPickingTask(user.id, activeTask.taskId);

      // Map Backend DTO to UI Structure
      const mappedItems = apiData.map((dto) => ({
        taskItemId: dto.taskItemId,
        quantity: dto.quantity,
        pickStatus: 'PENDING', 
        product: {
          productId: dto.productId,
          name: dto.productName,
          // Fallbacks for missing backend data
          location: 'Rack A-00', 
          isFragile: false 
        }
      }));

      setActiveTaskItems(mappedItems);
      setViewMode('detail'); 

    } catch (err) {
      console.error("Error starting task:", err);
      setError("Failed to load task items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Toggle Status
  const handleToggleStatus = async () => {
    if (!user.id) return;

    const newIsOnline = !isOnline;
    const apiStatus = newIsOnline ? 1 : 0;

    setIsOnline(newIsOnline);

    try {
        await updatePickerStatus(user.id, apiStatus);
        localStorage.setItem('isActive', apiStatus);
    } catch (err) {
        console.error("Status update failed:", err);
        setIsOnline(!newIsOnline); 
        alert("Failed to update status. Check connection.");
    }
  };

  // 4. Picking Complete
  const handlePickingComplete = async (completedItems) => {
    if (!activeTask) return;
    
    setLoading(true); 
    setError(null);

    try {
        // DEBUG: Log exactly what is being sent
        console.log("Sending items to API:", completedItems.map(i => ({
            taskId: activeTask.taskId,
            itemId: i.taskItemId,
            status: i.pickStatus
        })));

        // USE Promise.allSettled instead of Promise.all
        const results = await Promise.allSettled(completedItems.map(item => 
            updateItemStatus(activeTask.taskId, item.taskItemId, item.pickStatus)
        ));

        // Filter out the failures
        const failedRequests = results.filter(r => r.status === 'rejected');
        
        if (failedRequests.length > 0) {
            console.error("Some items failed to sync:", failedRequests);
            // Optional: Extract the specific error message from the backend
            const reason = failedRequests[0].reason?.message || "Unknown Server Error";
            throw new Error(`Failed to sync ${failedRequests.length} item(s). Server said: ${reason}`);
        }

        // B. Success: Move to In-Process
        const processingTask = { 
            ...activeTask, 
            taskStatus: "PROCESSING", 
            timePicked: new Date().toLocaleTimeString(),
            items: completedItems 
        };

        setInProcessTasks(prev => [processingTask, ...prev]);
        setActiveTask(null);
        setActiveTaskItems([]); 
        setViewMode('in-process'); 

    } catch (err) {
        console.error("Bulk sync failed:", err);
        // This specific error message will now be visible if you applied the previous UI fix
        setError(err.message || "Failed to sync some items. Check console for details.");
    } finally {
        setLoading(false);
    }
  };

  // 5. Finalize Order (INTEGRATED API)
  const handleFinalizeAction = async (action) => {
    if (!finalizeTask) return;

    setLoading(true); // Show global loading or handle inside modal
    setError(null);

    try {
        // A. Determine API Status String (COMPLETED or ISSUE)
        const apiStatus = action === 'COMPLETED' ? 'COMPLETED' : 'ISSUE';

        // B. Trigger API
        // API: /api/picker/{taskId}/{taskStatus}
        await updateTaskStatus(finalizeTask.taskId, apiStatus);

        // C. Update Local State on Success
        if (action === 'COMPLETED') {
            const completedTask = { 
                ...finalizeTask, 
                taskStatus: "COMPLETED", 
                timeCompleted: new Date().toLocaleTimeString() 
            };
            setTaskHistory(prev => [completedTask, ...prev]);
            setInProcessTasks(prev => prev.filter(t => t.orderId !== finalizeTask.orderId));
            alert(`Order #${finalizeTask.orderId} marked as COMPLETED.`);
        } 
        else if (action === 'ISSUE') {
            setInProcessTasks(prevTasks => prevTasks.map(task => {
                if (task.orderId === finalizeTask.orderId) {
                    return { ...task, taskStatus: "ISSUE" }; 
                }
                return task;
            }));
            alert(`Issue reported for Order #${finalizeTask.orderId}.`);
        }

    } catch (err) {
        console.error("Finalize task failed:", err);
        alert(`Failed to update task status. Please try again.`);
        // We do NOT remove the task from In-Process list if API fails
    } finally {
        setLoading(false);
        setFinalizeTask(null); // Close modal
    }
  };

  // --- RENDER DETAIL VIEW ---
  if (activeTask && viewMode === 'detail') {
    return (
      <TaskDetailView 
        initialItems={activeTaskItems} 
        taskMetadata={activeTask}      
        onBack={() => setViewMode('active')} 
        onCompleteTask={handlePickingComplete} 
        isSubmitting={loading} 
        theme={theme}
        serverError={error}
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
         onToggleStatus={handleToggleStatus} 
         onLogout={onLogout}
         theme={theme}
         onToggleTheme={toggleTheme}
       />

      <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-6">

        {/* --- NAVIGATION TABS --- */}
        <div className="grid grid-cols-3 gap-3">
          <NavButton 
            active={viewMode === 'active'} 
            onClick={() => { setViewMode('active'); }} 
            icon={<Download size={20} />} 
            label="Request" 
            loading={loading && !activeTaskItems.length && viewMode === 'active'}
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
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-4 animate-pulse">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* 1. ACTIVE VIEW */}
          {viewMode === 'active' && (
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
                  {loading && activeTaskItems.length === 0 ? (
                      <div className={`h-40 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                          <Loader2 className="animate-spin text-blue-500" size={32} />
                      </div>
                  ) : (
                      <div className="cursor-pointer hover:scale-[1.02] transition-transform">
                        <TaskCard 
                          task={activeTask} 
                          theme={theme}
                          onSelect={handleStartPicking} 
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
                  subtitle='Tap "+ New Request" to get an order' 
                  isDark={isDark} 
                />
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
                  {inProcessTasks.map((task, index) => (
                    <div key={index} className="cursor-pointer hover:scale-[1.02] transition-transform">
                      <TaskCard 
                        task={task} 
                        onSelect={() => setFinalizeTask(task)} 
                        theme={theme} 
                      />
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
                {taskHistory.length === 0 ? (
                    <EmptyState icon={<History size={24} />} title="No History Yet" isDark={isDark} />
                ) : (
                    taskHistory.map((task, index) => (
                    <div key={index} className="opacity-75 grayscale hover:grayscale-0 transition-all">
                        <TaskCard task={task} theme={theme} />
                    </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

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