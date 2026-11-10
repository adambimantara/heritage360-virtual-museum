import type { Hotspot, HotspotId } from "../types";

export const CATEGORIES = [
  "Senjata Tradisional",
  "Topeng Tradisional",
  "Tekstil Tradisional",
  "Kriya Tradisional",
  "Warisan Budaya",
  "Seni Pertunjukan",
] as const;

export const ORIGINS = [
  "Kraton Yogyakarta",
  "Kota Yogyakarta",
  "Gunungkidul",
  "Bantul",
  "Sleman",
  "Kotagede",
] as const;

export const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const REP = "Dokumentasi arsip kebudayaan Yogyakarta.";

export const IMAGES = {
  forge: img("1766940973188-598a6bd59ad6"),
  procession: img("1788158612447-e9790f060895"),
  carvingFace: img("1723230912199-bdc41fe65d7c"),
  canting: img("1604973104381-870c92f10343"),
  batikPainting: img("1590251869641-dd94fb569954"),
  batikCloth: img("1761517099171-de5772a56956"),
  batikDiagonal: img("1762111908858-201b9da429dc"),
  batikDiagonal2: img("1761517099249-9cf89da692ab"),
  wayangRow: img("1760355714419-ced046db2c99"),
  wayangCeremony: img("1756683074583-4686e86b88e0"),
  gamelan: img("1775114305712-4fdb43165a99"),
  gamelanFrame: img("1626445829571-3c5d2131bb99"),
  surjanDrum: img("1787117790934-f1c94201496f"),
  surjanRed: img("1788410616265-0f817c2ea78f"),
  woodPillar: img("1793560386589-271fe0bf6fb4"),
  loom: img("1707716312213-b1dee92f147a"),
  prambanan: img("1578469550956-0e16b69c6a3d"),
  gallery: img("1554907984-15263bfd63bd"),
  festival: img("1788158612879-1542858a9003"),
  // Additional authentic heritage imagery
  silverCraft: img("1616401784845-180882ba9ba8"),
  silverJewelry: img("1535632066927-ab7c9ab60908"),
  potteryWheel: img("1565193566173-7a0ee3dbe261"),
  clayPots: img("1578749556568-bc2c40e68b61"),
  archeryTraditional: img("1511285560929-80b456fea0bc"),
  goldCrown: img("1584308666744-24d5c474f2ae"),
  golekPuppet: img("1582533561751-ef6f6ab93a2e"),
};

export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: "luk",
    label: "Luk",
    title: "Luk (Lekukan Bilah)",
    text: "Lekukan keris selalu berjumlah gasal (ganjil). Bilah berlekuk melambangkan perjalanan hidup yang dinamis menuju keluhuran budi.",
  },
  {
    id: "pamor",
    label: "Pamor",
    title: "Pola Pamor Lipatan Logam",
    text: "Guratan perak terbentuk dari ribuan lipatan tempa besi, baja, dan meteorit nikel, dietsa dengan air jeruk nipis dan arsenik.",
  },
  {
    id: "ganja",
    label: "Ganja",
    title: "Ganja Keris",
    text: "Pangkal bilah yang terpasang menyatu dengan wilah, memiliki sisi runcing buntut cecak dan sisi bulat sirah cecak.",
  },
  {
    id: "ukiran",
    label: "Ukiran",
    title: "Ukiran (Hulu / Gagang)",
    text: "Gagang keris kayu langka bergaya Yogyakarta dengan proporsi condong ke depan yang anggun dan santun.",
  },
  {
    id: "warangka",
    label: "Warangka",
    title: "Warangka Ladrang",
    text: "Bagian atas sarung keris berbentuk perahu khas Yogyakarta untuk upacara resmi, dilengkapi pendok berukir.",
  },
] as const;

