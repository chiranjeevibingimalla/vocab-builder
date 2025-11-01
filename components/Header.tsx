
import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-light-card dark:bg-dark-card shadow-md sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center max-w-4xl">
        <h1 className="text-xl md:text-2xl font-bold text-light-accent dark:text-dark-accent">
          Vocab Builder
        </h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
