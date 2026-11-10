import {
  Archive,
  Tags,
  Film,
  Headphones,
  ArrowUpRight,
  Plus,
  Box,
  BookOpen,
  Clock,
} from "lucide-react";
import { CATEGORIES, DOCUMENTARIES, STORIES } from "../../data";
import { useStore } from "../../lib/store";
import { Link } from "../../lib/router";
import { VisualView } from "../../components/Art";
import { Badge, LinkButton } from "../../components/ui";
import { AdminLayout } from "./AdminLayout";

const VISITS = [
  ["Des", 1240],
  ["Jan", 1580],
  ["Feb", 1460],
  ["Mar", 2120],
  ["Apr", 2480],
  ["Mei", 2960],
] as const;

export default function Dashboard({ current }: { current: string }) {
  const { collections, activity } = useStore();
  const max = Math.max(...VISITS.map((v) => v[1]));

  const byCat = CATEGORIES.map((c) => ({
    c,
    n: collections.filter((x) => x.category === c).length,
  }));

  const count3D = collections.filter((c) => c.has3D).length;
  const countVideo = collections.filter((c) => c.hasVideo).length;
  const latest = [...collections].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 5);

  const stats = [
    { icon: Archive, label: "Total Artefak", v: collections.length, d: "15 koleksi terdata" },
    { icon: Tags, label: "Kategori Budaya", v: CATEGORIES.length, d: "Semua aktif" },
    { icon: Box, label: "Model 3D 360°", v: count3D, d: "1 aktif · 14 proses" },
    { icon: Film, label: "Video Dokumenter", v: DOCUMENTARIES.length, d: "Kualitas 1080p HD" },
    { icon: BookOpen, label: "Artikel Budaya", v: STORIES.length, d: "Esai sejarah & filosofi" },
  ];

  return (
    <AdminLayout
      current={current}
      title="Dasbor Manajemen"
      actions={
        <LinkButton to="/admin/collections?new=1" size="sm">
          <Plus size={14} /> <span className="hidden sm:inline">Tambah Koleksi Baru</span>
        </LinkButton>
      }
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[12px] text-stone">
          *Data statistik interaktif dikelola secara lokal pada tahap pengujian frontend.
        </p>
        <span className="text-[11px] text-gold border border-gold/20 px-2.5 py-1 rounded">
          Sistem Versi 1.0 — Frontend Siap
        </span>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ icon: I, label, v, d }) => (
          <div
            key={label}
            className="flex flex-col gap-3 border border-gold/15 bg-charcoal p-5 rounded-[2px]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-stone uppercase">
                {label}
              </p>
              <I size={16} strokeWidth={1.5} className="text-gold" />
            </div>
            <p className="font-serif text-4xl text-ivory">{String(v).padStart(2, "0")}</p>
            <p className="text-[11px] text-success font-medium">{d}</p>
          </div>
        ))}
      </div>

      {/* Main Insights Grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Visitors Chart */}
        <div className="border border-gold/10 bg-charcoal p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="font-serif text-2xl text-ivory">Statistik Pengunjung Virtual</p>
              <p className="text-[12px] text-stone">Estimasi kunjungan 6 bulan terakhir</p>
            </div>
            <span className="text-[11px] text-stone">Total Kunjungan: 11.840</span>
          </div>
          <div className="flex h-44 items-end gap-4 border-b border-gold/15 pb-2">
            {VISITS.map(([m, n]) => (
              <div key={m} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] text-stone opacity-0 transition-opacity group-hover:opacity-100">
                  {n.toLocaleString()}
                </span>
                <div
                  style={{ height: `${(n / max) * 100}%` }}
                  className="w-full bg-gold/30 transition-all duration-300 group-hover:bg-gold rounded-t-[1px]"
                />
                <span className="text-[11px] text-stone uppercase">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="border border-gold/10 bg-charcoal p-6">
          <p className="font-serif text-2xl text-ivory mb-1">Sebaran per Kategori</p>
          <p className="text-[12px] text-stone mb-6">Jumlah objek budaya per bidang keilmuan</p>
          <ul className="flex flex-col gap-3.5">
            {byCat.map(({ c, n }) => (
              <li key={c} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-cream">{c}</span>
                  <span className="font-mono text-gold">{n} objek</span>
                </div>
                <div className="h-1.5 w-full bg-ink overflow-hidden rounded-full">
                  <div
                    style={{ width: `${(n / collections.length) * 100}%` }}
                    className="h-full bg-gold transition-all duration-500"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Latest Collections & Activity Log */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Latest Collections */}
        <div className="border border-gold/10 bg-charcoal p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-serif text-2xl text-ivory">Koleksi Terkini</p>
              <p className="text-[12px] text-stone">
                Objek budaya yang baru diperbarui dalam katalog
              </p>
            </div>
            <Link
              to="/admin/collections"
              className="text-[11px] font-semibold text-gold uppercase hover:underline"
            >
              Kelola Semua
            </Link>
          </div>
          <div className="divide-y divide-gold/10">
            {latest.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3.5 gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <VisualView visual={c.visual} className="h-12 w-10 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-serif text-lg text-ivory truncate">{c.name}</p>
                    <p className="text-[11px] text-stone">
                      {c.category} · {c.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {c.has3D && <Badge tone="success">3D Siap</Badge>}
                  {c.hasVideo && <Badge>Video</Badge>}
                  <Link
                    to={`/collection/${c.id}`}
                    className="p-1.5 text-stone hover:text-gold"
                    title="Lihat Pratinjau Publik"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity log */}
        <div className="border border-gold/10 bg-charcoal p-6">
          <div className="mb-6 flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            <p className="font-serif text-2xl text-ivory">Riwayat Aktivitas</p>
          </div>
          {activity.length === 0 ? (
            <p className="text-[13px] text-stone py-8 text-center">
              Belum ada aktivitas pengelolaan tercatat.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {activity.slice(0, 6).map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-[12px]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gold shrink-0" />
                  <div>
                    <p className="text-ivory font-medium">
                      {a.action}: <span className="text-gold font-normal">{a.target}</span>
                    </p>
                    <p className="text-[10px] text-stone mt-0.5">{a.at}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
