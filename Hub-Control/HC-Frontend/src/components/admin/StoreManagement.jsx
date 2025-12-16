import React from 'react';

const StoreManagement = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Hub Master List</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage all warehouse locations</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          + Add New Hub
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Store ID</th>
              <th className="px-6 py-4">Store Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Manager</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-500">ST-00{i}</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {i === 1 ? 'Central Hub NY' : i === 2 ? 'West Coast Distribution' : 'Austin Fulfillment'}
                </td>
                <td className="px-6 py-4">{i === 1 ? 'New York, NY' : i === 2 ? 'Los Angeles, CA' : 'Austin, TX'}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-600 dark:text-white font-bold border border-slate-300 dark:border-slate-700">
                        {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MR'}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{i === 1 ? 'John Doe' : i === 2 ? 'Alice Smith' : 'Mike Ross'}</span>
                </td>
                <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs rounded-full border border-emerald-200 dark:border-emerald-500/20 font-bold">
                        Operational
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline">Edit</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreManagement;