import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MediaCorner from './pages/MediaCorner';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import TootsMascot from './components/TootsMascot';

// Illustrated Mascot 404 Page
function NotFound() {
  return (
    <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-white border-3 border-navy rounded-[50%] p-4 shadow-[6px_6px_0px_0px_#3B0764] mb-6 transform rotate-[-4deg]">
        <TootsMascot size={140} />
      </div>
      <h1 className="text-4xl font-display font-extrabold text-navy">Page Not Found! 🍂</h1>
      <p className="text-navy/70 mt-2 font-semibold max-w-sm">
        Toots flew everywhere, but this branch doesn't exist. Let's head back home!
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-plum text-white font-accent rounded-xl border-2 border-navy shadow-[4px_4px_0px_0px_#3B0764] hover:translate-y-[-1px] transition-all"
      >
        Back to Home ➔
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<MediaCorner />} />
            <Route path="/media/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
