import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tinkytots-theme') || 'kids';
  });

  useEffect(() => {
    localStorage.setItem('tinkytots-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'kids' ? 'parent' : 'kids'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
