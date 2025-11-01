
import { useState, useEffect, useCallback } from 'react';
import { DailyContent, AppStats, StreakData } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useDailyContent = () => {
  const [content, setContent] = useState<DailyContent | null>(null);
  const [stats, setStats] = useState<AppStats>({ totalWords: 0, totalIdioms: 0 });
  const [streakData, setStreakData] = useState<StreakData>({ current: 0, lastVisit: ''});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    const today = getTodayDateString();

    try {
      let dailyContent = storageService.getContentForDate(today);

      if (!dailyContent) {
        const { usedWords, usedIdioms } = storageService.getUsedItems();
        const newContent = await geminiService.generateDailyContent(usedWords, usedIdioms);
        dailyContent = { ...newContent, date: today };
        storageService.saveContentForDate(today, dailyContent);
      }

      setContent(dailyContent);
      const newStreak = storageService.updateStreak();
      setStreakData(newStreak);
      setStats(storageService.getStats());

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch daily content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshContent = useCallback(() => {
      fetchAndSetContent();
  }, [fetchAndSetContent]);


  return { content, stats, streakData, loading, error, refreshContent };
};
