import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Users, DollarSign, Package, Store } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; 
import { fetchAdminDashboard } from '../../services/adminService'; // Ensure this file exists
import AdminLayout from './components/AdminLayout'; 

const StatCard = ({ title, value, icon }) => (
  <div className="p-5 rounded-2xl border transition-all hover:scale-[1.02] bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
        {icon}
      </div>
    </div>
  </div>
);

const AdminLP = () => {
  const { darkMode } = useTheme(); 
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- REPLACED MOCK DATA WITH REAL-TIME POLLING ---
  useEffect(() => {
    let isMounted = true; // Prevents state updates if user navigates away
    const userId = localStorage.getItem('userId');

    const loadDashboard = async () => {
      try {
        // We do not set loading=true here to prevent flickering on every poll
        const data = await fetchAdminDashboard(userId);
        
        if (isMounted) {
          setDashboardData(data);
          setLoading(false); // Only stop loading after first successful fetch
        }
      } catch (error) {
        console.error("Dashboard load failed:", error);
        if (isMounted) setLoading(false);
      }
    };

    // 1. Initial Load
    loadDashboard();

    // 2. Real-Time Polling (Every 10 mins)
    // This meets Requirement C (Updates without refresh)
    const intervalId = setInterval(loadDashboard, 10 * 60 * 1000 );

    // 3. Cleanup on Unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const formatCurrency = (val) => `$${val?.toLocaleString() || '0'}`;

  const processChartData = (weeklyData) => {
    if (!weeklyData || weeklyData.length === 0) return [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const processedData = [];

    weeklyData.forEach((salesValue, index) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - index));
      processedData.push({
        day: days[d.getDay()],
        sales: salesValue
      });
    });
    return processedData;
  };

  if (loading) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400">Overview of all dark stores and operations</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value={formatCurrency(dashboardData?.totalRevenue)} icon={<DollarSign size={22} />} />
          <StatCard title="Pending Orders" value={dashboardData?.pendingOrders || 0} icon={<ShoppingBag size={22} />} />
          <StatCard title="Processing" value={dashboardData?.processingOrders || 0} icon={<Package size={22} />} />
          <StatCard title="Completed" value={dashboardData?.completedOrders || 0} icon={<ShoppingBag size={22} />} />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* SALES CHART */}
          <div className="lg:col-span-2 p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-300">Weekly Sales</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processChartData(dashboardData?.weeklyData)}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e5e7eb'} />
                  <XAxis dataKey="day" stroke={darkMode ? '#94a3b8' : '#475569'} />
                  <YAxis stroke={darkMode ? '#94a3b8' : '#475569'} />
                  <Tooltip 
                    contentStyle={{ 
                        backgroundColor: darkMode ? '#020617' : '#ffffff', 
                        borderColor: darkMode ? '#1e293b' : '#e5e7eb', 
                        color: darkMode ? '#e5e7eb' : '#020617', 
                        borderRadius: '12px' 
                    }} 
                   />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* USER DISTRIBUTION */}
          <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-700 dark:text-slate-300">User Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Stores', active: dashboardData?.activeStores, total: dashboardData?.totalStores, icon: <Store size={18} /> },
                { label: 'Managers', active: dashboardData?.activeManagers, total: dashboardData?.totalManagers, icon: <Users size={18} /> },
                { label: 'Pickers', active: dashboardData?.activePickers, total: dashboardData?.totalPickers, icon: <Package size={18} /> },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-400 shadow-sm">{item.icon}</div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                  </div>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">{item.active || 0} <span className="text-slate-400 text-sm font-normal">/ {item.total || 0}</span></span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLP;

// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { ShoppingBag, Users, DollarSign, Package, Store } from 'lucide-react';
// import { useTheme } from '../../context/ThemeContext'; // Use our context
// import { fetchAdminDashboard } from '../../services/adminService';
// import AdminLayout from './components/AdminLayout'; // Import the layout we just made

