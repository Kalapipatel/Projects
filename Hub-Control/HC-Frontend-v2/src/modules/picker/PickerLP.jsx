import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Download, History, Truck, AlertCircle } from 'lucide-react';

// Actions
import { logout } from '../auth/authSlice';

// Components
import PickerHeader from './components/PickerHeader';
import TaskDetailView from './components/TaskDetailView'; 
import RequestConfirmationModal from './components/RequestConfirmationModal';
import FinalizeOrderModal from './components/FinalizeOrderModal';
import NavButton from './components/NavButton';

// Sections
import ActivePickView from './components/pickerSections/ActivePickView';
import QueueView from './components/pickerSections/QueueView';
import HistoryView from './components/pickerSections/HistoryView';

// Services
import { requestNewOrder, updatePickerStatus, startPickingTask, updateItemStatus, updateTaskStatus } from '../../services/pickerService'; 

// --- CONSTANTS ---
const STORE_ID = 1; // In a real app, this might come from user profile

const PickerLP = () => {
  // --- REDUX & ROUTER ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: userName, userId, role } = useSelector((state) => state.auth);

  // --- STATE ---
  const [theme, setTheme] = useState('dark');
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
  const [viewMode, setViewMode] = useState('active'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal State
  const [showRequestModal, setShowRequestModal] = useState(false); 
  const [finalizeTask, setFinalizeTask] = useState(null); 

  // --- HANDLERS ---
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // 1. Request Logic
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
      const newOrder = await requestNewOrder(userId, STORE_ID); 
      setActiveTask(newOrder); 
    } catch (err) {
      console.error(err);
      setError(err.message || "No orders available or connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Start Picking Logic
  const handleStartPicking = async () => {
    if (!activeTask || !userId) return;
    setLoading(true);
    setError(null);

    try {
      const apiData = await startPickingTask(userId, activeTask.taskId);
      const mappedItems = apiData.map((dto) => ({
        taskItemId: dto.taskItemId,
        quantity: dto.quantity,
        pickStatus: 'PENDING', 
        product: {
          productId: dto.productId,
          name: dto.productName,
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

  // 3. Toggle Status Logic
  const handleToggleStatus = async () => {
    if (!userId) return;
    const newIsOnline = !isOnline;
    const apiStatus = newIsOnline ? 1 : 0;
    setIsOnline(newIsOnline);

    try {
        await updatePickerStatus(userId, apiStatus);
        localStorage.setItem('isActive', apiStatus);
    } catch (err) {
        console.error("Status update failed:", err);
        setIsOnline(!newIsOnline); 
        alert("Failed to update status. Check connection.");
    }
  };

  // 4. Complete Picking Logic
  const handlePickingComplete = async (completedItems) => {
    if (!activeTask) return;
    setLoading(true); 
    setError(null);

    try {
        // Parallel update for items
        const results = await Promise.allSettled(completedItems.map(item => 
            updateItemStatus(activeTask.taskId, item.taskItemId, item.pickStatus)
        ));

        const failedRequests = results.filter(r => r.status === 'rejected');
        if (failedRequests.length > 0) {
            const reason = failedRequests[0].reason?.message || "Unknown Server Error";
            throw new Error(`Failed to sync ${failedRequests.length} item(s). Server said: ${reason}`);
        }

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
        setError(err.message || "Failed to sync some items. Check console for details.");
    } finally {
        setLoading(false);
    }
  };

  // 5. Finalize Logic (Delivery)
  const handleFinalizeAction = async (action) => {
    if (!finalizeTask) return;
    setLoading(true); 
    setError(null);

    try {
        const apiStatus = action === 'COMPLETED' ? 'COMPLETED' : 'ISSUE';
        await updateTaskStatus(finalizeTask.taskId, apiStatus);

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
    } finally {
        setLoading(false);
        setFinalizeTask(null);
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

  // --- MAIN RENDER ---
  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col relative ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* MODALS */}
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

      {/* HEADER */}
      <PickerHeader 
        user={{ name: userName, role: role || 'Associate' }} 
        isOnline={isOnline} 
        onToggleStatus={handleToggleStatus} 
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col gap-6">

        {/* NAVIGATION */}
        <div className="grid grid-cols-3 gap-3">
          <NavButton 
            active={viewMode === 'active'} 
            onClick={() => setViewMode('active')} 
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

        {/* MAIN CONTENT */}
        <div className="flex-1 pb-20">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-4 animate-pulse">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {viewMode === 'active' && (
             <ActivePickView 
                activeTask={activeTask}
                loading={loading}
                isDark={isDark}
                theme={theme}
                onStartPicking={handleStartPicking}
                initiateRequest={initiateRequest}
             />
          )}

          {viewMode === 'in-process' && (
             <QueueView 
                tasks={inProcessTasks}
                isDark={isDark}
                theme={theme}
                onSelectTask={setFinalizeTask}
             />
          )}

          {viewMode === 'history' && (
             <HistoryView 
                tasks={taskHistory}
                isDark={isDark}
                theme={theme}
             />
          )}
        </div>
      </div>
    </div>
  );
};

export default PickerLP;