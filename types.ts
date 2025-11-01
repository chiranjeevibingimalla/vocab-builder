export interface DailyContent {
  date: string;
  word: string;
  wordPronunciation: string;
  wordMeaning: string;
  wordExamples: string[];
  idiom: string;
  idiomMeaning: string;
  idiomExamples: string[];
}

export interface HistoryEntry extends DailyContent {
  isFavorite: boolean;
}

export interface AppStats {
  totalWords: number;
  totalIdioms: number;
}

export interface StreakData {
    current: number;
    lastVisit: string;
}

export interface Milestone {
    days: number;
    name: string;
    emoji: string;
}

export interface StorageData {
    history: Record<string, DailyContent>;
    streak: StreakData;
    favorites: string[];
}