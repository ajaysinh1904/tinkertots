import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TootsMascot from './TootsMascot';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home 🌻', path: '/' },
    { name: 'About Us 📖', path: '/about' },
    { name: 'Media Corner 📸', path: '/media' },
    { name: 'Contact Us 👋', path: '/contact' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-[12px] border-b-2 border-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-sunshine border-2 border-navy rounded-full flex items-center justify-center p-1 overflow-hidden transform group-hover:rotate-12 transition-transform duration-300">
              <TootsMascot size={40} />
            </div>
            <span className="font-display font-extrabold text-2xl md:text-3xl text-coral tracking-tight group-hover:scale-102 transition-transform">
              tinkytots<span className="text-sunshine text-sm font-accent align-super ml-0.5">®</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 font-accent text-sm md:text-base border-2 transition-all duration-200 rounded-full ${
                  isActive(link.path)
                    ? 'bg-sunshine border-navy text-navy shadow-[2px_2px_0px_0px_#1A1A2E]'
                    : 'bg-transparent border-transparent text-navy/80 hover:text-navy hover:bg-cream/70 hover:border-navy/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 border-2 border-navy rounded-full bg-sunshine flex items-center justify-center text-navy font-bold shadow-[2px_2px_0px_0px_#1A1A2E] active:scale-95 transition-transform"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 top-20 bg-cream/98 border-t-2 border-navy z-40 flex flex-col items-center justify-center space-y-6 md:hidden transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link, idx) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: `${idx * 75}ms` }}
            className={`px-8 py-3 font-accent text-xl rounded-full border-2 text-center w-[250px] shadow-[4px_4px_0px_0px_#1A1A2E] transform transition-all duration-300 ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            } ${
              isActive(link.path)
                ? 'bg-sunshine border-navy text-navy'
                : 'bg-white border-navy text-navy hover:bg-cream'
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Small School Info */}
        <div className="pt-8 text-center text-navy/60 font-semibold text-xs tracking-wider">
          <p>🕗 Mon–Sat | 8:30 AM – 2:30 PM</p>
          <p className="mt-1">📍 Gota, Ahmedabad, Gujarat</p>
        </div>
      </div>
    </nav>
  );
}
