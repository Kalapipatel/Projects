import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const StoreManagement = ({ onNavigate }) => {
  return (
    // Wrapping in AdminLayout ensures Sidebar & Header persist
    <AdminLayout currentView="adminStores" onNavigate={onNavigate}>
      
      {/* YOUR SAMPLE CODE START */}
      <div
        className="
          rounded-2xl border transition-colors duration-300
          bg-white border-slate-200 text-slate-900
          dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200
        "
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Hub Master List
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage all warehouse locations
            </p>
          </div>

          <button
            className="
              px-4 py-2 rounded-xl text-sm font-bold
              bg-blue-600 text-white
              hover:bg-blue-700 transition-colors
              shadow-lg shadow-blue-500/20
              active:scale-95
            "
          >
            + Add New Hub
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              className="
                text-xs font-bold uppercase
                bg-slate-50 text-slate-700
                dark:bg-slate-950 dark:text-slate-300
                border-b border-slate-200 dark:border-slate-800
              "
            >
              <tr>
                <th className="px-6 py-4 text-left">Store ID</th>
                <th className="px-6 py-4 text-left">Store Name</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Manager</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[1, 2, 3].map((i) => (
                <tr
                  key={i}
                  className="
                    transition-colors
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/40
                  "
                >
                  <td className="px-6 py-4 font-mono text-slate-500">
                    ST-00{i}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {i === 1
                      ? 'Central Hub NY'
                      : i === 2
                      ? 'West Coast Distribution'
                      : 'Austin Fulfillment'}
                  </td>

                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {i === 1
                      ? 'New York, NY'
                      : i === 2
                      ? 'Los Angeles, CA'
                      : 'Austin, TX'}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-8 h-8 rounded-full flex items-center justify-center
                          text-xs font-bold
                          bg-slate-200 text-slate-700
                          dark:bg-slate-800 dark:text-slate-200
                          border border-slate-300 dark:border-slate-700
                        "
                      >
                        {i === 1 ? 'JD' : i === 2 ? 'AS' : 'MR'}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">
                        {i === 1
                          ? 'John Doe'
                          : i === 2
                          ? 'Alice Smith'
                          : 'Mike Ross'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="
                        inline-flex items-center
                        px-2.5 py-1 rounded-full text-xs font-bold
                        bg-emerald-100 text-emerald-700 border border-emerald-200
                        dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20
                      "
                    >
                      Operational
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      className="
                        font-medium
                        text-blue-600 hover:text-blue-800
                        dark:text-blue-400 dark:hover:text-blue-300
                        hover:underline
                      "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* YOUR SAMPLE CODE END */}

    </AdminLayout>
  );
};

export default StoreManagement;