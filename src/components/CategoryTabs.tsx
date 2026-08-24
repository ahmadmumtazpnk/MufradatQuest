import React from 'react';
import { CATEGORIES } from '../data/defaultMufradat';
import { MufradatCategory } from '../types';
import { sound } from '../utils/audio';

interface CategoryTabsProps {
  selectedCategory: MufradatCategory;
  onSelectCategory: (cat: MufradatCategory) => void;
  masteredCountByCategory?: Record<MufradatCategory, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  masteredCountByCategory = { kelas: 0, alam: 0, makanan: 0, keluarga: 0 },
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-bold text-sky-900 uppercase tracking-widest px-1">
          Pilih Tema Petualangan
        </h2>
        <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
          4 Tema Seru
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const mastered = masteredCountByCategory[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-tab-${cat.id}`}
              onClick={() => {
                onSelectCategory(cat.id);
                sound.playFlip();
              }}
              className={`p-4 rounded-2xl flex flex-col justify-between border-b-4 transition-all btn-chunky cursor-pointer ${
                cat.vibrantBg
              } ${cat.vibrantHover} ${cat.vibrantBorder} ${
                isSelected
                  ? 'ring-4 ring-sky-300/80 shadow-lg scale-100'
                  : 'opacity-85 hover:opacity-100 scale-[0.98] hover:scale-100'
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <span className="text-3xl sm:text-4xl filter drop-shadow-xs select-none">
                  {cat.icon}
                </span>
                <span className="bg-white/80 backdrop-blur-xs text-sky-900 text-[11px] font-black px-2 py-0.5 rounded-full shadow-2xs border border-white/60">
                  ⭐ {mastered}/6
                </span>
              </div>

              <div className="mt-3 text-left w-full">
                <h3 className="font-black text-sky-950 text-base sm:text-lg leading-tight">
                  {cat.name}
                </h3>
                <p className="font-arabic font-bold text-sm sm:text-base text-sky-900/80 mt-0.5 leading-snug">
                  {cat.arabicName}
                </p>
              </div>

              <div className="mt-2 text-[10px] text-sky-900/70 font-bold uppercase tracking-wider text-left">
                {isSelected ? '✓ Sedang Dipelajari' : 'Klik untuk Buka'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

