import React, { useState, useEffect } from 'react';
import { Box, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    // { name: 'Features', id: 'features' },
    { name: 'Modules', id: 'modules' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Benefits', id: 'benefits' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">HubControl</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {currentPage === 'home' && navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('login')}
            className="text-sm font-semibold text-slate-900 hover:text-blue-600"
          >
            Log In
          </button>
          <Button onClick={() => onNavigate('login')} className="py-2 px-4 text-sm">
            Book Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              className="text-lg font-medium text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          <Button onClick={() => { onNavigate('login'); setIsOpen(false); }}>Login / Sign Up</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;