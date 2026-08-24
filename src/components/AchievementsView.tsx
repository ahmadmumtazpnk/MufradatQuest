import React from 'react';
import { Trophy, Star, Sparkles, Award, CheckCircle2, BookOpen, BrainCircuit } from 'lucide-react';
import { CATEGORIES } from '../data/defaultMufradat';
import { MufradatCategory } from '../types';

interface AchievementsViewProps {
  starsCount: number;
  totalQuizzesPlayed: number;
  masteredIds: Set<string>;
  onStartQuiz: (cat: MufradatCategory) => void;
  onGoToCards: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  starsCount,
  totalQuizzesPlayed,
  masteredIds,
  onStartQuiz,
  onGoToCards,
}) => {
  const masteredCount = masteredIds.size;

  const BADGES = [
    {
      id: 'first-step',
      title: 'Langkah Pertama ⭐',
      desc: 'Buka dan balik kartu kosakata pertama',
      icon: '🌱',
      isUnlocked: masteredCount >= 1 || totalQuizzesPlayed >= 1,
    },
    {
      id: 'kelas-explorer',
      title: 'Bintang Kelas 🎒',
      desc: 'Kuasai kosakata perlengkapan sekolah',
      icon: '🏫',
      isUnlocked: masteredCount >= 4,
    },
    {
      id: 'nature-friend',
      title: 'Sahabat Alam 🌿',
      desc: 'Hafal kosakata alam dan semesta',
      icon: '🌳',
      isUnlocked: masteredCount >= 8,
    },
    {
      id: 'food-chef',
      title: 'Penjelajah Makanan 🍎',
      desc: 'Hafal kosakata makanan & minuman lezat',
      icon: '🍉',
      isUnlocked: masteredCount >= 12,
    },
    {
      id: 'family-love',
      title: 'Bintang Keluarga 👨‍👩‍👧‍👦',
      desc: 'Kuasai panggilan anggota keluarga tercinta',
      icon: '💖',
      isUnlocked: masteredCount >= 16,
    },
    {
      id: 'quiz-champion',
      title: 'Juara Kuis AI 🏆',
      desc: 'Selesaikan 3 kuis dengan nilai bagus',
      icon: '🎯',
      isUnlocked: totalQuizzesPlayed >= 3,
    },
    {
      id: 'grand-master',
      title: 'Ksatria Mufradat 👑',
      desc: 'Kumpulkan 20+ bintang belajar',
      icon: '✨',
      isUnlocked: starsCount >= 20,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner - Vibrant Yellow & Chunky */}
      <div className="bg-yellow-400 text-sky-950 p-6 sm:p-8 rounded-[36px] border-b-[8px] border-yellow-600 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest bg-sky-900 text-yellow-300 px-3.5 py-1 rounded-full shadow-2xs">
              Pusat Prestasi Cilik 🏆
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-kids mt-1 text-sky-950">
              Petualangan Hebatmu! 🌟
            </h2>
            <p className="text-xs sm:text-sm text-sky-900 font-bold max-w-md">
              Kumpulkan bintang dari setiap kuis Gemini AI dan tandai kartu yang sudah kamu kuasai.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/90 p-4 rounded-3xl border-b-4 border-yellow-600 shadow-md">
            <div className="text-center px-3">
              <div className="text-3xl font-black text-sky-950">{starsCount}</div>
              <div className="text-[10px] text-orange-600 font-black uppercase tracking-wider">Bintang</div>
            </div>
            <div className="w-0.5 h-10 bg-sky-200" />
            <div className="text-center px-3">
              <div className="text-3xl font-black text-sky-950">{masteredCount}</div>
              <div className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">Hafal</div>
            </div>
            <div className="w-0.5 h-10 bg-sky-200" />
            <div className="text-center px-3">
              <div className="text-3xl font-black text-sky-950">{totalQuizzesPlayed}</div>
              <div className="text-[10px] text-sky-600 font-black uppercase tracking-wider">Kuis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-4 border-sky-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block">
              Koleksi Penghargaan
            </span>
            <h3 className="text-2xl font-black text-sky-900 font-kids flex items-center gap-2 mt-0.5">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Lencana Prestasi Kamu</span>
            </h3>
          </div>
          <span className="text-xs font-black text-sky-950 bg-yellow-300 border-b-2 border-yellow-500 px-3.5 py-1.5 rounded-xl shadow-2xs">
            {BADGES.filter((b) => b.isUnlocked).length} / {BADGES.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-b-4 transition-all flex items-start gap-3.5 ${
                badge.isUnlocked
                  ? 'bg-sky-50 border-sky-300 shadow-xs hover:border-yellow-400'
                  : 'bg-slate-50 border-slate-200 opacity-55'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border-b-2 ${
                  badge.isUnlocked
                    ? 'bg-yellow-400 border-yellow-600 shadow-xs'
                    : 'bg-slate-200 border-slate-300 grayscale'
                }`}
              >
                {badge.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black text-sky-950 font-kids">
                    {badge.title}
                  </h4>
                  {badge.isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-sky-700 font-medium leading-snug">
                  {badge.desc}
                </p>
                <span
                  className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-md mt-1 ${
                    badge.isUnlocked
                      ? 'bg-emerald-400 text-sky-950'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {badge.isUnlocked ? 'Tercapai! 🎉' : 'Terkunci 🔒'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Play CTA */}
      <div className="bg-sky-100 p-6 rounded-[28px] border-2 border-dashed border-sky-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-black text-sky-900 font-kids">
            Siap Menambah Bintang Baru Hari Ini? 🌟
          </h4>
          <p className="text-xs text-sky-700 font-bold mt-0.5">
            Pilih tantangan kuis bertenaga Gemini AI atau ulangi kartu flip untuk memperkuat hafalanmu.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onStartQuiz('kelas')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-600 text-sky-950 text-xs font-black rounded-2xl shadow-sm transition-all btn-chunky cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Mulai Kuis AI</span>
          </button>
          <button
            onClick={onGoToCards}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 border-b-4 border-slate-300 text-slate-700 text-xs font-black rounded-2xl transition-all btn-chunky cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Kartu Flip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

