import { CategoryInfo, MufradatCategory, MufradatItem, QuizQuestion } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'kelas',
    name: 'Kelas & Sekolah',
    arabicName: 'الفَصْلُ وَالمَدْرَسَةُ',
    icon: '🎒',
    color: 'text-amber-700',
    badgeBg: 'bg-yellow-100 text-yellow-800',
    borderColor: 'border-yellow-600',
    gradient: 'from-yellow-400 to-amber-500',
    vibrantBg: 'bg-yellow-400',
    vibrantBorder: 'border-yellow-600',
    vibrantHover: 'hover:bg-yellow-300',
    vibrantText: 'text-sky-900',
    description: 'Buku, pensil, papan tulis, meja, dan perlengkapan kelas ceria!'
  },
  {
    id: 'alam',
    name: 'Alam & Semesta',
    arabicName: 'الطَّبِيعَةُ وَالكَوْنُ',
    icon: '🌳',
    color: 'text-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    borderColor: 'border-emerald-600',
    gradient: 'from-emerald-400 to-teal-500',
    vibrantBg: 'bg-emerald-400',
    vibrantBorder: 'border-emerald-600',
    vibrantHover: 'hover:bg-emerald-300',
    vibrantText: 'text-sky-900',
    description: 'Matahari, pohon, bunga, hujan, dan keindahan alam ciptaan Allah!'
  },
  {
    id: 'makanan',
    name: 'Makanan & Minuman',
    arabicName: 'الطَّعَامُ وَالشَّرَابُ',
    icon: '🍕',
    color: 'text-orange-700',
    badgeBg: 'bg-orange-100 text-orange-800',
    borderColor: 'border-orange-600',
    gradient: 'from-orange-400 to-amber-500',
    vibrantBg: 'bg-orange-400',
    vibrantBorder: 'border-orange-600',
    vibrantHover: 'hover:bg-orange-300',
    vibrantText: 'text-sky-900',
    description: 'Apel, susu, roti, nasi, dan buah-buahan lezat bergizi!'
  },
  {
    id: 'keluarga',
    name: 'Keluarga Tercinta',
    arabicName: 'الأُسْرَةُ وَالعَائِلَةُ',
    icon: '👨‍👩‍👧',
    color: 'text-purple-700',
    badgeBg: 'bg-purple-100 text-purple-800',
    borderColor: 'border-purple-600',
    gradient: 'from-purple-400 to-indigo-500',
    vibrantBg: 'bg-purple-400',
    vibrantBorder: 'border-purple-600',
    vibrantHover: 'hover:bg-purple-300',
    vibrantText: 'text-sky-900',
    description: 'Ayah, ibu, kakek, nenek, kakak, dan adik tersayang di rumah!'
  }
];

