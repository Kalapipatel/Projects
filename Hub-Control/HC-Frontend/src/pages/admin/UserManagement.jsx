// import React from 'react';
// import AdminLayout from '../../components/admin/AdminLayout';

// const UserManagement = () => {
//   return (
//     <AdminLayout>
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
//         Dummy Data: Table of Managers and Pickers.
//       </div>
//     </AdminLayout>
//   );
// };
// export default UserManagement;

import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function UserManagement({ onNavigate }) {
  return (
    <AdminLayout currentView="adminUsers" onNavigate={onNavigate}>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        User Management Table goes here
      </div>
    </AdminLayout>
  );
}
