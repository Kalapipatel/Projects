import React from 'react';
import { Box, Smartphone, Layers, Globe, ShieldCheck, BarChart3 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { FeatureCard } from '../ui/Cards';

const ModulesSection = () => (
  <section id="modules" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
    <SectionHeading 
      badge="Powerful Modules"
      title="Everything you need to run a Dark Store"
      subtitle="From the moment inventory arrives to the second it leaves for delivery, HubControl covers every operational node."
    />
    
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard icon={Box} title="Inventory Intelligence" description="Real-time stock tracking across multiple locations. Supports FIFO/FEFO batch management." color="blue" />
      <FeatureCard icon={Smartphone} title="Mobile Picking App" description="Empower pickers with a dedicated mobile interface. Visual product verification and optimized routing." color="green" />
      <FeatureCard icon={Layers} title="Order Batching Engine" description="Automatically group orders based on delivery zones or product similarity to increase picking speed." color="indigo" />
      <FeatureCard icon={Globe} title="Multi-Store Management" description="Control unlimited dark stores from a single HQ dashboard. Transfer stock between hubs instantly." color="purple" />
      <FeatureCard icon={ShieldCheck} title="Role-Based Access" description="Granular permissions for Admins, Managers, and Pickers. Ensure data security and operational focus." color="slate" />
      <FeatureCard icon={BarChart3} title="Operational Analytics" description="Deep dive into picker performance, order cycle times, and stock movement velocity." color="orange" />
    </div>
  </section>
);

export default ModulesSection;