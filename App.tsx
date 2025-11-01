
import React, { useState, useCallback, useEffect } from 'react';
import { useDailyContent } from './hooks/useDailyContent';
import { useTheme } from './hooks/useTheme';
import { storageService } from './services/storageService';
import { HistoryEntry } from './types';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import Loader from './components/Loader';
import { IconBook, IconList } from './components/Icons';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { content, stats, streakData, loading, error, refreshContent } = useDailyContent();
  const [view, setView] = useState<'dashboard' | 'history'>('dashboard');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (view === 'history') {
      setHistory(storageService.getHistory());
    }
  }, [view]);

  const handleToggleFavorite = useCallback((date: string) => {
    storageService.toggleFavorite(date);
    if (view === 'history') {
        setHistory(storageService.getHistory());
    }
    // No need to refresh main dashboard, favorites are handled in history view
  }, [view]);

  const exportData = useCallback(() => {
    const data = storageService.getAllData();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'vocab_builder_data.json';
    link.click();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="text-center p-8 text-red-500 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-bold mb-2">An Error Occurred</h2>
          <p>{error}</p>
          <button
            onClick={refreshContent}
            className="mt-4 px-4 py-2 bg-light-accent text-white rounded-lg hover:bg-light-accent-hover dark:bg-dark-accent dark:hover:bg-dark-accent-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (view === 'dashboard' && content) {
      return <Dashboard content={content} stats={stats} streakData={streakData} onExport={exportData} />;
    }

    if (view === 'history') {
      return <HistoryView history={history} onToggleFavorite={handleToggleFavorite} />;
    }

    return null;
  };

  return (
    <div className={`min-h-screen font-sans text-light-text dark:text-dark-text transition-colors duration-300 ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border" role="group">
            <button
              type="button"
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center gap-2 transition-colors ${view === 'dashboard' ? 'bg-light-accent text-white dark:bg-dark-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <IconBook className="w-5 h-5" />
              Today
            </button>
            <button
              type="button"
              onClick={() => setView('history')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center gap-2 transition-colors ${view === 'history' ? 'bg-light-accent text-white dark:bg-dark-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <IconList className="w-5 h-5" />
              History
            </button>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