export const COLLECTION_HOTSPOTS: Record<string, Hotspot[]> = {
  "keris-yogyakarta": [...HOTSPOTS],
  "topeng-panji": [
    {
      id: "alis",
      label: "Alis",
      title: "Alis Nanggal Sepisan",
      text: "Garis alis melengkung halus menyerupai bulan sabit tanggal muda, melambangkan kelemahlembutan budi kesatria.",
    },
    {
      id: "mripat",
      label: "Mata",
      title: "Mripat Liyep",
      text: "Mata sayu menyipit menyiratkan ketenangan jiwa, kewibawaan batin, dan ketajaman rohani.",
    },
    {
      id: "grana",
      label: "Hidung",
      title: "Grana Mancung Runcing",
      text: "Hidung mancung ramping yang menyiratkan ketajaman pikiran dan keteguhan prinsip hidup.",
    },
    {
      id: "sunggingan",
      label: "Mahkota",
      title: "Sunggingan Jamang Prada",
      text: "Ornamen prada emas pada dahi (jamang) melambangkan keluhuran trah bangsawan Jawa.",
    },
  ],
  "batik-kawung": [
    {
      id: "kelopak",
      label: "Kelopak",
      title: "Empat Kelopak Teratai",
      text: "Empat bulatan lonjong melambangkan empat penjuru mata angin dan empat hawa nafsu yang harus dikendalikan.",
    },
    {
      id: "titik-pusat",
      label: "Pusat",
      title: "Titik Pusat Suci",
      text: "Titik tengah pertemuan kelopak melambangkan poros spiritual dan kesadaran diri menuju Sang Maha Pencipta.",
    },
    {
      id: "gawangan",
      label: "Penyangga",
      title: "Gawangan Kayu Jati",
      text: "Tiang kayu jati tempat membentangkan kain mori saat proses mencanting malam panas.",
    },
  ],
  "batik-parang": [
    {
      id: "parang-lereng",
      label: "Ombak",
      title: "Lekukan Ombak Parang",
      text: "Garis miring 45 derajat menyerupai deburan ombak di tebing Laut Selatan, simbol pantang menyerah.",
    },
    {
      id: "mlinjon",
      label: "Mlinjon",
      title: "Mlinjon Belah Ketupat",
      text: "Pola pemisah berbentuk belah ketupat yang menegaskan ketajaman visi dan keadilan seorang pemimpin.",
    },
    {
      id: "sogan",
      label: "Warna",
      title: "Warna Sogan Alami",
      text: "Pewarnaan cokelat khas Yogyakarta dari kulit pohon soga, memancarkan aura kerendahan hati.",
    },
  ],
  "wayang-kulit": [
    {
      id: "gelung",
      label: "Gelung",
      title: "Gelung Supit Urang",
      text: "Tatanan rambut melengkung ke belakang khas Raden Werkudara, mencerminkan kesatria yang teguh memegang sumpah.",
    },
    {
      id: "kuku",
      label: "Kuku",
      title: "Kuku Pancanaka",
      text: "Kuku tajam di jempol tangan kanan Werkudara, simbol lima indra dan pengendalian hawa nafsu.",
    },
    {
      id: "gapit",
      label: "Gapit",
      title: "Gapit Tanduk Kerbau",
      text: "Batang penyangga utama dari tanduk kerbau hitam yang dihaluskan sebagai poros penopang kokoh sang tokoh.",
    },
  ],
  "blangkon-yogyakarta": [
    {
      id: "mondolan",
      label: "Mondolan",
      title: "Mondolan Bulat Belakang",
      text: "Tonjolan bulat di belakang blangkon Yogyakarta melambangkan kearifan dalam menyimpan rahasia sesama (nutupi wadiri).",
    },
    {
      id: "wiron",
      label: "Wiron",
      title: "Wiron Lipatan Depan",
      text: "Lipatan kain di kanan dan kiri berjumlah 17 lipatan, menyimbolkan keteraturan dan keluhuran budi pekerti.",
    },
    {
      id: "kuncir",
      label: "Kemada",
      title: "Kemada Tali Samping",
      text: "Hiasan helai kain halus di samping kiri-kanan sebagai penyeimbang visual dan perlambang kewaspadaan pikiran.",
    },
  ],
  "blangkon-mondolan": [
    {
      id: "mondolan",
      label: "Mondolan",
      title: "Mondolan Bulat Belakang",
      text: "Tonjolan bulat di belakang blangkon Yogyakarta melambangkan kearifan dalam menyimpan rahasia sesama (nutupi wadiri).",
    },
    {
      id: "wiron",
      label: "Wiron",
      title: "Wiron Lipatan Depan",
      text: "Lipatan kain di kanan dan kiri berjumlah 17 lipatan, menyimbolkan keteraturan dan keluhuran budi pekerti.",
    },
    {
      id: "kuncir",
      label: "Kemada",
      title: "Kemada Tali Samping",
      text: "Hiasan helai kain halus di samping kiri-kanan sebagai penyeimbang visual dan perlambang kewaspadaan pikiran.",
    },
  ],
  "gebyog-ukiran-kayu": [
    {
      id: "tumpang-sari",
      label: "Mahkota",
      title: "Tumpang Sari Balok Atas",
      text: "Susunan balok kayu bertingkat di bagian atas, melambangkan tingkatan spiritualitas dan kemakmuran.",
    },
    {
      id: "lung-lungan",
      label: "Ukiran",
      title: "Relief Lung-lungan",
      text: "Relief ukir sulur tanaman yang saling bertaut, melambangkan kehidupan yang terus bertumbuh dan persaudaraan erat.",
    },
    {
      id: "lawang",
      label: "Pintu",
      title: "Pintu Krawangan",
      text: "Pintu kembar berukir tembus pandang yang memungkinkan aliran sirkulasi angin sejuk di rumah joglo.",
    },
  ],
  "gebyog-kayu-jati": [
    {
      id: "tumpang-sari",
      label: "Mahkota",
      title: "Tumpang Sari Balok Atas",
      text: "Susunan balok kayu bertingkat di bagian atas, melambangkan tingkatan spiritualitas dan kemakmuran.",
    },
    {
      id: "lung-lungan",
      label: "Ukiran",
      title: "Relief Lung-lungan",
      text: "Relief ukir sulur tanaman yang saling bertaut, melambangkan kehidupan yang terus bertumbuh dan persaudaraan erat.",
    },
    {
      id: "lawang",
      label: "Pintu",
      title: "Pintu Krawangan",
      text: "Pintu kembar berukir tembus pandang yang memungkinkan aliran sirkulasi angin sejuk di rumah joglo.",
    },
  ],
  "kain-lurik": [
    {
      id: "corak-telupat",
      label: "Corak",
      title: "Corak Garis Telupat",
      text: "Pola garis vertikal selang-seling tiga dan empat, mencerminkan keseimbangan hubungan manusia dengan alam.",
    },
    {
      id: "benang-pakan",
      label: "Benang",
      title: "Benang Pakan & Lungsi",
      text: "Silangan benang katun berkualitas tinggi yang ditenun rapat menggunakan ATBM tradisional di Krapyak.",
    },
    {
      id: "kelim",
      label: "Kelim",
      title: "Tepi Kelim Tenun Asli",
      text: "Pinggiran kain tenun alami tanpa jahitan mesin yang memperlihatkan keaslian proses tenun tangan manual.",
    },
  ],
  "perak-kotagede": [
    {
      id: "filigri",
      label: "Filigri",
      title: "Anyaman Kawat Filigri",
      text: "Teknik jalinan benang kawat perak halus 0,2 mm yang dipilin dan disolder tanpa merusak kerangka utama.",
    },
    {
      id: "cucuk",
      label: "Cucuk",
      title: "Cucuk Air Melengkung",
      text: "Saluran cerat tuang air berkontur kurva anggun dengan ornamen daun pakis khas seni kriya Mataram Islam.",
    },
    {
      id: "makutha",
      label: "Tutup",
      title: "Makutha Tutup Kuncup",
      text: "Hiasan puncak tutup teko berbentuk kuncup bunga melati yang melambangkan keharuman budi dan kesucian niat.",
    },
  ],
  "kerajinan-perak-kotagede": [
    {
      id: "filigri",
      label: "Filigri",
      title: "Anyaman Kawat Filigri",
      text: "Teknik jalinan benang kawat perak halus 0,2 mm yang dipilin dan disolder tanpa merusak kerangka utama.",
    },
    {
      id: "cucuk",
      label: "Cucuk",
      title: "Cucuk Air Melengkung",
      text: "Saluran cerat tuang air berkontur kurva anggun dengan ornamen daun pakis khas seni kriya Mataram Islam.",
    },
    {
      id: "makutha",
      label: "Tutup",
      title: "Makutha Tutup Kuncup",
      text: "Hiasan puncak tutup teko berbentuk kuncup bunga melati yang melambangkan keharuman budi dan kesucian niat.",
    },
  ],
  "gerabah-kasongan": [
    {
      id: "kendhi",
      label: "Badan",
      title: "Badan Kendi Bulat",
      text: "Wadah air tembikar bundar yang menjaga suhu air tetap sejuk alami saat dinikmati di cuaca terik Yogyakarta.",
    },
    {
      id: "cucuk-cerat",
      label: "Cerat",
      title: "Cerat Minum Tradisional",
      text: "Saluran khusus minum tanpa menyentuhkan bibir ke wadah, menjaga higienitas dan adab kesopanan Jawa.",
    },
    {
      id: "lempung",
      label: "Tanah Liat",
      title: "Tanah Liat Aluvial Bantul",
      text: "Campuran tanah liat Sungai Bedog yang memiliki elastisitas tinggi dan daya tahan bakar optimal.",
    },
  ],
  "gamelan-yogyakarta": [
    {
      id: "pencu",
      label: "Pencu",
      title: "Pencu Pencon Tengah",
      text: "Tonjolan bundar di pusat gong tempat bilah dipukul untuk menghasilkan frekuensi getaran nada bass yang sakral.",
    },
    {
      id: "naga",
      label: "Naga",
      title: "Gayor Naga Kembar",
      text: "Tiang penyangga kayu jati dengan ukiran kepala sepasang naga penjaga keselamatan kosmis Mataram.",
    },
    {
      id: "tabuh",
      label: "Tabuh",
      title: "Tabuh Berlapis Beludru",
      text: "Tongkat pemukul gong dengan ujung bulat empuk berbahan kain beludru untuk menghasilkan gema lembut.",
    },
  ],
  "gamelan-jawa": [
    {
      id: "pencu",
      label: "Pencu",
      title: "Pencu Pencon Tengah",
      text: "Tonjolan bundar di pusat gong tempat bilah dipukul untuk menghasilkan frekuensi getaran nada bass yang sakral.",
    },
    {
      id: "naga",
      label: "Naga",
      title: "Gayor Naga Kembar",
      text: "Tiang penyangga kayu jati dengan ukiran kepala sepasang naga penjaga keselamatan kosmis Mataram.",
    },
    {
      id: "tabuh",
      label: "Tabuh",
      title: "Tabuh Berlapis Beludru",
      text: "Tongkat pemukul gong dengan ujung bulat empuk berbahan kain beludru untuk menghasilkan gema lembut.",
    },
  ],
  "surjan-pranakan": [
    {
      id: "kerah",
      label: "Kerah",
      title: "Kerah Tegak Sikepan",
      text: "Kerah leher tegak pendek yang mewajibkan postur tubuh tegak, rendah hati, dan santun saat menghadap Sultan.",
    },
    {
      id: "kancing",
      label: "Kancing",
      title: "Enam Kancing Rukun Iman",
      text: "Enam kancing di leher melambangkan Rukun Iman, dan dua kancing di dada melambangkan dua kalimat syahadat.",
    },
    {
      id: "lurik-biru",
      label: "Warna",
      title: "Tenun Biru Hitam Telupat",
      text: "Warna resmi pakaian abdi dalem Kraton Yogyakarta yang memancarkan kewibawaan dan kesetiaan.",
    },
  ],
  "jemparingan-mataram": [
    {
      id: "gandewa",
      label: "Gandewa",
      title: "Gandewa Lengkung Kayu",
      text: "Bilah busur panah dari kayu sonokeling dengan kelenturan seimbang untuk tembakan mendatar bersila.",
    },
    {
      id: "kendit",
      label: "Kendit",
      title: "Tali Busur Serat Alami",
      text: "Tali busur dari serat alami pilihan yang memberikan hentakan stabil saat dilepaskan sejajar dada.",
    },
    {
      id: "jemparing",
      label: "Anak Panah",
      title: "Jemparing Bambu Petung",
      text: "Batang anak panah dari bambu tipis lurus dengan bulu sayap unggas liar untuk lintasan terbang stabil.",
    },
  ],
  "wayang-golek-menak": [
    {
      id: "jamang",
      label: "Mahkota",
      title: "Jamang Mahkota Kayu Pule",
      text: "Mahkota kayu pule berukir prada emas yang menghiasi kepala tokoh kesatria bangsawan Menak Jayengrana.",
    },
    {
      id: "tuding",
      label: "Tuding",
      title: "Tuding Bambu Kendali",
      text: "Tongkat kendali tangan yang memungkinkan sang dalang menggerakkan jari dan tangan wayang secara hidup.",
    },
    {
      id: "jarik",
      label: "Jarik",
      title: "Kain Jarik Batik Keraton",
      text: "Balutan kain batik motif Semen atau Parang yang menutupi bagian bawah badan wayang golek menak.",
    },
  ],
  "perhiasan-sumping-mataram": [
    {
      id: "lar-sumping",
      label: "Sumping",
      title: "Lar Sayap Sumping Emas",
      text: "Hiasan telinga berbentuk sayap garuda meliuk anggun, simbol pendengaran yang jernih dan kepekaan rasa.",
    },
    {
      id: "mirah",
      label: "Permata",
      title: "Batu Mirah Delima",
      text: "Batu permata merah delima di pusat pending, simbol keberanian, kemuliaan, dan kemakmuran kerajaan.",
    },
    {
      id: "pending",
      label: "Pending",
      title: "Pending Emas Bertatah",
      text: "Ikat pinggang logam emas berukir relief flora Yogyakarta untuk mengencangkan kain busana pengantin ageng.",
    },
  ],
  "perhiasan-sumping-pending": [
    {
      id: "lar-sumping",
      label: "Sumping",
      title: "Lar Sayap Sumping Emas",
      text: "Hiasan telinga berbentuk sayap garuda meliuk anggun, simbol pendengaran yang jernih dan kepekaan rasa.",
    },
    {
      id: "mirah",
      label: "Permata",
      title: "Batu Mirah Delima",
      text: "Batu permata merah delima di pusat pending, simbol keberanian, kemuliaan, dan kemakmuran kerajaan.",
    },
    {
      id: "pending",
      label: "Pending",
      title: "Pending Emas Bertatah",
      text: "Ikat pinggang logam emas berukir relief flora Yogyakarta untuk mengencangkan kain busana pengantin ageng.",
    },
  ],
};

