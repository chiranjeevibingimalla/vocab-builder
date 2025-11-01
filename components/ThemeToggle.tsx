
import React from 'react';
import { IconSun, IconMoon } from './Icons';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <IconMoon className="w-6 h-6" />
      ) : (
        <IconSun className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
