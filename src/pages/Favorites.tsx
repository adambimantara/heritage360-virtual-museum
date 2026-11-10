import { Heart, Trash2, ArrowRight, Box } from "lucide-react";
import { useStore } from "../lib/store";
import { Link } from "../lib/router";
import { VisualView } from "../components/Art";
import { PageHeader } from "../components/Layout";
import { EmptyState, LinkButton } from "../components/ui";

export default function Favorites() {
  const { favorites, collections, removeFavorite, notify } = useStore();
  const items = favorites
    .map((id) => collections.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <>
      <PageHeader
        eyebrow="Koleksi Pribadi Anda"
        title={
          <>
            Koleksi Favorit <em className="text-gold">Tersimpan</em>
          </>
        }
        aside={
          <p className="font-serif text-xl text-stone">
            <span className="text-5xl text-ivory">{String(items.length).padStart(2, "0")}</span>{" "}
            artefak tersimpan
          </p>
        }
      >
        Daftar artefak dan pusaka budaya yang Anda simpan selama menjelajah. Tersimpan di memori
        perangkat Anda.
      </PageHeader>

      <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:px-10">
        {items.length === 0 ? (
          <EmptyState
            title="Belum Ada Koleksi Favorit"
            icon={<Heart size={26} strokeWidth={1.2} />}
            action={<LinkButton to="/explore">Mulai Jelajahi Koleksi</LinkButton>}
          >
            Tekan ikon hati pada artefak atau pusaka manapun untuk menyimpannya dalam daftar favorit
            Anda.
          </EmptyState>
        ) : (
          <ul className="border-t border-gold/15">
            {items.map((c, i) => (
              <li
                key={c.id}
                className="group grid grid-cols-[72px_1fr] items-center gap-5 border-b border-gold/15 py-6 animate-fade-up sm:grid-cols-[40px_110px_1fr_auto] sm:gap-8"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="hidden font-serif text-2xl text-gold sm:block">{c.no}</span>
                <Link to={`/collection/${c.id}`}>
                  <VisualView visual={c.visual} className="aspect-[4/5] w-full" />
                </Link>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                    {c.category} · {c.origin}
                  </p>
                  <Link
                    to={`/collection/${c.id}`}
                    className="font-serif text-2xl sm:text-3xl text-ivory hover:text-gold transition-colors"
                  >
                    {c.name}
                  </Link>
                  <p className="font-serif text-sm text-stone italic">{c.localName}</p>
                  <p className="line-clamp-1 text-[13px] text-cream/70 sm:line-clamp-2">
                    {c.short}
                  </p>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1">
                  <LinkButton to={`/collection/${c.id}`} size="sm" variant="outline">
                    Lihat Detail
                  </LinkButton>
                  <button
                    onClick={() => {
                      removeFavorite(c.id);
                      notify(`Dihapus dari favorit: ${c.name}`);
                    }}
                    aria-label={`Hapus ${c.name} dari favorit`}
                    title="Hapus dari favorit"
                    className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-stone transition-colors hover:border-danger hover:text-danger cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
