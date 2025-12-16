import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Users, DollarSign, Package, Store } from 'lucide-react';

const salesData = [
  { day: 'Mon', sales: 4000 },
  { day: 'Tue', sales: 3000 },
  { day: 'Wed', sales: 5000 },
  { day: 'Thu', sales: 2780 },
  { day: 'Fri', sales: 1890 },
  { day: 'Sat', sales: 6390 },
  { day: 'Sun', sales: 3490 },
];

const StatCard = ({ title, value, icon, isDark }) => (
  <div
    className={`p-5 rounded-2xl border transition-all hover:scale-[1.02]
      ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900'}
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
        <h3 className="text-2xl font-extrabold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
        {icon}
      </div>
    </div>
  </div>
);

const AdminLP = ({ onNavigate }) => {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const isDark = theme === 'dark';

  return (
    <AdminLayout currentView="adminLp" onNavigate={onNavigate}>
      <div
        className={`min-h-screen transition-colors duration-300
          ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}
        `}
      >
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6 flex flex-col gap-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <StatCard title="Total Revenue" value="$128,430" icon={<DollarSign size={22} />} isDark={isDark} />
            <StatCard title="Pending Orders" value="45" icon={<ShoppingBag size={22} />} isDark={isDark} />
            <StatCard title="Processing" value="12" icon={<Package size={22} />} isDark={isDark} />
            <StatCard title="Completed" value="892" icon={<ShoppingBag size={22} />} isDark={isDark} />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* SALES CHART */}
            <div
              className={`lg:col-span-2 p-5 rounded-2xl border animate-in fade-in slide-in-from-left-4 duration-500
                ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
              `}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Weekly Sales
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? '#334155' : '#e5e7eb'}
                    />
                    <XAxis dataKey="day" stroke={isDark ? '#94a3b8' : '#475569'} />
                    <YAxis stroke={isDark ? '#94a3b8' : '#475569'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#020617' : '#ffffff',
                        borderColor: isDark ? '#1e293b' : '#e5e7eb',
                        color: isDark ? '#e5e7eb' : '#020617',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* USER DISTRIBUTION */}
            <div
              className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-right-4 duration-500
                ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
              `}
            >
              <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                User Distribution
              </h3>

              <div className="space-y-5">
                {[
                  { label: 'Stores', count: 12, icon: <Store size={18} /> },
                  { label: 'Managers', count: 24, icon: <Users size={18} /> },
                  { label: 'Pickers', count: 145, icon: <Package size={18} /> },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl
                      ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg
                          ${isDark ? 'bg-slate-700 text-blue-400' : 'bg-white text-blue-600'}
                        `}
                      >
                        {item.icon}
                      </div>
                      <p className="font-medium">{item.label}</p>
                    </div>
                    <span className="font-extrabold text-lg">{item.count}</span>
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
