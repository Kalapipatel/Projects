import React from 'react';

const SectionHeading = ({ badge, title, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} max-w-4xl mx-auto px-4`}>
    {badge && (
      <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
      {title}
    </h2>
    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

export default SectionHeading;