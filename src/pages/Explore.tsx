import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, Box, Film, RotateCcw } from "lucide-react";
import { CATEGORIES, ORIGINS } from "../data";
import { useStore } from "../lib/store";
import { PageHeader } from "../components/Layout";
import { CollectionCard } from "../components/CollectionCard";
import {
  Button,
  CardSkeleton,
  EmptyState,
  Pagination,
  SearchBar,
  Select,
  cx,
} from "../components/ui";

const PER_PAGE = 8;

export default function Explore() {
  const { collections } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [origin, setOrigin] = useState("all");
  const [only3D, setOnly3D] = useState(false);
  const [onlyVideo, setOnlyVideo] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    const id = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(id);
  }, [q, cat, origin, only3D, onlyVideo, sort]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = collections.filter(
      (c) =>
        (cat === "all" || c.category === cat) &&
        (origin === "all" || c.origin === origin) &&
        (!only3D || c.has3D) &&
        (!onlyVideo || c.hasVideo) &&
        (!s ||
          (c.name + c.localName + c.short + c.category + c.origin + c.history + c.material)
            .toLowerCase()
            .includes(s)),
    );
    return list.sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "za"
          ? b.name.localeCompare(a.name)
          : b.addedAt.localeCompare(a.addedAt),
    );
  }, [collections, q, cat, origin, only3D, onlyVideo, sort]);

  const pages = Math.ceil(results.length / PER_PAGE);
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const origins = Array.from(new Set([...ORIGINS, ...collections.map((c) => c.origin)]));

  const clear = () => {
    setQ("");
    setCat("all");
    setOrigin("all");
    setOnly3D(false);
    setOnlyVideo(false);
    setSort("newest");
  };

  return (
    <>
      <PageHeader
        eyebrow="Galeri Warisan Budaya"
        title={
          <>
            Jelajahi Koleksi <em className="text-gold">Adiluhung</em>
          </>
        }
        aside={
          <p className="font-serif text-xl text-stone lg:text-right">
            <span className="text-5xl text-ivory">
              {String(collections.length).padStart(2, "0")}
            </span>
            <br />
            artefak dalam arsip digital
          </p>
        }
      >
        Dokumentasi komprehensif artefak bersejarah, pusaka, seni kriya, dan tekstil tradisional
        Daerah Istimewa Yogyakarta.
      </PageHeader>

      <section className="sticky top-[68px] z-30 border-b border-gold/10 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_220px_200px]">
            <SearchBar
              value={q}
              onChange={setQ}
              placeholder="Cari nama objek, nama lokal, atau bahan..."
            />
            <Select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              aria-label="Filter berdasarkan daerah asal"
              options={[
                { value: "all", label: "Semua Asal Daerah" },
                ...origins.map((o) => ({ value: o, label: o })),
              ]}
            />
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Urutkan koleksi"
              options={[
                { value: "newest", label: "Terbaru Ditambahkan" },
                { value: "az", label: "Nama A–Z" },
                { value: "za", label: "Nama Z–A" },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div
              className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
              role="group"
              aria-label="Filter kategori"
            >
              <SlidersHorizontal size={15} className="mr-1 shrink-0 text-gold" />
              {["all", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={cx(
                    "h-8 shrink-0 rounded-full border px-3.5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer",
                    cat === c
                      ? "border-gold bg-gold text-charcoal"
                      : "border-ivory/15 text-cream hover:border-gold/60 hover:text-gold",
                  )}
                >
                  {c === "all" ? "Semua Kategori" : c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnly3D((v) => !v)}
                className={cx(
                  "inline-flex h-8 items-center gap-1.5 rounded-[2px] border px-3 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer",
                  only3D
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-ivory/15 text-stone hover:text-ivory",
                )}
              >
                <Box size={12} /> Objek 3D
              </button>
              <button
                onClick={() => setOnlyVideo((v) => !v)}
                className={cx(
                  "inline-flex h-8 items-center gap-1.5 rounded-[2px] border px-3 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer",
                  onlyVideo
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-ivory/15 text-stone hover:text-ivory",
                )}
              >
                <Film size={12} /> Video Dokumenter
              </button>
              {(q || cat !== "all" || origin !== "all" || only3D || onlyVideo) && (
                <button
                  onClick={clear}
                  className="inline-flex h-8 items-center gap-1 text-[10px] tracking-[0.12em] text-stone uppercase hover:text-gold cursor-pointer"
                  title="Atur ulang filter"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between text-[12px] text-stone">
          <p>
            Menampilkan <span className="font-semibold text-ivory">{results.length}</span> artefak
            kebudayaan
            {cat !== "all" && (
              <span>
                {" "}
                dalam kategori <strong className="text-gold">{cat}</strong>
              </span>
            )}
            {origin !== "all" && (
              <span>
                {" "}
                dari <strong className="text-gold">{origin}</strong>
              </span>
            )}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title="Koleksi Tidak Ditemukan"
            action={
              <Button onClick={clear} variant="outline">
                Atur Ulang Filter
              </Button>
            }
          >
            Tidak ada artefak yang cocok dengan kriteria pencarian Anda. Silakan coba kata kunci
            lain atau pilih kategori yang berbeda.
          </EmptyState>
        ) : (
          <>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((c, i) => (
                <CollectionCard key={c.id} c={c} index={i} />
              ))}
            </div>
            {pages > 1 && (
              <div className="mt-20">
                <Pagination page={page} pages={pages} onChange={setPage} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