export const DEFAULT_MUFRADAT: Record<MufradatCategory, MufradatItem[]> = {
  kelas: [
    {
      id: 'k1',
      arabic: 'قَلَمٌ',
      latin: 'Qalamun',
      indonesian: 'Pulpen / Pena',
      exampleArabic: 'هٰذَا قَلَمٌ جَدِيْدٌ وَجَمِيْلٌ!',
      exampleIndonesian: 'Ini adalah pulpen baru yang sangat bagus!',
      emoji: '🖊️',
      category: 'kelas',
      funFact: 'Pena membantumu menulis ilmu dan cerita seru setiap hari di sekolah!'
    },
    {
      id: 'k2',
      arabic: 'كِتَابٌ',
      latin: 'Kitaabun',
      indonesian: 'Buku',
      exampleArabic: 'أَنَا أَقْرَأُ الكِتَابَ فِي المَكْتَبَةِ مَعَ أَصْدِقَائِي!',
      exampleIndonesian: 'Aku membaca buku di perpustakaan bersama teman-temanku!',
      emoji: '📚',
      category: 'kelas',
      funFact: 'Membaca buku adalah jendela dunia yang membuat anak pintar.'
    },
    {
      id: 'k3',
      arabic: 'مَكْتَبٌ',
      latin: 'Maktabun',
      indonesian: 'Meja Belajar',
      exampleArabic: 'المَكْتَبُ نَظِيْفٌ وَمُرَتَّبٌ جِدًّا!',
      exampleIndonesian: 'Meja belajarnya sangat bersih dan rapi!',
      emoji: '🪑',
      category: 'kelas',
      funFact: 'Menjaga meja tetap rapi membuat belajar jadi makin semangat!'
    },
    {
      id: 'k4',
      arabic: 'سَبُّورَةٌ',
      latin: 'Sabbuuratun',
      indonesian: 'Papan Tulis',
      exampleArabic: 'المُعَلِّمُ يَكْتُبُ الدَّرْسَ عَلَى السَّبُّورَةِ!',
      exampleIndonesian: 'Pak Guru menulis pelajaran di atas papan tulis!',
      emoji: '📋',
      category: 'kelas',
      funFact: 'Papan tulis di kelas penuh dengan huruf dan angka warna-warni.'
    },
    {
      id: 'k5',
      arabic: 'حَقِيبَةٌ',
      latin: 'Haqiibatun',
      indonesian: 'Tas Sekolah',
      exampleArabic: 'حَقِيبَتِي حَمْرَاءُ وَفِيهَا أَدَوَاتِي الكَثِيرَةُ!',
      exampleIndonesian: 'Tas sekolahku berwarna merah dan berisi banyak peralatanku!',
      emoji: '🎒',
      category: 'kelas',
      funFact: 'Tas sekolah siap menemani petualangan belajarmu setiap pagi.'
    },
    {
      id: 'k6',
      arabic: 'مِسْطَرَةٌ',
      latin: 'Mistharatun',
      indonesian: 'Penggaris',
      exampleArabic: 'أَرْسُمُ خَطًّا مُسْتَقِيمًا بِالمِسْطَرَةِ!',
      exampleIndonesian: 'Aku menggambar garis lurus dengan penggaris!',
      emoji: '📏',
      category: 'kelas',
      funFact: 'Penggaris membuat garis gambarmu jadi lurus dan rapi.'
    }
  ],
  alam: [
    {
      id: 'a1',
      arabic: 'شَمْسٌ',
      latin: 'Syamsun',
      indonesian: 'Matahari',
      exampleArabic: 'الشَّمْسُ تُشْرِقُ سَاطِعَةً فِي الصَّبَاحِ البَاكِرِ!',
      exampleIndonesian: 'Matahari terbit bersinar terang di pagi hari yang cerah!',
      emoji: '☀️',
      category: 'alam',
      funFact: 'Matahari memberi cahaya dan kehangatan bagi seluruh makhluk di bumi.'
    },
    {
      id: 'a2',
      arabic: 'شَجَرَةٌ',
      latin: 'Syajaratun',
      indonesian: 'Pohon',
      exampleArabic: 'هٰذِهِ شَجَرَةٌ كَبِيرَةٌ ذَاتُ ثِمَارٍ لَذِيذَةٍ!',
      exampleIndonesian: 'Ini adalah pohon besar yang berbuah lezat!',
      emoji: '🌳',
      category: 'alam',
      funFact: 'Pohon menghasilkan udara segar yang kita hirup setiap saat.'
    },
    {
      id: 'a3',
      arabic: 'زَهْرَةٌ',
      latin: 'Zahratun',
      indonesian: 'Bunga',
      exampleArabic: 'الزَّهْرَةُ فَوْحُهَا عَطِرٌ فِي حَدِيقَتِنَا!',
      exampleIndonesian: 'Bunganya harum semerbak di kebun kita!',
      emoji: '🌸',
      category: 'alam',
      funFact: 'Bunga memiliki warna cerah yang disukai lebah dan kupu-kupu.'
    },
    {
      id: 'a4',
      arabic: 'مَطَرٌ',
      latin: 'Matharun',
      indonesian: 'Hujan',
      exampleArabic: 'المَطَرُ يَنْزِلُ خَيْرًا وَبَرَكَةً مِنَ السَّمَاءِ!',
      exampleIndonesian: 'Hujan turun membawa kebaikan dan berkah dari langit!',
      emoji: '🌧️',
      category: 'alam',
      funFact: 'Titik-titik air hujan menyegarkan tanaman dan tanah yang haus.'
    },
    {
      id: 'a5',
      arabic: 'قَمَرٌ',
      latin: 'Qamarun',
      indonesian: 'Bulan',
      exampleArabic: 'القَمَرُ يُضِيءُ السَّمَاءَ لَيْلًا بِجَمَالٍ!',
      exampleIndonesian: 'Bulan menerangi langit di malam hari dengan anggun!',
      emoji: '🌙',
      category: 'alam',
      funFact: 'Bulan purnama berbentuk bulat bercahaya keemasan di langit malam.'
    },
    {
      id: 'a6',
      arabic: 'نَهْرٌ',
      latin: 'Nahrun',
      indonesian: 'Sungai',
      exampleArabic: 'مَاءُ النَّهْرِ عَذْبٌ وَصَافٍ تَسْبَحُ فِيهِ الأَسْمَاكُ!',
      exampleIndonesian: 'Air sungainya tawar dan jernih, tempat ikan berenang gembira!',
      emoji: '🏞️',
      category: 'alam',
      funFact: 'Sungai mengalir dari pegunungan tinggi menuju ke lautan luas.'
    }
  ],
  makanan: [
    {
      id: 'm1',
      arabic: 'تُفَّاحٌ',
      latin: 'Tuffaahun',
      indonesian: 'Apel',
      exampleArabic: 'أَنَا أُحِبُّ أَكْلَ التُّفَّاحِ الحُلْوِ كُلَّ يَوْمٍ!',
      exampleIndonesian: 'Aku suka makan buah apel manis setiap hari!',
      emoji: '🍎',
      category: 'makanan',
      funFact: 'Makan satu buah apel setiap hari menjaga tubuh tetap bugar!'
    },
    {
      id: 'm2',
      arabic: 'حَلِيبٌ',
      latin: 'Haliibun',
      indonesian: 'Susu',
      exampleArabic: 'أَشْرَبُ الحَلِيبَ الدَّافِئَ كُلَّ صَبَاحٍ لِأَقْوَى!',
      exampleIndonesian: 'Aku minum susu hangat setiap pagi agar tumbuh kuat!',
      emoji: '🥛',
      category: 'makanan',
      funFact: 'Susu kaya akan kalsium yang baik untuk pertumbuhan tulang dan gigi.'
    },
    {
      id: 'm3',
      arabic: 'خُبْزٌ',
      latin: 'Khubzun',
      indonesian: 'Roti',
      exampleArabic: 'هٰذَا خُبْزٌ طَازَجٌ وَشَهِيٌّ لِلْفُطُورِ!',
      exampleIndonesian: 'Ini adalah roti segar dan lezat untuk sarapan!',
      emoji: '🍞',
      category: 'makanan',
      funFact: 'Roti dibuat dari gandum yang dipanggang dengan aroma lezat.'
    },
    {
      id: 'm4',
      arabic: 'رُزٌّ',
      latin: 'Ruzzun',
      indonesian: 'Nasi',
      exampleArabic: 'نَأْكُلُ الرُّزَّ اللَّذِيذَ مَعَ الأُسْرَةِ عَلَى الغَدَاءِ!',
      exampleIndonesian: 'Kita makan nasi lezat bersama keluarga saat makan siang!',
      emoji: '🍚',
      category: 'makanan',
      funFact: 'Nasi adalah makanan pokok yang memberi banyak tenaga untuk bermain.'
    },
    {
      id: 'm5',
      arabic: 'مَاءٌ',
      latin: 'Maa\'un',
      indonesian: 'Air',
      exampleArabic: 'المَاءُ النَّقِيُّ يُرْوِي العَطَشَ وَيُنْعِشُ الجِسْمَ!',
      exampleIndonesian: 'Air jernih menghilangkan dahaga dan menyegarkan tubuh!',
      emoji: '💧',
      category: 'makanan',
      funFact: 'Jangan lupa minum air putih yang cukup agar tubuh selalu bertenaga.'
    },
    {
      id: 'm6',
      arabic: 'مَوْزٌ',
      latin: 'Mauzun',
      indonesian: 'Pisang',
      exampleArabic: 'المَوْزُ الأَصْفَرُ حُلْوٌ وَغَنِيٌّ بِالفِيتَامِينَاتِ!',
      exampleIndonesian: 'Pisang kuning itu manis dan kaya vitamin!',
      emoji: '🍌',
      category: 'makanan',
      funFact: 'Pisang adalah buah manis alami yang disukai oleh banyak anak.'
    }
  ],
  keluarga: [
    {
      id: 'f1',
      arabic: 'أَبٌ',
      latin: 'Abun',
      indonesian: 'Ayah',
      exampleArabic: 'أَبِي رَجُلٌ طَيِّبٌ يُعَلِّمُنِي بِكُلِّ حُبٍّ!',
      exampleIndonesian: 'Ayahku adalah orang baik yang mengajariku dengan penuh kasih sayang!',
      emoji: '👨',
      category: 'keluarga',
      funFact: 'Ayah adalah pahlawan yang selalu menjaga dan membimbing kita.'
    },
    {
      id: 'f2',
      arabic: 'أُمٌّ',
      latin: 'Ummun',
      indonesian: 'Ibu',
      exampleArabic: 'أُمِّي الحَبِيبَةُ تَبْتَسِمُ لِي دَائِمًا بِحَنَانٍ!',
      exampleIndonesian: 'Ibuku tersayang selalu tersenyum kepadaku dengan penuh kelembutan!',
      emoji: '👩',
      category: 'keluarga',
      funFact: 'Surga berada di bawah telapak kaki ibu, sayangi selalu ibu kita ya!'
    },
    {
      id: 'f3',
      arabic: 'أَخٌ',
      latin: 'Akhun',
      indonesian: 'Saudara Laki-laki / Kakak / Adik Laki-laki',
      exampleArabic: 'أَلْعَبُ مَعَ أَخِي كُرَةَ القَدَمِ فِي الفِنَاءِ مَسْرُورًا!',
      exampleIndonesian: 'Aku bermain sepak bola bersama saudaraku di halaman dengan gembira!',
      emoji: '👦',
      category: 'keluarga',
      funFact: 'Bermain dan rukun bersama saudara membuat suasana rumah makin ceria.'
    },
    {
      id: 'f4',
      arabic: 'أُخْتٌ',
      latin: 'Ukhtun',
      indonesian: 'Saudara Perempuan / Kakak / Adik Perempuan',
      exampleArabic: 'أُخْتِي الصَّغِيرَةُ تَرْسُمُ أَشْكَالًا جَمِيلَةً!',
      exampleIndonesian: 'Saudari perempuanku menggambar bentuk-bentuk yang indah!',
      emoji: '👧',
      category: 'keluarga',
      funFact: 'Saling tolong menolong sesama saudara membawa kebahagiaan.'
    },
    {
      id: 'f5',
      arabic: 'جَدٌّ',
      latin: 'Jaddun',
      indonesian: 'Kakek',
      exampleArabic: 'جَدِّي يَرْوِي لَنَا حِكَايَاتٍ مُمْتِعَةً قَبْلَ النَّوْمِ!',
      exampleIndonesian: 'Kakek menceritakan kepada kita kisah-kisah seru sebelum tidur!',
      emoji: '👴',
      category: 'keluarga',
      funFact: 'Kakek memiliki banyak cerita bijak dan pengalaman seru.'
    },
    {
      id: 'f6',
      arabic: 'جَدَّةٌ',
      latin: 'Jaddatun',
      indonesian: 'Nenek',
      exampleArabic: 'جَدَّتِي تَصْنَعُ لَنَا الحَلْوَى اللَّذِيذَةَ دَائِمًا!',
      exampleIndonesian: 'Nenek selalu membuatkan kue manis yang lezat untuk kita!',
      emoji: '👵',
      category: 'keluarga',
      funFact: 'Pelukan nenek selalu hangat dan penuh kelembutan.'
    }
  ]
};

