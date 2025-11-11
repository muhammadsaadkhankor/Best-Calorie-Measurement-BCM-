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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bcm_darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('bcm_darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#f8f9fa',
      surface: isDarkMode ? '#1e1e1e' : '#ffffff',
      primary: '#4CAF50',
      secondary: '#FF9800',
      text: isDarkMode ? '#ffffff' : '#333333',
      textSecondary: isDarkMode ? '#b3b3b3' : '#666666',
      textMuted: isDarkMode ? '#888888' : '#999999',
      border: isDarkMode ? '#333333' : '#e0e0e0',
      input: isDarkMode ? '#2a2a2a' : '#fafafa',
      shadow: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'
    }
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};