import { useId } from "react";
import { Info } from "lucide-react";
import type { ArtKind, Visual } from "../data";
import { bladeOutline, lukOffset } from "../lib/keris";
import { cx } from "./ui";

function KerisArt() {
  const uid = useId().replace(/:/g, "");
  const S = 360;
  const bx = 200;
  const by = 410;
  const pts = bladeOutline(160).map(
    ([x, y]) => `${(bx + x * S).toFixed(1)},${(by - y * S).toFixed(1)}`,
  );
  const blade = `M${pts.join(" L")} Z`;
  const pamorLines = Array.from({ length: 11 }, (_, k) => {
    const off = (k - 5) * 4.2;
    const p: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const x = bx + lukOffset(t) * S + off * (1 - t * 0.85) + Math.sin(t * 38 + k * 1.7) * 1.6;
      p.push(`${x.toFixed(1)},${(by - t * S).toFixed(1)}`);
    }
    return "M" + p.join(" L");
  });
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`bg${uid}`} cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#3a3027" />
          <stop offset="0.55" stopColor="#1d1a16" />
          <stop offset="1" stopColor="#100f0d" />
        </radialGradient>
        <linearGradient id={`steel${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#2d2b28" />
          <stop offset="0.45" stopColor="#8b857b" />
          <stop offset="0.55" stopColor="#5d5850" />
          <stop offset="1" stopColor="#1f1d1a" />
        </linearGradient>
        <linearGradient id={`wood${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#2a1a10" />
          <stop offset="0.5" stopColor="#6b4529" />
          <stop offset="1" stopColor="#24160d" />
        </linearGradient>
        <linearGradient id={`gold${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#6e5630" />
          <stop offset="0.5" stopColor="#e2c88e" />
          <stop offset="1" stopColor="#6e5630" />
        </linearGradient>
        <clipPath id={`clip${uid}`}>
          <path d={blade} />
        </clipPath>
      </defs>
      <rect width="400" height="560" fill={`url(#bg${uid})`} />
      <ellipse cx="200" cy="520" rx="120" ry="10" fill="#000" opacity="0.5" />
      <g transform="rotate(-14 200 300)">
        <path d={blade} fill={`url(#steel${uid})`} />
        <g
          clipPath={`url(#clip${uid})`}
          fill="none"
          stroke="#d9d2c3"
          strokeWidth="0.8"
          opacity="0.55"
        >
          {pamorLines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path d={blade} fill="none" stroke="#cfc7b6" strokeOpacity="0.35" strokeWidth="0.8" />
        {/* ganja */}
        <path
          d="M160 410 L242 410 Q250 416 242 422 L168 422 Z"
          fill="#3a3631"
          stroke="#9c9486"
          strokeOpacity=".4"
          strokeWidth=".6"
        />
        {/* mendak */}
        <rect x="186" y="422" width="30" height="9" rx="3" fill={`url(#gold${uid})`} />
        {/* ukiran (hilt) */}
        <path
          d="M190 431 C182 452, 176 470, 184 492 C190 508, 214 512, 220 496 C226 478, 214 466, 216 452 C218 442, 214 434, 212 431 Z"
          fill={`url(#wood${uid})`}
        />
        <path
          d="M192 446 C200 452, 206 452, 212 446 M188 466 C198 472, 208 472, 216 466 M188 486 C198 490, 210 490, 218 484"
          stroke="#b89a62"
          strokeOpacity=".35"
          fill="none"
          strokeWidth=".7"
        />
      </g>
      <circle cx="200" cy="140" r="160" fill="#b89a62" opacity="0.05" />
    </svg>
  );
}

function PamorArt() {
  const lines = Array.from({ length: 22 }, (_, k) => {
    const p: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const y = (i / 80) * 600 - 20;
      const x = k * 20 - 20 + Math.sin(y / 38 + k * 0.9) * 9 + Math.sin(y / 11 + k) * 2.4;
      p.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return "M" + p.join(" L");
  });
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="400" height="560" fill="#24221f" />
      <g fill="none" stroke="#bfb7a6" strokeWidth="1.4" opacity="0.5">
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="none" stroke="#6f6a61" strokeWidth="3" opacity="0.35" transform="translate(9 0)">
        {lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

function TopengArt() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`tbg${uid}`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#3b2f24" />
          <stop offset="1" stopColor="#120f0c" />
        </radialGradient>
        <radialGradient id={`face${uid}`} cx="42%" cy="35%" r="70%">
          <stop offset="0" stopColor="#f6efdf" />
          <stop offset="0.6" stopColor="#ddd1b8" />
          <stop offset="1" stopColor="#9d8f75" />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill={`url(#tbg${uid})`} />
      <ellipse cx="200" cy="505" rx="110" ry="9" fill="#000" opacity=".5" />
      {/* face */}
      <path
        d="M200 120 C268 120, 300 180, 298 262 C296 342, 252 418, 200 424 C148 418, 104 342, 102 262 C100 180, 132 120, 200 120 Z"
        fill={`url(#face${uid})`}
      />
      {/* hairline & crown band */}
      <path
        d="M108 222 C120 160, 160 126, 200 126 C240 126, 280 160, 292 222 C270 196, 236 184, 200 184 C164 184, 130 196, 108 222 Z"
        fill="#1b1612"
      />
      <path d="M118 200 C150 174, 250 174, 282 200" stroke="#b89a62" strokeWidth="3" fill="none" />
      <circle cx="200" cy="176" r="6" fill="#b89a62" />
      {/* brows */}
      <path
        d="M140 246 C158 236, 178 236, 190 244"
        stroke="#1b1612"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M260 246 C242 236, 222 236, 210 244"
        stroke="#1b1612"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* downcast almond eyes */}
      <path d="M146 270 C160 262, 178 264, 188 272 C176 276, 158 276, 146 270 Z" fill="#1b1612" />
      <path d="M254 270 C240 262, 222 264, 212 272 C224 276, 242 276, 254 270 Z" fill="#1b1612" />
      {/* nose */}
      <path
        d="M200 262 C198 292, 194 318, 190 330 C196 336, 204 336, 210 330"
        stroke="#8a7a5e"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* moustache & mouth */}
      <path
        d="M176 352 C188 346, 196 348, 200 352 C204 348, 212 346, 224 352"
        stroke="#1b1612"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M184 366 C194 374, 206 374, 216 366 C206 368, 194 368, 184 366 Z" fill="#8c3b2c" />
      {/* cheek light */}
      <ellipse cx="160" cy="312" rx="20" ry="12" fill="#fff" opacity=".12" />
      <path
        d="M200 120 C268 120, 300 180, 298 262 C296 342, 252 418, 200 424 C148 418, 104 342, 102 262 C100 180, 132 120, 200 120 Z"
        fill="none"
        stroke="#b89a62"
        strokeOpacity=".25"
      />
    </svg>
  );
}

function KawungArt() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id={`kw${uid}`} width="64" height="64" patternUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="#3a2416" />
          {[
            [16, 16, 45],
            [48, 16, -45],
            [16, 48, -45],
            [48, 48, 45],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <ellipse rx="20" ry="10.5" fill="#d8c49c" />
              <ellipse rx="20" ry="10.5" fill="none" stroke="#2a190e" strokeWidth="1.4" />
              <ellipse rx="11" ry="4.6" fill="#7a4e2c" />
              <circle r="1.6" fill="#f1ebdd" />
            </g>
          ))}
          <rect x="29" y="29" width="6" height="6" transform="rotate(45 32 32)" fill="#b89a62" />
          <rect x="-3" y="-3" width="6" height="6" transform="rotate(45 0 0)" fill="#b89a62" />
        </pattern>
      </defs>
      <rect width="400" height="560" fill={`url(#kw${uid})`} />
    </svg>
  );
}

function ParangArt() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern
          id={`pr${uid}`}
          width="44"
          height="60"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="44" height="60" fill="#e6dac2" />
          <rect y="0" width="44" height="6" fill="#3a2416" />
          <path
            d="M-6 12 C14 12, 26 50, 50 50"
            stroke="#3a2416"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-6 12 C14 12, 26 50, 50 50"
            stroke="#7a4e2c"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M-6 12 C14 12, 26 50, 50 50" stroke="#e6dac2" strokeWidth="1" fill="none" />
          <rect x="18" y="-1" width="8" height="8" transform="rotate(45 22 3)" fill="#b89a62" />
        </pattern>
      </defs>
      <rect width="400" height="560" fill={`url(#pr${uid})`} />
    </svg>
  );
}

function LurikArt() {
  const stripes = [
    ["#2b2119", 22],
    ["#7a4e2c", 4],
    ["#2b2119", 6],
    ["#d9cfbc", 2],
    ["#2b2119", 6],
    ["#7a4e2c", 4],
    ["#3d3026", 18],
    ["#b89a62", 2],
    ["#3d3026", 4],
    ["#b89a62", 2],
    ["#3d3026", 14],
    ["#a6a097", 3],
  ] as const;
  let x = 0;
  const rects: { x: number; w: number; c: string }[] = [];
  while (x < 400) {
    for (const [c, w] of stripes) {
      rects.push({ x, w, c });
      x += w;
    }
  }
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} width={r.w} height="560" fill={r.c} />
      ))}
      <g opacity=".08" stroke="#000">
        {Array.from({ length: 140 }, (_, i) => (
          <line key={i} x1="0" x2="400" y1={i * 4} y2={i * 4} />
        ))}
      </g>
    </svg>
  );
}

export function Art({ art }: { art: ArtKind }) {
  switch (art) {
    case "keris":
      return <KerisArt />;
    case "pamor":
      return <PamorArt />;
    case "topeng":
      return <TopengArt />;
    case "kawung":
      return <KawungArt />;
    case "parang":
      return <ParangArt />;
    case "lurik":
      return <LurikArt />;
  }
}

export function VisualView({
  visual,
  className,
  imgClassName,
  showNote,
  eager,
}: {
  visual: Visual;
  className?: string;
  imgClassName?: string;
  showNote?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={cx("relative overflow-hidden bg-umber", className)}>
      {visual.kind === "photo" ? (
        <img
          src={visual.src}
          alt={visual.alt}
          loading={eager ? "eager" : "lazy"}
          className={cx("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <div role="img" aria-label={visual.alt} className={cx("h-full w-full", imgClassName)}>
          <Art art={visual.art} />
        </div>
      )}
      {showNote && (
        <div className="pointer-events-none absolute bottom-3 left-3 max-w-[85%]">
          <span className="inline-flex items-center gap-1.5 bg-ink/75 px-2.5 py-1 text-[10px] tracking-wide text-cream backdrop-blur">
            <Info size={11} className="shrink-0 text-gold" />
            {visual.note ?? (visual.kind === "art" ? "Digital study render" : "Photograph")}
          </span>
        </div>
      )}
    </div>
  );
}
