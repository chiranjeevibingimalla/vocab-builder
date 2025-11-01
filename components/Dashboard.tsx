import React from 'react';
import { DailyContent, AppStats, StreakData } from '../types';
import ContentCard from './ContentCard';
import StreakTracker from './StreakTracker';
import StatsCard from './StatsCard';
import { IconDownload } from './Icons';

interface DashboardProps {
  content: DailyContent;
  stats: AppStats;
  streakData: StreakData;
  onExport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ content, stats, streakData, onExport }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard title="Words Learned" count={stats.totalWords} />
        <StatsCard title="Idioms Learned" count={stats.totalIdioms} />
      </div>
      
      <StreakTracker currentStreak={streakData.current} />

      <div className="space-y-6">
        <ContentCard
          type="Word of the Day"
          title={content.word}
          pronunciation={content.wordPronunciation}
          meaning={content.wordMeaning}
          examples={content.wordExamples}
        />
        <ContentCard
          type="Idiom of the Day"
          title={content.idiom}
          meaning={content.idiomMeaning}
          examples={content.idiomExamples}
        />
      </div>

      <div className="text-center mt-8">
        <button 
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <IconDownload className="w-4 h-4" />
          Export My Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;