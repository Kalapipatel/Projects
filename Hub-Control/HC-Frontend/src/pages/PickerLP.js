import React, { useState } from 'react';
import PickerHeader from '../components/picker/PickerHeader';
import PickerStats from '../components/picker/PickerStats';
import TaskCard from '../components/picker/TaskCard';
import TaskDetailView from '../components/picker/TaskDetailView';
import { Search, Filter } from 'lucide-react';

// --- MOCK DATA FOR UI DEVELOPMENT ---
const MOCK_USER = { name: "Alex Picker", role: "Senior Picker" };
const MOCK_TASKS = [
  { 
    id: 101, orderId: "ORD-5521", status: "Pending", totalItems: 5, zone: "A", timeAssigned: "10:30 AM",
    items: [
      { id: 1, name: "Wireless Mouse", sku: "WM-001", location: "Rack A-12", qty: 2, status: "pending", fragile: false },
      { id: 2, name: "Keyboard", sku: "KB-992", location: "Rack A-14", qty: 1, status: "pending", fragile: true },
      { id: 3, name: "USB Hub", sku: "UH-112", location: "Rack B-01", qty: 2, status: "pending", fragile: false },
    ]
  },
  { 
    id: 102, orderId: "ORD-5524", status: "Pending", totalItems: 12, zone: "C", timeAssigned: "11:15 AM",
    items: [
       { id: 4, name: "Monitor 24inch", sku: "MN-240", location: "Rack C-05", qty: 1, status: "pending", fragile: true },
    ]
  },
  { id: 103, orderId: "ORD-5529", status: "Completed", totalItems: 3, zone: "B", timeAssigned: "09:00 AM", items: [] },
];

const PickerLP = ({ onLogout }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed'
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(MOCK_TASKS);

  // --- HANDLERS ---
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTaskComplete = () => {
    // In real app, API call here
    setTasks(prev => prev.map(t => t.id === selectedTask.id ? {...t, status: 'Completed'} : t));
    setSelectedTask(null);
    alert("Task Completed! Syncing with Manager Dashboard...");
  };

  // --- RENDER DETAIL VIEW ---
  if (selectedTask) {
    return (
      <TaskDetailView 
        task={selectedTask} 
        onBack={() => setSelectedTask(null)}
        onCompleteTask={handleTaskComplete}
      />
    );
  }

  // --- RENDER MAIN DASHBOARD ---
  const filteredTasks = tasks.filter(t => 
    activeTab === 'active' ? t.status === 'Pending' : t.status === 'Completed'
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PickerHeader 
        user={MOCK_USER} 
        isOnline={isOnline} 
        onToggleStatus={() => setIsOnline(!isOnline)}
        onLogout={onLogout}
      />

      <div className="max-w-md mx-auto">
        <PickerStats stats={{
          assigned: tasks.length,
          pending: tasks.filter(t => t.status === 'Pending').length,
          completed: tasks.filter(t => t.status === 'Completed').length
        }} />

        {/* Filter Tabs */}
        <div className="flex px-4 gap-2 mb-4">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${activeTab === 'active' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            Active Tasks
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${activeTab === 'completed' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            Completed
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search Order ID..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Task List */}
        <div className="px-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onSelect={handleTaskSelect} />
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <p>No {activeTab} tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickerLP;
