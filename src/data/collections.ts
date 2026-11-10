import type { Collection } from "../types";
import { IMAGES, REP } from "./constants";

export const COLLECTIONS: Collection[] = [
  {
    id: "keris-yogyakarta",
    no: "01",
    name: "Keris Yogyakarta",
    localName: "Dhuwung Gagrak Ngayogyakarta",
    category: "Senjata Tradisional",
    origin: "Kraton Yogyakarta",
    short:
      "Senjata pusaka berbilah asimetris sarat makna filosofis, lambang ksatria dan keluhuran budi dalam tradisi budaya Jawa.",
    history:
      "Keris merupakan senjata tikam tradisional khas Nusantara dengan akar sejarah panjang di tanah Jawa sejak abad ke-9 Masehi. Pada tahun 2005, UNESCO memproklamirkan keris Indonesia sebagai Karya Agung Warisan Kemanusiaan Lisan dan Takbenda (Masterpiece of the Oral and Intangible Heritage of Humanity). Di Kesultanan Yogyakarta, keris menempati posisi sentral sebagai kelengkapan busana adat ageng, pusaka kerajaan (pusaka dalem), serta simbol legitimasi dan kedewasaan seorang pria Jawa. Gaya Yogyakarta (gagrak Ngayogyakarta) mudah dikenali lewat warangka ladrang capran atau gayaman yang anggun, serta hulu ukiran tunggak semi dengan ornamen cecekan yang halus.",
    philosophy:
      "Keris dimaknai lebih dari sekadar senjata fisik. Setiap bagian bilah menyimpan doa dan ajaran budi pekerti. Bilah (wilah) melambangkan jati diri, pamor mencerminkan harapan sang empu bagi pemiliknya, dan luk (lekukan) yang selalu berjumlah ganjil menggambarkan tahapan kehidupan yang dinamis namun senantiasa berorientasi menuju Sang Maha Pencipta. Konsep Manunggaling Kawula Gusti tercermin dalam hubungan batin antara bilah dan sang empu yang menempanya dalam laku tirakat.",
    material:
      "Bilah ditempa dari paduan besi murni, baja karbon tinggi, dan logam nikel meteorit untuk memunculkan pamor. Hulu (ukiran) dibuat dari kayu langka seperti tayuman, cendana, atau kemuning, dipadukan selut mendak bertatahkan permata dan pendok kuningan bertatahkan relief tembaga.",
    technique:
      "Ditempa manual oleh empu keris melalui pemanasan bara arang kayu jati, pelipatan berulang hingga ribuan lapis (besi lipat), penyepuhan air atau minyak herbal, serta pewarangan (etsa menggunakan air jeruk nipis dan arsenik) guna mengoksidasi bilah sehingga kontras pamor putih perak terpancar jelas.",
    visual: {
      kind: "art",
      art: "keris",
      alt: "Model digital Keris Yogyakarta luk 7 gaya Ngayogyakarta",
    },
    gallery: [
      { kind: "art", art: "keris", alt: "Render digital bilah Keris Yogyakarta luk tujuh" },
      { kind: "art", art: "pamor", alt: "Pola pamor lipatan logam meteorit pada wilah" },
      {
        kind: "photo",
        src: IMAGES.forge,
        alt: "Empu menempa logam membara di perapian besalen",
        note: "Dokumentasi proses tempa tradisional besalen keris.",
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Prajurit abdi dalem Kraton Yogyakarta membawa pusaka",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Upacara budaya adat Kraton Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "keris-yogyakarta.glb",
    hasVideo: true,
    video: {
      title: "Mahakarya Tempa Besalen: Proses Pembuatan Keris Jawa",
      duration: 754,
      videoUrl: "/videos/keris-yogyakarta.mp4",
      youtubeId: "xFCq8qMzy1s",
      thumb: IMAGES.forge,
      thumbNote: "Cuplikan dokumenter proses penempaan keris tradisional di besalen.",
      cues: [
        {
          at: 0,
          id: "Api, palu, dan kesabaran seorang empu.",
          en: "Fire, hammer, and patience of a master bladesmith.",
        },
        {
          at: 6,
          id: "Logam dilipat berkali-kali membentuk pamor bercahaya.",
          en: "Metals are repeatedly folded to form luminous pamor layers.",
        },
        {
          at: 14,
          id: "Empu bekerja dalam doa dan ketelitian tinggi.",
          en: "The empu works in prayer and utmost precision.",
        },
        {
          at: 22,
          id: "Setiap bilah memiliki karakter dan pamor yang khas.",
          en: "Every blade carries distinct character and pamor.",
        },
      ],
    },
    audioNarration: [
      "Keris Yogyakarta adalah mahakarya tempa logam yang telah diakui UNESCO.",
      "Perhatikan guratan pamor pada bilah yang muncul dari lipatan ribuan lapis besi, baja, dan meteorit.",
      "Lekukan pada bilah disebut luk dan jumlahnya selalu ganjil, melambangkan perjalanan hidup yang dinamis.",
      "Di Yogyakarta, warangka ladrang berbentuk perahu dikenakan pada saat upacara ageng di Kraton.",
    ],
    addedAt: "2025-05-02",
  },
  {
    id: "topeng-panji",
    no: "02",
    name: "Topeng Panji",
    localName: "Topeng Panji Asmarabangun",
    category: "Topeng Tradisional",
    origin: "Gunungkidul",
    short:
      "Topeng tari kayu berkarakter alus yang melakonkan kisah kesatria Raden Panji Asmarabangun.",
    history:
      "Cerita Panji merupakan siklus sastra Jawa klasik abad pertengahan mengenai pengembaraan pangeran Panji dari Janggala dan Dewi Sekartaji dari Kadiri. Naskah Cerita Panji telah ditetapkan UNESCO dalam Memory of the World Register pada tahun 2017. Di Daerah Istimewa Yogyakarta, tari Wayang Topeng berkembang pesat di lingkungan Kraton hingga pedesaan, khususnya di sentra kriya kayu Bobung, Putat, Patuk, Kabupaten Gunungkidul. Topeng Panji mencerminkan tokoh utama dengan karakter alus (halus) yang penuh kewibawaan.",
    philosophy:
      "Karakter topeng Panji terbaca dari rona putih bersih yang melambangkan kesucian batin, mata liyep (sayu menyipit) yang menyiratkan kerendahan hati dan ketajaman rohani, serta sunggingan bibir tipis yang menunjukkan pengendalian hawa nafsu dan kesantunan bertutur kata.",
    material:
      "Kayu sengon laut, pule, atau waru pilihan yang ringan dan tahan retak. Dilapisi cat berbahan dasar pigmen alami, prada emas, dan pelapis akhir melamin bening.",
    technique:
      "Dipahat manual menggunakan seperangkat tatah ukir kayu, diamplas halus dengan daun amplas alami, dilapisi plamir dasaran, kemudian dilukis detail (sunggingan) secara cermat oleh perajin tradisional.",
    visual: {
      kind: "art",
      art: "topeng",
      alt: "Ilustrasi vektor presisi Topeng Panji Asmarabangun",
    },
    gallery: [
      { kind: "art", art: "topeng", alt: "Karakter muka Topeng Panji" },
      {
        kind: "photo",
        src: IMAGES.carvingFace,
        alt: "Detail ukiran kayu wajah topeng tradisional",
        note: "Proses pemahatan kontur hidung dan bibir topeng kayu.",
      },
      {
        kind: "photo",
        src: IMAGES.gamelan,
        alt: "Penabuh gamelan pengiring pertunjukan wayang topeng",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Pentas seni wayang topeng di Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "topeng-panji.glb",
    hasVideo: true,
    video: {
      title: "Menghidupkan Kayu Pule: Seni Memahat Topeng Panji Bobung",
      duration: 538,
      videoUrl: "/videos/topeng-panji.mp4",
      youtubeId: "J3Ybp0HJ-y0",
      thumb: IMAGES.carvingFace,
      thumbNote: "Dokumentasi perajin kayu di Desa Wisata Bobung Gunungkidul.",
      cues: [
        {
          at: 0,
          id: "Sebongkah kayu pule dipilih dengan saksama.",
          en: "A block of pule wood is meticulously chosen.",
        },
        {
          at: 8,
          id: "Raut wajah kesatria perlahan muncul dari bilah tatah.",
          en: "The refined noble countenance emerges from chisel strokes.",
        },
        {
          at: 16,
          id: "Warna putih dan sunggingan halus menghidupkan karakter Panji.",
          en: "White lacquer and fine gold brushwork breathe life into Panji.",
        },
      ],
    },
    audioNarration: [
      "Topeng Panji melambangkan kesatria sejati berkarakter luhur dalam kisah Panji klasik Jawa.",
      "Wajahnya berwarna putih bersih yang menandakan kesucian pikiran dan keheningan jiwa.",
      "Mata yang sayu ke bawah mencerminkan kerendahan hati dan ketenangan seorang pemimpin.",
      "Seni ukir topeng ini terus diwariskan dari generasi ke generasi di perbukitan Gunungkidul.",
    ],
    addedAt: "2025-04-18",
  },
  {
    id: "batik-kawung",
    no: "03",
    name: "Batik Kawung",
    localName: "Bathik Motif Kawung",
    category: "Tekstil Tradisional",
    origin: "Kraton Yogyakarta",
    short:
      "Motif batik geometris tertua bermakna sedulur papat lima pancer, simbol kesucian dan pengendalian diri.",
    history:
      "Batik Kawung merupakan salah satu motif larangan klasik tertua di Jawa yang telah dikenal sejak masa Kesultanan Mataram abad ke-13. Pada tahun 2009, Batik Indonesia secara resmi diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Takbenda. Di lingkungan Kraton Ngayogyakarta Hadiningrat, motif kawung dulunya merupakan busana eksklusif yang hanya boleh dikenakan oleh para bangsawan dan abdi dalem berderajat tinggi sebagai lambang keadilan dan hati yang bersih.",
    philosophy:
      "Bentuk empat lingkaran lonjong yang memusat pada satu titik poros diinterpretasikan sebagai buah kolang-kaling (aren) atau bunga teratai mekar. Pola ini melambangkan filosofi Sedulur Papat Lima Pancer—empat unsur alam atau empat arah mata angin dengan diri manusia yang tegak di tengah menjaga keseimbangan jagad cilik dan jagad gede.",
    material:
      "Kain mori primissima katun murni halus, lilin malam alami (campuran gondorukem dan damar), pewarna alami soga cokelat dari kulit pohon tingi, tegeran, dan jambal.",
    technique:
      "Batik tulis manual menggunakan canting tembaga berdiameter cucuk halus (canting isen), proses nglengreng, nembok, pewarnaan soga berulang (nyoga), dan peluruhan lilin dalam air mendidih (nglorod).",
    visual: {
      kind: "art",
      art: "kawung",
      alt: "Pola geometris simetris motif batik Kawung klasik",
    },
    gallery: [
      { kind: "art", art: "kawung", alt: "Studi geometris pola repetisi motif Kawung" },
      {
        kind: "photo",
        src: IMAGES.canting,
        alt: "Tangan pembatik menggoreskan canting malam panas di atas mori",
        note: "Dokumentasi ketelitian batik tulis Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.batikCloth,
        alt: "Bentangan kain batik soga klasik Yogyakarta",
        note: "Arsip tekstil batik tradisional bernuansa soga cokelat dan krem.",
      },
      {
        kind: "photo",
        src: IMAGES.batikPainting,
        alt: "Proses pewarnaan celup alami batik soga",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "batik-kawung.glb",
    hasVideo: true,
    video: {
      title: "Titik Malam di Atas Mori: Warisan Adiluhung Batik Tulis Kawung",
      duration: 612,
      videoUrl: "/videos/batik-kawung.mp4",
      youtubeId: "158n2YBrYT4",
      thumb: IMAGES.canting,
      thumbNote: "Dokumentasi maestro pembatik Giriloyo Imogiri Yogyakarta.",
      cues: [
        {
          at: 0,
          id: "Malam alami dipanaskan di wajan tembaga kecil.",
          en: "Natural wax is gently heated in a small copper pan.",
        },
        {
          at: 7,
          id: "Canting mengalir lembut membentuk simetri empat penjuru.",
          en: "The canting glides smoothly, forming fourfold symmetry.",
        },
        {
          at: 15,
          id: "Pencelupan soga alam memberi rona cokelat khas Mataraman.",
          en: "Natural soga dye imparts the distinctive Mataram brown hue.",
        },
      ],
    },
    audioNarration: [
      "Batik Kawung adalah salah satu motif batik tertua di tanah Jawa.",
      "Empat bidang lonjong yang memusat melambangkan empat arah mata angin dan keteguhan batin.",
      "Dalam filosofi Jawa, motif ini mengingatkan kita untuk selalu berlaku adil dan berhati bersih.",
      "Warna soga cokelat alami dihasilkan dari rebusan kulit kayu pepohonan hutan tropis.",
    ],
    addedAt: "2025-04-09",
  },
  {
    id: "batik-parang",
    no: "04",
    name: "Batik Parang",
    localName: "Bathik Motif Parang Rusak Barong",
    category: "Tekstil Tradisional",
    origin: "Kraton Yogyakarta",
    short:
      "Motif diagonal ombak samudra perlambang semangat ksatria, ketangguhan, dan kesinambungan tanpa henti.",
    history:
      "Motif Parang konon diciptakan oleh Panembahan Senopati, pendiri Dinasti Mataram Islam, saat bermeditasi di tepi Pantai Parangtritis. Ombak samudra selatan yang tidak pernah berhenti menghantam karang karang terjal menginspirasi garis-garis diagonal lengkung yang berirama dinamis. Parang Rusak Barong dengan ukuran bilah motif melebihi 10 cm termasuk motif awisan dalem (pakaian larangan Kraton) yang khusus diperuntukkan bagi Sultan Yogyakarta dan Putra Mahkota pada upacara penobatan resmi.",
    philosophy:
      "Garis miring diagonal (lereng) yang bersambung tanpa putus melambangkan kesinambungan cita-cita, kepemimpinan yang kokoh laksana karang, dan tekad pantang menyerah dalam memperbaiki diri lahir batin (ngendhaleni hawa nafsu). Bentuk belah ketupat mlinjon di sela-sela lereng melambangkan ketajaman akal budi.",
    material:
      "Mori primissima atau sutra alam berkualitas prima, lilin malam murni, bahan pewarna soga alam Jawa (tingi, soga jambal, tegeran) dan nila tom (indigofera).",
    technique:
      "Batik tulis halus dengan teknik tarikan garis lereng diagonal yang memerlukan presisi kemiringan 45 derajat secara konsisten di seluruh lembar kain panjang (jarik).",
    visual: {
      kind: "art",
      art: "parang",
      alt: "Pola diagonal ombak berulang motif Batik Parang Yogyakarta",
    },
    gallery: [
      { kind: "art", art: "parang", alt: "Studi pola diagonal lereng Parang" },
      {
        kind: "photo",
        src: IMAGES.batikDiagonal,
        alt: "Tekstur lereng diagonal batik warna soga klasik",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.batikPainting,
        alt: "Pembatik mengisi isen-isen motif parang",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Abdi dalem mengenakan nyamping motif parang di Kraton",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "batik-parang.glb",
    hasVideo: true,
    video: {
      title: "Garis Ombak Samudra Selatan: Filosofi Mendalam Batik Parang",
      duration: 580,
      videoUrl: "/videos/batik-parang.mp4",
      youtubeId: "158n2YBrYT4",
      thumb: IMAGES.batikDiagonal,
      thumbNote: "Dokumentasi filosofi dan tata cara pemakaian motif Parang di Kraton.",
      cues: [
        {
          at: 0,
          id: "Deburan ombak Pantai Selatan menginspirasi leluhur Mataram.",
          en: "The roaring southern waves inspired Mataram ancestors.",
        },
        {
          at: 8,
          id: "Garis diagonal miring melambangkan keteguhan perjuangan.",
          en: "Diagonal rhythmic lines symbolize unrelenting perseverance.",
        },
        {
          at: 16,
          id: "Hanya ketelitian tinggi yang mampu menjaga kesinambungan lereng.",
          en: "Only master precision can sustain continuous rhythmic slants.",
        },
      ],
    },
    audioNarration: [
      "Batik Parang menghadirkan garis diagonal meliuk menyerupai ombak samudra tanpa jeda.",
      "Motif ini melambangkan ketangguhan hati dan tekad ksatria yang tidak pernah padam.",
      "Pada zaman dahulu, varian Parang Rusak Barong adalah motif larangan yang khusus dipakai Sultan.",
      "Arah diagonal dari kiri atas ke kanan bawah menandakan kerendahan hati dan kemuliaan.",
    ],
    addedAt: "2025-03-28",
  },
  {
    id: "wayang-kulit",
    no: "05",
    name: "Wayang Kulit Yogyakarta",
    localName: "Ringgit Wacucal Gagrak Ngayogyakarta",
    category: "Seni Pertunjukan",
    origin: "Kota Yogyakarta",
    short:
      "Boneka kulit kerbau tatahan halus pengisi panggung kelir berhias blencong, sarana tutur wejangan luhur.",
    history:
      "Pertunjukan Wayang Kulit merupakan seni adiluhung yang memadukan sastra, seni rupa, seni musik gamelan, dan filsafat hidup Jawa. Ditetapkan oleh UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity pada tahun 2003. Wayang Kulit gagrak Ngayogyakarta memiliki ciri khas bentuk figur yang lebih ramping, jangkau lengan yang proporsional, pewarnaan sunggingan yang teduh, serta pakem pedalangan yang sangat menitikberatkan pada tata krama dan etika kesopanan istana.",
    philosophy:
      "Layar putih (kelir) melambangkan alam semesta tempat manusia berpijak, lampu minyak (blencong) melambangkan cahaya kehidupan dari Sang Pencipta, batang pisang (gedebog) melambangkan bumi pertiwi, dan dalang merepresentasikan kehendak illahi yang menggerakkan setiap lakon kehidupan manusia.",
    material:
      "Kulit kerbau betina yang dikeringkan dan ditipiskan secara alami, tangkai pegangan (tudhing dan cempurit) dari tanduk kerbau bule asli, serta cat sunggingan dengan lem hewani dan prada emas prada.",
    technique:
      "Dimulai dari pengerokan kulit (nyamak), penggambaran pola karakter, penatahan ragam hias perforasi rumit (natah), pemolesan warna lapis demi lapis (nyungging), hingga pemasangan tangkai tanduk kerbau (nyempurit).",
    visual: {
      kind: "photo",
      src: IMAGES.wayangRow,
      alt: "Jajaran wayang kulit tatahan halus tertancap di gedebog",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.wayangRow,
        alt: "Deretan tokoh wayang kulit di sisi kelir pertunjukan",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.wayangCeremony,
        alt: "Ki Dalang memegang wayang di depan kelir bercahaya",
        note: "Dokumentasi pentas wayang semalam suntuk di Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.gamelan,
        alt: "Wiyaga dan pesinden mengiringi pementasan wayang",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Ruang pagelaran wayang Kraton Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "wayang-kulit.glb",
    hasVideo: true,
    video: {
      title: "Malam Kelir dan Bayang-Bayang: Kisah di Balik Pementasan Wayang Kulit",
      duration: 921,
      videoUrl: "/videos/wayang-kulit.mp4",
      youtubeId: "DQ3gUQI10pI",
      thumb: IMAGES.wayangRow,
      thumbNote: "Dokumentasi pementasan wayang kulit semalam suntuk dan proses penatahannya.",
      cues: [
        {
          at: 0,
          id: "Blencong dinyalakan menyinari kelir putih membentang.",
          en: "The oil lamp is lit, illuminating the pristine white screen.",
        },
        {
          at: 8,
          id: "Sang Dalang menghidupkan karakter lewat suara dan gerak cempurit.",
          en: "The puppet master animates characters through voice and horn rods.",
        },
        {
          at: 16,
          id: "Iringan gending gamelan menguatkan nuansa dramatis cerita.",
          en: "Gamelan overtures intensify the profound drama of the narrative.",
        },
      ],
    },
    audioNarration: [
      "Wayang kulit adalah cermin kehidupan manusia dalam tradisi pewayangan Jawa.",
      "Setiap tokoh dipahat cermat dari kulit kerbau pilihan dan diwarnai dengan pigmen bertatah emas.",
      "Melalui sang dalang, kisah Bharatayuddha dan Ramayana mengajarkan kebajikan melawan angkara murka.",
      "Wayang Kulit gaya Yogyakarta terkenal dengan figur yang anggun dan kehalusan tatahannya.",
    ],
    addedAt: "2025-05-10",
  },
  {
    id: "blangkon-yogyakarta",
    no: "06",
    name: "Blangkon Mondolan",
    localName: "Blangkon Gaya Mondolan Ngayogyakarta",
    category: "Kriya Tradisional",
    origin: "Kota Yogyakarta",
    short:
      "Tutup kepala tradisional pria Jawa berhias tonjolan mondolan di belakang, lambang kesopanan dan kesabaran.",
    history:
      "Blangkon merupakan evolusi dari iket kepala lembaran kain segitiga yang disederhanakan menjadi penutup kepala siap pakai dengan cetakan kayu (klebut). Ciri paling khas dari Blangkon Yogyakarta adalah adanya bulatan padat di bagian belakang yang disebut mondolan. Bentuk ini berbeda tegas dengan blangkon gaya Surakarta yang berbagian belakang rata (trepes). Di Yogyakarta, sentra perajin blangkon legendaris berada di Beji dan Wijilan.",
    philosophy:
      "Mondolan berasal dari kebiasaan pria Jawa kuno yang berambut panjang dan menggulungnya rapi di belakang kepala. Makna filosofis mondolan adalah pandai menyimpan rahasia, menahan amarah, dan mengendalikan diri di depan publik. Tutup kepala ini mengajarkan bahwa orang Jawa pantang mengumbar aib orang lain maupun perasaan batinnya.",
    material:
      "Kain batik motif Yogyakarta (seperti motif modang, kumitir, atau semen), kain furing katun perekat, lem kanji beras, dan kertas pengeras khusus.",
    technique:
      "Kain batik dipotong sesuai pola, dilipat berulang membentuk lipit (wiron) sebanyak 17 atau 18 lipatan, dirajut di atas cetakan kayu klebut berukuran pas lingkar kepala, dijahit manual, lalu dibentuk mondolan bulat padat di bagian belakang.",
    visual: {
      kind: "photo",
      src: IMAGES.surjanDrum,
      alt: "Pria mengenakan blangkon mondolan dan busana surjan Jawa",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.surjanDrum,
        alt: "Pria Jawa dalam busana adat blangkon mondolan",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Abdi dalem mengenakan blangkon mondolan saat garebeg",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Perajin blangkon tradisional merapikan lipit kain",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "blangkon-yogyakarta.glb",
    hasVideo: true,
    video: {
      title: "Melipat Makna di Atas Klebut: Seni Pembuatan Blangkon Mondolan",
      duration: 480,
      videoUrl: "/videos/blangkon-yogyakarta.mp4",
      youtubeId: "UrBdMTHtbNM",
      thumb: IMAGES.surjanDrum,
      thumbNote: "Dokumentasi perajin blangkon tradisional di kawasan Wijilan Yogyakarta.",
      cues: [
        {
          at: 0,
          id: "Kain batik berlipit rapi diposisikan di atas cetakan klebut.",
          en: "Pleated batik cloth is carefully positioned on a klebut wooden mould.",
        },
        {
          at: 8,
          id: "Mondolan di bagian belakang diikat kuat dan dibentuk sempurna.",
          en: "The rear mondolan knot is firmly bound and sculpted.",
        },
      ],
    },
    audioNarration: [
      "Blangkon gaya Yogyakarta memiliki tonjolan bundar di bagian belakang bernama mondolan.",
      "Mondolan melambangkan watak kesatria yang pandai menahan emosi dan menyimpan rahasia.",
      "Lipatan-lipatan kecil di sisi kiri dan kanan membutuhkan keahlian tangan perajin yang sangat sabar.",
      "Memakai blangkon merupakan bagian dari tata krama berpakaian santun dalam adat istiadat Yogyakarta.",
    ],
    addedAt: "2025-02-20",
  },
  {
    id: "gebyog-ukiran-kayu",
    no: "07",
    name: "Gebyog & Ukiran Kayu",
    localName: "Gebyog lan Ukiran Kayu Jati Mataraman",
    category: "Kriya Tradisional",
    origin: "Bantul",
    short:
      "Partisi kayu jati berukir relief flora lung-lungan yang anggun, pemisah ruang sakral rumah tradisional Jawa.",
    history:
      "Gebyog merupakan dinding penyekat kayu berukir yang ditempatkan di antara ruang pendopo (publik) dan ruang dalem (privat) pada rumah joglo Jawa. Tradisi kriya kayu Mataraman telah berkembang ratusan tahun dengan sentra utama di Kabupaten Bantul, seperti di Desa Pucung Imogiri dan Krebet. Selain dinding gebyog, keahlian ukir ini diterapkan pada rancakan gamelan, tiang soko guru, dan pintu regol istana.",
    philosophy:
      "Ragam hias ukiran gebyog didominasi oleh sulur-sulur tumbuhan (lung-lungan), dedaunan, dan bunga teratai mekar. Motif ini melambangkan kesuburan, kelanjutan generasi, serta keharmonisan manusia dengan alam semesta. Pintu gebyog yang berada di poros tengah mengingatkan manusia untuk selalu kembali kepada keselarasan nurani.",
    material:
      "Kayu jati tua (Tectona grandis) pilihan yang telah mengalami proses pengeringan alami bertahun-tahun, diselesaikan dengan pelitur alami sirlak atau sentuhan prada emas.",
    technique:
      "Kayu dipotong balok tebal, digambar motif ornamen, lalu dipahat tembus (krawangan) maupun ukiran timbul (relief 3 dimensi) menggunakan puluhan jenis tatah penguku dan penyilat.",
    visual: {
      kind: "photo",
      src: IMAGES.gamelanFrame,
      alt: "Detail ukiran kayu relief flora warna kayu jati",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.gamelanFrame,
        alt: "Bingkai ukir kayu gamelan dan gebyog klasik",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.woodPillar,
        alt: "Pilar kayu berukir flora sulur khas Jawa",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.prambanan,
        alt: "Nuansa arsitektur klasik warisan Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "gebyog-ukiran-kayu.glb",
    hasVideo: true,
    video: {
      title: "Mahakarya Ukir Jati Mataraman: Seni Gebyog Rumah Tradisional",
      duration: 570,
      videoUrl: "/videos/gebyog-ukiran-kayu.mp4",
      youtubeId: "xVHhCIQO57w",
      thumb: IMAGES.woodPillar,
      thumbNote: "Dokumenter Kriya Kayu Jati Ukiran Relief Tradisional.",
      cues: [
        {
          at: 0,
          id: "Kayu jati perhutani dipahat bertahap membentuk relief lung-lungan.",
          en: "Teakwood is carved gradually into floral lung-lungan reliefs.",
        },
        {
          at: 10,
          id: "Gebyog berdiri kokoh menyatukan nilai estetika dan spiritualitas joglo.",
          en: "The gebyog stands firm, uniting aesthetics and spirituality.",
        },
      ],
    },
    audioNarration: [
      "Gebyog adalah dinding pembatas kayu jati yang sarat ukiran relief sulur-suluran tumbuhan.",
      "Dalam rumah tradisional Joglo, gebyog menjadi penanda batas ruang publik dan ruang sakral keluarga.",
      "Ukiran tembus krawangan memungkinkan angin tetap berhembus sejuk menyejukkan ruangan.",
      "Setiap lengkungan pahatan kayu dikerjakan manual dengan keahlian tangan pemahat Bantul.",
    ],
    addedAt: "2025-01-15",
  },
  {
    id: "kain-lurik",
    no: "08",
    name: "Kain Lurik Tenun",
    localName: "Lurik Tenun Tradisional ATBM",
    category: "Tekstil Tradisional",
    origin: "Bantul",
    short:
      "Kain tenun garis-garis sederhana nan sarat filosofi kesahajaan dan doa keselamatan hidup.",
    history:
      'Lurik merupakan kain tenun tradisional Jawa yang telah disebut dalam relief prasasti kuno abad ke-9. Nama lurik berasal dari bahasa Jawa "lorek" yang berarti lajur atau garis. Di Yogyakarta, sentra tenun lurik non-mesin (ATBM) berkembang lestari di kawasan Bantul, seperti di Krapyak dan Pandak. Lurik menjadi bahan utama busana surjan para abdi dalem Kraton dan pakaian rakyat sehari-hari.',
    philosophy:
      "Meskipun bermotif garis lurus sederhana, setiap susunan warna memiliki makna sakral. Motif Kluwung melambangkan pelindung dari marabahaya, motif Telupat melambangkan ketaatan pada nilai agama dan leluhur, serta motif Sapit Urang melambangkan siasat strategi perang yang jitu.",
    material:
      "Benang katun pintal alami, diwarnai menggunakan pewarna ramah lingkungan dan pigmen tumbuhan tradisional.",
    technique:
      "Ditenun secara teliti menggunakan Alat Tenun Bukan Mesin (ATBM) kayu yang digerakkan manual oleh tangan dan kaki penenun, menyatukan benang lungsi (panjang) dan pakan (lebar).",
    visual: {
      kind: "art",
      art: "lurik",
      alt: "Studi pola garis-garis sejajar kain tenun lurik klasik",
    },
    gallery: [
      { kind: "art", art: "lurik", alt: "Pola geometris kain tenun lurik Yogyakarta" },
      {
        kind: "photo",
        src: IMAGES.loom,
        alt: "Ibu penenun menenun kain lurik di alat tenun kayu tradisional",
        note: "Dokumentasi penenun lurik ATBM di Kabupaten Bantul.",
      },
      {
        kind: "photo",
        src: IMAGES.surjanRed,
        alt: "Pria mengenakan surjan lurik tenun bergaris",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Abdi dalem mengenakan seragam lurik dalam kirab",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "kain-lurik.glb",
    hasVideo: true,
    video: {
      title: "Benang Waktu Krapyak: Tenun Tradisional Lurik Yogyakarta",
      duration: 520,
      videoUrl: "/videos/kain-lurik.mp4",
      youtubeId: "RA6EuqVSiVk",
      thumb: IMAGES.loom,
      thumbNote: "Dokumentasi Sentra Tenun Tradisional ATBM Krapyak Yogyakarta.",
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
    audioNarration: [
      "Kain lurik memiliki motif garis-garis sederhana namun sarat makna kesahajaan dan ketulusan hati.",
      "Nama lurik berasal dari kata Jawa lorek yang berarti lajur atau garis pembimbing langkah.",
      "Ditenun menggunakan alat tenun kayu manual bukan mesin dengan irama ketukan yang ritmis.",
      "Kain ini adalah wujud nyata keelokan budaya rakyat yang hidup berdampingan dengan tata istana.",
    ],
    addedAt: "2025-05-14",
  },
  {
    id: "perak-kotagede",
    /* youtubeId added */
    no: "09",
    name: "Kerajinan Perak Kotagede",
    localName: "Kriya Salaka Kotagede",
    category: "Kriya Tradisional",
    origin: "Kotagede",
    short:
      "Kriya perak filigri dan tatah ukir timbul berhias ornamen flora Mataram dari kota tua Kotagede.",
    history:
      "Kotagede merupakan bekas ibu kota Kesultanan Mataram Islam abad ke-16. Sejak masa Panembahan Senopati, para perajin perak dan emas istana telah bermukim di kawasan ini. Pada dekade 1930-an, kriya perak Kotagede mengalami era keemasan berkat dorongan Mary van Delden dan Kraton Yogyakarta dengan memperkenalkan gaya ukir perak bakar hitam (oxidised silver) yang terkenal ke mancanegara.",
    philosophy:
      "Perak Kotagede mengutamakan motif flora khas Yogyakarta, seperti daun teratai, pohon kalpataru, dan melati. Warna perak yang memancarkan kilau teduh melambangkan kejernihan pikiran, kemurnian budi pekerti, serta ketelitian yang tak terburu-buru dalam melahirkan sebuah mahakarya.",
    material:
      "Perak kadar 925 (Sterling Silver), tembaga sebagai penguat struktur, kawat perak halus untuk teknik filigri, dan bubuk belerang untuk proses oksidasi perak bakar.",
    technique:
      "Memadukan teknik tempa manual, penatahan timbul dari belakang (repousse/chasing), serta teknik jalinan kawat perak lembut sehalus rambut (filigree) yang disolder dengan ketelitian milimeter.",
    visual: {
      kind: "photo",
      src: IMAGES.silverCraft,
      alt: "Perajin perak Kotagede mengukir wadah perak berhias flora",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.silverCraft,
        alt: "Perajin perak menatah mangkuk perak bakar",
        note: "Dokumentasi bengkel perak tradisional Kotagede Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.silverJewelry,
        alt: "Perhiasan perak filigri motif sulur daun melati",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.goldCrown,
        alt: "Aksen kriya logam mulia bernuansa istana Mataram",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.gallery,
        alt: "Pameran kriya perak dan logam Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "perak-kotagede.glb",
    hasVideo: true,
    video: {
      title: "Kilau Perak Kota Tua: Mahakarya Seni Kriya Salaka Kotagede",
      duration: 645,
      videoUrl: "/videos/perak-kotagede.mp4",
      youtubeId: "ipizaYNhGMM",
      thumb: IMAGES.silverCraft,
      thumbNote: "Dokumentasi penempaan dan teknik filigri perak di Kotagede Yogyakarta.",
      cues: [
        {
          at: 0,
          id: "Lorong kota tua Kotagede menyimpan denyut perajin perak turun-temurun.",
          en: "The heritage lanes of Kotagede harbor generations of master silversmiths.",
        },
        {
          at: 8,
          id: "Kawat perak tipis dijalin lembut membentuk filigri ornamen melati.",
          en: "Fine silver threads are woven intricately into floral filigree motifs.",
        },
        {
          at: 16,
          id: "Teknik bakar hitam menghasilkan kontras bayang-bayang yang anggun.",
          en: "Oxidized black finishing yields profound and elegant shadow contrasts.",
        },
      ],
    },
    audioNarration: [
      "Kotagede adalah sentra perajin perak termahsyur di Yogyakarta sejak zaman Kesultanan Mataram.",
      "Teknik filigri menjalin kawat perak halus menjadi bentuk bunga melati dan daun sulur.",
      "Warna perak bakar yang khas memberikan nuansa antik dan keteduhan estetika klasik.",
      "Setiap helai perhiasan lahir dari kesabaran tangan perajin yang menjaga warisan leluhur.",
    ],
    addedAt: "2025-05-18",
  },
  {
    id: "gerabah-kasongan",
    no: "10",
    name: "Gerabah Kasongan",
    localName: "Kriya Gerabah Lempung Kasongan",
    category: "Kriya Tradisional",
    origin: "Bantul",
    short:
      "Kriya tanah liat bernilai seni tinggi warisan desa perajin Kasongan, memadukan tradisi gerabah dan inovasi modern.",
    history:
      "Tradisi kriya gerabah di Desa Kasongan, Bantul, berakar dari cerita sejarah masa kolonial pada abad ke-19. Awalnya warga membuat perabot rumah tangga sederhana dari tanah liat seperti gentong air, kendhi, dan kuali. Pada era 1970-an, seniman legendaris Saptohoedojo memperkenalkan sentuhan artistik kontemporer dan finishing ornamen etnik yang mengangkat gerabah Kasongan menjadi komoditas seni bernilai ekspor.",
    philosophy:
      "Tanah liat (lempung) melambangkan asal mula penciptaan manusia dari bumi pertiwi. Membentuk tanah liat di atas roda putar mengajarkan kehati-hatian, pengendalian emosi, dan penerimaan atas keterbatasan diri agar tidak mudah retak ketika menghadapi ujian api kehidupan.",
    material:
      "Lempung tanah liat sawah lokal Bantul yang kaya mineral, pasir halus penyangga struktur, air sungai jernih, dan glasir pewarna alami.",
    technique:
      "Tanah liat diuleni lembut, dibentuk di atas meja putar pelarik (throwing), diangin-anginkan secara bertahap hingga kering sempurna, lalu dibakar dalam tungku sekam padi atau kayu pada suhu 800–1000 derajat Celsius.",
    visual: {
      kind: "photo",
      src: IMAGES.potteryWheel,
      alt: "Tangan perajin membentuk gerabah tanah liat di meja putar Kasongan",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.potteryWheel,
        alt: "Proses pembentukan kendhi di meja putar gerabah",
        note: "Dokumentasi perajin Kasongan Bantul Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.clayPots,
        alt: "Jajaran guci dan gerabah tanah liat di sanggar seni",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.carvingFace,
        alt: "Detail tekstur hiasan ukir gerabah etnik",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Kawasan desa wisata kerajinan gerabah Kasongan",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "gerabah-kasongan.glb",
    hasVideo: true,
    video: {
      title: "Sentuhan Tanah Liat Kasongan: Kriya Gerabah Bantul",
      duration: 590,
      videoUrl: "/videos/gerabah-kasongan.mp4",
      youtubeId: "QJZOZT8JfWA",
      thumb: IMAGES.clayPots,
      thumbNote: "Dokumentasi Sentra Industri Kreatif Gerabah Kasongan Bantul.",
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
    audioNarration: [
      "Kasongan di Kabupaten Bantul adalah sentra kerajinan gerabah tanah liat yang mendunia.",
      "Dari tanah liat sederhana, tangan terampil para perajin melahirkan guci dan patung bernilai seni.",
      "Putaran meja pelarik melambangkan ritme kehidupan yang senantiasa berputar dalam keseimbangan.",
      "Setelah dibakar dalam tungku panas, tanah liat berubah menjadi karya yang kukuh dan indah.",
    ],
    addedAt: "2025-05-20",
  },
  {
    id: "gamelan-yogyakarta",
    no: "11",
    name: "Gamelan Jawa Yogyakarta",
    localName: "Gangsa Kraton Ngayogyakarta Hadiningrat",
    category: "Seni Pertunjukan",
    origin: "Kraton Yogyakarta",
    short:
      "Ansambel musik perunggu sakral pencipta harmoni musikal rasa tenteram dan keluhuran jiwa.",
    history:
      "Gamelan Indonesia resmi diakui UNESCO sebagai Warisan Budaya Takbenda Dunia pada tahun 2021. Di Kraton Ngayogyakarta Hadiningrat, ansambel gamelan (disebut gangsa) dibagi menjadi gamelan pusaka (seperti Kanjeng Kyai Gunturlaut dan Kyai Mahesa Lawung) serta gamelan upacara (seperti gamelan sekati Kyai Gunturmadu dan Kyai Nagawilaga yang dibunyikan saat perayaan Sekaten). Setiap ricikan memiliki laras slendro dan pelog yang distem secara presisi.",
    philosophy:
      "Gamelan dimainkan tanpa partitur solois individu, melainkan mengedepankan keselarasan bersama (kebersamaan dan tepa selira). Filosofi gamelan mencerminkan masyarakat Jawa yang mengutamakan musyawarah mufakat, saling mendengarkan, serta mengesampingkan ego pribadi demi terciptanya gending harmoni kehidupan yang damai.",
    material:
      "Perunggu kualitas terbaik dari paduan sepuluh bagian tembaga (tembaga murni) dan tiga bagian timah putih (gangsa perunggu sepuluh-tiga), rangka kayu jati berukir relief prada emas, serta tali kulit sapi pelindung.",
    technique:
      "Pengecoran logam perunggu cair membara, penempaan berulang kali menggunakan palu berat oleh para pandhe perunggu, serta penalaan nada (nylaras) menggunakan pendengaran batin yang sangat tajam.",
    visual: {
      kind: "photo",
      src: IMAGES.gamelan,
      alt: "Penabuh gamelan perunggu di Bangsal Pagelaran Kraton Yogyakarta",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.gamelan,
        alt: "Ansambel gamelan perunggu dan para wiyaga",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.gamelanFrame,
        alt: "Detail ukir kayu jati prada emas penyangga gong ageng",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Peringatan Sekaten di pelataran Masjid Gedhe Kauman Yogyakarta",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Prosesi iring-iringan gamelan pusaka Kraton",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "gamelan-yogyakarta.glb",
    hasVideo: true,
    video: {
      title: "Laras Perunggu dan Jiwa Ksatria: Harmoni Sakral Gamelan Sekaten",
      duration: 810,
      videoUrl: "/videos/gamelan-yogyakarta.mp4",
      youtubeId: "xVHhCIQO57w",
      thumb: IMAGES.gamelan,
      thumbNote: "Dokumentasi penabuhan Gamelan Sekati di Pagongan Masjid Gedhe Kauman.",
      cues: [
        {
          at: 0,
          id: "Dua perangkat gamelan sekati ditabuh bergantian menyambut maulid.",
          en: "Two royal Sekati gamelan ensembles play alternately welcoming Maulid.",
        },
        {
          at: 10,
          id: "Gong ageng berdentang menggetarkan dada para pendengar di pelataran.",
          en: "The great gong resonates, vibrating the hearts of listeners.",
        },
      ],
    },
    audioNarration: [
      "Gamelan Jawa diakui UNESCO sebagai warisan budaya takbenda dunia yang agung.",
      "Terdiri dari puluhan instrumen perunggu yang ditabuh serasi dalam laras slendro dan pelog.",
      "Gamelan mengajarkan kita untuk saling mendengarkan dan meleburkan ego demi keharmonisan bersama.",
      "Di Kraton Yogyakarta, gending gamelan mengiringi tarian sakral Bedhaya dan upacara adat istana.",
    ],
    addedAt: "2025-05-22",
  },
  {
    id: "surjan-pranakan",
    no: "12",
    name: "Busana Surjan & Pranakan",
    localName: "Ageman Surjan lan Pranakan Abdi Dalem",
    category: "Tekstil Tradisional",
    origin: "Kraton Yogyakarta",
    short:
      "Busana resmi pria Jawa bertabur kancing enam perkara, lambang rukun iman dan ketakwaan kepada Tuhan.",
    history:
      "Busana Surjan diciptakan oleh Sunan Kalijaga pada masa Kesultanan Demak dan dilestarikan oleh Kesultanan Ngayogyakarta Hadiningrat. Terdapat dua jenis utama: Surjan Ontrokusuma bermotif bunga sutra yang khusus dikenakan para pangeran dan bangsawan, serta Busana Pranakan lurik biru tua bergaris yang menjadi pakaian dinas resmi harian seluruh abdi dalem Kraton Yogyakarta saat sowan menghadap Sultan.",
    philosophy:
      "Kerah tegak surjan memiliki 6 kancing di bagian leher yang melambangkan Rukun Iman dalam ajaran Islam. Dua kancing di bagian dada kiri dan kanan melambangkan dua kalimat syahadat. Tiga kancing tersembunyi di bagian perut melambangkan tiga nafsu hewani yang harus senantiasa dikendalikan dan ditutup rapat.",
    material:
      "Kain sutra brokat bermotif kembang istana (Ontrokusuma) atau kain lurik katun tenun ATBM warna biru tua nila berseling putih (Pranakan), benang jahit katun kuat.",
    technique:
      "Dijahit dengan konstruksi potongan khas Jawa tanpa kelopak saku terbuka, garis leher tegak mandiri, dan penataan kancing kain buhul manual yang sangat presisi.",
    visual: {
      kind: "photo",
      src: IMAGES.surjanRed,
      alt: "Pria Jawa mengenakan pakaian tradisional surjan sutra kembang",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.surjanRed,
        alt: "Potret busana surjan kembang bangsawan Mataram",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.surjanDrum,
        alt: "Pakaian pranakan lurik dikenakan oleh abdi dalem",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Deretan abdi dalem Kraton Yogyakarta berbusana pranakan",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "surjan-pranakan.glb",
    hasVideo: true,
    video: {
      title: "Busana Takwa dan Ageman Abdi Dalem: Surjan Pranakan Yogyakarta",
      duration: 510,
      videoUrl: "/videos/surjan-pranakan.mp4",
      youtubeId: "RA6EuqVSiVk",
      thumb: IMAGES.surjanDrum,
      thumbNote: "Dokumenter Tradisi Tata Busana Adat Keraton Ngayogyakarta.",
      cues: [
        {
          at: 0,
          id: "Surjan pranakan mencerminkan kesederhanaan dan kepatuhan abdi dalem.",
          en: "Surjan pranakan reflects modesty and obedience of court retainers.",
        },
        {
          at: 10,
          id: "Kancing enam di leher menyiratkan rukun iman yang kokoh.",
          en: "Six buttons at the collar symbolize steadfast pillars of faith.",
        },
      ],
    },
    audioNarration: [
      "Surjan adalah busana adat resmi pria dalam tradisi Kesultanan Yogyakarta.",
      "Enam kancing di kerah leher melambangkan enam pilar rukun iman yang teguh.",
      "Busana pranakan berwarna lurik biru tua menjadi simbol kesetiaan abdi dalem kepada Kraton.",
      "Mengenakan surjan mengajarkan ketakwaan, kerendahan hati, dan pengendalian diri.",
    ],
    addedAt: "2025-05-24",
  },
  {
    id: "jemparingan-mataram",
    no: "13",
    name: "Jemparingan Mataram",
    localName: "Jemparingan Gaya Mataram Ngayogyakarta",
    category: "Warisan Budaya",
    origin: "Kota Yogyakarta",
    short:
      "Seni panahan tradisional Mataram dengan posisi duduk bersila, olah rasa memanah sasaran hati nurani.",
    history:
      "Jemparingan adalah panahan tradisional khas Kraton Yogyakarta yang dirintis sejak masa pemerintahan Sri Sultan Hamengku Buwono I. Tidak seperti panahan modern yang berdiri, jemparingan dilakukan dengan posisi duduk bersila mengenakan busana adat Jawa lengkap (nyamping, surjan, dan blangkon). Sasaran tembak berupa bandul silinder gantung berdiameter 3 cm bernama wong-wongan dengan jarak tembak standar 30 meter.",
    philosophy:
      'Prinsip jemparingan bukanlah membidik mata lahir, melainkan memanah dengan mata hati nurani. Semboyan luhur jemparingan adalah "Pamenthanging gandhewa kalawan pamoring cipta" (menarik busur dengan memusatkan segenap ketajaman cipta dan rasa). Olahraga ini melatih ketenangan batin, konsentrasi rohani, dan kesabaran mengendalikan getar tubuh.',
    material:
      "Gandhewa (busur) dibuat dari bilah bambu petung tua dipadu kayu kemuning, tali busur (kendur) dari serat rami alami, serta anak panah (jemparing) berujung besi berbulu unggas.",
    technique:
      "Duduk bersila dengan posisi tubuh menyamping tegak lurus sasaran, busur ditarik mendatar setinggi ulu hati tanpa membidik langsung dengan mata, melainkan mengandalkan kepekaan rasa nurani.",
    visual: {
      kind: "photo",
      src: IMAGES.archeryTraditional,
      alt: "Pemanah tradisional memegang busur gandhewa dalam posisi duduk bersila",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.archeryTraditional,
        alt: "Pemanah jemparingan mengenakan surjan bersiap membidik bandul",
        note: "Dokumentasi latihan jemparingan di Kemandungan Kraton Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Prajurit panah kraton dalam upacara tradisi",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.festival,
        alt: "Suasana gladhi jemparingan pelestarian budaya Yogyakarta",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "jemparingan-mataram.glb",
    hasVideo: true,
    video: {
      title: "Memanah Rasa Mataram: Seni Tradisi Panahan Jemparingan",
      duration: 630,
      videoUrl: "/videos/jemparingan-mataram.mp4",
      youtubeId: "-VJbQ64PvVI",
      thumb: IMAGES.archeryTraditional,
      thumbNote: "Dokumenter Tradisi Panahan Jemparingan Kasultanan Yogyakarta.",
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
    audioNarration: [
      "Jemparingan adalah seni panahan tradisional Mataram yang dilakukan dalam posisi duduk bersila.",
      "Pemanah mengenakan busana adat Jawa lengkap sebagai bentuk penghormatan pada tradisi.",
      "Sasaran tembak bukanlah hewan buruan, melainkan latihan memusatkan keheningan pikiran dan kalbu.",
      "Seni panah ini melatih ketajaman konsentrasi, ketenangan jiwa, dan ketahanan kesabaran.",
    ],
    addedAt: "2025-05-26",
  },
  {
    id: "wayang-golek-menak",
    no: "14",
    name: "Wayang Golek Menak",
    localName: "Ringgit Golek Menak Ngayogyakarta",
    category: "Seni Pertunjukan",
    origin: "Sleman",
    short:
      "Boneka kayu tiga dimensi berbusana gemerlap pencerita epos kepahlawanan Wong Agung Jayengrana.",
    history:
      "Wayang Golek Menak diciptakan pada masa pemerintahan Sri Sultan Hamengku Buwono IX pada sekitar tahun 1941. Terinspirasi oleh pertunjukan wayang golek Sunda dan epos Serat Menak Melayu-Jawa, Sultan memerintahkan para abdi dalem seniman Kraton merancang boneka kayu tiga dimensi dengan tatahan kostum kain beludru bordir khas Jawa Kraton untuk menceritakan kepahlawanan Amir Hamzah (Wong Agung Jayengrana).",
    philosophy:
      "Epos Menak sarat akan pesan persaudaraan antarbangsa, kepemimpinan bijaksana, dan keberanian menegakkan kebenaran. Gerak boneka yang luwes tiga dimensi melambangkan fleksibilitas diplomasi dan kejujuran sikap dalam bergaul dengan berbagai suku bangsa di dunia.",
    material:
      "Kayu albasia atau cangkring yang mudah dipahat, busana kain beludru berhias benang emas gim, manik-manik kaca, serta tangkai kemudi bambu dan tanduk kerbau.",
    technique:
      "Kepala dan badan dipahat manual tiga dimensi, dilapisi dasaran cat dan sunggingan wajah karakter, dirangkai dengan sendi gerak kain, lalu dikenakan busana sulam bordir benang emas yang mewah.",
    visual: {
      kind: "photo",
      src: IMAGES.golekPuppet,
      alt: "Boneka Wayang Golek Menak berpakaian beludru sulam emas",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.golekPuppet,
        alt: "Tokoh ksatria Wayang Golek Menak Yogyakarta",
        note: "Dokumentasi museum koleksi Wayang Golek Menak Kraton.",
      },
      {
        kind: "photo",
        src: IMAGES.carvingFace,
        alt: "Detail ukiran kayu wajah boneka golek menak",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.gamelan,
        alt: "Gamelan pengiring pementasan Wayang Golek Menak",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "wayang-golek-menak.glb",
    hasVideo: true,
    video: {
      title: "Kisah Menak di Tangan Dalang: Wayang Golek Yogyakarta",
      duration: 540,
      videoUrl: "/videos/wayang-golek-menak.mp4",
      youtubeId: "Sgr_OhR1FRk",
      thumb: IMAGES.golekPuppet,
      thumbNote: "Dokumenter Pagelaran Wayang Golek Menak Gagrak Ngayogyakarta.",
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
    audioNarration: [
      "Wayang Golek Menak diprakarsai oleh Sri Sultan Hamengku Buwono IX pada tahun 1940-an.",
      "Berwujud boneka kayu 3 dimensi berbusana kain beludru indah bersulam benang emas berkilau.",
      "Menceritakan kisah kepahlawanan Wong Agung Jayengrana yang membela kebenaran dan keadilan.",
      "Seni pertunjukan ini memadukan keanggunan tari istana dengan keluwesan boneka kayu.",
    ],
    addedAt: "2025-05-28",
  },
  {
    id: "perhiasan-sumping-mataram",
    no: "15",
    name: "Perhiasan Sumping & Aksesori Mataram",
    localName: "Sumping Surengpati lan Pending Mataraman",
    category: "Kriya Tradisional",
    origin: "Kota Yogyakarta",
    short:
      "Aksesori telinga dan pending pinggang tatah logam bertatah permata kelengkapan busana ageng Mataraman.",
    history:
      "Sumping merupakan perhiasan hiasan telinga berbentuk sayap burung garuda melengkung ke atas, sedangkan Pending adalah lempengan gesper logam pengunci stagen pinggang berukir rumit. Aksesori ini telah dipakai para raja dan ratu Mataram Kuno dan dilestarikan oleh Kesultanan Yogyakarta sebagai kelengkapan busana tari Bedhaya Semang, penari srimpi, serta pengantin adat ageng Paes Ageng Yogyakarta.",
    philosophy:
      "Sumping Surengpati yang menyerupai sayap burung mitologis Garuda melambangkan pendengaran yang arif bijaksana—seorang pemimpin harus senantiasa menyaring suara rakyat dengan kejernihan budi pekerti. Sementara pending di pinggang melambangkan kekokohan tekad dan kesiapan mengikat hawa nafsu duniawi.",
    material:
      "Kuningan atau perak sepuh emas murni 22 karat, permata intan berlian atau batu mirah delima sintesis, dan kain beludru merah sebagai pelapis belakang.",
    technique:
      "Dikerjakan dengan teknik tatah logam timbul (repousse), ukiran detail krawangan tembus cahaya, pematrian halus sambungan sayap garuda, serta penataan batu permata bertatahkan cakar kuku emas.",
    visual: {
      kind: "photo",
      src: IMAGES.goldCrown,
      alt: "Detail tatah perhiasan emas sumping daun telinga bangsawan Jawa",
    },
    gallery: [
      {
        kind: "photo",
        src: IMAGES.goldCrown,
        alt: "Sumping tatah kuningan sepuh emas ornamen garuda",
        note: "Koleksi perhiasan busana ageng Paes Ageng Yogyakarta.",
      },
      {
        kind: "photo",
        src: IMAGES.silverJewelry,
        alt: "Pending gesper logam perak bertatah relief flora",
        note: REP,
      },
      {
        kind: "photo",
        src: IMAGES.procession,
        alt: "Busana ageng dengan kelengkapan sumping keemasan",
        note: REP,
      },
    ],
    has3D: true,
    model3D: "perhiasan-sumping-mataram.glb",
    hasVideo: true,
    video: {
      title: "Kemilau Emas Pengantin Ageng: Seni Kriya Sumping & Pending",
      duration: 580,
      videoUrl: "/videos/perhiasan-sumping-mataram.mp4",
      youtubeId: "ipizaYNhGMM",
      thumb: IMAGES.goldCrown,
      thumbNote: "Dokumenter Kriya Logam Mulia dan Busana Pengantin Adat Keraton.",
      cues: [
        {
          at: 0,
          id: "Sumping sayap garuda diselipkan anggun di atas telinga mempelai.",
          en: "The garuda wing sumping is nestled gracefully above the ear.",
        },
        {
          at: 10,
          id: "Pending emas bertatahkan mirah delima mengikat kain bebet ageng.",
          en: "The golden pending buckle with rubies secures the royal waistcloth.",
        },
      ],
    },
    audioNarration: [
      "Sumping adalah hiasan daun telinga berwujud sayap garuda dalam busana ageng Yogyakarta.",
      "Menjadi pengingat bagi manusia untuk senantiasa mendengarkan nasihat kebajikan dengan jernih.",
      "Dibuat dari lempeng logam bertatahkan relief flora rumit yang disepuh kemilau emas.",
      "Perhiasan ini dikenakan oleh penari sakral Bedhaya dan pengantin ageng Kraton Yogyakarta.",
    ],
    addedAt: "2025-05-30",
  },
];
