import { useState } from "react";
import { ArrowRight, Clock, BookOpen, ArrowLeft, Box } from "lucide-react";
import { STORIES } from "../data";
import { Link } from "../lib/router";
import { useStore } from "../lib/store";
import { VisualView } from "../components/Art";
import { PageHeader } from "../components/Layout";
import { Breadcrumb, ErrorState, LinkButton, cx } from "../components/ui";

const CATS = [
  "Semua Kategori",
  "Sejarah",
  "Filosofi",
  "Seni Tradisional",
  "Warisan Budaya",
] as const;

export default function Stories() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Semua Kategori");
  const list = STORIES.filter((s) => cat === "Semua Kategori" || s.category === cat);
  const [lead, ...rest] = list;

  return (
    <>
      <PageHeader
        eyebrow="Jurnal & Esai Budaya"
        title={
          <>
            Cerita Budaya & <em className="text-gold">Sejarah</em>
          </>
        }
      >
        Kumpulan esai naratif mendalam menyingkap sejarah, filosofi hidup, dan nilai adiluhung di
        balik objek pusaka Yogyakarta.
      </PageHeader>

      <section className="mx-auto max-w-[1360px] px-5 py-12 sm:px-8 lg:px-10">
        <div
          className="no-scrollbar mb-14 flex gap-4 sm:gap-8 overflow-x-auto border-b border-gold/10"
          role="tablist"
        >
          {CATS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cx(
                "-mb-px shrink-0 border-b py-4 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer",
                cat === c
                  ? "border-gold text-gold"
                  : "border-transparent text-stone hover:text-ivory",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {lead && (
          <Link
            to={`/stories/${lead.id}`}
            className="group mb-20 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 border border-gold/15 bg-charcoal p-6 sm:p-8 hover:border-gold/40 transition-colors"
          >
            <VisualView
              visual={lead.visual}
              className="aspect-[16/10] w-full"
              imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="flex flex-col gap-5">
              <span className="eyebrow">
                {lead.category} · {lead.readTime}
              </span>
              <h2 className="display text-4xl text-ivory transition-colors group-hover:text-gold sm:text-5xl">
                {lead.title}
              </h2>
              <p className="text-[15px] leading-relaxed text-cream/80">{lead.summary}</p>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
                Baca Selengkapnya{" "}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <Link key={s.id} to={`/stories/${s.id}`} className="group flex flex-col gap-5">
              <VisualView
                visual={s.visual}
                className="aspect-[16/10] w-full"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                {s.category} · {s.readTime}
              </span>
              <h3 className="font-serif text-3xl leading-snug text-ivory transition-colors group-hover:text-gold">
                {s.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-stone">{s.summary}</p>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ivory/80 uppercase transition-colors group-hover:text-gold">
                Baca Artikel{" "}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function StoryDetail({ id }: { id: string }) {
  const { collections } = useStore();
  const s = STORIES.find((x) => x.id === id);
  if (!s)
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
        <ErrorState
          title="Cerita Tidak Ditemukan"
          action={<LinkButton to="/stories">Kembali ke Indeks Cerita</LinkButton>}
        >
          Artikel yang Anda tuju mungkin telah dipindahkan atau judul telah diperbarui.
        </ErrorState>
      </div>
    );

  const relatedColl = collections.find((c) => c.id === s.related);

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <Breadcrumb
          items={[
            { label: "Beranda", to: "/" },
            { label: "Cerita Budaya", to: "/stories" },
            { label: s.title },
          ]}
        />
        <div className="mt-10 flex flex-col gap-6">
          <p className="eyebrow">
            {s.category} · {s.readTime}
          </p>
          <h1 className="display text-5xl text-ivory sm:text-6xl lg:text-7xl">{s.title}</h1>
          <p className="font-serif text-2xl leading-relaxed text-cream/90 italic">{s.summary}</p>
        </div>

        <div className="my-12">
          <VisualView visual={s.visual} showNote className="aspect-[16/10] w-full" />
        </div>

        <div className="flex flex-col gap-7 text-[17px] leading-[1.95] text-cream/85">
          {s.body.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:text-gold"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </div>

        {relatedColl && (
          <div className="mt-16 flex flex-col gap-4 border border-gold/25 bg-umber p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="eyebrow mb-1">Artefak Terkait dalam Koleksi</p>
              <h3 className="font-serif text-2xl text-ivory">{relatedColl.name}</h3>
              <p className="text-[13px] text-stone">{relatedColl.origin}, Yogyakarta</p>
            </div>
            <LinkButton to={`/collection/${relatedColl.id}`} size="sm">
              <Box size={14} /> Lihat Koleksi & 3D
            </LinkButton>
          </div>
        )}

        <div className="mt-16 border-t border-gold/15 pt-8 flex items-center justify-between">
          <LinkButton to="/stories" variant="ghost">
            <ArrowLeft size={14} /> Kembali ke Cerita Budaya
          </LinkButton>
          <span className="text-[12px] text-stone">Kurasi Warisan Budaya Heritage360</span>
        </div>
      </article>
    </>
  );
}
