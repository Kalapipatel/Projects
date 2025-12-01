import React from 'react';
import { Users, Package, Activity } from 'lucide-react';

const RolesSection = () => (
  <section className="py-24 bg-slate-900 text-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="text-blue-400 font-bold tracking-widest uppercase mb-2">Designed for Teams</div>
          <h2 className="text-4xl font-bold mb-6">Empower every role in your fulfillment center</h2>
          <p className="text-slate-400 text-lg mb-8">
            HubControl provides specialized interfaces for every member of your staff, ensuring they have exactly the tools they need without the clutter.
          </p>
          
          <div className="space-y-6">
            <RoleItem 
              icon={Users} 
              color="blue" 
              title="Store Managers" 
              desc="Oversee live operations, manage shifts, approve stock transfers, and view real-time KPIs." 
            />
            <RoleItem 
              icon={Package} 
              color="green" 
              title="Pickers & Packers" 
              desc="Mobile-first interface with large buttons, barcode scanning, and clear bin locations." 
            />
            <RoleItem 
              icon={Activity} 
              color="purple" 
              title="HQ Admins" 
              desc="Global view of all dark stores. Master catalog management and supplier relationships." 
            />
          </div>
        </div>
        <div className="md:w-1/2">
           <div className="bg-slate-800 border border-slate-700 p-2 rounded-xl shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Warehouse worker with tablet" 
               className="rounded-lg opacity-80 hover:opacity-100 transition-opacity"
             />
           </div>
        </div>
      </div>
    </div>
  </section>
);

const RoleItem = ({ icon: Icon, color, title, desc }) => (
  <div className="flex gap-4">
    <div className={`w-12 h-12 rounded-lg bg-${color}-600/20 flex items-center justify-center flex-shrink-0`}>
      <Icon className={`text-${color}-400`} />
    </div>
    <div>
      <h4 className="text-xl font-bold mb-1">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  </div>
);

export default RolesSection;