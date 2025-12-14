import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminLP from './pages/AdminLP';
import ManagerLP from './pages/ManagerLP';
import PickerLP from './pages/PickerLP';
import ManagePickers from './pages/ManagePickers';
import Inventory from './pages/Inventory';
import OrderQueue from './pages/OrderQueue';

const App = () => {
  // Initialize view based on current URL path
  const getInitialView = () => {
    const path = window.location.pathname;
    
    // Check for sub-pages first (regex checks for /manager/{number}/{action})
    const managerMatch = path.match(/^\/manager\/(\d+)\/(.*)$/);
    if (managerMatch) {
      setActiveStoreId(parseInt(managerMatch[1])); // Save the ID
      if (managerMatch[2] === 'manage-pickers') return 'managePickers';
      if (managerMatch[2] === 'inventory') return 'inventory';
      if (managerMatch[2] === 'order-queue') return 'orderQueue';
    }

    if (path === '/admin') return 'adminLp';
    if (path === '/manager') return 'managerLp';
    if (path === '/picker') return 'pickerLp';
    if (path === '/login') return 'login';
    return 'home';
  };

  const [view, setView] = useState(getInitialView);
  const [activeStoreId, setActiveStoreId] = useState(null);

  // --- 1. SYNC URL WITH STATE ---
  // Whenever 'view' changes, we update the browser URL
  useEffect(() => {
    let path = '/';
    if (view === 'adminLp') path = '/admin';
    else if (view === 'managerLp') path = '/manager';
    else if (view === 'pickerLp') path = '/picker';
    else if (view === 'login') path = '/login';

    else if (view === 'managePickers') path = `/manager/${activeStoreId}/manage-pickers`;
    else if (view === 'inventory') path = `/manager/${activeStoreId}/inventory`;
    else if (view === 'orderQueue') path = `/manager/${activeStoreId}/order-queue`;
    
    else path = '/';

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [view, activeStoreId]); // Add activeStoreId to dependencies

  // --- 2. HANDLE BROWSER BACK BUTTON ---
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') setView('adminLp');
      else if (path === '/manager') setView('managerLp');
      else if (path === '/picker') setView('pickerLp');
      else if (path === '/login') setView('login');
      else setView('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // --- Protected Role-Based Routes ---
  if (view === 'adminLp') {
    // UPDATED: Pass setView as 'onNavigate' to match the AdminLP component
    return <AdminLP onNavigate={setView} />;
  }

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

  if (view === 'pickerLp') {
    return <PickerLP onLogout={() => setView('login')} />;
  }

  // --- Public Routes ---
  if (view === 'login') {
    return <LoginPage onNavigate={setView} />;
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