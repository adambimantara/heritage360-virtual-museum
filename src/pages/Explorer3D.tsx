import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Expand,
  Film,
  Headphones,
  Minimize,
  MousePointer2,
  Pause,
  Play,
  RefreshCw,
  Rotate3d,
  ZoomIn,
  ZoomOut,
  MapPin,
  X,
  Box,
  Upload,
  Info,
} from "lucide-react";
import { COLLECTION_HOTSPOTS, HOTSPOTS, STORIES, type HotspotId } from "../data";
import { Link, navigate } from "../lib/router";
import { useStore } from "../lib/store";
import { Logo } from "../components/Layout";
import { VisualView } from "../components/Art";
import { AudioGuide } from "../components/AudioGuide";
import { FavoriteButton } from "../components/CollectionCard";
import { Button, ErrorState, LinkButton, Spinner, cx } from "../components/ui";
import type { ViewerApi } from "../components/three/UniversalViewer";

const UniversalArtifactViewer = lazy(() => import("../components/three/UniversalViewer"));

function ToolButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cx(
        "group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 cursor-pointer sm:h-10 sm:w-10",
        active
          ? "bg-gold text-charcoal"
          : "text-ivory/85 hover:bg-ivory/10 hover:text-gold active:scale-90",
      )}
    >
      {children}
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-ink px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-ivory uppercase opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        {label}
      </span>
    </button>
  );
}

