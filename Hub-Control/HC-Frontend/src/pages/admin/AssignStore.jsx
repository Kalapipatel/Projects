import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { User, CheckCircle, Store } from 'lucide-react';

const AssignStore = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedStoreIds, setCheckedStoreIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, storesRes] = await Promise.all([
          fetch('http://localhost:8080/api/admin/getAllUsers'),
          fetch('http://localhost:8080/api/admin/getAllStores')
        ]);
        
        const usersData = await usersRes.json();
        const storesData = await storesRes.json();
        
        // Filter out Admins (RoleId 1) - we only assign stores to Managers(2) and Pickers(3)
        setUsers(usersData.filter(u => u.role.roleId !== 1)); 
        setStores(storesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // When a user is selected, load their assigned stores
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Assuming backend User object has a 'stores' array
    // If not populated by backend, you might need to fetch user details individually
    const userStoreIds = user.stores ? user.stores.map(s => s.storeId) : [];
    setCheckedStoreIds(userStoreIds);
  };

  const handleCheckboxChange = (storeId) => {
    setCheckedStoreIds(prev => 
      prev.includes(storeId) 
        ? prev.filter(id => id !== storeId) 
        : [...prev, storeId]
    );
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setSaving(true);

    try {
      const response = await fetch('http://localhost:8080/api/admin/assignStore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.userId,
          storeIds: checkedStoreIds
        })
      });

      if (response.ok) {
        alert("Stores assigned successfully!");
        // Update local state to reflect changes without refresh
        setUsers(prev => prev.map(u => {
            if(u.userId === selectedUser.userId) {
                // Update the user's local store list so if we click them again, it's correct
                const updatedStores = stores.filter(s => checkedStoreIds.includes(s.storeId));
                return { ...u, stores: updatedStores };
            }
            return u;
        }));
      } else {
        alert("Failed to assign stores.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Server error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout currentView="assignStores" onNavigate={onNavigate}>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        
        {/* LEFT PANEL: USER LIST */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <User size={18} /> Select User
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loading ? <p className="p-4 text-center text-slate-500">Loading...</p> : 
             users.map(user => (
              <div 
                key={user.userId}
                onClick={() => handleUserSelect(user)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedUser?.userId === user.userId 
                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 dark:bg-blue-900/20 dark:border-blue-500' 
                  : 'bg-white border-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-slate-500">{user.role.roleName} • @{user.username}</p>
                  </div>
                  {selectedUser?.userId === user.userId && <CheckCircle size={16} className="text-blue-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: STORE MAPPING */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Store size={18} /> Assign Stores
            </h3>
            {selectedUser && (
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Mapping for: {selectedUser.firstName}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!selectedUser ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Store size={48} className="mb-4 opacity-20" />
                <p>Select a user from the left to manage their stores.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stores.map(store => {
                  const isChecked = checkedStoreIds.includes(store.storeId);
                  return (
                    <label 
                      key={store.storeId}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800' 
                        : 'bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-950 dark:border-slate-800'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="mt-1 w-5 h-5 accent-blue-600"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(store.storeId)}
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{store.storeName}</p>
                        <p className="text-xs text-slate-500 mt-1">{store.address}</p>
                        <span className={`inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          store.status ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {store.status ? 'Operational' : 'Closed'}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {selectedUser && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Assignments'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignStore;