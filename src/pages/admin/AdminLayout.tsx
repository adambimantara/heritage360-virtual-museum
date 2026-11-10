import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Archive,
  Tags,
  Film,
  Headphones,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Link, navigate } from "../../lib/router";
import { useStore } from "../../lib/store";
import { cx } from "../../components/ui";

const ITEMS = [
  { label: "Dasbor Utama", to: "/admin", icon: LayoutDashboard },
  { label: "Manajemen Koleksi", to: "/admin/collections", icon: Archive },
  { label: "Kategori Budaya", to: "/admin/categories", icon: Tags },
  { label: "Video Dokumenter", to: "/admin/documentary", icon: Film },
  { label: "Panduan Audio", to: "/admin/audio", icon: Headphones },
  { label: "Pengaturan Sistem", to: "/admin/settings", icon: Settings },
];

export function AdminLayout({
  current,
  title,
  actions,
  children,
}: {
  current: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { admin, logout } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!admin) navigate("/admin/login");
  }, [admin]);

  useEffect(() => setOpen(false), [current]);

  if (!admin) return null;

  const nav = (
    <nav className="flex h-full flex-col">
      <Link to="/admin" className="flex items-center gap-3 px-6 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        </span>
        <span className="font-serif text-xl tracking-[0.1em] text-ivory">
          HERITAGE<span className="text-gold">360</span>
        </span>
      </Link>
      <p className="px-6 pt-4 pb-3 text-[10px] font-semibold tracking-[0.2em] text-stone uppercase">
        Panel Kurator & Admin
      </p>
      <ul className="flex flex-1 flex-col gap-0.5 px-3">
        {ITEMS.map(({ label, to, icon: I }) => {
          const active = to === "/admin" ? current === "/admin" : current.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className={cx(
                  "flex items-center gap-3.5 px-3.5 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors rounded-[2px]",
                  active ? "bg-gold/15 text-gold" : "text-stone hover:bg-ivory/5 hover:text-ivory",
                )}
              >
                <I size={16} strokeWidth={1.6} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-gold/10 p-4 flex flex-col gap-2">
        <a
          href="#/"
          className="flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-semibold tracking-wider text-stone hover:text-gold uppercase"
        >
          <ExternalLink size={14} /> Lihat Website Museum
        </a>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[11px] font-semibold tracking-wider text-danger hover:bg-danger/10 uppercase rounded-[2px] cursor-pointer"
        >
          <LogOut size={14} /> Keluar (Logout)
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-gold/10 bg-charcoal lg:block">
        <div className="sticky top-0 h-screen">{nav}</div>
      </aside>

      {/* Sidebar Mobile */}
      <div
        className={cx(
          "fixed inset-0 z-50 bg-ink/90 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
      >
        <div className="h-full w-72 bg-charcoal">
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup Menu"
            className="absolute top-4 right-4 p-2 text-stone hover:text-gold cursor-pointer"
          >
            <X size={20} />
          </button>
          {nav}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-gold/10 bg-charcoal px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              aria-label="Buka Menu"
              className="p-1 text-stone hover:text-gold lg:hidden cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-serif text-2xl text-ivory">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <span className="hidden sm:inline text-[11px] text-stone border border-gold/20 px-3 py-1 rounded">
              {admin}
            </span>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
