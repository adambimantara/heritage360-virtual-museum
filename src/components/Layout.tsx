import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Heart, Menu, Search, X, ArrowUpRight, Check, Compass } from "lucide-react";
import { Link, navigate } from "../lib/router";
import { useStore } from "../lib/store";
import { VisualView } from "./Art";
import { LinkButton, SearchBar, cx } from "./ui";

export const NAV = [
  { label: "Beranda", to: "/" },
  { label: "Jelajahi Koleksi", to: "/explore" },
  { label: "Cerita Budaya", to: "/stories" },
  { label: "Dokumenter", to: "/documentary" },
  { label: "Tentang Kami", to: "/about" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cx("group flex items-center gap-2.5 sm:gap-3", className)}
      aria-label="Heritage360 Beranda"
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/60 transition-colors group-hover:border-gold sm:h-9 sm:w-9">
        <span className="absolute inset-[5px] rounded-full border border-gold/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </span>
      <span className="font-serif text-[18px] leading-none tracking-[0.08em] text-ivory sm:text-[22px] sm:tracking-[0.12em]">
        HERITAGE<span className="text-gold">360</span>
      </span>
    </Link>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { collections } = useStore();
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return collections.slice(0, 4);
    return collections.filter((c) =>
      (c.name + c.category + c.origin + c.short + c.localName).toLowerCase().includes(s),
    );
  }, [q, collections]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-md animate-[fade-up_.4s_ease_both]"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian koleksi museum"
    >
      <div className="mx-auto flex h-full max-w-4xl flex-col px-6 pt-24 pb-10">
        <button
          onClick={onClose}
          aria-label="Tutup pencarian"
          className="absolute top-6 right-6 p-3 text-stone hover:text-gold cursor-pointer"
        >
          <X size={22} />
        </button>
        <p className="eyebrow mb-5">Pencarian Arsip Digital</p>
        <SearchBar
          value={q}
          onChange={setQ}
          autoFocus
          placeholder="Cari artefak, nama lokal, kategori, atau asal daerah..."
        />
        <p className="mt-8 mb-4 text-[11px] tracking-[0.18em] text-stone uppercase">
          {q ? `${results.length} artefak ditemukan` : "Koleksi Rekomendasi"}
        </p>
        <ul className="flex-1 divide-y divide-gold/10 overflow-y-auto">
          {results.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => {
                  onClose();
                  navigate(`/collection/${c.id}`);
                }}
                className="group flex w-full items-center gap-5 py-4 text-left cursor-pointer"
              >
                <VisualView visual={c.visual} className="h-16 w-14 shrink-0" />
                <span className="flex-1">
                  <span className="block font-serif text-2xl text-ivory transition-colors group-hover:text-gold">
                    {c.name}
                  </span>
                  <span className="text-[12px] text-stone">
                    {c.category} · {c.origin}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-stone transition-all group-hover:-translate-y-0.5 group-hover:text-gold"
                />
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="py-10 text-center text-stone">
              Tidak ada artefak yang cocok dengan kata kunci “{q}”.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export function Navbar({ current }: { current: string }) {
  const { favorites } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setMenu(false), [current]);

  const isActive = (to: string) =>
    to === "/"
      ? current === "/"
      : current.startsWith(to) || (to === "/explore" && current.startsWith("/collection"));

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-museum)]",
          scrolled || menu
            ? "bg-charcoal/92 py-3 shadow-[0_1px_0_rgba(184,154,98,0.15)] backdrop-blur-md"
            : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Logo />
          <nav aria-label="Navigasi Utama" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cx(
                  "relative py-2 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors",
                  isActive(n.to) ? "text-gold" : "text-ivory/80 hover:text-ivory",
                )}
              >
                {n.label}
                <span
                  className={cx(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500",
                    isActive(n.to) ? "w-full" : "w-0",
                  )}
                />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearch(true)}
              aria-label="Cari Koleksi"
              title="Cari Koleksi"
              className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:text-gold cursor-pointer"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link
              to="/favorites"
              aria-label={`Favorit (${favorites.length})`}
              title="Koleksi Favorit"
              className="relative flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:text-gold"
            >
              <Heart size={19} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-charcoal">
                  {favorites.length}
                </span>
              )}
            </Link>
            <span className="ml-2 hidden md:block">
              <LinkButton to="/explore" size="sm">
                <Compass size={14} /> Jelajahi Koleksi
              </LinkButton>
            </span>
            <button
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Tutup menu" : "Buka menu"}
              aria-expanded={menu}
              className="flex h-11 w-11 items-center justify-center text-ivory lg:hidden cursor-pointer"
            >
              {menu ? <X size={22} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cx(
          "fixed inset-0 z-40 bg-charcoal transition-all duration-500 lg:hidden",
          menu ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="kawung-accent absolute inset-0 opacity-[0.04]" />
        <nav
          aria-label="Navigasi Ponsel"
          className="relative flex h-full flex-col justify-between px-6 pt-28 pb-10"
        >
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li key={n.to} className="border-b border-gold/10">
                <Link
                  to={n.to}
                  className={cx(
                    "flex items-baseline gap-4 py-5 font-serif text-3xl sm:text-4xl transition-colors",
                    isActive(n.to) ? "text-gold" : "text-ivory",
                  )}
                >
                  <span className="font-sans text-[11px] text-gold/70">0{i + 1}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <LinkButton to="/explore" size="lg">
              <Compass size={16} /> Jelajahi Museum
            </LinkButton>
            <LinkButton to="/favorites" size="lg" variant="outline">
              Koleksi Favorit ({favorites.length})
            </LinkButton>
          </div>
        </nav>
      </div>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink">
      <div className="mx-auto grid max-w-[1360px] gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-10">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-xs text-[14px] leading-relaxed text-stone">
            Museum virtual yang didedikasikan untuk mendokumentasikan, melestarikan, dan
            memperkenalkan kekayaan warisan budaya Yogyakarta melalui pengalaman digital interaktif.
          </p>
          <p className="font-serif text-xl text-gold italic">Jelajahi. Kenali. Lestarikan.</p>
        </div>
        <div>
          <p className="eyebrow mb-6">Menu Museum</p>
          <ul className="flex flex-col gap-3 text-[14px] text-cream">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-6">Pengalaman Digital</p>
          <ul className="flex flex-col gap-3 text-[14px] text-cream">
            <li>
              <Link to="/explorer/keris-yogyakarta" className="hover:text-gold">
                Penjelajah Objek 3D
              </Link>
            </li>
            <li>
              <Link to="/documentary" className="hover:text-gold">
                Film Dokumenter Budaya
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-gold">
                Koleksi Favorit
              </Link>
            </li>
            <li>
              <Link to="/design-system" className="hover:text-gold">
                Sistem Desain
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-gold">
                Portal Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-6">Kontak & Lokasi</p>
          <address className="flex flex-col gap-3 text-[14px] leading-relaxed text-cream not-italic">
            <span>
              Kawasan Kraton & Kota Tua Kotagede
              <br />
              Daerah Istimewa Yogyakarta, Indonesia
            </span>
            <a href="mailto:kurator@heritage360.id" className="hover:text-gold">
              kurator@heritage360.id
            </a>
            <span>+62 (274) 555-360</span>
            <span className="text-[11px] text-stone">
              Layanan Informasi Warisan Budaya Yogyakarta
            </span>
          </address>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-3 px-5 py-6 text-[12px] text-stone sm:flex-row sm:px-8 lg:px-10">
          <span>
            © {new Date().getFullYear()} HERITAGE360 — Museum Virtual dan Eksplorasi 3D Warisan
            Budaya Yogyakarta.
          </span>
          <span>Mendokumentasikan karya adiluhung Yogyakarta untuk generasi mendatang.</span>
        </div>
      </div>
    </footer>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col items-center gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 border border-gold/30 bg-umber px-5 py-3 text-[13px] text-ivory shadow-2xl animate-fade-up"
        >
          <Check size={15} className="text-gold" />
          {t.text}
        </div>
      ))}
    </div>
  );
}

export function PublicLayout({
  current,
  children,
  footer = true,
}: {
  current: string;
  children: ReactNode;
  footer?: boolean;
}) {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar current={current} />
      <main>{children}</main>
      {footer && <Footer />}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold/10 pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="kawung-accent absolute inset-y-0 right-0 w-1/2 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="relative mx-auto flex max-w-[1360px] flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="flex max-w-3xl flex-col gap-6 animate-fade-up">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            {eyebrow}
          </p>
          <h1 className="display text-5xl text-ivory sm:text-6xl lg:text-7xl">{title}</h1>
          {children && (
            <p className="max-w-xl text-[16px] leading-relaxed text-stone">{children}</p>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}
