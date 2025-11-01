import React from 'react';
import { HistoryEntry } from '../types';
import { IconStar, IconStarFilled, IconVolume } from './Icons';

interface HistoryViewProps {
  history: HistoryEntry[];
  onToggleFavorite: (date: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onToggleFavorite }) => {
  if (history.length === 0) {
    return (
      <div className="text-center p-8 bg-light-card dark:bg-dark-card rounded-lg">
        <p className="text-light-text-secondary dark:text-dark-text-secondary">Your history is empty. Come back tomorrow to start building it!</p>
      </div>
    );
  }

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {history.map((entry) => (
        <div key={entry.date} className="bg-light-card dark:bg-dark-card rounded-lg shadow-md p-4 border border-light-border dark:border-dark-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h3 className="text-xl font-bold capitalize">{entry.word} <span className="font-normal text-lg">&</span> {entry.idiom}</h3>
            </div>
            <button onClick={() => onToggleFavorite(entry.date)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
              {entry.isFavorite ? <IconStarFilled className="w-6 h-6 text-yellow-500" /> : <IconStar className="w-6 h-6" />}
            </button>
          </div>
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-light-accent dark:text-dark-accent">View Details</summary>
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{entry.word}</h4>
                  <button
                    onClick={() => handleSpeak(entry.word)}
                    className="p-1 rounded-full text-light-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
                    aria-label={`Listen to pronunciation of ${entry.word}`}
                    title={`Listen to pronunciation of ${entry.word}`}
                  >
                    <IconVolume className="w-4 h-4" />
                  </button>
                </div>
                {entry.wordPronunciation && <p className="text-sm italic text-light-text-secondary dark:text-dark-text-secondary">{entry.wordPronunciation}</p>}
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{entry.wordMeaning}</p>
              </div>
              <div>
                <h4 className="font-semibold">{entry.idiom}</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{entry.idiomMeaning}</p>
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

export default HistoryView;