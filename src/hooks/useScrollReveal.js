import { useEffect } from 'react';

export default function useScrollReveal(dependency = null) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Trigger slightly before the element fully enters
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Give Vite a tiny millisecond to paint the DOM
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [dependency]);
}
