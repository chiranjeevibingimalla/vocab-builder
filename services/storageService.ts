
import { DailyContent, AppStats, StreakData, StorageData, HistoryEntry } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

class StorageService {
  private getData(): StorageData {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
    return { history: {}, streak: { current: 0, lastVisit: '' }, favorites: [] };
  }

  private saveData(data: StorageData): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
  
  public getAllData(): StorageData {
    return this.getData();
  }

  getContentForDate(date: string): DailyContent | null {
    const data = this.getData();
    return data.history[date] || null;
  }

  saveContentForDate(date: string, content: DailyContent): void {
    const data = this.getData();
    data.history[date] = content;
    this.saveData(data);
  }

  getUsedItems(): { usedWords: string[]; usedIdioms: string[] } {
    const data = this.getData();
    const usedWords = Object.values(data.history).map(item => item.word);
    const usedIdioms = Object.values(data.history).map(item => item.idiom);
    return { usedWords, usedIdioms };
  }

  getStats(): AppStats {
    const data = this.getData();
    const count = Object.keys(data.history).length;
    return { totalWords: count, totalIdioms: count };
  }
  
  updateStreak(): StreakData {
    const data = this.getData();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (data.streak.lastVisit === todayStr) {
      return data.streak; // Already visited today
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (data.streak.lastVisit === yesterdayStr) {
      // Consecutive visit
      data.streak.current += 1;
    } else {
      // Streak is broken
      data.streak.current = 1;
    }
    
    data.streak.lastVisit = todayStr;
    this.saveData(data);
    return data.streak;
  }

  getHistory(): HistoryEntry[] {
    const data = this.getData();
    return Object.values(data.history)
      .map(entry => ({
        ...entry,
        isFavorite: data.favorites.includes(entry.date)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  toggleFavorite(date: string): void {
    const data = this.getData();
    const index = data.favorites.indexOf(date);
    if (index > -1) {
      data.favorites.splice(index, 1);
    } else {
      data.favorites.push(date);
    }
    this.saveData(data);
  }
}

export const storageService = new StorageService();
