import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/layout/AdminNavbar';
import DashboardCard from '../components/ui/DashboardCard'; 
import { Users, ShoppingBag, Store, TrendingUp, Package, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Reusable Chart Placeholder (Styled for Dark Mode)
const ChartPlaceholder = ({ title }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-80 flex flex-col justify-center items-center text-slate-500 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <TrendingUp size={48} className="mb-4 text-slate-700" />
    <span className="mb-2 text-lg font-semibold text-slate-300 z-10">{title}</span>
    <span className="text-sm z-10">Visualization Component Loading...</span>
  </div>
);

const AdminLP = ({ onNavigate }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // 1. Default Theme is now 'dark'
  const [theme, setTheme] = useState('dark');
  
  // 2. Dummy Data (Since backend is not ready)
  const [stats, setStats] = useState({
    revenue: '$0',
    orders: 0,
    stores: 0,
    users: 0,
    alerts: []
  });

  // Theme Handler
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // Mock Data Initialization
  useEffect(() => {
    // Simulating API Fetch
    setTimeout(() => {
      setStats({
        revenue: '$1,245,000',
        orders: 15420,
        stores: 12,
        users: 145,
        alerts: [
            { id: 1, msg: "Low Stock Warning: 'Gaming Monitor 27' (Store #001)", type: 'critical' },
            { id: 2, msg: "Pending Manager Approval: Store #003 (Dallas Hub)", type: 'warning' },
            { id: 3, msg: "High Return Rate detected in 'Audio' category", type: 'info' }
        ]
      });
    }, 600);
  }, []);

  // --- Render Functions ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Revenue" 
          value={stats.revenue} 
          icon={<TrendingUp className="text-emerald-500" />} 
          trend={
             <span className="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded">
               <ArrowUpRight size={14} className="mr-1" /> +12.5%
             </span>
          }
        />
        <DashboardCard 
          title="Global Orders" 
          value={stats.orders.toLocaleString()} 
          icon={<ShoppingBag className="text-blue-500" />} 
          trend={
            <span className="flex items-center text-blue-400 text-xs font-medium bg-blue-400/10 px-2 py-1 rounded">
               <ArrowUpRight size={14} className="mr-1" /> +5.2%
             </span>
          }
        />
        <DashboardCard 
          title="Active Hubs" 
          value={stats.stores} 
          icon={<Store className="text-purple-500" />} 
          trend={
            <span className="text-slate-500 text-xs">All systems operational</span>
          }
        />
        <DashboardCard 
          title="Total Users" 
          value={stats.users} 
          icon={<Users className="text-orange-500" />} 
          trend={
            <span className="flex items-center text-orange-400 text-xs font-medium bg-orange-400/10 px-2 py-1 rounded">
               <ArrowUpRight size={14} className="mr-1" /> +3 New
             </span>
          }
        />
      </div>

      {/* Analytics & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
            <ChartPlaceholder title="Global Revenue Analytics (2025)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartPlaceholder title="Top Performing Stores" />
                <ChartPlaceholder title="Category Distribution" />
            </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="lg:col-span-1 bg-slate-900/50 rounded-xl border border-slate-800 p-6 h-full">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" /> System Alerts
            </h3>
            <div className="space-y-3">
            {stats.alerts.length === 0 ? (
                <p className="text-slate-500 text-sm">No active alerts.</p>
            ) : (
                stats.alerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors group">
                        <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${
                                alert.type === 'critical' ? 'bg-red-500' : 
                                alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}></div>
                            <div>
                                <p className="text-slate-300 text-sm font-medium leading-snug group-hover:text-white">{alert.msg}</p>
                                <span className="text-xs text-slate-500 mt-1 block">Just now</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-blue-400 hover:text-blue-300 border border-dashed border-slate-700 rounded-lg hover:bg-slate-800/50 transition-all">
                View All Notifications
            </button>
        </div>
      </div>
    </div>
  );

  const renderStoreManagement = () => (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div>
            <h2 className="text-lg font-bold text-white">Hub Master List</h2>
            <p className="text-slate-400 text-sm">Manage all warehouse locations</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
          + Add New Hub
        </button>
      </div>
      
      {/* Dummy Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Store ID</th>
              <th className="px-6 py-4">Store Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Manager</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-500">ST-00{i}</td>
                <td className="px-6 py-4 font-medium text-white">
                    {i === 1 ? 'Central Hub NY' : i === 2 ? 'West Coast Distribution' : 'Austin Fulfillment'}
                </td>
                <td className="px-6 py-4">{i === 1 ? 'New York, NY' : i === 2 ? 'Los Angeles, CA' : 'Austin, TX'}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                        {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MR'}
                    </div>
                    {i === 1 ? 'John Doe' : i === 2 ? 'Alice Smith' : 'Mike Ross'}
                </td>
                <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                        Operational
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white`}>
      <AdminNavbar theme={theme} toggleTheme={toggleTheme} onNavigate={onNavigate} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block h-[calc(100vh-64px)] sticky top-16 p-4 border-r border-slate-800 bg-slate-950/50">
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Overview', icon: <TrendingUp size={18} /> },
              { id: 'stores', label: 'Hub Management', icon: <Store size={18} /> },
              { id: 'users', label: 'User Roles', icon: <Users size={18} /> },
              { id: 'inventory', label: 'Global Inventory', icon: <Package size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activeModule === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-8 left-4 right-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">System Health</h4>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-1">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
                <span>Server Online</span>
                <span className="text-emerald-400">98%</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
             <div className="mb-8">
              <h2 className="text-2xl font-bold text-white capitalize">
                {activeModule === 'dashboard' ? 'Executive Overview' : 
                 activeModule === 'stores' ? 'Hub Management' : 'Kalapi'}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {activeModule === 'dashboard' ? 'Real-time insights across all distribution centers.' : 'Manage your warehouse network settings.'}
              </p>
            </div>
            
            {activeModule === 'dashboard' && renderDashboard()}
            {activeModule === 'stores' && renderStoreManagement()}
            {activeModule === 'users' && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                    <Users size={48} className="mb-4 opacity-50" />
                    <p>User Management Module Placeholder</p>
                </div>
            )}
            {activeModule === 'inventory' && (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                    <Package size={48} className="mb-4 opacity-50" />
                    <p>Global Inventory Module Placeholder</p>
                 </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLP;