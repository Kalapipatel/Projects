import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStorePickers } from '../../services/managerService';
import { ArrowLeft, Mail, User, Loader2 } from 'lucide-react';

const ManagePickers = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  
  const [pickers, setPickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStorePickers(storeId);
        setPickers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
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
      
      <h1 className="text-3xl font-bold text-white mb-6">Manage Pickers</h1>

      {loading ? (
        <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : pickers.length === 0 ? (
        <div className="text-slate-500 text-center py-10 bg-slate-900 rounded-xl border border-slate-800">
            No pickers assigned to this store.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickers.map((user) => (
            <div key={user.userId} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-colors">
              <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 flex-shrink-0">
                <User size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-slate-400 truncate">@{user.username}</p>
                <div className="flex items-center mt-2 text-xs text-slate-500 truncate">
                  <Mail size={12} className="mr-1 flex-shrink-0" /> {user.email}
                </div>
                <span className={`mt-3 inline-block px-2 py-1 rounded text-xs font-medium ${
                    user.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {user.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePickers;