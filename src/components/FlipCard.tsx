import React, { useState } from 'react';
import { Volume2, RotateCw, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { MufradatItem } from '../types';
import { sound } from '../utils/audio';

interface FlipCardProps {
  item: MufradatItem;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  item,
  isMastered,
  onToggleMastered,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    sound.playFlip();
  };

  const handleSpeakArabic = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setIsSpeaking(true);
    sound.speakArabic(text);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 1200);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMastered(item.id);
    if (!isMastered) {
      sound.playVictory();
    } else {
      sound.playFlip();
    }
  };

  return (
    <div
      id={`flip-card-${item.id}`}
      className="perspective-1000 w-full h-[390px] sm:h-[420px] select-none cursor-pointer group"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[32px] sm:rounded-[36px] bg-white border-2 border-sky-100 border-b-[10px] border-b-sky-200 shadow-xl hover:shadow-2xl transition-all p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
          {/* Top Bar: Depan Pill, Emoji, Mastered star, audio button */}
          <div className="flex items-center justify-between z-10 w-full">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-black text-xs shadow-2xs border border-yellow-200">
                Depan
              </span>
              <span className="text-2xl filter drop-shadow-xs">{item.emoji}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Star Mastered button */}
              <button
                id={`card-star-btn-${item.id}`}
                onClick={handleStarClick}
                title={isMastered ? 'Sudah Dikuasai!' : 'Tandai Sudah Hafal'}
                className={`p-2 rounded-xl border-b-2 transition-all btn-chunky ${
                  isMastered
                    ? 'bg-yellow-400 border-yellow-600 text-sky-950 shadow-xs scale-105'
                    : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-yellow-100 hover:text-amber-700'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${isMastered ? 'fill-sky-950 text-sky-950' : ''}`}
                />
              </button>

              {/* Audio Pronunciation button */}
              <button
                id={`card-audio-front-${item.id}`}
                onClick={(e) => handleSpeakArabic(e, item.arabic)}
                title="Dengarkan Pelafalan Arab"
                className={`p-2 rounded-xl border-b-2 transition-all btn-chunky ${
                  isSpeaking
                    ? 'bg-emerald-500 border-emerald-700 text-white animate-bounce'
                    : 'bg-emerald-400 hover:bg-emerald-300 border-emerald-600 text-sky-950 shadow-2xs'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Large Arabic with Scheherazade New Font */}
          <div className="my-auto text-center py-2 z-10 flex flex-col items-center justify-center">
            <h3
              className="text-5xl sm:text-6xl font-bold font-arabic text-sky-900 tracking-wide leading-tight drop-shadow-xs"
              dir="rtl"
            >
              {item.arabic}
            </h3>

            {/* Latin Transliteration */}
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black text-sky-500 tracking-wider font-kids uppercase">
                {item.latin}
              </span>
            </div>
          </div>

          {/* Bottom Hint Box */}
          <div className="z-10 w-full">
            <div className="p-3 bg-sky-50 rounded-2xl w-full text-center border border-sky-200/80 flex items-center justify-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-sky-500 group-hover:rotate-180 transition-transform duration-500" />
              <p className="text-sky-800 font-bold text-xs italic">
                Klik untuk melihat arti & contoh...
              </p>
              {isMastered && (
                <span className="flex items-center gap-1 text-emerald-700 font-black text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full ml-auto">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Hafal
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-orange-400 to-orange-500 border-b-[10px] border-orange-700 shadow-xl p-5 sm:p-6 flex flex-col justify-between text-white text-center overflow-hidden">
          {/* Top Bar on Back */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="bg-orange-300 text-orange-950 px-3 py-1 rounded-full font-black text-xs shadow-2xs border border-orange-200">
                Belakang
              </span>
              <span className="text-xs font-black text-white bg-black/20 px-2.5 py-1 rounded-full">
                {item.latin}
              </span>
            </div>

            {/* Sentence audio button */}
            <button
              id={`card-audio-back-${item.id}`}
              onClick={(e) => handleSpeakArabic(e, item.exampleArabic)}
              title="Dengarkan Contoh Kalimat Arab"
              className="flex items-center gap-1 px-3 py-1.5 bg-white text-sky-950 hover:bg-yellow-100 rounded-xl text-xs font-black transition-all border-b-2 border-slate-300 btn-chunky shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Baca Kalimat</span>
            </button>
          </div>

          {/* Center Content: Indonesian Meaning & Example Sentence */}
          <div className="my-auto py-1 text-center space-y-3">
            <div>
              <span className="text-[10px] uppercase font-black text-orange-100 tracking-widest block">
                Arti Bahasa Indonesia:
              </span>
              <h4 className="text-3xl sm:text-4xl font-black text-white tracking-wide mt-0.5 drop-shadow-xs uppercase">
                {item.indonesian}
              </h4>
              <div className="h-1 w-20 bg-white/30 rounded-full mx-auto mt-2"></div>
            </div>

            {/* Example Sentence Container */}
            <div className="bg-black/15 backdrop-blur-xs p-3.5 rounded-2xl border border-white/20 text-center space-y-1">
              <p
                className="text-lg sm:text-xl font-bold font-arabic text-yellow-200 leading-relaxed"
                dir="rtl"
              >
                {item.exampleArabic}
              </p>
              <p className="text-xs sm:text-sm font-bold bg-white/20 text-white p-2 rounded-xl leading-snug">
                "{item.exampleIndonesian}" ✍️
              </p>
            </div>

            {/* Fun Fact / Tips */}
            {item.funFact && (
              <div className="flex items-center gap-1.5 text-left text-[11px] text-orange-950 bg-yellow-300/90 font-bold px-3 py-1.5 rounded-xl shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-800 shrink-0" />
                <span className="line-clamp-2">{item.funFact}</span>
              </div>
            )}
          </div>

          {/* Bottom Flip back reminder */}
          <div className="flex items-center justify-center pt-2 border-t border-white/20 text-white/90 text-xs">
            <span className="flex items-center gap-1 font-bold">
              <RotateCw className="w-3.5 h-3.5" /> Ketuk untuk kembali ke depan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

