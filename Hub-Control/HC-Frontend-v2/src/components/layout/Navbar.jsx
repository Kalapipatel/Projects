import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Menu, X, Sun, Moon } from 'lucide-react';
import Button from '../ui/Button'; // We will create this below

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  /* ===== SCROLL EFFECT ===== */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Modules', id: 'modules' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Benefits', id: 'benefits' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            HubControl
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && navLinks.map(link => (
            <a
              key={link.name}
              href={`#${link.id}`}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300
                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-slate-900 dark:text-white
                       hover:text-blue-600 dark:hover:text-blue-400"
          >
            Log In
          </button>

          <Button
            onClick={() => navigate('/login')}
            className="py-2 px-4 text-sm"
          >
            Book Demo
          </Button>
        </div>

        {/* MOBILE TOGGLES */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-300">
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full
                        bg-white dark:bg-slate-900 shadow-xl
                        flex flex-col p-6 gap-4 border-t dark:border-slate-800">
          {isHome && navLinks.map(link => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-600 dark:text-slate-300"
            >
              {link.name}
            </a>
          ))}

          <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

          <Button
            onClick={() => {
              navigate('/login');
              setIsOpen(false);
            }}
          >
            Login / Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;