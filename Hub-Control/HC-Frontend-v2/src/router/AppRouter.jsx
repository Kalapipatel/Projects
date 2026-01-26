import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// --- Layouts ---
import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/layout/Footer';
import { useTheme } from '../context/ThemeContext';

// --- Page Imports (Ensure you move your old files to these paths later) ---
import LandingPage from '../modules/LandingPage'; 
import LoginPage from '../modules/auth/LoginPage';

// Manager Pages
import ManagerLP from '../modules/manager/ManagerLP';
import ManagePickers from '../modules/manager/ManagePickers';
import Inventory from '../modules/manager/Inventory';
import OrderQueue from '../modules/manager/OrderQueue';

// Admin Pages
import AdminLP from '../modules/admin/AdminLP';
import StoreManagement from '../modules/admin/StoreManagement';
import UserManagement from '../modules/admin/UserManagement';
import AssignStore from '../modules/admin/AssignStore';
import ProductManagement from '../modules/admin/ProductManagement';
import Performance from '../modules/admin/Performance';

// Picker Pages
import PickerLP from '../modules/picker/PickerLP';

// --- 1. Layout Wrappers ---

// Layout for Public Pages (Home) - Matches old logic with Navbar/Footer
const PublicLayout = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
      {/* Pass theme props to Navbar as required by your old code */}
      <Navbar 
        onNavigate={() => {}} // Deprecated in v6, but kept to prevent prop error
        currentPage="home" 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Protected Route Wrapper - Replaces 'view' state checks
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, roleId } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Add Role Checking here (e.g., if roleId doesn't match allowedRoles)
  // For now, we trust the backend/login redirect logic, but strict checking is better.
  
  return <Outlet />;
};

// --- 2. Main Router Logic ---
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Login (Standalone - No Navbar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- MANAGER MODULE (Role ID: 2) --- */}
        <Route path="/manager" element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route index element={<ManagerLP />} />
          {/* Matches old regex: /manager/:id/manage-pickers */}
          <Route path=":storeId/manage-pickers" element={<ManagePickers />} />
          <Route path=":storeId/inventory" element={<Inventory />} />
          <Route path=":storeId/order-queue" element={<OrderQueue />} />
        </Route>

        {/* --- ADMIN MODULE (Role ID: 1) --- */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route index element={<AdminLP />} />
          <Route path="stores" element={<StoreManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="mapping" element={<AssignStore />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="performance" element={<Performance />} />
        </Route>

        {/* --- PICKER MODULE (Role ID: 3) --- */}
        <Route path="/picker" element={<ProtectedRoute allowedRoles={[3]} />}>
          <Route index element={<PickerLP />} />
        </Route>

        {/* Catch All -> Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;