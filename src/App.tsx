/**
 * MufradatQuest - Aplikasi Edukasi Kosakata Bahasa Arab Ramah Anak SD
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, BookOpen, Trophy, Compass, HeartHandshake } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CategoryTabs } from './components/CategoryTabs';
import { FlashcardsDeck } from './components/FlashcardsDeck';
import { QuizEngine } from './components/QuizEngine';
import { AchievementsView } from './components/AchievementsView';
import { DEFAULT_MUFRADAT, CATEGORIES } from './data/defaultMufradat';
import { MufradatCategory } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cards' | 'quiz' | 'achievements'>('cards');
  const [selectedCategory, setSelectedCategory] = useState<MufradatCategory>('kelas');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [starsCount, setStarsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mufradat_stars');
      return saved ? parseInt(saved, 10) : 5; // Start with 5 welcome stars!
    } catch {
      return 5;
    }
  });

  const [totalQuizzesPlayed, setTotalQuizzesPlayed] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mufradat_quizzes_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('mufradat_mastered');
      return saved ? new Set(JSON.parse(saved)) : new Set(['k1']);
    } catch {
      return new Set(['k1']);
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('mufradat_stars', starsCount.toString());
      localStorage.setItem('mufradat_quizzes_count', totalQuizzesPlayed.toString());
      localStorage.setItem('mufradat_mastered', JSON.stringify(Array.from(masteredIds)));
    } catch {
      // Storage fallback
    }
  }, [starsCount, totalQuizzesPlayed, masteredIds]);

  const handleToggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Reward 1 star for mastering a word
        setStarsCount((s) => s + 1);
      }
      return next;
    });
  };

  const handleFinishQuiz = (score: number, total: number, category: MufradatCategory) => {
    setStarsCount((prev) => prev + score);
    setTotalQuizzesPlayed((prev) => prev + 1);
  };

  const handleStartQuizForCategory = (cat: MufradatCategory) => {
    setSelectedCategory(cat);
    setActiveTab('quiz');
    sound.playFlip();
  };

  // Count mastered words per category
  const masteredCountByCategory: Record<MufradatCategory, number> = {
    kelas: DEFAULT_MUFRADAT.kelas.filter((i) => masteredIds.has(i.id)).length,
    alam: DEFAULT_MUFRADAT.alam.filter((i) => masteredIds.has(i.id)).length,
    makanan: DEFAULT_MUFRADAT.makanan.filter((i) => masteredIds.has(i.id)).length,
    keluarga: DEFAULT_MUFRADAT.keluarga.filter((i) => masteredIds.has(i.id)).length,
  };

  const currentCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const currentItems = DEFAULT_MUFRADAT[selectedCategory] || DEFAULT_MUFRADAT.kelas;

  return (
    <div className="min-h-screen flex flex-col bg-sky-50 text-sky-950 font-kids">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        starsCount={starsCount}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Hero Welcome Pill */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Playful Hero Banner - Vibrant Theme */}
        <div className="relative overflow-hidden bg-yellow-400 text-sky-950 rounded-[36px] p-6 sm:p-8 border-b-[8px] border-yellow-600 shadow-xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-sky-900 text-yellow-300 rounded-full text-xs font-black shadow-2xs">
                <Sparkles className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>Petualangan Seru Guru AI Gemini</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-kids text-sky-950">
                Ahlan wa Sahlan di MufradatQuest! 🌟
              </h1>
              <p className="text-xs sm:text-sm text-sky-900 font-bold max-w-xl">
                Belajar kosakata Bahasa Arab SD dengan kartu flip 3D tebal, harakat lengkap, audio pelafalan ceria, dan kuis cerdas bertenaga Gemini AI.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="hero-quiz-cta"
                onClick={() => {
                  setActiveTab('quiz');
                  sound.playFlip();
                }}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm rounded-2xl border-b-4 border-emerald-700 shadow-lg transition-all btn-chunky cursor-pointer"
              >
                <BrainCircuit className="w-5 h-5 text-white" />
                <span>MAIN KUIS AI! 🚀</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab View Render */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            {/* Category Selector Tabs */}
            <CategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              masteredCountByCategory={masteredCountByCategory}
            />

            {/* Flashcard Deck */}
            <FlashcardsDeck
              category={selectedCategory}
              categoryTitle={currentCategoryInfo.name}
              items={currentItems}
              masteredIds={masteredIds}
              onToggleMastered={handleToggleMastered}
              onStartQuizForCategory={handleStartQuizForCategory}
            />
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizEngine
            initialCategory={selectedCategory}
            onFinishQuiz={handleFinishQuiz}
            onGoToCards={() => setActiveTab('cards')}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView
            starsCount={starsCount}
            totalQuizzesPlayed={totalQuizzesPlayed}
            masteredIds={masteredIds}
            onStartQuiz={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('quiz');
            }}
            onGoToCards={() => setActiveTab('cards')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-sky-200 bg-white/90 py-5 text-center text-xs text-sky-800 font-bold">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-black text-sky-950 text-sm">
            <span>MufradatQuest</span>
            <span className="text-orange-500">•</span>
            <span className="font-arabic text-base text-emerald-700">تَعَلَّمِ العَرَبِيَّةَ بِمَرَحٍ</span>
          </div>
          <p className="text-xs text-sky-700 font-medium">
            Diberdayakan oleh Gemini 3.7 Flash AI, Scheherazade New & Audio Interaktif
          </p>
        </div>
      </footer>
    </div>
  );
}
