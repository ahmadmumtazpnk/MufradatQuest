import React from 'react';
import { Volume2, VolumeX, BookOpen, BrainCircuit, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: 'cards' | 'quiz' | 'achievements';
  setActiveTab: (tab: 'cards' | 'quiz' | 'achievements') => void;
  starsCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  starsCount,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setSoundEnabled(next);
    if (next) {
      sound.playFlip();
    }
  };

  return (
    <header className="bg-white px-4 sm:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center shadow-sm border-b-4 border-yellow-400 sticky top-0 z-40 gap-3">
      {/* Brand & Logo */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <div
          id="brand-logo"
          onClick={() => {
            setActiveTab('cards');
            sound.playFlip();
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="bg-orange-500 p-2 rounded-xl rotate-3 shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl sm:text-2xl tracking-tighter block leading-none">
              MQ
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-sky-900 tracking-tight font-kids flex items-center gap-2">
              <span>Mufradat<span className="text-orange-500">Quest</span></span>
              <span className="hidden lg:inline-block text-xs font-bold text-sky-500 uppercase tracking-widest bg-sky-100 px-2 py-0.5 rounded-full">
                Edisi SD
              </span>
            </h1>
            <p className="text-[11px] text-sky-600 font-bold hidden sm:block">
              Belajar kosa kata bahasa Arab seru bertenaga AI Gemini
            </p>
          </div>
        </div>

        {/* Mobile Stars Score View */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Skor</span>
            <span className="text-sm font-black text-sky-900">{starsCount} ⭐</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
        </div>
      </div>

      {/* Center Navigation Tabs (Chunky 3D style) */}
      <nav aria-label="Main Navigation" className="flex items-center gap-2 bg-sky-100/70 p-1.5 rounded-2xl border-2 border-sky-200">
        <button
          id="nav-cards-btn"
          onClick={() => {
            setActiveTab('cards');
            sound.playFlip();
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all btn-chunky ${
            activeTab === 'cards'
              ? 'bg-yellow-400 text-sky-900 border-b-4 border-yellow-600 shadow-sm'
              : 'text-sky-800 hover:bg-white/70'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-900" />
          <span>Kartu Flip</span>
        </button>

        <button
          id="nav-quiz-btn"
          onClick={() => {
            setActiveTab('quiz');
            sound.playFlip();
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all btn-chunky ${
            activeTab === 'quiz'
              ? 'bg-emerald-500 text-white border-b-4 border-emerald-700 shadow-sm'
              : 'text-sky-800 hover:bg-white/70'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Kuis AI</span>
          <span className="bg-emerald-300 text-emerald-950 text-[10px] px-1.5 py-0.2 rounded-full font-black uppercase tracking-wider hidden sm:inline">
            Gemini
          </span>
        </button>

        <button
          id="nav-achieve-btn"
          onClick={() => {
            setActiveTab('achievements');
            sound.playFlip();
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all btn-chunky ${
            activeTab === 'achievements'
              ? 'bg-orange-500 text-white border-b-4 border-orange-700 shadow-sm'
              : 'text-sky-800 hover:bg-white/70'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Prestasi</span>
        </button>
      </nav>

      {/* Right Stats & Audio Settings */}
      <div className="hidden md:flex items-center gap-5">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Skor Kamu</span>
          <span className="text-2xl font-black text-sky-900">{starsCount.toLocaleString()} ⭐</span>
        </div>

        <div className="w-11 h-11 rounded-full bg-emerald-400 border-4 border-white shadow-md flex items-center justify-center text-white font-black text-lg">
          A
        </div>

        {/* Audio Toggle */}
        <button
          id="sound-toggle-btn"
          onClick={toggleSound}
          title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          className={`p-2.5 rounded-2xl border-2 transition-all btn-chunky ${
            soundEnabled
              ? 'bg-yellow-100 border-yellow-400 text-amber-900 hover:bg-yellow-200'
              : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-600" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};

