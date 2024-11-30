'use client';

import ThemeContext from '@/contexts/ThemeContext';
import { useContext } from 'react';

const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};

export default useTheme;
