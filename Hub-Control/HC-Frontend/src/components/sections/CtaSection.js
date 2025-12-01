import React from 'react';

const CtaSection = ({ onNavigate }) => (
  <section className="py-20 bg-blue-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-blue-700/50"></div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to optimize your dark store?</h2>
      <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
        Join leading Q-Commerce brands using HubControl to cut picking times by 50% and eliminate stock errors.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => onNavigate('login')} 
          className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition-colors transform hover:-translate-y-1"
        >
          Get Started Now
        </button>
        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
          Talk to Sales
        </button>
      </div>
    </div>
  </section>
);

export default CtaSection;