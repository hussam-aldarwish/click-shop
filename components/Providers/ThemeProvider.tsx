'use client';

import ThemeContext, { Theme } from '@/contexts/ThemeContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'system',
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const isDarkTheme = theme === 'dark' || (theme === 'system' && prefersDarkMode);
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [theme, prefersDarkMode]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
