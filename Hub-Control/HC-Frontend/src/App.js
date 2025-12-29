import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminLP from './pages/AdminLP';
import ManagerLP from './pages/ManagerLP';
import PickerLP from './pages/PickerLP';
import ManagePickers from './pages/manager/ManagePickers';
import Inventory from './pages/manager/Inventory';
import OrderQueue from './pages/manager/OrderQueue';

// --- NEW IMPORTS FOR ADMIN SUB-PAGES ---
import StoreManagement from './pages/admin/StoreManagement';
import UserManagement from './pages/admin/UserManagement';
import AssignStore from './pages/admin/AssignStore';
import ProductManagement from './pages/admin/ProductManagement'; 
import Performance from './pages/admin/Performance';

const App = () => {
  // Initialize view based on current URL path
  const getInitialView = () => {
    const path = window.location.pathname;
    
    // Check for Manager sub-pages
    const managerMatch = path.match(/^\/manager\/(\d+)\/(.*)$/);
    if (managerMatch) {
      setActiveStoreId(parseInt(managerMatch[1])); 
      if (managerMatch[2] === 'manage-pickers') return 'managePickers';
      if (managerMatch[2] === 'inventory') return 'inventory';
      if (managerMatch[2] === 'order-queue') return 'orderQueue';
    }

    // --- ADMIN ROUTES ---
    if (path === '/admin') return 'adminLp';
    if (path === '/admin/stores') return 'adminStores';
    if (path === '/admin/users') return 'adminUsers';
    if (path === '/admin/inventory') return 'adminInventory';
    if (path === '/admin/performance') return 'adminPerformance';

    if (path === '/manager') return 'managerLp';
    if (path === '/picker') return 'pickerLp';
    if (path === '/login') return 'login';
    
    return 'home';
  };

  const [view, setView] = useState(getInitialView);
  const [activeStoreId, setActiveStoreId] = useState(null);

  // --- 1. SYNC URL WITH STATE ---
  useEffect(() => {
    let path = '/';

    // Basic Routes
    if (view === 'login') path = '/login';
    else if (view === 'managerLp') path = '/manager';
    else if (view === 'pickerLp') path = '/picker';
    
    // Manager Sub-routes
    else if (view === 'managePickers') path = `/manager/${activeStoreId}/manage-pickers`;
    else if (view === 'inventory') path = `/manager/${activeStoreId}/inventory`;
    else if (view === 'orderQueue') path = `/manager/${activeStoreId}/order-queue`;

    // --- ADMIN URL MAPPING ---
    else if (view === 'adminLp') path = '/admin';
    else if (view === 'adminStores') path = '/admin/stores';
    else if (view === 'adminUsers') path = '/admin/users';
    else if (view === 'assignStores') path = '/admin/mapping';
    else if (view === 'adminProducts') path = '/admin/products';
    else if (view === 'adminPerformance') path = '/admin/performance';

    else path = '/';

    // Only push if path actually changed
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [view, activeStoreId]);

  // --- 2. HANDLE BROWSER BACK BUTTON ---
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      
      if (path === '/login') setView('login');
      else if (path === '/manager') setView('managerLp');
      else if (path === '/picker') setView('pickerLp');

      // Admin Back Navigation
      else if (path === '/admin') setView('adminLp');
      else if (path === '/admin/stores') setView('adminStores');
      else if (path === '/admin/users') setView('adminUsers');
      else if (path === '/admin/mapping') setView('assignStores');
      else if (path === '/admin/products') setView('adminProducts');
      
      else setView('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // ==========================
  // VIEW RENDERING LOGIC
  // ==========================

  // --- ADMIN PROTECTED ROUTES (Updated) ---
  if (view === 'adminLp') {
    return <AdminLP onNavigate={setView} />;
  }
  if (view === 'adminStores') {
    return <StoreManagement onNavigate={setView} />;
  }
  if (view === 'adminUsers') {
    return <UserManagement onNavigate={setView} />;
  }
  if (view === 'assignStores') {
    return <AssignStore onNavigate={setView} />;
  }
  if (view === 'adminProducts'){
    return <ProductManagement onNavigate={setView} />;
  } 
  if (view === 'adminPerformance') return <Performance onNavigate={setView} />;


  // --- MANAGER PROTECTED ROUTES ---
  if (view === 'managerLp') {
    return (
      <ManagerLP 
        onNavigate={setView} 
        initialStoreId={activeStoreId}
        onSubNavigate={(page, storeId) => {
          setActiveStoreId(storeId);
          setView(page);
        }} 
      />
    );
  }
  if (view === 'managePickers') {
    return <ManagePickers storeId={activeStoreId} onBack={() => setView('managerLp')} />;
  }
  if (view === 'inventory') {
    return <Inventory storeId={activeStoreId} onBack={() => setView('managerLp')} />;
  }
  if (view === 'orderQueue') {
    return <OrderQueue storeId={activeStoreId} onBack={() => setView('managerLp')} />;
  }


  // --- PICKER PROTECTED ROUTES ---
  if (view === 'pickerLp') {
    return <PickerLP onLogout={() => setView('login')} />;
  }


  // --- PUBLIC ROUTES ---
  if (view === 'login') {
    return <LoginPage onNavigate={setView} />;
  }

  // DEFAULT (LANDING PAGE)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <Navbar onNavigate={setView} currentPage={view} />
      
      <main>
        <LandingPage onNavigate={setView} />
      </main>

      <Footer />
    </div>
  );
};

export default App;