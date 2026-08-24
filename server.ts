import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Curated fallback mode will be used.');
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Fallback curated questions for the 4 categories
const fallbackQuizzes: Record<string, any[]> = {
  kelas: [
    {
      id: 'ai-k1',
      question: 'Apa arti dari kosa kata "قَلَمٌ" (Qalamun)?',
      arabicPrompt: 'قَلَمٌ',
      latinPrompt: 'Qalamun',
      options: ['Buku Tulis', 'Pulpen / Pena', 'Penghapus', 'Meja Belajar'],
      correctIndex: 1,
      explanation: 'Hebat! "قَلَمٌ" (Qalamun) artinya Pulpen. Contoh kalimat ceria: هٰذَا قَلَمٌ جَمِيْلٌ! (Ini pulpen yang bagus!)',
      category: 'kelas',
      vocabularyItem: {
        arabic: 'قَلَمٌ',
        latin: 'Qalamun',
        indonesian: 'Pulpen / Pena',
        exampleArabic: 'هٰذَا قَلَمٌ جَمِيْلٌ!',
        exampleIndonesian: 'Ini pulpen yang sangat bagus!'
      }
    },
    {
      id: 'ai-k2',
      question: 'Manakah bahasa Arab dari benda "Buku"?',
      arabicPrompt: 'Buku 📚',
      latinPrompt: 'Buku',
      options: ['كِتَابٌ (Kitaabun)', 'مِسْطَرَةٌ (Mistharatun)', 'سَبُّورَةٌ (Sabbuuratun)', 'حَقِيبَةٌ (Haqiibatun)'],
      correctIndex: 0,
      explanation: 'Pintar sekali! "كِتَابٌ" (Kitaabun) artinya Buku. Contoh: أَقْرَأُ الكِتَابَ بِمَرَحٍ! (Aku membaca buku dengan ceria!)',
      category: 'kelas'
    },
    {
      id: 'ai-k3',
      question: 'Benda apa yang dimaksud dengan "سَبُّورَةٌ" (Sabbuuratun)?',
      arabicPrompt: 'سَبُّورَةٌ',
      latinPrompt: 'Sabbuuratun',
      options: ['Papan Tulis', 'Kursi', 'Penggaris', 'Kapur'],
      correctIndex: 0,
      explanation: 'Tepat sekali! "سَبُّورَةٌ" (Sabbuuratun) adalah Papan Tulis di ruang kelas.',
      category: 'kelas'
    },
    {
      id: 'ai-k4',
      question: 'Apa arti dari kata "حَقِيبَةٌ" (Haqiibatun)?',
      arabicPrompt: 'حَقِيبَةٌ',
      latinPrompt: 'Haqiibatun',
      options: ['Tempat Pensil', 'Sepatu Sekolah', 'Tas Sekolah', 'Baju Seragam'],
      correctIndex: 2,
      explanation: 'Juara! "حَقِيبَةٌ" (Haqiibatun) artinya Tas Sekolah tempat membawa buku dan peralatan belajar.',
      category: 'kelas'
    },
    {
      id: 'ai-k5',
      question: 'Manakah arti yang benar untuk "مِسْطَرَةٌ" (Mistharatun)?',
      arabicPrompt: 'مِسْطَرَةٌ',
      latinPrompt: 'Mistharatun',
      options: ['Gunting', 'Penggaris', 'Pena', 'Krayon'],
      correctIndex: 1,
      explanation: 'Masya Allah luar biasa! "مِسْطَرَةٌ" (Mistharatun) adalah Penggaris.',
      category: 'kelas'
    }
  ],
  alam: [
    {
      id: 'ai-a1',
      question: 'Apa arti kata bahasa Arab "شَمْسٌ" (Syamsun)?',
      arabicPrompt: 'شَمْسٌ',
      latinPrompt: 'Syamsun',
      options: ['Bintang', 'Matahari', 'Bulan', 'Awan'],
      correctIndex: 1,
      explanation: 'Bagus sekali! "شَمْسٌ" (Syamsun) adalah Matahari yang bersinar hangat di pagi hari!',
      category: 'alam'
    },
    {
      id: 'ai-a2',
      question: 'Bahasa Arab untuk "Pohon Rindang" adalah...?',
      arabicPrompt: 'Pohon 🌳',
      latinPrompt: 'Pohon',
      options: ['شَجَرَةٌ (Syajaratun)', 'نَهْرٌ (Nahrun)', 'زَهْرَةٌ (Zahratun)', 'جَبَلٌ (Jabalun)'],
      correctIndex: 0,
      explanation: 'Keren! "شَجَرَةٌ" (Syajaratun) artinya Pohon.',
      category: 'alam'
    },
    {
      id: 'ai-a3',
      question: 'Apa arti dari kosa kata "مَطَرٌ" (Matharun)?',
      arabicPrompt: 'مَطَرٌ',
      latinPrompt: 'Matharun',
      options: ['Pelangi', 'Angin', 'Hujan', 'Petir'],
      correctIndex: 2,
      explanation: 'Pintar! "مَطَرٌ" (Matharun) adalah Hujan berkah yang menyegarkan bumi!',
      category: 'alam'
    },
    {
      id: 'ai-a4',
      question: 'Benda langit yang bersinar di malam hari "قَمَرٌ" (Qamarun) artinya...?',
      arabicPrompt: 'قَمَرٌ',
      latinPrompt: 'Qamarun',
      options: ['Bulan', 'Matahari', 'Planet', 'Meteor'],
      correctIndex: 0,
      explanation: 'Hebat! "قَمَرٌ" (Qamarun) artinya Bulan yang indah.',
      category: 'alam'
    },
    {
      id: 'ai-a5',
      question: 'Apa arti dari kata "زَهْرَةٌ" (Zahratun)?',
      arabicPrompt: 'زَهْرَةٌ',
      latinPrompt: 'Zahratun',
      options: ['Bunga', 'Daun', 'Rumput', 'Sungai'],
      correctIndex: 0,
      explanation: 'Benar sekali! "زَهْرَةٌ" (Zahratun) artinya Bunga cantik berwarna-warni.',
      category: 'alam'
    }
  ],
  makanan: [
    {
      id: 'ai-m1',
      question: 'Buah manis lezat "تُفَّاحٌ" (Tuffaahun) dalam bahasa Indonesia adalah...?',
      arabicPrompt: 'تُفَّاحٌ',
      latinPrompt: 'Tuffaahun',
      options: ['Jeruk', 'Apel', 'Mangga', 'Pisang'],
      correctIndex: 1,
      explanation: 'Mantap! "تُفَّاحٌ" (Tuffaahun) artinya Buah Apel yang manis dan renyah!',
      category: 'makanan'
    },
    {
      id: 'ai-m2',
      question: 'Minuman bergizi untuk kesehatan "حَلِيبٌ" (Haliibun) artinya adalah...?',
      arabicPrompt: 'حَلِيبٌ',
      latinPrompt: 'Haliibun',
      options: ['Air Putih', 'Jus Buah', 'Susu', 'Madu'],
      correctIndex: 2,
      explanation: 'Luar biasa! "حَلِيبٌ" (Haliibun) adalah Susu hangat berkhasiat!',
      category: 'makanan'
    },
    {
      id: 'ai-m3',
      question: 'Makanan pokok "رُزٌّ" (Ruzzun) artinya...?',
      arabicPrompt: 'رُزٌّ',
      latinPrompt: 'Ruzzun',
      options: ['Roti', 'Nasi', 'Kentang', 'Gandum'],
      correctIndex: 1,
      explanation: 'Hebat! "رُزٌّ" (Ruzzun) artinya Nasi yang mengenyangkan!',
      category: 'makanan'
    },
    {
      id: 'ai-m4',
      question: 'Apa arti kata "خُبْزٌ" (Khubzun)?',
      arabicPrompt: 'خُبْزٌ',
      latinPrompt: 'Khubzun',
      options: ['Roti', 'Keju', 'Biskuit', 'Sup'],
      correctIndex: 0,
      explanation: 'Tepat sekali! "خُبْزٌ" (Khubzun) adalah Roti lezat!',
      category: 'makanan'
    },
    {
      id: 'ai-m5',
      question: 'Bahasa Arab dari buah kuning "Pisang" adalah...?',
      arabicPrompt: 'Pisang 🍌',
      latinPrompt: 'Pisang Manis',
      options: ['مَوْزٌ (Mauzun)', 'تُفَّاحٌ (Tuffaahun)', 'عِنَبٌ (\'Inabun)', 'مَاءٌ (Maa\'un)'],
      correctIndex: 0,
      explanation: 'Juara! "مَوْزٌ" (Mauzun) artinya Buah Pisang.',
      category: 'makanan'
    }
  ],
  keluarga: [
    {
      id: 'ai-f1',
      question: 'Siapakah sosok yang disebut "أَبٌ" (Abun)?',
      arabicPrompt: 'أَبٌ',
      latinPrompt: 'Abun',
      options: ['Ibu', 'Kakek', 'Ayah', 'Paman'],
      correctIndex: 2,
      explanation: 'Benar sekali! "أَبٌ" (Abun) artinya Ayah tercinta.',
      category: 'keluarga'
    },
    {
      id: 'ai-f2',
      question: 'Ibu tercinta dalam bahasa Arab dengan harakat lengkap adalah...?',
      arabicPrompt: 'Ibu 👩',
      latinPrompt: 'Ibu',
      options: ['أُمٌّ (Ummun)', 'أُخْتٌ (Ukhtun)', 'جَدَّةٌ (Jaddatun)', 'عَمَّةٌ (\'Ammatun)'],
      correctIndex: 0,
      explanation: 'Masya Allah! "أُمٌّ" (Ummun) artinya Ibu tersayang.',
      category: 'keluarga'
    },
    {
      id: 'ai-f3',
      question: 'Apa arti dari kata "أَخٌ" (Akhun)?',
      arabicPrompt: 'أَخٌ',
      latinPrompt: 'Akhun',
      options: ['Saudara Laki-laki', 'Saudari Perempuan', 'Sepupu', 'Kakek'],
      correctIndex: 0,
      explanation: 'Hebat! "أَخٌ" (Akhun) adalah Saudara Laki-laki (Kakak atau Adik).',
      category: 'keluarga'
    },
    {
      id: 'ai-f4',
      question: 'Apa arti dari kata "جَدٌّ" (Jaddun)?',
      arabicPrompt: 'جَدٌّ',
      latinPrompt: 'Jaddun',
      options: ['Nenek', 'Ayah', 'Kakek', 'Paman'],
      correctIndex: 2,
      explanation: 'Pintar! "جَدٌّ" (Jaddun) artinya Kakek bijaksana.',
      category: 'keluarga'
    },
    {
      id: 'ai-f5',
      question: 'Bahasa Arab untuk "Nenek Tersayang" adalah...?',
      arabicPrompt: 'Nenek 👵',
      latinPrompt: 'Nenek',
      options: ['جَدَّةٌ (Jaddatun)', 'أُمٌّ (Ummun)', 'أُخْتٌ (Ukhtun)', 'بِنْتٌ (Bintun)'],
      correctIndex: 0,
      explanation: 'Keren! "جَدَّةٌ" (Jaddatun) artinya Nenek tercinta.',
      category: 'keluarga'
    }
  ]
};

