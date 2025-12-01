import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AdminLP = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl text-center border border-slate-700">
        <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-400 mb-6">Full system access granted.</p>
        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg">Logout</button>
      </div>
    </div>
  );
};

export default AdminLP;