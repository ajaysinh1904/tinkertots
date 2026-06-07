import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Scroll to top on mount (site load / refresh)
    window.scrollTo(0, 0);
    
    // Override browser default scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
