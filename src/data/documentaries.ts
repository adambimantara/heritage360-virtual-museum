import type { Documentary } from "../types";
import { IMAGES } from "./constants";

export const DOCUMENTARIES: Documentary[] = [
  {
    id: "doc-keris",
    title: "Mahakarya Tempa Besalen: Proses Pembuatan Keris Jawa",
    category: "Senjata Tradisional",
    description:
      "Menyusuri bara api, palu tempa, dan keheningan laku spiritual seorang empu keris dalam melipat ribuan lapis pamor logam meteorit.",
    duration: 754,
    thumb: IMAGES.forge,
    thumbNote: "Dokumenter Resmi UNESCO Intangible Cultural Heritage.",
    relatedArtifactId: "keris-yogyakarta",
    youtubeId: "xFCq8qMzy1s",
    cues: [
      {
        at: 0,
        id: "Api, palu, dan kesabaran seorang empu dalam besalen suci.",
        en: "Fire, hammer, and patience of a master bladesmith.",
      },
      {
        at: 6,
        id: "Logam dilipat berkali-kali untuk membentuk pamor bersinar.",
        en: "Metal is repeatedly folded to form luminous pamor layers.",
      },
      {
        at: 14,
        id: "Seorang empu bekerja dengan ketelitian dan doa yang hening.",
        en: "An empu works in prayer and utmost precision.",
      },
      {
        at: 22,
        id: "Setiap bilah wilah memiliki karakter dan pamor yang berbeda.",
        en: "Every blade carries distinct character and pamor.",
      },
    ],
  },
  {
    id: "doc-batik",
    title: "Titik Malam di Atas Mori: Warisan Adiluhung Batik Tulis",
    category: "Tekstil Tradisional",
    description:
      "Goresan canting, aroma wajan malam alami, dan celupan soga alam. Menyaksikan lahirnya motif klasik Yogyakarta selapis demi selapis.",
    duration: 612,
    thumb: IMAGES.canting,
    thumbNote: "Dokumenter Resmi UNESCO Indonesian Batik Masterpiece.",
    relatedArtifactId: "batik-kawung",
    youtubeId: "158n2YBrYT4",
    cues: [
      {
        at: 0,
        id: "Malam alami dipanaskan di wajan tembaga kecil.",
        en: "Natural wax is gently warmed in a small copper pan.",
      },
      {
        at: 7,
        id: "Canting mengalir lembut mengikuti garis pola ragam hias.",
        en: "The canting smoothly follows the intricate pattern lines.",
      },
      {
        at: 15,
        id: "Pewarnaan soga alam dilakukan berulang kali secara telaten.",
        en: "Natural soga dyeing is patiently conducted in stages.",
      },
    ],
  },
  {
    id: "doc-topeng",
    title: "Menghidupkan Kayu Pule: Seni Memahat Topeng Panji Bobung",
    category: "Topeng Tradisional",
    description:
      "Dari sebongkah kayu pule di perbukitan Gunungkidul menjadi keanggunan raut muka Raden Panji di tangan pemahat Desa Bobung.",
    duration: 538,
    thumb: IMAGES.carvingFace,
    thumbNote: "Dokumenter Kriya Kayu & Tari Wayang Topeng Panji Yogyakarta.",
    relatedArtifactId: "topeng-panji",
    youtubeId: "J3Ybp0HJ-y0",
    cues: [
      {
        at: 0,
        id: "Sebongkah kayu pule dipilih dengan hati-hati.",
        en: "A block of pule wood is chosen with meticulous care.",
      },
      {
        at: 8,
        id: "Raut wajah ksatria perlahan muncul dari goresan bilah tatah.",
        en: "The noble face slowly emerges from chisel strokes.",
      },
      {
        at: 16,
        id: "Warna putih dan sunggingan halus menghidupkan karakter topeng.",
        en: "White lacquer and fine brushwork animate the mask’s spirit.",
      },
    ],
  },
  {
    id: "doc-wayang",
    title: "Malam Kelir dan Bayang-Bayang: Wayang Kulit Yogyakarta",
    category: "Seni Pertunjukan",
    description:
      "Di balik kelir putih bersama Ki Dalang dan para wiyaga gamelan selama pementasan wayang kulit semalam suntuk.",
    duration: 921,
    thumb: IMAGES.wayangRow,
    thumbNote: "Dokumenter Resmi UNESCO Wayang Puppet Theatre of Humanity.",
    relatedArtifactId: "wayang-kulit",
    youtubeId: "DQ3gUQI10pI",
    cues: [
      {
        at: 0,
        id: "Blencong dinyalakan, kelir putih terbentang menanti lakon.",
        en: "The oil lamp is lit, the screen is stretched for the story.",
      },
      {
        at: 8,
        id: "Ki Dalang memulai suluk wejangan pewayangan Jawa.",
        en: "The master puppeteer opens the ancient Javanese prologue.",
      },
      {
        at: 16,
        id: "Iringan gending gamelan menguatkan setiap pergulatan adegan.",
        en: "Gamelan overtures magnify every conflict in the scene.",
      },
    ],
  },
  {
    id: "doc-perak",
    title: "Kilau Perak Kota Tua: Seni Kriya Salaka Kotagede",
    category: "Kriya Tradisional",
    description:
      "Menelusuri teknik jalinan kawat filigri dan tatah timbul perak bakar di lorong-lorong bersejarah peninggalan Mataram Kuno di Kotagede.",
    duration: 645,
    thumb: IMAGES.silverCraft,
    thumbNote: "Dokumenter Eksklusif Sentra Kriya Perak Kotagede Indonesia Kaya.",
    relatedArtifactId: "kerajinan-perak-kotagede",
    youtubeId: "ipizaYNhGMM",
    cues: [
      {
        at: 0,
        id: "Lorong bersejarah Kotagede menyimpan denyut perajin perak mulia.",
        en: "The historic alleys of Kotagede harbor master silversmiths.",
      },
      {
        at: 8,
        id: "Kawat perak tipis dijalin lembut membentuk filigri daun melati.",
        en: "Fine silver threads are intricately woven into jasmine motifs.",
      },
      {
        at: 16,
        id: "Sentuhan perak bakar menghasilkan karakter antik yang teduh.",
        en: "Oxidized dark finishing confers profound antique character.",
      },
    ],
  },
  {
    id: "doc-gamelan",
    title: "Laras Perunggu dan Jiwa Ksatria: Harmoni Sakral Gamelan",
    category: "Seni Pertunjukan",
    description:
      "Mengenal teknik tempa perunggu sepuluh-tiga, penalaan laras slendro pelog, dan keagungan bunyi Kanjeng Kyai Gunturmadu.",
    duration: 810,
    thumb: IMAGES.gamelan,
    thumbNote: "Dokumenter Resmi UNESCO Gamelan Intangible Cultural Heritage.",
    relatedArtifactId: "gamelan-jawa",
    youtubeId: "xVHhCIQO57w",
    cues: [
      {
        at: 0,
        id: "Perunggu dituang membara dan ditempa dalam irama kekompakan.",
        en: "Molten bronze is poured and forged in unified cadence.",
      },
      {
        at: 10,
        id: "Gong ageng berdentang melahirkan getaran rasa yang menenteramkan.",
        en: "The grand gong sounds, resonating peace into human souls.",
      },
    ],
  },
  {
    id: "doc-blangkon",
    title: "Mondolan dan Lipatan Makna: Pembuatan Blangkon Yogyakarta",
    category: "Kriya Tradisional",
    description:
      "Langkah demi langkah merangkai wiron dan mondolan blangkon khas gagrak Ngayogyakarta bersama maestro perajin blangkon.",
    duration: 480,
    thumb: IMAGES.surjanRed,
    thumbNote: "Dokumenter Edukasi Tata Cara Pembuatan Blangkon Tradisional.",
    relatedArtifactId: "blangkon-mondolan",
    youtubeId: "UrBdMTHtbNM",
    cues: [
      {
        at: 0,
        id: "Kain batik dilipat teliti membentuk wiron rapi di dahi.",
        en: "Batik fabric is meticulously folded into forehead pleats.",
      },
      {
        at: 10,
        id: "Mondolan bulat di belakang dibentuk sebagai wadah rahasia budi.",
        en: "The rear mondolan knot is formed to symbolize inner wisdom.",
      },
    ],
  },
  {
    id: "doc-lurik",
    title: "Benang Waktu Krapyak: Tenun Tradisional Lurik Yogyakarta",
    category: "Tekstil Tradisional",
    description:
      "Menyaksikan denting kayu alat tenun bukan mesin (ATBM) merajut ribuan helai benang katun menjadi kain lurik prasojo legendaris.",
    duration: 520,
    thumb: IMAGES.loom,
    thumbNote: "Dokumentasi Sentra Tenun Tradisional ATBM Krapyak Yogyakarta.",
    relatedArtifactId: "kain-lurik",
    youtubeId: "RA6EuqVSiVk",
    cues: [
      {
        at: 0,
        id: "Alat tenun digerakkan ritmis dengan ketelitian tangan sang penenun.",
        en: "The loom moves rhythmically with the weaver's manual precision.",
      },
      {
        at: 12,
        id: "Garis lurus lurik melambangkan keteguhan iman dan kesederhanaan.",
        en: "The straight lines of lurik symbolize steadfast faith and modesty.",
      },
    ],
  },
  {
    id: "doc-kasongan",
    title: "Sentuhan Tanah Liat Kasongan: Kriya Gerabah Bantul",
    category: "Kriya Tradisional",
    description:
      "Menelusuri sejarah desa wisata Kasongan di Bantul dan kepiawaian para perajin membentuk kendhi tembikar dari tanah liat Sungai Bedog.",
    duration: 590,
    thumb: IMAGES.clayPots,
    thumbNote: "Dokumentasi Sentra Industri Kreatif Gerabah Kasongan Bantul.",
    relatedArtifactId: "gerabah-kasongan",
    youtubeId: "QJZOZT8JfWA",
    cues: [
      {
        at: 0,
        id: "Tanah liat diputar dan dibentuk dengan kepekaan jemari tangan.",
        en: "Clay is centered on the wheel and sculpted with sensitive fingers.",
      },
      {
        at: 10,
        id: "Pembakaran jerami tradisional menghasilkan warna tembikar eksotis.",
        en: "Traditional straw firing produces an exotic earthen red hue.",
      },
    ],
  },
  {
    id: "doc-jemparingan",
    title: "Memanah Rasa Mataram: Seni Tradisi Panahan Jemparingan",
    category: "Warisan Budaya",
    description:
      "Mengenal tradisi panahan Mataraman yang dilakukan dalam posisi bersila dengan busur mendatar sebagai sarana olah batin dan konsentrasi.",
    duration: 630,
    thumb: IMAGES.archeryTraditional,
    thumbNote: "Dokumenter Tradisi Panahan Jemparingan Kasultanan Yogyakarta.",
    relatedArtifactId: "jemparingan-mataram",
    youtubeId: "-VJbQ64PvVI",
    cues: [
      {
        at: 0,
        id: "Pemanah duduk bersila dalam balutan busana surjan dan blangkon.",
        en: "Archers sit cross-legged dressed in traditional surjan and blangkon.",
      },
      {
        at: 10,
        id: "Busur ditarik setinggi dada, melatih ketenangan rasa dan kejernihan hati.",
        en: "The bow is drawn at chest height, cultivating inner peace and focus.",
      },
    ],
  },
  {
    id: "doc-golek",
    title: "Kisah Menak di Tangan Dalang: Wayang Golek Yogyakarta",
    category: "Seni Pertunjukan",
    description:
      "Pementasan boneka kayu wayang golek menak yang membawakan kisah kepahlawanan Amir Hamzah dengan busana sulam emas khas Keraton.",
    duration: 540,
    thumb: IMAGES.golekPuppet,
    thumbNote: "Dokumenter Pagelaran Wayang Golek Menak Gagrak Ngayogyakarta.",
    relatedArtifactId: "wayang-golek-menak",
    youtubeId: "Sgr_OhR1FRk",
    cues: [
      {
        at: 0,
        id: "Wayang kayu dipahat ekspresif dengan mahkota prada emas.",
        en: "Wooden puppets are sculpted expressively with gold-trimmed crowns.",
      },
      {
        at: 10,
        id: "Dalang menggerakkan persendian boneka dengan kelincahan tinggi.",
        en: "The puppeteer articulates the wooden joints with high agility.",
      },
    ],
  },
];