export { type HotspotId };

export const AUDIO_NARRATION = {
  id: [
    "Sugeng rawuh ing Heritage360, Museum Virtual Kebudayaan Yogyakarta.",
    "Mari mengenal lebih dekat sejarah, filosofi luhur, dan mahakarya warisan budaya Jawa.",
    "Keris Yogyakarta adalah mahakarya tempa logam yang telah diakui UNESCO sebagai Warisan Budaya Takbenda Dunia.",
    "Perhatikan guratan pamor pada bilah wilah yang muncul dari lipatan ribuan lapis besi, baja, dan nikel meteorit.",
    "Lekukan pada bilah disebut luk, melambangkan perjalanan hidup yang dinamis namun tetap berpegang teguh pada keluhuran budi.",
    "Dalam busana adat Kraton Ngayogyakarta, keris diselipkan anggun di bagian belakang sebagai simbol perlindungan diri dan kehormatan.",
    "Terima kasih telah menjelajahi dan turut melestarikan kekayaan budaya Nusantara bersama Heritage360.",
  ],
  en: [
    "Welcome to Heritage360, Virtual Museum of Yogyakarta Cultural Heritage.",
    "Let us take a closer look at the history, noble philosophy, and masterpieces of Javanese heritage.",
    "The Yogyakarta Keris is a metal forging masterpiece inscribed by UNESCO as an Intangible Cultural Heritage of Humanity.",
    "Observe the intricate pamor patterns revealed through thousand-fold forgings of iron, steel, and nickel.",
    "The undulating curves along the blade are called luk, symbolizing a dynamic life journey anchored in moral virtues.",
    "In Kraton Yogyakarta formal court dress, the keris is worn tucked at the back as a symbol of protection and honor.",
    "Thank you for exploring and preserving the timeless cultural heritage with Heritage360.",
  ],
};

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};
