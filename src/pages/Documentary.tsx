import { useEffect, useRef, useState, useMemo } from "react";
import { Play, Clock, Film, Search, ArrowRight, Box } from "lucide-react";
import { DOCUMENTARIES, formatTime } from "../data";
import { VideoPlayer } from "../components/VideoPlayer";
import { Badge, Button, SearchBar, LinkButton, cx } from "../components/ui";
import { Link } from "../lib/router";

export default function Documentary({ query }: { query: string }) {
  const initial = DOCUMENTARIES.find((d) => query.includes(`doc=${d.id}`)) ?? DOCUMENTARIES[0];
  const [doc, setDoc] = useState(initial);
  const [auto, setAuto] = useState(false);
  const [q, setQ] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => setDoc(initial), [initial]);

  const categories = useMemo(() => {
    return Array.from(new Set(DOCUMENTARIES.map((d) => d.category)));
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return DOCUMENTARIES.filter(
      (d) =>
        (selectedCat === "all" || d.category === selectedCat) &&
        (!s || (d.title + d.description + d.category).toLowerCase().includes(s)),
    );
  }, [q, selectedCat]);

  const play = (d: (typeof DOCUMENTARIES)[number]) => {
    setDoc(d);
    setAuto(true);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section ref={top} className="scroll-mt-16 bg-ink pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex flex-col gap-4">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold/70" />
                Film Dokumenter Budaya
              </p>
              <h1 className="display text-5xl text-ivory sm:text-6xl lg:text-7xl">
                Kisah di Balik <em className="text-gold">Sang Mahakarya</em>
              </h1>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-stone">
              Serial film dokumenter pendek merekam dedikasi para maestro, empu, dan perajin yang
              melestarikan denyut tradisi Yogyakarta.
            </p>
          </div>

          {/* Active Featured Video Player */}
          <div className="grid gap-8 pb-16 lg:grid-cols-[1fr_360px]">
            <VideoPlayer key={doc.id + String(auto)} doc={doc} autoPlay={auto} />
            <div className="flex flex-col gap-5 border border-gold/15 bg-charcoal p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <Badge tone="success">{doc.category}</Badge>
                <span className="text-[11px] text-stone flex items-center gap-1">
                  <Clock size={12} /> {formatTime(doc.duration)}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ivory">
                {doc.title}
              </h2>
              <p className="text-[14px] leading-relaxed text-cream/80">{doc.description}</p>

              <dl className="grid grid-cols-2 gap-4 border-y border-gold/15 py-5 text-[13px]">
                <div>
                  <dt className="text-[10px] tracking-[0.18em] text-stone uppercase">
                    Durasi Film
                  </dt>
                  <dd className="mt-1 text-ivory font-semibold">
                    {formatTime(doc.duration)} menit
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] text-stone uppercase">
                    Kualitas Video
                  </dt>
                  <dd className="mt-1 text-ivory font-semibold">1080p Full HD</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[10px] tracking-[0.18em] text-stone uppercase">
                    Subtitle Tersedia
                  </dt>
                  <dd className="mt-1 text-ivory">Bahasa Indonesia, English</dd>
                </div>
              </dl>

              {doc.relatedArtifactId && (
                <div className="pt-2">
                  <LinkButton
                    to={`/collection/${doc.relatedArtifactId}`}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Box size={14} /> Lihat Koleksi Artefak Terkait
                  </LinkButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Documentary Archive Grid & Filter */}
      <section className="border-t border-gold/10 bg-charcoal py-20">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-2">Arsip Dokumentasi Video</p>
              <h2 className="display text-4xl text-ivory sm:text-5xl">Daftar Dokumenter Budaya</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <SearchBar value={q} onChange={setQ} placeholder="Cari judul dokumenter..." />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-10 flex flex-wrap gap-2 border-b border-gold/10 pb-4">
            <button
              onClick={() => setSelectedCat("all")}
              className={cx(
                "h-8 rounded-full border px-4 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer",
                selectedCat === "all"
                  ? "border-gold bg-gold text-charcoal"
                  : "border-ivory/15 text-stone hover:text-ivory",
              )}
            >
              Semua Dokumenter ({DOCUMENTARIES.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={cx(
                  "h-8 rounded-full border px-4 text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer",
                  selectedCat === c
                    ? "border-gold bg-gold text-charcoal"
                    : "border-ivory/15 text-stone hover:text-ivory",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => {
              const active = d.id === doc.id;
              return (
                <div
                  key={d.id}
                  onClick={() => play(d)}
                  className={cx(
                    "group relative flex flex-col border p-5 transition-all cursor-pointer",
                    active
                      ? "border-gold bg-umber/80 shadow-2xl"
                      : "border-gold/15 bg-charcoal hover:border-gold/40 hover:bg-umber/40",
                  )}
                >
                  <div className="relative mb-4 aspect-video overflow-hidden bg-ink">
                    <img
                      src={d.thumb}
                      alt={d.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-[2px] bg-ink/80 px-2 py-0.5 text-[10px] text-ivory backdrop-blur">
                      <Clock size={11} /> {formatTime(d.duration)}
                    </span>
                    <span
                      className={cx(
                        "absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300",
                        active
                          ? "bg-gold text-charcoal scale-100"
                          : "bg-ink/75 text-ivory group-hover:bg-gold group-hover:text-charcoal group-hover:scale-110",
                      )}
                    >
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                        {d.category}
                      </p>
                      <h3 className="font-serif text-2xl text-ivory mt-1 group-hover:text-gold transition-colors">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-stone line-clamp-2">
                        {d.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-gold/10 pt-3 text-[11px] font-semibold tracking-wider text-gold uppercase">
                      <span>{active ? "Sedang Diputar" : "Putar Video"}</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
