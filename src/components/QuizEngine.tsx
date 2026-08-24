import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  Trophy, 
  Star,
  Award,
  Loader2,
  BookOpen
} from 'lucide-react';
import { MufradatCategory, QuizQuestion, QuizResponse } from '../types';
import { CATEGORIES, DEFAULT_QUIZZES } from '../data/defaultMufradat';
import { sound } from '../utils/audio';

interface QuizEngineProps {
  initialCategory?: MufradatCategory;
  onFinishQuiz: (score: number, total: number, category: MufradatCategory) => void;
  onGoToCards: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  initialCategory = 'kelas',
  onFinishQuiz,
  onGoToCards,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MufradatCategory>(initialCategory);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [themeTitle, setThemeTitle] = useState<string>('');
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);
  const [systemMessage, setSystemMessage] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Array<{ isCorrect: boolean; selected: number; question: QuizQuestion }>>([]);

  // Load quiz on category change or initial load
  const loadQuiz = async (cat: MufradatCategory) => {
    setIsLoading(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setUserAnswers([]);

    try {
      const categoryObj = CATEGORIES.find((c) => c.id === cat);
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: cat,
          themeTitle: categoryObj ? `${categoryObj.name} (${categoryObj.arabicName})` : cat,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data: QuizResponse = await res.json();
      if (data && data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setThemeTitle(data.themeTitle || categoryObj?.name || 'Bahasa Arab');
        setIsAiGenerated(Boolean(data.generatedByAi));
        setSystemMessage(data.systemMessage || 'Kuis interaktif siap dimainkan!');
      } else {
        throw new Error('No questions returned');
      }
    } catch (err) {
      console.warn('Using local fallback quiz:', err);
      const fallbackList = DEFAULT_QUIZZES[cat] || DEFAULT_QUIZZES.kelas;
      const categoryObj = CATEGORIES.find((c) => c.id === cat);
      setQuestions(fallbackList);
      setThemeTitle(categoryObj?.name || 'Bahasa Arab');
      setIsAiGenerated(false);
      setSystemMessage('Kuis pilihan terverifikasi siap dimainkan!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz(selectedCategory);
  }, [selectedCategory]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    sound.playFlip();
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setUserAnswers((prev) => [
      ...prev,
      { isCorrect, selected: selectedOption, question: currentQ },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      sound.playFlip();
    } else {
      // Quiz finished
      const finalScore = score + (selectedOption === currentQ?.correctIndex ? 0 : 0);
      setIsQuizCompleted(true);
      onFinishQuiz(score, questions.length, selectedCategory);
      sound.playVictory();

      // Launch kid celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleSpeakArabic = (text?: string) => {
    if (!text) return;
    sound.speakArabic(text);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Category Selection Bar for Quiz */}
      <div className="bg-white p-5 rounded-[28px] border-b-4 border-yellow-400 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-500 uppercase tracking-widest block">
                Petualangan Kuis Cerdas
              </span>
              {isAiGenerated && (
                <span className="text-[10px] font-black bg-orange-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Gemini AI Live
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-sky-900 font-kids mt-0.5 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-orange-500" />
              <span>Tantangan Kuis AI Gemini</span>
            </h2>
            <p className="text-xs text-sky-700 font-medium">
              5 Soal Pilihan Ganda Interaktif dengan Harakat Lengkap & Contoh Kalimat Ceria!
            </p>
          </div>

          <button
            id="regenerate-quiz-btn"
            onClick={() => loadQuiz(selectedCategory)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-600 text-sky-950 rounded-xl text-xs font-black transition-all btn-chunky disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            <span>Buat Soal Baru</span>
          </button>
        </div>

        {/* Categories Vibrant Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`quiz-cat-btn-${cat.id}`}
                onClick={() => {
                  if (selectedCategory !== cat.id) {
                    setSelectedCategory(cat.id);
                  }
                }}
                className={`flex items-center gap-2.5 p-3 rounded-2xl text-left border-b-4 transition-all btn-chunky cursor-pointer text-xs ${
                  cat.vibrantBg
                } ${cat.vibrantHover} ${cat.vibrantBorder} ${
                  isSelected
                    ? 'ring-4 ring-sky-300 shadow-md scale-100'
                    : 'opacity-85 hover:opacity-100 scale-[0.98]'
                }`}
              >
                <span className="text-2xl filter drop-shadow-2xs">{cat.icon}</span>
                <div className="truncate">
                  <div className="font-black text-sky-950 text-sm truncate">{cat.name.split(' ')[0]}</div>
                  <div className="text-xs font-arabic font-bold text-sky-900/80 truncate">
                    {cat.arabicName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Box */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-[36px] border-b-[10px] border-sky-200 shadow-xl text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-3xl border-b-4 border-yellow-600 flex items-center justify-center text-4xl animate-bounce shadow-md">
            🪄
          </div>
          <div>
            <h3 className="text-xl font-black text-sky-900 font-kids">
              Guru AI Gemini Sedang Meracik Soal Ceria...
            </h3>
            <p className="text-xs text-sky-600 mt-1 max-w-md mx-auto">
              Menyiapkan 5 pertanyaan interaktif, kosa kata harakat lengkap, arti bahasa Indonesia, dan contoh kalimat ramah anak.
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 text-sky-700 text-xs font-black">
            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
            <span>Memproses tema: {themeTitle || selectedCategory}...</span>
          </div>
        </div>
      ) : isQuizCompleted ? (
        /* QUIZ VICTORY RESULT SCREEN */
        <div className="bg-white p-8 sm:p-10 rounded-[40px] border-b-[12px] border-yellow-400 shadow-2xl text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 via-orange-400 to-emerald-400 rounded-3xl p-1.5 shadow-xl animate-float border-b-4 border-orange-600">
            <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-5xl">
              {score >= 4 ? '🏆' : score >= 3 ? '🌟' : '💪'}
            </div>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-900 bg-yellow-300 px-4 py-1.5 rounded-full border border-yellow-400 shadow-2xs">
              Kuis Selesai! 🎉
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-sky-900 mt-3 font-kids">
              {score === questions.length
                ? 'Mumtaz! Nilai Sempurna! ⭐⭐⭐⭐⭐'
                : score >= 3
                ? 'Hebat Sekali! Kamu Pintar! 🌟'
                : 'Bagus! Terus Semangat Belajar ya! 🚀'}
            </h2>
            <p className="text-sm text-sky-700 font-bold mt-1">
              Kamu berhasil menjawab <strong className="text-orange-500 text-lg">{score}</strong> dari <strong className="text-sky-900 text-lg">{questions.length}</strong> pertanyaan dengan benar!
            </p>
          </div>

          {/* Stars visual reward */}
          <div className="flex justify-center items-center gap-2.5 py-2">
            {Array.from({ length: questions.length }).map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform transform ${
                  i < score
                    ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-md'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>

          {/* Review of learned words in this quiz */}
          <div className="bg-sky-50 p-5 rounded-[28px] border-2 border-dashed border-sky-300 text-left space-y-3">
            <h4 className="text-xs font-black text-sky-900 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span>Ringkasan Jawaban & Kosakata Kuis:</span>
            </h4>
            <div className="space-y-2.5">
              {userAnswers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border-b-2 text-xs flex items-start justify-between gap-2.5 ${
                    ans.isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="font-black flex items-center gap-1.5 text-sm">
                      {ans.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>Soal {idx + 1}: {ans.question.question}</span>
                    </div>
                    {ans.question.arabicPrompt && (
                      <div className="font-arabic text-base font-bold text-sky-900 mt-0.5">
                        {ans.question.arabicPrompt}
                      </div>
                    )}
                    <p className="text-xs text-sky-800 font-medium">
                      {ans.question.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="quiz-play-again-btn"
              onClick={() => loadQuiz(selectedCategory)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-600 text-sky-950 font-black text-base rounded-2xl shadow-md transition-all btn-chunky cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Kuis Lagi</span>
            </button>

            <button
              id="quiz-back-cards-btn"
              onClick={onGoToCards}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-200 hover:bg-slate-300 border-b-4 border-slate-400 text-slate-700 font-black text-base rounded-2xl transition-all btn-chunky cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Lihat Kartu Flip</span>
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-[10px] border-sky-200 shadow-xl space-y-6">
          {/* Top Progress & Audio */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-black text-sky-900 bg-yellow-400 border-b-2 border-yellow-600 px-3.5 py-1 rounded-xl font-kids">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <span className="text-sky-500 font-bold uppercase tracking-wider hidden sm:inline">
                Tema: {selectedCategory.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 font-black text-sky-900 bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                <span>Skor: {score}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar (Vibrant Multi-segment) */}
          <div className="flex gap-2">
            {Array.from({ length: questions.length }).map((_, i) => (
              <div
                key={i}
                className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= currentIndex
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Question Text & Arabic Highlight */}
          <div className="text-center space-y-3 py-2">
            <h3 className="text-xl sm:text-2xl font-black text-sky-900 font-kids leading-snug">
              {currentQ.question}
            </h3>

            {currentQ.arabicPrompt && (
              <div className="inline-flex flex-col items-center justify-center p-4 bg-sky-50 border-2 border-sky-200 rounded-3xl max-w-sm mx-auto shadow-xs">
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl sm:text-5xl font-bold font-arabic text-sky-900"
                    dir="rtl"
                  >
                    {currentQ.arabicPrompt}
                  </span>
                  <button
                    id="speak-question-arabic-btn"
                    onClick={() => handleSpeakArabic(currentQ.arabicPrompt)}
                    title="Dengarkan Suara Arab"
                    className="p-2 bg-emerald-400 hover:bg-emerald-300 border-b-2 border-emerald-600 text-sky-950 rounded-xl btn-chunky shadow-2xs"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                {currentQ.latinPrompt && (
                  <span className="text-sm font-black text-sky-500 font-kids mt-1.5 tracking-wider uppercase">
                    {currentQ.latinPrompt}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Option Buttons (4 choices in Chunky 3D style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let buttonStyle = 'bg-sky-50 hover:bg-yellow-50 border-b-4 border-sky-200 text-sky-900';

              if (isSelected && !isAnswerSubmitted) {
                buttonStyle = 'bg-yellow-400 border-b-4 border-yellow-600 text-sky-950 ring-4 ring-sky-300 font-black shadow-md';
              } else if (isAnswerSubmitted) {
                if (isCorrect) {
                  buttonStyle = 'bg-emerald-400 border-b-4 border-emerald-700 text-sky-950 font-black ring-4 ring-emerald-200';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-rose-200 border-b-4 border-rose-400 text-rose-950 font-black';
                } else {
                  buttonStyle = 'bg-slate-100 border-b-2 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-btn-${idx}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl text-left transition-all btn-chunky flex items-center justify-between gap-2 cursor-pointer ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border-2 border-sky-200 text-sky-950 text-xs font-black flex items-center justify-center shadow-2xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-base font-black font-kids">{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Panel (shown after submit) */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl border-2 text-left space-y-2 transition-all ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-yellow-50 border-yellow-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <span className="text-xl">🎉</span>
                    <span>Jawaban Tepat Sekali! Mumtaz!</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">💡</span>
                    <span>Yuk pelajari penjelasannya:</span>
                  </>
                )}
              </div>
              <p className="text-xs font-bold leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Cheerful example sentence if available */}
              {currentQ.vocabularyItem?.exampleArabic && (
                <div className="bg-white/90 p-3 rounded-xl border border-sky-200 mt-2">
                  <div className="flex items-center justify-between text-[11px] font-black text-sky-900">
                    <span>Contoh Kalimat Ceria:</span>
                    <button
                      onClick={() => handleSpeakArabic(currentQ.vocabularyItem?.exampleArabic)}
                      className="flex items-center gap-1 text-emerald-700 hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Dengarkan
                    </button>
                  </div>
                  <p className="text-lg font-arabic font-bold text-sky-900 text-right mt-1" dir="rtl">
                    {currentQ.vocabularyItem.exampleArabic}
                  </p>
                  <p className="text-xs italic font-bold text-sky-700 mt-0.5">
                    "{currentQ.vocabularyItem.exampleIndonesian}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Button: Confirm or Next (Chunky 3D style) */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                id="submit-answer-btn"
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed text-sky-950 font-black text-base rounded-2xl shadow-md transition-all btn-chunky cursor-pointer"
              >
                Kunci Jawaban! 🎯
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={handleNextQuestion}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-black text-base rounded-2xl shadow-lg transition-all btn-chunky cursor-pointer"
              >
                <span>{currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis! 🚀'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
