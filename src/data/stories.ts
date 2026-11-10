import type { Story } from "../types";
import { IMAGES, REP } from "./constants";

export const STORIES: Story[] = [
  {
    id: "filosofi-keris",
    title: "Filosofi Keris dalam Budaya Yogyakarta",
    category: "Filosofi",
    summary:
      "Dari bilah wilah hingga warangka ladrang, setiap lekukan dan guratan pamor keris menyimpan ajaran luhur budi pekerti ksatria Jawa.",
    readTime: "6 menit baca",
    visual: { kind: "art", art: "keris", alt: "Model Keris Yogyakarta luk tujuh" },
    related: "keris-yogyakarta",
    body: [
      "Dalam alam pikiran kebudayaan Jawa, keris ditempatkan dengan penuh rasa hormat. Keluarga turun-temurun merawat keris pusaka sebagai warisan leluhur, di mana keris lebih dipandang sebagai piyandel (simbol keteguhan batin dan jati diri) daripada sekadar senjata tajam pembela diri.",
      "Khazanah perkerisan memiliki tata istilah yang sangat kaya. Bilah utama dinamakan wilah. Pola guratan putih pada permukaan bilah yang terbentuk dari lipatan berulang besi dan nikel meteorit dinamakan pamor. Lekukan pada bilah disebut luk dan selalu berjumlah ganjil (gasal), sedangkan bilah lurus tanpa lekukan disebut leres.",
      "Di Kesultanan Yogyakarta (gaya gagrak Ngayogyakarta), bentuk warangka (sarung keris) menjadi pembeda utama suasana pemakaian. Warangka ladrang yang menyerupai perahu anggun dikenakan saat upacara ageng resmi dan pertemuan kenegaraan istana, sedangkan warangka gayaman yang lebih membulat praktis digunakan dalam aktivitas harian.",
      "Setiap dapur (rancangan bilah) dan motif pamor memiliki doa serta harapan yang ditiupkan sang empu melalui tirakat. Melalui Heritage360, pengunjung diajak menyelami kearifan logam Jawa ini secara lebih dekat dan ilmiah.",
    ],
  },
  {
    id: "makna-kawung",
    title: "Makna Luhur Motif Batik Kawung",
    category: "Warisan Budaya",
    summary:
      "Empat bidang lonjong mengitari satu poros hening. Menelusuri mengapa salah satu motif batik tertua Jawa ini tetap relevan sebagai simbol keseimbangan hidup.",
    readTime: "5 menit baca",
    visual: {
      kind: "art",
      art: "kawung",
      alt: "Pola geometris simetris motif batik Kawung klasik",
    },
    related: "batik-kawung",
    body: [
      "Motif Kawung tersusun dari empat bentuk bulat lonjong (elips) yang berpusat pada satu titik poros di tengah, berulang secara teratur membentuk bidang kisi geometris yang harmonis.",
      "Bentuk visualnya kerap diasosiasikan dengan penampang buah aren (kolang-kaling) yang berwarna putih bersih di bagian dalam, serta bunga teratai yang mekar di atas air telaga.",
      "Masyarakat Jawa memaknai struktur ini melalui filosofi Sedulur Papat Lima Pancer—empat saudara gaib atau empat arah mata angin yang mengelilingi diri manusia, mengajarkan pengendalian hawa nafsu dan kesadaran diri agar senantiasa bermanfaat bagi sesama.",
      "Batik Indonesia telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Takbenda pada tahun 2009, sebuah bentuk penghormatan dunia atas ketekunan para pembatik perempuan Yogyakarta.",
    ],
  },
  {
    id: "sejarah-topeng-panji",
    title: "Sejarah Topeng Panji dan Karakter Alus Jawa",
    category: "Sejarah",
    summary:
      "Kisah pangeran pengembara yang melintasi Asia Tenggara, diabadikan dalam pahatan kayu putih bersih penari Wayang Topeng Gunungkidul.",
    readTime: "7 menit baca",
    visual: { kind: "art", art: "topeng", alt: "Karakter muka Topeng Panji" },
    related: "topeng-panji",
    body: [
      "Kisah Panji menceritakan lika-liku pengembaraan Raden Panji Asmarabangun dari Kerajaan Janggala dalam mencari kekasih hatinya, Dewi Sekartaji dari Kerajaan Kadiri.",
      "Siklus sastra ini berkembang luas dari Jawa Timur ke Bali, semenanjung Melayu, hingga Thailand (dikenal sebagai Inao) dan Kamboja. Naskah Cerita Panji telah terdaftar resmi dalam UNESCO Memory of the World Register pada tahun 2017.",
      "Dalam seni tari Wayang Topeng Yogyakarta, karakter Raden Panji dihadirkan lewat topeng berwajah putih mulus, mata liyep menyipit, hidung mancung runcing, dan senyum tertahan yang melambangkan keanggunan ksatria yang mampu menundukkan amarah.",
      "Hingga kini, tradisi memahat topeng kayu terus hidup di desa-desa lereng perbukitan Bobung, Gunungkidul, menjaga kesinambungan kriya warisan leluhur di tangan generasi muda.",
    ],
  },
  {
    id: "wayang-tradisi-jawa",
    title: "Wayang Kulit dalam Tradisi Mataram",
    category: "Seni Tradisional",
    summary:
      "Pagelaran semalam suntuk yang memadukan bayang kelir, tembang pesinden, denting gamelan, dan wejangan filosofis sang dalang.",
    readTime: "8 menit baca",
    visual: {
      kind: "photo",
      src: IMAGES.wayangRow,
      alt: "Jajaran wayang kulit tatahan halus tertancap di gedebog",
      note: REP,
    },
    related: "wayang-kulit",
    body: [
      "Pagelaran wayang kulit menempatkan sang dalang di balik kelir putih membentang, disinari nyala lampu minyak blencong dengan ratusan tokoh wayang dari lembaran kulit kerbau bertatah rumit.",
      "Dalang bertindak sebagai narator serba bisa: menirukan puluhan karakter suara, memberi aba-aba iringan gamelan lewat kepyak dan cempala, serta menyisipkan humor cerdas dan wejangan moral bagi penonton.",
      "UNESCO menetapkan teater wayang Indonesia sebagai Mahakarya Warisan Budaya Lisan dan Takbenda Kemanusiaan pada tahun 2003.",
      "Wayang Kulit gaya Yogyakarta memiliki pakem anatomi tubuh figur yang tegap bersahaja, sunggingan warna yang tenang, dan narasi pedalangan istana yang sarat etika kesantunan.",
    ],
  },
  {
    id: "perak-kotagede-sejarah",
    title: "Kilau Perak Kotagede: Jejak Kriya Ibu Kota Mataram",
    category: "Sejarah",
    summary:
      "Menelusuri lorong batu bata kota tua Kotagede dan sejarah ratusan tahun perajin logam mulia peninggalan Panembahan Senopati.",
    readTime: "6 menit baca",
    visual: {
      kind: "photo",
      src: IMAGES.silverCraft,
      alt: "Bengkel kriya perak tradisional di Kotagede",
      note: "Dokumentasi perajin perak Kotagede.",
    },
    related: "perak-kotagede",
    body: [
      "Kotagede merupakan saksi bisu berdirinya Dinasti Mataram Islam pada abad ke-16 di bawah kepemimpinan Danang Sutawijaya (Panembahan Senopati).",
      "Sejak awal berdirinya istana, para pandhe perak, emas, dan tembaga telah diberi tempat bermukim khusus untuk memenuhi kebutuhan regalia kerajaan dan perkakas istana.",
      "Keunikan perak Kotagede terletak pada teknik filigri (merajut kawat perak halus) serta teknik ukir timbul beraksen perak bakar (oksidasi belerang) yang menciptakan kontras gelap-terang yang dramatis.",
      "Kini, gang-gang sempit berarsitektur rumah kalang di Kotagede tetap berdenyut menjaga keahlian turun-temurun ini agar tidak lekang oleh arus zaman.",
    ],
  },
  {
    id: "gamelan-sekaten-harmoni",
    title: "Harmoni Sakral Gamelan Sekaten di Kraton Yogyakarta",
    category: "Seni Tradisional",
    summary:
      "Kisah dua perangkat gamelan pusaka berukuran raksasa yang hanya ditabuh setahun sekali dalam perayaan Maulid Nabi Muhammad SAW.",
    readTime: "7 menit baca",
    visual: {
      kind: "photo",
      src: IMAGES.gamelan,
      alt: "Gamelan pusaka Kraton Yogyakarta",
      note: REP,
    },
    related: "gamelan-yogyakarta",
    body: [
      "Gamelan Sekati Kraton Ngayogyakarta Hadiningrat, yakni Kanjeng Kyai Gunturmadu dan Kanjeng Kyai Nagawilaga, adalah pusaka bersejarah yang sarat makna dakwah kultural para Wali Sanga.",
      "Nama Sekaten konon berakar dari kata bahasa Arab Syahadatain (dua kalimat syahadat), di mana masyarakat Jawa dahulu diajak berkumpul mendengarkan dentang gamelan perunggu yang menggelegar sebelum memasuki masjid.",
      "Ukuran bilah dan pencon gamelan Sekaten hampir dua kali lipat lebih besar dibanding gamelan biasa, menghasilkan getaran nada pelog yang begitu dalam dan menggetarkan kalbu pendengar di kejauhan.",
      "Melestarikan gamelan berarti melestarikan falsafah gotong royong, di mana tidak ada nada yang meninggikan diri sendiri—semuanya luluh dalam satu harmoni semesta.",
    ],
  },
];
