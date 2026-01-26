import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LayoutDashboard, Store, Users, Package, 
  BarChart2, LogOut, Map, Menu, Sun, Moon, Bell, X 
} from 'lucide-react';

import { logout } from '../../auth/authSlice';
import { useTheme } from '../../../context/ThemeContext'; // Ensure path is correct

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Hooks
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get user from Redux (fallback to "Admin")
  const adminName = useSelector((state) => state.auth.user) || "Admin";

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Menu Configuration
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Store Management', icon: <Store size={20} />, path: '/admin/stores' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Assign Stores', icon: <Map size={20} />, path: '/admin/mapping' },
    { name: 'Product Master', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Performance', icon: <BarChart2 size={20} />, path: '/admin/performance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed top-0 left-0 h-full border-r transition-all duration-300 z-30 
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700">
           {isSidebarOpen ? (
             <span className="font-bold text-2xl text-blue-600">HubControl</span>
           ) : (
             <span className="font-bold text-2xl text-blue-600">HC</span>
           )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex flex-col gap-2">
          {menuItems.map((item) => {
            // Check if current path matches
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left group
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'}
                `}
                title={!isSidebarOpen ? item.name : ''}
              >
                <div className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}>
                   {item.icon}
                </div>
                
                {isSidebarOpen && (
                   <span className="whitespace-nowrap font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-3">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors
              ${!isSidebarOpen && 'justify-center'}
            `}
            title="Logout"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {isSidebarOpen ? <X size={24}/> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            
            {/* Notification */}
            <div className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-slate-600 dark:text-slate-300">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </div>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

            {/* Profile */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block">
                    {adminName}
                </span>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                    {adminName.charAt(0).toUpperCase()}
                </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;