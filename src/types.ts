export type MufradatCategory = 'kelas' | 'alam' | 'makanan' | 'keluarga';

export interface CategoryInfo {
  id: MufradatCategory;
  name: string;
  arabicName: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  gradient: string;
  vibrantBg: string;
  vibrantBorder: string;
  vibrantHover: string;
  vibrantText: string;
}

export interface MufradatItem {
  id: string;
  arabic: string;
  latin: string;
  indonesian: string;
  exampleArabic: string;
  exampleIndonesian: string;
  emoji: string;
  category: MufradatCategory;
  funFact?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  latinPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: MufradatCategory;
  vocabularyItem?: {
    arabic: string;
    latin: string;
    indonesian: string;
    exampleArabic: string;
    exampleIndonesian: string;
  };
}

export interface QuizResponse {
  success: boolean;
  category: MufradatCategory;
  themeTitle: string;
  systemMessage?: string;
  questions: QuizQuestion[];
  generatedByAi?: boolean;
}
