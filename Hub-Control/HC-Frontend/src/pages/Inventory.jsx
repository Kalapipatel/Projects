import React, { useEffect, useState } from 'react';
import { fetchStoreInventory } from '../services/managerService';
import { ArrowLeft, Package, AlertTriangle } from 'lucide-react';

const Inventory = ({ storeId, onBack }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStoreInventory(storeId);
        setInventory(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    loadData();
  }, [storeId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <button onClick={onBack} className="flex items-center text-blue-400 mb-6 hover:text-blue-300">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-white mb-6">Store Inventory</h1>

      <div className="overflow-x-auto bg-slate-900 rounded-lg border border-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {inventory.map((item) => {
              const isLowStock = item.quantityOnHand < item.lowStockThreshold;
              return (
                <tr key={item.inventoryId} className="hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-white">{item.product.productName}</td>
                  <td className="p-4 text-slate-400">{item.product.sku}</td>
                  <td className="p-4 font-bold">{item.quantityOnHand}</td>
                  <td className="p-4">
                    {isLowStock ? (
                      <span className="flex items-center text-red-400 text-sm font-semibold">
                        <AlertTriangle size={16} className="mr-1" /> Low Stock
                      </span>
                    ) : (
                      <span className="text-emerald-400 text-sm">In Stock</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;