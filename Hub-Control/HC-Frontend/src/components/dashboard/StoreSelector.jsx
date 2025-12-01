// import React, { useRef } from 'react';
// import { Store, ChevronRight, ChevronLeft } from 'lucide-react';

// const StoreSelector = ({ stores, currentStoreId, onSelectStore }) => {
//   const scrollContainerRef = useRef(null);

//   // Helper to scroll the list if needed
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const { current } = scrollContainerRef;
//       const scrollAmount = 200;
//       current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Logic: If 4 or fewer, use grid. If more, use flex with scroll.
//   const isScrollable = stores.length > 4;

//   return (
//     <div className="w-full mb-8 relative group">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//           <Store className="text-blue-500" size={20} />
//           Select Store
//         </h2>
//         {isScrollable && (
//           <div className="flex gap-2">
//             <button 
//               onClick={() => scroll('left')}
//               className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
//             >
//               <ChevronLeft size={16} />
//             </button>
//             <button 
//               onClick={() => scroll('right')}
//               className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         )}
//       </div>

//       <div 
//         ref={scrollContainerRef}
//         className={`
//           ${isScrollable 
//             ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x' 
//             : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}
//         `}
//       >
//         {stores.map((store) => {
//           const isActive = store.id === currentStoreId;
//           return (
//             <div
//               key={store.id}
//               onClick={() => onSelectStore(store.id)}
//               className={`
//                 relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
//                 ${isScrollable ? 'min-w-[200px] snap-start' : ''}
//                 ${isActive 
//                   ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
//                   : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'}
//               `}
//             >
//               <div className="flex flex-col">
//                 <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
//                   Store ID: #{store.storeCode}
//                 </span>
//                 <span className={`font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
//                   {store.name}
//                 </span>
//                 <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
//                   <span className={`w-2 h-2 rounded-full ${store.isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
//                   {store.isOnline ? 'Online' : 'Offline'}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default StoreSelector;

import React, { useRef } from 'react';
import { Store, ChevronRight, ChevronLeft } from 'lucide-react';

const StoreSelector = ({ stores, currentStoreId, onSelectStore }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 200;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const isScrollable = stores.length > 4;

  return (
    <div className="w-full mb-8 relative group">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Store className="text-blue-500" size={20} />
          Select Store
        </h2>
        {isScrollable && (
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div 
        ref={scrollContainerRef}
        className={`
          ${isScrollable 
            ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x' 
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}
        `}
      >
        {stores.map((store) => {
          // FIX: Use store.storeId instead of store.id
          const isActive = store.storeId === currentStoreId;
          
          return (
            <div
              key={store.storeId} // FIX: Use storeId for React Key
              onClick={() => onSelectStore(store.storeId)} // FIX: Pass storeId to parent
              className={`
                relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
                ${isScrollable ? 'min-w-[200px] snap-start' : ''}
                ${isActive 
                  ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'}
              `}
            >
              <div className="flex flex-col">
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                  Store ID: #{store.storeId}
                </span>
                <span className={`font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {/* FIX: Ensure we use storeName if backend sends that, or fallback to name */}
                  {store.storeName || store.name}
                </span>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${store.isOnline ? 'bg-red-500' : 'bg-emerald-500' }`}></span>
                  {store.isOnline ? 'Offline' : 'Online' }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreSelector;