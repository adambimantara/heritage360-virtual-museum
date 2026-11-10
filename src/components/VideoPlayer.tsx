import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Pause,
  Play,
  Subtitles,
  Volume2,
  VolumeX,
  Settings2,
  Video,
  Film,
} from "lucide-react";
import { formatTime, type Documentary } from "../data";
import { cx } from "./ui";

type Sub = "off" | "id" | "en";
const QUALITIES = ["1080p", "720p", "480p"] as const;

export function VideoPlayer({
  doc,
  autoPlay = false,
  className,
}: {
  doc: Documentary;
  autoPlay?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const [t, setT] = useState(0);
  const [muted, setMuted] = useState(false);
  const [sub, setSub] = useState<Sub>("id");
  const [quality, setQuality] = useState<(typeof QUALITIES)[number]>("1080p");
  const [menu, setMenu] = useState<null | "sub" | "quality">(null);
  const [mode, setMode] = useState<"youtube" | "cinematic">("youtube");
  const box = useRef<HTMLDivElement>(null);

  const youtubeId = doc.youtubeId || "xFCq8qMzy1s";

  useEffect(() => {
    setT(0);
    setPlaying(autoPlay);
  }, [doc.id, autoPlay]);

  useEffect(() => {
    if (!playing || mode === "youtube") return;
    const id = setInterval(
      () => setT((v) => (v + 0.25 >= doc.duration ? (setPlaying(false), doc.duration) : v + 0.25)),
      250,
    );
    return () => clearInterval(id);
  }, [playing, doc.duration, mode]);

  const cueTime = t % 30;
  const cue = [...doc.cues].reverse().find((c) => cueTime >= c.at);
  const pct = (t / doc.duration) * 100;

  return (
    <div
      ref={box}
      className={cx(
        "group relative aspect-video w-full overflow-hidden bg-ink select-none border border-gold/25 shadow-2xl",
        className,
      )}
    >
      {/* Real YouTube Video Player Stream */}
      {playing && mode === "youtube" ? (
        <div className="relative h-full w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&color=white`}
            title={doc.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
          {/* Floating mode switcher back to poster */}
          <div className="absolute top-3 right-3 z-20 flex gap-2">
            <button
              onClick={() => setPlaying(false)}
              className="flex items-center gap-1.5 rounded-[2px] border border-gold/40 bg-ink/85 px-3 py-1 text-[11px] font-semibold text-gold backdrop-blur hover:bg-gold hover:text-charcoal cursor-pointer transition-colors"
            >
              <Film size={13} /> Tutup Video
            </button>
          </div>
        </div>
      ) : (
        /* Poster / Museum Preview Player */
        <>
          <img
            src={doc.thumb}
            alt={doc.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              animation:
                playing && mode === "cinematic"
                  ? "kenburns 24s ease-in-out infinite alternate"
                  : undefined,
              filter: playing && mode === "cinematic" ? "none" : "brightness(0.65)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            <span className="bg-gold px-2.5 py-0.5 text-[10px] font-bold tracking-[0.16em] text-charcoal uppercase rounded-[2px]">
              Dokumenter Asli HD · {quality}
            </span>
            <span className="bg-ink/80 px-2.5 py-0.5 text-[10px] tracking-wide text-cream backdrop-blur rounded-[2px] border border-gold/20">
              {doc.thumbNote}
            </span>
          </div>

          {/* Big Play Button Overlay */}
          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => {
                  setPlaying(true);
                  setMode("youtube");
                }}
                aria-label="Putar video dokumenter asli"
                className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-ink/70 text-gold shadow-2xl backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-charcoal cursor-pointer"
              >
                <Play
                  size={30}
                  fill="currentColor"
                  className="ml-1 transition-transform group-hover:scale-105"
                />
              </button>
              <span className="rounded-[2px] bg-ink/80 px-3 py-1 font-serif text-[13px] tracking-wider text-ivory border border-gold/30">
                Klik untuk Memutar Video Dokumenter
              </span>
            </div>
          )}

          {/* Subtitles Overlay in cinematic mode */}
          {sub !== "off" && t > 0 && cue && mode === "cinematic" && (
            <p className="pointer-events-none absolute inset-x-0 bottom-20 z-10 px-6 text-center">
              <span className="bg-ink/85 px-4 py-1.5 text-[14px] leading-loose text-ivory sm:text-[16px] rounded border border-gold/20 shadow-lg">
                {cue[sub]}
              </span>
            </p>
          )}

          {/* Bottom Bar Controls for Museum mode */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-3 sm:px-5 bg-gradient-to-t from-ink via-ink/80 to-transparent pt-6">
            <input
              type="range"
              min={0}
              max={doc.duration}
              step={1}
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
              aria-label="Geser waktu pemutaran video"
              className="h-1 w-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, #b89a62 ${pct}%, rgba(241,235,221,.2) ${pct}%)`,
              }}
            />
            <div className="mt-2 flex items-center gap-2 text-ivory sm:gap-3">
              <button
                onClick={() => {
                  setMode("youtube");
                  setPlaying((p) => !p);
                }}
                aria-label={playing ? "Jeda" : "Putar"}
                className="p-2 hover:text-gold cursor-pointer transition-colors"
              >
                {playing ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" />
                )}
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Nyalakan suara" : "Bisukan suara"}
                className="p-2 hover:text-gold cursor-pointer transition-colors"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <span className="text-[12px] tabular-nums text-cream font-mono">
                {formatTime(t)} / {formatTime(doc.duration)}
              </span>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    setPlaying(true);
                    setMode("youtube");
                  }}
                  className="flex items-center gap-1.5 rounded-[2px] border border-gold/30 bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-gold hover:bg-gold hover:text-charcoal cursor-pointer transition-colors"
                >
                  <Video size={13} /> Mode YouTube
                </button>

                <div className="relative">
                  <button
                    onClick={() => setMenu(menu === "sub" ? null : "sub")}
                    aria-label="Pengaturan Takarir"
                    aria-expanded={menu === "sub"}
                    className={cx(
                      "flex items-center gap-1 p-2 text-[11px] font-semibold uppercase cursor-pointer transition-colors",
                      sub !== "off" ? "text-gold" : "hover:text-gold",
                    )}
                  >
                    <Subtitles size={17} />{" "}
                    <span className="hidden sm:inline">
                      {sub === "off" ? "Mati" : sub.toUpperCase()}
                    </span>
                  </button>
                  {menu === "sub" && (
                    <Menu
                      title="Pilihan Takarir"
                      value={sub}
                      options={[
                        { v: "off", l: "Nonaktif" },
                        { v: "id", l: "Bahasa Indonesia" },
                        { v: "en", l: "English" },
                      ]}
                      onPick={(v) => {
                        setSub(v as Sub);
                        setMenu(null);
                      }}
                    />
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setMenu(menu === "quality" ? null : "quality")}
                    aria-label="Pilih Kualitas Video"
                    aria-expanded={menu === "quality"}
                    className="flex items-center gap-1 p-2 text-[11px] font-semibold hover:text-gold cursor-pointer transition-colors"
                  >
                    <Settings2 size={17} /> <span className="hidden sm:inline">{quality}</span>
                  </button>
                  {menu === "quality" && (
                    <Menu
                      title="Kualitas Video"
                      value={quality}
                      options={QUALITIES.map((q) => ({
                        v: q,
                        l: q === "1080p" ? "1080p Full HD" : q,
                      }))}
                      onPick={(v) => {
                        setQuality(v as (typeof QUALITIES)[number]);
                        setMenu(null);
                      }}
                    />
                  )}
                </div>

                <button
                  onClick={() =>
                    document.fullscreenElement
                      ? document.exitFullscreen()
                      : box.current?.requestFullscreen?.()
                  }
                  aria-label="Layar Penuh"
                  className="p-2 hover:text-gold cursor-pointer transition-colors"
                >
                  <Maximize size={17} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Menu({
  title,
  value,
  options,
  onPick,
}: {
  title: string;
  value: string;
  options: { v: string; l: string }[];
  onPick: (v: string) => void;
}) {
  return (
    <div className="absolute right-0 bottom-12 z-30 min-w-44 border border-gold/30 bg-umber py-2 shadow-2xl rounded-[2px] animate-fade-up">
      <p className="px-4 pb-2 text-[10px] font-semibold tracking-[0.18em] text-stone uppercase border-b border-gold/10">
        {title}
      </p>
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onPick(o.v)}
          className={cx(
            "flex w-full items-center justify-between px-4 py-2 text-left text-[13px] cursor-pointer transition-colors",
            value === o.v ? "text-gold bg-gold/10" : "text-ivory hover:bg-ink/50",
          )}
        >
          {o.l}
          {value === o.v && <span className="h-1.5 w-1.5 rotate-45 bg-gold" />}
        </button>
      ))}
    </div>
  );
}