// const StatCard = ({ title, value, icon }) => (
//   <div className="p-5 rounded-2xl border transition-all hover:scale-[1.02] bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
//         <h3 className="text-2xl font-extrabold mt-1">{value}</h3>
//       </div>
//       <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// const AdminLP = () => {
//   const { darkMode } = useTheme(); // Replaces MutationObserver
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- MOCK DATA FALLBACK (If API fails or is empty during dev) ---
//   const mockData = {
//     totalRevenue: 125000,
//     pendingOrders: 45,
//     processingOrders: 12,
//     completedOrders: 890,
//     weeklyData: [12000, 15000, 8000, 19000, 24000, 18000, 28000],
//     activeStores: 4, totalStores: 5,
//     activeManagers: 4, totalManagers: 6,
//     activePickers: 12, totalPickers: 20
//   };

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         // In real app, uncomment next line:
//         const data = await fetchAdminDashboard(userId);
        
//         // Simulating API delay with mock data for display
//         setTimeout(() => {
//             setDashboardData(mockData);
//             setLoading(false);
//         }, 800);
//       } catch (error) {
//         console.error("Dashboard load failed:", error);
//         setLoading(false);
//       }
//     };
//     loadDashboard();
//   }, []);

//   const formatCurrency = (val) => `$${val?.toLocaleString() || '0'}`;

//   const processChartData = (weeklyData) => {
//     if (!weeklyData || weeklyData.length === 0) return [];
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const today = new Date();
//     const processedData = [];

//     weeklyData.forEach((salesValue, index) => {
//       const d = new Date();
//       d.setDate(today.getDate() - (6 - index));
//       processedData.push({
//         day: days[d.getDay()],
//         sales: salesValue
//       });
//     });
//     return processedData;
//   };

//   if (loading) {
//     return (
//         <AdminLayout>
//             <div className="flex items-center justify-center h-[80vh]">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="flex flex-col gap-6">
        
//         {/* Header */}
//         <div>
//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
//             <p className="text-slate-500 dark:text-slate-400">Overview of all dark stores and operations</p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard title="Total Revenue" value={formatCurrency(dashboardData?.totalRevenue)} icon={<DollarSign size={22} />} />
//           <StatCard title="Pending Orders" value={dashboardData?.pendingOrders || 0} icon={<ShoppingBag size={22} />} />
//           <StatCard title="Processing" value={dashboardData?.processingOrders || 0} icon={<Package size={22} />} />
//           <StatCard title="Completed" value={dashboardData?.completedOrders || 0} icon={<ShoppingBag size={22} />} />
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* SALES CHART */}
//           <div className="lg:col-span-2 p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
//             <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-300">Weekly Sales</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={processChartData(dashboardData?.weeklyData)}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e5e7eb'} />
//                   <XAxis dataKey="day" stroke={darkMode ? '#94a3b8' : '#475569'} />
//                   <YAxis stroke={darkMode ? '#94a3b8' : '#475569'} />
//                   <Tooltip 
//                     contentStyle={{ 
//                         backgroundColor: darkMode ? '#020617' : '#ffffff', 
//                         borderColor: darkMode ? '#1e293b' : '#e5e7eb', 
//                         color: darkMode ? '#e5e7eb' : '#020617', 
//                         borderRadius: '12px' 
//                     }} 
//                    />
//                   <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* USER DISTRIBUTION */}
//           <div className="p-5 rounded-2xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
//             <h3 className="text-lg font-bold mb-6 text-slate-700 dark:text-slate-300">User Distribution</h3>
//             <div className="space-y-4">
//               {[
//                 { label: 'Stores', active: dashboardData?.activeStores, total: dashboardData?.totalStores, icon: <Store size={18} /> },
//                 { label: 'Managers', active: dashboardData?.activeManagers, total: dashboardData?.totalManagers, icon: <Users size={18} /> },
//                 { label: 'Pickers', active: dashboardData?.activePickers, total: dashboardData?.totalPickers, icon: <Package size={18} /> },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-400 shadow-sm">{item.icon}</div>
//                     <p className="font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
//                   </div>
//                   <span className="font-bold text-lg text-slate-900 dark:text-white">{item.active || 0} <span className="text-slate-400 text-sm font-normal">/ {item.total || 0}</span></span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminLP;