import { useState, type ReactNode } from "react";
import {
  Expand,
  Pause,
  RefreshCw,
  Rotate3d,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Heart,
} from "lucide-react";
import { DOCUMENTARIES } from "../data";
import { useStore } from "../lib/store";
import { PageHeader } from "../components/Layout";
import { CollectionCard } from "../components/CollectionCard";
import { AudioGuide } from "../components/AudioGuide";
import { VideoPlayer } from "../components/VideoPlayer";
import {
  Badge,
  Breadcrumb,
  Button,
  CardSkeleton,
  EmptyState,
  ErrorState,
  IconButton,
  Input,
  Modal,
  Pagination,
  SearchBar,
  Select,
  Spinner,
} from "../components/ui";

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-gold/15 py-14 lg:grid-cols-[240px_1fr]">
      <div>
        <p className="font-serif text-xl text-gold">{n}</p>
        <h2 className="font-serif text-3xl text-ivory">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function DesignSystem() {
  const { collections } = useStore();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(2);
  const [modal, setModal] = useState(false);
  const colors = [
    ["Charcoal Black", "#171613"],
    ["Deep Brown", "#29231D"],
    ["Antique Gold", "#B89A62"],
    ["Warm Ivory", "#F1EBDD"],
    ["Muted Cream", "#D9CFBC"],
    ["Soft Gray", "#A6A097"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Heritage360 · v1.0"
        title={
          <>
            Sistem <em className="text-gold">Desain</em>
          </>
        }
      >
        Fondasi visual dan komponen antarmuka yang dapat digunakan kembali untuk Heritage360: radius
        2px, kisi spasi 4px, Cormorant Garamond untuk tipografi judul dan Manrope untuk teks bacaan.
      </PageHeader>
      <div className="mx-auto max-w-[1360px] px-5 pb-24 sm:px-8 lg:px-10">
        <Block n="01" title="Palet Warna">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {colors.map(([n, h]) => (
              <div key={h}>
                <div className="aspect-square border border-ivory/10" style={{ background: h }} />
                <p className="mt-3 text-[13px] text-ivory">{n}</p>
                <p className="text-[12px] text-stone uppercase">{h}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block n="02" title="Tipografi">
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline gap-6 border-b border-gold/10 pb-4">
              <span className="w-24 shrink-0 text-[11px] text-stone">Display 72</span>
              <p className="display text-6xl text-ivory sm:text-7xl">Warisan Yogyakarta</p>
            </div>
            <div className="flex items-baseline gap-6 border-b border-gold/10 pb-4">
              <span className="w-24 shrink-0 text-[11px] text-stone">H2 48</span>
              <p className="display text-5xl text-ivory">Koleksi Unggulan</p>
            </div>
            <div className="flex items-baseline gap-6 border-b border-gold/10 pb-4">
              <span className="w-24 shrink-0 text-[11px] text-stone">H3 28</span>
              <p className="font-serif text-[28px] text-ivory">Keris Yogyakarta</p>
            </div>
            <div className="flex items-baseline gap-6 border-b border-gold/10 pb-4">
              <span className="w-24 shrink-0 text-[11px] text-stone">Body 15</span>
              <p className="max-w-lg text-[15px] leading-relaxed text-cream/85">
                Perjalanan menyusuri filosofi luhur, tradisi adiluhung, dan mahakarya warisan budaya
                Yogyakarta.
              </p>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-24 shrink-0 text-[11px] text-stone">Eyebrow 11</span>
              <p className="eyebrow">Museum Budaya Digital</p>
            </div>
          </div>
        </Block>
        <Block n="03" title="Tombol & Lencana">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Utama (Primary)</Button>
              <Button variant="outline">Garis Luar (Outline)</Button>
              <Button variant="ghost">Tautan Samar (Ghost)</Button>
              <Button variant="danger">Bahaya (Danger)</Button>
              <Button disabled>Nonaktif</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">
                Besar <ArrowRight size={14} />
              </Button>
              <Button size="md">Sedang</Button>
              <Button size="sm">Kecil</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton label="Favorit">
                <Heart size={16} />
              </IconButton>
              <IconButton label="Aktif" active>
                <Heart size={16} fill="currentColor" />
              </IconButton>
              <IconButton label="Nonaktif" disabled>
                <Heart size={16} />
              </IconButton>
              <Badge>Emas</Badge>
              <Badge tone="success">Terbit</Badge>
              <Badge tone="muted">Draf</Badge>
              <Badge tone="danger">Kesalahan</Badge>
            </div>
            <p className="text-[12px] text-stone">
              Hover: warna emas lebih terang / outline emas. Aktif: warna ditekan. Nonaktif:
              opasitas 40%, tanpa pointer event. Target sentuh minimal 44px.
            </p>
          </div>
        </Block>
        <Block n="04" title="Kartu Koleksi">
          <div className="grid gap-6 sm:grid-cols-3">
            {collections.slice(0, 2).map((c) => (
              <CollectionCard key={c.id} c={c} />
            ))}
            <CardSkeleton />
          </div>
        </Block>
        <Block n="05" title="Formulir & Navigasi">
          <div className="grid gap-6 md:grid-cols-2">
            <SearchBar value={q} onChange={setQ} />
            <Select
              aria-label="Filter"
              options={[
                { value: "a", label: "Semua kategori" },
                { value: "b", label: "Senjata Tradisional" },
              ]}
            />
            <Input label="Baku" placeholder="Nama artefak..." />
            <Input
              label="Kesalahan"
              defaultValue="email-tidak-valid@"
              error="Masukkan alamat email yang valid."
            />
            <Input label="Hanya Baca" disabled defaultValue="Hanya baca (Read-only)" />
            <div className="flex flex-col justify-end gap-6">
              <Breadcrumb
                items={[
                  { label: "Beranda", to: "/" },
                  { label: "Koleksi", to: "/explore" },
                  { label: "Keris Yogyakarta" },
                ]}
              />
              <Button variant="outline" onClick={() => setModal(true)}>
                Buka Modal
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <Pagination page={page} pages={4} onChange={setPage} />
          </div>
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            eyebrow="Komponen Dialog"
            title="Dialog Modal Interaktif"
            footer={
              <>
                <Button variant="outline" onClick={() => setModal(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModal(false)}>Konfirmasi</Button>
              </>
            }
          >
            <p className="text-[14px] leading-relaxed text-cream/85">
              Modal menggunakan permukaan Cokelat Gelap (Deep Brown) dengan garis batas emas halus,
              serta menutup saat tombol Escape ditekan atau area latar belakang diklik.
            </p>
          </Modal>
        </Block>
        <Block n="06" title="Media & Audio">
          <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
            <VideoPlayer doc={DOCUMENTARIES[0]} />
            <AudioGuide />
          </div>
        </Block>
        <Block n="07" title="Kontrol Penjelajah 3D">
          <div className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-ink/80 p-1.5">
            {[Rotate3d, ZoomIn, ZoomOut, RefreshCw].map((I, i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/85"
              >
                <I size={18} strokeWidth={1.6} />
              </span>
            ))}
            <span className="mx-1 h-6 w-px bg-gold/20" />
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-charcoal">
              <Pause size={16} fill="currentColor" />
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/85">
              <Expand size={17} strokeWidth={1.6} />
            </span>
          </div>
          <p className="mt-4 text-[12px] text-stone">
            Putar 360°, Perbesar (Zoom in), Perkecil (Zoom out), Atur Ulang (Reset), Rotasi Otomatis
            (status aktif ditampilkan), Layar Penuh.
          </p>
        </Block>
        <Block n="08" title="Status Komponen">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-4 border border-gold/15 py-16">
              <Spinner size={36} />
              <p className="text-[12px] tracking-[0.16em] text-stone uppercase">Memuat Data</p>
            </div>
            <EmptyState title="Belum ada koleksi">
              Tampilan kosong saat daftar tidak memiliki konten.
            </EmptyState>
            <ErrorState title="Gagal memuat artefak">
              Tampilan pesan kesalahan dengan tombol tindakan pemulihan.
            </ErrorState>
          </div>
        </Block>
        <Block n="09" title="Tata Letak Responsif">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "Ponsel Pintar",
                "390 × 844",
                "1 kolom · navigasi laci drawer · panel 3D bertumpuk vertikal",
              ],
              ["Tablet", "768 × 1024", "2 kolom · navigasi laci drawer · tampilan adaptif"],
              [
                "Desktop",
                "1440 × 900",
                "3–4 kolom grid · bilah navigasi penuh · panel info 3D di samping",
              ],
            ].map(([a, b, c]) => (
              <div key={a} className="border border-gold/15 p-6">
                <p className="font-serif text-2xl text-ivory">{a}</p>
                <p className="text-gold">{b}</p>
                <p className="mt-2 text-[13px] text-stone">{c}</p>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </>
  );
}
