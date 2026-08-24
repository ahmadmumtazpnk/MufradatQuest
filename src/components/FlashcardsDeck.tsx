import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Layers, 
  Sparkles, 
  Search, 
  BrainCircuit,
  Volume2
} from 'lucide-react';
import { MufradatCategory, MufradatItem } from '../types';
import { FlipCard } from './FlipCard';
import { sound } from '../utils/audio';

interface FlashcardsDeckProps {
  category: MufradatCategory;
  categoryTitle: string;
  items: MufradatItem[];
  masteredIds: Set<string>;
  onToggleMastered: (id: string) => void;
  onStartQuizForCategory: (cat: MufradatCategory) => void;
}

export const FlashcardsDeck: React.FC<FlashcardsDeckProps> = ({
  category,
  categoryTitle,
  items,
  masteredIds,
  onToggleMastered,
  onStartQuizForCategory,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.indonesian.toLowerCase().includes(q) ||
      item.latin.toLowerCase().includes(q) ||
      item.arabic.includes(searchQuery)
    );
  });

  const currentItem = filteredItems[currentIndex] || filteredItems[0];
  const masteredCount = items.filter((item) => masteredIds.has(item.id)).length;

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
    sound.playFlip();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredItems.length - 1);
    }
    sound.playFlip();
  };

  const handleSpeakAll = () => {
    if (filteredItems.length > 0) {
      sound.playFlip();
      const current = filteredItems[currentIndex] || filteredItems[0];
      sound.speakArabic(current.arabic);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action and Control Bar */}
      <div className="bg-white p-5 rounded-[28px] border-b-4 border-sky-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Progress info */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block">
              Tema: {categoryTitle}
            </span>
            <span className="text-xs bg-emerald-400 text-sky-950 px-2.5 py-0.5 rounded-full font-black">
              {filteredItems.length} Kosakata
            </span>
          </div>
          <h2 className="text-2xl font-black text-sky-900 font-kids mt-0.5">
            Kartu Kosa Kata Interaktif 🌟
          </h2>
          <p className="text-xs text-sky-700 font-medium">
            Ketuk kartu untuk melihat arti, transliterasi Latin & contoh kalimat ceria!
          </p>
        </div>

        {/* Controls: Search, View Mode, Quiz CTA */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Cari kata atau arti..."
              className="w-full sm:w-44 pl-8 pr-3 py-2 bg-sky-50 border border-sky-200 rounded-xl text-xs font-bold text-sky-900 placeholder:text-sky-400 focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-sky-100 p-1 rounded-xl border border-sky-200">
            <button
              id="view-grid-btn"
              onClick={() => {
                setViewMode('grid');
                sound.playFlip();
              }}
              title="Tampilan Grid Semua Kartu"
              className={`p-2 rounded-lg text-xs font-black transition-all btn-chunky ${
                viewMode === 'grid'
                  ? 'bg-yellow-400 text-sky-950 shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-carousel-btn"
              onClick={() => {
                setViewMode('carousel');
                sound.playFlip();
              }}
              title="Tampilan Satu per Satu"
              className={`p-2 rounded-lg text-xs font-black transition-all btn-chunky ${
                viewMode === 'carousel'
                  ? 'bg-yellow-400 text-sky-950 shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Quiz Launch button */}
          <button
            id="start-quiz-deck-btn"
            onClick={() => onStartQuizForCategory(category)}
            className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-600 text-sky-900 rounded-xl text-xs font-black shadow-sm transition-all btn-chunky cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4 text-sky-950" />
            <span>Kuis Tema Ini</span>
            <Sparkles className="w-3.5 h-3.5 fill-sky-950 text-sky-950" />
          </button>
        </div>
      </div>

      {/* Progress Bar of Mastered Words with Dashed Box */}
      <div className="bg-sky-100 p-4 rounded-2xl border-2 border-dashed border-sky-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">⭐</span>
          <div>
            <span className="font-black text-sky-900 font-kids text-sm block">
              Kemajuan Hafalan: {masteredCount} dari {items.length} kata dikuasai
            </span>
            <p className="text-sky-600 text-[11px] font-medium italic">
              'Belajar kosa kata jadi seru setiap hari!'
            </p>
          </div>
        </div>

        <div className="w-full sm:w-56 bg-white rounded-full h-3 overflow-hidden border-2 border-sky-200 shadow-inner">
          <div
            className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${(masteredCount / (items.length || 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Area: Grid or Carousel */}
      {filteredItems.length === 0 ? (
        <div className="bg-white p-10 rounded-[32px] border-2 border-dashed border-sky-300 text-center space-y-2">
          <span className="text-5xl block">🔍</span>
          <h3 className="text-lg font-black text-sky-900">
            Kosakata tidak ditemukan
          </h3>
          <p className="text-xs text-sky-600">
            Coba kata kunci lain atau kosongkan kolom pencarian.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 px-4 py-2 bg-yellow-400 text-sky-900 border-b-4 border-yellow-600 rounded-xl text-xs font-black btn-chunky"
          >
            Tampilkan Semua
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <FlipCard
              key={item.id}
              item={item}
              isMastered={masteredIds.has(item.id)}
              onToggleMastered={onToggleMastered}
            />
          ))}
        </div>
      ) : (
        /* CAROUSEL / FOCUS MODE */
        <div className="max-w-md mx-auto space-y-5">
          <div className="text-center flex items-center justify-between px-2">
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider">
              Kartu {currentIndex + 1} dari {filteredItems.length}
            </span>
            <button
              onClick={handleSpeakAll}
              className="text-xs text-sky-950 font-black flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-xl border-b-2 border-emerald-600 btn-chunky"
            >
              <Volume2 className="w-3.5 h-3.5" /> Dengarkan Arab
            </button>
          </div>

          {currentItem && (
            <FlipCard
              key={currentItem.id}
              item={currentItem}
              isMastered={masteredIds.has(currentItem.id)}
              onToggleMastered={onToggleMastered}
            />
          )}

          {/* Carousel navigation buttons (Chunky 3D style) */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              id="deck-prev-btn"
              onClick={handlePrev}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black py-3.5 rounded-2xl border-b-4 border-slate-400 transition-all btn-chunky flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>KEMBALI</span>
            </button>

            <button
              id="deck-next-btn"
              onClick={handleNext}
              className="flex-[2] bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3.5 rounded-2xl border-b-4 border-emerald-700 text-base shadow-lg transition-all btn-chunky flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LANJUTKAN! 🚀</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

