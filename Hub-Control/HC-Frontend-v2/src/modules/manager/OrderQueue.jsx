import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderQueue } from '../../services/managerService';
import { ArrowLeft, Loader2 } from 'lucide-react';

const OrderQueue = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

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

      <h1 className="text-3xl font-bold text-white mb-6">Order Queue</h1>

      {loading ? (
        <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="text-slate-500 text-center py-10 bg-slate-900 rounded-xl border border-slate-800">
                    No orders in queue.
                </div>
            ) : orders.map((order) => (
            <div key={order.orderId} className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                <h3 className="text-lg font-bold text-white mb-1">{order.customerName}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-800 text-slate-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-slate-700">
                        #{order.externalOrderId || order.orderId}
                    </span>
                </div>
                <p className="text-sm text-slate-400">{order.deliveryAddress}</p>
                </div>
                
                <div className="text-left md:text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                        order.orderStatus === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        order.orderStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                        {order.orderStatus}
                    </span>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrderQueue;