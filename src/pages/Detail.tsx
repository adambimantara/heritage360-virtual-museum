import { useState, useRef } from "react";
import { Box, Headphones, MapPin, Tag, Layers, Hammer, Film, ArrowRight } from "lucide-react";
import { useStore } from "../lib/store";
import { DOCUMENTARIES } from "../data";
import { VisualView } from "../components/Art";
import { CollectionCard, FavoriteButton } from "../components/CollectionCard";
import { AudioGuide } from "../components/AudioGuide";
import { VideoPlayer } from "../components/VideoPlayer";
import { Breadcrumb, Button, ErrorState, LinkButton, cx } from "../components/ui";

export default function Detail({ id }: { id: string }) {
  const { collections } = useStore();
  const c = collections.find((x) => x.id === id);
  const [active, setActive] = useState(0);
  const [audio, setAudio] = useState(false);
  const videoSection = useRef<HTMLDivElement>(null);

  if (!c)
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
        <ErrorState
          title="Artefak Tidak Ditemukan"
          action={<LinkButton to="/explore">Kembali ke Koleksi</LinkButton>}
        >
          Artefak yang Anda cari tidak tersedia dalam arsip digital atau tautan telah kedaluwarsa.
        </ErrorState>
      </div>
    );

  const gallery = c.gallery.length ? c.gallery : [c.visual];
  const shown = gallery[Math.min(active, gallery.length - 1)];
  const related = collections
    .filter((x) => x.id !== c.id && x.category === c.category)
    .concat(collections.filter((x) => x.id !== c.id && x.category !== c.category))
    .slice(0, 3);

  // Find linked documentary or construct from collection video metadata
  const doc =
    DOCUMENTARIES.find((d) => d.relatedArtifactId === c.id || d.id === `doc-${c.id}`) ||
    (c.video
      ? {
          id: `doc-${c.id}`,
          title: c.video.title,
          category: c.category,
          description: c.short,
          duration: c.video.duration,
          thumb: c.video.thumb || (c.visual.kind === "photo" ? c.visual.src : ""),
          thumbNote: c.video.thumbNote || "Dokumenter Resmi Kebudayaan Yogyakarta.",
          youtubeId: c.video.youtubeId || "xFCq8qMzy1s",
          cues: c.video.cues || [],
          relatedArtifactId: c.id,
        }
      : undefined);

  const scrollToVideo = () => {
    videoSection.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section className="mx-auto max-w-[1360px] px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10">
        <Breadcrumb
          items={[
            { label: "Beranda", to: "/" },
            { label: "Jelajahi Koleksi", to: "/explore" },
            { label: c.category, to: "/explore" },
            { label: c.name },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10">
        {/* Visual column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <VisualView
              key={active}
              visual={shown}
              eager
              showNote
              className="aspect-[4/5] w-full animate-[fade-up_.6s_ease_both] sm:aspect-[5/5] lg:aspect-[4/5]"
            />
            <span className="absolute top-5 left-5 font-serif text-2xl text-ivory">No. {c.no}</span>
            <FavoriteButton id={c.id} className="absolute top-4 right-4" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Tampilkan foto ${i + 1}: ${g.alt}`}
                aria-pressed={active === i}
                className={cx(
                  "relative aspect-square overflow-hidden border transition-all cursor-pointer",
                  active === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <VisualView visual={g} className="h-full w-full" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-stone">
            Foto {active + 1} dari {gallery.length} · Klik foto kecil untuk memperbesar tampilan
          </p>
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 animate-fade-up">
            <p className="eyebrow">{c.category}</p>
            <h1 className="display text-5xl text-ivory sm:text-6xl lg:text-7xl">{c.name}</h1>
            <p className="font-serif text-2xl text-gold/90 italic">{c.localName}</p>
            <p className="text-[16px] leading-relaxed text-cream/90">{c.short}</p>
          </div>

          <dl className="grid grid-cols-2 border-y border-gold/15">
            {[
              { icon: Tag, k: "Kategori Budaya", v: c.category },
              { icon: MapPin, k: "Asal Daerah", v: `${c.origin}, Yogyakarta` },
            ].map(({ icon: I, k, v }, i) => (
              <div
                key={k}
                className={cx(
                  "flex flex-col gap-2 py-5",
                  i === 1 && "border-l border-gold/15 pl-6",
                )}
              >
                <dt className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
                  <I size={12} className="text-gold" />
                  {k}
                </dt>
                <dd className="font-serif text-xl text-ivory">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Interactive CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <LinkButton to={`/explorer/${c.id}`} size="lg">
              <Box size={16} /> Jelajahi dalam 3D
            </LinkButton>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setAudio((a) => !a)}
              aria-expanded={audio}
            >
              <Headphones size={16} /> {audio ? "Tutup Panduan Audio" : "Dengarkan Audio Guide"}
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToVideo}>
              <Film size={16} /> Tonton Dokumenter
            </Button>
            <FavoriteButton id={c.id} withLabel className="h-13!" />
          </div>

          {/* Audio Guide section */}
          {audio && (
            <div className="animate-fade-up">
              <AudioGuide
                artifact={c.name}
                narration={c.audioNarration}
                onClose={() => setAudio(false)}
              />
            </div>
          )}

          {/* Sections of deep knowledge */}
          <Article n="01" title="Sejarah & Asal-usul">
            {c.history}
          </Article>
          <Article n="02" title="Makna Filosofis Budaya">
            {c.philosophy}
          </Article>

          <div className="grid gap-px bg-gold/15 sm:grid-cols-2">
            <div className="flex flex-col gap-3 bg-charcoal p-6 sm:pr-8 sm:pl-0">
              <p className="flex items-center gap-2 eyebrow">
                <Layers size={13} /> Bahan Utama
              </p>
              <p className="text-[14px] leading-relaxed text-cream/85">{c.material}</p>
            </div>
            <div className="flex flex-col gap-3 bg-charcoal p-6 sm:pl-8">
              <p className="flex items-center gap-2 eyebrow">
                <Hammer size={13} /> Teknik Pembuatan
              </p>
              <p className="text-[14px] leading-relaxed text-cream/85">{c.technique}</p>
            </div>
          </div>

          <p className="border-l border-gold/40 pl-4 text-[12px] leading-relaxed text-stone">
            *Informasi dikurasi dari rujukan naskah kebudayaan dan dokumentasi resmi Keraton
            Ngayogyakarta Hadiningrat serta komunitas pelestari budaya Yogyakarta.
          </p>
        </div>
      </section>

      {/* Video Documentary Section for this artifact */}
      <section ref={videoSection} className="border-t border-gold/15 bg-ink py-20">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Film size={14} /> Video Dokumentasi Budaya
              </p>
              <h2 className="display mt-2 text-4xl text-ivory sm:text-5xl">
                Dokumenter Terkait: {c.name}
              </h2>
            </div>
            <LinkButton to="/documentary" variant="ghost">
              Lihat Seluruh Arsip Video <ArrowRight size={14} />
            </LinkButton>
          </div>

          {doc ? (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <VideoPlayer doc={doc} />
              <div className="flex flex-col justify-center gap-5 border border-gold/15 bg-charcoal p-6 sm:p-8">
                <span className="eyebrow">{doc.category}</span>
                <h3 className="font-serif text-3xl text-ivory">{doc.title}</h3>
                <p className="text-[14px] leading-relaxed text-cream/80">{doc.description}</p>
                <div className="flex items-center gap-4 border-t border-gold/15 pt-4 text-[12px] text-stone">
                  <span>Durasi: {Math.floor(doc.duration / 60)} menit</span>
                  <span>·</span>
                  <span>Kualitas: 1080p HD</span>
                  <span>·</span>
                  <span>Subtitle: ID / EN</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 border border-dashed border-gold/20 bg-charcoal/50 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Film size={26} />
              </div>
              <h3 className="font-serif text-2xl text-ivory">
                Video Dokumenter Sedang Dalam Proses Kurasi
              </h3>
              <p className="max-w-md text-[14px] text-stone">
                Dokumentasi video resmi untuk objek <strong>{c.name}</strong> sedang dipersiapkan di
                direktori <code className="text-gold">public/videos/{c.id}.mp4</code>.
              </p>
              <LinkButton to="/documentary" variant="outline" size="sm">
                Tonton Dokumenter yang Sudah Tersedia
              </LinkButton>
            </div>
          )}
        </div>
      </section>

      {/* Related Collections */}
      <section className="border-t border-gold/10 bg-charcoal">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-10">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-4xl text-ivory sm:text-5xl">Koleksi Terkait</h2>
            <LinkButton to="/explore" variant="ghost">
              Lihat Semua Artefak
            </LinkButton>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <CollectionCard key={r.id} c={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Article({ n, title, children }: { n: string; title: string; children: string }) {
  return (
    <article className="grid gap-4 sm:grid-cols-[64px_1fr]">
      <span className="font-serif text-3xl text-gold">{n}</span>
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-3xl text-ivory">{title}</h2>
        <p className="text-[15px] leading-[1.85] text-cream/80">{children}</p>
      </div>
    </article>
  );
}
