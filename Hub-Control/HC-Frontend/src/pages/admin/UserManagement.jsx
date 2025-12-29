import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UserModal from '../../components/admin/UserModal';
import { getAllUsers, deleteUser } from '../../services/adminService'; // Import Service

const UserManagement = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('manager'); // 'manager' or 'picker'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // REPLACED: Raw fetch with service call
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure? This user will lose access immediately.")) return;
    try {
        // REPLACED: Raw fetch with service call
        await deleteUser(userId);
        setUsers(prev => prev.filter(u => u.userId !== userId));
    } catch (error) { 
        alert("Failed to delete user. Ensure they are not assigned to active tasks.");
    }
  };

  const handleModalSuccess = (resultUser, isEditMode) => {
    if (isEditMode) {
        setUsers(prev => prev.map(u => u.userId === resultUser.userId ? resultUser : u));
    } else {
        setUsers(prev => [...prev, resultUser]);
    }
  };

  // Filter users based on active tab (Role ID 2 = Manager, 3 = Picker)
  const filteredUsers = users.filter(user => 
    activeTab === 'manager' ? user.role.roleId === 2 : user.role.roleId === 3
  );

  return (
    <AdminLayout currentView="adminUsers" onNavigate={onNavigate}>
      
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
        userToEdit={userToEdit}
      />

      <div className="rounded-2xl border bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
        
        {/* HEADER & TABS */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">User Management</h2>
              <p className="text-sm text-slate-500">Manage access for Managers and Pickers</p>
            </div>
            <button onClick={handleOpenAdd} className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              + Add User
            </button>
          </div>

          <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('manager')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'manager' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Managers
            </button>
            <button 
              onClick={() => setActiveTab('picker')}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'picker' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Pickers
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-b">
              <tr>
                <th className="px-6 py-4 text-left">User ID</th>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-left">Email / Username</th>
                <th className="px-6 py-4 text-left">Age</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-6">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-6 text-slate-500">No {activeTab}s found.</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">USR-{user.userId}</td>
                  <td className="px-6 py-4 font-semibold">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{user.email}</div>
                    <div className="text-xs text-slate-500">@{user.username}</div>
                  </td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      user.active 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                        : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                    }`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleOpenEdit(user)} className="text-blue-600 hover:underline font-medium">Edit</button>
                      <button onClick={() => handleDelete(user.userId)} className="text-red-600 hover:underline font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
