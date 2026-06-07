import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import TootsMascot from './TootsMascot';
import { Icons } from './Icon';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isKids = theme === 'kids';


  return (
    <footer className={`relative bg-navy text-white pb-8 overflow-hidden font-body ${isKids ? 'pt-24 border-t-0' : 'pt-12 border-t border-slate-800'
      }`}>
      {/* SVG Wave Divider on Top (Kids theme only) */}
      {isKids && (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] text-cream fill-current"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1: Info & Mascot */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gold border border-white rounded-full flex items-center justify-center p-0.5 overflow-hidden">
              <TootsMascot size={32} />
            </div>
            <span className={`${isKids ? 'font-display' : 'font-sans'} font-extrabold text-2xl text-gold tracking-tight`}>
              tinkytots
            </span>
          </div>
          <p className="text-sm text-gray-300 font-medium">
            Where little minds bloom! A premium children-first illustrated Montessori environment.
          </p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>📍 Jagatpur Road, Gota, Ahmedabad, Gujarat, 382470</p>
            <p>📞 Phone: +91 76240 12997</p>
            <p>✉️ Email: hello@tinkytots.com</p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className={`${isKids ? 'font-display text-plum' : 'font-sans text-slate-200'} font-bold text-lg mb-4`}>Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300 font-semibold">
            <li><Link to="/" className="hover:text-amber transition-colors">Home 🌻</Link></li>
            <li><Link to="/about" className="hover:text-amber transition-colors">About Us 📖</Link></li>
            <li><Link to="/media" className="hover:text-amber transition-colors">Media Corner 📸</Link></li>
            <li><Link to="/contact" className="hover:text-amber transition-colors">Contact Us 👋</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Programs */}
        <div>
          <h3 className={`${isKids ? 'font-display text-lilac' : 'font-sans text-slate-200'} font-bold text-lg mb-4`}>Our Programs</h3>
          <ul className="space-y-2 text-sm text-gray-300 font-semibold">
            <li><Link to="/" className="hover:text-amber transition-colors">Playgroup (1.5 - 2.5y)</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Nursery (2.5 - 3.5y)</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Junior KG (3.5 - 4.5y)</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Senior KG (4.5 - 5.5y)</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Daycare Facility 🌙</Link></li>
          </ul>
        </div>

        {/* Column 4: Timings & Socials */}
        <div className="space-y-4">
          <div>
            <h3 className={`${isKids ? 'font-display text-blush' : 'font-sans text-slate-200'} font-bold text-lg mb-2`}>School Timings</h3>
            <p className="text-sm text-gray-300">
              🕗 Mon–Sat | 8:30 AM – 2:30 PM
            </p>
            <p className="text-xs text-gray-400 mt-1">
              * Drop-offs start at 8:15 AM
            </p>
          </div>

          {/* Social Icons Row */}
          <div>
            <h3 className={`${isKids ? 'font-display' : 'font-sans'} font-bold text-sm text-white mb-2`}>
              Connect with Us
            </h3>
            <Icons />
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center relative z-10 text-xs text-gray-400">
        <p>© {currentYear} Tinkytots Preschool. All rights reserved.</p>
        <p className="mt-1 font-medium">Made with ❤️ for little learners in Jagatpur Gota, Ahmedabad</p>
      </div>
    </footer>
  );
}
