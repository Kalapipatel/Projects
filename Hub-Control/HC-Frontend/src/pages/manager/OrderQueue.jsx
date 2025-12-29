import React, { useEffect, useState } from 'react';
import { fetchOrderQueue } from '../../services/managerService';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';

const OrderQueue = ({ storeId, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchOrderQueue(storeId);
        setOrders(data);
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

      <h1 className="text-3xl font-bold text-white mb-6">Order Queue</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{order.customerName}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Order #{order.externalOrderId}</p>
              <p className="text-sm text-slate-400">{order.deliveryAddress}</p>
            </div>
            
            <div className="text-right">
               <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                 order.orderStatus === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 
                 order.orderStatus === 'PENDING' ? 'bg-amber-500/20 text-amber-400' : 
                 'bg-blue-500/20 text-blue-400'
               }`}>
                 {order.orderStatus}
               </span>
               <p className="text-xs text-slate-600 mt-2">
                 {new Date(order.createdAt).toLocaleDateString()}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderQueue;