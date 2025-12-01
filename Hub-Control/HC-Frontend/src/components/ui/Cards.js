import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group h-full">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${color}-50 group-hover:bg-${color}-100 transition-colors`}>
      <Icon className={`w-7 h-7 text-${color}-600`} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export const StepCard = ({ number, title, desc }) => (
  <div className="relative flex flex-col items-center text-center p-6 z-10">
    <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg ring-4 ring-white">
      {number}
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);