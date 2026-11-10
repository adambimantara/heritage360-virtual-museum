import { lazy, Suspense, useEffect } from "react";
import { useRoute } from "./lib/router";
import { StoreProvider } from "./lib/store";
import { PublicLayout, Toasts } from "./components/Layout";
import { ErrorState, LinkButton, Spinner } from "./components/ui";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import Stories, { StoryDetail } from "./pages/Stories";
import Documentary from "./pages/Documentary";
import About from "./pages/About";
import Favorites from "./pages/Favorites";

const Explorer3D = lazy(() => import("./pages/Explorer3D"));
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminCollections = lazy(() => import("./pages/admin/Collections"));
const AdminMisc = {
  categories: lazy(() =>
    import("./pages/admin/Misc").then((m) => ({ default: m.AdminCategories })),
  ),
  documentary: lazy(() =>
    import("./pages/admin/Misc").then((m) => ({ default: m.AdminDocumentary })),
  ),
  audio: lazy(() => import("./pages/admin/Misc").then((m) => ({ default: m.AdminAudio }))),
  settings: lazy(() => import("./pages/admin/Misc").then((m) => ({ default: m.AdminSettings }))),
};

const TITLES: Record<string, string> = {
  "": "Museum Virtual & Eksplorasi 3D Warisan Budaya Yogyakarta",
  explore: "Jelajahi Koleksi",
  collection: "Detail Koleksi Budaya",
  explorer: "Penjelajah Objek 3D",
  stories: "Cerita Budaya & Sejarah",
  documentary: "Film Dokumenter",
  about: "Tentang Heritage360",
  favorites: "Koleksi Favorit Tersimpan",
  admin: "Panel Manajemen Admin",
  "design-system": "Sistem Desain",
};

function Routes() {
  const { path, parts } = useRoute();
  const [a = "", b] = parts;
  const clean = "/" + parts.join("/");
  const query = path.split("?")[1] ?? "";

  useEffect(() => {
    document.title = `${TITLES[a] ?? "Heritage360"} · Heritage360 Yogyakarta`;
  }, [a]);

  if (a === "admin") {
    const sub = b ?? "";
    let page;
    if (sub === "login") page = <AdminLogin />;
    else if (sub === "") page = <Dashboard current={clean} />;
    else if (sub === "collections") page = <AdminCollections current={clean} query={query} />;
    else if (sub in AdminMisc) {
      const P = AdminMisc[sub as keyof typeof AdminMisc];
      page = <P current={clean} />;
    } else page = <Dashboard current="/admin" />;
    return page;
  }

  if (a === "explorer") return <Explorer3D id={b ?? "keris-yogyakarta"} query={query} />;

  let page;
  switch (a) {
    case "":
      page = <Home />;
      break;
    case "explore":
      page = <Explore />;
      break;
    case "collection":
      page = <Detail key={b} id={b ?? ""} />;
      break;
    case "stories":
      page = b ? <StoryDetail key={b} id={b} /> : <Stories />;
      break;
    case "documentary":
      page = <Documentary query={query} />;
      break;
    case "about":
      page = <About />;
      break;
    case "favorites":
      page = <Favorites />;
      break;
    case "design-system":
      page = <DesignSystem />;
      break;
    default:
      page = (
        <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
          <ErrorState
            title="Halaman tidak ditemukan"
            action={<LinkButton to="/">Kembali ke Beranda</LinkButton>}
          >
            Halaman yang Anda tuju tidak tersedia atau tautan koleksi mungkin telah dipindahkan.
          </ErrorState>
        </div>
      );
  }
  return <PublicLayout current={clean}>{page}</PublicLayout>;
}

export default function App() {
  return (
    <StoreProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-charcoal">
            <Spinner size={36} />
          </div>
        }
      >
        <Routes />
      </Suspense>
      <Toasts />
    </StoreProvider>
  );
}