// API Endpoint for generating quiz questions using Gemini API
app.post('/api/generate-quiz', async (req, res) => {
  const { category = 'kelas', themeTitle } = req.body;
  const validCategory = ['kelas', 'alam', 'makanan', 'keluarga'].includes(category) ? category : 'kelas';
  const categoryNames: Record<string, string> = {
    kelas: 'Kelas & Sekolah (الفَصْلُ وَالمَدْرَسَةُ)',
    alam: 'Alam & Semesta (الطَّبِيعَةُ وَالكَوْنُ)',
    makanan: 'Makanan & Minuman (الطَّعَامُ وَالشَّرَابُ)',
    keluarga: 'Keluarga Tercinta (الأُسْرَةُ وَالعَائِلَةُ)',
  };

  const selectedTheme = themeTitle || categoryNames[validCategory];

  try {
    const ai = getGeminiAI();

    if (!ai) {
      // Fallback if no API key
      const fallbackList = fallbackQuizzes[validCategory] || fallbackQuizzes.kelas;
      return res.json({
        success: true,
        category: validCategory,
        themeTitle: selectedTheme,
        generatedByAi: false,
        questions: fallbackList,
        systemMessage: 'Kuis interaktif dimuat dari kurikulum terverifikasi MufradatQuest.'
      });
    }

    const systemPrompt = "Anda adalah guru Bahasa Arab anak SD. Buatkan 5 soal pilihan ganda interaktif dari tema yang dipilih beserta kosa kata harakat lengkap, arti bahasa Indonesia, dan contoh kalimat pendek yang ceria.";

    const userPrompt = `Buatkan 5 soal pilihan ganda interaktif untuk anak SD bertema: "${selectedTheme}".
Pastikan setiap soal:
1. Menguji kosakata bahasa Arab dengan harakat lengkap (tashkeel).
2. Ada 4 pilihan jawaban yang jelas.
3. correctIndex bernilai 0, 1, 2, atau 3.
4. Tuliskan penjelasan ceria yang ramah anak SD dengan arti bahasa Indonesia dan contoh kalimat pendek yang ceria.
5. Sertakan data kosa kata utama (arabic harakat lengkap, latin, indonesian, contoh kalimat bahasa arab ceria & arti indonesia).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeTitle: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING, description: 'Pertanyaan ceria ramah anak SD' },
                  arabicPrompt: { type: Type.STRING, description: 'Kata/frasa Arab dengan harakat lengkap' },
                  latinPrompt: { type: Type.STRING, description: 'Transliterasi latin' },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '4 pilihan jawaban pilihan ganda'
                  },
                  correctIndex: { type: Type.INTEGER, description: 'Indeks jawaban benar (0-3)' },
                  explanation: { type: Type.STRING, description: 'Penjelasan ceria dan edukatif ramah anak' },
                  vocabularyItem: {
                    type: Type.OBJECT,
                    properties: {
                      arabic: { type: Type.STRING, description: 'Kata dengan harakat lengkap' },
                      latin: { type: Type.STRING },
                      indonesian: { type: Type.STRING },
                      exampleArabic: { type: Type.STRING, description: 'Contoh kalimat pendek ceria dengan harakat' },
                      exampleIndonesian: { type: Type.STRING, description: 'Arti contoh kalimat' }
                    },
                    required: ['arabic', 'latin', 'indonesian', 'exampleArabic', 'exampleIndonesian']
                  }
                },
                required: ['question', 'options', 'correctIndex', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini model');
    }

    const parsed = JSON.parse(text);
    const questions = (parsed.questions || []).map((q: any, idx: number) => ({
      id: q.id || `gen-${validCategory}-${Date.now()}-${idx}`,
      question: q.question,
      arabicPrompt: q.arabicPrompt || '',
      latinPrompt: q.latinPrompt || '',
      options: Array.isArray(q.options) && q.options.length >= 4 ? q.options.slice(0, 4) : ['A', 'B', 'C', 'D'],
      correctIndex: typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4 ? q.correctIndex : 0,
      explanation: q.explanation || 'Jawaban yang tepat!',
      category: validCategory,
      vocabularyItem: q.vocabularyItem
    }));

    if (questions.length === 0) {
      throw new Error('No questions returned');
    }

    return res.json({
      success: true,
      category: validCategory,
      themeTitle: parsed.themeTitle || selectedTheme,
      generatedByAi: true,
      questions: questions,
      systemMessage: 'Kuis ceria berhasil dibuat khusus oleh Gemini AI Guru Bahasa Arab!'
    });

  } catch (err: any) {
    console.error('Error generating quiz via Gemini:', err);
    // Fallback to high quality pre-built quiz so user experience never breaks
    const fallbackList = fallbackQuizzes[validCategory] || fallbackQuizzes.kelas;
    return res.json({
      success: true,
      category: validCategory,
      themeTitle: selectedTheme,
      generatedByAi: false,
      questions: fallbackList,
      systemMessage: 'Kuis interaktif dimuat dari kurikulum pilihan MufradatQuest.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'MufradatQuest',
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MufradatQuest server running on http://localhost:${PORT}`);
  });
}

startServer();
