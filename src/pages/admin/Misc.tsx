import { useState } from "react";
import { Play, Pencil, Check } from "lucide-react";
import { CATEGORIES, DOCUMENTARIES, formatTime } from "../../data";
import { useStore } from "../../lib/store";
import { AudioGuide } from "../../components/AudioGuide";
import { Badge, Button, Input, Select, Textarea } from "../../components/ui";
import { AdminLayout } from "./AdminLayout";

export function AdminCategories({ current }: { current: string }) {
  const { collections } = useStore();
  return (
    <AdminLayout current={current} title="Kategori Koleksi">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const n = collections.filter((x) => x.category === c).length;
          return (
            <div key={c} className="flex flex-col gap-4 border border-gold/10 bg-charcoal p-6">
              <div className="flex items-start justify-between">
                <span className="font-serif text-3xl text-gold">0{i + 1}</span>
                <Badge tone="success">Aktif</Badge>
              </div>
              <p className="font-serif text-2xl text-ivory">{c}</p>
              <p className="text-[13px] text-stone">{n} koleksi artefak</p>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}

export function AdminDocumentary({ current }: { current: string }) {
  return (
    <AdminLayout current={current} title="Dokumenter Budaya">
      <div className="grid gap-4">
        {DOCUMENTARIES.map((d, i) => (
          <div
            key={d.id}
            className="flex flex-col gap-4 border border-gold/10 bg-charcoal p-4 sm:flex-row sm:items-center"
          >
            <img
              src={d.thumb.replace("w=1400", "w=400")}
              alt=""
              className="aspect-video w-full object-cover sm:w-40"
            />
            <div className="flex-1">
              <p className="font-serif text-2xl text-ivory">{d.title}</p>
              <p className="text-[12px] text-stone">
                {d.category} · {formatTime(d.duration)} · Takarir ID / EN · Full HD
              </p>
            </div>
            {i === 2 ? <Badge>Dalam Kurasi</Badge> : <Badge tone="success">Terbit</Badge>}
            <Button variant="outline" size="sm">
              <Pencil size={13} /> Sunting
            </Button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export function AdminAudio({ current }: { current: string }) {
  const [preview, setPreview] = useState(false);
  return (
    <AdminLayout current={current} title="Panduan Audio">
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="overflow-x-auto border border-gold/10 bg-charcoal">
          <table className="w-full min-w-[520px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-gold/10 text-[10px] tracking-[0.16em] text-stone uppercase">
                <th className="px-5 py-4">Artefak / Judul</th>
                <th className="px-3 py-4">Bahasa Narasi</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {[
                ["Keris Yogyakarta (Kyai Joko Piturun)", "Bahasa Indonesia", true],
                ["Keris Yogyakarta (Heirloom Heritage)", "English", true],
                ["Topeng Panji Yogyakarta", "Bahasa Indonesia", true],
                ["Batik Kawung Mataram", "Bahasa Indonesia", false],
              ].map(([t, l, ok], i) => (
                <tr key={i} className="border-b border-gold/5">
                  <td className="px-5 py-4 text-ivory">{t as string}</td>
                  <td className="px-3 py-4 text-cream/80">{l as string}</td>
                  <td className="px-3 py-4">
                    {ok ? <Badge tone="success">Terbit</Badge> : <Badge tone="muted">Draf</Badge>}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {ok && (
                      <Button size="sm" variant="outline" onClick={() => setPreview(true)}>
                        <Play size={12} /> Uji Suara
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {preview ? (
          <AudioGuide onClose={() => setPreview(false)} />
        ) : (
          <div className="flex items-center justify-center border border-dashed border-gold/20 p-10 text-center text-[13px] text-stone">
            Klik tombol &ldquo;Uji Suara&rdquo; pada tabel untuk memutar pratinjau audio guide
            berbahasa Indonesia.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export function AdminSettings({ current }: { current: string }) {
  const { notify } = useStore();
  const [saved, setSaved] = useState(false);
  return (
    <AdminLayout current={current} title="Pengaturan Museum">
      <form
        className="flex max-w-2xl flex-col gap-6 border border-gold/10 bg-charcoal p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          notify("Pengaturan berhasil disimpan");
        }}
      >
        <Input label="Nama Museum Virtual" defaultValue="Heritage360" />
        <Input label="Tagline Utama" defaultValue="Jelajahi. Kenali. Lestarikan." />
        <Textarea
          label="Deskripsi Singkat"
          defaultValue="Museum Virtual dan Eksplorasi 3D Warisan Budaya Yogyakarta."
        />
        <Select
          label="Bahasa Standar Tampilan"
          defaultValue="id"
          options={[
            { value: "id", label: "Bahasa Indonesia (Utama)" },
            { value: "en", label: "English (Opsional)" },
          ]}
        />
        <Input label="Email Kurator / Kontak" type="email" defaultValue="kurator@heritage360.id" />
        <Button type="submit" className="self-start">
          {saved ? (
            <>
              <Check size={14} /> Tersimpan
            </>
          ) : (
            "Simpan Pengaturan"
          )}
        </Button>
      </form>
    </AdminLayout>
  );
}