export const DEFAULT_QUIZZES: Record<MufradatCategory, QuizQuestion[]> = {
  kelas: [
    {
      id: 'qk1',
      question: 'Apa arti dari kosakata bahasa Arab "قَلَمٌ" (Qalamun)?',
      arabicPrompt: 'قَلَمٌ',
      latinPrompt: 'Qalamun',
      options: ['Buku', 'Pulpen / Pena', 'Meja', 'Papan Tulis'],
      correctIndex: 1,
      explanation: 'Hebat! "قَلَمٌ" (Qalamun) artinya adalah Pulpen atau Pena. Contoh kalimat: هٰذَا قَلَمٌ جَمِيْلٌ (Ini pulpen yang bagus)!',
      category: 'kelas',
      vocabularyItem: {
        arabic: 'قَلَمٌ',
        latin: 'Qalamun',
        indonesian: 'Pulpen / Pena',
        exampleArabic: 'هٰذَا قَلَمٌ جَمِيْلٌ!',
        exampleIndonesian: 'Ini pulpen yang bagus!'
      }
    },
    {
      id: 'qk2',
      question: 'Manakah bahasa Arab yang tepat untuk kata "Buku"?',
      arabicPrompt: 'Buku 📚',
      latinPrompt: 'Buku Bacaan',
      options: ['كِتَابٌ (Kitaabun)', 'مَكْتَبٌ (Maktabun)', 'سَبُّورَةٌ (Sabbuuratun)', 'حَقِيبَةٌ (Haqiibatun)'],
      correctIndex: 0,
      explanation: 'Benar sekali! "كِتَابٌ" (Kitaabun) berarti Buku. Membaca buku membuat kita semakin pintar!',
      category: 'kelas'
    },
    {
      id: 'qk3',
      question: 'Apa arti dari kata "سَبُّورَةٌ" (Sabbuuratun)?',
      arabicPrompt: 'سَبُّورَةٌ',
      latinPrompt: 'Sabbuuratun',
      options: ['Tas Sekolah', 'Penggaris', 'Papan Tulis', 'Pintu'],
      correctIndex: 2,
      explanation: 'Tepat sekali! "سَبُّورَةٌ" (Sabbuuratun) adalah Papan Tulis di ruang kelas.',
      category: 'kelas'
    },
    {
      id: 'qk4',
      question: 'Benda apa yang dimaksud dalam bahasa Arab "حَقِيبَةٌ" (Haqiibatun)?',
      arabicPrompt: 'حَقِيبَةٌ',
      latinPrompt: 'Haqiibatun',
      options: ['Tas Sekolah', 'Pensil', 'Meja', 'Bunga'],
      correctIndex: 0,
      explanation: 'Luar biasa! "حَقِيبَةٌ" (Haqiibatun) artinya Tas Sekolah yang kita bawa setiap pagi.',
      category: 'kelas'
    },
    {
      id: 'qk5',
      question: 'Lengkapi kalimat ceria ini: "أَرْسُمُ خَطًّا بِالـ ... (Aku menggambar garis dengan...)"',
      arabicPrompt: 'مِسْطَرَةٌ',
      latinPrompt: 'Mistharatun',
      options: ['كِتَابٌ (Buku)', 'مِسْطَرَةٌ (Penggaris)', 'قَمَرٌ (Bulan)', 'خُبْزٌ (Roti)'],
      correctIndex: 1,
      explanation: 'Juara! "مِسْطَرَةٌ" (Mistharatun) adalah Penggaris untuk menggambar garis yang lurus!',
      category: 'kelas'
    }
  ],
  alam: [
    {
      id: 'qa1',
      question: 'Apa arti kata bahasa Arab "شَمْسٌ" (Syamsun)?',
      arabicPrompt: 'شَمْسٌ',
      latinPrompt: 'Syamsun',
      options: ['Bulan', 'Matahari', 'Hujan', 'Pohon'],
      correctIndex: 1,
      explanation: 'Keren! "شَمْسٌ" (Syamsun) artinya Matahari yang bersinar hangat di pagi hari!',
      category: 'alam'
    },
    {
      id: 'qa2',
      question: 'Manakah bahasa Arab yang berarti "Pohon Rindang"?',
      arabicPrompt: 'Pohon 🌳',
      latinPrompt: 'Pohon Hijau',
      options: ['شَجَرَةٌ (Syajaratun)', 'نَهْرٌ (Nahrun)', 'زَهْرَةٌ (Zahratun)', 'قَلَمٌ (Qalamun)'],
      correctIndex: 0,
      explanation: 'Masya Allah! "شَجَرَةٌ" (Syajaratun) artinya adalah Pohon.',
      category: 'alam'
    },
    {
      id: 'qa3',
      question: 'Apa arti dari kosakata "مَطَرٌ" (Matharun)?',
      arabicPrompt: 'مَطَرٌ',
      latinPrompt: 'Matharun',
      options: ['Angin', 'Bintang', 'Hujan', 'Awan'],
      correctIndex: 2,
      explanation: 'Pintar! "مَطَرٌ" (Matharun) artinya Hujan yang menyegarkan bumi!',
      category: 'alam'
    },
    {
      id: 'qa4',
      question: 'Benda langit yang bersinar di malam hari dalam bahasa Arab adalah "قَمَرٌ" (Qamarun), artinya adalah...?',
      arabicPrompt: 'قَمَرٌ',
      latinPrompt: 'Qamarun',
      options: ['Matahari', 'Bulan', 'Pelangi', 'Batu'],
      correctIndex: 1,
      explanation: 'Tepat! "قَمَرٌ" (Qamarun) artinya Bulan.',
      category: 'alam'
    },
    {
      id: 'qa5',
      question: 'Apa arti dari kata "زَهْرَةٌ" (Zahratun) yang harum di taman?',
      arabicPrompt: 'زَهْرَةٌ',
      latinPrompt: 'Zahratun',
      options: ['Bunga', 'Sungai', 'Daun', 'Rumput'],
      correctIndex: 0,
      explanation: 'Hebat! "زَهْرَةٌ" (Zahratun) artinya Bunga yang indah dan harum semerbak.',
      category: 'alam'
    }
  ],
  makanan: [
    {
      id: 'qm1',
      question: 'Buah manis berwarna merah dalam bahasa Arab disebut "تُفَّاحٌ" (Tuffaahun), artinya...?',
      arabicPrompt: 'تُفَّاحٌ',
      latinPrompt: 'Tuffaahun',
      options: ['Pisang', 'Jeruk', 'Apel', 'Anggur'],
      correctIndex: 2,
      explanation: 'Mantap! "تُفَّاحٌ" (Tuffaahun) adalah buah Apel yang segar dan manis.',
      category: 'makanan'
    },
    {
      id: 'qm2',
      question: 'Minuman menyehatkan kaya kalsium "حَلِيبٌ" (Haliibun) artinya...?',
      arabicPrompt: 'حَلِيبٌ',
      latinPrompt: 'Haliibun',
      options: ['Air Putih', 'Susu', 'Teh Manis', 'Jus Buah'],
      correctIndex: 1,
      explanation: 'Luar biasa! "حَلِيبٌ" (Haliibun) adalah Susu.',
      category: 'makanan'
    },
    {
      id: 'qm3',
      question: 'Makanan pokok orang Indonesia "رُزٌّ" (Ruzzun) artinya adalah...?',
      arabicPrompt: 'رُزٌّ',
      latinPrompt: 'Ruzzun',
      options: ['Roti', 'Nasi', 'Mie', 'Kue'],
      correctIndex: 1,
      explanation: 'Pintar sekali! "رُزٌّ" (Ruzzun) artinya Nasi.',
      category: 'makanan'
    },
    {
      id: 'qm4',
      question: 'Apa arti kata "خُبْزٌ" (Khubzun)?',
      arabicPrompt: 'خُبْزٌ',
      latinPrompt: 'Khubzun',
      options: ['Roti', 'Sup', 'Daging', 'Keju'],
      correctIndex: 0,
      explanation: 'Hebat! "خُبْزٌ" (Khubzun) adalah Roti lezat untuk sarapan.',
      category: 'makanan'
    },
    {
      id: 'qm5',
      question: 'Bahasa Arab dari buah kuning manis "Pisang" adalah...?',
      arabicPrompt: 'Pisang 🍌',
      latinPrompt: 'Buah Pisang',
      options: ['مَوْزٌ (Mauzun)', 'تُفَّاحٌ (Tuffaahun)', 'مَاءٌ (Maa\'un)', 'رُزٌّ (Ruzzun)'],
      correctIndex: 0,
      explanation: 'Benar sekali! "مَوْزٌ" (Mauzun) adalah buah Pisang.',
      category: 'makanan'
    }
  ],
  keluarga: [
    {
      id: 'qf1',
      question: 'Siapakah yang dimaksud dengan kata "أَبٌ" (Abun)?',
      arabicPrompt: 'أَبٌ',
      latinPrompt: 'Abun',
      options: ['Kakek', 'Ibu', 'Ayah', 'Paman'],
      correctIndex: 2,
      explanation: 'Masya Allah! "أَبٌ" (Abun) artinya Ayah tercinta.',
      category: 'keluarga'
    },
    {
      id: 'qf2',
      question: 'Sosok penuh kasih sayang yang dipanggil "أُمٌّ" (Ummun) artinya adalah...?',
      arabicPrompt: 'أُمٌّ',
      latinPrompt: 'Ummun',
      options: ['Ibu', 'Nenek', 'Bibi', 'Kakak'],
      correctIndex: 0,
      explanation: 'Tepat sekali! "أُمٌّ" (Ummun) artinya Ibu tersayang.',
      category: 'keluarga'
    },
    {
      id: 'qf3',
      question: 'Apa arti dari kata "أَخٌ" (Akhun)?',
      arabicPrompt: 'أَخٌ',
      latinPrompt: 'Akhun',
      options: ['Saudari Perempuan', 'Saudara Laki-laki', 'Sepupu', 'Teman'],
      correctIndex: 1,
      explanation: 'Keren! "أَخٌ" (Akhun) adalah Saudara Laki-laki (Kakak/Adik laki-laki).',
      category: 'keluarga'
    },
    {
      id: 'qf4',
      question: 'Siapakah "جَدٌّ" (Jaddun) yang sering bercerita seru kepada kita?',
      arabicPrompt: 'جَدٌّ',
      latinPrompt: 'Jaddun',
      options: ['Ayah', 'Kakek', 'Nenek', 'Paman'],
      correctIndex: 1,
      explanation: 'Pintar! "جَدٌّ" (Jaddun) artinya Kakek.',
      category: 'keluarga'
    },
    {
      id: 'qf5',
      question: 'Bahasa Arab untuk "Nenek Tersayang" adalah...?',
      arabicPrompt: 'Nenek 👵',
      latinPrompt: 'Nenek',
      options: ['جَدَّةٌ (Jaddatun)', 'أُخْتٌ (Ukhtun)', 'أُمٌّ (Ummun)', 'مُعَلِّمَةٌ (Mu\'allimatun)'],
      correctIndex: 0,
      explanation: 'Juara! "جَدَّةٌ" (Jaddatun) adalah Nenek tercinta.',
      category: 'keluarga'
    }
  ]
};
