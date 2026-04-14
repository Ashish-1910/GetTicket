import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('gettickets_theme');
    return saved ? JSON.parse(saved) : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem('gettickets_theme', JSON.stringify(isDark));
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark
      ? {
          bg: '#0a0a1a',
          bgSecondary: '#12122a',
          bgCard: '#1a1a3e',
          bgGlass: 'rgba(26, 26, 62, 0.7)',
          text: '#e8e8f0',
          textSecondary: '#9d9db5',
          primary: '#7c3aed',
          primaryLight: '#a78bfa',
          secondary: '#06d6a0',
          accent: '#f72585',
          gradient: 'linear-gradient(135deg, #7c3aed, #06d6a0)',
          gradientAlt: 'linear-gradient(135deg, #f72585, #7c3aed)',
          border: 'rgba(124, 58, 237, 0.2)',
          shadow: 'rgba(0, 0, 0, 0.4)',
        }
      : {
          bg: '#f5f3ff',
          bgSecondary: '#ede9fe',
          bgCard: '#ffffff',
          bgGlass: 'rgba(255, 255, 255, 0.8)',
          text: '#1a1a2e',
          textSecondary: '#6b7280',
          primary: '#7c3aed',
          primaryLight: '#a78bfa',
          secondary: '#059669',
          accent: '#e11d74',
          gradient: 'linear-gradient(135deg, #7c3aed, #059669)',
          gradientAlt: 'linear-gradient(135deg, #e11d74, #7c3aed)',
          border: 'rgba(124, 58, 237, 0.15)',
          shadow: 'rgba(0, 0, 0, 0.1)',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
