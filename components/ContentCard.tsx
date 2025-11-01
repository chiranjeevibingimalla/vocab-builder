import React, { useState } from 'react';
import { IconBulb, IconQuote, IconVolume } from './Icons';

interface ContentCardProps {
  type: 'Word of the Day' | 'Idiom of the Day';
  title: string;
  meaning: string;
  examples: string[];
  pronunciation?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ type, title, meaning, examples, pronunciation }) => {
  const [isSlow, setIsSlow] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window && title) {
      window.speechSynthesis.cancel(); // Cancel any previous speech
      const utterance = new SpeechSynthesisUtterance(title);
      utterance.rate = isSlow ? 0.6 : 1.0;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden p-6 border border-light-border dark:border-dark-border animate-slide-in-up">
      <div className="mb-4">
        <p className="text-sm font-semibold text-light-accent dark:text-dark-accent">{type}</p>
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text capitalize">{title}</h2>
      </div>
      
      {type === 'Word of the Day' && pronunciation && (
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-light-border dark:border-dark-border">
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Sounds like</p>
          <div className="flex items-center gap-3 mt-1">
            <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text">{pronunciation}</h3>
            <button
              onClick={handleSpeak}
              className="p-2 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800/50 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
              aria-label={`Listen to the pronunciation of ${title}`}
              title={`Listen to the pronunciation of ${title}`}
            >
              <IconVolume className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <label htmlFor="slow-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="slow-toggle" className="sr-only" checked={isSlow} onChange={() => setIsSlow(!isSlow)} />
                <div className={`block w-10 h-6 rounded-full transition ${isSlow ? 'bg-light-accent dark:bg-dark-accent' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSlow ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Slow
              </div>
            </label>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <IconBulb className="w-5 h-5 mt-1 text-light-text-secondary dark:text-dark-text-secondary flex-shrink-0" />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">{meaning}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-semibold mb-2 text-light-text dark:text-dark-text">Examples:</h3>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-3">
              <IconQuote className="w-4 h-4 mt-1 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary italic">"{example}"</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentCard;