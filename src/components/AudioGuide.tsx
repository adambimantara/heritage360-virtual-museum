import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, RotateCcw, Waves, X, Headphones } from "lucide-react";
import { AUDIO_NARRATION, formatTime } from "../data";
import { cx } from "./ui";

type Lang = "id" | "en";

/** Soft ambient drone generated with Web Audio. Only created on explicit user action. */
function useAmbient(volume: number) {
  const ref = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const [on, setOn] = useState(false);
  const start = useCallback(() => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.connect(gain).connect(ctx.destination);
    [98, 147, 196.5, 294].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "triangle" : "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07 + i * 0.03;
      const lg = ctx.createGain();
      lg.gain.value = 0.05 / (i + 1);
      lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(filter);
      o.start();
      lfo.start();
    });
    gain.gain.linearRampToValueAtTime(0.5 * volume, ctx.currentTime + 1.5);
    ref.current = { ctx, gain };
    setOn(true);
  }, [volume]);
  const stop = useCallback(() => {
    const r = ref.current;
    if (r) {
      r.gain.gain.linearRampToValueAtTime(0, r.ctx.currentTime + 0.6);
      setTimeout(() => r.ctx.close(), 700);
    }
    ref.current = null;
    setOn(false);
  }, []);
  useEffect(() => {
    const r = ref.current;
    if (r) r.gain.gain.setTargetAtTime(0.5 * volume, r.ctx.currentTime, 0.2);
  }, [volume]);
  useEffect(() => () => void ref.current?.ctx.close(), []);
  return { on, toggle: () => (on ? stop() : start()) };
}

export function AudioGuide({
  artifact = "Keris Yogyakarta",
  narration,
  onClose,
  className,
}: {
  artifact?: string;
  narration?: string[];
  onClose?: () => void;
  className?: string;
}) {
  const [lang, setLang] = useState<Lang>("id");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const ambient = useAmbient(muted ? 0 : volume);
  const spokenSeg = useRef(-1);

  const segments = useMemo(() => {
    let at = 0;
    const lines =
      lang === "id" && narration && narration.length > 0 ? narration : AUDIO_NARRATION[lang];
    return lines.map((text) => {
      const d = Math.max(3.2, text.split(" ").length / 2.3);
      const s = { text, at, d };
      at += d;
      return s;
    });
  }, [lang, narration]);
  const total = segments.reduce((a, s) => a + s.d, 0);
  const segIndex = Math.max(
    0,
    segments.findIndex((s) => t >= s.at && t < s.at + s.d),
  );
  const current = segments[t >= total ? segments.length - 1 : segIndex] || { text: "" };

  const synth =
    typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;

  // Clock
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => {
        const n = v + dt;
        if (n >= total) {
          setPlaying(false);
          return total;
        }
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  // Voice narration synced to the active segment
  useEffect(() => {
    if (!synth) return;
    if (!playing) {
      synth.cancel();
      spokenSeg.current = -1;
      return;
    }
    if (spokenSeg.current === segIndex) return;
    spokenSeg.current = segIndex;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(segments[segIndex].text);
    u.lang = lang === "id" ? "id-ID" : "en-GB";
    u.rate = 0.95;
    u.volume = muted ? 0 : volume;
    synth.speak(u);
  }, [playing, segIndex, segments, lang, synth, muted, volume]);

  useEffect(() => () => synth?.cancel(), [synth]);

  const toggle = () => {
    if (t >= total) setT(0);
    setPlaying((p) => !p);
  };
  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setPlaying(false);
    setT(0);
    setLang(l);
  };
  const pct = (t / total) * 100;

  return (
    <div
      className={cx(
        "relative w-full border border-gold/25 bg-umber/95 p-5 shadow-2xl backdrop-blur-md sm:p-6",
        className,
      )}
      role="region"
      aria-label="Audio guide"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Headphones size={17} strokeWidth={1.5} />
          </span>
          <div>
            <p className="eyebrow text-[10px]">Panduan Audio · Trek Terpilih</p>
            <p className="font-serif text-xl leading-tight text-ivory">{artifact}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="flex border border-ivory/15 p-0.5"
            role="group"
            aria-label="Bahasa narasi"
          >
            {(["id", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                aria-pressed={lang === l}
                className={cx(
                  "h-8 px-3 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors cursor-pointer",
                  lang === l ? "bg-gold text-charcoal" : "text-stone hover:text-ivory",
                )}
              >
                {l === "id" ? "ID" : "EN"}
              </button>
            ))}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Tutup panduan audio"
              className="p-2 text-stone hover:text-gold cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <p
        className="mb-5 min-h-[3.2em] font-serif text-[19px] leading-snug text-cream italic"
        aria-live="polite"
      >
        “{current.text}”
      </p>

      {/* waveform */}
      <div className="mb-2 flex h-8 items-end gap-[3px]" aria-hidden>
        {Array.from({ length: 56 }, (_, i) => {
          const h = 20 + Math.abs(Math.sin(i * 1.7) * 60 + Math.sin(i * 0.45) * 25);
          const done = (i / 56) * 100 < pct;
          return (
            <span
              key={i}
              className={cx(
                "flex-1 rounded-full transition-colors",
                done ? "bg-gold" : "bg-ivory/15",
                playing && done && "animate-pulse",
              )}
              style={{ height: `${Math.min(100, h)}%` }}
            />
          );
        })}
      </div>
      <input
        type="range"
        min={0}
        max={total}
        step={0.1}
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        aria-label="Geser waktu narasi"
        className="h-1 w-full cursor-pointer"
      />
      <div className="mt-1 flex justify-between text-[11px] tabular-nums text-stone">
        <span>{formatTime(t)}</span>
        <span>{formatTime(total)}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={playing ? "Jeda panduan audio" : "Putar panduan audio"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-charcoal transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {playing ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            onClick={() => {
              setT(0);
              spokenSeg.current = -1;
            }}
            aria-label="Ulangi dari awal"
            className="p-2 text-stone hover:text-gold cursor-pointer"
          >
            <RotateCcw size={17} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Nyalakan suara" : "Bisukan suara"}
            className="p-2 text-stone hover:text-gold cursor-pointer"
          >
            {muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            aria-label="Volume audio"
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-gold/15 pt-4">
        <span className="flex items-center gap-2 text-[12px] text-cream">
          <Waves size={15} className="text-gold" /> Dengung gamelan pelog ambient
        </span>
        <button
          role="switch"
          aria-checked={ambient.on}
          aria-label="Suara latar gamelan ambient"
          onClick={ambient.toggle}
          className={cx(
            "relative h-6 w-11 rounded-full border transition-colors cursor-pointer",
            ambient.on ? "border-gold bg-gold/30" : "border-ivory/20 bg-ink/40",
          )}
        >
          <span
            className={cx(
              "absolute top-0.5 h-4.5 w-4.5 rounded-full transition-all",
              ambient.on ? "left-5.5 bg-gold" : "left-0.5 bg-stone",
            )}
          />
        </button>
      </div>
      {!synth && (
        <p className="mt-3 text-[11px] text-stone">
          Fitur sintesis suara peramban tidak didukung pada peramban ini. Teks transkrip narasi
          ditampilkan di atas.
        </p>
      )}
    </div>
  );
}
