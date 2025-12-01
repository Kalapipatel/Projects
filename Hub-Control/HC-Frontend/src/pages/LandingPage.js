import React from 'react';
import Hero from '../components/sections/Hero';
import ModulesSection from '../components/sections/ModulesSection';
import WorkflowSection from '../components/sections/WorkflowSection';
import RolesSection from '../components/sections/RolesSection';
import CtaSection from '../components/sections/CtaSection';

const LandingPage = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <ModulesSection />
      <WorkflowSection />
      <RolesSection />
      
      {/* Stats Mini-Section (Inline for simplicity) */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {[
              { val: "99.9%", label: "Inventory Accuracy" },
              { val: "40%", label: "Faster Picking" },
              { val: "< 15min", label: "Order to Dispatch" },
              { val: "24/7", label: "Operational Uptime" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.val}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection onNavigate={onNavigate} />
    </>
  );
};

export default LandingPage;