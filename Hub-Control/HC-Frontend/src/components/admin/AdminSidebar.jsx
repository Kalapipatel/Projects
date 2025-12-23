import React from 'react';
import { LayoutDashboard, Store, Users, Package, BarChart2, LogOut, Map } from 'lucide-react'; // Added Map icon

const AdminSidebar = ({ isOpen, darkMode, currentView, onNavigate }) => {
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, view: 'adminLp' },
    { name: 'Store Management', icon: <Store size={20} />, view: 'adminStores' },
    { name: 'User Management', icon: <Users size={20} />, view: 'adminUsers' },
    { name: 'Assign Stores', icon: <Map size={20} />, view: 'assignStores' }, // NEW ITEM
    { name: 'Inventory', icon: <Package size={20} />, view: 'adminInventory' },
    { name: 'Performance', icon: <BarChart2 size={20} />, view: 'adminPerformance' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full border-r transition-all duration-300 z-20 
      ${isOpen ? 'w-64' : 'w-20'} 
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-700/50">
        <span className={`font-bold text-2xl text-blue-500 ${!isOpen && 'hidden'}`}>HubControl</span>
      </div>

      <nav className="mt-6 px-3 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'}
              `}
            >
              {item.icon}
              <span className={`whitespace-nowrap font-medium ${!isOpen && 'hidden'}`}>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-3">
        <button 
          onClick={() => onNavigate('login')}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className={`font-medium ${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;