import { ArrowRight, Heart, Box, Film } from "lucide-react";
import type { Collection } from "../data";
import { Link } from "../lib/router";
import { useStore } from "../lib/store";
import { VisualView } from "./Art";
import { cx } from "./ui";

export function FavoriteButton({
  id,
  className,
  withLabel,
}: {
  id: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { isFavorite, toggleFavorite } = useStore();
  const on = isFavorite(id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-pressed={on}
      aria-label={on ? "Hapus dari favorit" : "Simpan ke favorit"}
      title={on ? "Hapus dari favorit" : "Simpan ke favorit"}
      className={cx(
        "inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer",
        withLabel
          ? cx(
              "h-11 rounded-[2px] border px-5 text-[11px] font-semibold tracking-[0.14em] uppercase",
              on
                ? "border-gold bg-gold/10 text-gold"
                : "border-ivory/30 text-ivory hover:border-gold hover:text-gold",
            )
          : cx(
              "h-10 w-10 rounded-full backdrop-blur",
              on ? "bg-gold text-charcoal" : "bg-ink/50 text-ivory hover:bg-ink/80 hover:text-gold",
            ),
        className,
      )}
    >
      <Heart
        size={16}
        strokeWidth={1.6}
        fill={on ? "currentColor" : "none"}
        className={cx("transition-transform", on && "scale-110")}
      />
      {withLabel && (on ? "Tersimpan" : "Simpan ke Favorit")}
    </button>
  );
}

export function CollectionCard({
  c,
  size = "md",
  index,
}: {
  c: Collection;
  size?: "md" | "lg";
  index?: number;
}) {
  return (
    <article
      className="group relative flex flex-col animate-fade-up"
      style={{ animationDelay: `${(index ?? 0) * 60}ms` }}
    >
      <Link
        to={`/collection/${c.id}`}
        className="flex flex-col gap-5"
        aria-label={`${c.name}, ${c.category}`}
      >
        <div
          className={cx(
            "relative overflow-hidden",
            size === "lg" ? "aspect-[3/4]" : "aspect-[4/5]",
          )}
        >
          <VisualView
            visual={c.visual}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-museum)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <span className="absolute top-4 left-4 font-serif text-lg text-ivory/90">No. {c.no}</span>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {c.has3D && (
              <span className="inline-flex items-center gap-1.5 border border-gold/50 bg-ink/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-gold uppercase backdrop-blur">
                <Box size={11} /> 3D Interaktif
              </span>
            )}
            {c.hasVideo && (
              <span className="inline-flex items-center gap-1.5 border border-ivory/30 bg-ink/70 px-2 py-1 text-[10px] font-semibold tracking-[0.16em] text-ivory uppercase backdrop-blur">
                <Film size={11} /> Video
              </span>
            )}
          </div>
          <span className="absolute right-4 bottom-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-gold text-charcoal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowRight size={16} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
            {c.category}
          </p>
          <h3
            className={cx(
              "font-serif leading-tight text-ivory transition-colors group-hover:text-gold",
              size === "lg" ? "text-3xl" : "text-[26px]",
            )}
          >
            {c.name}
          </h3>
          <p className="text-[13px] text-stone">{c.origin}, Yogyakarta</p>
          <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ivory/80 uppercase transition-colors group-hover:text-gold">
            Lihat Koleksi{" "}
            <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
          </span>
        </div>
      </Link>
      <FavoriteButton id={c.id} className="absolute top-3 right-3" />
    </article>
  );
}
