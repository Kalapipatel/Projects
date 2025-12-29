import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Bell } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children, currentView, onNavigate }) => {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // FIX: Use 'username' to match LoginPage.js storage key
  const adminName = localStorage.getItem('username') || "Admin";

  // Apply Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        darkMode={darkMode} 
        currentView={currentView} 
        onNavigate={onNavigate} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-0 z-10`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            <div className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            
            <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {adminName}
                </span>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {adminName.charAt(0).toUpperCase()}
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


// import React, { useState, useEffect } from 'react';
// import { Menu, Moon, Sun, Bell } from 'lucide-react';
// import AdminSidebar from './AdminSidebar';

// const AdminLayout = ({ children, currentView, onNavigate }) => {
//   // Theme State
//   // NEW: Default to true (Dark) if theme is 'dark' OR if no theme is saved yet
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? savedTheme === 'dark' : true; 
//   });
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   // Get Admin Name from Local Storage (Assuming it was stored during login)
//   const adminName = localStorage.getItem('userName') || "Admin";

//   // Apply Theme
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const toggleTheme = () => setDarkMode(!darkMode);

//   return (
//     <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
//       {/* Sidebar - Passed Navigation Props */}
//       <AdminSidebar 
//         isOpen={isSidebarOpen} 
//         darkMode={darkMode} 
//         currentView={currentView} 
//         onNavigate={onNavigate} 
//       />

//       {/* Main Content Area */}
//       <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
//         {/* Header */}
//         <header className={`h-16 flex items-center justify-between px-6 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-0 z-10`}>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//               {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
//             </button>
//             <div className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </div>
//             {/* Dynamic Admin Name Display */}
//             <div className="flex items-center gap-3">
//                 <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {adminName}
//                 </span>
//                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//                     {adminName.charAt(0).toUpperCase()}
//                 </div>
//             </div>
//           </div>
//         </header>

//         {/* Dynamic Page Content */}
//         <main className="p-6 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;