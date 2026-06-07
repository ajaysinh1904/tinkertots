import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import TootsMascot from './TootsMascot';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home 🌻', path: '/' },
    { name: 'About Us 📖', path: '/about' },
    { name: 'Media Corner 📸', path: '/media' },
    { name: 'Contact Us 👋', path: '/contact' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isKids = theme === 'kids';

  return (
    <>
      <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 backdrop-blur-[12px] ${isKids
        ? 'bg-white/70 border-b-2 border-navy'
        : 'bg-white/90 border-b border-slate-200 shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center p-1 overflow-hidden transform group-hover:rotate-12 transition-all duration-300 ${isKids ? 'bg-gold border-navy' : 'bg-slate-100 border-slate-300'
              }`}>
              <TootsMascot size={isKids ? 40 : 36} className="transition-all" />
            </div>
            <span className={`font-display font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight transition-all duration-300 ${isKids ? 'text-plum group-hover:scale-102' : 'text-slate-800'
              }`}>
              tinkytots<span className={`${isKids ? 'text-gold' : 'text-slate-400'} text-xs font-accent align-super ml-0.5`}>®</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm md:text-base transition-all duration-200 ${isKids
                  ? `font-accent border-2 rounded-full ${isActive(link.path)
                    ? 'bg-gold border-navy text-navy shadow-[2px_2px_0px_0px_#3B0764]'
                    : 'bg-transparent border-transparent text-navy/80 hover:text-navy hover:bg-cream/70 hover:border-navy/20'
                  }`
                  : `font-body font-semibold rounded-lg border border-transparent ${isActive(link.path)
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Theme Switcher Button (Temporarily commented out)
            <button
              onClick={toggleTheme}
              className={`ml-2 px-3 py-1.5 text-xs font-bold transition-all duration-200 border-2 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 ${isKids
                ? 'bg-gold border-navy text-navy hover:bg-amber/90'
                : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                }`}
            >
              {isKids ? '👶 Kids Mode' : '👩‍👦 Parent Mode'}
            </button>
            */}
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle (Direct in header next to hamburger) (Temporarily commented out)
            <button
              onClick={toggleTheme}
              className={`px-2.5 py-1.5 text-[10px] font-bold border-2 rounded-lg active:scale-95 transition-all ${isKids
                ? 'bg-gold border-navy text-navy'
                : 'bg-slate-900 border-slate-900 text-white'
                }`}
            >
              {isKids ? '👶' : '👩‍👦'}
            </button>
            */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-9 h-9 border-2 rounded-full flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_0px_rgba(59, 7, 100,0.15)] active:scale-95 transition-all ${isKids ? 'border-navy bg-gold text-navy shadow-navy' : 'border-slate-300 bg-white text-slate-700'
                }`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>
      </nav>

      {/* Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-[#3B0764]/50 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0  w-[280px] sm:w-[320px] z-50 flex flex-col p-6 shadow-2xl overflow-y-auto md:hidden transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isKids
            ? 'bg-cream border-l-3 border-navy text-navy'
            : 'bg-white border-l border-slate-200 text-slate-800'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-navy/10">
          <span className={`font-display font-extrabold text-lg ${isKids ? 'text-plum' : 'text-slate-800'}`}>
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className={`w-8 h-8 border-2 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isKids ? 'border-navy bg-gold text-navy shadow-[2px_2px_0px_0px_#3B0764] active:scale-95' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
          >
            ✕
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-col space-y-4 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-3 rounded-xl border text-center transition-all ${isKids
                ? `font-accent text-base shadow-[2px_2px_0px_0px_#3B0764] ${isActive(link.path)
                  ? 'bg-gold border-navy text-navy'
                  : 'bg-white border-navy text-navy hover:bg-cream/50'
                }`
                : `font-body font-semibold text-sm ${isActive(link.path)
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle inside drawer (Temporarily commented out)
        <div className="pt-4 pb-8 border-t border-navy/10 flex flex-col items-center">
          <span className="text-xs font-bold text-navy/60 mb-2">THEME INTERFACE</span>
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className={`w-full py-3 border-2 rounded-xl font-bold text-center text-sm transition-all active:scale-95 ${isKids
              ? 'bg-lavender border-navy text-navy shadow-[2px_2px_0px_0px_#3B0764]'
              : 'bg-slate-900 border-slate-900 text-white shadow-sm'
              }`}
          >
            Toggle: {isKids ? '👩‍👦 Parent Mode' : '👶 Kids Mode'}
          </button>
        </div>
        */}

        {/* Small School Info / Footer at bottom of drawer */}
        <div className={`mt-auto pt-6 text-center font-semibold text-[11px] tracking-wider border-t ${isKids ? 'border-navy/10 text-navy/60' : 'border-slate-100 text-slate-400'
          }`}>
          <p>🕗 Mon–Sat | 8:30 AM – 2:30 PM</p>
          <p className="mt-1">📍 Gota, Ahmedabad, Gujarat</p>
        </div>
      </div>
    </>
  );
}
