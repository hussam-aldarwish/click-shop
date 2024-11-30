'use client';

import useTheme from '@/hooks/useTheme';
import { BiPaint } from 'react-icons/bi';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return { icon: <FiSun size={24} />, label: 'Dark Mode' };
      case 'dark':
        return { icon: <FiMoon size={24} />, label: 'System Mode' };
      case 'system':
      default:
        return { icon: <BiPaint size={24} />, label: 'Light Mode' };
    }
  };

  const { icon, label } = getThemeIcon();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      aria-label={`Switch to ${label}`}
      title={`Switch to ${label}`}
      className='flex items-center justify-center p-2 rounded-full border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none transition duration-150'
    >
      {icon}
    </button>
  );
};

export default ThemeToggleButton;
