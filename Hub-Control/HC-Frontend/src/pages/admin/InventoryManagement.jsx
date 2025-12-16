import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Search, Filter, Plus, MoreVertical, AlertTriangle } from 'lucide-react';

const InventoryManagement = ({ onNavigate }) => {
  // Dummy Inventory Data
  const inventoryData = [
    { id: 'INV-001', name: 'Wireless Barcode Scanner', category: 'Equipment', stock: 120, price: '$45.00', status: 'In Stock' },
    { id: 'INV-002', name: 'Safety Gloves (L)', category: 'Safety Gear', stock: 15, price: '$5.50', status: 'Low Stock' },
    { id: 'INV-003', name: 'Packaging Box (Type A)', category: 'Supplies', stock: 5000, price: '$0.80', status: 'In Stock' },
    { id: 'INV-004', name: 'Label Printer Pro', category: 'Electronics', stock: 0, price: '$210.00', status: 'Out of Stock' },
    { id: 'INV-005', name: 'Heavy Duty Tape', category: 'Supplies', stock: 340, price: '$3.20', status: 'In Stock' },
  ];

  return (
    <AdminLayout currentView="adminInventory" onNavigate={onNavigate}>
      <div className="space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Global Inventory</h2>
            <p className="text-slate-500 dark:text-slate-400">Real-time stock levels across all hubs</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by SKU or Product Name..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">SKU ID</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {inventoryData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500">{item.category}</td>
                    <td className="px-6 py-4 font-semibold">
                      <div className="flex items-center gap-2">
                        {item.stock}
                        {item.stock < 20 && item.stock > 0 && (
                          <AlertTriangle size={16} className="text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border
                        ${item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                        ${item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400' : ''}
                        ${item.status === 'Out of Stock' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400' : ''}
                      `}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition">
                        <MoreVertical size={18} className="text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* PAGINATION */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
            <span>Showing 5 of 128 products</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Prev</button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default InventoryManagement;