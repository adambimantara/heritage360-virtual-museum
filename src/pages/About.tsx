import {
  Box,
  Globe2,
  BookOpenCheck,
  Users,
  Code2,
  Layers3,
  Headphones,
  Database,
  Compass,
} from "lucide-react";
import { IMAGES } from "../data";
import { Art } from "../components/Art";
import { Eyebrow, LinkButton } from "../components/ui";

export default function About() {
  return (
    <>
      <section className="relative flex min-h-[86svh] items-end overflow-hidden">
        <img
          src={IMAGES.prambanan}
          alt="Kompleks Candi Prambanan di bawah langit Yogyakarta"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-20 sm:px-8 lg:px-10">
          <Eyebrow>Tentang Heritage360</Eyebrow>
          <h1 className="display mt-6 max-w-4xl text-5xl text-ivory sm:text-7xl lg:text-8xl animate-fade-up">
            Museum virtual tanpa batas untuk Yogyakarta
          </h1>
          <p className="mt-4 font-serif text-2xl text-gold italic">Jelajahi. Kenali. Lestarikan.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[300px_1fr] lg:gap-24 lg:px-10">
        <p className="eyebrow">01 — Latar Belakang</p>
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="font-serif text-3xl leading-snug text-ivory sm:text-4xl">
            Daerah Istimewa Yogyakarta menyimpan salah satu kebudayaan hidup (living culture) paling
            kaya di Nusantara. Namun, banyak dari mahakarya tersebut rapuh, tersebar, atau terbatas
            akses kunjungannya.
          </p>
          <p className="text-[16px] leading-relaxed text-cream/80">
            Heritage360 digagas sebagai museum virtual terpadu yang mendokumentasikan kekayaan
            artefak, pusaka, seni kriya, dan filosofi Jawa Yogyakarta dalam satu wadah digital
            interaktif. Melalui perpaduan riset naskah sejarah, pemindaian 3D, narasi audio
            dwibahasa, dan dokumenter, warisan ini dapat dipelajari oleh generasi muda, akademisi,
            dan diaspora di seluruh penjuru dunia.
          </p>
        </div>
      </section>

      <section className="border-y border-gold/10 bg-umber">
        <div className="mx-auto grid max-w-[1360px] lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Art art="kawung" />
          </div>
          <div className="flex flex-col justify-center gap-10 px-5 py-20 sm:px-12 lg:px-20">
            <p className="eyebrow">02 — Misi Pelestarian Digital</p>
            <h2 className="display text-4xl text-ivory sm:text-5xl">
              Mendokumentasikan hari ini untuk generasi masa depan
            </h2>
            <ul className="flex flex-col gap-5 text-[15px] leading-relaxed text-cream/85">
              {[
                "Mendigitalkan dan mengatalogkan artefak dengan metadata sejarah, filosofi, bahan, dan teknik yang akurat.",
                "Menyediakan penampil 3D interaktif 360 derajat agar pengunjung dapat mengamati detail anatomi artefak dari dekat.",
                "Menyajikan konteks budaya yang hidup melalui kisah empu, perajin, dan komunitas penjaga tradisi.",
                "Mendukung keterbukaan edukasi budaya Nusantara yang inklusif dan mudah diakses dari perangkat apapun.",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif text-lg text-gold">0{i + 1}.</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <p className="eyebrow mb-12">03 — Pilar Pengalaman Digital</p>
        <div className="grid gap-px bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Box,
              title: "Pemodelan 3D 360°",
              text: "Mengintegrasikan teknologi fotogrametri dan visualisasi Three.js untuk eksplorasi bentuk dan pamor bilah.",
            },
            {
              icon: Headphones,
              title: "Panduan Audio Dwibahasa",
              text: "Narasi audio bahasa Indonesia dan Inggris yang disinkronkan dengan latar gamelan Jawa perunggu.",
            },
            {
              icon: Layers3,
              title: "Arsip Kurasi Sejarah",
              text: "Informasi mendalam mengenai filosofi, bahan baku alam, dan teknik pembuatan yang dapat dipertanggungjawabkan.",
            },
            {
              icon: BookOpenCheck,
              title: "Jurnal & Dokumenter",
              text: "Kumpulan esai budaya dan rekaman proses pembuatan kriya langsung dari sanggar perajin Yogyakarta.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-4 bg-charcoal p-8">
              <Icon size={24} strokeWidth={1.4} className="text-gold" />
              <h3 className="font-serif text-2xl text-ivory">{title}</h3>
              <p className="text-[14px] leading-relaxed text-stone">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gold/10 bg-ink py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <p className="eyebrow mb-4">Mari Mulai Penjelajahan</p>
          <h2 className="display text-4xl text-ivory sm:text-5xl">
            Kenali Kekayaan Budaya Yogyakarta
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone">
            Temukan koleksi pusaka, topeng tari, tekstil batik, dan kriya logam yang telah memikat
            dunia selama berabad-abad.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton to="/explore" size="lg">
              <Compass size={16} /> Buka Galeri Koleksi
            </LinkButton>
            <LinkButton to="/explorer/keris-yogyakarta" size="lg" variant="outline">
              <Box size={16} /> Coba Penjelajah 3D
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
