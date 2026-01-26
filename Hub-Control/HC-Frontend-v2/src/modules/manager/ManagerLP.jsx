import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2, Users } from 'lucide-react';

// Components
import ManagerNavbar from './components/ManagerNavbar';
import RecentAlerts from './components/RecentAlerts';
import StoreSelector from './components/StoreSelector';
import OrderTabsCard from './components/OrderTabsCard';
import QuickActions from './components/QuickActions';
import DashboardCard from './components/DashboardCard';

// Service & Actions
import { fetchManagerDashboard, fetchStoreStats } from '../../services/managerService';
import { logout } from '../auth/authSlice';


const ManagerLP = () => {
  const [loading, setLoading] = useState(true);
  const [switchingStore, setSwitchingStore] = useState(false);
  
  // Data State
  const [managerProfile, setManagerProfile] = useState({ name: '', stores: [] });
  const [currentStats, setCurrentStats] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  // Hooks
  const { user, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- 1. INITIAL LOAD ---
  useEffect(() => {
    const initDashboard = async () => {
      // Use Redux userId or fallback to localStorage if refreshing
      const activeUserId = userId || localStorage.getItem('userId');
      
      if (!activeUserId) { 
          navigate('/login'); 
          return; 
      }

      try {
        const data = await fetchManagerDashboard(activeUserId);

        setManagerProfile({
          name: data.managerName || user,
          stores: data.stores || [] 
        });

        // Set Default Store (First one) if available
        if (data.stores && data.stores.length > 0) {
           setSelectedStoreId(data.stores[0].storeId);
           setCurrentStats(data.stats); // Initial stats usually come with dashboard API
        } else {
           // Handle case with no stores assigned
           setLoading(false);
        }

      } catch (error) {
        console.error("Init Failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [userId, navigate, user]);

  // --- 2. HANDLE STORE SWITCHING ---
  const handleStoreSelect = async (newStoreId) => {
    if (!newStoreId || newStoreId === selectedStoreId) return;

    setSwitchingStore(true);
    setSelectedStoreId(newStoreId); 

    try {
      const activeUserId = userId || localStorage.getItem('userId');
      const newStats = await fetchStoreStats(activeUserId, newStoreId);
      setCurrentStats(newStats);
    } catch (error) {
      console.error("Switch failed:", error);
    } finally {
      setSwitchingStore(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  // Helper to get current store name
  const currentStoreObj = managerProfile.stores.find(s => s.storeId === selectedStoreId) || {};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 font-sans">
      
      <ManagerNavbar 
        onLogout={handleLogout} 
        managerName={managerProfile.name} 
        storeName={currentStoreObj.storeName} 
      />

      <main className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Managing: <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentStoreObj.storeName || 'No Active Store'}</span>
          </p>
        </div>

        {/* Store Selector */}
        {managerProfile.stores.length > 0 && (
          <StoreSelector 
            stores={managerProfile.stores} 
            currentStoreId={selectedStoreId} 
            onSelectStore={handleStoreSelect} 
          />
        )}

        {/* Dashboard Content */}
        {selectedStoreId ? (
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-opacity duration-300 ${switchingStore ? 'opacity-50' : 'opacity-100'}`}>
            
            {/* 1. Order Stats */}
            <div className="lg:col-span-1 h-full">
                {currentStats && (
                    <OrderTabsCard 
                        pending={currentStats.pendingOrders}
                        progress={currentStats.inProgressOrders}
                        completed={currentStats.completedOrders}
                        total={currentStats.totalOrders}
                    />
                )}
            </div>

            {/* 2. Quick Actions & Active Pickers */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <DashboardCard className="flex items-center justify-between py-6">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Active Pickers</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">
                            {currentStats?.activePickers || 0} 
                            <span className="text-lg font-normal text-slate-400"> / {currentStats?.totalPickers || 0}</span>
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Users size={24} />
                    </div>
                </DashboardCard>

                <div className="flex-1">
                    <QuickActions storeId={selectedStoreId} />
                </div>
            </div>

            {/* 3. Alerts */}
            <div className="lg:col-span-1 h-full">
                <RecentAlerts alerts={currentStats?.alerts || []} />
            </div>

            </div>
        ) : (
            <div className="text-center py-20 text-slate-500">
                Please be assigned to a store to view data.
            </div>
        )}

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex justify-between text-sm text-slate-500">
          <p>© 2026 HubControl Operating System</p>
          <div className="flex gap-4">
             <span className="cursor-pointer hover:text-blue-500">Support</span>
             <span>System Status: <span className="text-emerald-500">Online</span></span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ManagerLP;