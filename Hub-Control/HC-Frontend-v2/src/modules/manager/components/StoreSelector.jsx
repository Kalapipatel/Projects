import React from 'react';
import { Store, CheckCircle2 } from 'lucide-react';

const StoreSelector = ({ stores = [], currentStoreId, onSelectStore }) => {
  if (!stores || stores.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {stores.map((store) => {
        const isActive = store.storeId === currentStoreId;
        return (
          <button
            key={store.storeId}
            onClick={() => onSelectStore(store.storeId)}
            className={`
              relative flex items-center p-4 rounded-xl border transition-all duration-200 text-left group
              ${isActive 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500'
              }
            `}
          >
            <div className={`p-3 rounded-lg mr-4 ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
              <Store size={24} className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-bold truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {store.storeName}
              </div>
              <div className={`text-xs truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {store.location || 'Hub Location'}
              </div>
            </div>
            {isActive && <CheckCircle2 className="absolute top-2 right-2 text-white/50" size={16} />}
          </button>
        );
      })}
    </div>
  );
};

export default StoreSelector;