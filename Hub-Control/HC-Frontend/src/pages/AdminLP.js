import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Users, DollarSign, Package, Store } from 'lucide-react';
import { fetchAdminDashboard } from '../services/adminService'; // Import Service

const StatCard = ({ title, value, icon }) => (
  <div className="p-5 rounded-2xl border transition-all hover:scale-[1.02] bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-extrabold mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
        {icon}
      </div>
    </div>
  </div>
);

const AdminLP = ({ onNavigate }) => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme Observer for Charts
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        // REPLACED: Raw fetch with service call
        const data = await fetchAdminDashboard(userId);
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const formatCurrency = (val) => `$${val?.toLocaleString() || '0'}`;

  const processChartData = (weeklyData) => {
    if (!weeklyData || weeklyData.length === 0) return [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const processedData = [];

    weeklyData.forEach((salesValue, index) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - index)); // Corrected reverse logic
      processedData.push({
        day: days[d.getDay()],
        sales: salesValue
      });
    });
    return processedData;
  };

  if (loading) {
    return (
        <AdminLayout currentView="adminLp" onNavigate={onNavigate}>
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </AdminLayout>
    );
  }

  return (
    <AdminLayout currentView="adminLp" onNavigate={onNavigate}>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200">
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6 flex flex-col gap-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <StatCard title="Total Revenue" value={formatCurrency(dashboardData?.totalRevenue)} icon={<DollarSign size={22} />} />
            <StatCard title="Pending Orders" value={dashboardData?.pendingOrders || 0} icon={<ShoppingBag size={22} />} />
            <StatCard title="Processing" value={dashboardData?.processingOrders || 0} icon={<Package size={22} />} />
            <StatCard title="Completed" value={dashboardData?.completedOrders || 0} icon={<ShoppingBag size={22} />} />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* SALES CHART */}
            <div className="lg:col-span-2 p-5 rounded-2xl border animate-in fade-in slide-in-from-left-4 duration-500 bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-300">Weekly Sales</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processChartData(dashboardData?.weeklyData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e5e7eb'} />
                    <XAxis dataKey="day" stroke={isDark ? '#94a3b8' : '#475569'} />
                    <YAxis stroke={isDark ? '#94a3b8' : '#475569'} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#020617' : '#ffffff', borderColor: isDark ? '#1e293b' : '#e5e7eb', color: isDark ? '#e5e7eb' : '#020617', borderRadius: '12px' }} />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* USER DISTRIBUTION */}
            <div className="p-5 rounded-2xl border animate-in fade-in slide-in-from-right-4 duration-500 bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 text-slate-700 dark:text-slate-300">User Distribution</h3>
              <div className="space-y-5">
                {[
                  { label: 'Stores', active: dashboardData?.activeStores, total: dashboardData?.totalStores, icon: <Store size={18} /> },
                  { label: 'Managers', active: dashboardData?.activeManagers, total: dashboardData?.totalManagers, icon: <Users size={18} /> },
                  { label: 'Pickers', active: dashboardData?.activePickers, total: dashboardData?.totalPickers, icon: <Package size={18} /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-400">{item.icon}</div>
                      <p className="font-medium">{item.label}</p>
                    </div>
                    <span className="font-extrabold text-lg">{item.active || 0} / {item.total || 0}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLP;
