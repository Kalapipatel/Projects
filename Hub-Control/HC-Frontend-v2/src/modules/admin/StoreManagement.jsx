import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import StoreModal from './components/StoreModal';
import { getAllStores, deleteStore } from '../../services/adminService';

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeToEdit, setStoreToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getAllStores();
      setStores(data);
    } catch (error) {
      console.error("Page load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setStoreToEdit(null); // Clear edit data for new entry
    setIsModalOpen(true);
  };

  const handleOpenEdit = (store) => {
    setStoreToEdit(store); // Set data to edit
    setIsModalOpen(true);
  };

  const handleDelete = async (storeId) => {
    if (!window.confirm("Are you sure you want to delete this store? This action cannot be undone.")) return;

    try {
        await deleteStore(storeId);
        // Update UI only if API succeeds
        setStores(prev => prev.filter(s => s.storeId !== storeId));
    } catch (error) {
        alert("Failed to delete store. It might have active inventory or users.");
    }
  };

  // Callback for when Modal finishes (Add or Edit)
  const handleModalSuccess = (resultStore, isEditMode) => {
    if (isEditMode) {
        setStores(prev => prev.map(s => s.storeId === resultStore.storeId ? resultStore : s));
    } else {
        setStores(prev => [...prev, resultStore]);
    }
  };

  return (
    <AdminLayout>
      
      <StoreModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
        storeToEdit={storeToEdit}
      />

      <div className="rounded-2xl border transition-colors duration-300 bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 shadow-sm">
        
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Hub Master List</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage all warehouse locations</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
          >
            + Add New Hub
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">Store ID</th>
                <th className="px-6 py-4 text-left">Store Name</th>
                <th className="px-6 py-4 text-left">Location (Address)</th>
                <th className="px-6 py-4 text-left">Pincode</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-6">Loading stores...</td></tr>
              ) : stores.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-slate-500">No hubs found. Add one to get started.</td></tr>
              ) : (
                stores.map((store) => (
                    <tr key={store.storeId} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-6 py-4 font-mono text-slate-500">ST-{store.storeId}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{store.storeName}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-xs truncate" title={store.address}>{store.address}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{store.pincode}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          store.status 
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                            : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                        }`}>
                          {store.status ? 'Operational' : 'Not Operational'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleOpenEdit(store)}
                            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(store.storeId)}
                            className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoreManagement;