# HERITAGE360 — Museum Virtual & Eksplorasi 3D Warisan Budaya Yogyakarta

> **Jelajahi. Kenali. Lestarikan.**

![Heritage360 Banner](public/og-image.png)

**HERITAGE360** adalah platform museum virtual dan dokumentasi digital interaktif yang dirancang khusus untuk merayakan, mendokumentasikan, dan melestarikan warisan budaya adiluhung Daerah Istimewa Yogyakarta. Proyek ini memadukan estetika budaya Jawa klasik (charcoal, kayu jati, emas antik, dan ivory) dengan teknologi web modern (*real-time 3D web rendering*, audio guide interaktif, dan video dokumenter beresolusi tinggi).

---

## ✨ Fitur Unggulan

### 1. 🏛️ Eksplorasi 3D Interaktif 360° (Seluruh 15 Koleksi)
- Interaksi 3D penuh: rotasi bebas 360°, tilt atas/bawah, zoom in/out, auto-rotate, dan mode layar penuh (*fullscreen*).
- Ditenagai oleh **Three.js** dan **React Three Fiber**.
- Dilengkapi **Hotspot Interaktif** pada bagian anatomi budaya (misal: luk, pamor, dan ganja pada Keris; jamang pada Topeng; pencu pada Gamelan).
- Dukungan unggah model kustom (`.glb` / `.gltf`) secara instan langsung dari peramban.

### 2. 🎬 Pemutar Video Dokumenter Arsip Otentik
- Pemutar video 16:9 terintegrasi dengan rekaman dokumenter resmi (UNESCO Intangible Cultural Heritage, Kraton Jogja, dan Indonesia Kaya).
- Dilengkapi subtitle/cues narasi budaya tersinkronisasi.
- Kontrol penuh: play, pause, fullscreen, dan informasi detail kuratorial.

### 3. 🖼️ Galeri Kurasi & Detail Sejarah Mendalam
- 15 artefak budaya Yogyakarta terlengkap:
  1. **Keris Yogyakarta** (Dhuwung Gagrak Ngayogyakarta)
  2. **Topeng Panji** (Topeng Panji Asmarabangun)
  3. **Batik Kawung** (Motif Ceplok Empat Daun)
  4. **Batik Parang** (Parang Rusak Barong)
  5. **Wayang Kulit** (Wayang Kulit Purwa Gagrak Ngayogyakarta)
  6. **Blangkon Yogyakarta** (Mondolan Gagrak Ngayogyakarta)
  7. **Gebyog Ukir Jawa** (Gebyog Ukir Jati Jepara-Yogya)
  8. **Kain Lurik Tradisional** (Lurik Prasojo & Telupat)
  9. **Kerajinan Perak Kotagede** (Filigri Perak 925 Kotagede)
  10. **Gerabah Kasongan** (Kendhi & Keramik Gerabah Bantul)
  11. **Gamelan Jawa Slendro & Pelog** (Gong Ageng & Ricikan)
  12. **Surjan Tradisional** (Surjan Sembagi & Antakusuma)
  13. **Jemparingan Mataraman** (Panahan Tradisional Gaya Mataram)
  14. **Wayang Golek Menak** (Wayang Kayu Gagrak Ngayogyakarta)
  15. **Perhiasan & Sumping Kerajaan** (Sumping Surengpati & Pending Emas)
- Setiap koleksi memuat: sejarah asal-usul, filosofi budaya, material pembuatan, teknik kriya, serta narasi audio.

### 4. 🎧 Panduan Audio Interaktif
- Fitur simulasi pemutaran audio guide berurutan per poin narasi kuratorial.

### 5. 📜 Cerita Budaya & Jejak Sejarah
- Artikel mendalam mengenai kosmologi Sumbu Filosofi Yogyakarta, falsafah batik larangan, dan tradisi tempa besi besalen.

### 6. ⭐ Koleksi Favorit & Dashboard Admin
- Simpan artefak favorit ke memori lokal (*local storage*).
- Dashboard Admin untuk manajemen koleksi, statistik kunjungan, dan pencatatan aktivitas kuratorial.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan `@tailwindcss/vite`
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animasi**: [Motion](https://motion.dev/) (Framer Motion)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **State & Routing**: Custom lightweight React state store & hash/path router

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- **Node.js**: versi 20 atau lebih baru (disarankan Node 22+)
- **Package Manager**: `pnpm` (disarankan), `npm`, atau `yarn`

### Langkah-langkah

1. **Clone repositori**:
   ```bash
   git clone <URL_REPOSITORI_ANDA>
   cd "Build Heritage360 Virtual Museum"
   ```

2. **Install dependensi**:
   ```bash
   pnpm install
   # atau menggunakan npm:
   # npm install
   ```

3. **Jalankan development server**:
   ```bash
   pnpm dev
   # atau:
   # npm run dev
   ```
   Buka peramban di `http://localhost:5173` (atau port yang tertera di terminal).

4. **Build untuk produksi**:
   ```bash
   pnpm build
   ```

5. **Pratinjau build produksi**:
   ```bash
   pnpm preview
   ```

---

## 📁 Struktur Direktori

```text
├── public/                 # Aset publik statis (favicon, logo, og-image)
├── src/
│   ├── components/         # Komponen UI modular
│   │   ├── layout/         # Navbar, Footer, Container
│   │   ├── three/          # Model 3D prosedural (ArtifactModels) & UniversalViewer
│   │   ├── VideoPlayer.tsx # Pemutar video YouTube arsip otentik
│   │   ├── AudioGuide.tsx  # Panduan audio kuratorial
│   │   └── ...
│   ├── data/               # Basis data kuratorial artefak, cerita, & video
│   ├── lib/                # State store, routing, & utilitas
│   ├── pages/              # Halaman web (Beranda, Koleksi, Detail, 3D, Cerita, dsb.)
│   │   └── admin/          # Panel kurator dan administrasi museum
│   ├── types/              # Definisi interface TypeScript
│   ├── App.tsx             # Root router & layout orchestration
│   ├── main.tsx            # Entry point aplikasi
│   └── index.css           # Styling global & token warna Tailwind v4
├── index.html              # Shell HTML utama
├── package.json            # Daftar dependensi & script NPM
├── tsconfig.json           # Konfigurasi TypeScript
└── vite.config.ts          # Konfigurasi Vite & plugin Tailwind v4
```

---

## 📜 Lisensi & Etika Budaya

Proyek ini dikembangkan untuk tujuan edukasi, apresiasi kebudayaan, dan pelestarian digital warisan budaya Daerah Istimewa Yogyakarta. Seluruh dokumentasi audio-visual mengacu pada arsip publik, warisan budaya takbenda UNESCO, dan kebudayaan adiluhung Nusantara.

*Copyright © 2025–2026 HERITAGE360 Yogyakarta.*
