import React, { useState, useEffect } from 'react';
import { addUser, updateUser } from '../../services/adminService'; // Import Service

const UserModal = ({ isOpen, onClose, onSuccess, userToEdit = null }) => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '',
    firstName: '', lastName: '', age: '',
    roleId: 2, // Default to Manager
    active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        username: userToEdit.username,
        email: userToEdit.email,
        password: '', // Keep blank on edit unless changing
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        age: userToEdit.age,
        roleId: userToEdit.role.roleId || userToEdit.roleId, // Handle nested object or direct ID
        active: userToEdit.active
      });
    } else {
      setFormData({
        username: '', email: '', password: '',
        firstName: '', lastName: '', age: '',
        roleId: 2, active: true
      });
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditMode = !!userToEdit;
    const payload = { ...formData, roleId: parseInt(formData.roleId), age: parseInt(formData.age) };

    try {
        let data;

        if (isEditMode) {
            // REPLACED: Raw fetch with service call
            data = await updateUser(userToEdit.userId, payload);
        } else {
            // REPLACED: Raw fetch with service call
            data = await addUser(payload);
        }

        onSuccess(data, isEditMode);
        onClose();

    } catch (error) {
        alert("Operation failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {userToEdit ? 'Edit User' : 'Add New User'}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
            <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
            <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
            <input type="text" name="username" required value={formData.username} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password {userToEdit && '(Leave blank to keep current)'}</label>
            <input type="password" name="password" required={!userToEdit} value={formData.password} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
            <input type="number" name="age" required value={formData.age} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
            <select name="roleId" value={formData.roleId} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500">
              <option value="2">Manager</option>
              <option value="3">Picker</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select name="active" value={formData.active} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500">
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 mt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'Saving...' : (userToEdit ? 'Update User' : 'Add User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
