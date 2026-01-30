import React, { useState, useEffect, useRef } from 'react';
import DashboardCard from './DashboardCard';
import { Package, Clock, CheckCircle, Loader } from 'lucide-react';

// --- INTERNAL COMPONENT: FLASHING NUMBER ---
const FlashingNumber = ({ value, type }) => {
  const [flash, setFlash] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    // Only flash if the value has actually changed
    if (prevValueRef.current !== value) {
      setFlash(true);
      prevValueRef.current = value;

      // Remove flash class after 500ms
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [value]);

  // Determine Flash Color based on Type
  const getFlashClass = () => {
    switch (type) {
      case 'pending':
        return 'text-amber-500 dark:text-amber-400 scale-125 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]';
      case 'progress':
        return 'text-blue-500 dark:text-blue-400 scale-125 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]';
      case 'completed':
        return 'text-emerald-500 dark:text-emerald-400 scale-125 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]';
      default:
        return 'text-slate-500 scale-110';
    }
  };

  return (
    <h2 
      className={`text-5xl font-bold mb-2 tracking-tight transition-all duration-300 ease-out 
      ${flash ? getFlashClass() : 'text-slate-900 dark:text-white scale-100'}`}
    >
      {value}
    </h2>
  );
};

// --- MAIN COMPONENT ---
const OrderTabsCard = ({ pending = 0, progress = 0, completed = 0, total = 0 }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const data = {
    pending: { 
        count: pending, 
        label: "Pending Batches", 
        icon: Clock, 
        color: "text-amber-400", 
    },
    progress: { 
        count: progress, 
        label: "Picking Now", 
        icon: Loader, 
        color: "text-blue-400", 
    },
    completed: { 
        count: completed, 
        label: "Completed Today", 
        icon: CheckCircle, 
        color: "text-emerald-400", 
    },
    total: { 
        count: total, 
        label: "Total Orders", 
        icon: Package, 
        color: "text-slate-200", 
    }
  };

  const current = data[activeTab];
  const Icon = current.icon;

  return (
    <DashboardCard className="h-full">
      {/* Tab Switcher */}
      <div className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl flex mb-6">
        {Object.keys(data).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize
              ${activeTab === key 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/50'}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-center py-4">
        <div className={`inline-flex items-center justify-center p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4`}>
          <Icon size={32} className={`${current.color}`} />
        </div>
        
        {/* ANIMATED NUMBER COMPONENT */}
        <FlashingNumber 
            key={activeTab} // Key forces a clean mount when switching tabs so it doesn't flash
            value={current.count} 
            type={activeTab} 
        />
        
        <p className="text-slate-500 dark:text-slate-400 font-medium">{current.label}</p>
      </div>

      {/* Footer Info */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
         <div className="text-sm text-slate-400 italic">
            {current.count === 0 ? "No orders in this category." : "View details in Reports."}
         </div>
      </div>
    </DashboardCard>
  );
};

export default OrderTabsCard;

// import React, { useState } from 'react';
// import DashboardCard from './DashboardCard';
// import { Package, Clock, CheckCircle, Loader } from 'lucide-react';

// const OrderTabsCard = ({ pending = 0, progress = 0, completed = 0, total = 0 }) => {
//   const [activeTab, setActiveTab] = useState('pending');

//   const data = {
//     pending: { 
//         count: pending, 
//         label: "Pending Batches", 
//         icon: Clock, 
//         color: "text-amber-400", 
//         list: [] 
//     },
//     progress: { 
//         count: progress, 
//         label: "Picking Now", 
//         icon: Loader, 
//         color: "text-blue-400", 
//         list: [] 
//     },
//     completed: { 
//         count: completed, 
//         label: "Completed Today", 
//         icon: CheckCircle, 
//         color: "text-emerald-400", 
//         list: [] 
//     },
//     total: { 
//         count: total, 
//         label: "Total Orders", 
//         icon: Package, 
//         color: "text-slate-200", 
//         list: [] 
//     }
//   };

//   const current = data[activeTab];
//   const Icon = current.icon;

//   return (
//     <DashboardCard className="h-full">
//       {/* Tab Switcher */}
//       <div className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl flex mb-6">
//         {Object.keys(data).map((key) => (
//           <button
//             key={key}
//             onClick={() => setActiveTab(key)}
//             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 capitalize
//               ${activeTab === key 
//                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
//                 : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700/50'}`}
//           >
//             {key}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="text-center py-4">
//         <div className={`inline-flex items-center justify-center p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4`}>
//           <Icon size={32} className={`${current.color}`} />
//         </div>
        
//         <h2 key={current.count} className="text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight animate-in fade-in zoom-in duration-300">
//             {current.count}
//         </h2>
        
//         <p className="text-slate-500 dark:text-slate-400 font-medium">{current.label}</p>
//       </div>

//       {/* Footer Info */}
//       <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
//          <div className="text-sm text-slate-400 italic">
//             {current.count === 0 ? "No orders in this category." : "View details in Reports."}
//          </div>
//       </div>
//     </DashboardCard>
//   );
// };

// export default OrderTabsCard;