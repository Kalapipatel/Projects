import React, { useState, useEffect } from 'react';
import ManagerNavbar from '../components/layout/ManagerNavbar';
import OrderTabsCard from '../components/dashboard/OrderTabsCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import DashboardCard from '../components/ui/DashboardCard';
import StoreSelector from '../components/dashboard/StoreSelector';
import { fetchManagerDashboard, fetchStoreStats } from '../services/managerService';
import { Users, Loader2 } from 'lucide-react';

const ManagerLP = ({ onNavigate, onSubNavigate, initialStoreId }) => {
  const [loading, setLoading] = useState(true);
  const [switchingStore, setSwitchingStore] = useState(false);
  
  // Static Data
  const [managerProfile, setManagerProfile] = useState({ name: '', stores: [] });
  // Dynamic Stats
  const [currentStats, setCurrentStats] = useState(null);
  // Selection
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) { onNavigate('landing'); return; }

        // 1. Fetch the basic Dashboard data (Returns Profile + Default Store 1 Stats)
        const data = await fetchManagerDashboard(storedUserId);

        setManagerProfile({
          name: data.managerName,
          stores: data.stores || [] 
        });

        // 2. Determine which store to show
        let targetStoreId = null;

        if (data.stores && data.stores.length > 0) {
          // Check if we have a valid "remembered" ID from App.js
          const isValidId = initialStoreId && data.stores.some(s => s.storeId === initialStoreId);
          
          targetStoreId = isValidId ? initialStoreId : data.stores[0].storeId;
          
          setSelectedStoreId(targetStoreId);
        }

        // 3. SET STATS
        // If the target store is the SAME as the default one (Store 1), use the data we already have.
        // If the target store is DIFFERENT (Store 2), we must fetch fresh stats immediately.
        if (targetStoreId && data.stores.length > 0 && targetStoreId !== data.stores[0].storeId) {
             // Fetch stats for Store 2 specifically
             const specificStats = await fetchStoreStats(storedUserId, targetStoreId);
             setCurrentStats(specificStats);
        } else {
             // Use the default stats returned by the first API call
             setCurrentStats(data.stats);
        }

      } catch (error) {
        console.error("Init Failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [onNavigate, initialStoreId]);

  // --- STORE SWITCHING ---
  const handleStoreSelect = async (newStoreId) => {
    // Safety Check: Prevent "undefined" calls to backend
    if (!newStoreId) {
      console.warn("Attempted to select invalid store ID:", newStoreId);
      return;
    }
    
    if (newStoreId === selectedStoreId) return;

    setSwitchingStore(true);
    setSelectedStoreId(newStoreId); 

    try {
      const userId = localStorage.getItem('userId');
      // This call will now be correct: .../dashboard/1 (Integer)
      const newStats = await fetchStoreStats(userId, newStoreId);
      setCurrentStats(newStats);
    } catch (error) {
      console.error("Switch failed:", error);
    } finally {
      setSwitchingStore(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    onNavigate('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  // FIX: Look up using storeId matching the backend
  const currentStoreObj = managerProfile.stores.find(s => s.storeId === selectedStoreId) || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      
      <ManagerNavbar 
        onLogout={handleLogout} 
        managerName={managerProfile.name} 
        storeName={currentStoreObj.storeName} // Changed .name to .storeName to match your DTO
      />

      <main className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400">
            Managing: <span className="text-blue-400 font-semibold">{currentStoreObj.storeName || 'Select a Store'}</span>
          </p>
        </div>

        {managerProfile.stores.length > 0 && (
          <StoreSelector 
            stores={managerProfile.stores} 
            currentStoreId={selectedStoreId} 
            onSelectStore={handleStoreSelect} 
          />
        )}

        {/* Dashboard Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-opacity duration-300 ${switchingStore ? 'opacity-50' : 'opacity-100'}`}>
          
          {/* Order Stats */}
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

          {/* Active Pickers */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <DashboardCard className="flex items-center justify-between py-4">
               <div>
                  <p className="text-sm text-slate-400">Active Pickers</p>
                  <p className="text-2xl font-bold text-white">
                    {currentStats?.activePickers || 0} 
                    <span className="text-sm font-normal text-emerald-400"> / {currentStats?.totalPickers || 0}</span>
                  </p>
               </div>
               <div className="bg-blue-600/20 p-3 rounded-full text-blue-500">
                 <Users size={24} />
               </div>
            </DashboardCard>

              <div className="flex-1">
                <QuickActions onAction={(actionName) => onSubNavigate(actionName, selectedStoreId)} />
              </div>
          </div>

          {/* Alerts */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <RecentAlerts alerts={currentStats?.alerts || []} />
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex justify-between text-sm text-slate-600">
          <p>© 2025 HubControl Operating System</p>
          <div className="flex gap-4">
             <span>Support</span>
             <span>System Status: <span className="text-emerald-500">Online</span></span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ManagerLP;