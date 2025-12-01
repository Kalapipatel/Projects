import React from 'react';
import { Package } from 'lucide-react';

const PickerLP = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-green-50 text-slate-900 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border border-green-100">
        <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Picker Task List</h1>
        <p className="text-slate-500 mb-6">View your active picking tasks.</p>
        <button onClick={onLogout} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Logout</button>
      </div>
    </div>
  );
};

export default PickerLP;