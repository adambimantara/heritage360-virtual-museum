import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Box,
  ImageIcon,
  X,
  Eye,
  Film,
  Headphones,
} from "lucide-react";
import { CATEGORIES, ORIGINS, type Category, type Collection } from "../../data";
import { useStore } from "../../lib/store";
import { navigate, Link } from "../../lib/router";
import { VisualView } from "../../components/Art";
import {
  Badge,
  Button,
  EmptyState,
  Input,
  Modal,
  SearchBar,
  Select,
  Textarea,
  cx,
} from "../../components/ui";
import { AdminLayout } from "./AdminLayout";

type Draft = Omit<Collection, "gallery" | "no" | "addedAt" | "id"> & { id?: string };

const empty: Draft = {
  name: "",
  localName: "",
  category: "Kriya Tradisional",
  origin: "Kota Yogyakarta",
  short: "",
  history: "",
  philosophy: "",
  material: "",
  technique: "",
  visual: { kind: "art", art: "lurik", alt: "" },
  has3D: false,
  hasVideo: false,
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function CollectionForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Draft;
  onCancel: () => void;
  onSave: (d: Draft) => void;
}) {
  const [d, setD] = useState<Draft>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imgError, setImgError] = useState("");
  const [model, setModel] = useState<{ name: string; size: number } | null>(
    initial.model3D ? { name: initial.model3D, size: 0 } : null,
  );
  const [modelError, setModelError] = useState("");
  const [videoFile, setVideoFile] = useState<string>(initial.video?.videoUrl || "");
  const [audioText, setAudioText] = useState<string>(initial.audioNarration?.join("\n") || "");

  const imgInput = useRef<HTMLInputElement>(null);
  const modelInput = useRef<HTMLInputElement>(null);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }));

  const onImage = (f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/"))
      return setImgError("Format file harus berupa gambar (JPG, PNG, WebP).");
    if (f.size > 2 * 1024 * 1024)
      return setImgError("Ukuran gambar maksimal 2 MB pada prototipe ini.");
    setImgError("");
    const r = new FileReader();
    r.onload = () => set("visual", { kind: "photo", src: String(r.result), alt: d.name || f.name });
    r.readAsDataURL(f);
  };

  const onModel = (f?: File) => {
    if (!f) return;
    if (!/\.(glb|gltf)$/i.test(f.name))
      return setModelError("Format model 3D harus .glb atau .gltf.");
    setModelError("");
    setModel({ name: f.name, size: f.size });
    set("model3D", f.name);
    set("has3D", true);
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!d.name.trim()) e.name = "Nama objek budaya wajib diisi.";
    if (!d.origin.trim()) e.origin = "Asal daerah wajib diisi.";
    if (!d.short.trim()) e.short = "Deskripsi singkat wajib diisi.";
    else if (d.short.length > 250) e.short = "Deskripsi singkat maksimal 250 karakter.";
    setErrors(e);
    if (Object.keys(e).length) return;

    const lines = audioText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    onSave({
      ...d,
      hasVideo: !!videoFile.trim() || d.hasVideo,
      video: videoFile.trim()
        ? {
            title: `Dokumentasi: ${d.name}`,
            duration: 600,
            videoUrl: videoFile.trim(),
            thumb: d.visual.kind === "photo" ? d.visual.src : undefined,
          }
        : d.video,
      audioNarration: lines.length ? lines : undefined,
      visual:
        d.visual.kind === "photo" ? { ...d.visual, alt: d.name } : { ...d.visual, alt: d.name },
    });
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
        {/* Media Column */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-cream uppercase">
            Foto Utama Artefak *
          </p>
          <button
            type="button"
            onClick={() => imgInput.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onImage(e.dataTransfer.files[0]);
            }}
            className="group relative aspect-[4/5] w-full overflow-hidden border border-dashed border-gold/40 cursor-pointer bg-ink/40"
          >
            <VisualView
              visual={d.visual}
              className="h-full w-full opacity-70 transition-opacity group-hover:opacity-40"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-ivory uppercase opacity-90 p-3 text-center">
              <ImageIcon size={20} className="text-gold" /> Unggah Foto
              <span className="text-[10px] font-normal tracking-normal normal-case text-cream">
                Seret & lepas atau klik
              </span>
            </span>
          </button>
          <input
            ref={imgInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onImage(e.target.files?.[0])}
          />
          {imgError && <p className="text-[12px] text-danger">{imgError}</p>}

          <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] text-cream uppercase flex items-center gap-1.5">
            <Box size={14} className="text-gold" /> File Model 3D (.glb)
          </p>
          {model ? (
            <div className="flex items-center gap-3 border border-gold/30 bg-ink/40 p-3">
              <Box size={18} className="shrink-0 text-gold" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] text-ivory">{model.name}</p>
                <p className="text-[11px] text-stone">
                  {model.size ? `${(model.size / 1024 / 1024).toFixed(2)} MB · ` : ""}
                  {d.has3D ? "Aktif" : "Terunggah"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setModel(null);
                  set("model3D", undefined);
                  set("has3D", false);
                }}
                aria-label="Hapus model"
                className="p-1 text-stone hover:text-danger cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => modelInput.current?.click()}
            >
              <Upload size={13} /> Pilih File .glb / .gltf
            </Button>
          )}
          <input
            ref={modelInput}
            type="file"
            accept=".glb,.gltf"
            className="hidden"
            onChange={(e) => onModel(e.target.files?.[0])}
          />
          {modelError && <p className="text-[12px] text-danger">{modelError}</p>}

          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="has3DCheck"
              checked={d.has3D}
              onChange={(e) => set("has3D", e.target.checked)}
              className="h-4 w-4 rounded border-gold/30 accent-gold"
            />
            <label htmlFor="has3DCheck" className="text-[12px] text-cream cursor-pointer">
              Aktifkan Status 3D 360°
            </label>
          </div>
        </div>

        {/* Text Fields Column */}
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nama Objek Budaya *"
              value={d.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
              placeholder="Contoh: Keris Yogyakarta"
            />
            <Input
              label="Nama Lokal / Tradisional"
              value={d.localName}
              onChange={(e) => set("localName", e.target.value)}
              placeholder="Contoh: Dhuwung Gagrak Ngayogyakarta"
            />
            <Select
              label="Kategori Budaya *"
              value={d.category}
              onChange={(e) => set("category", e.target.value as Category)}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Asal / Keterkaitan Daerah *"
              value={d.origin}
              onChange={(e) => set("origin", e.target.value)}
              error={errors.origin}
              options={Array.from(new Set([...ORIGINS, d.origin])).map((o) => ({
                value: o,
                label: o,
              }))}
            />
          </div>

          <Textarea
            label="Deskripsi Singkat *"
            value={d.short}
            onChange={(e) => set("short", e.target.value)}
            error={errors.short}
            placeholder="Ringkasan identitas dan keunikan artefak (maks. 250 karakter)..."
            className="min-h-20"
          />

          <Textarea
            label="Sejarah & Asal-usul"
            value={d.history}
            onChange={(e) => set("history", e.target.value)}
            placeholder="Konteks kemunculan, penetapan budaya, atau kaitan istana..."
          />

          <Textarea
            label="Filosofi & Makna Budaya"
            value={d.philosophy}
            onChange={(e) => set("philosophy", e.target.value)}
            placeholder="Ajaran budi pekerti, perlambang, atau nilai moral..."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Textarea
              label="Bahan Pembuatan"
              value={d.material}
              onChange={(e) => set("material", e.target.value)}
              placeholder="Kayu jati, perunggu, malam lebah, kain katun..."
              className="min-h-20"
            />
            <Textarea
              label="Teknik Pembuatan"
              value={d.technique}
              onChange={(e) => set("technique", e.target.value)}
              placeholder="Ditempa lipat, dipahat tatah, dicelup soga..."
              className="min-h-20"
            />
          </div>

          {/* Video & Audio Settings */}
          <div className="grid gap-4 sm:grid-cols-2 border-t border-gold/15 pt-4">
            <div>
              <Input
                label="Jalur File Video (.mp4 / URL)"
                value={videoFile}
                onChange={(e) => setVideoFile(e.target.value)}
                placeholder="/videos/nama-koleksi.mp4"
                hint="Diletakkan di direktori public/videos/"
              />
            </div>
            <div>
              <Textarea
                label="Narasi Audio Guide (Satu kalimat per baris)"
                value={audioText}
                onChange={(e) => setAudioText(e.target.value)}
                placeholder="Kalimat narasi panduan audio..."
                className="min-h-20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky -bottom-6 -mx-6 mt-8 flex justify-end gap-3 border-t border-gold/15 bg-umber px-6 py-4 sm:-mx-8 sm:px-8">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={submit}>{initial.id ? "Simpan Perubahan" : "Tambah ke Koleksi"}</Button>
      </div>
    </>
  );
}

