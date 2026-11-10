import { lazy, Suspense } from "react";
import { ArrowRight, Box, Headphones, Film, MousePointer2, Compass, BookOpen } from "lucide-react";
import { DOCUMENTARIES, IMAGES, STORIES } from "../data";
import { Link } from "../lib/router";
import { useStore } from "../lib/store";
import { Art } from "../components/Art";
import { CollectionCard } from "../components/CollectionCard";
import { Eyebrow, LinkButton, SectionHeading } from "../components/ui";

const KerisViewer = lazy(() => import("../components/three/KerisViewer"));

function Hero() {
  const fallback = (
    <div className="h-full w-full">
      <Art art="keris" />
    </div>
  );
  return (
    <section className="grain relative min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,#3a2f24_0%,#1a1714_45%,#100f0d_80%)]" />
      <div className="kawung-accent absolute inset-y-0 left-0 w-1/3 opacity-[0.035] [mask-image:linear-gradient(to_right,black,transparent)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1360px] grid-rows-[auto_1fr] items-center gap-6 px-5 pt-28 pb-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-1 lg:gap-0 lg:px-10 lg:pt-24">
        <div className="relative z-10 flex flex-col gap-8 animate-fade-up lg:pb-10">
          <Eyebrow>Museum Virtual Kebudayaan — Daerah Istimewa Yogyakarta</Eyebrow>
          <h1 className="display text-[3.2rem] text-ivory sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
            Menyelami <em className="text-gold">Jiwa Luhur</em> Warisan Budaya Jawa
          </h1>
          <p className="max-w-lg text-[16px] leading-relaxed text-cream/85 sm:text-[17px]">
            Menelusuri mahakarya tradisi, filosofi adiluhung, dan artefak bersejarah Yogyakarta
            melalui kurasi digital, interaksi 3D 360°, dan dokumenter mendalam.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/explore" size="lg">
              <Compass size={16} /> Jelajahi Koleksi <ArrowRight size={15} />
            </LinkButton>
            <LinkButton to="/about" size="lg" variant="outline">
              Tentang Heritage360
            </LinkButton>
          </div>
          <div className="mt-4 hidden items-center gap-10 border-t border-gold/15 pt-6 sm:flex">
            {[
              ["Jelajahi", "Arsip digital terkurasi"],
              ["Kenali", "Objek 3D 360° interaktif"],
              ["Lestarikan", "Dokumentasi untuk masa depan"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-serif text-2xl text-ivory">{a}.</p>
                <p className="text-[12px] text-stone">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[52svh] min-h-[380px] w-full lg:h-[88svh]">
          <div className="absolute inset-[8%] rounded-full border border-gold/10" />
          <div className="absolute inset-[18%] rounded-full border border-gold/[0.07]" />
          <Suspense fallback={fallback}>
            <KerisViewer autoRotate allowZoom={false} fallback={fallback} />
          </Suspense>
          <div className="pointer-events-none absolute right-0 bottom-10 z-10 flex flex-col items-end gap-1 text-right sm:bottom-4 lg:bottom-16">
            <p className="font-serif text-xl sm:text-2xl text-ivory">Keris Yogyakarta</p>
            <p className="text-[10px] sm:text-[11px] tracking-[0.18em] text-stone uppercase">
              No. 01 · Senjata Pusaka · 3D Interaktif
            </p>
          </div>
          <Link
            to="/explorer/keris-yogyakarta"
            className="absolute bottom-2 left-0 z-10 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] text-gold uppercase hover:text-gold-soft sm:bottom-4 lg:bottom-16"
          >
            <MousePointer2 size={14} /> Buka Penjelajah 3D
          </Link>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const { collections } = useStore();
  const ids = ["keris-yogyakarta", "topeng-panji", "batik-kawung", "perak-kotagede"];
  const items = ids
    .map((id) => collections.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <section className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow="Koleksi Unggulan" title="Pusaka & Mahakarya Pilihan">
          Empat karya adiluhung pembuka pintu khazanah budaya material Yogyakarta, dari besalen
          tempa logam hingga sanggar kriya perak kota tua.
        </SectionHeading>
        <LinkButton to="/explore" variant="outline" className="self-start md:self-auto">
          Lihat Semua Koleksi ({collections.length}) <ArrowRight size={14} />
        </LinkButton>
      </div>
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c, i) => (
          <div key={c.id} className={i % 2 === 1 ? "lg:mt-16" : ""}>
            <CollectionCard c={c} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative border-y border-gold/10 bg-umber">
      <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <div className="relative">
          <img
            src={IMAGES.prambanan}
            alt="Candi Prambanan di Sleman Yogyakarta"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            loading="lazy"
          />
          <div className="absolute -right-4 -bottom-8 hidden w-64 border border-gold/25 bg-charcoal p-6 sm:block lg:-right-10">
            <p className="font-serif text-3xl text-gold">D.I. Yogyakarta</p>
            <p className="mt-2 text-[12px] leading-relaxed text-stone">
              Pusat peradaban budaya Jawa yang hidup, memadukan tradisi keraton dan kearifan
              masyarakat.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Eyebrow>Tujuan & Visi Kami</Eyebrow>
          <h2 className="display text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Melestarikan Budaya Melalui Pengalaman Digital Interaktif
          </h2>
          <p className="text-[16px] leading-relaxed text-cream/85">
            Heritage360 mendokumentasikan dan menyajikan kekayaan warisan budaya Yogyakarta—mulai
            dari busana kebesaran istana, ragam motif batik, kriya perak, hingga seni pertunjukan
            sakral—agar dapat dipelajari dan diapresiasi oleh generasi muda di mana saja.
          </p>
          <p className="text-[15px] leading-relaxed text-stone">
            Setiap objek dilengkapi dengan catatan sejarah, filosofi, bahan, dan teknik pembuatan
            yang dapat dipertanggungjawabkan, serta diperkaya dengan model 3D, panduan audio
            terpandu, dan cuplikan film dokumenter.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-gold uppercase"
          >
            Baca Selengkapnya Tentang Kami{" "}
            <span className="h-px w-8 bg-gold transition-all group-hover:w-14" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      icon: Box,
      title: "Jelajahi dalam 3D 360°",
      text: "Putar objek, perbesar detail tatahan pamor atau ukiran kayu, dan temukan hotspot anatomi artefak.",
      to: "/explorer/keris-yogyakarta",
      cta: "Buka Penjelajah 3D",
      visual: <Art art="pamor" />,
    },
    {
      icon: Headphones,
      title: "Dengarkan Panduan Audio",
      text: "Panduan narasi audio yang menuturkan sejarah dan makna filosofis, dilengkapi pilihan bahasa dan alunan gamelan.",
      to: "/explorer/keris-yogyakarta?audio=1",
      cta: "Putar Audio Guide",
      visual: (
        <img
          src={IMAGES.gamelan}
          alt="Penabuh gamelan Jawa"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ),
    },
    {
      icon: Film,
      title: "Tonton Dokumenter Budaya",
      text: "Film pendek dokumentasi proses pembuatan keris di besalen, canting batik tulis, tatah perak, dan wayang kulit.",
      to: "/documentary",
      cta: "Tonton Dokumenter",
      visual: (
        <img
          src={DOCUMENTARIES[1].thumb}
          alt="Batik canting"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <SectionHeading
        eyebrow="Fitur Eksplorasi"
        title="Tiga Dimensi Mengenal Warisan Budaya"
        align="center"
        className="mb-16"
      >
        Setiap koleksi dirancang agar dapat diresapi melalui indra penglihatan, pendengaran, dan
        cerita yang bermakna.
      </SectionHeading>
      <div className="grid gap-px bg-gold/15 md:grid-cols-3">
        {items.map(({ icon: Icon, ...it }, i) => (
          <Link key={it.title} to={it.to} className="group flex flex-col bg-charcoal">
            <div className="relative h-56 overflow-hidden">
              <div className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105">
                {it.visual}
              </div>
              <div className="absolute inset-0 bg-charcoal/40 transition-colors group-hover:bg-charcoal/20" />
              <span className="absolute top-5 left-5 font-serif text-5xl text-ivory/90">
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-8">
              <Icon size={22} strokeWidth={1.3} className="text-gold" />
              <h3 className="font-serif text-3xl text-ivory">{it.title}</h3>
              <p className="flex-1 text-[14px] leading-relaxed text-stone">{it.text}</p>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors group-hover:text-gold">
                {it.cta}{" "}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StoriesPreview() {
  const articles = STORIES.slice(0, 3);
  return (
    <section className="border-t border-gold/10 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Cerita & Jurnal" title="Kisah di Balik Pusaka">
            Ulasan mendalam mengenai sejarah, filosofi hidup, dan teknik para maestro kebudayaan
            Yogyakarta.
          </SectionHeading>
          <LinkButton to="/stories" variant="outline">
            <BookOpen size={14} /> Baca Semua Artikel
          </LinkButton>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((s) => (
            <Link
              key={s.id}
              to={`/stories/${s.id}`}
              className="group flex flex-col border border-gold/15 bg-charcoal p-6 transition-colors hover:border-gold/40"
            >
              <div className="mb-6 aspect-[16/10] w-full overflow-hidden bg-ink">
                <img
                  src={s.visual.kind === "photo" ? s.visual.src : IMAGES.procession}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                {s.category} · {s.readTime}
              </p>
              <h3 className="display mt-3 text-2xl text-ivory transition-colors group-hover:text-gold">
                {s.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-stone">
                {s.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { collections } = useStore();
  const stats = [
    { v: String(collections.length).padStart(2, "0"), l: "Total Koleksi Artefak" },
    { v: "06", l: "Kategori Kebudayaan" },
    { v: String(collections.filter((c) => c.has3D).length).padStart(2, "0"), l: "Objek 3D 360°" },
    { v: String(DOCUMENTARIES.length).padStart(2, "0"), l: "Film Dokumenter" },
  ];

  return (
    <section className="relative overflow-hidden border-t border-gold/10 bg-charcoal">
      <div className="kawung-accent absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col gap-3 px-4 sm:px-8 ${i > 0 ? "lg:border-l lg:border-gold/15" : ""} ${i % 2 ? "border-l border-gold/15 lg:border-l" : ""}`}
            >
              <span className="display text-6xl text-gold sm:text-7xl">{s.v}</span>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-cream uppercase">
                {s.l}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-[11px] text-stone">
          *Data statistik terkurasi untuk keperluan museum virtual dan eksplorasi digital
          Heritage360.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Intro />
      <Experience />
      <StoriesPreview />
      <Stats />
    </>
  );
}
