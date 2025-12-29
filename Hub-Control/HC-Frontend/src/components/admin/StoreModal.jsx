import React, { useState, useEffect } from 'react';
import { addStore, updateStore } from '../../services/adminService'; // Import Service

const StoreModal = ({ isOpen, onClose, onSuccess, storeToEdit = null }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    address: '',
    pincode: '',
    status: true
  });
  const [loading, setLoading] = useState(false);

  // Populate form if editing, otherwise reset
  useEffect(() => {
    if (storeToEdit) {
      setFormData({
        storeName: storeToEdit.storeName,
        address: storeToEdit.address,
        pincode: storeToEdit.pincode,
        status: storeToEdit.status
      });
    } else {
      setFormData({ storeName: '', address: '', pincode: '', status: true });
    }
  }, [storeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditMode = !!storeToEdit;

    try {
        let data;
        
        if (isEditMode) {
            // Call Update Service (Pass ID and Data)
            data = await updateStore(storeToEdit.storeId, formData);
        } else {
            // Call Add Service (Pass Data only)
            data = await addStore(formData);
        }

        // Handle Success
        onSuccess(data, isEditMode);
        onClose();

    } catch (error) {
        // Error logging is handled in service, but we show alert to user
        alert("Operation failed. Please check the server connection.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {storeToEdit ? 'Edit Hub' : 'Add New Hub'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Store Name</label>
            <input 
              type="text" name="storeName" required maxLength={150}
              value={formData.storeName} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
            <textarea 
              name="address" required rows="3"
              value={formData.address} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pincode</label>
            <input 
              type="number" name="pincode" required
              value={formData.pincode} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select 
              name="status" value={formData.status} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={true}>Operational</option>
              <option value={false}>Not Operational</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'Saving...' : (storeToEdit ? 'Update Hub' : 'Add Hub')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;