export default function AdminCollections({ current, query }: { current: string; query: string }) {
  const { collections, saveCollection, deleteCollection, notify } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [editing, setEditing] = useState<Draft | null>(null);
  const [deleting, setDeleting] = useState<Collection | null>(null);

  useEffect(() => {
    if (query.includes("new=1")) {
      setEditing(empty);
      navigate("/admin/collections");
    }
  }, [query]);

  const list = collections.filter(
    (c) =>
      (cat === "all" || c.category === cat) &&
      (c.name + c.localName + c.origin).toLowerCase().includes(q.toLowerCase()),
  );

  const save = (d: Draft) => {
    const existing = d.id ? collections.find((c) => c.id === d.id) : undefined;
    let id = d.id ?? slug(d.name);
    if (!d.id) while (collections.some((c) => c.id === id)) id += "-1";
    const no =
      existing?.no ??
      String(Math.max(0, ...collections.map((c) => Number(c.no) || 0)) + 1).padStart(2, "0");

    saveCollection({
      ...existing,
      ...d,
      id,
      no,
      gallery: existing?.gallery ?? [d.visual],
      addedAt: existing?.addedAt ?? new Date().toISOString().slice(0, 10),
    } as Collection);

    notify(
      existing
        ? `Koleksi "${d.name}" berhasil diperbarui.`
        : `"${d.name}" berhasil ditambahkan ke museum.`,
    );
    setEditing(null);
  };

  return (
    <AdminLayout
      current={current}
      title="Manajemen Koleksi Budaya"
      actions={
        <Button size="sm" onClick={() => setEditing(empty)}>
          <Plus size={14} /> <span className="hidden sm:inline">Tambah Koleksi</span>
        </Button>
      }
    >
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_260px]">
        <SearchBar value={q} onChange={setQ} placeholder="Cari nama objek atau daerah asal..." />
        <Select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          aria-label="Filter kategori"
          options={[
            { value: "all", label: "Semua Kategori Budaya" },
            ...CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
        />
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="Koleksi Tidak Ditemukan"
          action={
            <Button onClick={() => setEditing(empty)}>
              <Plus size={14} /> Tambah Koleksi Baru
            </Button>
          }
        >
          Tidak ada artefak yang cocok dengan filter pencarian saat ini.
        </EmptyState>
      ) : (
        <div className="overflow-x-auto border border-gold/10 bg-charcoal">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-gold/10 text-[10px] tracking-[0.16em] text-stone uppercase">
                <th className="px-5 py-4 font-semibold">No.</th>
                <th className="px-3 py-4 font-semibold">Objek Artefak</th>
                <th className="px-3 py-4 font-semibold">Kategori</th>
                <th className="px-3 py-4 font-semibold">Asal Daerah</th>
                <th className="px-3 py-4 font-semibold">Fitur 3D</th>
                <th className="px-3 py-4 font-semibold">Video</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gold/5 transition-colors hover:bg-ivory/[0.02]"
                >
                  <td className="px-5 py-3 font-serif text-lg text-gold">{c.no}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <VisualView visual={c.visual} className="h-12 w-10 shrink-0" />
                      <div>
                        <p className="text-ivory font-medium">{c.name}</p>
                        <p className="text-[11px] text-stone italic">{c.localName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-cream/80">{c.category}</td>
                  <td className="px-3 py-3 text-cream/80">{c.origin}</td>
                  <td className="px-3 py-3">
                    {c.has3D ? (
                      <Badge tone="success">3D Aktif</Badge>
                    ) : c.model3D ? (
                      <Badge>Proses</Badge>
                    ) : (
                      <Badge tone="muted">Belum ada</Badge>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {c.hasVideo ? (
                      <Badge tone="success">Tersedia</Badge>
                    ) : (
                      <Badge tone="muted">Belum ada</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        to={`/collection/${c.id}`}
                        aria-label={`Lihat detail ${c.name}`}
                        title="Lihat Pratinjau Publik"
                        className="p-2 text-stone hover:text-ivory"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => setEditing({ ...c })}
                        aria-label={`Ubah ${c.name}`}
                        title="Edit Koleksi"
                        className="p-2 text-stone hover:text-gold cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleting(c)}
                        aria-label={`Hapus ${c.name}`}
                        title="Hapus Koleksi"
                        className="p-2 text-stone hover:text-danger cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-[12px] text-stone">
        Menampilkan {list.length} dari {collections.length} artefak terdata · Perubahan tersimpan
        secara interaktif di browser.
      </p>

      {/* Edit/Create Modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        size="lg"
        eyebrow={editing?.id ? "Ubah Data Artefak" : "Koleksi Budaya Baru"}
        title={editing?.id ? editing.name : "Tambah Koleksi Baru"}
      >
        {editing && (
          <CollectionForm
            key={editing.id ?? "new"}
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={save}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        size="sm"
        eyebrow="Konfirmasi Penghapusan"
        title="Hapus Koleksi Ini?"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleting) {
                  deleteCollection(deleting.id);
                  notify(`Koleksi "${deleting.name}" telah dihapus.`);
                }
                setDeleting(null);
              }}
            >
              Hapus Permanen
            </Button>
          </>
        }
      >
        <p className="text-[14px] leading-relaxed text-cream/85">
          Artefak <strong className="text-ivory">{deleting?.name}</strong> akan dihapus dari arsip
          katalog publik museum beserta riwayat favoritnya. Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </AdminLayout>
  );
}
