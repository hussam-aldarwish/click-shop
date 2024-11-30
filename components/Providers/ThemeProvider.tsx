'use client';

import ThemeContext, { Theme } from '@/contexts/ThemeContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<Theme>('system');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  // Load the saved theme from localStorage on the first render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }, []);

  // Save the current theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  // Apply the appropriate class to the document body based on the theme
  useEffect(() => {
    const isDarkTheme = theme === 'dark' || (theme === 'system' && prefersDarkMode);
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [theme, prefersDarkMode]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
