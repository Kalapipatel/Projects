import React, { useState } from 'react';
import { ArrowLeft, Scan, CheckCircle, MapPin, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

const TaskDetailView = ({ task, onBack, onCompleteTask }) => {
  const [items, setItems] = useState(task.items || []);
  const [scanMode, setScanMode] = useState(false);

  // Simulation of scanning an item
  const handleSimulateScan = (itemId) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, status: 'picked' } : item
    );
    setItems(updatedItems);
  };

  const progress = Math.round((items.filter(i => i.status === 'picked').length / items.length) * 100);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Navbar for Detail View */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-slate-800">Order #{task.orderId}</h2>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="font-bold text-green-600 text-sm">{progress}%</span>
      </div>

      {/* Picking List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`p-4 mb-4 rounded-xl border-2 transition-all ${
              item.status === 'picked' 
                ? 'bg-green-50 border-green-200 opacity-60' 
                : 'bg-white border-blue-100 shadow-md'
            }`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className="bg-slate-800 text-white text-xs px-2 py-0.5 rounded">
                     {item.location}
                   </span>
                   {item.fragile && (
                     <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                       <AlertTriangle size={10} /> Fragile
                     </span>
                   )}
                </div>
                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                <p className="text-slate-500 text-sm">SKU: {item.sku}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">x{item.qty}</div>
                <div className="text-xs text-slate-500">Qty</div>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex gap-2">
              {item.status === 'picked' ? (
                <div className="w-full py-2 bg-green-100 text-green-700 rounded-lg flex items-center justify-center gap-2 font-bold">
                  <CheckCircle size={20} /> Picked
                </div>
              ) : (
                <Button 
                  onClick={() => handleSimulateScan(item.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95"
                >
                  <Scan size={20} /> Scan to Pick
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0">
        <Button 
          variant={progress === 100 ? 'primary' : 'secondary'} 
          className="w-full py-4 text-lg shadow-xl"
          disabled={progress !== 100}
          onClick={onCompleteTask}
        >
          {progress === 100 ? 'Complete Order' : `${items.filter(i => i.status !== 'picked').length} Items Remaining`}
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailView;