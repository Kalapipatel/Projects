import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoreInventory } from '../../services/managerService';
import { ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';

const Inventory = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

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
    if (storeId) loadData();
  }, [storeId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <button 
        onClick={() => navigate(`/manager`)} 
        className="flex items-center text-blue-400 mb-6 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-white mb-6">Store Inventory</h1>

      {loading ? (
        <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800 text-slate-400 uppercase text-xs tracking-wider">
                <tr>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
                {inventory.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-slate-500">No inventory found for this store.</td></tr>
                ) : inventory.map((item) => {
                const isLowStock = item.quantityOnHand < (item.lowStockThreshold || 10);
                return (
                    <tr key={item.inventoryId} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-white">{item.product?.productName || "Unknown Product"}</td>
                    <td className="p-4 text-slate-400 font-mono">{item.product?.sku || "N/A"}</td>
                    <td className="p-4 font-bold text-slate-200">{item.quantityOnHand}</td>
                    <td className="p-4">
                        {isLowStock ? (
                        <span className="inline-flex items-center text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-semibold border border-red-400/20">
                            <AlertTriangle size={14} className="mr-1" /> Low Stock
                        </span>
                        ) : (
                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-semibold border border-emerald-400/20">
                            In Stock
                        </span>
                        )}
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default Inventory;