import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    accent: "bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/30"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;