import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';
import { TrendingUp, Clock, CheckCircle, AlertOctagon } from 'lucide-react';

const Performance = ({ onNavigate }) => {
  const isDark = document.documentElement.classList.contains('dark');

  // Dummy Data for Analytics
  const revenueData = [
    { name: 'Jan', revenue: 4000, cost: 2400 },
    { name: 'Feb', revenue: 3000, cost: 1398 },
    { name: 'Mar', revenue: 2000, cost: 9800 },
    { name: 'Apr', revenue: 2780, cost: 3908 },
    { name: 'May', revenue: 1890, cost: 4800 },
    { name: 'Jun', revenue: 2390, cost: 3800 },
    { name: 'Jul', revenue: 3490, cost: 4300 },
  ];

  const pickerPerformance = [
    { name: 'Team A', tasks: 120, time: 45 },
    { name: 'Team B', tasks: 98, time: 52 },
    { name: 'Team C', tasks: 86, time: 38 },
    { name: 'Team D', tasks: 99, time: 48 },
    { name: 'Team E', tasks: 85, time: 55 },
  ];

  return (
    <AdminLayout currentView="adminPerformance" onNavigate={onNavigate}>
      <div className="space-y-6">
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Performance Analytics</h2>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiCard title="Avg. Order Time" value="14m 32s" trend="+2.4%" icon={<Clock className="text-blue-500" />} />
          <KpiCard title="Fulfillment Rate" value="98.5%" trend="+1.2%" icon={<CheckCircle className="text-green-500" />} />
          <KpiCard title="Return Rate" value="1.2%" trend="-0.5%" icon={<TrendingUp className="text-purple-500" />} />
          <KpiCard title="System Alerts" value="3" trend="Normal" icon={<AlertOctagon className="text-amber-500" />} />
        </div>

        {/* CHARTS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue vs Cost Chart */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Revenue vs. Cost (6 Months)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Picker Efficiency Chart */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Picker Efficiency by Team</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pickerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    cursor={{fill: isDark ? '#374151' : '#f3f4f6'}}
                    contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#fff', borderRadius: '12px', border: 'none' }}
                  />
                  <Legend />
                  <Bar dataKey="tasks" name="Tasks Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="time" name="Avg Time (mins)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

// Helper Component for KPI Cards
const KpiCard = ({ title, value, trend, icon }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</h4>
      <span className={`text-xs font-semibold mt-1 inline-block ${trend.includes('+') ? 'text-green-500' : trend.includes('-') ? 'text-red-500' : 'text-slate-500'}`}>
        {trend} from last month
      </span>
    </div>
    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
      {icon}
    </div>
  </div>
);

export default Performance;