export default function Explorer3D({ id, query }: { id: string; query: string }) {
  const { collections } = useStore();
  const c = collections.find((x) => x.id === id);
  const api = useRef<ViewerApi | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const zoomLabel = useRef<HTMLSpanElement>(null);
  const angleLabel = useRef<HTMLSpanElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [auto, setAuto] = useState(false);
  const [full, setFull] = useState(false);
  const [hotspots, setHotspots] = useState(true);
  const [active, setActive] = useState<HotspotId | null>(null);
  const [hint, setHint] = useState(true);
  const [audio, setAudio] = useState(query.includes("audio=1"));
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [uploadedModelName, setUploadedModelName] = useState<string | null>(null);
  const [uploadedModelUrl, setUploadedModelUrl] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);

  useEffect(() => {
    if (!lastAction) return;
    const t = setTimeout(() => setLastAction(null), 1400);
    return () => clearTimeout(t);
  }, [lastAction]);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (!c)
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
        <ErrorState
          title="Artefak Tidak Ditemukan"
          action={<LinkButton to="/explore">Kembali ke Koleksi</LinkButton>}
        />
      </div>
    );

  const act = (label: string, fn: () => void) => {
    fn();
    setHint(false);
    setLastAction(label);
  };

  const toggleFull = () =>
    document.fullscreenElement ? document.exitFullscreen() : stage.current?.requestFullscreen?.();

  const itemHotspots = COLLECTION_HOTSPOTS[c.id] || HOTSPOTS;
  const hs = itemHotspots.find((h) => h.id === active);
  const story = STORIES.find((s) => s.related === c.id);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (/\.(glb|gltf)$/i.test(file.name)) {
        setUploadedModelName(file.name);
        const url = URL.createObjectURL(file);
        setUploadedModelUrl(url);
        setLastAction(`File 3D Dimuat: ${file.name}`);
      } else {
        alert("Mohon pilih file model 3D berformat .glb atau .gltf");
      }
    }
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-charcoal">
      {/* Top bar */}
      <header className="z-20 flex items-center justify-between gap-4 border-b border-gold/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to={`/collection/${c.id}`}
            className="flex h-11 items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-cream uppercase hover:text-gold"
          >
            <ArrowLeft size={16} />{" "}
            <span className="hidden sm:inline">Kembali ke Detail Artefak</span>
          </Link>
          <span className="hidden h-6 w-px bg-gold/20 sm:block" />
          <Logo className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 border border-gold/30 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase sm:flex">
            <Box size={12} /> Penjelajah Objek 3D
          </span>
          <FavoriteButton id={c.id} />
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Stage 3D Viewer / Fallback */}
        <div
          ref={stage}
          className="relative h-[62svh] min-h-[420px] overflow-hidden bg-charcoal lg:h-auto lg:flex-1"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#30281f_0%,#1b1815_45%,#100f0d_85%)]" />
          <div className="absolute top-1/2 left-1/2 h-[72%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.08]" />

          {/* 3D Canvas Stage - Active for ALL Collections */}
          <div
            className="absolute inset-0"
            onPointerDown={() => setHint(false)}
            onWheel={() => setHint(false)}
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center gap-3 text-[12px] tracking-[0.16em] text-stone uppercase">
                  <Spinner /> Memuat model 3D interaktif...
                </div>
              }
            >
              <UniversalArtifactViewer
                collectionId={c.id}
                customModelUrl={uploadedModelUrl || undefined}
                apiRef={api}
                autoRotate={auto}
                showHotspots={hotspots}
                activeHotspot={active}
                onHotspot={(h) => setActive((a) => (a === h ? null : h))}
                zoomLabel={zoomLabel}
                angleLabel={angleLabel}
                fallback={
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <VisualView visual={c.visual} className="h-[70%] aspect-[4/5]" />
                    <p className="text-[12px] text-stone">
                      Render WebGL tidak didukung pada peramban ini. Menampilkan gambar diam
                      representatif.
                    </p>
                  </div>
                }
              />
            </Suspense>
          </div>

          {/* Indicators for Active 3D */}
          <>
            <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-col gap-0.5">
              <p className="eyebrow text-[10px]">Inventaris No. {c.no}</p>
              <p className="font-serif text-2xl text-ivory sm:text-3xl">{c.name}</p>
              <p className="text-[11px] text-gold/80 italic">{c.localName}</p>
            </div>

            <div className="pointer-events-none absolute top-4 right-4 z-10 flex gap-4 text-right">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.2em] text-stone uppercase">
                  Perbesaran
                </p>
                <span ref={zoomLabel} className="font-serif text-xl text-ivory tabular-nums">
                  100%
                </span>
              </div>
              <div>
                <p className="text-[9px] font-semibold tracking-[0.2em] text-stone uppercase">
                  Sudut Rotasi
                </p>
                <span ref={angleLabel} className="font-serif text-xl text-ivory tabular-nums">
                  0°
                </span>
              </div>
            </div>

            {/* Interaction Hint */}
            <div
              className={cx(
                "pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-700",
                hint ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink/60 text-gold backdrop-blur">
                <MousePointer2 size={20} />
              </span>
              <span className="bg-ink/80 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-ivory uppercase backdrop-blur rounded-[2px] border border-gold/20">
                Tahan & Geser untuk Memutar · Gulir untuk Zoom
              </span>
            </div>

            {lastAction && (
              <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 border border-gold/30 bg-ink/90 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase animate-fade-up">
                {lastAction}
              </div>
            )}

            {/* Hotspot card */}
            {hs && (
              <div className="absolute bottom-28 left-4 max-w-xs border border-gold/30 bg-umber/95 p-5 shadow-2xl backdrop-blur animate-fade-up sm:left-6">
                <button
                  onClick={() => setActive(null)}
                  aria-label="Tutup detail"
                  className="absolute top-3 right-3 p-1 text-stone hover:text-gold cursor-pointer"
                >
                  <X size={15} />
                </button>
                <p className="eyebrow mb-2 text-[10px]">
                  Anatomi {itemHotspots.findIndex((h) => h.id === hs.id) + 1} dari{" "}
                  {itemHotspots.length}
                </p>
                <p className="mb-2 font-serif text-2xl text-ivory">{hs.title}</p>
                <p className="text-[13px] leading-relaxed text-cream/90">{hs.text}</p>
              </div>
            )}

            {/* Toolbar Controls */}
            <div className="absolute inset-x-0 bottom-5 flex justify-center px-3">
              <div
                className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-gold/20 bg-ink/85 p-1.5 shadow-2xl backdrop-blur-md"
                role="toolbar"
                aria-label="Kontrol viewer 3D"
              >
                <ToolButton
                  label="Putar 360°"
                  onClick={() => act("Putar 360°", () => api.current?.spin())}
                >
                  <Rotate3d size={18} strokeWidth={1.6} />
                </ToolButton>
                <ToolButton
                  label="Perbesar (Zoom In)"
                  onClick={() => act("Perbesar Tampilan", () => api.current?.zoomIn())}
                >
                  <ZoomIn size={18} strokeWidth={1.6} />
                </ToolButton>
                <ToolButton
                  label="Perkecil (Zoom Out)"
                  onClick={() => act("Perkecil Tampilan", () => api.current?.zoomOut())}
                >
                  <ZoomOut size={18} strokeWidth={1.6} />
                </ToolButton>
                <ToolButton
                  label="Kembalikan Posisi Awal"
                  onClick={() =>
                    act("Posisi Semula", () => {
                      api.current?.reset();
                      setAuto(false);
                    })
                  }
                >
                  <RefreshCw size={17} strokeWidth={1.6} />
                </ToolButton>
                <span className="mx-1 h-6 w-px shrink-0 bg-gold/20" />
                <ToolButton
                  label={auto ? "Hentikan Putaran Otomatis" : "Putaran Otomatis"}
                  active={auto}
                  onClick={() =>
                    act(auto ? "Auto Rotasi Berhenti" : "Auto Rotasi Berjalan", () =>
                      setAuto((a) => !a),
                    )
                  }
                >
                  {auto ? (
                    <Pause size={16} fill="currentColor" />
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                </ToolButton>
                <ToolButton
                  label={hotspots ? "Sembunyikan Hotspot" : "Tampilkan Hotspot"}
                  active={hotspots}
                  onClick={() => {
                    setHotspots((h) => !h);
                    setActive(null);
                  }}
                >
                  <MapPin size={17} strokeWidth={1.6} />
                </ToolButton>
                <ToolButton
                  label={full ? "Keluar Layar Penuh" : "Mode Layar Penuh"}
                  onClick={toggleFull}
                >
                  {full ? (
                    <Minimize size={17} strokeWidth={1.6} />
                  ) : (
                    <Expand size={17} strokeWidth={1.6} />
                  )}
                </ToolButton>
              </div>
            </div>
          </>
        </div>

        {/* Info panel */}
        <aside className="flex w-full flex-col border-t border-gold/10 bg-umber/60 lg:w-[420px] lg:border-t-0 lg:border-l xl:w-[460px]">
          <div className="flex flex-col gap-7 p-6 sm:p-8 lg:max-h-[calc(100svh-69px)] lg:overflow-y-auto">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
                Nama Objek Budaya
              </p>
              <h1 className="display mt-2 text-4xl sm:text-5xl text-ivory">{c.name}</h1>
              <p className="font-serif text-xl text-gold/90 italic mt-1">{c.localName}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-gold/15 py-6">
              {[
                ["Asal Daerah", `${c.origin}, Yogyakarta`],
                ["Kategori", c.category],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg leading-snug text-ivory">{v}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
                  Bahan Pembuatan
                </dt>
                <dd className="mt-1.5 text-[14px] leading-relaxed text-cream">{c.material}</dd>
              </div>
            </dl>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
                Deskripsi Singkat
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-cream/90">{c.short}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" onClick={() => setAudio((a) => !a)} aria-expanded={audio}>
                <Headphones size={16} /> {audio ? "Tutup Panduan Audio" : "Dengarkan Panduan Audio"}
              </Button>
              {audio && (
                <AudioGuide
                  artifact={c.name}
                  narration={c.audioNarration}
                  onClose={() => setAudio(false)}
                  className="animate-fade-up"
                />
              )}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(story ? `/stories/${story.id}` : `/collection/${c.id}`)}
                >
                  <BookOpen size={15} /> Kisah Lengkap
                </Button>
                <Button variant="outline" onClick={() => navigate("/documentary")}>
                  <Film size={15} /> Dokumenter
                </Button>
              </div>
            </div>

            {/* Hotspots List if 3D */}
            {c.has3D && (
              <div>
                <p className="eyebrow mb-4">Anatomi & Titik Detail Budaya</p>
                <ul className="flex flex-col">
                  {itemHotspots.map((h, i) => (
                    <li key={h.id}>
                      <button
                        onClick={() => {
                          setHotspots(true);
                          setActive((a) => (a === h.id ? null : h.id));
                        }}
                        aria-pressed={active === h.id}
                        className={cx(
                          "flex w-full items-center gap-4 border-b border-gold/10 py-3 text-left transition-colors cursor-pointer",
                          active === h.id ? "text-gold" : "text-cream hover:text-ivory",
                        )}
                      >
                        <span
                          className={cx(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                            active === h.id
                              ? "border-gold bg-gold text-charcoal"
                              : "border-gold/40 text-gold",
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="font-serif text-lg">{h.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] leading-relaxed text-stone">
                  *Model 3D interaktif 360° dirender langsung secara geometris di peramban.
                  Mendukung file pemindaian fotogrametri .glb untuk pembaruan arsip masa depan.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
