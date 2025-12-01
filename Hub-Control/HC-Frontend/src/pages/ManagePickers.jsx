import React, { useEffect, useState } from 'react';
import { fetchStorePickers } from '../services/managerService';
import { ArrowLeft, Mail, User } from 'lucide-react';

const ManagePickers = ({ storeId, onBack }) => {
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
    loadData();
  }, [storeId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <button onClick={onBack} className="flex items-center text-blue-400 mb-6 hover:text-blue-300">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>
      
      <h1 className="text-3xl font-bold text-white mb-6">Manage Pickers</h1>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickers.map((user) => (
            <div key={user.userId} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex items-start gap-4">
              <div className="bg-blue-600/20 p-3 rounded-full text-blue-500">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-slate-400">@{user.username}</p>
                <div className="flex items-center mt-2 text-xs text-slate-500">
                  <Mail size={12} className="mr-1" /> {user.email}
                </div>
                <span className={`mt-3 inline-block px-2 py-1 rounded text-xs ${user.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
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